import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Starter",
    price: "$19",
    description: "Perfect for getting started.",
    features: ["1-on-1 Support", "Basic Resources", "Community Access"],
    color: "bg-white",
  },
  {
    id: 2,
    name: "Pro",
    price: "$49",
    description: "Most popular for serious students.",
    features: ["Everything in Starter", "Priority Support", "Custom Roadmap"],
    color: "bg-black text-white",
  },
  {
    id: 3,
    name: "Elite",
    price: "$99",
    description: "Full premium experience.",
    features: ["Unlimited Help", "Private Sessions", "Application Review"],
    color: "bg-zinc-100",
  },
];

export default function PricingStack() {
  const [stackOrder, setStackOrder] = useState([2, 1, 3]); // top to bottom

  const getPosition = (id) => {
    if (id === 1) return "-translate-x-52 rotate-[-5deg]";
    if (id === 2) return "translate-x-0 rotate-0";
    if (id === 3) return "translate-x-52 rotate-[5deg]";
  };

  const getZIndex = (id) => {
    const index = stackOrder.indexOf(id);
    return `z-${30 - index * 10}`;
  };

  const handleClick = (id) => {
    setStackOrder((prev) => {
      const newOrder = prev.filter((item) => item !== id);
      return [id, ...newOrder];
    });
  };

  return (
    <div className="w-full flex items-center justify-center py-20 overflow-hidden">
      <div className="relative h-[520px] w-[1100px] flex items-center justify-center">
        {plans.map((plan) => {
          return (
            <div
              key={plan.id}
              onClick={() => handleClick(plan.id)}
              className={`
                absolute cursor-pointer transition-all duration-500 ease-in-out
                w-[340px] rounded-3xl p-8 shadow-2xl border border-zinc-200
                ${plan.color}
                ${getPosition(plan.id)}
                ${getZIndex(plan.id)}
              `}
            >
              <div className="space-y-6">
                <div>
                  <h3
                    className={`text-2xl font-bold ${
                      plan.id === 3 ? "text-right" : ""
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <div
                    className={`mt-4 flex items-end gap-2 ${
                      plan.id === 3 ? "justify-end text-right" : ""
                    }`}
                  >
                    <span className="text-5xl font-bold">{plan.price}</span>

                    <span className="text-sm opacity-70 mb-1">/ month</span>
                  </div>

                  <p
                    className={`mt-4 text-sm opacity-70 ${
                      plan.id === 3 ? "text-right" : ""
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <button
                  className={`w-full rounded-xl py-3 font-medium transition
                    ${
                      plan.id === 2
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-black text-white hover:bg-zinc-800"
                    }
                  `}
                >
                  Get Started
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className={`flex items-center gap-3 text-sm ${
                        plan.id === 3 ? "justify-end text-right" : ""
                      }`}
                    >
                      {plan.id !== 3 && <Check size={16} />}

                      <span>{feature}</span>

                      {plan.id === 3 && <Check size={16} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
