import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

const PLANS = {
  starter: { type: "one-time", priceId: process.env.STRIPE_STARTER_PRICE_ID },
  growth: { type: "subscription", priceId: process.env.STRIPE_GROWTH_PRICE_ID },
  elite: { type: "subscription", priceId: process.env.STRIPE_ELITE_PRICE_ID },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { priceId } = req.body;
  const plan = PLANS[priceId];
  if (!plan) return res.status(400).json({ error: "Invalid plan" });

  try {
    if (plan.type === "one-time") {
      const price = await stripe.prices.retrieve(plan.priceId);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price.unit_amount,
        currency: price.currency,
        automatic_payment_methods: { enabled: true },
        metadata: { plan: priceId },
      });
      return res.json({ clientSecret: paymentIntent.client_secret });
    }

    const customer = await stripe.customers.create({
      metadata: { plan: priceId },
    });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan.priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    return res.json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
