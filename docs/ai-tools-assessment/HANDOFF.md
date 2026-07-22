# Handoff Brief — The Sweep

> Import this to a fresh chat to resume work on the product. Written 2026-07-22.
> Read the two companion files first: `offering-brief.md` (the model + decisions) and
> `discovery-script.md` (the voice-agent interview). This brief is the "where we're up to and
> what's next" layer on top of them.

---

## One-paragraph catch-up

**The Sweep** is Redacted Digital's foot-in-the-door service: a paid 30–45 min discovery
interview (run by a **GHL voice agent**, Aussie accent) → a short branded report prescribing
3–7 off-the-shelf tools that reclaim 5+ hrs/week → a **human** review call that closes
implementation work. Model adapted from Corey Gannon (2 podcast walkthroughs). The assessment is
the tripwire; the money is in the implementation upsells and — our edge — **reselling GHL
sub-accounts we already own the rights to**. Guarantee is the offer: *"5 hours back a week or you
don't cough up the cash."*

## What's DECIDED

- **Name:** The Sweep. (Killed "AI Audit"/"Assessment" — "AI" reads as threat, "audit" as the ATO.)
- **Pitch frame:** sell the hours, not the AI. "AI" only appears in delivery, never the hook.
- **Pricing:** anchor $999 AUD, launch at **$599 founding rate (first 10)**, ladder $599→$799 (after
  3 case studies)→$999 (after 10). A real 40% discount, not the fake $699→$599.
- **Architecture rule:** AI does the *probing* (discovery), a **human does the *closing*** (review
  call). Never let the sale be AI-closed — the 50–60% conversion happens on the human call.
- **Discovery method:** voice agent, not human shadowing/screen-recording (Corey tried and dropped
  both). The call doubles as a live demo of the product.
- **The report template** is a Claude Design artifact (`brand_assets/AI Tools Assessment Template
  (blank).html`) — rebuild it in the RD redacted/spy brand.

## What's OPEN (the reason we paused — pick up here)

1. **Voice-agent build + stress-test.** Stand up the GHL agent against `discovery-script.md`. Test:
   interrupts/barge-in, thread-following (does it probe tangents or march the list?), and
   **required-field enforcement** (does it refuse to end without time-per-task, frequency, and
   hourly rate — the three numbers the ROI slide needs?).
2. **Market acceptance — the real unknown.** Corey's US results don't prove a Central Coast tradie
   will talk candidly to a bot for 40 min. Could be a barrier (distrust) or an enabler (more candid,
   no feeling judged, done from the ute). **Test with 3–4 real locals before scaling.**
3. **Phase-2 analysis skill** (`skills/`, to build): transcript → pain points → tool research →
   draft report, with a **Saraev-style eval gate** before a human sees it (right-sized for the
   business? cost proportionate? setup genuinely <1hr? addresses the stated pain?). This is the
   "Salesforce-for-a-4-person-landscaper" check, automated.
4. **Impartiality vs reselling.** The moment we resell what we prescribe, the audit stops being
   impartial — and impartiality is what we charge for. Guardrail to design: disclose the commercial
   relationship in the report; only prescribe GHL where genuinely right; keep ≥2 recs per audit that
   make us nothing.
5. **ACL guarantee terms.** The refund promise is the core of the offer — needs proper Australian
   Consumer Law wording. ~10 min with a template.
6. **Grab `audittemplate.ai`** — Corey's open-source blank, for reference before rebuilding the report.

## Suggested next-session order

1. Rebuild the report template in RD brand (fastest visible win; clarifies exactly what the
   discovery must extract).
2. Build + stress-test the GHL voice agent against the script.
3. Build the phase-2 analysis skill with the eval gate.
4. Run 3–4 free/discounted Sweeps on real locals → validate market acceptance + generate case studies.
5. Draft ACL terms + the impartiality guardrail before charging money.

## Source material

- Full research: `01-BRAIN/research/ai-audit/20260722/` — Corey Gannon × Greg Isenberg transcript
  (the offer walkthrough this is all built from). A 2nd video (Corey on Koerner Office, not saved)
  confirmed the voice-agent discovery method and that he uses a GHL voice agent for it.
- Companion files in this folder: `offering-brief.md`, `discovery-script.md`.
