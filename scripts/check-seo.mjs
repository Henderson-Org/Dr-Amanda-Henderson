// Automated SEO + JSON-LD validation. Reads the prerendered HTML from
// `.next/server/app` (run `next build` first) and FAILS (exit 1) on:
//   • malformed JSON-LD
//   • JSON-LD @id references that don't resolve on the page
//   • duplicate @id defined with conflicting @type
//   • missing core entities (Person/Physician/MedicalClinic/WebSite)
//   • Article pages missing an Article node authored by the Person
//   • pages without exactly one <h1>
//   • missing/duplicate <title>, missing meta description
//   • missing/incorrect canonical, missing og:title/og:image (indexable pages)
//   • html without lang="en-AU"
//
// Usage: npm run check:seo   (after npm run build)
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
// SEO_APP_DIR override exists for testing the checker against fixtures.
const APP_DIR = process.env.SEO_APP_DIR || path.join(ROOT, ".next", "server", "app");
const ORIGIN = "https://dramandahenderson.com.au";

const errors = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = path.join(dir, name);
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p)));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function fileToRoute(file) {
  let r = "/" + path.relative(APP_DIR, file).replace(/\.html$/, "");
  if (r === "/index") r = "/";
  return r;
}

// Recursively collect @id definitions and references + all @types.
function scanGraph(docs) {
  const defined = new Map(); // @id -> types[]
  const referenced = new Set();
  const types = new Set();
  const walkNode = (o) => {
    if (Array.isArray(o)) return o.forEach(walkNode);
    if (o && typeof o === "object") {
      const t = o["@type"];
      if (t) (Array.isArray(t) ? t : [t]).forEach((x) => types.add(x));
      if (o["@id"] && t) {
        const arr = defined.get(o["@id"]) || [];
        defined.set(o["@id"], arr.concat(Array.isArray(t) ? t : [t]));
      }
      for (const [k, v] of Object.entries(o)) {
        if (k === "@id" && !t) referenced.add(v);
        walkNode(v);
      }
    }
  };
  docs.forEach((d) => walkNode(d["@graph"] || d));
  return { defined, referenced, types };
}

const rx = (h, re) => (h.match(re) || [])[1];

async function main() {
  try {
    await stat(APP_DIR);
  } catch {
    console.error("✗ No build found. Run `npm run build` first.");
    process.exit(1);
  }

  const files = await walk(APP_DIR);
  const titles = new Map(); // title -> [routes]
  let pages = 0;

  for (const file of files.sort()) {
    const route = fileToRoute(file);
    if (route === "/_not-found") continue; // 404 page, not indexable
    pages++;
    const html = await readFile(file, "utf8");
    const isNoindex = /<meta name="robots" content="noindex/.test(html);

    // --- JSON-LD ---
    const blocks = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].map((m) => m[1]);
    const docs = [];
    for (const b of blocks) {
      try {
        docs.push(JSON.parse(b));
      } catch (e) {
        err(route, `malformed JSON-LD: ${e.message}`);
      }
    }
    if (docs.length) {
      for (const d of docs)
        if (!d["@context"]) err(route, "JSON-LD block missing @context");
      const { defined, referenced, types } = scanGraph(docs);
      for (const ref of referenced)
        if (String(ref).startsWith("http") && !defined.has(ref))
          err(route, `unresolved @id reference: ${ref}`);
      for (const [id, ts] of defined)
        if (new Set(ts).size > 1)
          err(route, `@id ${id} defined with conflicting types: ${ts.join(",")}`);
      // core entities present on every page (from the site-wide graph)
      for (const need of ["Person", "Physician", "MedicalClinic", "WebSite"])
        if (!types.has(need)) err(route, `missing core entity: ${need}`);
      // article pages: Article authored by the Person
      if (/^\/articles\/[^/]+$/.test(route)) {
        if (!types.has("Article")) err(route, "article missing Article node");
        const article = docs
          .flatMap((d) => d["@graph"] || [d])
          .find((n) => String(n["@type"]).includes("Article"));
        if (article && article.author?.["@id"] !== `${ORIGIN}/#amanda`)
          err(route, `Article author is not the Person entity (${article.author?.["@id"]})`);
      }
    } else {
      err(route, "no JSON-LD found");
    }

    // --- metadata / structure ---
    const titleMatches = [...html.matchAll(/<title>([^<]*)<\/title>/g)];
    if (titleMatches.length !== 1) err(route, `expected 1 <title>, found ${titleMatches.length}`);
    const title = titleMatches[0]?.[1] ?? "";
    if (!title.trim()) err(route, "empty <title>");
    else {
      const arr = titles.get(title) || [];
      titles.set(title, arr.concat(route));
    }
    if (!rx(html, /<meta name="description" content="([^"]*)"/)) err(route, "missing meta description");

    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) err(route, `expected 1 <h1>, found ${h1}`);

    const canon = rx(html, /<link rel="canonical" href="([^"]*)"/);
    const expected = route === "/" ? ORIGIN : ORIGIN + route;
    if (!canon) err(route, "missing canonical");
    else if (canon !== expected) err(route, `canonical ${canon} != ${expected}`);

    if (!/<html[^>]*lang="en-AU"/.test(html)) err(route, 'missing lang="en-AU"');

    // OG only required on indexable pages
    if (!isNoindex) {
      if (!rx(html, /<meta property="og:title" content="([^"]*)"/)) err(route, "missing og:title");
      if (!rx(html, /<meta property="og:image" content="([^"]*)"/)) err(route, "missing og:image");
    }
  }

  // duplicate titles across indexable pages
  for (const [title, routes] of titles)
    if (routes.length > 1) err(routes.join(" & "), `duplicate <title>: "${title}"`);

  console.log(`Checked ${pages} pages.`);
  if (errors.length) {
    console.error(`\n✗ ${errors.length} SEO/JSON-LD problem(s):`);
    for (const e of errors) console.error("  • " + e);
    process.exit(1);
  }
  console.log("✓ All SEO & JSON-LD checks passed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
