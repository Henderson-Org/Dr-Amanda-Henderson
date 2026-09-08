import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { serviceMetadata } from "@/components/ServicePage";
import { Breadcrumbs, BookingCta, FaqList } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/schema";
import {
  getServiceArea,
  serviceAreas,
  site,
  practice,
  inBriefByArea,
  furtherReadingByArea,
  teenageHealthContent,
} from "@/lib/site";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = serviceMetadata("teenage-health");

// Existing articles that genuinely help a teenager or parent - linked rather
// than duplicated, to avoid competing with the pages that own these topics.
const RELATED_ARTICLE_SLUGS = [
  "acne-treatment-for-teens-and-adults-when-to-see-a-gp",
  "understanding-what-causes-heavy-periods",
  "contraception-options-in-australia-how-a-gp-can-help-you-choose",
  "sexual-health-vaginal-symptoms-and-sti-testing-a-gp-visit-should-feel-safe",
  "lifestyle-medicine-weight-sleep-alcohol-smoking-and-wellbeing",
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Teenage Health", path: "/teenage-health" },
];

export default function TeenageHealthPage() {
  const area = getServiceArea("teenage-health")!;
  const inBrief = inBriefByArea["teenage-health"] ?? [];
  const sources = furtherReadingByArea["teenage-health"] ?? [];
  const { seeingAGp, privacy, forParents } = teenageHealthContent;

  const relatedArticles = getAllArticles().filter((a) =>
    RELATED_ARTICLE_SLUGS.includes(a.slug),
  );
  const relatedAreas = area.related
    .map((s) => serviceAreas.find((a) => a.slug === s))
    .filter(Boolean) as typeof serviceAreas;

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
            lastReviewed: "2026-09-08",
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
            Teenage Health
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
      </section>

      {/* In brief */}
      {inBrief.length > 0 && (
        <section className="container-page pt-10">
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

      {/* What a GP can help with */}
      <section className="container-page py-14">
        <h2 className="max-w-2xl font-serif text-2xl font-semibold sm:text-3xl">
          What I can help a teenager with
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
        <p className="mt-6 max-w-3xl leading-8 text-muted">
          Some of this overlaps with other parts of the practice: periods and
          contraception sit within{" "}
          <Link
            href="/womens-health"
            className="font-medium text-sage-700 hover:underline"
          >
            women&rsquo;s health
          </Link>
          , and low mood, anxiety and sleep within{" "}
          <Link
            href="/general-gp-care"
            className="font-medium text-sage-700 hover:underline"
          >
            general GP care
          </Link>
          . A teenager doesn&rsquo;t need to know which box a problem belongs in -
          that&rsquo;s my job.
        </p>
      </section>

      {/* When to see + what a first visit is like */}
      <section className="bg-canvas">
        <div className="container-page grid gap-12 py-14 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Reasons it might be worth booking
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
              What a first visit is like
            </h2>
            <p className="mt-6 max-w-prose leading-8 text-muted">
              {area.consultation}
            </p>
            {seeingAGp.map((p) => (
              <p key={p} className="mt-4 max-w-prose leading-8 text-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & confidentiality */}
      <section className="container-page py-14">
        <div className="mx-auto max-w-3xl rounded-2xl border border-sage-200 bg-white/70 p-8 shadow-soft sm:p-10">
          <p className="eyebrow">Privacy</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
            What stays between the doctor and the patient
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-muted">
            {privacy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* For parents */}
      <section className="bg-canvas">
        <div className="container-page py-14">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              A note for parents
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
              {forParents.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-5 max-w-prose leading-7 text-muted">
              Care is provided by{" "}
              <Link
                href="/about"
                className="font-medium text-sage-700 hover:underline"
              >
                Dr Amanda Henderson, a family GP (FRACGP) in Maroubra
              </Link>
              , who sees teenagers and families from across Sydney&rsquo;s
              Eastern Suburbs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {area.faqs.length > 0 && (
        <section className="container-page py-14">
          <FaqList faqs={area.faqs} />
        </section>
      )}

      {/* Related reading */}
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

      {/* Sources & further reading */}
      {sources.length > 0 && (
        <section className="container-page pb-14">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Sources &amp; further reading
          </h2>
          <p className="mt-3 max-w-prose leading-7 text-muted">
            Trusted Australian services for young people and parents. If
            something is urgent or you just need to talk, these are good places
            to start.
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

      {/* Explore also */}
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

      <BookingCta
        heading="Book for your teenager, or for yourself"
        body="Appointments can be made online through HotDoc, or call the practice. A young person is welcome to book on their own, or with a parent."
      />
    </>
  );
}
