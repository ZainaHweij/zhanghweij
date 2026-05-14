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

const DESKTOP_POSITIONS = [
  { x: "-translate-x-52", rotate: "rotate-[-5deg]", scale: "scale-95" },
  { x: "translate-x-52", rotate: "rotate-[5deg]", scale: "scale-95" },
  { x: "translate-x-0", rotate: "rotate-0", scale: "scale-100" },
];

const MOBILE_POSITIONS = [
  { ty: "60px", scale: 0.88, opacity: 0.5, zi: 10 },
  { ty: "30px", scale: 0.94, opacity: 0.75, zi: 11 },
  { ty: "0px", scale: 1, opacity: 1, zi: 12 },
];

const initialDesktopOrder = [0, 2, 1];
const initialMobileOrder = [0, 2, 1]; // [bot, mid, top] — id 1 (black) on top

export default function PricingStack() {
  const [desktopOrder, setDesktopOrder] = useState(initialDesktopOrder);
  const [mobileOrder, setMobileOrder] = useState(initialMobileOrder);
  const rightBtnRef = useRef(null);
  const angleRef = useRef(0);
  const touchStartY = useRef(0);

  /* spinning conic border on right arrow */
  useEffect(() => {
    const el = rightBtnRef.current;
    let raf,
      t = 0;
    const rotate = () => {
      const ease = Math.abs(Math.sin(t));
      const step = 1 + ease * 6;
      angleRef.current = (angleRef.current + step) % 360;
      t += (step / 360) * Math.PI;
      el.style.setProperty("--angle", `${angleRef.current}deg`);
      raf = requestAnimationFrame(rotate);
    };
    rotate();
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Desktop controls ── */
  const rotateRight = () => setDesktopOrder(([a, b, c]) => [a, c, b]);

  const rotateLeft = () => setDesktopOrder(([a, b, c]) => [c, b, a]);

  const bringToFront = (planId) =>
    setDesktopOrder((prev) =>
      prev[2] === planId ? prev : [...prev.filter((x) => x !== planId), planId],
    );

  /* ── Mobile swipe ── */
  const cycleUp = () => setMobileOrder(([bot, mid, top]) => [top, bot, mid]);

  const cycleDown = () => setMobileOrder(([bot, mid, top]) => [mid, top, bot]);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) dy > 0 ? cycleUp() : cycleDown();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-2xl px-4">
        <h2 className="text-4xl font-bold">
          We help you achieve more for less.
        </h2>
        <p className="mt-3 text-zinc-600">
          Leading alternatives cost $1000/month. We deliver the same level of
          support at a fraction of the price.
        </p>
      </div>

      {/* ── Desktop fan stack ── */}
      <div className="relative h-[520px] w-[1100px] items-center justify-center hidden md:flex">
        {/* Left arrow */}
        <button
          onClick={rotateLeft}
          className="absolute left-0 z-10 bg-white border border-zinc-200 shadow-md rounded-full p-3 hover:scale-105 transition"
        >
          <ChevronLeft />
        </button>

        {/* Right arrow — spinning conic border */}
        <button
          ref={rightBtnRef}
          onClick={rotateRight}
          className="absolute right-0 z-10 flex items-center justify-center"
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
          const posIndex = desktopOrder.indexOf(plan.id);
          const { x, rotate, scale } = DESKTOP_POSITIONS[posIndex];

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
                  className={`flex items-end gap-2 w-full ${plan.alignRight ? "justify-end" : ""}`}
                >
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-70 mb-1">/ month</span>
                </div>

                <p className="text-sm opacity-70 w-full">{plan.description}</p>
                <a href="#register" className="w-full">
                  <button
                    className={`w-full rounded-xl py-3 font-medium transition ${plan.btn}`}
                  >
                    Get Started
                  </button>
                </a>

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

      {/* ── Mobile vertical swipe stack ── */}
      <div className="flex md:hidden flex-col items-center w-full px-6 mt-10">
        <div
          className="relative w-full h-[480px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {mobileOrder.map((planId, stackIdx) => {
            const plan = plans[planId];
            const pos = MOBILE_POSITIONS[stackIdx];

            return (
              <div
                key={plan.id}
                className={`
                  absolute w-full rounded-3xl p-8 border border-zinc-200
                  transition-all duration-500 ease-in-out
                  ${plan.color}
                `}
                style={{
                  transform: `translateY(${pos.ty}) scale(${pos.scale})`,
                  zIndex: pos.zi,
                  opacity: pos.opacity,
                  boxShadow:
                    stackIdx === 2
                      ? "0 20px_60px rgba(0,0,0,0.12)"
                      : "0 8px 30px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  className={`space-y-5 flex flex-col ${plan.alignRight ? "items-end text-right" : "items-start text-left"}`}
                >
                  <h3 className="text-2xl font-bold w-full">{plan.name}</h3>

                  <div
                    className={`flex items-end gap-2 w-full ${plan.alignRight ? "justify-end" : ""}`}
                  >
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-sm opacity-70 mb-1">/ month</span>
                  </div>

                  <p className="text-sm opacity-70 w-full">
                    {plan.description}
                  </p>
                  <a href="#register" className="w-full">
                    <button
                      className={`w-full rounded-xl py-3 font-medium transition ${plan.btn}`}
                    >
                      Get Started
                    </button>
                  </a>

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

        {/* Dots indicator — tappable */}
        <div className="flex gap-3 mt-4">
          {plans.map((_, i) => (
            <button
              key={i}
              onClick={() =>
                setMobileOrder((prev) => {
                  if (prev[2] === i) return prev;
                  const rest = prev.filter((x) => x !== i);
                  return [...rest, i];
                })
              }
              className={`rounded-full transition-all duration-300 ${
                mobileOrder[2] === i
                  ? "w-3 h-3 bg-zinc-900 scale-125"
                  : "w-3 h-3 bg-zinc-300"
              }`}
              aria-label={`Show ${plans[i].name}`}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-400 mt-3">
          Swipe up or down to browse plans
        </p>
      </div>
    </div>
  );
}
