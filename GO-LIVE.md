# Go-live runbook — moving dramandahenderson.com off Squarespace

> _Superseded note (2026-09): the canonical production domain is now
> **dramandahenderson.com.au**, with **.com** permanently redirecting to it.
> This runbook predates that move — treat ".com as primary/canonical" below as
> historical. Current source of truth: [docs/DOMAIN-MIGRATION.md](docs/DOMAIN-MIGRATION.md)._

**This is a platform migration, not a domain migration.** You keep the domain
`dramandahenderson.com` and simply point it at the new site (Vercel) instead of
Squarespace. Nothing about the domain's history/authority is lost.

Most of these steps happen in dashboards only you can access (Vercel,
Squarespace, your domain registrar). Work top-to-bottom; **do not cancel
Squarespace until the very end** (see safeguards).

---

## ⚠️ Two things that most often go wrong — read first

1. **Don't cancel Squarespace before the domain is secured.** If the domain is
   *registered through Squarespace* (Squarespace absorbed Google Domains),
   cancelling the site plan can put the domain at risk if it isn't handled
   first. Either keep the domain registration at Squarespace and just repoint
   DNS, or **transfer the domain out first** (transfers take up to ~5–7 days).
   Only cancel the Squarespace **website** plan once the domain is safe and the
   new site is confirmed live.

2. **Preserve your email / verification DNS records.** When you change DNS,
   only change the **website** records (A / CNAME). **Leave the MX, SPF/TXT and
   DKIM records untouched** (or copy them across exactly if you move DNS
   hosting). Wiping these silently breaks email on the domain. If you have no
   email on this domain, skip — but check first.

---

## Phase 1 — Deploy and verify the new site (before touching DNS)

1. Connect the repo to Vercel if not already done: **vercel.com/new** → import
   `njhenderson-dev/Dr-Amanda-Henderson` → Deploy (Next.js auto-detected). It
   builds `main`.
2. On the temporary `*.vercel.app` URL, verify:
   - Images load (hero portrait, pillar images, favicon, social card).
   - All pages render; nav + mobile Book bar work.
   - Booking opens HotDoc; `tel:` links dial; directions link works.
   - `/robots.txt` and `/sitemap.xml` load; `/fees` is reachable from the nav.
   - A couple of old→new redirects (these only truly resolve once on the real
     domain, but the routes should exist): `/womenshealth`, `/services`,
     `/amanda-henderson-articles/...`.
3. Keep Squarespace exactly as-is for now — it's still serving the live domain.

## Phase 2 — Add the domain in Vercel (get the DNS target)

1. Vercel → your project → **Settings → Domains**.
2. Add **both** `dramandahenderson.com` and `www.dramandahenderson.com`.
3. Set the **apex** (`dramandahenderson.com`) as **primary**; Vercel will
   redirect `www` → apex. (This matches the site's canonical host,
   `https://dramandahenderson.com`.)
4. Vercel will show the **exact DNS records to add** — use whatever it shows.
   Typically:
   - **Apex** `dramandahenderson.com` → an **A record** to Vercel's IP
     (currently `76.76.21.21`), or an ALIAS/ANAME to `cname.vercel-dns.com` if
     your DNS host supports it at the apex.
   - **www** `www.dramandahenderson.com` → a **CNAME** to `cname.vercel-dns.com`.
   Vercel's Domains screen is the source of truth for the values — copy them
   from there.

## Phase 3 — Decide the domain strategy

- **Option A — Keep the domain registered at Squarespace, just repoint DNS
  (simplest, no downtime):** you keep paying Squarespace only for the domain
  (cancel the *website* plan later), and change the DNS records to Vercel.
- **Option B — Transfer the domain to a dedicated registrar (cleaner
  long-term):** e.g. Cloudflare Registrar, Porkbun. Unlock the domain in
  Squarespace, get the **auth/EPP code**, and start the transfer at the new
  registrar. **Start this several days before** you cancel Squarespace — it can
  take up to a week. Keep DNS pointed at Vercel throughout.

Either way the website goes live on Vercel as soon as DNS points there; the
registrar choice is separate from the cutover.

## Phase 4 — Update DNS (the actual cutover)

1. *(Optional, a day ahead)* Lower the TTL on the existing records to 300s so
   the switch propagates fast.
2. In whichever DNS dashboard controls the domain (Squarespace Domains, or your
   new registrar if you transferred):
   - **Remove** the old records that point the website at Squarespace (the
     Squarespace A records and the `www` CNAME to Squarespace).
   - **Add** the Vercel records from Phase 2 (apex A record + `www` CNAME).
   - **Leave MX / SPF / DKIM / TXT (incl. any Google verification) records in
     place.**
3. Save. Propagation is usually minutes but can take up to 24–48h.

## Phase 5 — Verify the cutover

- `https://dramandahenderson.com` and `https://www.dramandahenderson.com` both
  load the new site; `www` redirects to the apex; the padlock (SSL) is valid
  (Vercel issues it automatically once DNS validates).
- Spot-check redirects on the **real** domain:
  `/services` → `/`, `/womenshealth` → `/womens-health`,
  `/paediatrics` → `/childrens-health`,
  `/amanda-henderson-articles/<slug>` → `/articles/<slug>` (all **301**);
  `/cart` → 404.
- Booking (HotDoc), phone links, images, `/sitemap.xml`, `/robots.txt`.
- Email still sends/receives (if applicable).

## Phase 6 — Search & analytics

- **Google Search Console:** add/verify the `dramandahenderson.com` property
  (DNS TXT verification is easiest now you control DNS). Submit
  `https://dramandahenderson.com/sitemap.xml`. Use the URL Inspection tool on a
  few key pages.
- If you had **analytics** on the old site, re-add it (the new site has
  `data-cta` hooks ready for book/call/directions events). See the audit's
  privacy notes before enabling tracking.
- Watch Search Console for the first 2–4 weeks: coverage, 404s, redirect
  issues, and that old article URLs fold into the new `/articles/...` ones.

## Phase 7 — Retire Squarespace (last)

Only after the new site is confirmed live on the real domain **and** the domain
is secured (kept or transferred):

- Cancel the Squarespace **website** subscription.
- If you kept the domain at Squarespace, make sure you're **not** cancelling the
  domain registration with it (Squarespace keeps them separable). Double-check
  the domain isn't a "free with plan" inclusion that lapses when the plan ends —
  if so, transfer it out first (Option B).
- Keep a copy of the old site's content/exports (we already have the images and
  content in this repo).

---

## Rollback (if something's wrong after cutover)

Because Squarespace is untouched until Phase 7, rollback is just: **revert the
DNS records** to the Squarespace values you noted in Phase 4. Within the TTL
window the domain serves the old site again. (Record the current Squarespace
DNS values before you change anything.)

---

## What only you can do vs what I can do

- **You:** everything in Vercel, Squarespace and the registrar (I have no access
  to those dashboards or credentials).
- **Me:** anything in the codebase — fix issues found during Phase 1/5, add the
  outstanding audit items (privacy policy page, `medicalSpecialty` → PrimaryCare),
  wire up an analytics snippet, adjust redirects, and re-verify the build. Send
  me the `*.vercel.app` (or live) URL and I'll check images, redirects, schema
  and the Fees `noindex` against the real deployment.

---

## Pre-launch checklist (tick before Phase 4)

- [ ] New site verified on `*.vercel.app` (Phase 1)
- [ ] Domain added in Vercel; DNS target recorded (Phase 2)
- [ ] Domain strategy chosen; transfer started if Option B (Phase 3)
- [ ] Current Squarespace DNS records recorded (for rollback)
- [ ] Email DNS records identified and will be preserved
- [ ] *(Optional)* Privacy policy page added (audit P1)
- [ ] *(Optional)* Analytics + Search Console verification ready
- [ ] TTL lowered a day ahead (optional, speeds cutover)
