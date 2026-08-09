'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function RedactBar({
  children,
  permanent = false,
}: {
  children: React.ReactNode;
  permanent?: boolean;
}) {
  const barRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (permanent || !barRef.current || !wrapRef.current) return;
    if (reduced) {
      gsap.set(barRef.current, { scaleX: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 0,
        transformOrigin: 'right center',
        ease: 'power3.inOut',
        duration: 0.7,
        scrollTrigger: { trigger: wrapRef.current, start: 'top 75%', once: true },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [permanent, reduced]);

  return (
    <span ref={wrapRef} className="relative inline-block align-baseline">
      <span className={permanent ? 'invisible' : ''}>{children}</span>
      <span
        ref={barRef}
        aria-hidden="true"
        className="absolute inset-0 bg-redact"
      />
    </span>
  );
}
