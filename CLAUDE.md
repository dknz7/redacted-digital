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
> Last updated: 2026-03-10

---

## Project Overview

**Business:** Redacted Digital
**Domain:** redacteddigital.au
**ABN:** Existing (Byron's personal ABN)
**Owner:** Byron (referred to as "Lord Byron" by ChatGPT, calls Claude "Claudette")

**What it is:** A GoHighLevel-based digital agency selling "smart websites" (lead systems, not just sites) to tradies and service businesses. Initially targeting Central Coast and Hunter Valley NSW, Australia. Designed to scale nationally.

**Core positioning:** We don't sell websites. We sell lead systems that happen to include a website. The key differentiator from every local competitor (Coast Wide Web, GLO Design, Picasso Media, Central Coast Websites) is automation, lead capture, AI receptionist, review management, and SEO — not just pages.

**Brand voice:** "We" language (deliberately ambiguous on team size). Cheeky personality up front, professional authority in the detail. Tradie-friendly without being patronising.

**Brand aesthetic:** Full classified/redacted/spy-ops theme. Dark UI, warm grey backgrounds, hot pink accent. Premium, cinematic, memorable. Not subtle hints — full commitment.

---

## Current Status

- **Phase:** Design complete. Implementation plan is next.
- **Design document:** `docs/plans/2026-03-10-redacted-digital-site-design.md`
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
- **Hero animation pipeline:** Start/end frame images → Veo 3.1 interpolation → ffmpeg frame extraction → scroll-driven playback
- **GHL integration:** Embedded via code snippets (forms, calendar, chat widget, tracking pixel)
- **Meta pixel:** In `<head>` for ad tracking
- **Version control:** Git (this repo), synced between Claude Chat (via Project link) and Claude Code (local clone)

---

## Design System

### Colours

| Role | Hex |
|------|-----|
| Primary background | #303030 |
| Recessed surfaces | #1E1E1E – #222222 |
| Elevated surfaces | #3A3A3A – #404040 |
| Accent | #FF2C64 |
| Text primary | #FFFFFF |
| Text secondary | #AAAAAA |

### Typography

- **Display/headings:** Monospaced or semi-mono (Space Mono, JetBrains Mono, or IBM Plex Mono). Bold, uppercase where appropriate.
- **Body:** Clean geometric sans (Outfit, Satoshi, or General Sans).

### Motion

- Redaction bar reveals (GSAP ScrollTrigger)
- Text scramble/declassify effects
- Stagger animations on scroll
- Grain/scan-line background texture
- Hero: scroll-driven frame sequence (the one cinematic moment)
- All other pages: lighter motion vocabulary

### Navigation

- Floating pill nav, glassmorphism, consistent across all pages
- Wordmark left, links centre, CTA right (#FF2C64 "Request a Briefing")
- Hamburger on mobile

### Mobile-First Rule

Every component designed for desktop AND mobile. Mobile alternatives defined at design time, not during code review.

---

## Site Map (12 pages)

1. **Landing page** — cinematic scroll (11 sections)
2. **Services overview** — hub linking to 5 subpages
3. **Service: Design**
4. **Service: Lead Capturing**
5. **Service: AI & Automation**
6. **Service: SEO & Local Search**
7. **Service: Mobile App Management**
8. **Pricing** — 3 tiers (Launch / Convert / Grow) + add-ons
9. **Success Stories** — portfolio + testimonial flip cards
10. **About** — "The Operative"
11. **Contact / Booking** — GHL calendar + form embed
12. **Privacy Policy + Terms**

---

## Landing Page Sections (in order)

1. **Hero** — scroll-driven frame animation, headline/reveal/tagline/CTA
   - Headline: "Your website is just an online ornament."
   - Reveal: "Make it another tool in your toolbox. Put it to work!"
   - Tagline: "Less phone time, more tool time."
   - CTA: "Request a Briefing"
   - Scroll prompt: "Scroll to declassify"
2. **Scrolling capability ticker** — monospaced, #FF2C64 on #282828
3. **The Problem** — 4x pain points with redaction reveals
   - "No answer means your competitor has already been called."
   - "Page 4 of Google is where local businesses go to hide."
   - "If you don't respond on first contact, they'll book someone who does."
   - "Isn't your best work invisible if nobody reviews it?"
   - Closing: "// THREAT ASSESSMENT COMPLETE — Countermeasures below."
4. **The Solution** — "Do what you do best — the tools, the work. Not the admin." + 5x flip cards (Design, Lead Capturing, AI & Automation, SEO & Local Search, Mobile App Management)
5. **Why Us** — 4x vertical side-by-side cards, redaction reveal on hover (Ugly websites don't get callbacks / Leads on autopilot / Google will know your name / AI that never calls in sick)
6. **Social Proof / Portfolio Preview** — "// DECLASSIFIED OPERATIONS" + 2-3 project cards + testimonial
7. **The Secret** — process infographic (Briefing → Build → Deploy → Grow)
8. **Common Problems We Fix** — 5x problem/countermeasure cards (replaces FAQ)
9. **Free Resources** — "// FIELD RESOURCES" placeholder at launch
10. **Final CTA** — "// MISSION BRIEFING REQUESTED"
11. **Footer**

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

- https://webjuice.io — Competitor reference (GHL reseller, good offer structure, poor design/copy)
- https://www.yeshaya.dev — Design/copy inspiration (clean, cheeky, clever sections)
- https://lucidmotors.com — Design language reference (cinematic, dark, video-driven)
- https://milremrobotics.com — Design language reference (dark, premium, motion)
- Dribbble Avera AI fitness platform — Animation reference
- Music player UI (vinyl player screenshot) — Colour/surface/accent reference
