import { useEffect, useRef } from "react";
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
    name: "Zaina Hweij",
    role: "College Admissions Consultant",
    image: hweij,
    bio: 'Zaina is an incoming Duke bioengineering student who combined academic excellence with a highly intentional pursuit of unconventional, engineering-focused experiences throughout high school. She manually sought and developed PhD-level mentorship connections, selective extracurricular involvement, and competitive achievements that truly excited academic interest compared to stereotypical STEM extracurriculars. A strong writer, her Common App personal statement was described by her AP teacher as "one of the best, most profound ones I\'ve ever read," adding that it "really sang." She helps students refine their story and focus their energy on their work rather than endlessly cold emailing for broad opportunity.',
    achievements: [
      "UW Neuroscience Direct Admit — <10 Seats State-Wide",
      "Duke RD Admit — 3.7%",
      "National Merit Finalist",
      "OHSU PSI Alumna — 25% Acceptance",
      "MIT BWSI SAT Program Alumna — Cybersecurity",
      "NCWIT Aspirations in Computing National Honorable Mention — 3,300 Applicants",
      "Regeneron Biomedical Science Award $400",
      "Cited Researcher by University Hospital Zurich",
      "Nonprofit Founder — Reaching Students Worldwide",
      "JEEE Research Publication",
      "US Army Research Award",
    ],
  },
  {
    name: "Sophie Zhang",
    role: "College Admissions Consultant",
    image: zhang,
    bio: "Sophie is an incoming Northwestern student who began high school without a clear academic direction, limited involvement, and little initial focus on her studies. Starting near the bottom of several classes, she gradually rebuilt her trajectory by independently seeking guidance from teachers, mentors, alumni, and professionals, and applying that insight to her own development. Over time, she clarified her interest in healthcare, connected it to meaningful leadership and internship opportunities, and learned how to strategically present her experiences. Having taken a non-linear path herself, she now helps students approach the college admissions process with greater clarity, structure, and confidence.",
    achievements: [
      "UW — Honors College, Full Ride",
      "Georgia Tech — $40K Scholarship",
      "USC — $80K Scholarship",
      "UCLA OOS",
      "Northeastern — $92K Scholarship",
      "Northwestern RD",
      "UCSB Research Mentorship Program — 2.5% Acceptance Rate",
      "ASTACAP Violin Level 10",
      "National Biomedical Engineering Conference Speaker",
      "Presidential Volunteer Service Gold Award",
      "1570 SAT",
      "Nonprofit Founder — 300+ Workshop Students",
      "Scientific Outreach Club President — ~50 Members",
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
      posRef.current -= 1.2;
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

  const all = [...items, ...items];

  return (
    <div className="overflow-hidden w-full relative">
      <div className="absolute inset-y-0 left-0 w-10 z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10  z-10 pointer-events-none" />
      <div ref={ref} className="flex w-max py-1">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 whitespace-nowrap text-xs uppercase tracking-widest font-medium text-gray-500"
          >
            <span className="w-1.5 h-1.5 rounded-full  flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ConsultantRow({
  consultant,
  reverse,
  imgPosition = "object-top",
}: {
  consultant: Consultant;
  reverse?: boolean;
  imgPosition?: string;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-10 items-start ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Photo */}
      <div className="flex-shrink-0">
        <div className="w-64 h-80 rounded-2xl overflow-hidden ">
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
          <h3 className="text-2xl font-semibold text-gray-900 mb-1">
            {consultant.name}
          </h3>
        </div>
        <p className="text-base leading-relaxed text-gray-700">
          {consultant.bio}
        </p>

        <div className="flex items-center gap-3 mt-1">
          <div className="h-px flex-1 " />
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            Highlights
          </span>
          <div className="h-px flex-1 " />
        </div>

        <div className="w-full overflow-hidden">
          <Ticker items={consultant.achievements} />
        </div>
      </div>
    </div>
  );
}

function CategorySection({
  title,
  subtitle,
  consultant,
}: {
  title: string;
  subtitle: string;
  consultant: Consultant;
}) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
          {title} →
        </h3>
        <p className="text-base md:text-lg text-gray-600 italic">{subtitle}</p>
      </div>
      <ConsultantRow consultant={consultant} />
    </div>
  );
}

const AboutMe = () => (
  <section className=" py-20">
    <div className="container mx-auto max-w-6xl px-4">
      <div className="mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-secondary mb-2">
          College is confusing.
        </h2>
        <p className="text-base text-gray-700 italic">
          Don't worry – We've got you covered
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <CategorySection
          title="SHOOTING FOR THE TOP?"
          subtitle="We understand what it takes to get there"
          consultant={consultants[0]}
        />
        <CategorySection
          title="OR MAYBE YOU'RE COMPLETELY LOST"
          subtitle="It's not too late at all"
          consultant={consultants[1]}
        />
      </div>
    </div>
  </section>
);

export default AboutMe;
