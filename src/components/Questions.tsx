import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Once enrolled in the Mid or Elite tier, you must stay for one month to offset onboarding processes. After that one-month period, you may cancel anytime for a 100% refund. The Starter Plan has no commitment — it's a one-time session.",
  },
  {
    question: "How are meetings conducted?",
    answer:
      "We are highly flexible. Students can set up meetings at any time that works for them. We are open to meeting in-person in the Camas-Vancouver area or online via video call — whichever you prefer.",
  },
  {
    question: "What happens if I miss a meeting?",
    answer:
      "Life happens. If you need to reschedule, just let us know at least 24 hours in advance and we'll find a new time that works. Missed meetings without notice may be forfeited, but we always try to work something out.",
  },
  {
    question: "What topics can sessions cover?",
    answer:
      "Sessions can cover any academic subject, test prep, college application guidance, study skills, or career planning. If you're unsure whether we can help, just ask — we'll be honest about what we can offer.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "Typically within 1–2 business days of signing up. We'll reach out to schedule your first meeting and get you set up right away.",
  },
  {
    question: "Is there a contract I have to sign?",
    answer:
      "No long-term contracts. The Starter Plan is fully pay-as-you-go. The Growth and Elite plans have a one-month minimum to offset onboarding, but there's nothing to sign beyond that.",
  },
];

export default function Questions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="w-full flex flex-col items-center py-20 px-6">
      <div className="text-center max-w-2xl mb-14">
        <h2 className="text-4xl font-bold">Frequently asked questions</h2>
        <p className="mt-3 text-zinc-600">
          Everything you need to know before getting started.
        </p>
      </div>

      <div className="w-full max-w-2xl divide-y divide-zinc-200 border-t border-b border-zinc-200">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between py-5 text-left gap-4"
            >
              <span className="font-medium text-zinc-900 text-base">
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-zinc-500 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === i && (
              <p className="pb-5 text-sm text-zinc-600 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
