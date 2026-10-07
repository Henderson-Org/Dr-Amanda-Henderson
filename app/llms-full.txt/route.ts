import { site, practice, fullAddress, serviceAreas, nearbyAreas } from "@/lib/site";
import { getAllArticles, categoryLabels } from "@/lib/articles";

// Fuller AI-discovery file: the concise summary plus the complete list of
// medical articles authored by Dr Amanda Henderson, generated from the content
// so it stays current automatically. Fees intentionally omitted.
export const dynamic = "force-static";

export function GET() {
  const u = site.url;
  const articles = getAllArticles();

  const lines = [
    "# Dr Amanda Henderson - Female Family GP, Maroubra, Sydney's Eastern Suburbs",
    "",
    `> Dr Amanda Henderson is a female family GP and family doctor (general practitioner, FRACGP) who consults at ${practice.name}, ${fullAddress}, Australia - in Maroubra, in Sydney's Eastern Suburbs. Clinical interests: women's health, pregnancy and preconception care (including shared antenatal care with the Royal Hospital for Women, Randwick), children's health, general family medicine and preventative health.`,
    "",
    "## Practice",
    `- Practitioner: Dr Amanda Henderson - female family GP (FRACGP), AHPRA-registered`,
    `- Practice: ${practice.name}, ${fullAddress}, Australia`,
    `- Phone: ${practice.phone} · Bookings: HotDoc (${practice.bookingUrl})`,
    `- Areas served: ${nearbyAreas.join(", ")} (Sydney's Eastern Suburbs)`,
    "",
    "## Clinical areas",
    ...serviceAreas.map((s) => `- [${s.title}](${u}${s.href}): ${s.summary}`),
    "",
    `## Health articles (written by Dr Amanda Henderson)`,
  ];

  for (const cat of [
    "womens-health",
    "pregnancy",
    "childrens-health",
    "general-gp-care",
  ] as const) {
    const items = articles.filter((a) => a.category === cat);
    if (!items.length) continue;
    lines.push("", `### ${categoryLabels[cat]}`);
    for (const a of items) {
      lines.push(`- [${a.title}](${u}/articles/${a.slug}): ${a.description}`);
    }
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
