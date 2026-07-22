# Lightweight Client CMS — Design Spec

> Status: **approved design, pre-implementation.** Brainstormed 2026-07-23.
> A lightweight, self-serve content editor for RD's vanilla-HTML client sites. V1 proves the
> pattern on Illumorama; the pattern then applies to PG-Tattoos, Crouchy, and the pipeline.

---

## Purpose

RD builds custom vanilla HTML/CSS/JS client sites (Paper-exported, hosted on Vercel). Clients
need to edit their own content — text, images, and simple collections — without touching code,
without RD logins, and without RD becoming "the website guy" for every copy tweak. This is the
"edit but don't destroy the kingdom" problem, solved lean.

Adapted from Jack's Claude-CMS video, but deliberately **stripped of its expensive parts**
(no AI editing, no MongoDB, no multi-tenant dashboard) to fit RD's constraints.

## Constraints (hard)

- **Subscription-only. No metered inference.** Jack's AI-editing runs on OpenRouter (per-edit
  API cost) — explicitly rejected. Fields, not AI. (See the OpenHuman kill + SDK-billing caution.)
- **Targets static vanilla HTML sites** (not frameworks). Only RD's own site is Next.js; client
  sites are vanilla HTML/CSS/JS.
- **SEO-critical.** These are marketing sites; editable content must live in the HTML *source*,
  not be injected client-side.
- **On existing stack** (git + Vercel + Vercel Blob). No new vendors.

## Goals / Non-goals

**V1 goals:** a client self-serve editor for a single site (Illumorama) covering editable text,
images, and an SEO block; publish → live in ~30s; free rollback.

**V1 non-goals (deliberate defers, most → V2):** AI/natural-language editing; live preview;
multi-tenant master dashboard; user accounts (one password per site instead); proven collections
(designed now, proven on PG-Tattoos); image CDN/transforms (light downscale only); concurrent-edit
locking; any structural/layout editing (content only — clients cannot move or restyle sections).

---

## Architecture

**Topology: per-site.** Each client site ships its own password-gated editor that edits only its
own content. No central anything. A site's content is data in *that site's* repo; rollback is
*that repo's* git history. (The central multi-tenant dashboard is a V2 convenience for RD, built
when juggling many sites becomes real pain — not before.)

**Source of truth: `content.json`** in the site's repo. Nested by section:

```json
{
  "seo":    { "title": "...", "description": "...", "ogImage": "..." },
  "hero":   { "headline": "...", "sub": "...", "image": "..." },
  "signup": { "buttonText": "...", "successMsg": "..." }
}
```

**Rendering: build-step injection (SEO-strong).** A small Node build script (~20 lines) runs on
Vercel deploy, walks every `[data-cms]` element in the HTML, and injects the matching `content.json`
value — so content lives in the HTML source for crawlers, no flash of empty content. `content.json`
is the *only* source of truth; the build reconciles the HTML from it every deploy.

**Editable-region convention: `data-cms` attributes** declared in the markup itself:

```html
<h1 data-cms="hero.headline">Light up your world</h1>
<img data-cms-src="hero.image" src="assets/hero.jpg">
```

The markup declares what's editable — no separate schema file in V1. This is the pattern being
proven; it's what later generalizes into a reusable engine (V2).

**Collections** (testimonials, work, photos): `data-cms-list="testimonials"` on a container with a
template child the build clones per array item in `content.json`. Designed now; **genuinely proven
on PG-Tattoos (V1.5)**, which actually has a work gallery + testimonials. Illumorama is a simple
landing page and will not exercise collections.

---

## The editor (`/admin`)

- **Location:** a password-gated `/admin` page on the site (static HTML, like the rest).
- **Auth model — the real boundary is on publish.** The editor page is harmless to view. On
  publish, the editor POSTs content + password to `/api/publish`, which **verifies the password
  server-side** (against a hashed env var) before it commits anything. Someone who finds `/admin`
  can fiddle fields in their browser but **cannot publish** without the secret. No login system, no
  accounts — one password per site.
- **Form:** auto-rendered from `content.json` — one field per value, grouped by section, labels
  humanized from keys. Strings → text inputs; long copy → textareas; image fields → upload widget;
  collections → list with add/remove item buttons. Generated from the data, so no bespoke form per
  site.
- **Actions:** two buttons — **Publish** (commits + redeploys), and nothing else. After publish:
  "Publishing — live in ~30s" + link to the site.
- **No live preview in V1** (deliberate defer). The edit → publish → see-it-in-30s loop is enough.

---

## Publish pipeline

1. Client hits Publish → editor POSTs new `content.json` + password to `/api/publish`.
2. Function verifies password (hashed env var), fetches current `content.json` SHA, and commits the
   new `content.json` to the site's repo via the **GitHub API**, using a **fine-grained token scoped
   to only that one repo** (contents write, nothing else).
3. The push triggers Vercel's auto-deploy → build-step injects content → live in ~30s.

- **Token safety:** GitHub token is a **Vercel env var**, server-side only, never shipped to the
  browser. Per-repo scope → leak blast radius is one client's content.
- **Rollback (free, manual in V1):** *Vercel "promote previous deployment"* — one-click, instant, no
  rebuild (the fast path for the support-as-value play: client mangles content → RD promotes prior
  deploy → fixed in seconds). Or `git revert` the content.json commit for a clean history.
- **Every publish is a commit** → version history is automatic; no snapshot system to build.
- **Concurrency:** one editor per site (the client) → collisions are a non-issue; no locking built.

---

## Images

- Client uploads → editor sends to `/api/upload` (same server-side password check) → stored in
  **Vercel Blob** (free tier ~1GB) → returns a URL → URL goes in `content.json`; `<img data-cms-src>`
  renders it. **Binaries never touch git** — the repo only commits text (URLs), keeping it lean and
  `git revert` fast.
- **Light client-side downscale before upload** (~15 lines canvas: cap ~2000px wide, re-encode) —
  cheap insurance so client 5MB phone photos don't ship as heroes and tank the SEO/perf we care
  about. Full optimization (WebP, responsive srcsets) is V2.

---

## Rollout

- **V1 — Illumorama** (`04-DEV/illumorama/landing-page/`): static `index.html` (777 lines), own git
  repo, existing `api/signup.js` serverless pattern, Vercel-hosted. Proves: single fields + images +
  SEO block + publish + rollback + auth. **Bootstrap:** a one-time script extracts current copy from
  `index.html` into the first `content.json` (no hand-transcribing).
- **V1.5 — PG-Tattoos:** proves collections (work gallery, testimonials) against a real site.
- **V2 (deferred):** reusable schema-driven editor engine (extract the pattern once it's felt across
  2–3 sites), central multi-tenant dashboard, live preview, AI editing (only when revenue can absorb/
  forward API cost), image transforms.

## Success criteria (V1)

1. A non-technical client can change Illumorama's hero copy and an image via `/admin`, publish, and
   see it live within ~1 minute, without any RD involvement.
2. RD can revert a bad client edit in seconds (Vercel promote) or cleanly (git revert).
3. No binaries in the repo; no metered/API cost per edit; content is present in the HTML source
   (SEO check).
4. The `data-cms` + `content.json` + build-step pattern is clean enough to reapply to PG-Tattoos
   with only per-site wiring, no engine rewrite.

## Open items / risks

- **Crouchy-not-indexing** is a *separate* SEO/indexing issue (sitemap/GSC/crawl), not solved by this
  CMS — parked for a 15-min diagnostic later.
- Bootstrap extraction from `index.html` is a one-off script; its robustness only needs to cover
  Illumorama's markup, not be general.
- The build step is new to Illumorama (currently no build) — a Vercel build command must be added.

## Related

- Video source: Jack's Claude-CMS walkthrough (`Q_K3k_ge8NA`, watched 2026-07-23; not saved).
- RD context: `docs/redacted-digital-site-design.md`; design workflow (Paper → code).
