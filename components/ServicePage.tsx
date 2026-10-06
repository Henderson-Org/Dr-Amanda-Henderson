import Link from "next/link";
import { BookButton } from "./BookButton";
import { AppointmentPromo } from "./AppointmentPromo";
import { Breadcrumbs, BookingCta, FaqList } from "./ui";
import { JsonLd } from "./JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
} from "@/lib/schema";
import {
  getServiceArea,
  serviceAreas,
  site,
  practice,
  inBriefByArea,
  furtherReadingByArea,
} from "@/lib/site";
import { getArticlesByCategory, categoryLabels } from "@/lib/articles";
import type { ArticleCategory } from "@/lib/articles";

// Maps a service slug to the matching article category.
const categoryForSlug: Record<string, ArticleCategory> = {
  "womens-health": "womens-health",
  "pregnancy-care": "pregnancy",
  "childrens-health": "childrens-health",
  "general-gp-care": "general-gp-care",
};

export function ServicePage({ slug }: { slug: string }) {
  const area = getServiceArea(slug);
  if (!area) return null;

  const inBrief = inBriefByArea[slug] ?? [];
  const sources = furtherReadingByArea[slug] ?? [];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: area.title, path: area.href },
  ];

  const relatedAreas = area.related
    .map((s) => serviceAreas.find((a) => a.slug === s))
    .filter(Boolean) as typeof serviceAreas;

  const relatedArticles = getArticlesByCategory(categoryForSlug[slug]).slice(0, 5);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          {
            "@type": "MedicalWebPage",
            "@id": `${site.url}${area.href}/#page`,
            name: area.metaTitle,
            description: area.metaDescription,
            url: `${site.url}${area.href}`,
            about: { "@id": `${site.url}/#physician` },
            lastReviewed: "2026-06-24",
            audience: { "@type": "Patient" },
          },
          faqSchema(area.faqs),
        )}
      />

      {/* Header */}
      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow">{area.eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {area.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{area.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <BookButton />
            <a
              href={practice.phoneHref}
              data-cta="call_practice"
              className="btn-secondary"
            >
              Call {practice.phone}
            </a>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl shadow-soft">
          <img
            src={`/images/${area.image.name}-1200.webp`}
            srcSet={`/images/${area.image.name}-800.webp 800w, /images/${area.image.name}-1200.webp 1200w`}
            sizes="(min-width: 1152px) 1088px, 92vw"
            width={1200}
            height={800}
            alt={area.image.alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
      </section>

      {/* In brief - concise, citeable summary */}
      {inBrief.length > 0 && (
        <section className="container-page pt-4">
          <div className="rounded-2xl border border-line bg-canvas p-7 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sage-600">
              In brief
            </h2>
            <ul className="mt-4 space-y-2.5">
              {inBrief.map((point) => (
                <li key={point} className="flex gap-3 leading-7 text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sage-400"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* What Amanda can help with */}
      <section className="container-page py-14">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          What I can help with
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {area.covers.map((c) => (
            <div
              key={c.heading}
              className="rounded-2xl border border-line bg-white/60 p-6 shadow-soft"
            >
              <h3 className="font-serif text-xl font-semibold text-ink">
                {c.heading}
              </h3>
              <p className="mt-2 leading-7 text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* When to see + What a consult involves */}
      <section className="bg-canvas">
        <div className="container-page grid gap-12 py-14 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              When it may help to see a GP
            </h2>
            <ul className="mt-6 space-y-3">
              {area.whenToSee.map((w) => (
                <li key={w} className="flex gap-3 leading-7 text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sage-400"
                  />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              What a consultation may involve
            </h2>
            <p className="mt-6 max-w-prose leading-8 text-muted">
              {area.consultation}
            </p>
            <p className="mt-4 max-w-prose leading-7 text-muted">
              Care is provided by{" "}
              <Link
                href="/about"
                className="font-medium text-sage-700 hover:underline"
              >
                Dr Amanda Henderson, a family GP (FRACGP) in Maroubra, in
                Sydney&rsquo;s Eastern Suburbs
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Appointment helper promo */}
      <section className="container-page pt-12">
        <AppointmentPromo />
      </section>

      {/* FAQs */}
      {area.faqs.length > 0 && (
        <section className="container-page py-14">
          <FaqList faqs={area.faqs} />
        </section>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="container-page pb-14">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Related reading
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-white/60 p-5 shadow-soft transition-colors hover:border-sage-200"
                >
                  <span className="font-medium text-ink">{a.title}</span>
                  <span className="flex-none text-xs text-muted">
                    {a.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sources and further reading - reputable Australian sources */}
      {sources.length > 0 && (
        <section className="container-page pb-14">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Sources &amp; further reading
          </h2>
          <p className="mt-3 max-w-prose leading-7 text-muted">
            For general information from trusted Australian sources. These are a
            starting point, not a substitute for advice about your own situation.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="flex flex-col rounded-xl border border-line bg-white/60 p-4 shadow-soft transition-colors hover:border-sage-200"
                >
                  <span className="font-medium text-sage-700">{s.label}</span>
                  {s.note && (
                    <span className="mt-0.5 text-sm text-muted">{s.note}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related areas */}
      {relatedAreas.length > 0 && (
        <section className="container-page pb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-sage-600">
            Explore also
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedAreas.map((r) => (
              <Link
                key={r.slug}
                href={r.href}
                className="rounded-full border border-line bg-white/60 px-5 py-2 text-sm font-medium text-ink hover:border-sage-200"
              >
                {r.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <BookingCta />
    </>
  );
}

// Metadata helper shared by each service route.
export function serviceMetadata(slug: string) {
  const area = getServiceArea(slug);
  if (!area) return {};
  return {
    // absolute bypasses the root layout's "%s | Dr Amanda Henderson" template
    // (metaTitle already includes the brand, so the template would double it).
    title: { absolute: area.metaTitle },
    description: area.metaDescription,
    alternates: { canonical: area.href },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `${site.url}${area.href}`,
      type: "website" as const,
      images: ["/images/og-amanda.jpg"],
    },
  };
}
