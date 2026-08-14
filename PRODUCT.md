# Product

## Register

brand

## Users

Tradespeople and service businesses on the NSW Central Coast: plumbers, sparkies,
landscapers, tattoo studios, cafes, mobile groomers, tilers. The buyer is a bloke
who misses calls because he's up a ladder — not a marketing professional, not
tech-fluent, time-poor, judges credibility fast and viscerally (a site that looks
cheap reads as a business that is cheap).

## Product Purpose

Redacted Digital sells lead systems, not websites, to trade and service businesses.
The differentiator is automation, lead capture, an AI receptionist, review
management and local SEO — not a nicer brochure page. The landing page's job is to
land that distinction fast, prove it's not vapourware, and convert into a booked
"Request a Briefing" call. Success = the visitor understands within one screen
that this isn't a web design agency, and books a briefing before they'd normally
bounce.

## Brand Personality

Cheeky up front, professional in the detail. "We" language, deliberately
ambiguous on team size. Tradie-friendly without being patronising — respects the
buyer's intelligence even while being playful with the classified-dossier
conceit. Confident, a little conspiratorial ("we both know your website is
decoration"), never corporate-stiff, never twee.

## Anti-references

- The v1 build (hot pink `#FF2C64`, monospace display headings, text-scramble
  effects, flip cards, grain overlay, eleven landing sections). Scrapped by
  Byron's explicit call — nothing from it is being kept, including the
  RedactionReveal/TextScramble components.
- Generic SaaS landing page template: hero-metric blocks, gradient-text
  headlines, identical icon-card grids, glassmorphism-as-decoration.
- GHL-reseller competitor sites (webjuice.io) — functional offer structure,
  poor design and copy execution. Don't inherit the poor execution.
- Anything that reads as a stock corporate agency: stock photography of
  handshakes, generic blue-and-white "trust" palettes.

## Design Principles

1. **Full commitment to the classified-dossier conceit, not a hint of it.**
   Grid, annotation, redaction are load-bearing structure, not seasoning.
2. **Dark pitches, paper proves, dark closes.** Surface changes track argument
   structure (claim → problem, then proof, then close), not decoration.
3. **Space is the premium signal, not props.** Firecrawl-style restraint over
   piling on visual effects — v1's failure mode was stacking motion until it
   read as showing off.
4. **Never ship invented credibility.** No fabricated client metrics. An empty
   or pending state, honestly framed, beats a fake number.
5. **The operative appears rarely enough to stay special.** One canonical pose,
   used sparingly (hero, final CTA seal) — not a mascot plastered everywhere.
6. **Two registers read the same page differently.** Loud display type for the
   scroll-through; calm, findable body copy and contact details for the buyer
   hunting for the phone number. Never blur the two.

## Accessibility & Inclusion

- JetBrains Mono annotation text: 12px minimum — a contrast/legibility floor,
  not a style preference.
- Redaction-reveal and other scroll-triggered motion must respect
  `prefers-reduced-motion` (fall back to static revealed state).
- Mobile-first: every section, interaction and hover-dependent affordance
  (flip, hover-reveal) needs a working tap/mobile equivalent.
- Standard WCAG AA contrast expectations on both dark (`ink-*`) and paper
  surfaces; orange is never used for body text or text under ~18px, which is
  a contrast rule as much as a rationing rule.
