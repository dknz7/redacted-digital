# Redacted Digital v2 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the v1 landing page with an empty but correct v2 foundation — design tokens, fonts, grid and redaction primitives, nav and footer shells, and a landing page skeleton whose seven sections sit on the right surfaces.

**Architecture:** Clean rebuild of `src/` on a new branch. Tailwind v4 `@theme` block carries the RD tokens so they match the MagicPath canvas exactly, which means exported components drop in without token re-mapping. Motion primitives are built here rather than exported, because MagicPath produces static composition only. Sections are rendered as labelled placeholder blocks in the correct surface order — real content arrives per-section from MagicPath exports in a later plan.

**Tech Stack:** Next.js 16.1.7 (App Router, Turbopack), React 19.2, Tailwind CSS v4, GSAP 3.14 + ScrollTrigger, TypeScript 5, Node 26.

## Global Constraints

- **Surfaces:** `ink-*` tokens for dark, `paper-*` for light. Dark carries the pitch, paper carries the proof.
- **Accent discipline:** `#E2561C` appears roughly four times per viewport maximum. Never on body copy or text under 18px.
- **Type roles:** League Gothic — display only, uppercase, never body. Switzer — all readable copy. JetBrains Mono — annotations only.
- **Redaction rule:** the logo bar always resolves; content redaction in headlines stays hidden permanently.
- **Section order and surfaces are fixed:** 01 Hero `ink-900` · 02 Ticker `ink-800` · 03 Problem `ink-800` · 04 Case Files `paper` · 05 Capabilities `paper` · 06 How It Works `paper` · 07 CTA `ink-800` · 08 Footer `ink-900`. Two surface flips, three acts.
- **No invented client metrics.** Case Files placeholders must not contain fabricated numbers.
- **Motion vocabulary is closed:** redaction wipe, wordmark declassify, scroll stagger. No text scramble, no flip cards, no grain overlay.
- **Verification is build-and-screenshot, not unit tests.** This is a static marketing site with no business logic; asserting on token values would test the framework, not our code. Each task verifies with a passing production build plus a visual check.

---

### Task 1: Branch, wipe, and neutralise the stale design docs

The repo root `CLAUDE.md` documents hot pink `#FF2C64`, mono display headings and the old eleven-section structure as canon. Any future session reads it and confidently builds the wrong site. It must be corrected in the same commit that removes the code it describes.

**Files:**
- Delete: `src/components/landing/*` (10 files), `src/components/navigation/*` (2 files), `src/components/ui/*` (3 files), `src/lib/fonts.ts`
- Modify: `CLAUDE.md` (design system, site map, landing sections, status sections)
- Modify: `docs/redacted-digital-site-design.md` (add superseded banner)

**Interfaces:**
- Consumes: nothing
- Produces: a `v2-redesign` branch with an empty `src/components/` and `src/lib/`, and docs that point at the v2 spec

- [ ] **Step 1: Confirm the base branch with Byron before branching**

The repo is currently on `feat/client-cms` with unrelated CMS work. Ask which branch v2 should start from — `main`, or the current branch. Do not guess. Stop and wait.

- [ ] **Step 2: Create the branch**

```bash
git checkout -b v2-redesign
```

- [ ] **Step 3: Delete the v1 component tree**

```bash
git rm -r src/components/landing src/components/navigation src/components/ui src/lib/fonts.ts
```

- [ ] **Step 4: Replace the design system section in CLAUDE.md**

Replace the entire `## Design System` section (colours table, typography, motion, navigation) with:

```markdown
## Design System

**Superseded 2026-08-09.** The v1 system (hot pink `#FF2C64`, monospace display
headings, eleven landing sections) is dead. Do not build against it.

The current system lives in `docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md`.
Summary: asphalt `ink-*` and warm paper surfaces, single orange accent `#E2561C`,
League Gothic display / Switzer body / JetBrains Mono annotation, seven landing
sections in three acts.
```

- [ ] **Step 5: Replace the landing page sections list in CLAUDE.md**

Replace the entire `## Landing Page Sections (in order)` section with:

```markdown
## Landing Page Sections (in order)

**Superseded 2026-08-09.** Eleven sections cut to seven. See
`docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md` §4.
```

- [ ] **Step 6: Update the Current Status block in CLAUDE.md**

Replace the `- **Phase:**` and `- **Design document:**` lines with:

```markdown
- **Phase:** v2 rebuild. Design spec approved, foundation in progress.
- **Design spec:** `docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md`
- **Design canvas:** MagicPath project `Redacted-Digital` (id `436965821978415104`)
```

- [ ] **Step 7: Add a superseded banner to the old design doc**

Insert at the very top of `docs/redacted-digital-site-design.md`:

```markdown
> **SUPERSEDED 2026-08-09.** Retained for history only. The live design is
> `docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md`.
```

- [ ] **Step 8: Verify the build still compiles with an empty component tree**

Run: `npm run build`
Expected: FAIL, with module-not-found errors from `src/app/page.tsx` and `src/app/layout.tsx` importing deleted files. This failure is expected and is fixed in Task 6.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: remove v1 component tree, mark v1 design docs superseded"
```

---

### Task 2: Fonts

MagicPath loads fonts via CSS `@import`. Next.js should not — `next/font` self-hosts, eliminates the render-blocking request, and prevents layout shift. The families must resolve to the same names the canvas uses so exported components need no edits.

**Files:**
- Create: `src/lib/fonts.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `fontDisplay`, `fontBody`, `fontAnnot` exports, each a `NextFont` with `.variable` yielding CSS variables `--font-league`, `--font-switzer`, `--font-jetbrains`

**Naming matters here.** next/font must NOT claim `--font-display`, `--font-body` or `--font-annot` — Tailwind's `@theme` block defines those in Task 3, and a variable that resolves to itself silently falls back to the system font with no error. The raw font files get `--font-league`/`--font-switzer`/`--font-jetbrains`; the theme maps the semantic names onto them.

- [ ] **Step 1: Write the font module**

League Gothic and JetBrains Mono come from Google. Switzer is not on Google Fonts, so it is loaded from local files.

```typescript
// src/lib/fonts.ts
import { League_Gothic, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const fontDisplay = League_Gothic({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-league',
  display: 'swap',
});

export const fontAnnot = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const fontBody = localFont({
  src: [
    { path: '../../public/fonts/Switzer-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Switzer-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Switzer-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-switzer',
  display: 'swap',
});
```

- [ ] **Step 2: Download the Switzer font files**

Fetch the Switzer family from https://www.fontshare.com/fonts/switzer and place the three woff2 files at the exact paths above. Create `public/fonts/` if it does not exist.

**Before doing this, confirm the Fontshare licence permits commercial use** — this is open question 4 in the spec and is unresolved. If the licence does not permit it, stop and report; do not substitute a different font unilaterally.

- [ ] **Step 3: Apply the font variables in the root layout**

In `src/app/layout.tsx`, import the three fonts and put their `.variable` class names on the `<html>` element:

```tsx
import { fontDisplay, fontBody, fontAnnot } from '@/lib/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontAnnot.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify the fonts resolve**

Run: `npm run dev`
Open the dev server and check in DevTools that `--font-league`, `--font-switzer` and `--font-jetbrains` are defined on `<html>`, and that the Network tab shows the woff2 files served from the same origin rather than from fonts.gstatic.com or fontshare.com.

If `League_Gothic` is not exported by `next/font/google` in Next 16.1.7, the build fails at import. In that case download the League Gothic woff2 from Google Fonts and load it through `localFont` alongside Switzer, keeping the `--font-league` variable name unchanged.

- [ ] **Step 5: Commit**

```bash
git add src/lib/fonts.ts src/app/layout.tsx public/fonts
git commit -m "feat: self-host League Gothic, Switzer and JetBrains Mono via next/font"
```

---

### Task 3: Design tokens

These values must match the MagicPath canvas exactly. Any drift means exported components render in the wrong colours.

**Files:**
- Modify: `src/app/globals.css` (full replacement)

**Interfaces:**
- Consumes: the CSS variables produced by Task 2
- Produces: Tailwind utilities `bg-ink-{900,800,700,600,400,200,050}`, `bg-paper`, `bg-paper-dim`, `bg-paper-line`, `bg-redact`, `bg-rd-orange`, `bg-rd-orange-dim` and their `text-`/`border-` equivalents, plus `font-display`, `font-body`, `font-annot`

- [ ] **Step 1: Replace globals.css**

```css
@import "tailwindcss";

@theme {
  /* Asphalt */
  --color-ink-900: #131416;
  --color-ink-800: #1b1d20;
  --color-ink-700: #24272b;
  --color-ink-600: #33373c;
  --color-ink-400: #6b7076;
  --color-ink-200: #b9bdc2;
  --color-ink-050: #e8e9ea;

  /* Paper */
  --color-paper: #f2eee6;
  --color-paper-dim: #e5dfd4;
  --color-paper-line: #d6cec0;
  --color-redact: #000000;

  /* Accent */
  --color-rd-orange: #e2561c;
  --color-rd-orange-dim: #b8410f;

  /* Type — semantic names mapping onto the raw next/font variables */
  --font-display: var(--font-league), "Arial Narrow", sans-serif;
  --font-body: var(--font-switzer), system-ui, sans-serif;
  --font-annot: var(--font-jetbrains), ui-monospace, monospace;
}

@layer base {
  body {
    background-color: var(--color-ink-900);
    color: var(--color-ink-050);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  /* Display type is uppercase by rule, never by accident */
  .rd-display {
    font-family: var(--font-display);
    text-transform: uppercase;
    line-height: 0.92;
  }
}
```

- [ ] **Step 2: Verify tokens compile into utilities**

Create a scratch route at `src/app/token-check/page.tsx`:

```tsx
export default function TokenCheck() {
  return (
    <div className="p-10 space-y-2">
      <div className="bg-ink-800 text-ink-050 p-4 font-body">ink-800 surface</div>
      <div className="bg-paper text-ink-900 p-4 font-body">paper surface</div>
      <div className="bg-rd-orange text-white p-4 font-annot">rd-orange</div>
      <div className="rd-display text-6xl text-ink-050">League Gothic display</div>
    </div>
  );
}
```

Run: `npm run dev`, open `/token-check`.
Expected: four blocks in the correct colours, the last in condensed uppercase League Gothic. If any block is unstyled, the token name is wrong.

- [ ] **Step 3: Delete the scratch route**

```bash
rm -r src/app/token-check
```

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: RD v2 design tokens matching the MagicPath canvas"
```

---

### Task 4: Grid and annotation primitives

The technical-document language — faint modular grid, corner brackets, mono eyebrows, section counters. These appear on every section, so they are components, not repeated markup.

**Files:**
- Create: `src/components/rd/Surface.tsx`
- Create: `src/components/rd/Annot.tsx`

**Interfaces:**
- Consumes: tokens from Task 3
- Produces:
  - `Surface({ tone, children, className })` where `tone: 'deep' | 'dark' | 'paper'`
  - `Eyebrow({ children, muted })` — mono, orange, `//` prefix supplied by caller
  - `CornerMark({ position, children })` where `position: 'tl' | 'tr'`
  - `FileCounter({ index, total })` — renders `[ 04 / 07 ]` with the index in orange

- [ ] **Step 1: Write Surface**

```tsx
// src/components/rd/Surface.tsx
import React from 'react';

type Tone = 'deep' | 'dark' | 'paper';

const TONE: Record<Tone, string> = {
  deep: 'bg-ink-900 text-ink-050',
  dark: 'bg-ink-800 text-ink-050 rd-grid-dark',
  paper: 'bg-paper text-ink-900 rd-grid-paper',
};

export function Surface({
  tone,
  children,
  className = '',
}: {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative w-full ${TONE[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-[1180px] px-6 py-20 sm:py-28">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Add the grid utilities to globals.css**

Append to `src/app/globals.css`:

```css
.rd-grid-dark {
  background-image:
    linear-gradient(var(--color-ink-600) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-ink-600) 1px, transparent 1px);
  background-size: 112px 112px;
}

.rd-grid-paper {
  background-image:
    linear-gradient(var(--color-paper-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-paper-line) 1px, transparent 1px);
  background-size: 112px 112px;
}
```

- [ ] **Step 3: Write the annotation primitives**

```tsx
// src/components/rd/Annot.tsx
import React from 'react';

export function Eyebrow({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: React.ReactNode;
}) {
  return (
    <div className="font-annot text-[11px] tracking-[0.16em] uppercase text-rd-orange mb-4">
      {children}
      {muted ? <span className="text-ink-400"> {muted}</span> : null}
    </div>
  );
}

export function CornerMark({
  position,
  children,
}: {
  position: 'tl' | 'tr';
  children: React.ReactNode;
}) {
  const place = position === 'tl' ? 'left-5' : 'right-5';
  return (
    <div
      className={`absolute top-4 ${place} font-annot text-[10px] tracking-[0.1em] text-ink-400`}
    >
      {children}
    </div>
  );
}

export function FileCounter({ index, total }: { index: number; total: number }) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <span className="font-annot text-[10px] tracking-[0.12em] text-ink-400">
      [ <span className="text-rd-orange">{pad(index)}</span> / {pad(total)} ]
    </span>
  );
}
```

- [ ] **Step 4: Verify visually**

Temporarily render all three in `src/app/page.tsx` inside a `<Surface tone="dark">`, run `npm run dev`, and confirm: the grid rules are visible but faint, the eyebrow is orange mono, the corner mark sits top-right, and the counter shows `[ 04 / 07 ]` with `04` in orange.

- [ ] **Step 5: Commit**

```bash
git add src/components/rd src/app/globals.css
git commit -m "feat: surface and annotation primitives"
```

---

### Task 5: Redaction primitives

The signature motion. A bar covers text and wipes away on scroll. Built here rather than exported, because MagicPath produces static composition only.

**Files:**
- Create: `src/components/rd/RedactBar.tsx`
- Create: `src/components/rd/Wordmark.tsx`

**Interfaces:**
- Consumes: GSAP 3.14 with ScrollTrigger
- Produces:
  - `RedactBar({ children, permanent })` — wipes on scroll unless `permanent`, in which case it never reveals
  - `Wordmark({ tone, size })` where `tone: 'paper' | 'asphalt'` — declassifies once on mount

- [ ] **Step 1: Write RedactBar**

The bar is a sized element overlaying the text, not a string of block glyphs — glyph width does not track the covered text and cannot be animated cleanly.

```tsx
// src/components/rd/RedactBar.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    if (permanent || !barRef.current || !wrapRef.current) return;
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
  }, [permanent]);

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
```

- [ ] **Step 2: Write Wordmark**

The bar spans the full width of REDACTED above it. An `inline-block` wrapper shrinks to its widest child, so a `w-full` bar inherits that width automatically.

```tsx
// src/components/rd/Wordmark.tsx
'use client';

import React, { useState, useEffect } from 'react';

export function Wordmark({
  tone = 'asphalt',
  size = 34,
}: {
  tone?: 'paper' | 'asphalt';
  size?: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  const isPaper = tone === 'paper';

  return (
    <div
      className="rd-display inline-block select-none"
      style={{ fontSize: size, color: isPaper ? '#131416' : '#E8E9EA' }}
    >
      <div>Redacted</div>
      <div
        className="w-full px-[0.14em] transition-colors duration-500"
        style={{
          backgroundColor: isPaper ? '#000000' : open ? '#E2561C' : '#E8E9EA',
          color: open ? (isPaper ? '#F2EEE6' : '#FFFFFF') : 'transparent',
        }}
      >
        Digital
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify both**

Render in `src/app/page.tsx`:

```tsx
<Surface tone="paper">
  <h2 className="rd-display text-5xl">
    Real <RedactBar>missions</RedactBar> real impact.
  </h2>
  <Wordmark tone="paper" size={54} />
</Surface>
```

Run `npm run dev`. Expected: the word is covered by a black bar on load, and the bar wipes right-to-left when scrolled into view. The wordmark's black block spans the full width of REDACTED and reveals DIGITAL after a beat.

- [ ] **Step 4: Verify reduced motion is respected**

In DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" and reload. If the bar still animates, add to the top of the `useEffect` in `RedactBar`:

```tsx
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.set(barRef.current, { scaleX: 0 });
  return;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/rd
git commit -m "feat: redaction bar and wordmark primitives"
```

---

### Task 6: Nav and footer shells

The nav carries Pricing as a top-level slot — a consequence of moving pricing off the landing page. The footer is deliberately utilitarian so the CTA section above it reads as the only goodbye.

**Files:**
- Create: `src/components/rd/Nav.tsx`
- Create: `src/components/rd/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `Wordmark` from Task 5
- Produces: `Nav`, `Footer` — both rendered by the root layout on every route

- [ ] **Step 1: Write Nav**

```tsx
// src/components/rd/Nav.tsx
import Link from 'next/link';
import { Wordmark } from './Wordmark';

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-ink-900/90 backdrop-blur border-b border-ink-700">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-4">
        <Link href="/" aria-label="Redacted Digital home">
          <Wordmark tone="asphalt" size={20} />
        </Link>
        <ul className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-annot text-[11px] tracking-[0.12em] uppercase text-ink-200 hover:text-rd-orange transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="font-annot text-[11px] tracking-[0.12em] uppercase bg-rd-orange text-white px-4 py-2.5 rounded-sm hover:bg-rd-orange-dim transition-colors"
        >
          Request a briefing
        </Link>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Write Footer**

No headline, no button, no personality — that is the CTA section's job.

```tsx
// src/components/rd/Footer.tsx
import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { href: '/services/design', label: 'Design' },
      { href: '/services/lead-capture', label: 'Lead Capture' },
      { href: '/services/ai-automation', label: 'AI & Automation' },
      { href: '/services/seo', label: 'SEO & Local Search' },
      { href: '/services/app-management', label: 'App Management' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/success-stories', label: 'Success Stories' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-ink-900 border-t border-ink-700">
      <div className="mx-auto max-w-[1180px] px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="font-annot text-[10px] tracking-[0.12em] uppercase text-ink-400 leading-relaxed">
          Redacted Digital
          <br />
          Central Coast, NSW
          <br />
          byron@redacteddigital.au
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="font-annot text-[10px] tracking-[0.14em] uppercase text-ink-400 mb-3">
              {col.title}
            </div>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-[13px] text-ink-200 hover:text-rd-orange transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1180px] px-6 pb-8 font-annot text-[10px] tracking-[0.1em] uppercase text-ink-400">
        © 2026 Redacted Digital. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wire both into the root layout**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { fontDisplay, fontBody, fontAnnot } from '@/lib/fonts';
import { Nav } from '@/components/rd/Nav';
import { Footer } from '@/components/rd/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Redacted Digital',
  description:
    'Lead systems for Central Coast trades and service businesses. Websites that catch the job while you are still up a ladder.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontAnnot.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify the build now passes**

Run: `npm run build`
Expected: PASS. This is the first green build since Task 1 deliberately broke it.

- [ ] **Step 5: Commit**

```bash
git add src/components/rd src/app/layout.tsx
git commit -m "feat: nav with top-level pricing slot, utilitarian footer"
```

---

### Task 7: Landing page skeleton

Seven sections in the fixed order and surfaces, rendered as labelled placeholders. Real content arrives per-section from MagicPath exports in the next plan. The point of this task is that the surface rhythm is correct and visible before any content exists.

**Files:**
- Modify: `src/app/page.tsx` (full replacement)

**Interfaces:**
- Consumes: `Surface`, `Eyebrow`, `CornerMark`, `FileCounter` from Task 4
- Produces: the landing route, with each section wrapped in a `<Surface>` of the correct tone and carrying a stable `id` for later replacement

- [ ] **Step 1: Write the skeleton**

```tsx
// src/app/page.tsx
import { Surface } from '@/components/rd/Surface';
import { Eyebrow, CornerMark, FileCounter } from '@/components/rd/Annot';

type Tone = 'deep' | 'dark' | 'paper';

const SECTIONS: { id: string; tone: Tone; eyebrow: string; title: string }[] = [
  { id: 'hero', tone: 'deep', eyebrow: '// OPERATION FOCUS', title: 'Hero' },
  { id: 'ticker', tone: 'dark', eyebrow: '// CAPABILITY TICKER', title: 'Ticker' },
  { id: 'problem', tone: 'dark', eyebrow: '// THREAT ASSESSMENT', title: 'The problem' },
  { id: 'case-files', tone: 'paper', eyebrow: '// CASE FILES', title: 'Proof' },
  { id: 'capabilities', tone: 'paper', eyebrow: '// CAPABILITIES', title: 'What we do' },
  { id: 'method', tone: 'paper', eyebrow: '// THE METHOD', title: 'How it works' },
  { id: 'cta', tone: 'dark', eyebrow: '// MISSION BRIEFING', title: 'Final CTA' },
];

export default function Home() {
  return (
    <>
      {SECTIONS.map((s, i) => (
        <Surface key={s.id} tone={s.tone} className="min-h-[60vh]">
          <div id={s.id}>
            <CornerMark position="tr">
              <FileCounter index={i + 1} total={SECTIONS.length} />
            </CornerMark>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="rd-display text-5xl sm:text-7xl">{s.title}</h2>
            <p className="font-body text-sm mt-4 opacity-60">
              Placeholder. Content arrives from the MagicPath export for this section.
            </p>
          </div>
        </Surface>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Verify the surface rhythm**

Run: `npm run dev` and scroll the page top to bottom.
Expected: dark, dark, dark, then a flip to paper for three sections, then a flip back to dark for the CTA, with the footer dark beneath it. Exactly two surface changes. If you count more than two, the tones are wrong.

- [ ] **Step 3: Capture a full-page screenshot for the record**

```bash
cd "C:/Users/dicke/.claude/skills/playwright-skill" && node run.js "
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'C:/Users/dicke/Desktop/Dump Zone/STACK/04-DEV/redacted-digital/brand_assets/design-boards/v2-skeleton.png', fullPage: true });
console.log('saved');
await browser.close();
"
```

Open the screenshot and confirm the three-act rhythm reads at a glance.

- [ ] **Step 4: Verify the production build**

Run: `npm run build`
Expected: PASS, with the landing route listed as static.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx brand_assets/design-boards/v2-skeleton.png
git commit -m "feat: landing page skeleton with three-act surface rhythm"
```

---

## What this plan deliberately does not cover

Each of these is its own plan, written once its blockers clear:

- **Landing page content** — every section's real design comes from a MagicPath export. Blocked on Case Files having honest content (spec open question 1).
- **Brand asset production** — vector operative at three detail levels, favicon, seal. Blocked on the production route decision (spec open question 5).
- **Print artwork** — business card front and back. Depends on brand assets.
- **The other seven page templates** — services hub, service template, pricing, success stories, about, contact, legal.
- **GHL and Meta pixel integration** — forms, calendar, chat widget, tracking.

## Open questions carried from the spec

1. **Base branch** — Task 1 Step 1 stops and asks. The repo sits on `feat/client-cms` with unrelated work.
2. **Fontshare licence** — Task 2 Step 2 stops and asks. Must be confirmed before Switzer ships, not after.
3. **Sequencing** — this plan assumes landing page and wordmark ship first so business cards are unblocked, with subpages following. Say so if that is wrong.
