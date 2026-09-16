# Entity, structured-data & LLM-readability layer

> _Note (2026-09): the canonical production domain is now
> **dramandahenderson.com.au** (the entity `@id`s and URLs use it). Any ".com"
> below is historical. See [DOMAIN-MIGRATION.md](DOMAIN-MIGRATION.md)._

How dramandahenderson.com makes the core entity — **Dr Amanda Henderson, female
family GP, Maroubra** — machine-readable for search engines and answer engines
(ChatGPT, Google AI Overviews/Gemini, Claude, Perplexity), while keeping strong
conventional SEO.

> All facts below are drawn only from the existing site. Nothing about
> qualifications, memberships, services, affiliations or address is invented.

---

## 1. Audit — what already existed vs. what was added

| Area | Before | Action |
|---|---|---|
| Server/static rendering | ✅ All pages static (SSG) — content in rendered HTML, no client-only gating | kept |
| Semantic HTML / one H1 per page | ✅ header/main/nav/footer/article/section; single H1 | kept (verified) |
| Canonical tags | ✅ per page, non-www apex | kept |
| robots.txt / sitemap.xml | ✅ dynamic route handlers; AI-friendly | kept |
| OpenGraph/Twitter | ✅ site default + pillar/article; ⚠ home/about/contact/articles lacked unique OG | **added unique OG** to home, about, contact, articles |
| Entity JSON-LD (Person/Physician/Clinic/WebSite) | ✅ linked graph with stable @id (added earlier) | kept |
| Article schema + author | ✅ Article with Person author/reviewedBy | kept; **visible byline now "… , FRACGP"** |
| WebPage/AboutPage/ContactPage/CollectionPage | ❌ missing | **added** via reusable `webPageSchema()` |
| BreadcrumbList @id (referenceable) | ⚠ present but not @id-addressable | **added @id**, referenced from WebPage nodes |
| About "fact block" for entity extraction | ❌ | **added** at-a-glance facts + entity FAQ (FAQPage) |
| llms.txt / llms-full.txt | ❌ | **added** (generated from content) |
| Image alt text | ✅ portrait & pillar images have alt | kept |
| Duplicate URLs / redirects | ✅ 301 map; `/services`→`/`; canonical single host | kept |

## 2. Schema entities now present

Site-wide graph (emitted once in `app/layout.tsx`, so it appears on every page):

- **Person** `…/#amanda` — the human, Dr Amanda Henderson (article author)
- **Physician** `…/#physician` — the doctor as a medical provider / local entity
- **MedicalClinic** `…/#clinic` — GP Maroubra, the practice location
- **WebSite** `…/#website`
- **MedicalOrganization** `…/#racgp` — the RACGP (referenced by credentials/memberOf)

Per-page nodes (reference the above by `@id`):

- **WebPage** (home), **AboutPage** (+**FAQPage**), **ContactPage**,
  **CollectionPage** + **Blog**/**BlogPosting** (articles index),
  **MedicalWebPage** + **FAQPage** (clinical pillar pages, and Fees),
  **Article** (each article), **BreadcrumbList** (every deep page).

## 3. Entity relationships (stable @id graph)

```
Person (#amanda) ──worksFor──▶ MedicalClinic (#clinic)
Person (#amanda) ──memberOf──▶ MedicalOrganization (#racgp)
Person (#amanda) ──hasCredential──▶ MBBS, FRACGP

Physician (#physician) ──memberOf──▶ MedicalClinic (#clinic) & RACGP (#racgp)
Physician (#physician) ──availableService──▶ [the 4 clinical areas]
Physician (#physician) ──potentialAction──▶ ReserveAction (HotDoc booking)

MedicalClinic (#clinic) ──employee──▶ Person (#amanda)

WebSite (#website) ──publisher/about──▶ Physician (#physician)

Article ──author / reviewedBy──▶ Person (#amanda)
Article ──publisher──▶ Physician (#physician, has logo)
Article ──isPartOf──▶ WebSite (#website)

WebPage/AboutPage/ContactPage ──isPartOf──▶ WebSite ; ──about──▶ Person or Physician/Clinic
                              ──breadcrumb──▶ BreadcrumbList (@id)
```

Person and Physician describe the same doctor (human vs. provider); they share
identical name, image and address and both attach to the same clinic, so they
resolve to one entity without asserting any unverified ownership/employment.

## 4. Remaining weaknesses for LLM discoverability

- **Single `sameAs`.** Only the HotDoc profile is linked (verified). Adding
  verified Google Business Profile / AHPRA-register / HealthShare URLs would
  strengthen entity reconciliation — add them to `sameAs` once confirmed.
- **No `geo` coordinates / `openingHoursSpecification`** on the clinic — omitted
  deliberately (not on the current site). Add lat/long and confirmed hours when
  available for stronger local signals.
- **No privacy policy page** (compliance audit P1) — unrelated to schema but a
  gap in site completeness.
- **`llms.txt` is experimental** — support is not universal; it supplements, and
  does not replace, the crawlable HTML/JSON-LD (which is the real signal).
- **Facts to verify** (compliance A3): FRACGP currency, Royal Hospital for Women
  shared-care registration, and article authorship — assumed true per the site.

## 5. Where to edit when Amanda's details change

Content is separated from presentation — change facts in **one place**:

| To change… | Edit |
|---|---|
| Name, title, phone, address, booking URL, nav, areas served | `lib/site.ts` (`site`, `practice`, `nav`, `nearbyAreas`) |
| Qualifications / credentials wording | `lib/site.ts` (`qualifications`, `credentials`) **and** the About page's Qualifications list + `hasCredential` in `lib/schema.ts` |
| Clinical areas / service pages (title, summary, FAQs, `knowsAbout`) | `lib/site.ts` (`serviceAreas`) — flows into schema, nav, llms files |
| Any JSON-LD node (Person/Physician/Clinic/Article/WebPage/FAQ) | `lib/schema.ts` (single source for all generators + `@id`s) |
| About "at a glance" facts / entity FAQ | `app/about/page.tsx` (`factRows`, `aboutFaqs`) |
| Article author byline / attribution | `app/articles/[slug]/page.tsx` (byline) + `articleSchema()` in `lib/schema.ts` |
| Per-page titles / descriptions / OG | each route's `metadata` export (`app/**/page.tsx`) |
| llms.txt / llms-full.txt | `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` (auto-generate from `lib/site.ts` + articles) |
| Articles themselves | `content/articles/*.mdx` (frontmatter: title, description, category, dates) |

**Automated validation:** `npm run check:seo` (or `npm run verify` to build +
check) parses the JSON-LD in every prerendered page and **fails the build** on
malformed JSON, unresolved `@id` references, conflicting duplicate `@id`s,
missing core entities, an Article whose author isn't the Person, or metadata
problems (missing/duplicate title, missing description, ≠1 `<h1>`, wrong/absent
canonical, missing `og:title`/`og:image`, missing `lang="en-AU"`). Run it in CI
or before every deploy. For a final human check, also paste key URLs into
Google's Rich Results Test / the Schema.org validator.
