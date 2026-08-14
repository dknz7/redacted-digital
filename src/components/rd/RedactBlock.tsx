'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Block-level sibling to RedactBar. Where RedactBar covers one phrase inside a
 * sentence, this splits multi-line copy and sweeps a bar across each line in
 * turn. Lines are measured after wrap, so the effect survives a resize.
 *
 * blockColor exists because DESIGN.md forbids a black bar on a dark surface —
 * it is invisible. Dark sections pass a light bar; paper sections take the
 * default true black.
 */
export function RedactBlock({
  children,
  blockColor = 'var(--color-redact)',
  stagger = 0.11,
  duration = 0.7,
  animateOnScroll = true,
  delay = 0,
}: {
  children: React.ReactNode;
  blockColor?: string;
  stagger?: number;
  duration?: number;
  animateOnScroll?: boolean;
  delay?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Same intentional mount-detection flip as RedactBar: delays the effect
    // below by one commit so the client's real reduced-motion snapshot has
    // settled before anything touches the DOM.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fails open by construction: until this effect runs the copy is plain,
    // visible, un-split markup. Reduced motion and no-JS both land there.
    if (!mounted || reduced || !rootRef.current) return;

    const root = rootRef.current;
    const wrappers: HTMLElement[] = [];
    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      split = new SplitText(root, { type: 'lines' });

      const blocks = split.lines.map((line) => {
        const parent = line.parentNode;
        const wrap = document.createElement('div');
        wrap.style.cssText = 'position:relative;display:block;overflow:hidden';

        const block = document.createElement('div');
        block.setAttribute('aria-hidden', 'true');
        block.style.cssText =
          `position:absolute;inset:0;z-index:2;background:${blockColor};` +
          'transform:scaleX(0);transform-origin:left center';

        if (parent) parent.insertBefore(wrap, line);
        wrap.appendChild(line);
        wrap.appendChild(block);
        wrappers.push(wrap);
        return block;
      });

      gsap.set(split.lines, { opacity: 0 });

      gsap
        .timeline({
          defaults: { ease: 'power3.inOut' },
          delay,
          // once, never reverse — a headline that un-reveals itself on scroll-up
          // is a bug, not an effect.
          scrollTrigger: animateOnScroll
            ? { trigger: root, start: 'top 85%', once: true }
            : undefined,
        })
        .to(blocks, { scaleX: 1, duration, stagger, transformOrigin: 'left center' })
        .set(split.lines, { opacity: 1, stagger }, `<${duration / 2}`)
        .to(
          blocks,
          { scaleX: 0, duration, stagger, transformOrigin: 'right center' },
          `<${duration * 0.4}`,
        );
    }, root);

    return () => {
      ctx.revert();
      // SplitText caches and restores the original innerHTML, which takes the
      // injected wrappers with it. The sweep is belt-and-braces for StrictMode's
      // double invoke.
      split?.revert();
      wrappers.forEach((w) => w.remove());
    };
  }, [mounted, reduced, blockColor, stagger, duration, animateOnScroll, delay]);

  return <div ref={rootRef}>{children}</div>;
}
