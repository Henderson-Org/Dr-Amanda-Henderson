# Dr Amanda Henderson — website

Modern, code-based website for **Dr Amanda Henderson**, a female family GP in
Maroubra, Sydney. Migrated from Squarespace with careful SEO preservation.

Positioning centres on women's health, pregnancy & pre-pregnancy care, shared
antenatal care, children's health, family medicine and preventative health.
Skin cancer checks and cosmetic procedures have been intentionally removed from
the practice's positioning.

## Domain & SEO

The canonical production domain is **https://dramandahenderson.com.au**. The old
`.com` domain is kept only as a permanent redirect to the matching `.com.au`
path (configured in Vercel domain settings). Full migration runbook and Google
Search Console steps: [`docs/DOMAIN-MIGRATION.md`](docs/DOMAIN-MIGRATION.md).

Two guards keep this from regressing:

- `npm run check:seo` (build-time) — fails the build if any built output
  (canonicals, OG, JSON-LD, sitemap, robots, internal links) references the
  retired `.com` domain, plus the usual metadata/JSON-LD checks.
- `npm run check:redirects` (live) — asserts every old `.com` URL permanently
  redirects to the exact `.com.au` path (one hop, never 200) and that `.com.au`
  serves 200 with a self-referencing canonical.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** — static generation, minimal client JS
- **Tailwind CSS** — warm editorial design system (no clinical blue)
- **MDX** articles (`content/articles/`) + typed content model (`lib/site.ts`)
- Structured data (schema.org JSON-LD) in `lib/schema.ts`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm start        # serve the production build
```

## Where things live

| Area | Path |
|---|---|
| Practice details, nav, service pillars, copy | `lib/site.ts` |
| Structured data (Physician / MedicalClinic / Article / Breadcrumb / FAQ) | `lib/schema.ts` |
| Articles (editable, frontmatter + Markdown) | `content/articles/*.mdx` |
| Article loader | `lib/articles.ts` |
| Pages | `app/**/page.tsx` |
| 301 redirect map (Squarespace → new) | `next.config.mjs` |
| Sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |

## Editing content

- **Practice info, pillar copy, FAQs, credentials:** edit `lib/site.ts`.
- **Articles:** add/edit `content/articles/<slug>.mdx` (frontmatter: `title`,
  `description`, `category`, `datePublished`, `dateModified`, `draft`). Set
  `draft: true` to hide from the site and sitemap.
- **Booking / phone / address:** single source of truth in `lib/site.ts`.

## Before launch

See **`MIGRATION-PLAN.md` §15** and **`MIGRATION-QA.md`**. Key blockers:
real photography of Dr Henderson, migrating original images off the Squarespace
CDN, Search Console + analytics IDs, and confirmed opening hours.

## Docs

- [`MIGRATION-PLAN.md`](./MIGRATION-PLAN.md) — audit, URL map, architecture, retirement strategy.
- [`MIGRATION-QA.md`](./MIGRATION-QA.md) — pre-launch QA checklist and launch plan.
