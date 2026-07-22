"use client";

import RedactionReveal from "@/components/ui/RedactionReveal";
import Link from "next/link";

const projects = [
  {
    type: "Tiler — Central Coast",
    name: "Placeholder Client 1",
    description: "Before/after showcase placeholder",
  },
  {
    type: "Tattoo Artist — Hunter Valley",
    name: "Placeholder Client 2",
    description: "Booking system showcase placeholder",
  },
  {
    type: "Cafe — Central Coast",
    name: "Placeholder Client 3",
    description: "Google reviews showcase placeholder",
  },
];

export default function SocialProofSection() {
  return (
    <section className="pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RedactionReveal>
          <p className="font-display text-base md:text-lg tracking-widest text-[#ff2c64] mb-12">
            // DECLASSIFIED OPERATIONS
          </p>
        </RedactionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {projects.map((project, index) => (
            <RedactionReveal key={index} delay={index * 200}>
              <div className="bg-[#1e1e1e] rounded-lg border border-[#3a3a3a]/20 overflow-hidden hover:border-[#ff2c64]/40 transition-all duration-300 hover:-translate-y-1">
                {/* Image placeholder */}
                <div className="h-48 bg-[#222222] flex items-center justify-center">
                  <span className="font-display text-xs tracking-widest text-[#aaaaaa]">
                    [SCREENSHOT]
                  </span>
                </div>
                <div className="p-5">
                  <span className="font-display text-[10px] tracking-widest text-[#ff2c64]">
                    {project.type.toUpperCase()}
                  </span>
                  <h3 className="font-display text-sm tracking-wider text-white mt-2">
                    {project.name.toUpperCase()}
                  </h3>
                  <p className="font-body text-sm text-[#aaaaaa] mt-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </RedactionReveal>
          ))}
        </div>

        {/* Testimonial field report */}
        <RedactionReveal delay={800}>
          <div className="bg-[#1e1e1e] rounded-lg border border-[#3a3a3a]/20 p-8 max-w-2xl mx-auto">
            <span className="font-display text-[10px] tracking-widest text-[#ff2c64]">
              // FIELD REPORT
            </span>
            <blockquote className="mt-4 font-body text-lg text-white italic leading-relaxed">
              &ldquo;Placeholder testimonial from pilot client. This will be
              replaced with a real quote once pilot clients are
              onboarded.&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[#ff2c64]">★★★★★</span>
              <span className="font-display text-xs tracking-wider text-[#aaaaaa]">
                — CLIENT NAME, BUSINESS TYPE
              </span>
            </div>
          </div>
        </RedactionReveal>

        <div className="mt-8 text-center">
          <Link
            href="/success-stories"
            className="font-display text-sm tracking-wider text-[#ff2c64] hover:text-[#ff2c64]/80 transition-colors"
          >
            VIEW ALL OPERATIONS →
          </Link>
        </div>
      </div>
    </section>
  );
}
