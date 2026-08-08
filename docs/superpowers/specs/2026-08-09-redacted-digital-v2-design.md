# Redacted Digital — Site v2 Design Spec

**Date:** 2026-08-09
**Status:** Draft for review
**Supersedes:** `docs/redacted-digital-site-design.md` and the design system documented in the repo root `CLAUDE.md`

---

## 1. Why this exists

The v1 landing page is built and functional but is being scrapped. It was designed against a hot-pink-on-dark system with monospace display headings and eleven landing sections. Byron's call: it is not the site he wants, and nothing from `src/` is being kept.

This spec captures the design decisions made in the 2026-07-28 to 2026-07-31 brainstorm so the rebuild starts from a settled position rather than re-litigating.

**The reference triangle.** Three inputs shaped this, and understanding what each contributed matters more than the images themselves:

| Reference | What it contributed | What was rejected |
|---|---|---|
| GPT Image 2.0 mockup | Alternating dark/paper section rhythm, orange accent, the operative character, physical document props | Collage layout with no grid discipline; three inconsistent drawings of the same character |
| Stitch "Noir Dossier" | Hard 1px grid rules, enormous condensed caps, one graphic device used with total discipline | Pure black-and-white throughout, which reads flat and cheap; zero section rhythm |
| firecrawl.dev | The technical-document language — faint grid, corner annotations, mono margin counters, and space as the premium signal | 16,565px page height. Far too long |

**The synthesis:** Firecrawl's grid and restraint, the dossier vocabulary in the annotations, orange as the single accent, the operative appearing rarely enough to stay special.

Reference screenshots: `brand_assets/references/firecrawl/`. Live design board: `brand_assets/design-boards/design-board.html`.

---

## 2. Design system

### 2.1 Colour

The site alternates between two surfaces. **Dark carries the pitch. Paper carries the proof.**

This is not decoration — it solves a real problem. Redaction bars are a light-mode device (black marker on white paper). On a dark background a black bar is invisible. Paper sections are where redaction can work honestly, and they are therefore where every fact you want believed lives.

**Dark side (asphalt)**

| Token | Hex | Use |
|---|---|---|
| `ink-900` | `#131416` | Deepest. Hero, footer, full-bleed |
| `ink-800` | `#1B1D20` | Base background |
| `ink-700` | `#24272B` | Elevated surfaces, cards |
| `ink-600` | `#33373C` | Grid lines on dark |
| `ink-400` | `#6B7076` | Muted text, marginalia |
| `ink-200` | `#B9BDC2` | Secondary text |
| `ink-050` | `#E8E9EA` | Primary text on dark |

**Paper side**

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F2EEE6` | Warm off-white, manila-adjacent |
| `paper-dim` | `#E5DFD4` | File cards, tabs, recessed surfaces |
| `paper-line` | `#D6CEC0` | Grid lines on paper |
| `redact` | `#000000` | Redaction bars. True black, no compromise |

**Accent**

| Token | Hex | Use |
|---|---|---|
| `orange` | `#E2561C` | The one accent |
| `orange-dim` | `#B8410F` | Hover, pressed, rules |

**Rules:**
- One accent. Orange appears roughly four times per viewport, not more.
- Orange is never used for body copy or text under ~18px. Contrast against asphalt clears large-text thresholds only.
- `#E2561C` was chosen deliberately over a hotter orange because it survives CMYK conversion for print. Brighter oranges sit outside gamut and return duller and browner than screen.

### 2.2 Typography

Three fonts, three jobs. All free for commercial use; Clash Display and Switzer are Fontshare, loaded via `next/font/local` with self-hosted files.

| Role | Family | Usage |
|---|---|---|
| Display | **Clash Display** (600/700) | Hero and section headers only. Uppercase. |
| Body | **Switzer** (400/500/600) | All readable copy. Mixed case. |
| Annotation | **JetBrains Mono** (400/500) | Margin counters, eyebrows, corner brackets, labels |

**The discipline that makes this work:** condensed caps never touch body copy, pricing, form fields or contact details. Loud display, calm information. The younger visitor responds to the volume; the older one needs to find the phone number. They read different layers of the same page.

Display is deliberately a variable family with weight range so the whole site can be dialled calmer later without an identity change.

### 2.3 Grid and annotation

The structural device borrowed from Firecrawl, given dossier vocabulary.

- Faint 1px rules on a large modular grid, visible on both surfaces (`ink-600` on dark, `paper-line` on paper)
- Corner annotations in mono: `[ 200 · SECURE ]`, `[ FILE 04 / 07 ]`
- Section eyebrows prefixed `//`: `// OPERATION FOCUS`, `// CASE FILES · DECLASSIFIED`
- Section counters in the margin, orange numeral, grey denominator

Space is the premium signal, not props. Sections get room to breathe.

### 2.4 Motion

GSAP with ScrollTrigger. Deliberately restrained — v1's failure mode was stacking effects until they read as showing off.

- **Redaction reveal** — the signature. Bars wipe away on scroll to expose text. Paper sections only.
- **Wordmark declassify** — covered bar wipes to reveal `DIGITAL` on load. Once, on the hero.
- **Stagger on scroll** — standard entrance for card groups.
- Everything else: CSS transitions.

No text scramble, no flip cards, no grain overlay. All three were in v1 and all three are cut.

---

## 3. Brand assets

### 3.1 Wordmark

Two states, one rule: **the logo bar always resolves.**

- **Covered** — `REDACTED` above a solid black bar. Web only, animated-in state.
- **Declassified** — `REDACTED` above a black block with `DIGITAL` knocked out in cream. This is the resting state everywhere static, including all print.
- **On asphalt** — same lockup, block goes orange with white knockout (a black block on near-black does nothing).

Distinct from **content redaction**, where a word blacked out in a headline for rhetorical effect stays hidden permanently. Two uses of the same visual device, kept separate so neither gets muddy.

Print note: white knockout on solid black is where cheap printing fails — ink spread closes letter counters on uncoated stock. Do not shrink below the size shown on the board, and check specifically on the proof.

### 3.2 The operative

The character survives, with the flaw from the GPT mockup fixed. That mockup contained three *different drawings* of the same character at different angles with inconsistent lineweights, which is why it reads cheap on inspection.

**One canonical pose and angle, redrawn at three levels of detail:**

| Level | Use | Treatment |
|---|---|---|
| Full | Hero | Full rendering, all detail |
| Mid | Nav, card, section marks | Head-and-shoulders crop, fewer lines, heavier weights |
| Minimal | Favicon, seal, stamp, deboss | Near-pure silhouette — hat, collar, tie |

A literal crop will not survive. Zooming into detailed artwork for an 8mm mark turns linework to mud in print. The angle and silhouette stay constant; detail reduces as size reduces, the same principle as optical sizes in a typeface.

**Required before any of this works:** the hero operative must be redrawn as clean vector. What exists is AI raster output with inconsistent lineweights. Tracing is not sufficient — the simplification decisions at each level need making deliberately.

---

## 4. Landing page

Seven content sections plus footer, down from eleven. Target height roughly half of firecrawl.dev.

**Three acts, two flips.** Separating the CTA from the footer changed the rhythm — the version shown on the design board had three flips and ended on paper, which left a single orphaned dark footer and a fourth unplanned surface change. Restructured into three blocks instead:

| # | Section | Surface | Act | Notes |
|---|---|---|---|---|
| 01 | Hero | `ink-900` | Pitch | One claim, one line of plain English, one button. The single cinematic moment. |
| 02 | Capability ticker | `ink-800` | Pitch | Thin scrolling mono strip. Reads as part of the hero. |
| 03 | The problem | `ink-800` | Pitch | Three pains, not four. Missed calls, page four of Google, slow replies. |
| — | *flip* | | | |
| 04 | Case files | `paper` | Proof | Real numbers on real jobs. Redaction reveals live here. |
| 05 | Capabilities | `paper` | Proof | Four or five, plain language. |
| 06 | How it works | `paper` | Proof | Briefing → Build → Deploy → Grow. Horizontal desktop, stacked mobile. |
| — | *flip* | | | |
| 07 | Final CTA | `ink-800` | Close | Dedicated section. Operative seal, one button. |
| 08 | Footer | `ink-900` | Close | Utilitarian. Dense links, legal, contact. No headline, no button, no personality. |

Dark pitches, paper proves, dark closes. "How it works" moved to paper because it is explanatory detail, which is what the paper surface is for — consistent with the rule rather than an exception to it.

**Cut from v1, with reasons:**

- **Solution** — merged into Capabilities. Was restating the pitch.
- **Why Us** — merged into Capabilities. Four cards saying "we're good".
- **Common Problems We Fix** — it is an FAQ. Belongs on a subpage.
- **Free Resources** — v1's own design doc calls it a placeholder at launch. Do not ship an empty room.
- **Social Proof** — folded into Case Files so testimonials sit beside the numbers they belong to.

**Considered and rejected:** a pricing teaser section. Argued for on the grounds that a buyer who cannot find a number assumes he cannot afford you. Byron's call is that pricing gets its own page. **Consequence: Pricing must occupy a top-level nav slot**, not sit inside a services dropdown. This is load-bearing, not a preference.

**Footer constraint.** Because the CTA is its own section directly above it, the footer must not read as a second goodbye. Filing cabinet, not farewell.

---

## 5. Page inventory

The v1 twelve-page site map is retained. All pages are redesigned against the new system. Reviewed after the redesign, not before.

Twelve pages resolve to **eight distinct designs**:

| Design | Covers |
|---|---|
| Landing | Landing page |
| Services overview | Services hub |
| Service template | Design · Lead Capturing · AI & Automation · SEO & Local Search · Mobile App Management |
| Pricing | Pricing (three tiers, add-ons) |
| Success Stories | Portfolio |
| About | "The Operative" |
| Contact | GHL calendar + form embed |
| Legal template | Privacy Policy · Terms |

---

## 6. Build approach

**Clean rebuild.** `src/` is wiped. Nothing is salvaged, including `RedactionReveal` and `TextScramble` — the new redaction behaviour fires on paper sections with true black bars and differs enough that rewriting beats adapting.

**Retained:** git history, `docs/`, `brand_assets/`, and the toolchain — Next.js 16, Tailwind v4, TypeScript, GSAP + ScrollTrigger, eslint config. Hosting stays Vercel.

**New branch** off the appropriate base. The v1 build stays recoverable.

**Documentation debt, treated as part of the work, not after it.** The repo root `CLAUDE.md` currently documents `#FF2C64` hot pink, mono display headings, eleven sections and the old page structure as canon. Any future session reads that and confidently builds the wrong site. Both it and `docs/redacted-digital-site-design.md` must be rewritten or explicitly marked superseded.

---

## 7. Out of scope

- GHL client-site templates (separate from the agency site)
- The Meta ad landing page, which lives in GHL
- Pricing figures — the page is designed, the numbers are Byron's call
- Blog
- The lightweight CMS work on `feat/client-cms`

---

## 8. Open questions

These need answers before or during the implementation plan. None of them block writing that plan.

1. **Case Files has no content.** Section 04 is the credibility centre of the page and the numbers currently mocked up (161% more calls, 223% form submissions) are fiction carried over from the GPT mockup. Redacted Digital has identified pilot clients but has not delivered results. Either the section launches with friends-and-family work honestly framed, or it is held back until real numbers exist. **Shipping invented metrics is not an option.**

2. **Does this go through MagicPath?** The documented design workflow routes mockups into MagicPath for hand-tweaking, then exports code. This spec assumes Claude builds directly in Next.js. Confirm which.

3. **Sequencing versus business cards.** The stated business need that started this was printed cards for in-person outreach. Cards need the wordmark and a resolving URL — not Success Stories or five service pages. Decide whether landing page plus logo ships and goes live first so cards can be printed, with subpages following.

4. **Fontshare licence.** Historically free for commercial use, not verified as of this date. Must be confirmed before a print run, not after.

5. **Operative production route.** Hand-redrawn, AI-generated then vector-cleaned, or commissioned. Affects both timeline and cost.

6. **Base branch.** Repo is currently on `feat/client-cms` with uncommitted brand assets. Confirm what v2 branches from.
