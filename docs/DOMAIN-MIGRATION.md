# Domain migration — .com → .com.au

**Decision:** the single canonical production domain is
**`https://dramandahenderson.com.au`**. The `.com` domain stays registered and
functional but exists **only** as a permanent redirect to the matching
`.com.au` path. This is a deliberate reversal of the earlier "keep .com"
consolidation: for an Australian GP serving a local catchment, `.com.au` gives
the clearest signal of Australian legitimacy and local trust.

Treat this as a **domain migration**, not a string change: every old `.com` URL
must map 1:1 to its `.com.au` equivalent, permanently, and every canonical
signal (canonical tags, sitemap, structured data, internal links) must agree
with those redirects.

## What the code controls (done in this repo)

The whole site derives its canonical identity from **one constant**,
`site.url` in `lib/site.ts`. Changing it to `https://dramandahenderson.com.au`
atomically updates:

- `<link rel="canonical">` on every page (via `metadataBase` + per-page
  `alternates.canonical`)
- Open Graph `og:url` and Twitter card URLs
- All JSON-LD `@id`s and `url`s — Person, Physician, MedicalClinic, WebSite,
  WebPage/AboutPage/ContactPage/CollectionPage, Article, BreadcrumbList, RACGP
- `sitemap.xml` (all entries)
- `robots.txt` `Sitemap:` and `Host:` lines
- `llms.txt` / `llms-full.txt`

The SEO checker's origin (`scripts/check-seo.mjs` → `ORIGIN`) is updated to
match, so `npm run check:seo` verifies every prerendered page against the
`.com.au` origin.

Internal navigation uses **relative** paths (`/about`, `/womens-health`, …), so
internal links never point at an absolute `.com` URL and never require a
redirect. The path redirects in `next.config.mjs` (Squarespace legacy slugs)
are host-agnostic and unaffected.

## What Vercel controls (you must do this — not in code)

The host-level redirect direction lives in **Vercel domain configuration**, not
the repo. That is why `.com.au` currently redirects *to* `.com` — it was set up
that way during the earlier consolidation. Reverse it:

**Vercel → Project → Settings → Domains**

1. Add `dramandahenderson.com.au` if not present, and set it as the
   **primary** domain (it should serve 200, no redirect).
2. On `www.dramandahenderson.com.au` choose **Redirect to →
   `dramandahenderson.com.au`**.
3. On `dramandahenderson.com` choose **Redirect to →
   `dramandahenderson.com.au`**.
4. On `www.dramandahenderson.com` choose **Redirect to →
   `dramandahenderson.com.au`**.

Vercel issues a single-hop **308** (permanent, path-preserving) for each
redirect and provisions HTTPS automatically. Path-preserving means
`.com/womens-health` → `.com.au/womens-health`, not a dump onto the homepage.

### DNS

`dramandahenderson.com.au` (and its `www`) must have DNS pointing at Vercel
(apex A/ALIAS record + `www` CNAME to `cname.vercel-dns.com`) so Vercel can
validate the domain and issue SSL. As of the pre-migration audit,
`https://www.dramandahenderson.com.au` returned an SSL error — confirm both the
apex and `www` on `.com.au` show a valid certificate in Vercel after
configuring them. Leave MX / SPF / DKIM / TXT records untouched.

## Google Search Console (you must do this)

1. **Create/verify a `dramandahenderson.com.au` property.** A **Domain
   property** (DNS TXT) is best — it covers apex + www + http/https in one.
2. **Keep the `.com` Search Console property.** Do not delete it — you need it
   to run the Change of Address tool and to watch the old URLs de-index.
3. **Submit the `.com.au` sitemap:** `https://dramandahenderson.com.au/sitemap.xml`.
4. **Use the Change of Address tool** in the **`.com` property**
   (Settings → Change of address) to tell Google the site moved to `.com.au`.
   It requires the site-wide 301/308 redirects (step above) to be live first.
5. Optionally use URL Inspection → Request indexing on a few key `.com.au`
   pages (home, About, the four pillars) to speed re-crawl.

## Migration-safety notes

- The `.com` had only recently been made canonical and the site is young, so
  accumulated authority/backlinks are minimal — this is the right time to move.
- Redirects are permanent and path-preserving, canonicals/ sitemap/ structured
  data all agree with them, so Google sees one winner, not two competing
  versions.
- **Keep the `.com` redirects indefinitely.** Never remove them.

## Deploying after a GitHub repo transfer (gotcha)

When the repository was transferred to a new GitHub org, the Vercel Git
integration stopped receiving webhooks, so merges to `main` silently stopped
deploying. After reconnecting the integration in **Vercel → Settings → Git**
(and authorising the Vercel GitHub App on the new org), note that **"Redeploy"
rebuilds an *existing* deployment's commit** - it does **not** pick up merges
that landed while the integration was disconnected. To ship the current `main`,
trigger a **fresh build of the latest commit** (push a new commit to `main`, or
use Vercel's "Deploy" against the production branch). A reset cache `age` (0) on
the live domain confirms a new build promoted; verify the canonical then reads
`https://dramandahenderson.com.au`.
