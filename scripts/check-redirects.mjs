// Live domain-migration regression test. Verifies the deployed behaviour that
// keeps Google's .com -> .com.au migration clean, and that cannot be checked
// from build output alone:
//
//   • every old .com URL returns a single permanent redirect (301/308)
//     to the identical path on .com.au (never 200, never a redirect chain)
//   • every www / http host variant lands on the canonical apex .com.au
//   • the .com.au URL returns 200 with a self-referencing .com.au canonical
//
// Usage: node scripts/check-redirects.mjs   (hits the live site; needs network)
// Exits non-zero on any failure, so it can gate a deploy or run on a schedule.

const NEW = "https://dramandahenderson.com.au";
const OLD = "https://dramandahenderson.com";

// Representative sample: homepage, service hubs, pillars, core pages, an article.
const PATHS = [
  "/",
  "/about",
  "/contact",
  "/midlife-health-check-sydney",
  "/teenage-health",
  "/womens-health",
  "/pregnancy-care",
  "/childrens-health",
  "/general-gp-care",
  "/articles",
  "/articles/how-to-choose-a-gp-in-sydneys-eastern-suburbs",
];

const failures = [];
const fail = (m) => failures.push(m);

// Follow up to `max` redirects manually so we can count hops and see each stop.
async function trace(url, max = 10) {
  const chain = [];
  let current = url;
  for (let i = 0; i <= max; i++) {
    const res = await fetch(current, { redirect: "manual" });
    const loc = res.headers.get("location");
    chain.push({ url: current, status: res.status, location: loc });
    if (res.status >= 300 && res.status < 400 && loc) {
      current = new URL(loc, current).toString();
    } else {
      return { chain, final: current, status: res.status };
    }
  }
  return { chain, final: current, status: -1, tooMany: true };
}

async function canonicalOf(url) {
  const res = await fetch(url);
  const html = await res.text();
  const m = html.match(/<link rel="canonical" href="([^"]*)"/i);
  return { status: res.status, canonical: m ? m[1] : null };
}

async function run() {
  for (const p of PATHS) {
    const target = NEW + (p === "/" ? "/" : p);

    // 1) old .com must permanently redirect to the exact .com.au path.
    const oldUrl = OLD + p;
    try {
      const t = await trace(oldUrl);
      const first = t.chain[0];
      if (!(first.status === 301 || first.status === 308)) {
        fail(`${oldUrl} first hop is ${first.status}, expected 301/308 (must never serve 200)`);
      }
      const hops = t.chain.length - 1;
      if (hops !== 1) fail(`${oldUrl} took ${hops} hops (expected 1): ${t.chain.map((c) => c.status).join("->")}`);
      const finalNorm = t.final.replace(/\/$/, "");
      if (finalNorm !== target.replace(/\/$/, "")) {
        fail(`${oldUrl} landed on ${t.final}, expected ${target}`);
      }
    } catch (e) {
      fail(`${oldUrl} request failed: ${e.message}`);
    }

    // 2) .com.au must be 200 with a self-referencing .com.au canonical.
    try {
      const { status, canonical } = await canonicalOf(target);
      if (status !== 200) fail(`${target} returned ${status}, expected 200`);
      if (!canonical) fail(`${target} has no canonical`);
      else if (canonical.replace(/\/$/, "") !== target.replace(/\/$/, "")) {
        fail(`${target} canonical is ${canonical}, expected self-referencing ${target}`);
      }
      if (canonical && /dramandahenderson\.com(?!\.au)/.test(canonical)) {
        fail(`${target} canonical points at the retired .com domain: ${canonical}`);
      }
    } catch (e) {
      fail(`${target} request failed: ${e.message}`);
    }
  }

  // 3) host variants must all resolve to the canonical apex .com.au.
  for (const host of [
    "https://www.dramandahenderson.com",
    "https://www.dramandahenderson.com.au",
    "http://dramandahenderson.com",
  ]) {
    try {
      const t = await trace(host + "/");
      if (t.final.replace(/\/$/, "") !== NEW) {
        fail(`${host} landed on ${t.final}, expected ${NEW}`);
      }
    } catch (e) {
      fail(`${host} request failed: ${e.message}`);
    }
  }

  if (failures.length) {
    console.error(`\n✗ ${failures.length} redirect/canonical problem(s):`);
    for (const f of failures) console.error("  • " + f);
    process.exit(1);
  }
  console.log(`✓ Checked ${PATHS.length} paths + host variants. Migration redirects & canonicals OK.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
