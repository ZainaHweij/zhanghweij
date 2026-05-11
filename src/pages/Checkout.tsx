import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Check, Lock, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const plans = [
  {
    key: "starter",
    name: "Starter",
    price: 55,
    label: "$55",
    billing: "one-time",
    tagline: "Perfect for a focused session.",
    features: ["1-hour 1-on-1 meeting", "Covers any topic"],
  },
  {
    key: "growth",
    name: "Growth",
    price: 200,
    label: "$200",
    billing: "/ month",
    tagline: "Consistent support, real momentum.",
    features: ["4 one-hour sessions / month", "Twice-weekly text support"],
    popular: true,
  },
  {
    key: "elite",
    name: "Elite",
    price: 500,
    label: "$500",
    billing: "/ month",
    tagline: "Unlimited access, unlimited growth.",
    features: ["8 one-hour sessions / month", "24/7 text support"],
  },
];

function PaymentForm({ plan }: { plan: (typeof plans)[0] }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [ready, setReady] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setStatus("loading");
    setErrorMsg("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success` },
    });

    if (error) {
      setErrorMsg(error.message ?? "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-center justify-between py-3 border-b border-zinc-200">
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            {plan.name} Plan
          </p>
          <p className="text-xs text-zinc-400">
            {plan.billing === "one-time"
              ? "One-time payment"
              : "Billed monthly"}
          </p>
        </div>
        <p className="text-lg font-bold text-zinc-900">
          {plan.label}
          {plan.billing !== "one-time" && (
            <span className="text-xs font-normal text-zinc-400"> /mo</span>
          )}
        </p>
      </div>

      <PaymentElement
        options={{ layout: "tabs" }}
        onReady={() => setReady(true)}
      />

      {status === "error" && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || !ready || status === "loading"}
        className="
          w-full mt-1 rounded-2xl py-4 font-semibold text-sm tracking-wide
          bg-zinc-900 text-white
          hover:bg-zinc-700 active:scale-[0.99]
          transition-all duration-150
          disabled:opacity-40 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        "
      >
        {status === "loading" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock size={14} strokeWidth={2.5} />
            Pay {plan.label}
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
        <Shield size={11} />
        Secured by Stripe · 256-bit SSL
      </div>
    </form>
  );
}

export default function Checkout() {
  console.log("Checkout mounted");

  const [selected, setSelected] = useState(plans[1]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setClientSecret(null);
    setFetchError(false);

    fetch("http://localhost:3001/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId: selected.key }),
    })
      .then((r) => r.json())
      .then((d) => setClientSecret(d.clientSecret))
      .catch(() => setFetchError(true));
  }, [selected.key]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');`}</style>

      <Navbar />

      <main className="flex-1 flex items-start justify-center px-4 pt-28 pb-14">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* LEFT: Plan selector */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 mb-2">
                Choose your plan
              </p>
              <h1 className="text-3xl font-bold text-zinc-900 leading-tight">
                Invest in your growth.
              </h1>
            </div>

            <div className="flex flex-col gap-3 mt-1">
              {plans.map((plan) => {
                const active = selected.key === plan.key;
                return (
                  <button
                    key={plan.key}
                    onClick={() => setSelected(plan)}
                    className={`
                      relative w-full text-left rounded-2xl border p-5
                      transition-all duration-200 group
                      ${
                        active
                          ? "bg-zinc-900 border-zinc-900 shadow-lg shadow-zinc-900/10"
                          : "bg-white border-zinc-200 hover:border-zinc-400"
                      }
                    `}
                  >
                    {plan.popular && (
                      <span
                        className={`
                          absolute top-4 right-4 text-[10px] font-semibold tracking-widest uppercase
                          px-2.5 py-1 rounded-full
                          ${active ? "bg-white/15 text-white" : "bg-zinc-900 text-white"}
                        `}
                      >
                        Most popular
                      </span>
                    )}

                    <div className="flex items-start justify-between pr-24">
                      <div>
                        <p
                          className={`text-base font-semibold ${active ? "text-white" : "text-zinc-900"}`}
                        >
                          {plan.name} Plan
                        </p>
                        <p className="text-xs mt-0.5 text-zinc-400">
                          {plan.tagline}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`text-2xl font-bold ${active ? "text-white" : "text-zinc-900"}`}
                        >
                          {plan.label}
                        </span>
                        <span className="text-xs ml-1 text-zinc-400">
                          {plan.billing}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              active ? "bg-white/20" : "bg-zinc-100"
                            }`}
                          >
                            <Check
                              size={9}
                              strokeWidth={3}
                              className={
                                active ? "text-white" : "text-zinc-700"
                              }
                            />
                          </div>
                          <span
                            className={`text-xs ${active ? "text-zinc-300" : "text-zinc-500"}`}
                          >
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`
                        absolute left-5 bottom-4 w-4 h-4 rounded-full border-2 transition-all
                        ${active ? "border-white" : "border-zinc-300 group-hover:border-zinc-500"}
                      `}
                    >
                      {active && (
                        <div className="absolute inset-0.5 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-1">
              {[
                { stat: "Cancel anytime", sub: "No lock-in" },
                { stat: "Same-day setup", sub: "Start immediately" },
                { stat: "Money-back", sub: "If unsatisfied" },
              ].map((t) => (
                <div
                  key={t.stat}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-center"
                >
                  <p className="text-xs font-semibold text-zinc-900">
                    {t.stat}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{t.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Payment panel */}
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 sticky top-24">
            <h2 className="text-base font-semibold text-zinc-900 mb-1">
              Payment details
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              You'll be charged for the{" "}
              <span className="font-medium text-zinc-600">
                {selected.name} Plan
              </span>
              .
            </p>

            {fetchError ? (
              <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                Couldn't reach payment server. Make sure{" "}
                <code className="font-mono">server.js</code> is running on port
                3001.
              </div>
            ) : clientSecret ? (
              // key={clientSecret} forces a full remount when the secret changes
              // so Stripe reinitializes cleanly on plan switch
              <Elements
                key={clientSecret}
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#18181b",
                      colorBackground: "#ffffff",
                      borderRadius: "12px",
                      fontFamily: "DM Sans, sans-serif",
                      spacingUnit: "4px",
                    },
                  },
                }}
              >
                <PaymentForm plan={selected} />
              </Elements>
            ) : (
              <div className="flex flex-col gap-4 animate-pulse">
                <div className="h-10 rounded-xl bg-zinc-100" />
                <div className="h-28 rounded-xl bg-zinc-100" />
                <div className="h-12 rounded-xl bg-zinc-100" />
                <div className="h-12 rounded-xl bg-zinc-100" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
