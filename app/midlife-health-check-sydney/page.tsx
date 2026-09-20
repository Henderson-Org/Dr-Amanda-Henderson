import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { Portrait } from "@/components/Portrait";
import { Breadcrumbs, BookingCta, FaqList } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
  webPageSchema,
  IDS,
} from "@/lib/schema";
import { site, practice, nearbyAreas, areasSentence } from "@/lib/site";

const PATH = "/midlife-health-check-sydney";
const LAST_REVIEWED = "2026-09-15";

const description =
  "A comprehensive, GP-led midlife health check in Sydney's Eastern Suburbs - Dr Amanda Henderson reviews your history, screening, risks and results.";

export const metadata: Metadata = {
  title: { absolute: "Midlife Health Check Sydney | Dr Amanda Henderson GP" },
  description,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "Midlife Health Check Sydney | Dr Amanda Henderson GP",
    description,
    url: `${site.url}${PATH}`,
    images: ["/images/og-amanda.jpg"],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Midlife Health Check", path: PATH },
];

// ── Content ────────────────────────────────────────────────────────────────
const journey = [
  {
    step: "01",
    title: "Your comprehensive consultation",
    body: "I take the time to understand your health, your medical and family history, how you're living, and what matters to you. Everything else is built on this.",
  },
  {
    step: "02",
    title: "The right tests and screening",
    body: "I recommend and coordinate the investigations that are appropriate for you, and arrange them - so you're not left organising isolated tests yourself.",
  },
  {
    step: "03",
    title: "Your results brought together",
    body: "Rather than reading each result in isolation, I review them as a whole and consider what they mean for your overall health and risk.",
  },
  {
    step: "04",
    title: "Your plan for the years ahead",
    body: "You leave knowing what looks good, what needs attention, what's worth monitoring, and the priorities most worth focusing on.",
  },
];

const healthPicture = [
  {
    title: "Heart & cardiovascular health",
    body: "Blood pressure, cholesterol and your overall cardiovascular risk, so we can act early where it counts.",
  },
  {
    title: "Metabolic health",
    body: "Weight, blood glucose and diabetes risk, and how they sit alongside the rest of your health.",
  },
  {
    title: "Cancer screening",
    body: "Making sure the screening that's right for your age and history is up to date, and catching up anything that's been missed.",
  },
  {
    title: "Bone & muscle health",
    body: "Bone strength and, where it's relevant, muscle and body composition - both of which matter more from midlife on.",
  },
  {
    title: "Women's & men's health",
    body: "Menopause and perimenopause, or prostate and men's health, considered as part of the whole rather than an afterthought.",
  },
  {
    title: "Sleep & lifestyle",
    body: "Sleep, exercise, alcohol and the everyday habits that quietly shape long-term health.",
  },
  {
    title: "Mental wellbeing",
    body: "Mood, stress and how you're travelling - part of your health, not separate from it.",
  },
  {
    title: "Family history & future risk",
    body: "What runs in your family, and how it changes what's worth watching for you specifically.",
  },
  {
    title: "Preventive care & vaccinations",
    body: "Age-appropriate checks, a medication review and vaccinations, brought up to date in one place.",
  },
];

const mayInclude = [
  "A thorough medical and family history",
  "Blood pressure and cardiovascular risk assessment",
  "Cholesterol and metabolic markers",
  "Blood glucose and diabetes screening",
  "Blood tests relevant to you",
  "Age-appropriate cancer screening",
  "Bone health assessment, including a DEXA scan where appropriate",
  "Menopause and women's health review, where relevant",
  "Men's health and prostate considerations, where relevant",
  "A vaccination review",
  "Sleep, exercise, alcohol and lifestyle assessment",
  "A review of your current medications",
  "An ECG or further cardiac assessment if clinically appropriate",
  "Imaging where indicated",
  "Referral to a specialist or allied health where needed",
];

const resultsCovers = [
  "What looks good",
  "What deserves attention",
  "The risk factors that matter most for you",
  "Whether anything needs further investigation",
  "What you can improve now",
  "What's worth keeping an eye on",
  "When it makes sense to check again",
];

const whoFor = [
  "You're in your 40s, 50s or early 60s",
  "You haven't had a proper health review for several years",
  "There's heart disease, cancer, osteoporosis or diabetes in your family",
  "You've noticed changes in weight, energy, sleep or fitness",
  "You'd like to understand your cardiovascular risk",
  "You want to be sure your cancer screening is up to date",
  "You're approaching or going through menopause",
  "You'd like to understand your bone health",
  "You have several small concerns you'd rather have considered together",
  "You're generally well, but want a clearer picture of your health",
  "You'd like one GP to coordinate everything, rather than arranging tests yourself",
];

const faqs = [
  {
    q: "What is a midlife health check?",
    a: "It's a comprehensive, GP-led review of your health in your 40s, 50s or beyond. Rather than a single test, it brings together your medical and family history, lifestyle, cardiovascular and metabolic health, cancer screening, bone health and more, so you understand where your health stands and what to focus on next.",
  },
  {
    q: "What health checks should I have in my 40s?",
    a: "Commonly a blood pressure and cardiovascular risk check, cholesterol and blood glucose, a review of cancer screening (such as cervical, and bowel screening which is available from 45), a check that vaccinations are up to date, and a conversation about weight, sleep, alcohol and mental wellbeing. What's right for you depends on your history and risk factors, which is what the consultation works out.",
  },
  {
    q: "What health checks should I have in my 50s?",
    a: "The 40s checks continue, and a few things come into sharper focus: bowel cancer screening (the national program covers ages 45 to 74), closer attention to cardiovascular and diabetes risk, bone health for some people, and menopause or prostate considerations where relevant. The point of the check is to tailor this to you rather than run a fixed list.",
  },
  {
    q: "What blood tests should I have at 40 or 50?",
    a: "It depends on your age, history and risk factors. Commonly considered are cholesterol and other lipids and blood glucose or HbA1c (for cardiovascular and diabetes risk), with selected tests such as kidney function, liver function or iron studies where they're clinically useful. Blood tests are chosen for you rather than ordered as a set battery, and part of the value is knowing which tests you don't need.",
  },
  {
    q: "Does a midlife health check include blood tests?",
    a: "Usually, yes, but not always, and not the same tests for everyone. I recommend the pathology that's appropriate for your age, history and risk factors, and explain why each one is worth doing.",
  },
  {
    q: "Do I need a DEXA scan?",
    a: "Not everyone does. A DEXA scan measures bone density and is worth considering if you have risk factors for osteoporosis or reach an age where it's recommended. We'll discuss whether it's appropriate for you rather than assuming it.",
  },
  {
    q: "Should I have a heart health check?",
    a: "A heart (cardiovascular) health check looks at blood pressure, cholesterol and your overall risk, and it's a sensible part of a midlife review, particularly if heart disease runs in your family. Where it's clinically appropriate, I can arrange further assessment such as an ECG.",
  },
  {
    q: "What cancer screening should I have in midlife?",
    a: "In Australia this commonly includes cervical screening (ages 25 to 74), bowel cancer screening (the national program covers ages 45 to 74), and breast screening for women in the relevant age range. A family history or symptoms may mean you need earlier or different checks rather than routine screening. I'll check what's due for you and help arrange anything that's been missed.",
  },
  {
    q: "What health checks should women have after 40?",
    a: "Alongside the general checks, this often includes cervical and breast screening, a conversation about perimenopause or menopause, and attention to bone and cardiovascular health, which change around this stage. See our women's health page for more.",
  },
  {
    q: "What health checks should men have after 40?",
    a: "The general checks apply, with added attention to cardiovascular and diabetes risk, and a discussion of prostate health where it's relevant to you. Many men haven't seen a GP in years, so it's also a chance to catch up on anything overdue.",
  },
  {
    q: "How often should I have a comprehensive health check?",
    a: "How often a review is useful depends on your age, your risk factors, your previous results and which screening is due, rather than a fixed schedule for everyone. Some things are worth monitoring more often, and I'll tell you when it makes sense to check again.",
  },
  {
    q: "Can Dr Amanda coordinate all of my tests and results?",
    a: "Yes. I arrange the appropriate investigations, bring the results together, and review them with you as a whole, rather than leaving you to organise tests and interpret them on your own.",
  },
  {
    q: "Do I need a referral for a DEXA scan?",
    a: "A DEXA scan is arranged through your GP, so we organise the referral as part of your check if it's appropriate for you. Whether Medicare contributes to the cost depends on your circumstances, which we can talk through.",
  },
  {
    q: "How long does a comprehensive health check take?",
    a: "The check is usually done over more than one visit: an initial consultation to understand your health and arrange any tests, then a results appointment to go through everything and agree a plan. Booking a longer appointment to start gives us the time to do it properly.",
  },
  {
    q: "How much does a Midlife Health Check cost?",
    a: "This is a private billing practice, so consultations are privately billed rather than bulk billed, and patients with a valid Medicare card are eligible for a Medicare rebate. The fee depends on the length and type of appointment, and any tests or scans may have their own costs. You're welcome to call the practice to talk through the cost before you book. See our fees page for more.",
  },
];

const sources = [
  {
    label: "RACGP - Guidelines for preventive activities in general practice (Red Book)",
    url: "https://www.racgp.org.au/clinical-resources/clinical-guidelines/key-racgp-guidelines/view-all-racgp-guidelines/red-book",
  },
  {
    label: "Heart Foundation - Heart health checks",
    url: "https://www.heartfoundation.org.au/your-heart/heart-health-checks",
  },
  { label: "Cancer Council Australia", url: "https://www.cancer.org.au/" },
  { label: "Healthy Bones Australia", url: "https://healthybonesaustralia.org.au/" },
  { label: "Healthdirect - Bone density scan", url: "https://www.healthdirect.gov.au/bone-density-scan" },
  { label: "Healthdirect - Type 2 diabetes", url: "https://www.healthdirect.gov.au/type-2-diabetes" },
];

// Service node - a machine-readable statement that Dr Henderson offers this
// service, tied to the existing Physician entity and her real service area.
const areaServed = [...nearbyAreas, "Eastern Suburbs, Sydney"].map((name) => ({
  "@type": "Place",
  name,
}));

const serviceSchema = {
  "@type": "MedicalProcedure",
  "@id": `${site.url}${PATH}/#service`,
  name: "The Midlife Health Check",
  description:
    "A comprehensive, GP-led preventive health assessment for people in their 40s, 50s and beyond, tailored to the individual's age, history and risk factors. Includes a consultation, appropriate tests and screening, and a results review with a personalised plan.",
  procedureType: "https://schema.org/NoninvasiveProcedure",
  category: "Preventive health assessment",
  howPerformed:
    "A comprehensive GP consultation, followed by investigations tailored to the individual, and a results appointment to review the whole picture and agree a plan.",
  provider: { "@id": IDS.physician },
  areaServed,
  url: `${site.url}${PATH}`,
};

export default function MidlifeHealthCheckPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(crumbs),
          webPageSchema({
            type: "MedicalWebPage",
            path: PATH,
            name: "The Midlife Health Check",
            description,
            primaryImage: `${site.url}/images/dr-amanda-henderson-960.webp`,
            aboutId: IDS.physician,
            mainEntityId: `${site.url}${PATH}/#service`,
            hasBreadcrumb: true,
            lastReviewed: LAST_REVIEWED,
          }),
          serviceSchema,
          faqSchema(faqs),
        )}
      />

      {/* HERO */}
      <section className="container-page pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">Preventive health in your 40s, 50s and beyond</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              The Midlife Health Check
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              A comprehensive, GP-led review to help you understand where your
              health stands today, and what deserves attention for the years
              ahead.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookButton>Book a Midlife Health Check</BookButton>
              <a href="#included" className="btn-secondary">
                What does it include?
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              With{" "}
              <Link
                href="/about"
                className="font-medium text-sage-700 hover:underline"
              >
                Dr Amanda Henderson
              </Link>
              , a GP in South Maroubra, caring for patients across Sydney&rsquo;s
              Eastern Suburbs.
            </p>
          </div>
          <div className="relative">
            <Portrait
              priority
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="mx-auto aspect-[4/5] w-full max-w-sm shadow-soft"
              label="Dr Amanda Henderson, GP in Maroubra, Sydney"
            />
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            When did you last properly check your health?
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
            <p>
              Midlife is often when the picture quietly changes. Blood pressure
              creeps up, cholesterol shifts, bone strength starts to matter, and
              family history begins to count for more - usually with no symptoms
              to warn you. Feeling well is reassuring, but it isn&rsquo;t the
              same as knowing where you stand.
            </p>
            <p>
              The Midlife Health Check is a chance to step back from individual
              niggles and look at your health as a whole, in one coordinated
              review. Instead of chasing one test at a time, we work out
              what&rsquo;s worth checking for someone your age and history, bring
              the results together, and agree what actually matters for the next
              five to ten years.
            </p>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="bg-canvas">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              One health check. A clearer picture of your health.
            </h2>
          </div>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((s) => (
              <li key={s.step}>
                <div className="font-serif text-3xl font-semibold text-sage-400">
                  {s.step}
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 leading-7 text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* YOUR HEALTH PICTURE - signature grid */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">What we look at</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            Your health picture
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            No single test tells you everything. A midlife review brings the
            important pieces together.
          </p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {healthPicture.map((h, i) => (
            <div key={h.title} className="bg-paper p-7">
              <div className="font-serif text-sm font-semibold text-sage-500">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink">
                {h.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT MAY BE INCLUDED */}
      <section id="included" className="scroll-mt-24 bg-canvas">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Tailored to you</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                What your check may include
              </h2>
              <p className="mt-5 leading-8 text-muted">
                <strong className="font-semibold text-ink">
                  The Midlife Health Check is not a fixed battery of tests.
                </strong>{" "}
                What&rsquo;s included is tailored to your age, history, symptoms
                and individual risk factors.
              </p>
              <p className="mt-4 leading-8 text-muted">
                Depending on those, I may recommend blood tests, a bone-density
                (DEXA) assessment, cardiovascular investigations such as an ECG,
                imaging, or other screening - and a referral where that&rsquo;s
                the right step. Just as often, part of the value is knowing which
                tests you don&rsquo;t need.
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {mayInclude.map((m) => (
                <li key={m} className="flex gap-3 leading-7 text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sage-400"
                  />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY GP-LED */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Why a GP-led check</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            Tests are useful. Context matters more.
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
            <p>
              A blood test result on its own can be surprisingly hard to make
              sense of. A number slightly outside the range may mean very little,
              or it may matter a great deal, depending on your history, your
              family, your other results and how you feel. Ordering tests is the
              easy part; knowing which are worth doing, and what to make of them,
              is where a GP earns their keep.
            </p>
            <p>
              Because I see the whole picture, I can weigh up which tests are
              genuinely appropriate, how your results relate to one another, what
              your family history changes, what needs following up, and - just as
              importantly - what doesn&rsquo;t. That usually means fewer
              unnecessary investigations, not more.
            </p>
          </div>
        </div>
      </section>

      {/* RESULTS APPOINTMENT */}
      <section className="bg-canvas">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="max-w-xl">
              <p className="eyebrow">The results appointment</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                More than a set of test results
              </h2>
              <div className="mt-5 space-y-4 leading-8 text-muted">
                <p>
                  The heart of the Midlife Health Check isn&rsquo;t the pathology
                  or the scans - it&rsquo;s what happens once the results are
                  back. We sit down together and I talk you through the whole
                  picture.
                </p>
                <p>
                  You leave with a clear, practical understanding of your health,
                  rather than a folder of numbers to puzzle over on your own.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white/60 p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sage-600">
                Together we&rsquo;ll cover
              </p>
              <ul className="mt-4 space-y-2.5">
                {resultsCovers.map((r) => (
                  <li key={r} className="flex gap-3 leading-7 text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sage-400"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Who it&rsquo;s for</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            Is a Midlife Health Check right for you?
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            It&rsquo;s worth considering if you&rsquo;re in your 40s, 50s or
            early 60s and any of these sound like you.
          </p>
        </div>
        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {whoFor.map((w) => (
            <li key={w} className="flex gap-3 leading-7 text-muted">
              <span
                aria-hidden="true"
                className="mt-2.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sage-400"
              />
              {w}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl leading-8 text-muted">
          If you&rsquo;re generally well but want a clearer picture, that&rsquo;s
          reason enough. A midlife review connects naturally with the rest of
          the practice - from{" "}
          <Link
            href="/womens-health"
            className="font-medium text-sage-700 hover:underline"
          >
            women&rsquo;s health
          </Link>{" "}
          and menopause care to{" "}
          <Link
            href="/general-gp-care"
            className="font-medium text-sage-700 hover:underline"
          >
            preventive and men&rsquo;s health
          </Link>{" "}
          in general practice.
        </p>
      </section>

      {/* ABOUT AMANDA */}
      <section className="bg-canvas">
        <div className="container-page py-16 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Portrait
              rounded="rounded-2xl"
              sizes="(min-width: 1024px) 20rem, 70vw"
              className="mx-auto aspect-[4/5] w-full max-w-xs shadow-soft"
              label="Dr Amanda Henderson"
            />
            <div>
              <p className="eyebrow">Care led by your GP</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                About Dr Amanda Henderson
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
                <p>
                  The Midlife Health Check is led by Dr Amanda Henderson, a
                  family GP (FRACGP) based in South Maroubra. Amanda values
                  continuity - the kind of care where one doctor knows your
                  history and follows it over time - and brings that same
                  thoroughness to a midlife review: unhurried, evidence-based,
                  and focused on what&rsquo;s genuinely useful for you.
                </p>
                <p>
                  She cares for patients across Sydney&rsquo;s Eastern Suburbs,
                  including {areasSentence(nearbyAreas.slice(2))}.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <BookButton>Book with Dr Amanda</BookButton>
                <Link href="/about" className="btn-secondary">
                  More about Amanda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16 md:py-20">
        <p className="eyebrow">Common questions</p>
        <div className="mt-4">
          <FaqList faqs={faqs} heading="Midlife health checks, answered" />
        </div>
      </section>

      {/* SOURCES */}
      <section className="container-page pb-16">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          Sources &amp; further reading
        </h2>
        <p className="mt-3 max-w-prose leading-7 text-muted">
          General information from trusted Australian sources. These are a
          starting point, not a substitute for advice about your own situation.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener nofollow"
                className="flex rounded-xl border border-line bg-white/60 p-4 shadow-soft transition-colors hover:border-sage-200"
              >
                <span className="font-medium text-sage-700">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-6 text-muted">
          Reviewed by Dr Amanda Henderson (FRACGP). Last reviewed 15 September
          2026. This page is general information, not personal medical advice.
        </p>
      </section>

      <BookingCta
        heading="Start with a comprehensive health review"
        body="Book a Midlife Health Check with Dr Amanda Henderson online through HotDoc, or call the practice to talk it through first."
      />
    </>
  );
}
