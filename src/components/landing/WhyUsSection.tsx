"use client";

import { useState } from "react";
import RedactionReveal from "@/components/ui/RedactionReveal";

const reasons = [
  {
    step: "01",
    heading: "Ugly websites don't get callbacks.",
    copy: "First impressions aren't just for dates. We build sites that make your business look like the premium choice — because you are. No templates. No cookie-cutter garbage. Just designs that make your competitors quietly panic.",
  },
  {
    step: "02",
    heading: "Leads on autopilot. You're welcome.",
    copy: "Every enquiry caught. Every follow-up sent. Every booking confirmed. All while you're elbow-deep in the actual work. Your website finally earns its keep.",
  },
  {
    step: "03",
    heading: "Google will know your name.",
    copy: "We don't just build pretty sites — we make sure your customers find you, book with you AND review you. SEO, Google Business Profile, local search domination. Map pack placement is yours to claim.",
  },
  {
    step: "04",
    heading: "An AI that never calls in sick.",
    copy: "Missed calls answered. Enquiries handled. Bookings made. At 2am on a Sunday. Your AI receptionist doesn't need coffee breaks, holidays, or motivation. It just works.",
  },
];

export default function WhyUsSection() {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RedactionReveal>
          <p className="font-display text-sm tracking-widest text-[#ff2c64] mb-4">
            // WHY REDACTED DIGITAL
          </p>
        </RedactionReveal>

        <RedactionReveal delay={200}>
          <p className="font-body text-xl md:text-2xl text-white mb-16">
            A website should work as hard as you do. Most don&apos;t. Ours do.
          </p>
        </RedactionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <div
              key={reason.step}
              className="relative bg-[#1e1e1e] rounded-lg border border-[#3a3a3a]/20 overflow-hidden cursor-pointer min-h-[300px]"
              onMouseEnter={() => setRevealedIndex(index)}
              onMouseLeave={() => setRevealedIndex(null)}
              onClick={() =>
                setRevealedIndex(revealedIndex === index ? null : index)
              }
            >
              {/* Default state */}
              <div
                className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-500 ${
                  revealedIndex === index ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="font-display text-4xl font-bold text-[#ff2c64]">
                  {reason.step}
                </span>
                <h3 className="font-display text-base tracking-wider text-white">
                  {reason.heading.toUpperCase()}
                </h3>
                <span className="absolute top-3 right-3 font-display text-[10px] tracking-widest text-[#3a3a3a]/50 rotate-12 select-none">
                  CLASSIFIED
                </span>
              </div>

              {/* Revealed state */}
              <div
                className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-500 ${
                  revealedIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div>
                  <span className="font-display text-[10px] tracking-widest text-[#ff2c64]">
                    [DECLASSIFIED]
                  </span>
                  <h3 className="font-display text-sm tracking-wider text-[#ff2c64] mt-2 mb-3">
                    {reason.heading.toUpperCase()}
                  </h3>
                  <p className="font-body text-sm text-white leading-relaxed">
                    {reason.copy}
                  </p>
                </div>
              </div>

              {/* Accent border slides in on hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2c64] transition-transform duration-500 origin-left ${
                  revealedIndex === index ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Mobile hint */}
        <p className="mt-4 text-center font-display text-xs tracking-widest text-[#aaaaaa] md:hidden">
          TAP TO DECLASSIFY
        </p>
      </div>
    </section>
  );
}
