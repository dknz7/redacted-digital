# Offering Brief — The Sweep

> The foot-in-the-door service for Redacted Digital. Status: **design, pre-launch.**
> Model adapted from Corey Gannon (2× podcast appearances: Greg Isenberg + Koerner Office).
> This brief captures the decisions made 2026-07-22; several items are flagged **OPEN** for
> follow-up discussion. Nothing here is final.

---

## The model in one line

A paid 30–45 min discovery interview → a short report prescribing 3–7 off-the-shelf tools that
reclaim 5–10 hours/week → a human review call that closes implementation work. The assessment is
the tripwire; the lifetime value is the implementation upsells behind it.

## Name & the offer (as the prospect hears it)

**Name: The Sweep** (decided 2026-07-22). Fits the RD redacted/spy-ops brand — a sweep for
time leaks — plain enough for a Central Coast trade audience, punchy, and free of "AI"/"audit".

**Brand tagline (ads / voice):**
> "We sweep your business. You get 5 hours back a week, or you don't cough up the cash."

**Formal guarantee (contract wording):**
> "We'll surface at least 5 hours/week of reclaimable time — or you don't pay."

The **guarantee is the offer**, not the technology. Refund if we can't surface ≥5 hrs/week.
(Corey's average client: ~7 hrs/week; average prescribed tool cost ~$60/mo → ROI always four-figure.)

---

## Why it fits RD on BOTH feet

1. **We already run the pipeline.** RD is a GoHighLevel shop. The discovery interview runs on a
   **GHL voice agent** (Aussie accents available; interrupt-handling is the thing to stress-test).
   Booking, CRM, calendar, follow-up — all native GHL we already pay for.
2. **We resell what we prescribe.** Corey's tool prescriptions send $60/mo to *other* vendors.
   Ours can point at **GHL sub-accounts** — missed-call text-back, review requests, booking, AI
   receptionist are GHL's whole feature set and exactly what breaks in a small trade business.
   The assessment seeds recurring SaaS revenue we own the rights to sell.
3. **Corey's beginners' pitch is our existing capability.** His whole hook is "you don't need to
   code, you just prescribe." His upsell menu (process redesign, Zapier builds, knowledge systems,
   Claude skills, full implementation) is aspirational for his audience and **day-one capability**
   for us.

## The three edges that are ours, not his

- **The Grimoire compounds.** Every audit's findings write into the knowledge base. By audit ten
  we have Central-Coast-specific tool intelligence nobody else has, and phase 2 gets faster/better
  each run. Corey wants this and does it crudely.
- **Better-looking deliverable.** He builds reports in Claude Design. We have Paper, brand-design,
  impeccable, hallmark — a genuinely designed report in the RD redacted/spy brand, for a market
  that judges on presentation.
- **The audit surfaces marketing gaps too**, which we fulfil with ~38 SEO/GBP skills. His audit can
  only point at tools.

---

## The four phases

1. **Discovery** — GHL voice agent runs the preset interview (`discovery-script.md`). Transcript captured.
2. **Analysis** — Claude skill (to build) ingests transcript → pain points → researches off-the-shelf
   tools → drafts report. **Human QA** the tool choices ("Salesforce for a 4-person landscaper" check).
3. **Report** — populate the branded template (`brand_assets/AI Tools Assessment Template (blank).html`,
   a Claude Design artifact — rebuild in RD brand). Slides: exec summary, effort–impact matrix, quick
   wins, recommended solutions (tool/cost/setup/hours saved), 4-day quick-start plan, "what comes after
   quick wins" (upsell seeds), financial impact, next steps.
4. **Review call** — HUMAN, ~30 min, screen-share the report. Three closing questions: most urgent?
   DIY or want my help? timeline? → 50–60% take implementation.

**Architecture rule:** AI does the *probing* (low trust), the human does the *closing* (high trust).
Never let the sale be AI-closed.

---

## Pricing & laddering (agreed direction)

- Anchor **$999 AUD**, sell at **$599 as a founding-client rate, first 10 clients** (a real 40%
  discount + legitimate scarcity — not the fake $699→$599 14% "discount").
- Ladder: **$599 → $799** once 3 case studies exist → **$999** once 10.
- **Credit trick** (credit the $999 toward implementation, having pre-marked implementation up by
  $1k): standard practice but a manipulation — use deliberately if at all. Byron to decide.
- Concierge retainer upsell (Corey's $1k/hr): 2× 45-min calls/mo building Claude skills together +
  unlimited Voxer (near-zero real load, high perceived value). Recurring-revenue play.

## OPEN — needs discussion

- ~~**NAMING.**~~ **DECIDED: "The Sweep."** Sell the hours; say "AI" only in delivery, never in the hook.
- **Refund guarantee** needs proper terms under Australian Consumer Law — it's the core of the offer,
  so it must be honoured and clearly worded.
- **Impartiality vs reselling.** The moment we resell what we prescribe, the audit stops being
  impartial — and impartiality is what we charge for. Guardrail: disclose the commercial relationship
  in the report; only prescribe GHL where it's genuinely right; keep ≥2 prescriptions per audit that
  make us nothing. A report where every rec is our own product is a pitch, not a prescription.
- **Voice-agent for discovery** — market acceptance on the Central Coast is unproven (Corey's US
  results don't transfer automatically). Could be a barrier (distrust) or an enabler (more candid to
  a bot, no feeling judged, done from the ute). Test with 3–4 real locals, not just tech QA.

## Realistic economics (plan honestly)

~2 audits/month at $599, ~50% converting to $2–3k of work ≈ **$3–4k AUD/month**. A strong lead-gen
line for RD; **not** a replacement for client web work. Time per audit drops from ~4–5 hrs to ~90 min
once the voice agent runs discovery (review call + QA only) — and discoveries parallelise.

---

## Next actions

- [ ] Grab `audittemplate.ai` (Corey's open-source blank) for reference before rebuilding the report.
- [ ] Decide the name (kill "AI Audit").
- [ ] Build the phase-2 analysis skill (`skills/`) — transcript → pains → tool research → draft, with
      an **eval gate** (Saraev-style scored rubric: right-sized for the business? cost proportionate?
      setup genuinely <1hr? addresses the stated pain?) before a human sees it.
- [ ] Stand up + stress-test the GHL voice agent against `discovery-script.md`.
- [ ] Draft ACL-compliant guarantee terms.

## Related

- Discovery script: `./discovery-script.md`
- Report template: `../../brand_assets/AI Tools Assessment Template (blank).html`
- Source research: `01-BRAIN/research/ai-audit/20260722/` (Corey/Isenberg full transcript)
