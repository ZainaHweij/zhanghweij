import "dotenv/config";
import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

const PLANS = {
  starter: {
    type: "one-time",
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    name: "Starter Plan",
  },
  growth: {
    type: "subscription",
    priceId: process.env.STRIPE_GROWTH_PRICE_ID,
    name: "Growth Plan",
  },
  elite: {
    type: "subscription",
    priceId: process.env.STRIPE_ELITE_PRICE_ID,
    name: "Elite Plan",
  },
};

app.post("/api/create-payment-intent", async (req, res) => {
  const { priceId } = req.body;
  const plan = PLANS[priceId];
  if (!plan) return res.status(400).json({ error: `Unknown plan: ${priceId}` });
  if (!plan.priceId)
    return res
      .status(500)
      .json({ error: `Missing price ID for plan: ${priceId}` });

  try {
    if (plan.type === "one-time") {
      // Fetch the price from Stripe so we get the amount/currency automatically
      const price = await stripe.prices.retrieve(plan.priceId);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: price.unit_amount,
        currency: price.currency,
        automatic_payment_methods: { enabled: true },
        metadata: { plan: priceId },
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
        type: "payment",
      });
    } else {
      const customer = await stripe.customers.create({
        metadata: { plan: priceId },
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: plan.priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      });

      const invoice = subscription.latest_invoice;
      const paymentIntent = invoice?.payment_intent;

      if (!paymentIntent || typeof paymentIntent === "string") {
        throw new Error("Could not retrieve payment intent from subscription");
      }

      return res.json({
        clientSecret: paymentIntent.client_secret,
        subscriptionId: subscription.id,
        type: "subscription",
      });
    }
  } catch (err) {
    console.error("Stripe error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

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
        console.log("✅ One-time payment succeeded:", event.data.object.id);
        break;
      case "invoice.payment_succeeded":
        console.log("✅ Subscription payment succeeded:", event.data.object.id);
        break;
      case "customer.subscription.deleted":
        console.log("❌ Subscription cancelled:", event.data.object.id);
        break;
    }

    res.json({ received: true });
  },
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(
    `   Stripe mode: ${process.env.STRIPE_SECRET_KEY?.startsWith("sk_live") ? "LIVE 🔴" : "TEST ✅"}`,
  );
});
