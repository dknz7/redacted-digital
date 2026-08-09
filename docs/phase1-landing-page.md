> **SUPERSEDED 2026-08-09.** Describes the v1 build, which was deleted. The live
> design is `docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md`.

# Redacted Digital — Phase 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and deploy the Redacted Digital landing page — a cinematic, scroll-driven, classified-themed single page with 11 sections, serving as the agency's flagship marketing page.

**Architecture:** Next.js App Router with Tailwind CSS for styling. GSAP + ScrollTrigger for scroll-driven animations. Static site generation (SSG) for performance. Component-based architecture with a shared design system. Deployed to Vercel.

**Tech Stack:** Next.js 14+, Tailwind CSS, GSAP + ScrollTrigger, TypeScript, Vercel

**Design Document:** `docs/plans/2026-03-10-redacted-digital-site-design.md`

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json` (via npx)
- Create: `tailwind.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `.gitignore`
- Create: `next.config.js`
- Create: `tsconfig.json` (auto-generated)

**Step 1: Initialise Next.js project**

Run:
```bash
npx create-next-app@latest redacted-digital --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
Expected: Project created with App Router, TypeScript, Tailwind, src directory.

**Step 2: Install GSAP and ScrollTrigger**

Run:
```bash
cd redacted-digital
npm install gsap
```
Expected: gsap added to package.json dependencies.

**Step 3: Verify dev server starts**

Run:
```bash
npm run dev
```
Expected: Server starts on localhost:3000, default Next.js page renders.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialise Next.js project with Tailwind and GSAP"
```

---

## Task 2: Design System — Tailwind Configuration

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `src/lib/fonts.ts`

**Step 1: Update Tailwind config with design tokens**

Replace the contents of `tailwind.config.ts` with the Redacted Digital colour palette, font families, and custom extensions:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#303030",
        "surface-recessed": "#1E1E1E",
        "surface-dark": "#222222",
        "surface-elevated": "#3A3A3A",
        "surface-hover": "#404040",
        accent: "#FF2C64",
        "text-primary": "#FFFFFF",
        "text-secondary": "#AAAAAA",
        "ticker-bg": "#282828",
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "ticker-scroll": "ticker 30s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Set up Google Fonts in font config**

Create `src/lib/fonts.ts`:

```typescript
import { JetBrains_Mono, Outfit } from "next/font/google";

export const fontDisplay = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const fontBody = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});
```

**Step 3: Update globals.css with base styles**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-primary text-text-primary font-body;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display uppercase tracking-wide;
  }

  ::selection {
    @apply bg-accent text-white;
  }
}

/* Grain overlay texture */
.grain-overlay::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #1E1E1E;
}
::-webkit-scrollbar-thumb {
  background: #FF2C64;
  border-radius: 4px;
}
```

**Step 4: Update root layout with fonts and grain overlay**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redacted Digital | Less Phone Time, More Tool Time",
  description:
    "Smart websites that capture leads, book jobs, and follow up automatically. Central Coast & Hunter Valley, NSW.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="grain-overlay">{children}</body>
    </html>
  );
}
```

**Step 5: Verify fonts and colours render**

Run:
```bash
npm run dev
```
Visit localhost:3000. Verify: dark #303030 background, grain overlay visible, fonts loading (check Network tab for Google Fonts requests).

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: design system — colours, typography, grain overlay, base styles"
```

---

## Task 3: Floating Pill Navigation

**Files:**
- Create: `src/components/navigation/PillNav.tsx`
- Modify: `src/app/layout.tsx` (add PillNav)

**Step 1: Build the PillNav component**

Create `src/components/navigation/PillNav.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function PillNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
        scrolled
          ? "bg-surface-recessed/80 backdrop-blur-xl shadow-lg"
          : "bg-surface-recessed/60 backdrop-blur-md"
      } w-[calc(100%-2rem)] max-w-6xl`}
    >
      {/* Wordmark */}
      <Link href="/" className="font-display font-bold text-sm tracking-widest text-text-primary">
        REDACTED<span className="text-accent">DIGITAL</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-display text-xs tracking-wider text-text-secondary hover:text-accent transition-colors duration-200"
          >
            {link.label.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        className="hidden md:block bg-accent text-white font-display text-xs tracking-wider px-5 py-2 rounded-full hover:bg-accent/90 transition-colors duration-200"
      >
        REQUEST A BRIEFING
      </Link>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ${
            mobileOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-300 ${
            mobileOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ${
            mobileOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-recessed/95 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm tracking-wider text-text-secondary hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-accent text-white font-display text-sm tracking-wider px-5 py-3 rounded-full text-center hover:bg-accent/90 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            REQUEST A BRIEFING
          </Link>
        </div>
      )}
    </nav>
  );
}
```

**Step 2: Add PillNav to root layout**

Modify `src/app/layout.tsx` — add `import PillNav from "@/components/navigation/PillNav";` and place `<PillNav />` inside the body before `{children}`.

**Step 3: Verify navigation renders**

Run:
```bash
npm run dev
```
Verify: floating pill nav appears at top, glassmorphism effect visible, hamburger works on mobile viewport (resize browser), links are present, CTA button styled in #FF2C64.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: floating pill navigation with glassmorphism and mobile hamburger"
```

---

## Task 4: Hero Section — Static Layout (No Animation Yet)

**Files:**
- Create: `src/components/landing/HeroSection.tsx`
- Create: `src/components/ui/TextScramble.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the TextScramble component**

Create `src/components/ui/TextScramble.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  duration = 1500,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    const steps = 20;
    const interval = duration / steps;
    let step = 0;

    const scrambleInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      const resolved = Math.floor(progress * text.length);

      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < resolved) {
          result += text[i];
        } else if (text[i] === " ") {
          result += " ";
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayed(result);

      if (step >= steps) {
        clearInterval(scrambleInterval);
        setDisplayed(text);
      }
    }, interval);

    return () => clearInterval(scrambleInterval);
  }, [started, text, duration]);

  return (
    <span ref={ref} className={className}>
      {started ? displayed : "\u00A0".repeat(text.length)}
    </span>
  );
}
```

**Step 2: Build the HeroSection component**

Create `src/components/landing/HeroSection.tsx`:

```tsx
"use client";

import TextScramble from "@/components/ui/TextScramble";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Background placeholder — frame animation will replace this later */}
      <div className="absolute inset-0 bg-primary z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
          <TextScramble
            text="Your website is just an online ornament."
            duration={1800}
            delay={500}
          />
        </h1>

        {/* Reveal line */}
        <p className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-accent mb-4">
          <TextScramble
            text="Make it another tool in your toolbox. Put it to work!"
            duration={1500}
            delay={2500}
          />
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl font-body text-text-secondary mb-10">
          <TextScramble
            text="Less phone time, more tool time."
            duration={1200}
            delay={4200}
          />
        </p>

        {/* CTA */}
        <Link
          href="/contact"
          className="inline-block bg-accent text-white font-display text-sm md:text-base tracking-wider px-8 py-4 rounded-full hover:bg-accent/90 transition-colors duration-200"
        >
          REQUEST A BRIEFING
        </Link>

        {/* Scroll prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-display text-xs tracking-widest text-text-secondary">
            SCROLL TO DECLASSIFY
          </span>
          <svg
            className="w-5 h-5 text-accent"
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
      </div>
    </section>
  );
}
```

**Step 3: Wire HeroSection into the landing page**

Replace `src/app/page.tsx`:

```tsx
import HeroSection from "@/components/landing/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
```

**Step 4: Verify hero renders**

Run:
```bash
npm run dev
```
Verify: full-viewport hero section, text scramble effect plays through headline → reveal → tagline in sequence, CTA button visible in #FF2C64, scroll prompt at bottom with bounce animation. Check mobile viewport — text should scale down cleanly.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: hero section with text scramble effect and CTA"
```

---

## Task 5: Scrolling Capability Ticker

**Files:**
- Create: `src/components/landing/TickerSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the TickerSection component**

Create `src/components/landing/TickerSection.tsx`:

```tsx
export default function TickerSection() {
  const capabilities = [
    "WEB DESIGN",
    "LEAD CAPTURE",
    "AI AUTOMATION",
    "SEO",
    "LOCAL SEARCH",
    "BOOKING SYSTEMS",
    "REVIEW MANAGEMENT",
    "AI RECEPTIONIST",
    "MISSED CALL RECOVERY",
    "GOOGLE BUSINESS PROFILE",
    "CRM",
    "SMS FOLLOW-UP",
    "MOBILE APP MANAGEMENT",
  ];

  const separator = " // ";
  const tickerContent = capabilities.join(separator) + separator;

  return (
    <section className="w-full bg-ticker-bg py-3 overflow-hidden border-y border-surface-elevated/30">
      <div className="animate-ticker-scroll whitespace-nowrap font-display text-sm tracking-widest text-accent">
        <span>{tickerContent}</span>
        <span>{tickerContent}</span>
      </div>
    </section>
  );
}
```

**Step 2: Add TickerSection to page**

Modify `src/app/page.tsx` — import and add `<TickerSection />` after `<HeroSection />`.

**Step 3: Verify ticker renders and scrolls**

Run:
```bash
npm run dev
```
Verify: continuous horizontal scrolling marquee below the hero, #FF2C64 monospaced text on #282828 background, smooth infinite loop, no jump/gap at repeat point.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: scrolling capability ticker with infinite CSS animation"
```

---

## Task 6: The Problem Section

**Files:**
- Create: `src/components/landing/ProblemSection.tsx`
- Create: `src/components/ui/RedactionReveal.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the RedactionReveal component**

Create `src/components/ui/RedactionReveal.tsx`:

```tsx
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

      {/* Redaction bar */}
      <div
        className={`absolute inset-0 bg-accent transition-transform duration-700 ease-out ${
          revealed ? "translate-x-full" : "translate-x-0"
        }`}
      />
    </div>
  );
}
```

**Step 2: Build the ProblemSection component**

Create `src/components/landing/ProblemSection.tsx`:

```tsx
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
        {/* Classified document styling */}
        <div className="bg-surface-recessed rounded-lg p-8 md:p-12 border border-surface-elevated/20 relative">
          {/* Watermark */}
          <span className="absolute top-4 right-4 font-display text-xs tracking-widest text-surface-elevated/40 rotate-12">
            CLASSIFIED
          </span>

          <div className="space-y-6">
            {painPoints.map((point, index) => (
              <RedactionReveal key={index} delay={index * 300}>
                <p className="font-display text-lg md:text-xl tracking-wide text-text-primary">
                  {point}
                </p>
              </RedactionReveal>
            ))}
          </div>

          {/* Closing prompt */}
          <RedactionReveal delay={painPoints.length * 300 + 200}>
            <p className="mt-12 font-display text-sm tracking-widest text-accent">
              // THREAT ASSESSMENT COMPLETE — Countermeasures below.
            </p>
          </RedactionReveal>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Add ProblemSection to page**

Modify `src/app/page.tsx` — import and add `<ProblemSection />` after `<TickerSection />`.

**Step 4: Verify section renders with redaction reveals**

Run:
```bash
npm run dev
```
Verify: dark recessed card with CLASSIFIED watermark, pain points reveal one by one as you scroll into view (redaction bar slides away to reveal text), closing prompt appears last in #FF2C64. Check mobile — text should be readable and animations still trigger.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: problem section with redaction reveal animations"
```

---

## Task 7: The Solution Section — Flip Cards

**Files:**
- Create: `src/components/landing/SolutionSection.tsx`
- Create: `src/components/ui/FlipCard.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the FlipCard component**

Create `src/components/ui/FlipCard.tsx`:

```tsx
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
  index,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 h-64 md:h-72 cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden bg-surface-recessed rounded-lg border border-surface-elevated/20 p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="border-t-2 border-accent absolute top-0 left-0 right-0 rounded-t-lg" />
          <span className="absolute top-3 left-3 font-display text-[10px] tracking-widest text-surface-elevated/30 -rotate-12">
            CLASSIFIED
          </span>
          <span className="text-3xl mb-3">{icon}</span>
          <h3 className="font-display text-base md:text-lg tracking-wider text-text-primary">
            {title.toUpperCase()}
          </h3>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-surface-dark rounded-lg border border-accent/30 p-6 flex flex-col justify-between rotate-y-180"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <span className="font-display text-[10px] tracking-widest text-accent">
              [DECLASSIFIED]
            </span>
            <p className="mt-3 font-body text-sm md:text-base text-text-primary leading-relaxed">
              {description}
            </p>
          </div>
          <Link
            href={href}
            className="font-display text-xs tracking-wider text-accent hover:text-accent/80 transition-colors"
          >
            VIEW FULL BRIEF →
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Build the SolutionSection component**

Create `src/components/landing/SolutionSection.tsx`:

```tsx
"use client";

import FlipCard from "@/components/ui/FlipCard";
import RedactionReveal from "@/components/ui/RedactionReveal";
import Link from "next/link";

const services = [
  {
    title: "Design",
    description:
      "A website that doesn't just exist. It wows your visitors and works for you. Just like your work and tools.",
    href: "/services/design",
    icon: "🎨",
  },
  {
    title: "Lead Capturing",
    description:
      "Every enquiry caught. Every lead followed up. Automatically.",
    href: "/services/lead-capturing",
    icon: "🎯",
  },
  {
    title: "AI & Automation",
    description:
      "Missed calls and lost bookings a thing of the past. 24/7.",
    href: "/services/ai-automation",
    icon: "🤖",
  },
  {
    title: "SEO & Local Search",
    description:
      "Be the first local business they find, not your competitor with a better site.",
    href: "/services/seo",
    icon: "📍",
  },
  {
    title: "Mobile App Management",
    description:
      "Run and manage your business from your pocket. Take advantage of our powerful integrations.",
    href: "/services/mobile-management",
    icon: "📱",
  },
];

export default function SolutionSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RedactionReveal>
          <p className="font-body text-xl md:text-2xl text-text-primary mb-16 text-center max-w-3xl mx-auto">
            Do what you do best — the tools, the work. Not the admin.
          </p>
        </RedactionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <FlipCard key={service.title} {...service} index={index} />
          ))}
        </div>

        {/* Mobile hint */}
        <p className="mt-4 text-center font-display text-xs tracking-widest text-text-secondary md:hidden">
          TAP TO DECLASSIFY
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block bg-accent text-white font-display text-sm tracking-wider px-8 py-4 rounded-full hover:bg-accent/90 transition-colors duration-200"
          >
            REQUEST A BRIEFING
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Add SolutionSection to page**

Modify `src/app/page.tsx` — import and add `<SolutionSection />` after `<ProblemSection />`.

**Step 4: Verify flip cards work**

Run:
```bash
npm run dev
```
Verify: 5 cards displayed, hover flips to back face on desktop, tap flips on mobile, "CLASSIFIED" watermark on front, "[DECLASSIFIED]" stamp on back, "View Full Brief →" links present, "Tap to Declassify" hint visible on mobile only.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: solution section with 5 flip cards for service pillars"
```

---

## Task 8: Why Us Section — Vertical Cards

**Files:**
- Create: `src/components/landing/WhyUsSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the WhyUsSection component**

Create `src/components/landing/WhyUsSection.tsx`:

```tsx
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
          <p className="font-display text-sm tracking-widest text-accent mb-4">
            // WHY REDACTED DIGITAL
          </p>
        </RedactionReveal>

        <RedactionReveal delay={200}>
          <p className="font-body text-xl md:text-2xl text-text-primary mb-16">
            A website should work as hard as you do. Most don&apos;t. Ours do.
          </p>
        </RedactionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <div
              key={reason.step}
              className="relative bg-surface-recessed rounded-lg border border-surface-elevated/20 overflow-hidden cursor-pointer group min-h-[300px] flex flex-col"
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
                <span className="font-display text-4xl font-bold text-accent">
                  {reason.step}
                </span>
                <h3 className="font-display text-base tracking-wider text-text-primary">
                  {reason.heading.toUpperCase()}
                </h3>
                <span className="absolute top-3 right-3 font-display text-[10px] tracking-widest text-surface-elevated/30 rotate-12">
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
                  <span className="font-display text-[10px] tracking-widest text-accent">
                    [DECLASSIFIED]
                  </span>
                  <h3 className="font-display text-sm tracking-wider text-accent mt-2 mb-3">
                    {reason.heading.toUpperCase()}
                  </h3>
                  <p className="font-body text-sm text-text-primary leading-relaxed">
                    {reason.copy}
                  </p>
                </div>
              </div>

              {/* Accent border on hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-accent transition-transform duration-500 origin-left ${
                  revealedIndex === index ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Mobile hint */}
        <p className="mt-4 text-center font-display text-xs tracking-widest text-text-secondary md:hidden">
          TAP TO DECLASSIFY
        </p>
      </div>
    </section>
  );
}
```

**Step 2: Add WhyUsSection to page**

Modify `src/app/page.tsx` — import and add `<WhyUsSection />` after `<SolutionSection />`.

**Step 3: Verify cards work**

Run:
```bash
npm run dev
```
Verify: 4 vertical cards side by side on desktop, stacked on mobile, hover reveals copy with declassified stamp, accent border animates from left on reveal, tap works on mobile.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: why us section with 4 vertical redaction-reveal cards"
```

---

## Task 9: Social Proof / Portfolio Preview Section

**Files:**
- Create: `src/components/landing/SocialProofSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the SocialProofSection component**

Create `src/components/landing/SocialProofSection.tsx`:

```tsx
"use client";

import RedactionReveal from "@/components/ui/RedactionReveal";
import Link from "next/link";

const projects = [
  {
    type: "Tiler — Central Coast",
    name: "Placeholder Client 1",
    description: "Before/after showcase placeholder",
    image: "/placeholder-project-1.jpg",
  },
  {
    type: "Tattoo Artist — Hunter Valley",
    name: "Placeholder Client 2",
    description: "Booking system showcase placeholder",
    image: "/placeholder-project-2.jpg",
  },
  {
    type: "Cafe — Central Coast",
    name: "Placeholder Client 3",
    description: "Google reviews showcase placeholder",
    image: "/placeholder-project-3.jpg",
  },
];

export default function SocialProofSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RedactionReveal>
          <p className="font-display text-sm tracking-widest text-accent mb-12">
            // DECLASSIFIED OPERATIONS
          </p>
        </RedactionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {projects.map((project, index) => (
            <RedactionReveal key={index} delay={index * 200}>
              <div className="bg-surface-recessed rounded-lg border border-surface-elevated/20 overflow-hidden group hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
                {/* Image placeholder */}
                <div className="h-48 bg-surface-dark flex items-center justify-center">
                  <span className="font-display text-xs tracking-widest text-text-secondary">
                    [SCREENSHOT]
                  </span>
                </div>
                <div className="p-5">
                  <span className="font-display text-[10px] tracking-widest text-accent">
                    {project.type.toUpperCase()}
                  </span>
                  <h3 className="font-display text-sm tracking-wider text-text-primary mt-2">
                    {project.name.toUpperCase()}
                  </h3>
                  <p className="font-body text-sm text-text-secondary mt-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </RedactionReveal>
          ))}
        </div>

        {/* Testimonial field report */}
        <RedactionReveal delay={800}>
          <div className="bg-surface-recessed rounded-lg border border-surface-elevated/20 p-8 max-w-2xl mx-auto">
            <span className="font-display text-[10px] tracking-widest text-accent">
              // FIELD REPORT
            </span>
            <blockquote className="mt-4 font-body text-lg text-text-primary italic leading-relaxed">
              &ldquo;Placeholder testimonial from pilot client. This will be
              replaced with a real quote once pilot clients are onboarded.&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-accent">★★★★★</span>
              <span className="font-display text-xs tracking-wider text-text-secondary">
                — CLIENT NAME, BUSINESS TYPE
              </span>
            </div>
          </div>
        </RedactionReveal>

        <div className="mt-8 text-center">
          <Link
            href="/success-stories"
            className="font-display text-sm tracking-wider text-accent hover:text-accent/80 transition-colors"
          >
            VIEW ALL OPERATIONS →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add SocialProofSection to page**

Modify `src/app/page.tsx` — import and add `<SocialProofSection />` after `<WhyUsSection />`.

**Step 3: Verify section renders**

Run:
```bash
npm run dev
```
Verify: 3 project cards with placeholder content, hover lift effect, testimonial field report below, star rating visible, "View all operations →" link present.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: social proof section with project previews and testimonial"
```

---

## Task 10: The Secret — Process Infographic

**Files:**
- Create: `src/components/landing/ProcessSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the ProcessSection component**

Create `src/components/landing/ProcessSection.tsx`:

```tsx
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
          <p className="font-display text-sm tracking-widest text-accent mb-16">
            // THE SECRET
          </p>
        </RedactionReveal>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-accent/30" />

          {steps.map((step, index) => (
            <RedactionReveal key={step.number} delay={index * 250}>
              <div className="flex flex-col items-center text-center px-4">
                {/* Node */}
                <div className="w-16 h-16 rounded-full border-2 border-accent bg-surface-recessed flex items-center justify-center mb-6 relative z-10">
                  <span className="font-display text-lg font-bold text-accent">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-sm tracking-widest text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RedactionReveal>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-8 relative pl-12">
          {/* Vertical connector */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-accent/30" />

          {steps.map((step, index) => (
            <RedactionReveal key={step.number} delay={index * 200}>
              <div className="relative">
                {/* Node */}
                <div className="absolute -left-12 top-0 w-12 h-12 rounded-full border-2 border-accent bg-surface-recessed flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-accent">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-sm tracking-widest text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
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
```

**Step 2: Add ProcessSection to page**

Modify `src/app/page.tsx` — import and add `<ProcessSection />` after `<SocialProofSection />`.

**Step 3: Verify infographic renders**

Run:
```bash
npm run dev
```
Verify: horizontal 4-step timeline on desktop with connecting line and numbered nodes, vertical timeline on mobile, steps reveal on scroll. Accent colour nodes and connectors.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: process infographic section with responsive timeline"
```

---

## Task 11: Common Problems We Fix Section

**Files:**
- Create: `src/components/landing/ProblemsFixSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the ProblemsFixSection component**

Create `src/components/landing/ProblemsFixSection.tsx`:

```tsx
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
          <p className="font-display text-sm tracking-widest text-accent mb-2">
            // COMMON PROBLEMS WE FIX
          </p>
        </RedactionReveal>
        <RedactionReveal delay={200}>
          <p className="font-body text-lg text-text-secondary mb-12">
            Your business might be dealing with one — or all — of these. We&apos;ve
            seen them. We fix them.
          </p>
        </RedactionReveal>

        <div className="space-y-6">
          {problems.map((item, index) => (
            <RedactionReveal key={index} delay={index * 200}>
              <div className="bg-surface-recessed rounded-lg border border-surface-elevated/20 p-6">
                <h3 className="font-display text-base tracking-wider text-text-primary mb-3">
                  {item.problem}
                </h3>
                <div className="flex items-start gap-2">
                  <span className="font-display text-[10px] tracking-widest text-accent whitespace-nowrap mt-1">
                    [COUNTERMEASURE]:
                  </span>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
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
            className="inline-block bg-accent text-white font-display text-sm tracking-wider px-8 py-4 rounded-full hover:bg-accent/90 transition-colors duration-200"
          >
            LET&apos;S FIX YOURS →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add ProblemsFixSection to page**

Modify `src/app/page.tsx` — import and add `<ProblemsFixSection />` after `<ProcessSection />`.

**Step 3: Verify section renders**

Run:
```bash
npm run dev
```
Verify: 5 problem/countermeasure cards, each revealing on scroll, "[COUNTERMEASURE]:" tag in accent colour, CTA button at bottom.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: common problems we fix section with countermeasure format"
```

---

## Task 12: Free Resources Section (Placeholder)

**Files:**
- Create: `src/components/landing/ResourcesSection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the ResourcesSection component**

Create `src/components/landing/ResourcesSection.tsx`:

```tsx
"use client";

import RedactionReveal from "@/components/ui/RedactionReveal";

const resources = [
  {
    title: "5 Things Every Tradie's Website Needs in 2026",
    type: "GUIDE",
    status: "COMING SOON",
  },
  {
    title: "Free Website Health Check",
    type: "TOOL",
    status: "COMING SOON",
  },
  {
    title: "Local SEO Checklist for Central Coast Businesses",
    type: "GUIDE",
    status: "COMING SOON",
  },
];

export default function ResourcesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RedactionReveal>
          <p className="font-display text-sm tracking-widest text-accent mb-2">
            // FIELD RESOURCES
          </p>
        </RedactionReveal>
        <RedactionReveal delay={200}>
          <p className="font-body text-lg text-text-secondary mb-12">
            Free intel. No email required. No strings attached.
          </p>
        </RedactionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <RedactionReveal key={index} delay={index * 200}>
              <div className="bg-surface-recessed rounded-lg border border-surface-elevated/20 p-6 flex flex-col justify-between min-h-[180px]">
                <div>
                  <span className="font-display text-[10px] tracking-widest text-accent">
                    {resource.type}
                  </span>
                  <h3 className="font-display text-sm tracking-wider text-text-primary mt-3">
                    {resource.title.toUpperCase()}
                  </h3>
                </div>
                <span className="font-display text-[10px] tracking-widest text-text-secondary mt-4">
                  [{resource.status}]
                </span>
              </div>
            </RedactionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add ResourcesSection to page**

Modify `src/app/page.tsx` — import and add `<ResourcesSection />` after `<ProblemsFixSection />`.

**Step 3: Verify placeholder section renders**

Run:
```bash
npm run dev
```
Verify: 3 resource cards with "[COMING SOON]" tags, classified styling consistent with rest of site.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: free resources placeholder section"
```

---

## Task 13: Final CTA Section

**Files:**
- Create: `src/components/landing/FinalCTASection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build the FinalCTASection component**

Create `src/components/landing/FinalCTASection.tsx`:

```tsx
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="py-32 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="font-display text-sm tracking-widest text-accent mb-8">
          // MISSION BRIEFING REQUESTED
        </p>

        <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
          READY TO PUT YOUR WEBSITE TO WORK?
        </h2>

        <p className="font-body text-lg text-text-secondary mb-10">
          Less phone time, more tool time.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-accent text-white font-display text-base tracking-wider px-10 py-5 rounded-full hover:bg-accent/90 transition-colors duration-200"
        >
          REQUEST A BRIEFING
        </Link>
      </div>
    </section>
  );
}
```

**Step 2: Add FinalCTASection to page**

Modify `src/app/page.tsx` — import and add `<FinalCTASection />` after `<ResourcesSection />`.

**Step 3: Verify section renders**

Run:
```bash
npm run dev
```
Verify: large centred CTA section with classified header, bold heading, tagline, and accent button.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: final CTA section"
```

---

## Task 14: Footer

**Files:**
- Create: `src/components/navigation/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Build the Footer component**

Create `src/components/navigation/Footer.tsx`:

```tsx
import Link from "next/link";

const mainLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Design", href: "/services/design" },
  { label: "Lead Capturing", href: "/services/lead-capturing" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "SEO & Local Search", href: "/services/seo" },
  { label: "Mobile App Management", href: "/services/mobile-management" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-recessed border-t border-surface-elevated/20 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-widest text-text-primary"
          >
            REDACTED<span className="text-accent">DIGITAL</span>
          </Link>
          <p className="font-body text-sm text-text-secondary mt-3">
            Less phone time, more tool time.
          </p>
          <p className="font-body text-sm text-text-secondary mt-1">
            Central Coast &amp; Hunter Valley, NSW
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-xs tracking-widest text-accent mb-4">
            // NAVIGATION
          </h4>
          <ul className="space-y-2">
            {mainLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-xs tracking-widest text-accent mb-4">
            // SERVICES
          </h4>
          <ul className="space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-xs tracking-widest text-accent mb-4">
            // CONTACT
          </h4>
          <p className="font-body text-sm text-text-secondary">
            hello@redacteddigital.au
          </p>
          <p className="font-body text-sm text-text-secondary mt-1">
            {/* Phone TBD */}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-surface-elevated/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-display text-[10px] tracking-widest text-text-secondary">
          © {new Date().getFullYear()} REDACTED DIGITAL. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[10px] tracking-widest text-text-secondary hover:text-accent transition-colors"
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Add Footer to root layout**

Modify `src/app/layout.tsx` — import Footer and add `<Footer />` after `{children}` in the body.

**Step 3: Verify footer renders**

Run:
```bash
npm run dev
```
Verify: 4-column grid on desktop, stacked on mobile, all navigation links present, classified-style section headers, copyright year dynamic, legal links at bottom.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: footer with navigation, services, contact, and legal links"
```

---

## Task 15: Assemble Complete Landing Page + Full Scroll Verification

**Files:**
- Modify: `src/app/page.tsx` (final assembly)

**Step 1: Verify page.tsx has all sections in order**

`src/app/page.tsx` should contain:

```tsx
import HeroSection from "@/components/landing/HeroSection";
import TickerSection from "@/components/landing/TickerSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import ProcessSection from "@/components/landing/ProcessSection";
import ProblemsFixSection from "@/components/landing/ProblemsFixSection";
import ResourcesSection from "@/components/landing/ResourcesSection";
import FinalCTASection from "@/components/landing/FinalCTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TickerSection />
      <ProblemSection />
      <SolutionSection />
      <WhyUsSection />
      <SocialProofSection />
      <ProcessSection />
      <ProblemsFixSection />
      <ResourcesSection />
      <FinalCTASection />
    </main>
  );
}
```

**Step 2: Full scroll test — desktop**

Run:
```bash
npm run dev
```
Scroll through entire page on desktop viewport. Verify each section:
1. Hero: text scramble plays, CTA visible, scroll prompt bounces
2. Ticker: scrolling continuously
3. Problem: 4 pain points reveal on scroll
4. Solution: 5 flip cards work on hover
5. Why Us: 4 cards reveal on hover
6. Social Proof: 3 project cards + testimonial visible
7. Process: horizontal timeline with 4 steps
8. Problems Fix: 5 countermeasure cards
9. Resources: 3 placeholder cards
10. Final CTA: visible with button
11. Footer: all links present

**Step 3: Full scroll test — mobile**

Resize browser to 375px width. Verify:
- Nav collapses to hamburger
- All sections stack vertically
- Flip cards respond to tap
- Why Us cards respond to tap
- "Tap to Declassify" hints visible
- Process timeline is vertical
- All text is readable without horizontal scroll

**Step 4: Build verification**

Run:
```bash
npm run build
```
Expected: Build succeeds with no errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: complete landing page assembly — all 11 sections"
```

---

## Task 16: Hero Frame Animation Integration (Deferred)

> **Note:** This task depends on creating the start/end frame images and generating the interpolation video via Veo 3.1. The hero section currently has a solid background placeholder. This task should be executed once the frame assets are ready.

**When assets are ready, the steps are:**

1. Generate video from start/end frames using Veo 3.1
2. Extract frames using ffmpeg: `ffmpeg -i hero-animation.mp4 -vf "fps=15" public/frames/hero/frame-%04d.webp`
3. Optimise frame sizes (resize to viewport width, compress WebP)
4. Build a `ScrollFramePlayer` component that preloads frames and swaps `<img>` src based on scroll position using GSAP ScrollTrigger
5. Replace the solid background in `HeroSection.tsx` with the `ScrollFramePlayer`
6. Test scroll performance on desktop and mobile
7. Implement lazy loading so frames don't block initial page load

**This task will be detailed in a separate mini-plan once assets exist.**

---

## Execution Handoff

Plan complete. Two execution options:

**1. Subagent-Driven (this session)** — I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** — Open new session with executing-plans, batch execution with checkpoints

**Which approach?**