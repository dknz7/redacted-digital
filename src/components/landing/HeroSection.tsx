"use client";

import TextScramble from "@/components/ui/TextScramble";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Background placeholder — scroll-driven frame animation replaces this later */}
      <div className="absolute inset-0 bg-[#303030] z-0" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-black/40 z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white">
          <TextScramble
            text="Your website is just an online ornament."
            duration={1800}
            delay={500}
          />
        </h1>

        {/* Reveal line */}
        <p className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-[#ff2c64] mb-4">
          <TextScramble
            text="Make it another tool in your toolbox. Put it to work!"
            duration={1500}
            delay={2500}
          />
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl font-body text-[#aaaaaa] mb-10">
          <TextScramble
            text="Less phone time, more tool time."
            duration={1200}
            delay={4200}
          />
        </p>

        {/* CTA */}
        <Link
          href="/contact"
          className="inline-block bg-[#ff2c64] text-white font-display text-sm md:text-base tracking-wider px-8 py-4 rounded-full hover:bg-[#ff2c64]/90 transition-colors duration-200"
        >
          REQUEST A BRIEFING
        </Link>
      </div>

      {/* Scroll prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-display text-xs tracking-widest text-[#aaaaaa]">
          SCROLL TO DECLASSIFY
        </span>
        <svg
          className="w-5 h-5 text-[#ff2c64]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
