# Migration Audit & Architecture Plan

> _Superseded note (2026-09): the canonical production domain is now
> **dramandahenderson.com.au**, with **.com** permanently redirecting to it.
> Where this plan says to keep ".com as canonical host", read it as historical.
> Current source of truth: [docs/DOMAIN-MIGRATION.md](docs/DOMAIN-MIGRATION.md)._

**Project:** dramandahenderson.com — Squarespace → modern code-based website
**Prepared:** 2026-08-08
**Positioning change:** Skin cancer checks and cosmetic procedures are intentionally removed from the practice's positioning (see §4).

This is the "plan before build" deliverable. The implementation in this repository already follows it; this document records the audit, the decisions, and the launch requirements.

---

## 1. Current site inventory

Audited live at `https://dramandahenderson.com` (Squarespace). Consistent site‑wide: phone **(02) 9311 9311**, address **14 Meagher Ave, South Maroubra NSW 2035**, practice **GP Maroubra**, booking via **HotDoc**, qualifications **FRACGP, MBBS, MAppIFin, BComm, BBus**, shared care with the **Royal Hospital for Women**.

### Pages (from sitemap.xml + crawl)

| URL | Title | Notes |
|---|---|---|
| `/` | Dr Amanda Henderson \| Family GP, Maroubra Sydney | Homepage — long, services‑first (8 equal service blocks incl. skin/cosmetic) |
| `/services` | *(identical to homepage)* | **Duplicate of `/`** (priority 1.0 in sitemap) |
| `/pregnancy-care` | Pregnancy Care — … | Pre‑pregnancy / pregnancy / post‑partum resource links |
| `/womenshealth` | Women's Health — … | Contraception, endometriosis, PCOS, pap smears, breast screening |
| `/paediatrics` | Paediatrics — … | Feeding, eczema, immunisation, ADHD |
| `/contact` | Contact — … | Address, phone, after‑hours, 000 |
| `/amanda-henderson-articles` | Health Articles — … | Blog index |
| `/amanda-henderson-articles/<slug>` ×29 | — | 29 individual articles (lastmod 2026‑06‑24) |
| `/cart` | — | Squarespace commerce stub (no real product) |

### Technical baseline
- **robots.txt:** Squarespace default. Notably **blocks most AI crawlers** (GPTBot, ClaudeBot, Google‑Extended, PerplexityBot‑adjacent, etc.) and Squarespace `/config`, `/search`, query‑param variants. Sitemap referenced correctly.
- **Structured data:** none meaningful detected (no Physician/MedicalClinic/Article JSON‑LD).
- **Meta descriptions:** not reliably present.
- **Canonical/host:** single host resolves; HTTPS in place.
- **Images:** served from Squarespace CDN (must be migrated before decommission — see §15).

---

## 2. Existing SEO strengths worth preserving

1. **Domain & brand.** `dramandahenderson.com` with an established, on‑topic brand ("Dr Amanda Henderson", "Family GP Maroubra"). **Keep the domain** (platform migration only).
2. **A genuinely good article library (29 pieces).** Well‑targeted, non‑spammy, locally relevant, freshly dated. This is the single biggest SEO asset and is migrated 1:1 (content preserved).
3. **Clear NAP consistency** (name/address/phone) and a working HotDoc booking path — preserved verbatim.
4. **Strong topical relevance** to women's health, pregnancy/shared care, paediatrics, and eastern‑suburbs local intent — all retained and strengthened.
5. **Homepage title** ("Dr Amanda Henderson | Family GP, Maroubra Sydney") is good — **kept unchanged**.

## 3. Existing weaknesses / opportunities

- **Homepage is services‑first**, not Amanda‑first — 8 equal blocks before any sense of who she is. → Rebuilt around Amanda, positioning, and one clear Book CTA.
- **Duplicate content:** `/` and `/services` are the same page. → Consolidated (`/services` → `/` 301).
- **No structured data** → Physician/MedicalClinic/Article/Breadcrumb/FAQ JSON‑LD added with stable `@id`s.
- **Missing meta descriptions** → authored for every page.
- **AI crawlers blocked** in robots.txt → new robots welcomes answer engines (the brief explicitly wants LLM/AEO visibility).
- **Off‑strategy positioning** (skin cancer + cosmetic) prominent on homepage/services → removed (§4).
- **Inconsistent slugs** (`/womenshealth` vs `/pregnancy-care`) → standardised with 301s.
- **Thin pillar pages** (mostly link lists) → rebuilt as substantial, human, answer‑engine‑friendly pages.

---

## 4. Skin cancer / cosmetic content to retire

**Finding:** there is **no standalone skin‑cancer or cosmetic URL**. The content exists only as **one H2 section on the homepage/`/services` page** and in a couple of article intros.

Verbatim source (homepage/services):
> **Skin checks and cosmetic medicine** — "I offer full body skin checks, biopsies of suspicious lesions, and excision of skin cancers — with a focus on excellent cosmetic results. I also treat acne, psoriasis, eczema and other chronic skin conditions, and am trained in anti‑wrinkle injections for patients seeking cosmetic medicine in Maroubra." Plus "Professional Certificate in Skin Cancer Medicine".

Items removed from the new site:
- Homepage/services "Skin checks and cosmetic medicine" block — **not recreated**.
- "Full body skin checks / biopsies / excision of skin cancers", "anti‑wrinkle injections", "cosmetic medicine", "cosmetic results".
- "Professional Certificate in Skin Cancer Medicine" from the credentials/qualifications.
- Any homepage trust‑strip or nav reference — none created.

**Kept (legitimate general practice, not cosmetic/skin‑cancer):** acne, eczema and psoriasis as medical conditions. The three articles on acne / childhood eczema / eczema‑psoriasis are retained as ordinary GP education; any promotional skin‑cancer‑check or cosmetic sentences inside articles were reworded/removed during migration. General sun‑protection education is fine; promoting a skin‑cancer‑check *service* is not.

## 5. Recommended treatment / redirect for each retired item

| Retired item | Where it lived | Treatment | Rationale |
|---|---|---|---|
| Skin checks & cosmetic **section** | Homepage `/` + `/services` | **Remove section.** No URL retired, so **no redirect needed.** The parent URLs (`/`, `/services`) survive with new content. | There is no dedicated skin/cosmetic page to 301. Redirecting unrelated content to fake authority would be misleading (brief §15). |
| Skin cancer certificate | Credentials text | Remove from copy/schema | Off‑strategy; not a URL. |
| Cosmetic/skin‑cancer phrases in articles | ~2–3 article intros | Reword/remove promotional lines; keep medical education | Preserves article SEO without off‑strategy positioning. |

**Net redirect impact of the positioning change: zero broken URLs, zero misleading redirects.** Because the skin/cosmetic material was never a standalone indexed page, retirement is clean.

---

## 6. Proposed sitemap (new site)

```
/
/about
/womens-health
/pregnancy-care
/childrens-health
/general-gp-care
/contact
/articles
/articles/<slug>            (29 articles)
```

Primary nav (humans first): **About · Women's Health · Pregnancy · Children's Health · General GP Care · Articles · Book**. No skin/cosmetic nav item.

## 7. Full old → new URL map

| Old URL | New URL | Action | Status |
|---|---|---|---|
| `/` | `/` | Retain (redesigned, Amanda‑first) | 200 |
| `/services` | `/` | Consolidate (was homepage duplicate) | **301** |
| `/womenshealth` | `/womens-health` | Standardise slug | **301** |
| `/pregnancy-care` | `/pregnancy-care` | Retain (already clean) | 200 |
| `/paediatrics` | `/childrens-health` | Rename to patient‑friendly slug | **301** |
| `/contact` | `/contact` | Retain (rebuilt) | 200 |
| `/amanda-henderson-articles` | `/articles` | Simplify | **301** |
| `/amanda-henderson-articles/<slug>` | `/articles/<slug>` | Simplify (×29, single hop) | **301** |
| `/cart` | *(retire)* | Squarespace stub, no product | 404/410 (no redirect) |
| — | `/about` | **New** cornerstone (E‑E‑A‑T) | 200 |
| — | `/general-gp-care` | **New** pillar (men's health, travel, preventative, lifestyle live here) | 200 |

All redirects are **single‑hop 301s** (implemented in `next.config.mjs`) — no chains. New pillar pages (`/general-gp-care`, `/about`) also serve as sensible topical homes for men's health / travel / preventative content that previously only appeared on the homepage.

---

## 8. Proposed homepage wireframe

```
┌───────────────────────────────────────────────┐
│ Sticky header: logo · nav · [Book]             │
├───────────────────────────────────────────────┤
│ HERO                                           │
│  Eyebrow: Female GP · Maroubra, Sydney         │
│  H1: "A GP who takes the time to listen."      │
│  Supporting copy (Amanda, first person)        │   [ Portrait ]
│  [Book an appointment] [Meet Dr Amanda]        │
│  online via HotDoc · or call (02) 9311 9311    │
├───────────────────────────────────────────────┤
│ TRUST STRIP: FRACGP · Female family GP ·       │
│   RHW shared care · Maroubra   (no skin/cosmetic)│
├───────────────────────────────────────────────┤
│ HOW I CAN HELP  → 4 pillar cards               │
│  Women's Health · Pregnancy · Children · GP    │
├───────────────────────────────────────────────┤
│ WHAT YOU CAN EXPECT (approach)                 │
│  To be heard · Clear explanations · Thorough · │
│  Continuity                                    │
├───────────────────────────────────────────────┤
│ ABOUT AMANDA (short, warm, photo)              │
├───────────────────────────────────────────────┤
│ READING ROOM (3 featured articles)             │
├───────────────────────────────────────────────┤
│ PRACTICE / LOCATION (NAP + directions + 000)   │
├───────────────────────────────────────────────┤
│ FINAL BOOKING CTA band                         │
└───────────────────────────────────────────────┘
Mobile: restrained sticky [Call] [Book] bar.
```

Passes the §39 success test: female family GP in Maroubra (≤5s), interests in women's/pregnancy/children/family (≤15s), warm/thorough/approachable tone (≤30s), Book always visible.

## 9. Proposed technical stack

- **Next.js 15 (App Router) + React 19 + TypeScript** — static generation / server components; minimal client JS (one small client component for the mobile menu). Chosen for excellent SEO, static output, structured‑data control, easy deploy — not novelty.
- **Tailwind CSS** design system (warm editorial tokens, no clinical blue).
- **Content:** MDX articles (`content/articles/*.mdx`, gray‑matter frontmatter, rendered with `marked`) + a typed content model (`lib/site.ts`) for practice details, pillars, FAQs.
- **SEO plumbing:** native Next metadata API, `app/sitemap.ts`, `app/robots.ts`, JSON‑LD via `lib/schema.ts`.
- **Fonts:** self‑hosted via `next/font` (Fraunces display + Inter body) — no runtime request, no layout shift.
- **Deploy target:** any static/SSR host with CDN (e.g. Vercel/Netlify/Cloudflare). Keep `dramandahenderson.com` as canonical host.

## 10. Proposed content model

- `lib/site.ts` — practice NAP, booking URL, nav, qualifications/credentials, the four **service pillars** (each: intro, "what I help with", "when to see a GP", "what a consult involves", FAQs, related links, meta, `knowsAbout`), "what to expect", nearby areas.
- `content/articles/<slug>.mdx` — frontmatter `title, description, category, datePublished, dateModified, draft`; body in Markdown. Editable without touching code; portable to a lightweight CMS later.
- Presentation is fully separated from content (thin route files call shared renderers).

## 11. Structured‑data strategy (schema.org JSON‑LD)

Stable `@id` graph so engines/LLMs treat Amanda as one entity across pages:
- **Physician + Person** (`/#physician`): name, image, description, jobTitle, `medicalSpecialty` (PrimaryCare/Gynecologic/Pediatric), `knowsAbout` (aggregated pillar interests — **no** skin‑cancer/cosmetic), address, telephone, `memberOf` RACGP, `worksFor` clinic.
- **MedicalClinic** (`/#clinic`): GP Maroubra NAP, `areaServed`, `employee` → physician.
- **WebSite** (`/#website`).
- **BreadcrumbList** on every deep page.
- **MedicalWebPage** on pillar pages + **FAQPage** where real FAQs exist.
- **MedicalWebPage/Article** per article: headline, datePublished, dateModified, author = Physician, reviewedBy, publisher, mainEntityOfPage.
- **Blog / BlogPosting** on the articles index.

No invented ratings, reviews, awards, or specialties. No skin/cosmetic attributes retained.

## 12. SEO migration strategy

- Preserve homepage title; author meta descriptions for all pages; canonical URLs everywhere; single canonical host; `trailingSlash: false` (consistent).
- 301 map per §7 (single hop, in `next.config.mjs`); retired `/cart` returns 404.
- XML sitemap lists only live, indexable URLs (no retired/skin URLs); `robots.txt` points to it.
- Semantic HTML, one H1 per page, correct heading order, descriptive links, alt text.
- Security headers; HTTPS enforced at host.
- Prevent staging indexing: only production sets `index:true` (guard staging with `X-Robots-Tag: noindex` / password at the host — see launch checklist).

## 13. AI / AEO (answer‑engine) strategy

- robots.txt **welcomes** answer engines (reversing Squarespace's AI blocks).
- Explicit entity modelling via JSON‑LD `@id` graph (§11) — "Dr Amanda Henderson → GP → GP Maroubra → Maroubra, Sydney; interests: women's health, pregnancy, shared antenatal care, children's health, preventative health, family medicine."
- Pages answer real patient questions directly then expand (What does a shared care GP do? When to see a GP before conceiving? Can a GP help with perimenopause? etc.) — good for humans and LLMs alike.
- Clean, mostly static HTML; fast; no gimmicks, no fake FAQs, no doorway/suburb pages.

## 14. Visual / design direction

Warm, soft, editorial, spacious, premium‑but‑not‑luxurious. Palette: warm cream/sand grounds, deep warm‑ink text, calm **eucalyptus sage** primary + subtle warm **blush** secondary — deliberately **not** clinical blue, and not cosmetic‑clinic/medispa. Editorial serif (Fraunces) for headings + humanist sans (Inter) for body. Whitespace over decorative UI. Real photography of Amanda is the key brand asset (placeholder in place until supplied).

---

## 15. Assets / items to obtain before Squarespace is cancelled

**Migrated (done):**
1. ~~Real photography of Dr Amanda Henderson~~ — **migrated.** Her portrait is downloaded, stored locally and optimised (`/public/images/dr-amanda-henderson-*.webp`, plus `og-amanda.jpg`), and now drives the hero, About page and social card.
2. ~~Original site images~~ — **migrated.** All legitimate images were downloaded off the Squarespace CDN (`scripts/fetch-images.mjs`), archived at full size in `/public/images/_archive/`, and re‑encoded to responsive WebP. The retired skin/cosmetic image is archived only (not used). *Note: the eight non‑portrait images were Unsplash stock already on the old site; the tasteful, on‑theme ones now support the pillar pages, the rest are archived.*

**Still to obtain (optional uplift):**
- Additional real photography of Amanda / the practice / place (currently one genuine portrait); more would let us reduce reliance on stock.
3. **Google Search Console** access/verification + export of indexed pages, top queries, clicks/impressions, and any existing manual redirects — to confirm no high‑value URL is missed and to monitor post‑launch. (Not available in this environment; assumed handled at DNS/host.)
4. **Google Analytics / existing analytics + conversion tracking** IDs (book/phone/directions events are already wired as `data-cta` attributes ready to bind).
5. **Confirmed practice opening hours** (not published on the old site) — to complete `MedicalClinic` `openingHours` and the contact page.
6. **Verified `sameAs` profiles** (HotDoc, Google Business Profile, AHPRA, HealthShare) — only add verified URLs to schema.
7. **Confirmation of after‑hours provider number** (old site listed "1300 HOME GP / 8724 6300").

**Non‑blocking / recommended:** favicon/OG art from brand photography; opening‑hours structured data; Google Business Profile NAP consistency check.

---

## Homepage success test (§39) — self‑check
- **≤5s:** eyebrow + H1 + trust strip establish *female family GP in Maroubra*. ✅
- **≤15s:** "How I can help" pillars + short about establish women's/pregnancy/children/family focus. ✅
- **≤30s:** first‑person warm copy + "What you can expect" build confidence. ✅
- **Always:** Book CTA in header, hero, sections, footer, and mobile sticky bar. ✅
