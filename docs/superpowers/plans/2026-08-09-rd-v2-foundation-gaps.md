# Redacted Digital v2 — Foundation Gaps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the three unblocked gaps the foundation's final review surfaced, so the branch can merge and the first MagicPath imports do not have to invent workarounds.

**Architecture:** Continues on `feat/v2-redesign` — the foundation does not merge with a nav that keyboard and mobile users cannot operate. Three independent changes: make `Surface` composable, give `Nav` a real mobile disclosure, and fix the reduced-motion hydration mismatch in `Wordmark`.

**Tech Stack:** Next.js 16.1.7 (App Router, Turbopack), React 19.2, Tailwind CSS v4, GSAP 3.14, TypeScript 5.

## Global Constraints

- **Process safety, absolute.** Never run a process-wide kill: no `taskkill /F /IM`, no `pkill node`, no `killall`. An agent did this on 2026-08-09 and killed every Node process on the machine, taking down unrelated MCP servers. Stop only the PID you started. A dev server may already be running on port 3000 — reuse it, never kill it.
- **`npm run build` must pass and `npm run lint` must be clean across `src/**` after every task.** Pre-existing lint failures in vendored `skills/**` files are out of scope and must not be touched.
- **Switzer must never be self-hosted.** Its licence forbids uploading the font files to a public server. It loads from `api.fontshare.com`. Never commit a font binary or create `public/fonts/`.
- **Do not change any palette hex value.** Contrast and accent-budget rulings are pending from Byron and are not part of this plan.
- **No invented client metrics** anywhere, in any placeholder copy.
- League Gothic is display-only and uppercase. It never touches body copy, form fields or contact details.
- This is a static marketing site with no business logic. No test suite exists and none should be created. Verification is build, lint, and visual inspection via Playwright screenshots.

---

### Task 1: Make `Surface` composable

`Surface` currently hard-codes a centred 1180px column with fixed vertical padding and offers no escape. Two of the seven landing sections need to break out of exactly that: the hero is specified as full-bleed and "the single cinematic moment", and the ticker is a thin scrolling strip. `page.tsx` is already working around the missing `id` with a wrapper `<div>`. Fixing this before the first MagicPath import avoids three sections each inventing their own workaround.

**Files:**
- Modify: `src/components/rd/Surface.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: the `ink-*`, `paper` and grid tokens already in `globals.css`
- Produces: `Surface({ tone, id, bleed, pad, className, children })` where `tone: 'deep' | 'dark' | 'paper'`, `id?: string`, `bleed?: boolean` (default `false`), `pad?: 'none' | 'tight' | 'normal'` (default `'normal'`)

- [ ] **Step 1: Rewrite Surface**

```tsx
// src/components/rd/Surface.tsx
import React from 'react';

type Tone = 'deep' | 'dark' | 'paper';
type Pad = 'none' | 'tight' | 'normal';

const TONE: Record<Tone, string> = {
  deep: 'bg-ink-900 text-ink-050',
  dark: 'bg-ink-800 text-ink-050 rd-grid-dark',
  paper: 'bg-paper text-ink-900 rd-grid-paper',
};

const PAD: Record<Pad, string> = {
  none: '',
  tight: 'py-4 sm:py-5',
  normal: 'py-20 sm:py-28',
};

export function Surface({
  tone,
  id,
  bleed = false,
  pad = 'normal',
  children,
  className = '',
}: {
  tone: Tone;
  id?: string;
  bleed?: boolean;
  pad?: Pad;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full scroll-mt-20 ${TONE[tone]} ${className}`}
    >
      <div className={bleed ? `w-full ${PAD[pad]}` : `mx-auto w-full max-w-[1180px] px-6 ${PAD[pad]}`}>
        {children}
      </div>
    </section>
  );
}
```

`scroll-mt-20` is deliberate: the nav is sticky at roughly 73px, so any in-page anchor would otherwise land underneath it.

- [ ] **Step 2: Move the id onto Surface in page.tsx**

`page.tsx` currently wraps each section's contents in `<div id={s.id}>`. Delete that wrapper and pass `id={s.id}` to `Surface` instead. Add `pad="tight"` to the ticker section (index 1) only — it is a thin strip, not a full section. Leave every other section on the defaults. Change nothing else: not the tones, not the order, not the placeholder copy, not the `<h1>`/`<h2>` split.

- [ ] **Step 3: Verify the rhythm is unchanged**

Run `npm run build` — must pass. Then screenshot the page full-height with Playwright (skill at `C:\Users\dicke\.claude\skills\playwright-skill`, run as `node run.js <script>` from that directory, script written to a temp path outside the repo) and save to `brand_assets/design-boards/v2-surface-check.png`.

Open the screenshot and confirm: still exactly two surface changes, the ticker section is now visibly shorter than its neighbours, and nothing else moved.

- [ ] **Step 4: Verify anchors land correctly**

In the dev server, navigate to `/#case-files`. The section heading must be visible below the sticky nav, not hidden behind it.

- [ ] **Step 5: Commit**

```bash
git add src/components/rd/Surface.tsx src/app/page.tsx brand_assets/design-boards/v2-surface-check.png
git commit -m "feat: composable Surface with id, bleed and pad props"
```

---

### Task 2: Mobile navigation

Below the `md` breakpoint the four nav links are `display:none`, which removes them from the tab order entirely. There is no keyboard or touch path to Pricing — and Pricing was given a top-level slot specifically so a visitor could find the cost in one click. The audience is tradespeople on phones, so this is the primary experience, not an edge case.

**Files:**
- Modify: `src/components/rd/Nav.tsx`

**Interfaces:**
- Consumes: `Wordmark` from `./Wordmark`, the `ink-*` and `rd-orange` tokens
- Produces: no new exports — `Nav` gains an internal mobile disclosure

- [ ] **Step 1: Convert Nav to a client component with disclosure state**

Add `'use client'` at the top. Add `const [open, setOpen] = useState(false)`.

- [ ] **Step 2: Add the trigger button, visible only below md**

Placed between the wordmark and the CTA. It must be a real `<button>`, not a div:

```tsx
<button
  type="button"
  onClick={() => setOpen((o) => !o)}
  aria-expanded={open}
  aria-controls="mobile-nav"
  aria-label={open ? 'Close menu' : 'Open menu'}
  className="md:hidden font-annot text-[11px] tracking-[0.12em] uppercase text-ink-200 px-3 py-2"
>
  {open ? 'Close' : 'Menu'}
</button>
```

A word rather than a hamburger glyph: it needs no icon asset, it is unambiguous, and it matches the mono annotation language already used everywhere else in the design.

- [ ] **Step 3: Add the mobile panel**

Rendered below the nav bar, only when open, only below `md`. Reuse the same `LINKS` array the desktop list already maps over — do not duplicate the list, or the two will drift.

```tsx
{open && (
  <ul id="mobile-nav" className="md:hidden border-t border-ink-700 px-6 py-4 space-y-1">
    {LINKS.map((l) => (
      <li key={l.href}>
        <Link
          href={l.href}
          onClick={() => setOpen(false)}
          className="block py-3 font-annot text-[12px] tracking-[0.12em] uppercase text-ink-200 hover:text-rd-orange transition-colors"
        >
          {l.label}
        </Link>
      </li>
    ))}
  </ul>
)}
```

`onClick={() => setOpen(false)}` matters: without it the panel stays open over the destination after navigating.

- [ ] **Step 4: Close on Escape**

```tsx
useEffect(() => {
  if (!open) return;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
}, [open]);
```

- [ ] **Step 5: Verify at mobile width**

Screenshot at 390×844 with Playwright, closed and open, saving to `brand_assets/design-boards/v2-nav-mobile-closed.png` and `v2-nav-mobile-open.png`. Then in the browser, at 390px wide:

- Tab through the page and confirm every one of the four links is reachable by keyboard when the panel is open
- Confirm the orange focus ring is clearly visible on each
- Press Escape and confirm the panel closes
- Click a link and confirm the panel closes rather than covering the destination
- Confirm nothing changed at desktop width

- [ ] **Step 6: Verify lint and build**

`npm run lint` clean across `src/**`, `npm run build` passes.

- [ ] **Step 7: Commit**

```bash
git add src/components/rd/Nav.tsx brand_assets/design-boards/v2-nav-mobile-closed.png brand_assets/design-boards/v2-nav-mobile-open.png
git commit -m "feat: mobile nav disclosure so Pricing is reachable on phones"
```

---

### Task 3: Fix the reduced-motion hydration mismatch

`usePrefersReducedMotion` reads `matchMedia` in a lazy `useState` initialiser, which returns `false` on the server. The landing page is statically prerendered, so the HTML ships with the wordmark closed. A visitor with reduced-motion enabled computes `true` on hydration, changing both the className and the inline styles — a genuine server/client mismatch. The wordmark still resolves, so nobody is left staring at a blacked-out company name, but that user gets a flash of the covered state and a console error in development.

**Files:**
- Modify: `src/lib/usePrefersReducedMotion.ts`
- Modify: `src/components/rd/Wordmark.tsx`

**Interfaces:**
- Produces: `usePrefersReducedMotion(): boolean` — unchanged signature, corrected implementation

- [ ] **Step 1: Rewrite the hook using useSyncExternalStore**

This is the API React provides precisely for reading an external value that differs between server and client, and it eliminates the mismatch rather than suppressing the warning about it.

```tsx
// src/lib/usePrefersReducedMotion.ts
'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

- [ ] **Step 2: Make Wordmark's first client paint match the server**

`useSyncExternalStore` gives React the information it needs to reconcile without warning, but the wordmark should also not visibly flash. In `Wordmark.tsx`, drive the reveal from an effect that runs after mount rather than from state seeded during render, so both server and first client render agree on the closed state and the open state is applied in a committed update.

Read the current file before editing. Preserve both behavioural contracts exactly:
- the bar **always** resolves — under reduced motion it opens immediately with no transition, never stays closed
- normal motion keeps the existing short delay and colour transition

- [ ] **Step 3: Verify with real media emulation**

Playwright can emulate the preference. Write a temp script that loads the page twice — once with `page.emulateMedia({ reducedMotion: 'reduce' })` and once without — and in each case captures the wordmark's computed styles immediately after load and again after one second.

Expected: with reduced motion, the wordmark is open at both samples and no console error mentioning hydration appears. Without it, closed at the first sample and open at the second.

Capture the console output in both runs and paste it verbatim into your report.

- [ ] **Step 4: Verify lint and build**

`npm run lint` clean across `src/**`, `npm run build` passes.

- [ ] **Step 5: Commit**

```bash
git add src/lib/usePrefersReducedMotion.ts src/components/rd/Wordmark.tsx
git commit -m "fix: eliminate reduced-motion hydration mismatch in Wordmark"
```

---

## Out of scope

Deliberately excluded, each waiting on something:

- **Contrast, accent budget, and the §2.1/§2.3 spec contradiction** — design rulings pending from Byron. No palette value may change until he has ruled.
- **Annotation type scale tokens** — depends on the contrast ruling, since it may change the sizes.
- **`ScrollTrigger.refresh()` on `document.fonts.ready`** — belongs with the first real scroll animation, where it can actually be observed failing.
- **Animation orchestration layer** — premature with one consumer. Revisit when the third arrives.
- **Landing page content** — blocked on Case Files having honest content rather than invented metrics.
