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
    bio: "Growing up as a first-generation immigrant, I learned to find my own seat at the table. Starting in middle school, I emailed my way into higher-level math classes and selective robotics and science clubs. By high school, I grew these opportunities into award-winning research, cited papers, PhD-level mentorship and connections, and competitive achievements that truly excited academic interest beyond stereotypical STEM extracurriculars. My experience writing scientific papers has allowed me to take a structured approach to crafting personal statements that as my AP teacher described, were “the best, most profound essays I’ve ever read.” I’m here to help you focus your energy on refining your story and gaining tangible opportunities rather than blindly cold emailing.",
    achievements: [
      "Duke RD Admit — 3.7%",
      "National Merit Finalist",
      "OHSU PSI Alumna — 25% Acceptance",
      "MIT BWSI SAT Program Alumna — Cybersecurity",
      "NCWIT Aspirations in Computing National Honorable Mention — 3,300 Applicants",
      "Regeneron Biomedical Science Award $400",
      "Nonprofit Founder — Reaching Students Worldwide",
      "Cited Researcher in International Surgical Journal",
      "US Army Research Award",
    ],
  },
  {
    name: "Sophie Zhang",
    role: "College Admissions Consultant",
    image: zhang,
    bio: "I started high school with no clear interests, no extracurriculars, and no idea on how the college admissions process worked. Over the next four years, I compiled advice from teachers, mentors, and alumni to build my application from the ground-up. I got a clearer idea of my healthcare interests, connected them to leadership and internship opportunities, and learned how to effectively pitch myself. I’ve been fortunate to be accepted into selective summer programs (~2% acceptance), earn tens of thousands of scholarship dollars, and gain admission to T10 universities like Northwestern. Beyond myself, I’ve helped students design and lead their own workshops, gain admission to graduate-level programs, and conduct research that was awarded Thermo Fisher qualification (top 10% of researchers). I took the long way—now I’m here to make the process stress-free for you.",
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
      <div className="absolute inset-y-0 right-0 w-10 z-10 pointer-events-none" />
      <div ref={ref} className="flex w-max py-1">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 whitespace-nowrap text-xs uppercase tracking-widest font-medium text-gray-500"
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── MOBILE LAYOUT ────────────────────────────────────────────────────────────

function MobileConsultantCard({
  consultant,
  imgPosition = "object-top",
}: {
  consultant: Consultant;
  imgPosition?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
          <img
            src={consultant.image}
            alt={consultant.name}
            className={`w-full h-full object-cover ${imgPosition}`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {consultant.name}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {consultant.role}
          </p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">{consultant.bio}</p>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
          Highlights
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="w-full overflow-hidden">
        <Ticker items={consultant.achievements} />
      </div>
    </div>
  );
}

function MobileCategorySection({
  title,
  subtitle,
  consultant,
  imgPosition,
}: {
  title: string;
  subtitle: string;
  consultant: Consultant;
  imgPosition?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-base font-bold text-gray-900">{title} →</h3>
        <p className="text-sm text-gray-500 italic">{subtitle}</p>
      </div>
      <MobileConsultantCard consultant={consultant} imgPosition={imgPosition} />
    </div>
  );
}

// ─── DESKTOP LAYOUT (original) ───────────────────────────────────────────────

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
      className={`flex flex-row gap-10 items-start ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div className="flex-shrink-0">
        <div className="w-64 h-80 rounded-2xl overflow-hidden">
          <img
            src={consultant.image}
            alt={consultant.name}
            className={`w-full h-full object-cover ${imgPosition}`}
          />
        </div>
      </div>
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
          <div className="h-px flex-1" />
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            Highlights
          </span>
          <div className="h-px flex-1" />
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

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

const AboutMe = () => (
  <section className="py-12 md:py-20">
    <div className="container mx-auto max-w-6xl px-4">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-secondary mb-2">
          College is confusing.
        </h2>
        <p className="text-sm md:text-base text-gray-700 italic">
          Don't worry – We've got you covered
        </p>
      </div>

      {/* Mobile layout — hidden on md and above */}
      <div className="flex flex-col gap-10 md:hidden">
        <MobileCategorySection
          title="Shooting for the top?"
          subtitle="We understand what it takes to get there"
          consultant={consultants[0]}
          imgPosition="object-top"
        />
        <div className="h-px bg-gray-100" />
        <MobileCategorySection
          title="Or maybe you're completely lost?"
          subtitle="It's not too late at all"
          consultant={consultants[1]}
          imgPosition="object-top"
        />
      </div>

      {/* Desktop layout — hidden below md */}
      <div className="hidden md:flex flex-col gap-8">
        <CategorySection
          title="Shooting for the top?"
          subtitle="We understand what it takes to get there"
          consultant={consultants[0]}
        />
        <CategorySection
          title="Or maybe you're completely lost?"
          subtitle="It's not too late at all"
          consultant={consultants[1]}
        />
      </div>
    </div>
  </section>
);

export default AboutMe;
