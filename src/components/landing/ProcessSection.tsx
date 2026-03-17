"use client";

import RedactionReveal from "@/components/ui/RedactionReveal";

const steps = [
  {
    number: "01",
    title: "BRIEFING",
    description:
      "You talk. We listen. No jargon, no fluff. Just a straight conversation about what your business needs.",
  },
  {
    number: "02",
    title: "BUILD",
    description:
      "We create the wow factor. Your site, deployed fast. Your choice of automations. Everything your business needs to focus, nothing to distract.",
  },
  {
    number: "03",
    title: "DEPLOY",
    description:
      "We flip the switch. No more chasing leads between jobs. No more missed calls turning into missed revenue. Your site handles the front desk so you can stay on the tools.",
  },
  {
    number: "04",
    title: "GROW",
    description:
      "We don't disappear after launch. We optimise, we tweak, we support. You rank on Google and you get to focus on the work that you want to do.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RedactionReveal>
          <p className="font-display text-sm tracking-widest text-[#ff2c64] mb-16">
            // THE SECRET
          </p>
        </RedactionReveal>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#ff2c64]/30" />

          {steps.map((step, index) => (
            <RedactionReveal key={step.number} delay={index * 250}>
              <div className="flex flex-col items-center text-center px-4">
                {/* Node */}
                <div className="w-16 h-16 rounded-full border-2 border-[#ff2c64] bg-[#1e1e1e] flex items-center justify-center mb-6 relative z-10">
                  <span className="font-display text-lg font-bold text-[#ff2c64]">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-sm tracking-widest text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[#aaaaaa] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RedactionReveal>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-8 relative pl-12">
          {/* Vertical connector */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#ff2c64]/30" />

          {steps.map((step, index) => (
            <RedactionReveal key={step.number} delay={index * 200}>
              <div className="relative">
                {/* Node */}
                <div className="absolute -left-12 top-0 w-12 h-12 rounded-full border-2 border-[#ff2c64] bg-[#1e1e1e] flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-[#ff2c64]">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-sm tracking-widest text-white mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[#aaaaaa] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RedactionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
