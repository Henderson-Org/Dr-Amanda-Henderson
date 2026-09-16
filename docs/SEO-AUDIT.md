# SEO audit — dramandahenderson.com

> _Superseded note (2026-09): the canonical production domain is now
> **dramandahenderson.com.au**, with **.com** permanently redirecting to it.
> This audit predates that move. Current source of truth:
> [DOMAIN-MIGRATION.md](DOMAIN-MIGRATION.md)._

**Date:** 2026-08-08 · **Method:** automated crawl of the production build (all
40 sitemap URLs + noindex/utility pages), checking titles, meta descriptions,
canonicals, headings, Open Graph, structured data, images/alt, word counts,
internal links, redirects, robots and performance.

## Verdict

The site is in strong technical-SEO shape: fully static/SSR (all content in
rendered HTML), one `<h1>` per page, correct self-referential non-www
canonicals everywhere, valid linked structured data, complete sitemap,
AI-friendly robots, single-hop 301s, a custom 404, 0 images missing alt text,
healthy word counts and internal linking, and low client JS (~106 kB First Load,
self-hosted fonts, responsive WebP). Two real defects were found **and fixed**;
the rest are lower-priority recommendations.

---

## Fixed in this pass

### 1. Duplicated brand in `<title>` (was: HIGH)
Pages whose title already contained the brand were getting a second
"| Dr Amanda Henderson" appended by the root layout's title template, e.g.
`Women's Health GP in Maroubra | Dr Amanda Henderson | Dr Amanda Henderson`.
Affected the four pillar pages, About, Contact, Fees, Articles index, editorial
policy and the appointment tool.
**Fix:** those pages now use `title.absolute` to bypass the template (articles
and the homepage were already correct). All titles now carry a single suffix.

### 2. Missing `og:image` (was: MEDIUM)
Pages that set their own `openGraph` (home, About, Contact, Articles, pillars,
tool, editorial) lost the inherited `og:image`, so Facebook/LinkedIn link
previews had no image (Twitter/X still did via `twitter:image`).
**Fix:** each page's `openGraph` now includes an image — `og-amanda.jpg`
sitewide, and each **article uses its category photo** as the share image.

### 3. Over-long meta descriptions (was: LOW)
Home (193), About (203), Contact (173) and editorial (189) exceeded the ~155–160
char SERP display limit and were trimmed.

---

## Healthy — no action needed

- **Titles/descriptions:** unique per page; descriptive, not keyword-stuffed.
- **Canonicals:** present and correct on every page; single non-www host.
- **Headings:** exactly one `<h1>` per page; logical `<h2>` structure (articles 12–16 sections each).
- **Structured data:** Person/Physician/MedicalClinic/WebSite/RACGP graph sitewide, plus WebPage/AboutPage/ContactPage/CollectionPage/MedicalWebPage/Article/FAQ/Breadcrumb per page — all `@id`s resolve.
- **Redirects:** `/services`→`/`, `/womenshealth`→`/womens-health`, `/paediatrics`→`/childrens-health`, `/amanda-henderson-articles*`→`/articles*`, `/book`→`/contact` all **301**; `/cart` and unknown paths **404** with a custom page.
- **Sitemap/robots:** sitemap lists all indexable URLs (Fees correctly excluded, it's noindex); robots welcomes search + AI crawlers and points to the sitemap.
- **Images:** 0 missing alt; responsive WebP with width/height (no CLS).
- **Content depth:** articles 970–2,460 words; pillars 800+; no thin indexable pages.
- **Internal linking:** strong (hubs ↔ articles ↔ About ↔ tool), descriptive anchors.
- **Performance:** static export, ~106 kB First Load JS, self-hosted fonts, `next/script` for GA4 — good Core Web Vitals headroom.
- **Mobile:** responsive throughout; sticky mobile book bar.

---

## Recommendations (not auto-applied)

**Higher value**
1. **Add a privacy policy page** (compliance audit P1) — now important because GA4 is live; it should disclose analytics/cookies. *(Content decision needed.)*
2. **GA4 for a health site:** consider `allow_google_signals:false` + `allow_ad_personalization_signals:false` (so health-page browsing isn't used for ad targeting) and/or a cookie-consent banner.
3. **Google Search Console:** verify the domain, submit `sitemap.xml`, and monitor coverage, queries and Core Web Vitals field data post-launch.
4. **Verified `sameAs` profiles:** add Google Business Profile (and any AHPRA/HealthShare) URLs to the Person/Physician schema once confirmed — strengthens the entity and local pack.
5. **Local signals:** add confirmed `openingHoursSpecification` and `geo` coordinates to the MedicalClinic schema when available.

**Lower value / polish**
6. **Long article `<title>`s** (up to ~98 chars) get truncated in SERPs. Optional: add a shorter SEO title in article frontmatter for the longest ones (visible H1 can stay long). Not a ranking problem, just display.
7. **A few article meta descriptions** run slightly long (168–171 chars) — trim in frontmatter if desired.
8. **`dateModified`** currently equals `datePublished` on articles; bump it when content is genuinely reviewed so "Last reviewed" shows and freshness signals update.
9. **Dedicated 1200×630 OG art** per section (currently the portrait card / category photos) would make link previews more branded — nice-to-have.

## Where to change things
- Titles/descriptions/OG per page → each route's `metadata` export; pillars via `serviceMetadata()` in `components/ServicePage.tsx`.
- Article SEO fields → `content/articles/*.mdx` frontmatter.
- Structured data → `lib/schema.ts`. Redirects → `next.config.mjs`. Sitemap/robots → `app/sitemap.ts`, `app/robots.ts`.
