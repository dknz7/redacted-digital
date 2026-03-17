"use client";

import RedactionReveal from "@/components/ui/RedactionReveal";

const painPoints = [
  "No answer means your competitor has already been called.",
  "Page 4 of Google is where local businesses go to hide.",
  "If you don't respond on first contact, they'll book someone who does.",
  "Isn't your best work invisible if nobody reviews it?",
];

export default function ProblemSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Classified document card */}
        <div className="bg-[#1e1e1e] rounded-lg p-8 md:p-12 border border-[#3a3a3a]/20 relative">
          {/* Watermark */}
          <span className="absolute top-4 right-4 font-display text-xs tracking-widest text-[#3a3a3a]/40 rotate-12 select-none">
            CLASSIFIED
          </span>

          <div className="space-y-6">
            {painPoints.map((point, index) => (
              <RedactionReveal key={index} delay={index * 300}>
                <p className="font-display text-lg md:text-xl tracking-wide text-white">
                  {point}
                </p>
              </RedactionReveal>
            ))}
          </div>

          {/* Closing prompt */}
          <RedactionReveal delay={painPoints.length * 300 + 200}>
            <p className="mt-12 font-display text-sm tracking-widest text-[#ff2c64]">
              // THREAT ASSESSMENT COMPLETE — Countermeasures below.
            </p>
          </RedactionReveal>
        </div>
      </div>
    </section>
  );
}
