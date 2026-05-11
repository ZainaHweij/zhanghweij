import { useState } from "react";

const CARD_DATA = [
  "SAT Prep",
  "College Counseling",
  "Extracurriculars",
  "Research Mentorship",
  "Science Olympiad",
  "ISEF Tutoring",
  "AP Prep",
  "Essay Writing",
  "STEM Projects",
  "Leadership",
  "Mock Interviews",
  "Math Tutoring",
  "Physics Help",
  "Debate Coaching",
  "Creative Writing",
  "Medical School Prep",
  "Language Learning",
  "Coding Bootcamp",
].map((text, i) => ({ id: i + 1, text }));

const BOX = { w: 1300, h: 500 };
const CARD = { w: 170, h: 60 };

const CENTER_BLOCK = {
  x: BOX.w / 2 - 240,
  y: BOX.h / 2 - 140,
  w: 480,
  h: 280,
};

const isColliding = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

function generateLayout() {
  const placed = [];
  return CARD_DATA.map((card) => {
    let attempts = 0;
    let rect;
    while (attempts < 3000) {
      rect = {
        x: Math.random() * (BOX.w - CARD.w),
        y: Math.random() * (BOX.h - CARD.h),
        w: CARD.w,
        h: CARD.h,
      };
      const hitsCenter = isColliding(rect, CENTER_BLOCK);
      const hitsOther = placed.some((p) => isColliding(rect, p));
      if (!hitsCenter && !hitsOther) break;
      attempts++;
    }
    placed.push(rect);
    return { ...card, x: rect.x, y: rect.y, rotate: Math.random() * 50 - 25 };
  });
}

export default function Help() {
  const [cards, setCards] = useState(() => generateLayout());

  return (
    <div className="w-full flex flex-col items-center py-20">
      <div
        onClick={() => setCards(generateLayout())}
        className="relative cursor-pointer"
        style={{
          width: "1300px",
          height: "500px",
          background: "#fafaf7",
          border: "1px solid #d4d4cc",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#e8e8e2"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Cards */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="absolute w-[170px] h-[60px] bg-black text-white text-sm font-medium rounded-md flex items-center justify-center transition-all duration-700"
            style={{
              left: card.x,
              top: card.y,
              transform: `rotate(${card.rotate}deg)`,
            }}
          >
            {card.text}
          </div>
        ))}

        {/* Center Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="text-center px-10 py-5"
            style={{
              background: "#fafaf7",
              border: "1px solid #d4d4cc",
              borderRadius: "4px",
            }}
          >
            <div className="text-5xl font-semibold">What we help with</div>
          </div>
        </div>
      </div>
    </div>
  );
}
