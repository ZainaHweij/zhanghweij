import "dotenv/config";
import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

// --------------------
// PLAN CONFIG
// --------------------
const PLANS = {
  starter: {
    type: "one-time",
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
  },
  growth: {
    type: "subscription",
    priceId: process.env.STRIPE_GROWTH_PRICE_ID,
  },
  elite: {
    type: "subscription",
    priceId: process.env.STRIPE_ELITE_PRICE_ID,
  },
};

// --------------------
// CREATE PAYMENT INTENT (FIXED)
// --------------------
app.post("/api/create-payment-intent", async (req, res) => {
  const { priceId } = req.body;

  const plan = PLANS[priceId];
  if (!plan) {
    return res.status(400).json({ error: "Invalid plan" });
  }

  try {
    // --------------------
    // ONE TIME PAYMENT
    // --------------------
    if (plan.type === "one-time") {
      const price = await stripe.prices.retrieve(plan.priceId);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: price.unit_amount,
        currency: price.currency,
        automatic_payment_methods: { enabled: true },
        metadata: {
          plan: priceId,
        },
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
      });
    }

    // --------------------
    // SUBSCRIPTION (SIMPLIFIED)
    // --------------------
    const customer = await stripe.customers.create({
      metadata: { plan: priceId },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan.priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    const paymentIntent = subscription.latest_invoice.payment_intent;

    return res.json({
      clientSecret: paymentIntent.client_secret,
      subscriptionId: subscription.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// WEBHOOK
// --------------------
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("Payment succeeded:", event.data.object.id);
        break;

      case "invoice.payment_succeeded":
        console.log("Subscription paid:", event.data.object.id);
        break;
    }

    res.json({ received: true });
  },
);

// --------------------
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
