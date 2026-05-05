import { useEffect, useRef, useState } from "react";
import zhang from "@/assets/zhang.png";
import hweij from "@/assets/hweij.png";

interface Consultant {
  name: string;
  role: string;
  image: string;
  bio: string;
  achievements: string[];
}

const consultants: Consultant[] = [
  {
    name: "Sophie Zhang",
    role: "College Admissions Consultant",
    image: zhang,
    bio: "Sophie is an incoming Northwestern student who began high school without a clear academic direction, limited involvement, and little initial focus on her studies. Starting near the bottom of several classes, she gradually rebuilt her trajectory by independently seeking guidance from teachers, mentors, alumni, and professionals, and applying that insight to her own development. Over time, she clarified her interest in healthcare, connected it to meaningful leadership and internship opportunities, and learned how to strategically present her experiences. Having taken a non-linear path herself, she now helps students approach the college admissions process with greater clarity, structure, and confidence.",
    achievements: [
      "UW — Honors College, Near Full Ride",
      "Georgia Tech — $10K Annual Scholarship",
      "USC — $20K Annual Scholarship",
      "Northwestern RD Admit",
      "UCLA",
      "UMass Amherst — $18K Annual Scholarship",
      "Purdue — Honors College + $10K Annual Scholarship",
    ],
  },
  {
    name: "Zaina Hweij",
    role: "College Admissions Consultant",
    image: hweij,
    bio: "Zaina is an incoming Duke bioengineering student who combined academic excellence with a highly intentional pursuit of unconventional, engineering-focused experiences throughout high school. She manually sought and developed PhD-level mentorship connections, selective extracurricular involvement, and competitive achievements that truly excited academic interest compared to stereotypical STEM extracurriculars. A strong writer, her Common App personal statement was described by her AP teacher as \"one of the best, most profound ones I've ever read,\" adding that it \"really sang.\" She helps students refine their story and focus their energy on their work rather than endlessly cold emailing for broad opportunity.",
    achievements: [
      "UW Neuroscience Direct Admit",
      "Duke RD Admit",
      "National Merit Finalist",
      "OHSU PSI Alumna",
      "MIT BWSI SAT Program Alumna",
      "NCWIT Aspirations in Computing National Honorable Mention",
      "Regeneron Biomedical Science Award $400",
      "Cited Researcher by University Hospital Zurich",
    ],
  },
];

function Ticker({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const step = () => {
      posRef.current -= 0.4;
      // reset when we've scrolled one full copy
      const half = el.scrollWidth / 2;
      if (Math.abs(posRef.current) >= half) {
        posRef.current = 0;
      }
      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // render 2 copies flat so scrollWidth/2 = one copy
  const all = [...items, ...items];

  return (
    <div className="overflow-hidden w-full relative">
      {/* fade left */}
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
      {/* fade right */}
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

      <div ref={ref} className="flex w-max py-1">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 whitespace-nowrap text-xs uppercase tracking-widest font-medium text-gray-500"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ConsultantRow({ consultant, reverse, imgPosition = "object-top" }: { consultant: Consultant; reverse?: boolean; imgPosition?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row gap-10 items-start transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${reverse ? "md:flex-row-reverse" : ""}
      `}
    >
      {/* Photo */}
      <div className="flex-shrink-0">
        <div className="w-64 h-80 rounded-2xl overflow-hidden bg-gray-200">
          <img
            src={consultant.image}
            alt={consultant.name}
            className={`w-full h-full object-cover ${imgPosition}`}
          />
        </div>
      </div>

      {/* Text + ticker */}
      <div className="flex-1 flex flex-col gap-4 pt-1 min-w-0">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-1">{consultant.name}</h3>
        </div>
        <p className="text-base leading-relaxed text-gray-700">
          {consultant.bio}
        </p>

        {/* divider */}
        <div className="flex items-center gap-3 mt-1">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            Highlights
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* ticker — constrained to text column */}
        <div className="w-full overflow-hidden">
          <Ticker items={consultant.achievements} />
        </div>
      </div>
    </div>
  );
}

const AboutMe = () => (
  <section className="bg-gray-100 py-20">
    <div className="container mx-auto max-w-6xl px-4">

      {/* heading */}
      <div className="mb-16">
        <p className="text-sm uppercase tracking-widest mb-3 text-gray-400 font-medium">
          Trustworthy, personalized guidance
        </p>
        <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-gray-900">
          Meet your consultants.
        </h2>
      </div>

      {/* rows */}
      <div className="flex flex-col gap-12">
        {consultants.map((c, i) => (
          <ConsultantRow key={c.name} consultant={c} reverse={false} imgPosition={i === 0 ? "object-[center_20%]" : "object-top"} />
        ))}
      </div>

    </div>
  </section>
);

export default AboutMe;