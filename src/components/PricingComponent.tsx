import { useState, useEffect, useRef } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

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

const POSITIONS = [
  { x: "-translate-x-52", rotate: "rotate-[-5deg]", scale: "scale-95" },
  { x: "translate-x-52", rotate: "rotate-[5deg]", scale: "scale-95" },
  { x: "translate-x-0", rotate: "rotate-0", scale: "scale-100" },
];

const initialOrder = [0, 2, 1];

export default function PricingStack() {
  const [stackOrder, setStackOrder] = useState(initialOrder);
  const rightBtnRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const el = rightBtnRef.current;
    let raf;
    let t = 0;
    const rotate = () => {
      const ease = Math.abs(Math.sin(t));
      const step = 1 + ease * 6;
      angleRef.current = (angleRef.current + step) % 360;
      t += (step / 360) * Math.PI; // advance t exactly one π per full circle
      el.style.setProperty("--angle", `${angleRef.current}deg`);
      raf = requestAnimationFrame(rotate);
    };
    rotate();
    return () => cancelAnimationFrame(raf);
  }, []);
  const rotateRight = () =>
    setStackOrder(([first, second, third]) => [first, third, second]);

  const rotateLeft = () =>
    setStackOrder(([first, second, third]) => [third, second, first]);

  const bringToFront = (planId) =>
    setStackOrder((prev) => {
      if (prev[2] === planId) return prev;
      return [...prev.filter((x) => x !== planId), planId];
    });

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="text-center max-w-2xl">
        <h2 className="text-4xl font-bold">
          We help you achieve more for less.
        </h2>
        <p className="mt-3 text-zinc-600">
          Leading alternatives cost $1000/month. We deliver the same level of
          support at a fraction of the price.
        </p>
      </div>

      <div className="relative h-[520px] w-[1100px] flex items-center justify-center">
        {/* LEFT ARROW */}
        <button
          onClick={rotateLeft}
          className="absolute left-0 z-50 bg-white border border-zinc-200 shadow-md rounded-full p-3 hover:scale-105 transition"
        >
          <ChevronLeft />
        </button>

        {/* RIGHT ARROW — glowing border */}
        <button
          ref={rightBtnRef}
          onClick={rotateRight}
          className="absolute right-0 z-50 flex items-center justify-center"
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            border: "2px solid transparent",
            background:
              "linear-gradient(#fff, #fff) padding-box, conic-gradient(from var(--angle, 0deg), transparent, #a855f7 25%, transparent 40%) border-box",
            boxShadow: "0 0 6px rgba(168,85,247,0.2)",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={20} />
        </button>

        {plans.map((plan) => {
          const posIndex = stackOrder.indexOf(plan.id);
          const { x, rotate, scale } = POSITIONS[posIndex];

          return (
            <div
              key={plan.id}
              onClick={() => bringToFront(plan.id)}
              className={`
                absolute cursor-pointer transition-all duration-500 ease-in-out
                w-[340px] rounded-3xl p-8 border border-zinc-200
                shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                ${plan.color} ${x} ${rotate} ${scale}
              `}
              style={{ zIndex: posIndex + 10 }}
            >
              <div
                className={`space-y-6 flex flex-col ${plan.alignRight ? "items-end text-right" : "items-start text-left"}`}
              >
                <h3 className="text-2xl font-bold w-full">{plan.name}</h3>

                <div
                  className={` flex items-end gap-2 w-full ${plan.alignRight ? "justify-end" : ""}`}
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
                  className={`space-y-3 w-full ${plan.alignRight ? "flex flex-col items-end" : ""}`}
                >
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className={`flex items-center gap-3 text-sm w-full ${plan.alignRight ? "flex-row-reverse" : ""}`}
                    >
                      <Check size={16} className="shrink-0" />
                      <span>{feature}</span>
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
