import { useState } from "react";

const services = [
  "SATs",
  "College Counseling",
  "Extracurriculars",
  "Research Mentorship",
  "Science Olympiad",
  "ISEF Tutoring",
];

export default function Help() {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "SATs",
      x: 80,
      y: 140,
      rotate: -10,
    },
    {
      id: 2,
      text: "College Counseling",
      x: 860,
      y: 120,
      rotate: 35,
    },
    {
      id: 3,
      text: "Extracurriculars",
      x: 460,
      y: 110,
      rotate: 8,
    },
    {
      id: 4,
      text: "Research Mentorship",
      x: 230,
      y: 380,
      rotate: 10,
    },
    {
      id: 5,
      text: "Science Olympiad",
      x: 760,
      y: 420,
      rotate: 0,
    },
    {
      id: 6,
      text: "ISEF Tutoring",
      x: 610,
      y: 280,
      rotate: -24,
    },
  ]);

  const shuffleCards = () => {
    const CARD_WIDTH = 320;
    const CARD_HEIGHT = 95;

    const BOX_WIDTH = 1300;
    const BOX_HEIGHT = 500;

    const placed = [];

    const newCards = cards.map((card) => {
      let valid = false;
      let attempts = 0;

      let newX = 0;
      let newY = 0;

      while (!valid && attempts < 200) {
        newX = Math.random() * (BOX_WIDTH - CARD_WIDTH);
        newY = Math.random() * (BOX_HEIGHT - CARD_HEIGHT);

        valid = true;

        for (const p of placed) {
          const overlap =
            newX < p.x + CARD_WIDTH &&
            newX + CARD_WIDTH > p.x &&
            newY < p.y + CARD_HEIGHT &&
            newY + CARD_HEIGHT > p.y;

          if (overlap) {
            valid = false;
            break;
          }
        }

        attempts++;
      }

      const updated = {
        ...card,
        x: newX,
        y: newY,
        rotate: Math.random() * 50 - 25,
      };

      placed.push(updated);

      return updated;
    });

    setCards(newCards);
  };

  return (
    <div className="w-full py-20 flex flex-col items-center">
      <h1 className="text-7xl font-bold mb-16 text-center">
        Things we can help with
      </h1>

      <div
        className="relative w-[1300px] h-[500px] rounded-3xl "
        onClick={shuffleCards}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="
              absolute
              w-[320px]
              h-[95px]
              bg-black
              rounded-sm
              flex
              items-center
              justify-center
              text-white
              text-3xl
              font-medium
              cursor-pointer
              select-none
              transition-all
              duration-700
              ease-in-out
              shadow-xl
            "
            style={{
              left: card.x,
              top: card.y,
              transform: `rotate(${card.rotate}deg)`,
            }}
          >
            {card.text}
          </div>
        ))}
      </div>

      <p className="text-sm text-black/50 mt-6">Click anywhere in the box</p>
    </div>
  );
}
