import Link from "next/link";
import type { Metadata } from "next";
import { BookButton } from "@/components/BookButton";
import { Portrait } from "@/components/Portrait";
import { BookingWidget } from "@/components/BookingWidget";
import { AppointmentModule } from "@/components/AppointmentPromo";
import { BookingCta } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/lib/schema";
import {
  serviceAreas,
  expectations,
  credentials,
  practice,
  fullAddress,
  site,
  areasSentence,
  neighbouringAreas,
} from "@/lib/site";
import { getAllArticles } from "@/lib/articles";

const description =
  "Dr Amanda Henderson - a family GP in Maroubra who takes the time to listen, talk through your concerns, and help you make sense of what comes next.";

export const metadata: Metadata = {
  // Homepage keeps the established, well-ranking title.
  title: "Dr Amanda Henderson | Family GP, Maroubra Sydney",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Dr Amanda Henderson | Female Family GP, Maroubra Sydney",
    description,
    url: site.url,
    images: ["/images/og-amanda.jpg"],
  },
};

export default function HomePage() {
  const featuredArticles = getAllArticles().slice(0, 3);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          webPageSchema({
            type: "WebPage",
            path: "/",
            name: "Dr Amanda Henderson | Female Family GP, Maroubra",
            description,
            primaryImage: `${site.url}/images/dr-amanda-henderson-960.webp`,
            hasBreadcrumb: true,
          }),
        )}
      />

      {/* 1 - HERO: Amanda + positioning + Book CTA */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="eyebrow">Female GP · Maroubra, Sydney</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Dr Amanda Henderson
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Hi, I&rsquo;m Amanda, a family GP in Maroubra. I take the time to
              understand what&rsquo;s going on, talk through your concerns
              properly, and help you make sense of what comes next.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookButton />
              <Link href="/about" className="btn-secondary">
                About Dr Amanda
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">
              Appointments online via HotDoc · or call{" "}
              <a
                href={practice.phoneHref}
                data-cta="call_practice"
                className="font-medium text-sage-700 hover:underline"
              >
                {practice.phone}
              </a>
            </p>
          </div>

          <div className="relative">
            <Portrait
              priority
              sizes="(min-width: 1024px) 26rem, 80vw"
              className="mx-auto aspect-[4/5] w-full max-w-sm shadow-soft"
            />
          </div>
        </div>

        {/* 2 - IMMEDIATE TRUST SIGNALS */}
        <div className="border-y border-line bg-canvas/60">
          <ul className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-sm font-medium text-muted">
            {credentials.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-sage-400"
                />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2b - "WHICH APPOINTMENT?" MODULE (beneath the hero) */}
      <AppointmentModule />

      {/* 3 - HOW AMANDA CAN HELP */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">How I can help</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            A GP for the things that matter to you
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            I care for people across every stage of life, with particular
            experience and interest in a few areas.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceAreas.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group flex flex-col rounded-2xl border border-line bg-white/60 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-sage-200"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-sage-600">
                {s.eyebrow}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                {s.summary}
              </p>
              <span className="mt-4 text-sm font-medium text-sage-700 group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 - WHAT YOU CAN EXPECT (approach) */}
      <section className="bg-canvas">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">Your visit</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              What you can expect
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              The practical side of a visit matters as much as the medicine.
              Here&rsquo;s what an appointment with me actually involves.
            </p>
          </div>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((e) => (
              <div key={e.title}>
                <dt className="font-serif text-xl font-semibold text-ink">
                  {e.title}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted">{e.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 5 - SHORT ABOUT AMANDA */}
      <section className="container-page py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Portrait
            rounded="rounded-2xl"
            sizes="(min-width: 1024px) 20rem, 70vw"
            className="mx-auto aspect-[4/5] w-full max-w-xs shadow-soft lg:order-1"
            label="Dr Amanda Henderson"
          />
          <div className="lg:order-2">
            <p className="eyebrow">About Amanda</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Thorough, calm and genuinely interested
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
              <p>
                I&rsquo;m a Fellow of the Royal Australian College of General
                Practitioners and a female family GP based in Maroubra. I look
                after women through the different stages of life, care for
                pregnancies as a shared antenatal care provider with the Royal
                Hospital for Women, and enjoy the variety of caring for whole
                families - from babies and children to their parents and
                grandparents.
              </p>
              <p>
                As a mother myself, I take parental concerns seriously and try
                never to dismiss a symptom. Mostly, I want you to leave a
                consultation feeling heard, clearer about what&rsquo;s going on,
                and confident about the next step.
              </p>
            </div>
            <div className="mt-7">
              <Link href="/about" className="btn-ghost">
                More about how I work →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6b - BOOK ONLINE / AVAILABILITY (above the articles) */}
      <BookingWidget />

      {/* 7 - HELPFUL HEALTH INFORMATION */}
      {featuredArticles.length > 0 && (
        <section className="bg-canvas">
          <div className="container-page py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="eyebrow">Health information</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                  Reading room
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted">
                  Clear, practical articles written to help you prepare for a
                  visit and understand your options.
                </p>
              </div>
              <Link href="/articles" className="btn-ghost">
                All articles →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featuredArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="group rounded-2xl border border-line bg-white/60 p-6 shadow-soft transition-all hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-sage-600">
                    {a.readingMinutes} min read
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink group-hover:underline">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {a.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8 - PRACTICE / LOCATION */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-10 rounded-2xl border border-line bg-white/60 p-8 shadow-soft md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow">Where I practise</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
              {practice.name}
            </h2>
            <address className="mt-4 not-italic text-lg leading-8 text-muted">
              {fullAddress}
            </address>
            <p className="mt-2 text-muted">
              <a
                href={practice.phoneHref}
                data-cta="call_practice"
                className="font-medium text-sage-700 hover:underline"
              >
                {practice.phone}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookButton />
              <a
                href={practice.mapsUrl}
                target="_blank"
                rel="noopener"
                data-cta="get_directions"
                className="btn-secondary"
              >
                Get directions
              </a>
            </div>
          </div>
          <div className="text-muted">
            <h3 className="font-serif text-lg font-semibold text-ink">
              Serving Maroubra &amp; the eastern suburbs
            </h3>
            <p className="mt-3 leading-7">
              Based in South Maroubra, in Sydney&rsquo;s Eastern Suburbs.
              Maroubra and South Maroubra are home, and patients are also welcome
              from neighbouring {areasSentence(neighbouringAreas)}.{" "}
              <Link
                href="/contact#areas"
                className="font-medium text-sage-700 hover:underline"
              >
                Areas we serve &amp; getting here →
              </Link>
            </p>
            <h3 className="mt-6 font-serif text-lg font-semibold text-ink">
              In an emergency
            </h3>
            <p className="mt-3 leading-7">
              If it&rsquo;s a medical emergency, always call{" "}
              <a href="tel:000" className="font-medium text-ink">
                000
              </a>
              . For urgent care outside our hours, see the{" "}
              <Link href="/contact" className="font-medium text-sage-700 hover:underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 9 - FINAL BOOKING CTA */}
      <BookingCta
        heading="I'd be glad to help"
        body="If you're looking for a GP who will take the time to understand you, I'd be very happy to see you. Book online, or call the practice."
      />
    </>
  );
}
