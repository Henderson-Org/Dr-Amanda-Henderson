import type { Metadata } from "next";
import Link from "next/link";
import { Portrait } from "@/components/Portrait";
import { BookButton } from "@/components/BookButton";
import { Breadcrumbs, BookingCta } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  jsonLdGraph,
  webPageSchema,
  faqSchema,
  IDS,
} from "@/lib/schema";
import {
  site,
  practice,
  fullAddress,
  qualifications,
  serviceAreas,
  approach,
  nearbyAreas,
  areasSentence,
} from "@/lib/site";

const description =
  "Dr Amanda Henderson (MBBS, FRACGP) is a female family GP in Maroubra and a registered shared antenatal care provider with the Royal Hospital for Women.";

export const metadata: Metadata = {
  title: { absolute: "About Dr Amanda Henderson | Female Family GP, Maroubra" },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: "About Dr Amanda Henderson | Female Family GP, Maroubra",
    description,
    url: `${site.url}/about`,
    images: ["/images/og-amanda.jpg"],
  },
};

// Entity fact FAQ - natural-language answers, all supported by the site.
const aboutFaqs = [
  {
    q: "Who is Dr Amanda Henderson?",
    a: "Dr Amanda Henderson is a female family GP (general practitioner) who consults at GP Maroubra in South Maroubra, in Sydney's eastern suburbs. She is a Fellow of the Royal Australian College of General Practitioners (FRACGP).",
  },
  {
    q: "What kind of doctor is Dr Amanda Henderson?",
    a: "She is a general practitioner - a family GP who cares for patients of all ages, with particular experience and interest in women's health, pregnancy, children's health and general family medicine.",
  },
  {
    q: "What are Dr Amanda Henderson's qualifications?",
    a: "Dr Henderson holds an MBBS and is a Fellow of the Royal Australian College of General Practitioners (FRACGP). She is a registered medical practitioner with AHPRA and a registered shared antenatal care provider with the Royal Hospital for Women in Randwick.",
  },
  {
    q: "Where does Dr Amanda Henderson practise?",
    a: `She consults at ${practice.name}, ${fullAddress}, welcoming patients and families from across Sydney's eastern suburbs, including ${areasSentence()}.`,
  },
  {
    q: "What does Dr Amanda Henderson particularly help with?",
    a: "Women's health, pregnancy and preconception care (including shared antenatal care), children's health, general family medicine and preventative health.",
  },
];

// Key-facts block (machine-extractable, human-readable).
const factRows = [
  { label: "Role", value: "Female family GP (general practitioner)" },
  { label: "Qualifications", value: "MBBS · FRACGP" },
  { label: "Practice", value: practice.name },
  { label: "Location", value: fullAddress },
  {
    label: "Clinical interests",
    value:
      "Women's health · Pregnancy & preconception · Children's health · General family medicine · Preventative health",
  },
  {
    label: "Hospital program",
    value: "Shared antenatal care - Royal Hospital for Women, Randwick",
  },
  { label: "Areas served", value: `${nearbyAreas.join(", ")} (Sydney's eastern suburbs)` },
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          webPageSchema({
            type: "AboutPage",
            path: "/about",
            name: "About Dr Amanda Henderson",
            description,
            primaryImage: `${site.url}/images/dr-amanda-henderson-960.webp`,
            aboutId: IDS.person,
            mainEntityId: IDS.person,
            hasBreadcrumb: true,
          }),
          faqSchema(aboutFaqs),
        )}
      />

      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">About Dr Amanda Henderson</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Medicine that starts with listening
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              <p>
                I&rsquo;m Dr Amanda Henderson, a female family GP based in
                Maroubra in Sydney&rsquo;s eastern suburbs. I chose general
                practice because I love the breadth of it - and because it
                lets me get to know people and their families over time, rather
                than for a single problem.
              </p>
              <p>
                My approach is thorough and unhurried. I&rsquo;d rather
                understand the whole picture than treat a symptom in isolation,
                and I try to explain things clearly so you can make decisions
                that are right for you. I&rsquo;m a mother myself, and I take
                parents&rsquo; concerns seriously.
              </p>
            </div>
            <div className="mt-7">
              <BookButton />
            </div>
          </div>
          <Portrait
            priority
            sizes="(min-width: 1024px) 24rem, 80vw"
            className="mx-auto aspect-[4/5] w-full max-w-sm shadow-soft"
            label="Dr Amanda Henderson, family GP in Maroubra, Sydney"
          />
        </div>
      </section>

      {/* Key facts - natural-language, machine-extractable entity summary */}
      <section className="container-page pb-4 pt-2">
        <div className="rounded-2xl border border-line bg-white/60 p-7 shadow-soft sm:p-9">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Dr Amanda Henderson at a glance
          </h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            Dr Amanda Henderson is a female family GP (FRACGP) who consults at{" "}
            {practice.name}, {fullAddress}. She cares for patients of all ages,
            with particular experience in women&rsquo;s health, pregnancy and
            preconception care, children&rsquo;s health and general family
            medicine, and welcomes patients from across Sydney&rsquo;s eastern
            suburbs.
          </p>
          <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {factRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col border-t border-line pt-3 sm:flex-row sm:gap-4"
              >
                <dt className="w-40 flex-none text-sm font-semibold uppercase tracking-wide text-sage-600">
                  {row.label}
                </dt>
                <dd className="mt-1 text-ink sm:mt-0">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Approach / philosophy */}
      <section className="bg-canvas">
        <div className="container-page py-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              How I like to work
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Beyond the specifics of any one visit, a few principles shape the
              way I practise.
            </p>
          </div>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((e) => (
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

      {/* Areas of interest */}
      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Areas of clinical interest
            </h2>
            <p className="mt-4 leading-8 text-muted">
              I care for people across the whole range of general practice, with
              particular experience and interest in:
            </p>
            <ul className="mt-6 space-y-3">
              {serviceAreas.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white/60 px-5 py-4 shadow-soft transition-colors hover:border-sage-200"
                  >
                    <span className="font-medium text-ink">{s.title}</span>
                    <span aria-hidden="true" className="text-sage-600">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Qualifications &amp; registration
            </h2>
            <ul className="mt-6 space-y-4 text-muted">
              <li className="border-l-2 border-sage-200 pl-4">
                <span className="font-medium text-ink">
                  Bachelor of Medicine, Bachelor of Surgery (MBBS)
                </span>
              </li>
              <li className="border-l-2 border-sage-200 pl-4">
                <span className="font-medium text-ink">
                  Fellow of the Royal Australian College of General
                  Practitioners (FRACGP)
                </span>
              </li>
              <li className="border-l-2 border-sage-200 pl-4">
                <span className="font-medium text-ink">
                  Registered shared antenatal care provider
                </span>
                <br />
                Royal Hospital for Women, Randwick
              </li>
              <li className="border-l-2 border-sage-200 pl-4">
                <span className="font-medium text-ink">
                  Registered medical practitioner
                </span>
                <br />
                Australian Health Practitioner Regulation Agency (AHPRA)
              </li>
            </ul>
            <p className="mt-6 text-sm leading-6 text-muted">
              Prior qualifications include {qualifications.filter((q) => ["MAppIFin", "BComm", "BBus"].includes(q)).join(", ")} -
              a background that informs a considered, practical approach to care.
            </p>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="bg-canvas">
        <div className="container-page py-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Where I practise
            </h2>
            <p className="mt-4 leading-8 text-muted">
              I consult at {practice.name}, {practice.streetAddress},{" "}
              {practice.suburb}. Appointments can be made online, or by calling{" "}
              <a
                href={practice.phoneHref}
                data-cta="call_practice"
                className="font-medium text-sage-700 hover:underline"
              >
                {practice.phone}
              </a>
              . Full location and contact details are on the{" "}
              <Link href="/contact" className="font-medium text-sage-700 hover:underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Entity FAQ - helps patients and answer engines alike */}
      <section className="container-page py-16">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          Common questions about Dr Amanda Henderson
        </h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {aboutFaqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                {f.q}
                <span
                  className="text-sage-600 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-prose leading-7 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <BookingCta />
    </>
  );
}
