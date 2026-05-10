import { Check } from "lucide-react";

const plans = [
  {
    id: 0,
    name: "Starter Plan",
    price: "$55",
    description:
      "Flexible, one-time support for any topic or last-minute questions.",
    features: ["1-hour 1-on-1 meeting", "Covers any topic"],
    color: "bg-white text-zinc-900",
    btn: "bg-black text-white hover:bg-zinc-800",
  },
  {
    id: 1,
    name: "Growth Plan",
    price: "$200",
    description:
      "Consistent support with regular meetings and follow-up assistance.",
    features: [
      "4 one-hour 1-on-1 meetings per month",
      "Twice-weekly text support",
    ],
    color: "bg-black text-white",
    btn: "bg-white text-black hover:bg-zinc-200",
  },
  {
    id: 2,
    name: "Elite Plan",
    price: "$500",
    description:
      "Comprehensive guidance with frequent meetings and unlimited access.",
    features: ["8 one-hour 1-on-1 meetings per month", "24/7 text support"],
    color: "bg-zinc-100 text-zinc-900",
    btn: "bg-black text-white hover:bg-zinc-800",
    alignRight: true,
  },
];

export default function PricingFlat() {
  return (
    <div className="w-full flex flex-col items-center py-20 px-6">
      {/* Heading */}
      <div className="text-center max-w-2xl mb-14">
        <h2 className="text-4xl font-bold">
          We help you achieve more for less.
        </h2>
        <p className="mt-3 text-zinc-600">
          Leading alternatives cost $1000/month. We deliver the same level of
          support at a fraction of the price.
        </p>
      </div>

      {/* Three cards laid out flat horizontally */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-center items-stretch gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              w-full lg:w-[340px]
              rounded-3xl p-8 border border-zinc-200
              shadow-[0_20px_60px_rgba(0,0,0,0.12)]
              ${plan.color}
            `}
          >
            <div
              className={`space-y-6 flex flex-col ${
                plan.alignRight
                  ? "items-end text-right"
                  : "items-start text-left"
              }`}
            >
              <h3 className="text-2xl font-bold w-full">{plan.name}</h3>

              <div
                className={`flex items-end gap-2 w-full ${
                  plan.alignRight ? "justify-end" : ""
                }`}
              >
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-sm opacity-70 mb-1">/ month</span>
              </div>

              <p className="text-sm opacity-70 w-full">{plan.description}</p>

              <button
                className={`w-full rounded-xl py-3 font-medium transition ${plan.btn}`}
              >
                Get Started
              </button>

              <div
                className={`space-y-3 w-full ${
                  plan.alignRight ? "flex flex-col items-end" : ""
                }`}
              >
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className={`flex items-center gap-3 text-sm w-full ${
                      plan.alignRight ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Check size={16} className="shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
