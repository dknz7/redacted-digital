# Design

Source of truth: `docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md`.
This file is the condensed reference other impeccable commands read; see the spec
for full rationale and history.

## Visual Theme

Classified intelligence dossier. Technical grid, monospace margin annotations,
corner brackets, file counters, redaction bars. Full commitment, not a hint.
The site alternates two surfaces: dark carries the pitch, warm paper carries the
proof. This is functional, not decorative — redaction bars are a light-mode
device (black marker on white paper); a black bar on near-black is invisible.

## Colour

Fixed, locked, do not deviate (per PRODUCT.md and the v2 spec). Use as literal
hex values, not converted to OKLCH — these are brand-locked constants.

**Dark (asphalt)**

| Token | Hex | Use |
|---|---|---|
| `ink-900` | `#131416` | Deepest — hero, footer, full-bleed |
| `ink-800` | `#1B1D20` | Base dark background |
| `ink-700` | `#24272B` | Elevated surfaces, cards |
| `ink-600` | `#33373C` | Grid lines on dark |
| `ink-400` | `#6B7076` | Muted text, marginalia |
| `ink-200` | `#B9BDC2` | Secondary text |
| `ink-050` | `#E8E9EA` | Primary text on dark |

**Paper**

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F2EEE6` | Warm off-white, manila-adjacent |
| `paper-dim` | `#E5DFD4` | File cards, tabs, recessed surfaces |
| `paper-line` | `#D6CEC0` | Grid lines on paper |
| `paper-muted` | `#8A8378` | Muted text on paper |
| `paper-text` | `#3A3D42` | Body text on paper |

**Accent / redaction**

| Token | Hex | Use |
|---|---|---|
| `redact` | `#000000` | Redaction bars, true black |
| `rd-orange` | `#E2561C` | The one accent |
| `rd-orange-dim` | `#B8410F` | Hover/pressed |
| `orange-on-dark` | `#EE6329` | Orange text under 18px on dark |
| `orange-on-paper` | `#B0400F` | Orange text under 18px on paper |

Rules: orange appears roughly 4-6 times per viewport, never more. Never on body
copy. `#E2561C` was chosen deliberately over a hotter orange because it survives
CMYK print conversion.

## Typography

Three fonts, three jobs. Never mixed across jobs.

| Role | Family | Usage |
|---|---|---|
| Display | League Gothic (400) | Hero and section headers only. Uppercase only. Never body, never form fields, never contact details. |
| Body | Switzer (400/500/600) | All readable copy. Mixed case. |
| Annotation | JetBrains Mono (400/500) | Margin counters, eyebrows (`// LABEL`), corner brackets, file tags. 12px minimum. |

Google Fonts import first, then Fontshare, both at the very top of the
stylesheet — MagicPath's normalisation pass has silently dropped this import
before; re-verify after every submit.

## Grid & Annotation

Structural device, not decoration. Faint 1px rules on a large modular grid,
visible on both surfaces (`ink-600` on dark, `paper-line` on paper). Corner
annotations in mono (`[ FILE 04 / 08 ]`). Section eyebrows prefixed `//`.
Section counters in the margin: orange numeral, grey denominator. Space is the
premium signal — sections get room to breathe rather than being filled with
props.

## Wordmark

`REDACTED` above a solid block with `DIGITAL` knocked out in the surface's
light colour. Block always spans the full width of `REDACTED` above it and
always resolves — never leaves half the name hidden. On dark surfaces the block
is orange with white/cream knockout; on paper it is true black with cream
knockout.

## Components & Layout

- **Nav:** wordmark left, links centred (Services, Pricing, Success Stories,
  About), orange "Request a Briefing" CTA right. Pricing is a mandatory
  top-level link, not folded into a services dropdown — this is load-bearing
  (pricing gets its own page, so nav must surface it directly).
- **Cards:** used only where genuinely the best affordance, never nested. Case
  file cards use a dossier treatment (tab accent, file-counter label), not a
  generic icon-card.
- **The operative:** one canonical pose/angle, three levels of rendering detail
  (full for hero, mid for nav/card marks, minimal/silhouette for seals and
  stamps). Not yet illustrated — mark placeholder slots clearly, sized and
  positioned as if the art existed, never as an obvious hole.
- **Case Files (proof section):** no invented metrics. Design the file-card
  structure as if real numbers existed, but the empty/pending state must look
  deliberate (e.g. "First case files declassify after the pilot builds"), not
  broken.

## Motion

GSAP + ScrollTrigger, deliberately restrained (v1's failure mode was stacking
effects until it read as showing off). No text scramble, no flip cards, no
grain overlay — all cut from v1 on purpose, do not reintroduce.

- **Redaction reveal** (signature): bars wipe away on scroll to expose text.
  Paper sections only — a black bar on near-black is invisible, so if
  redaction is wanted on a dark section it must be a light bar, and think hard
  about whether that still reads as redaction.
- **Wordmark declassify**: covered bar wipes to reveal `DIGITAL` on load. Once,
  on the hero only.
- **Stagger on scroll**: standard entrance for card/list groups.
- Everything else: plain CSS transitions. Ease-out-quart/quint style curves, no
  bounce, no elastic. Respect `prefers-reduced-motion`.

## Section Rhythm (landing page)

Three acts, two surface flips, exactly as ordered: Hero (`ink-900`) → Capability
ticker (`ink-800`) → The problem (`ink-800`) → *flip* → Case files (`paper`) →
Capabilities (`paper`) → How it works (`paper`) → *flip* → Final CTA (`ink-800`)
→ Footer (`ink-900`). Dark pitches, paper proves, dark closes.
