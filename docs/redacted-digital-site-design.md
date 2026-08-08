# Redacted Digital — Website Design Document

> **SUPERSEDED 2026-08-09.** Retained for history only. The live design is
> `docs/superpowers/specs/2026-08-09-redacted-digital-v2-design.md`.

> **Date:** 2026-03-10
> **Status:** Approved
> **Next Step:** Invoke writing-plans skill to create implementation plan

---

## 1. Project Overview

**Business:** Redacted Digital — a GoHighLevel-based "smart website" agency targeting tradies, service businesses, and local operators in the Central Coast and Hunter Valley regions of NSW, Australia. Designed to scale beyond local to broader NSW and nationally.

**Domain:** redacteddigital.au

**Primary Conversion Action:** Book a call / demo ("Request a Briefing")

**Target Audience:** Tradies, service businesses (cleaners, hairdressers, cafes, tattoo artists, groomers, food trucks, tilers, gardeners, panel beaters, honey suppliers, crepe caterers). Initially Central Coast + Hunter Valley, scaling to broader NSW and national.

**Positioning:** "We" language — deliberately ambiguous on team size. Premium agency feel. Not geographically locked in the brand, just the initial messaging.

**Tone:** Mix of cheeky personality up top, professional authority in the detail sections.

**Competitive Landscape:** Multiple traditional web design agencies exist locally (Coast Wide Web, GLO Design, Picasso Media, Central Coast Websites) — all selling traditional WordPress/brochure sites. No GHL resellers identified in the Central Coast / Hunter Valley area. Redacted Digital's differentiator is selling lead systems, not just websites.

---

## 2. Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Animation:** GSAP + ScrollTrigger for scroll-driven animations, CSS transitions for lighter interactions
- **GHL Integration:** Embedded via code snippets (forms, booking calendar, chat widget, tracking pixel)
- **Meta Pixel:** In `<head>` for April ad campaign
- **Hero Animation Pipeline:** Start/end frame images → AI video gen (Veo 3.1) for interpolation → ffmpeg frame extraction → scroll-driven frame sequence playback

---

## 3. Design System

### Colour Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary background | #303030 | Page backgrounds |
| Recessed surfaces | #1E1E1E – #222222 | Cards, content blocks |
| Elevated surfaces | #3A3A3A – #404040 | Nav, hover states |
| Accent | #FF2C64 | CTAs, highlights, active states, impact text, borders |
| Text primary | #FFFFFF | Headings, key content |
| Text secondary | #AAAAAA | Supporting copy, labels |
| Redaction bars | #FF2C64 on dark for reveals, #000000 for decorative |

### Typography

- **Display / Headings:** Monospaced or semi-mono typeface (Space Mono, JetBrains Mono, or IBM Plex Mono). Bold/heavy weights, uppercase where it fits the classified vibe.
- **Body:** Clean geometric sans-serif (Outfit, Satoshi, or General Sans). Regular weight for readability.
- **Contrast principle:** Mono headings + clean sans body = "classified document meets modern agency"

### Motion Principles

- **Redaction bar reveals:** Horizontal bars slide away to reveal content beneath (GSAP ScrollTrigger)
- **Text declassification:** Characters scramble then resolve into readable text (custom JS or library)
- **Section transitions:** Content fades/slides into view as sections "declassify" on scroll
- **Stagger animations:** Elements reveal one by one (left to right, top to bottom)
- **Background texture:** Subtle grain overlay or scan-line effect for depth
- **Hero:** Scroll-driven frame sequence animation (the one cinematic moment)
- **Performance rule:** All other pages use lighter motion vocabulary (reveals, scrambles, fades)

### Floating Pill Navigation

- Fixed position, layered above all content
- Semi-transparent dark background with subtle blur (glassmorphism)
- "REDACTED DIGITAL" wordmark on the left
- Page links centre
- Primary CTA button ("Request a Briefing") on the right in #FF2C64
- Consistent across all pages
- Collapses to hamburger on mobile

### Recurring UI Motifs

- Redaction bars as decorative dividers between sections
- "[CLASSIFIED]" / "[DECLASSIFIED]" stamp-style labels
- Dossier-style card treatments (subtle border, top-left file tab accent in #FF2C64)
- Monospaced labels and metadata
- Dark recessed cards (#1E1E1E) against #303030 background for layered depth

### Mobile-First Rule

Every section, component, and interaction is designed for desktop AND mobile. If something doesn't work on mobile (hover states, wide layouts, heavy animations), the mobile alternative is defined at design time.

---

## 4. Site Map (12 pages)

1. Landing page (scrolling, cinematic)
2. Services overview (hub)
3. Service subpage: Design
4. Service subpage: Lead Capturing
5. Service subpage: AI & Automation
6. Service subpage: SEO & Local Search
7. Service subpage: Mobile App Management
8. Pricing
9. Success Stories (portfolio + testimonials)
10. About
11. Contact / Booking
12. Privacy Policy + Terms

---

## 5. Landing Page — Section-by-Section

### Section 1: Hero

**Layout:** Full viewport height. Scroll-driven frame animation as background.

**Animation concept:**
- Start frame: static, dull, outdated-looking website (the "online ornament" — the problem)
- End frame: sleek, glowing Redacted Digital smart website interface (the solution)
- Frame sequence transitions as visitor scrolls

**Content:**
- **Headline:** "Your website is just an online ornament."
- **Reveal (redaction bars peel away):** "Make it another tool in your toolbox. Put it to work!"
- **Tagline:** "Less phone time, more tool time."
- **CTA:** "Request a Briefing" (button in #FF2C64)
- **Scroll prompt:** "Scroll to declassify"

Text uses scramble/declassify reveal effects.

### Section 2: Scrolling Capability Ticker

Continuous horizontal scrolling marquee. Monospaced text in #FF2C64 on a slightly darker band (#282828) spanning full width.

**Content (repeating):**
WEB DESIGN // LEAD CAPTURE // AI AUTOMATION // SEO // LOCAL SEARCH // BOOKING SYSTEMS // REVIEW MANAGEMENT // AI RECEPTIONIST // MISSED CALL RECOVERY // GOOGLE BUSINESS PROFILE // CRM // SMS FOLLOW-UP // MOBILE APP MANAGEMENT

Pure CSS animation, no JS. Lightweight. Same behaviour on mobile with slightly smaller text.

### Section 3: The Problem

**Styling:** Dark recessed card (#1E1E1E), monospaced text, classified document aesthetic. Accent colour highlights key words. Subtle "CLASSIFIED" watermark.

**4x pain points (reveal via redaction bar animation on scroll):**

1. "No answer means your competitor has already been called."
2. "Page 4 of Google is where local businesses go to hide."
3. "If you don't respond on first contact, they'll book someone who does."
4. "Isn't your best work invisible if nobody reviews it?"

**Closing prompt:** "// THREAT ASSESSMENT COMPLETE — Countermeasures below."

### Section 4: The Solution

**Opening line:** "Do what you do best — the tools, the work. Not the admin."

**5x flip cards (stagger-reveal on scroll, declassify one by one):**

Each card has:
- **Front face:** Dark recessed surface (#1E1E1E), #FF2C64 accent border top edge, icon/visual, pillar name in bold white uppercase, subtle "CLASSIFIED" watermark, hover glow before flip
- **Back face:** Slightly lighter surface (#2A2A2A), "[DECLASSIFIED]" stamp in #FF2C64, description text, "View Full Brief →" link to service subpage

**Cards:**

| Pillar | Description |
|--------|-------------|
| Design | "A website that doesn't just exist. It wows your visitors and works for you. Just like your work and tools." |
| Lead Capturing | "Every enquiry caught. Every lead followed up. Automatically." |
| AI & Automation | "Missed calls and lost bookings a thing of the past. 24/7." |
| SEO & Local Search | "Be the first local business they find, not your competitor with a better site." |
| Mobile App Management | "Run and manage your business from your pocket. Take advantage of our powerful integrations." |

**Layout:**
- Desktop: 5 across or 3+2
- Tablet: 2 columns
- Mobile: Stacked single column, tap to flip, "Tap to declassify" prompt

**Section CTA:** "Request a Briefing"

### Section 5: Why Us

**Section header:** "// WHY REDACTED DIGITAL"

**Opening line:** "A website should work as hard as you do. Most don't. Ours do."

**4x vertical cards side by side** spanning total page width. Redaction animation on hover to reveal content.

**Desktop:** 4 cards side by side
**Mobile:** Stacked vertically, tap to reveal

| Step | Heading | Copy |
|------|---------|------|
| 01 | "Ugly websites don't get callbacks." | First impressions aren't just for dates. We build sites that make your business look like the premium choice — because you are. No templates. No cookie-cutter garbage. Just designs that make your competitors quietly panic. |
| 02 | "Leads on autopilot. You're welcome." | Every enquiry caught. Every follow-up sent. Every booking confirmed. All while you're elbow-deep in the actual work. Your website finally earns its keep. |
| 03 | "Google will know your name." | We don't just build pretty sites — we make sure your customers find you, book with you AND review you. SEO, Google Business Profile, local search domination. Map pack placement is yours to claim. |
| 04 | "An AI that never calls in sick." | Missed calls answered. Enquiries handled. Bookings made. At 2am on a Sunday. Your AI receptionist doesn't need coffee breaks, holidays, or motivation. It just works. |

### Section 6: Social Proof / Portfolio Preview

**Section header:** "// DECLASSIFIED OPERATIONS"

**2-3 project preview cards:**
- Client business type (e.g. "Tiler — Central Coast")
- Before/after screenshot or hero screenshot
- One-line result or testimonial pull quote
- "Read Full Brief →" link to Success Stories page
- Static cards with subtle hover lift and #FF2C64 border glow
- Slide-in on scroll with redaction reveal

**Written testimonial** styled as "field report" — monospaced label, quote in white, client name and business type.

**Link:** "View all operations →" to Success Stories page

**Desktop:** 3 cards in a row
**Mobile:** Stacked full width, swipeable carousel

### Section 7: The Secret (Process Infographic)

**Section header:** "// THE SECRET"

**4-step process, horizontal timeline on desktop, vertical on mobile:**

| Step | Heading | Copy |
|------|---------|------|
| 1 | BRIEFING | "You talk. We listen. No jargon, no fluff. Just a straight conversation about what your business needs." |
| 2 | BUILD | "We create the wow factor. Your site, deployed fast. Your choice of automations. Everything your business needs to focus, nothing to distract." |
| 3 | DEPLOY | "We flip the switch. No more chasing leads between jobs. No more missed calls turning into missed revenue. Your site handles the front desk so you can stay on the tools." |
| 4 | GROW | "We don't disappear after launch. We optimise, we tweak, we support. You rank on Google and you get to focus on the work that you want to do." |

Monospaced labels, #FF2C64 connectors, stagger reveal on scroll.

### Section 8: Common Problems We Fix

**Section header:** "// COMMON PROBLEMS WE FIX"
**Subline:** "Your business might be dealing with one — or all — of these. We've seen them. We fix them."

| Problem | Countermeasure |
|---------|---------------|
| "Your website is just a digital business card." | We rebuild it as a lead system — capturing enquiries, booking jobs, and following up automatically. Your site earns its keep. |
| "You're invisible on Google." | SEO, Google Business Profile optimisation, and local search strategy. We put you on the map — literally. |
| "Missed calls are costing you jobs." | AI receptionist and missed-call text-back. Every call gets answered. Every lead gets captured. Even at 2am. |
| "You've got no reviews — or bad ones running the show." | Automated review requests after every job. Your happy customers finally speak up. Your Google rating climbs. |
| "You're drowning in admin instead of doing actual work." | Automated follow-ups, booking confirmations, reminders, and lead nurturing. The system handles the admin. You handle the tools. |

**CTA:** "[LET'S FIX YOURS →]" linking to contact/booking page.

### Section 9: Free Resources (Placeholder at Launch)

**Section header:** "// FIELD RESOURCES"
**Subline:** "Free intel. No email required. No strings attached."

**2-3 placeholder cards:**
- "5 Things Every Tradie's Website Needs in 2026" (guide)
- "Free Website Health Check" (tool/form)
- "Local SEO Checklist for Central Coast Businesses" (guide)

Styled as classified documents. "[COMING SOON]" or "[ACCESS RESOURCE →]" tags. Architecture in place for future content.

### Section 10: Final CTA

**Full viewport or near-full section. Dark, cinematic, minimal.**

- Headline: "// MISSION BRIEFING REQUESTED" or "Ready to put your website to work?"
- Tagline: "Less phone time, more tool time."
- CTA: "Request a Briefing" in #FF2C64
- Clean, definitive, one action.

### Section 11: Footer

- Redacted Digital wordmark/logo
- Navigation links (all main pages)
- Service subpage links
- Contact info (email, phone)
- Social links (if applicable)
- Privacy Policy + Terms links
- ABN number
- Copyright line
- Dark surface (#1A1A1A or #1E1E1E), clean grid, monospaced section headers

---

## 6. Services Overview Page

**Hero:** "// OUR SERVICES" + "Everything your business needs to compete online. Nothing it doesn't."

**5x service cards** — larger format, each with pillar name, 2-3 sentence summary, visual/icon, "View Full Brief →" link.

**Grid layout:** 2-3 across on desktop, stacked on mobile.

**Bottom CTA:** "Request a Briefing"

---

## 7. Service Subpages (Shared Template)

All 5 follow the same structure:

1. **Hero** — Pillar name, one-liner value prop
2. **The problem** — 2-3 pain points specific to this pillar
3. **What we do** — Detailed breakdown, content blocks (SEO depth)
4. **How it works** — 3 steps specific to this service
5. **Who it's for** — Business types this serves
6. **CTA** — "Request a Briefing" + "// ACCESS PRICING INTEL →"

### Design
- Value prop: "A website that doesn't just exist. It makes your business look like the premium choice."
- Covers: custom design, responsive, conversion-focused, fast loading, branding
- Pain: ugly outdated sites, DIY Wix, Facebook-as-website

### Lead Capturing
- Value prop: "Every enquiry caught. Every lead followed up. Automatically."
- Covers: forms, quote workflows, booking calendars, missed-call text-back, SMS/email follow-up, pipeline management
- Pain: missed calls, leads falling through, no follow-up

### AI & Automation
- Value prop: "An AI workforce that never clocks off."
- Covers: AI receptionist (phone), AI chat, automated workflows, sequences, lead nurturing, review automation
- Pain: unavailable after hours, drowning in admin, repetitive tasks

### SEO & Local Search
- Value prop: "Be the first local business they find."
- Covers: on-page SEO, GBP setup/optimisation, local keywords, map pack, monthly reporting, content guidance
- Pain: invisible on Google, competitors outranking, no search knowledge

### Mobile App Management
- Value prop: "Your entire business in your pocket."
- Covers: GHL mobile app features, lead notifications, conversations, calendar, analytics, content updates
- Pain: tied to desktop, slow response, no visibility

---

## 8. Pricing Page

**Hero:** "// SELECT YOUR CLEARANCE LEVEL" + "No hidden fees. No lock-in surprises. Just the right level for your business."

**3 tier cards:**

| Tier | Name | Includes |
|------|------|----------|
| Level 1 | LAUNCH | Monthly price, setup fee, "Choose Booking or Quotes engine", full inclusion list, limits |
| Level 2 | CONVERT (// RECOMMENDED badge) | Monthly, setup, "Everything in Launch, plus:", full inclusions |
| Level 3 | GROW | Monthly, setup, "Everything in Convert, plus:", full inclusions |

**Convert card** visually elevated with stronger #FF2C64 border.

**Add-ons section:** "// OPTIONAL MODULES" — AI Receptionist, additional engine, social posting pack.

**Optional comparison table:** Feature-by-feature grid, tick marks in #FF2C64. Collapsible on mobile.

**Pricing FAQ:** Countermeasure format (contract, upgrades, setup fee, pausing).

**Bottom CTA:** "Still not sure which level? Request a Briefing and we'll recommend the right fit."

**Mobile:** Stacked vertically, Convert card first.

---

## 9. Success Stories Page (Portfolio)

**Hero:** "// SUCCESS STORIES" + "Real businesses. Real results. See what we've built for local operators just like you."

**Project grid:**
Each card has:
- Screenshot/preview
- Business name
- **Elevator pitch of what the business does** (not technical jargon)
- Tags showing what the client chose (e.g. LAUNCH TIER, LEAD CAPTURE, AI RECEPTIONIST, SEO)
- "View Success Story →" link
- "[DECLASSIFIED]" stamp appears on scroll entry

**Desktop:** 2-3 column grid
**Mobile:** Single column stacked

**Testimonials section:** "// WHAT DO THOSE SUCCESS STORIES SOUND LIKE?"
- Flip cards: front = business logo/name, back = testimonial quote + 5-star rating + client name/type
- Desktop: 3-4 in a row, hover to flip
- Mobile: stacked/carousel, tap to flip

**Bottom CTA:** "Want to be our next success story? Request a Briefing."

---

## 10. About Page

**Hero:** "// THE OPERATIVE" or "// ABOUT REDACTED DIGITAL"

**Content:**
- Personal story in "we" voice, cheeky opening, professional substance
- Why Redacted Digital was started
- DevOps/automation engineering background (credibility)
- Why local businesses / Central Coast + Hunter Valley
- What makes it different
- 3-4 short paragraphs max

**Photo/portrait** alongside text.

**Values:** 3-4 short principle blocks (e.g. "No templates. No shortcuts.", "We build systems, not just sites.")

**CTA:** "Request a Briefing"

---

## 11. Contact / Booking Page

**Hero:** "// REQUEST A BRIEFING" + "Pick a time or drop us a line. No pressure. No pitch deck. Just a straight conversation about what your business needs."

**Two-column on desktop:**
- Left: GHL booking calendar embed
- Right: GHL contact form embed
- Mobile: stacked, calendar first

**Direct contact info:** Email, phone, location.

**No other content.** Pure conversion page.

---

## 12. Privacy Policy + Terms

Standard legal pages. Clean typography, monospaced headers, dark background. Australian consumer law / privacy act references. No animation.

---

## 13. GHL Integration Points

| Integration | Location | Method |
|-------------|----------|--------|
| Contact form | Contact page, Final CTA | GHL form embed (iframe/JS) |
| Booking calendar | Contact page | GHL calendar embed |
| Chat widget | Global (all pages) | GHL chat widget script in footer |
| GHL tracking | Global | GHL pixel in `<head>` |
| Meta pixel | Global | Meta pixel in `<head>` |

---

## 14. Logo

Logo needs to be created. Direction: typographic wordmark with redaction motif (bar through text, classified stamp element, or similar). To be designed during brand phase.

---

## 15. Future Additions (Not at Launch)

- Blog / resources section (content marketing)
- Individual success story detail pages
- Free tools (Website Health Check, SEO Checklist)
- Free guides ("5 Things Every Tradie's Website Needs in 2026")
- Newsletter signup
- Recent Operations activity feed