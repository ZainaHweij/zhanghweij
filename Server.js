import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Create a PaymentIntent for embedded checkout
app.post("/api/create-payment-intent", async (req, res) => {
  const { priceId } = req.body;

  const prices = {
    starter: 5500, // in cents
    growth: 20000,
    elite: 50000,
  };

  const intent = await stripe.paymentIntents.create({
    amount: prices[priceId],
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  res.json({ clientSecret: intent.client_secret });
});

app.listen(3001, () => console.log("Server running on :3001"));
