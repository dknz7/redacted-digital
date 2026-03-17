"use client";

import RedactionReveal from "@/components/ui/RedactionReveal";
import Link from "next/link";

const problems = [
  {
    problem: "Your website is just a digital business card.",
    fix: "We rebuild it as a lead system — capturing enquiries, booking jobs, and following up automatically. Your site earns its keep.",
  },
  {
    problem: "You're invisible on Google.",
    fix: "SEO, Google Business Profile optimisation, and local search strategy. We put you on the map — literally.",
  },
  {
    problem: "Missed calls are costing you jobs.",
    fix: "AI receptionist and missed-call text-back. Every call gets answered. Every lead gets captured. Even at 2am.",
  },
  {
    problem: "You've got no reviews — or bad ones running the show.",
    fix: "Automated review requests after every job. Your happy customers finally speak up. Your Google rating climbs.",
  },
  {
    problem: "You're drowning in admin instead of doing actual work.",
    fix: "Automated follow-ups, booking confirmations, reminders, and lead nurturing. The system handles the admin. You handle the tools.",
  },
];

export default function ProblemsFixSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <RedactionReveal>
          <p className="font-display text-sm tracking-widest text-[#ff2c64] mb-2">
            // COMMON PROBLEMS WE FIX
          </p>
        </RedactionReveal>
        <RedactionReveal delay={200}>
          <p className="font-body text-lg text-[#aaaaaa] mb-12">
            Your business might be dealing with one — or all — of these.
            We&apos;ve seen them. We fix them.
          </p>
        </RedactionReveal>

        <div className="space-y-6">
          {problems.map((item, index) => (
            <RedactionReveal key={index} delay={index * 200}>
              <div className="bg-[#1e1e1e] rounded-lg border border-[#3a3a3a]/20 p-6">
                <h3 className="font-display text-base tracking-wider text-white mb-3">
                  {item.problem}
                </h3>
                <div className="flex items-start gap-2">
                  <span className="font-display text-[10px] tracking-widest text-[#ff2c64] whitespace-nowrap mt-1">
                    [COUNTERMEASURE]:
                  </span>
                  <p className="font-body text-sm text-[#aaaaaa] leading-relaxed">
                    {item.fix}
                  </p>
                </div>
              </div>
            </RedactionReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block bg-[#ff2c64] text-white font-display text-sm tracking-wider px-8 py-4 rounded-full hover:bg-[#ff2c64]/90 transition-colors duration-200"
          >
            LET&apos;S FIX YOURS →
          </Link>
        </div>
      </div>
    </section>
  );
}
