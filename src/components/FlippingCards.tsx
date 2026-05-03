import { useEffect, useState } from "react";

import harvardLogo from "@/assets/logos/harvard.png";
import stanfordLogo from "@/assets/logos/stanford.png";
import caltechLogo from "@/assets/logos/caltech.png";
import cornellLogo from "@/assets/logos/cornell.png";
import dukeLogo from "@/assets/logos/duke.png";
import hopkinsLogo from "@/assets/logos/hopkins.png";
import northwesternLogo from "@/assets/logos/northwestern.png";
import upennLogo from "@/assets/logos/penn.png";
import uclaLogo from "@/assets/logos/ucla.png";
import vanderbiltLogo from "@/assets/logos/vanderbilt.png";

type School = {
  name: string;
  logo: string;
  rate: string;
};

const schools: School[] = [
  { name: "Harvard", logo: harvardLogo, rate: "4.18%" },
  { name: "Stanford", logo: stanfordLogo, rate: "3.80%" },
  { name: "Caltech", logo: caltechLogo, rate: "3.78%" },
  { name: "Cornell", logo: cornellLogo, rate: "8.38%" },
  { name: "Duke", logo: dukeLogo, rate: "4.73%" },
  { name: "Johns Hopkins", logo: hopkinsLogo, rate: "6.11%" },
  { name: "Northwestern", logo: northwesternLogo, rate: "7.00%" },
  { name: "UPenn", logo: upennLogo, rate: "4.92%" },
];

export default function FlippingCards() {
  const [flipped, setFlipped] = useState<boolean[]>(
    () => Array(schools.length).fill(false)
  );
const flipTwoRandom = (prev: boolean[]) => {
  const next = [...prev];

  const available = next
    .map((v, i) => (!v ? i : -1))
    .filter((i) => i !== -1);

  if (available.length < 2) return { next, pair: [] as number[] };

  const first =
    available[Math.floor(Math.random() * available.length)];

  let second =
    available[Math.floor(Math.random() * available.length)];

  while (second === first && available.length > 1) {
    second =
      available[Math.floor(Math.random() * available.length)];
  }

  next[first] = true;
  next[second] = true;

  return { next, pair: [first, second] };
};
  // ✅ max 2 flipped at a time
useEffect(() => {
  let lastPair: number[] = [];

  // 🔥 INITIAL LOAD FLIP (runs immediately once)
  setFlipped((prev) => {
    const { next, pair } = flipTwoRandom(prev);

    if (pair.length === 2) {
      lastPair = pair;

      setTimeout(() => {
        setFlipped((p) => {
          const updated = [...p];
          updated[pair[0]] = false;
          updated[pair[1]] = false;
          return updated;
        });
      }, 1500);
    }

    return next;
  });

  // 🔁 CONTINUOUS LOOP
  const interval = setInterval(() => {
    setFlipped((prev) => {
      const next = [...prev];

      const available = next
        .map((v, i) => (!v ? i : -1))
        .filter((i) => i !== -1);

      if (available.length < 2) return next;

      const filtered = available.filter(
        (i) => !lastPair.includes(i)
      );

      const pool = filtered.length >= 2 ? filtered : available;

      const first =
        pool[Math.floor(Math.random() * pool.length)];

      let second =
        pool[Math.floor(Math.random() * pool.length)];

      while (second === first && pool.length > 1) {
        second = pool[Math.floor(Math.random() * pool.length)];
      }

      next[first] = true;
      next[second] = true;

      lastPair = [first, second];

      setTimeout(() => {
        setFlipped((p) => {
          const updated = [...p];
          updated[first] = false;
          updated[second] = false;
          return updated;
        });
      }, 1500);

      return next;
    });
  }, 2200);

  return () => clearInterval(interval);
}, []);

  const Card = (school: School, i: number) => (
    <div key={i} className="w-32 h-40 [perspective:1000px]">
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow flex items-center justify-center p-2"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={school.logo}
            alt={school.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow flex items-center justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <p className="text-lg font-semibold">{school.rate}</p>
        </div>
      </div>
    </div>
  );
return (
  <div className="absolute inset-0 pt-20 flex justify-end items-center overflow-hidden pointer-events-none">

    {/* RIGHT PANEL */}
    <div className="w-[42%] h-full flex items-center justify-center pr-10">

      <div className="flex gap-4 items-center">

        {/* COLUMN 1 → 2 cards centered vertically */}
        <div className="flex flex-col justify-center gap-4 h-[320px]">
          {schools.slice(0, 2).map((s, i) => Card(s, i))}
        </div>

        {/* COLUMN 2 → 3 cards */}
        <div className="flex flex-col gap-4">
          {schools.slice(2, 5).map((s, i) => Card(s, i + 2))}
        </div>

        {/* COLUMN 3 → 3 cards */}
        <div className="flex flex-col gap-4">
          {schools.slice(5, 8).map((s, i) => Card(s, i + 5))}
        </div>

      </div>

    </div>

  </div>
);
 
}