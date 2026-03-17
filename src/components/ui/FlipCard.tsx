"use client";

import { useState } from "react";
import Link from "next/link";

interface FlipCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
  index: number;
}

export default function FlipCard({
  title,
  description,
  href,
  icon,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 h-64 md:h-72 cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden bg-[#1e1e1e] rounded-lg border border-[#3a3a3a]/20 p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#ff2c64] rounded-t-lg" />
          <span className="absolute top-3 left-3 font-display text-[10px] tracking-widest text-[#3a3a3a]/50 -rotate-12 select-none">
            CLASSIFIED
          </span>
          <span className="text-3xl mb-3">{icon}</span>
          <h3 className="font-display text-base md:text-lg tracking-wider text-white">
            {title.toUpperCase()}
          </h3>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-[#222222] rounded-lg border border-[#ff2c64]/30 p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <span className="font-display text-[10px] tracking-widest text-[#ff2c64]">
              [DECLASSIFIED]
            </span>
            <p className="mt-3 font-body text-sm md:text-base text-white leading-relaxed">
              {description}
            </p>
          </div>
          <Link
            href={href}
            className="font-display text-xs tracking-wider text-[#ff2c64] hover:text-[#ff2c64]/80 transition-colors"
          >
            VIEW FULL BRIEF →
          </Link>
        </div>
      </div>
    </div>
  );
}
