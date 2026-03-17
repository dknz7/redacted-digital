"use client";

import { useEffect, useRef, useState } from "react";

interface RedactionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function RedactionReveal({
  children,
  className = "",
  delay = 0,
}: RedactionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <div
        className={`transition-opacity duration-500 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>

      {/* Redaction bar slides away to reveal */}
      <div
        className={`absolute inset-0 bg-[#ff2c64] transition-transform duration-700 ease-out ${
          revealed ? "translate-x-full" : "translate-x-0"
        }`}
      />
    </div>
  );
}
