import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  jsonLdGraph,
  webPageSchema,
  faqSchema,
  IDS,
} from "@/lib/schema";
import {
  practice,
  fullAddress,
  site,
  clinicExtras,
  practiceStatus,
  locationFaqs,
  areasSentence,
  neighbouringAreas,
} from "@/lib/site";

// Format a 24-hour "HH:MM" string as "9:00am" / "5:30pm".
function to12h(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h < 12 ? "am" : "pm";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")}${period}`;
}

// "Monday to Friday" for a run of days, else the days joined.
function formatDays(days: string[]): string {
  if (days.length === 0) return "";
  if (days.length === 1) return days[0];
  return `${days[0]} to ${days[days.length - 1]}`;
}

const description = `Contact Dr Amanda Henderson at ${practice.name}, ${fullAddress}. Book online via HotDoc or call ${practice.phone}.`;

export const metadata: Metadata = {
  title: { absolute: "Contact & Location | Dr Amanda Henderson, GP Maroubra" },
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact & Location | Dr Amanda Henderson, GP Maroubra",
    description,
    url: `${site.url}/contact`,
    images: ["/images/og-amanda.jpg"],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          webPageSchema({
            type: "ContactPage",
            path: "/contact",
            name: "Contact & Location - Dr Amanda Henderson",
            description,
            aboutId: IDS.clinic,
            mainEntityId: IDS.clinic,
            hasBreadcrumb: true,
          }),
          faqSchema(locationFaqs),
        )}
      />

      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Contact &amp; location
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Booking is easiest online through HotDoc. You&rsquo;re also very
            welcome to call the practice.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Location */}
          <div className="rounded-2xl border border-line bg-white/60 p-8 shadow-soft">
            <h2 className="font-serif text-xl font-semibold">Practice location</h2>
            <address className="mt-4 not-italic text-lg leading-8 text-muted">
              <span className="font-medium text-ink">{practice.name}</span>
              <br />
              {practice.streetAddress}
              <br />
              {practice.suburb} {practice.region} {practice.postcode}
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
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

          {/* Booking & phone */}
          <div className="rounded-2xl border border-line bg-white/60 p-8 shadow-soft">
            <h2 className="font-serif text-xl font-semibold">Appointments</h2>
            {practiceStatus.acceptingNewPatients !== null && (
              <p className="mt-4 font-medium text-ink">
                {practiceStatus.acceptingNewPatients
                  ? "New patients are welcome."
                  : "The practice is not currently accepting new patients."}
                {practiceStatus.note ? ` ${practiceStatus.note}` : ""}
              </p>
            )}
            <p className="mt-4 leading-7 text-muted">
              Book online any time, or call during practice hours. This is a
              private billing practice - see{" "}
              <Link href="/fees" className="font-medium text-sage-700 hover:underline">
                fees
              </Link>{" "}
              for consultation costs and Medicare rebates.
            </p>
            <p className="mt-4 text-lg">
              <a
                href={practice.phoneHref}
                data-cta="call_practice"
                className="font-medium text-sage-700 hover:underline"
              >
                {practice.phone}
              </a>
            </p>
            {clinicExtras.openingHours.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-sage-600">
                  Opening hours
                </h3>
                <dl className="mt-2 space-y-1 text-muted">
                  {clinicExtras.openingHours.map((o) => (
                    <div key={o.days.join()} className="flex justify-between gap-4">
                      <dt>{formatDays(o.days)}</dt>
                      <dd className="text-ink">
                        {to12h(o.opens)} - {to12h(o.closes)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <div className="mt-6">
              <BookButton />
            </div>
          </div>
        </div>

        {/* Urgent / after-hours */}
        <div className="mt-6 rounded-2xl border border-blush-100 bg-blush-100/40 p-8">
          <h2 className="font-serif text-xl font-semibold">
            Urgent &amp; after-hours care
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-medium text-ink">In an emergency</p>
              <p className="mt-1 leading-7 text-muted">
                Always call{" "}
                <a href="tel:000" className="font-semibold text-ink">
                  000
                </a>{" "}
                or go to your nearest emergency department.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">After hours (non-emergency)</p>
              <p className="mt-1 leading-7 text-muted">
                {practice.afterHours.label}:{" "}
                <a
                  href={practice.afterHours.phoneHref}
                  className="font-medium text-sage-700 hover:underline"
                >
                  {practice.afterHours.phone}
                </a>{" "}
                or{" "}
                <a
                  href={practice.afterHours.altPhoneHref}
                  className="font-medium text-sage-700 hover:underline"
                >
                  {practice.afterHours.altPhone}
                </a>
                .
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-muted">
            Health advice is also available from healthdirect on{" "}
            <a href="tel:1800022222" className="font-medium text-sage-700 hover:underline">
              1800 022 222
            </a>{" "}
            (24 hours).
          </p>
        </div>
      </section>

      {/* Areas we serve / getting here */}
      <section id="areas" className="scroll-mt-24 bg-canvas">
        <div className="container-page py-14">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Serving Maroubra &amp; the eastern suburbs
            </h2>
            <p className="mt-4 leading-8 text-muted">
              The practice is based in <strong className="font-medium text-ink">South
              Maroubra</strong>, in Sydney&rsquo;s eastern suburbs. Maroubra and
              South Maroubra are home, and patients are also very welcome from
              neighbouring {areasSentence(neighbouringAreas)} - most are only a
              short drive away.
            </p>
            <p className="mt-4 leading-8 text-muted">
              Because {practice.name} is a local general practice, much of your
              care can happen close to home - including{" "}
              <Link href="/pregnancy-care" className="font-medium text-sage-700 hover:underline">
                shared antenatal care
              </Link>{" "}
              coordinated with the Royal Hospital for Women in Randwick,{" "}
              <Link href="/womens-health" className="font-medium text-sage-700 hover:underline">
                women&rsquo;s health
              </Link>
              ,{" "}
              <Link href="/childrens-health" className="font-medium text-sage-700 hover:underline">
                children&rsquo;s health
              </Link>{" "}
              and{" "}
              <Link href="/general-gp-care" className="font-medium text-sage-700 hover:underline">
                everyday family medicine
              </Link>
              .
            </p>
            <h3 className="mt-8 font-serif text-lg font-semibold text-ink">
              Getting here
            </h3>
            <p className="mt-3 leading-8 text-muted">
              {practice.name} is at {fullAddress}. The{" "}
              <a
                href={practice.mapsUrl}
                target="_blank"
                rel="noopener"
                data-cta="get_directions"
                className="font-medium text-sage-700 hover:underline"
              >
                Get directions
              </a>{" "}
              link opens the exact location in Google Maps for driving, public
              transport or walking directions. To read more about Dr Henderson,
              see the{" "}
              <Link href="/about" className="font-medium text-sage-700 hover:underline">
                about page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Location FAQs - genuine patient questions, answers in crawlable HTML */}
      <section className="container-page py-14">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          Questions about location &amp; getting here
        </h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {locationFaqs.map((f) => (
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
    </>
  );
}
