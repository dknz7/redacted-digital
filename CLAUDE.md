## Persistent Context (LifeOS)
This project's strategic and operational context lives in Google Drive and is the single source of truth:
- **Context file:** C:\Users\dicke\Desktop\Dump Zone\STACK\01-BRAIN\google-drive\claude-memory\redacted-digital\context
- **System docs:** C:\Users\dicke\Desktop\Dump Zone\STACK\01-BRAIN\google-drive\claude-memory\README
- At session start, read the relevant context file for current priorities, decisions, and blockers.
- Significant decisions made in this session should be flagged for the nightly capture.
- Auto-memory (project-specific technical notes) operates alongside this. Drive context = strategic/business. Auto-memory = code-level.

---

# Redacted Digital — Project Context

> This file carries project context across all Claude sessions (Chat and Code).
> It is the single source of truth for what has been decided and where we're at.
> Last updated: 2026-08-09

---

## Project Overview

**Business:** Redacted Digital
**Domain:** redacteddigital.au
**ABN:** Existing (Byron's personal ABN)
**Owner:** Byron (referred to as "Lord Byron" by ChatGPT, calls Claude "Claudette")

**What it is:** A GoHighLevel-based digital agency selling "smart websites" (lead systems, not just sites) to tradies and service businesses. Initially targeting Central Coast and Hunter Valley NSW, Australia. Designed to scale nationally.

**Core positioning:** We don't sell websites. We sell lead systems that happen to include a website. The key differentiator from every local competitor (Coast Wide Web, GLO Design, Picasso Media, Central Coast Websites) is automation, lead capture, AI receptionist, review management, and SEO — not just pages.

**Brand voice:** "We" language (deliberately ambiguous on team size). Cheeky personality up front, professional authority in the detail. Tradie-friendly without being patronising.

**Brand aesthetic:** Full classified/redacted/spy-ops theme. Alternating asphalt-dark and warm paper surfaces, single orange accent `#E2561C`, technical-document grid and margin annotations. Premium, cinematic, memorable. Not subtle hints — full commitment.

---

## Current Status

- **Phase:** v2 rebuild. Design spec approved, foundation in progress.
- **Design spec:** `docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md`
- **Design canvas:** MagicPath project `Redacted-Digital` (id `436965821978415104`)
- **Skills:** Available in `/skills` directory
- **Logo:** Not yet created. Needs to be designed (typographic wordmark with redaction motif).
- **GHL account:** Trial not yet started. Will be activated when ready to build client templates.
- **Pilot clients (9 identified):** Turkish kebab/cafe, 2x tattoo artists, 1x tattoo shop, tiler, mobile dog groomer, mobile PDR, cafe van, gardener. Additional prospects: honey supplier, crepe caterer.
- **Meta ads:** $500 AUD budget for April. Campaign prep (landing page, pixel, ad copy, creatives) built into late March timeline. Ads go live April 1.

---

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Animation:** GSAP + ScrollTrigger (scroll-driven), CSS transitions (lighter interactions)
- **GHL integration:** Embedded via code snippets (forms, calendar, chat widget, tracking pixel)
- **Meta pixel:** In `<head>` for ad tracking
- **Version control:** Git (this repo), synced between Claude Chat (via Project link) and Claude Code (local clone)

---

## Agent Safety Rules

- **Never run process-wide kills.** No `taskkill /F /IM node.exe`, no `pkill node`,
  no `killall`. An agent did this on 2026-08-09 and killed every Node process on
  the machine, taking down unrelated MCP servers. Stop only the PID you started.

---

## Design System

**Superseded 2026-08-09.** The v1 system (hot pink `#FF2C64`, monospace display
headings, eleven landing sections) is dead. Do not build against it.

The current system lives in `docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md`.
Summary: asphalt `ink-*` and warm paper surfaces, single orange accent `#E2561C`,
League Gothic display / Switzer body / JetBrains Mono annotation, seven landing
sections in three acts.

---

## Site Map (12 pages)

1. **Landing page** — seven sections in three acts (see the v2 spec §4)
2. **Services overview** — hub linking to 5 subpages
3. **Service: Design**
4. **Service: Lead Capturing**
5. **Service: AI & Automation**
6. **Service: SEO & Local Search**
7. **Service: Mobile App Management**
8. **Pricing** — 3 tiers (Launch / Convert / Grow) + add-ons
9. **Success Stories** — portfolio + testimonials
10. **About** — "The Operative"
11. **Contact / Booking** — GHL calendar + form embed
12. **Privacy Policy + Terms**

---

## Landing Page Sections (in order)

**Superseded 2026-08-09.** Eleven sections cut to seven. See
`docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md` §4.

---

## Pricing Structure

**3 tiers (exact pricing TBD on pricing page):**

| Tier | Name | Monthly | Setup Fee |
|------|------|---------|-----------|
| Level 1 | LAUNCH | ~$300 | ~$2,500 (discountable) |
| Level 2 | CONVERT (recommended) | ~$500 | ~$4,000 (discountable) |
| Level 3 | GROW | ~$650-800 | ~$6,000 (discountable) |

Setup fees kept but waived/discounted on case-by-case basis (pilot clients, referrals, negotiations).

**Modular engines inside tiers:**
- Tier 1 client chooses Booking OR Quote engine
- Add-ons: AI Receptionist, additional engine, social posting pack

**Target metrics:**
- 55 clients at 50/30/20 mix = ~$300K/year recurring
- 35 clients with setup fees in year 1 = ~$300K total

---

## GHL Integration Points

| Integration | Location | Method |
|-------------|----------|--------|
| Contact form | Contact page | GHL form embed |
| Booking calendar | Contact page | GHL calendar embed |
| Chat widget | All pages (global) | GHL script in footer |
| GHL tracking | All pages | Pixel in `<head>` |
| Meta pixel | All pages | Pixel in `<head>` |

---

## Meta Ad Strategy (April)

- **Budget:** $500 AUD/month
- **Target:** Central Coast + Hunter Valley business owners, 25-55, trades/small business interests
- **Landing page:** Dedicated page in GHL (separate from main site), built in late March
- **Pixel:** Installed on both main site and ad landing page
- **Creative approach:** Local, direct, not polished agency ads. 30-second selfie video + punchy copy.
- **Key ad lines:**
  - "Is your website just an online ornament? Let's turn it into another tool in your toolbox."
  - "How many jobs did you lose last month from missed calls and slow replies?"
  - "Still running your business off a Facebook page? Your customers are Googling you right now and finding your competitors instead."

---

## Outreach / Sales

**Primary script (Script 2 — missed calls hook):**
"Hey mate — most tradies lose jobs from missed calls and no follow-up. I build a simple system: website, quote form, booking link, missed-call text-back, review requests — so leads don't fall through. Want a quick demo with your branding on it?"

**Pilot client offer:** Waive/discount setup fees in exchange for testimonial + Google review + case study permission.

---

## Key Decisions Made

- Site hosted externally (Vercel), NOT in GHL. GHL features embedded via snippets.
- Client sites ARE built in GHL using master templates.
- "Smart websites" term avoided — too generic. Using outcome-focused language instead.
- FAQ replaced with "Common Problems We Fix" (countermeasure format).
- Portfolio renamed to "Success Stories" everywhere.
- No blog at launch. Architecture for free resources (guides/tools) in place but not populated.
- Pricing teased on landing page ("from $X/mo"), full detail on dedicated pricing page.

---

## Workflow Notes

- **Chat mode:** Planning, brainstorming, copy, strategy, design decisions. Has access to this repo via Project link.
- **Code mode:** Building, coding, debugging, file operations. Works from local clone of this repo.
- **Git:** Sync layer between Chat and Code. Push/pull to keep both environments current.
- **Skills:** Stored in `/skills` directory in this repo. Both modes can access them.
- **Context7:** MCP server in Code mode only. Use web search in Chat mode for current docs.
- **CLAUDE.md:** This file. The bridge between sessions. Update it when major decisions are made.

---

## Next Steps

1. **Write implementation plan** — Invoke writing-plans skill against the design document
2. **Logo creation** — Typographic wordmark with redaction motif
3. **Begin build** — Starting with landing page hero section
4. **GHL trial activation** — When ready to build client templates (separate from agency site)
5. **Meta ad prep** — Late March (landing page, pixel, copy, creatives, campaign draft)
6. **Pilot client outreach** — Can begin once agency site is presentable

---

## Reference Sites

> **v1-era references.** Retained for history. The v2 references are firecrawl.dev
plus the two mockups in `brand_assets/`.

- https://webjuice.io — Competitor reference (GHL reseller, good offer structure, poor design/copy)
- https://www.yeshaya.dev — Design/copy inspiration (clean, cheeky, clever sections)
- https://lucidmotors.com — Design language reference (cinematic, dark, video-driven)
- https://milremrobotics.com — Design language reference (dark, premium, motion)
- Dribbble Avera AI fitness platform — Animation reference
- Music player UI (vinyl player screenshot) — Colour/surface/accent reference
