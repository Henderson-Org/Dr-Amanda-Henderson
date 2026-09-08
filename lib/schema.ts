import {
  site,
  practice,
  serviceAreas,
  nearbyAreas,
  clinicExtras,
  googleBusinessProfile,
} from "./site";

// Verified external profiles for Dr Amanda Henderson (the human / practitioner).
// Only URLs confirmed to belong to THIS doctor - never a same-name profile.
const practitionerSameAs = [practice.bookingUrl, googleBusinessProfile].filter(
  Boolean,
);

// ---------------------------------------------------------------------------
// Structured-data (schema.org JSON-LD) entity graph.
//
// Three real-world entities, each with a stable @id so search engines and LLMs
// resolve them to the same thing on every page:
//
//   Person  (#amanda)    - the human, Dr Amanda Henderson (author of articles)
//   Physician (#physician) - the doctor as a medical provider / local entity
//   MedicalClinic (#clinic) - GP Maroubra, the place she consults at
//
// Relationships are kept consistent site-wide:
//   Person   -worksFor→        MedicalClinic
//   Physician -memberOf→        MedicalClinic (and the RACGP)
//   MedicalClinic -employee→    Person
//   Article  -author/reviewedBy→ Person   -publisher→ Physician
//
// The Person and Physician nodes describe the same doctor (one as the human
// author, one as the practising provider); they share identical name, image
// and address and both attach to the same clinic, so they resolve to one
// entity without asserting any ownership/employment relationship that isn't
// verified.
// ---------------------------------------------------------------------------

export const IDS = {
  person: `${site.url}/#amanda`,
  physician: `${site.url}/#physician`,
  clinic: `${site.url}/#clinic`,
  website: `${site.url}/#website`,
  racgp: `${site.url}/#racgp`,
};

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: practice.streetAddress,
  addressLocality: practice.suburb,
  addressRegion: practice.region,
  postalCode: practice.postcode,
  addressCountry: practice.country,
};

const areaServed = [...nearbyAreas, "Eastern Suburbs, Sydney"].map((name) => ({
  "@type": "Place",
  name,
}));

// De-duplicated clinical interests - expressed as knowsAbout (areas of
// interest), never as specialties, so nothing implies specialist registration.
const knowsAbout = Array.from(
  new Set(serviceAreas.flatMap((s) => s.knowsAbout)),
);

const availableServices = serviceAreas.map((s) => ({
  "@type": "MedicalProcedure",
  name: s.title,
  url: `${site.url}${s.href}`,
}));

// The RACGP node is referenced by @id from the Person/Physician nodes. It is
// emitted once, in the site-wide graph (layout), via racgpSchema().
export function racgpSchema() {
  return {
    "@type": "MedicalOrganization",
    "@id": IDS.racgp,
    name: "Royal Australian College of General Practitioners",
    alternateName: "RACGP",
    url: "https://www.racgp.org.au/",
  };
}

// ── Person: the human / article author ────────────────────────────────────
export function personSchema() {
  return {
    "@type": "Person",
    "@id": IDS.person,
    name: "Dr Amanda Henderson",
    givenName: "Amanda",
    familyName: "Henderson",
    honorificPrefix: "Dr",
    jobTitle: "General Practitioner",
    gender: "Female",
    description: site.description,
    url: `${site.url}/about`,
    image: `${site.url}/images/dr-amanda-henderson-960.webp`,
    knowsAbout,
    worksFor: { "@id": IDS.clinic },
    memberOf: { "@id": IDS.racgp },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "MBBS",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Fellowship",
        name: "Fellow of the Royal Australian College of General Practitioners (FRACGP)",
        recognizedBy: { "@id": IDS.racgp },
      },
    ],
    sameAs: practitionerSameAs,
  };
}

// ── Physician: the practising doctor as a medical provider / local entity ──
export function physicianSchema() {
  return {
    "@type": "Physician",
    "@id": IDS.physician,
    name: "Dr Amanda Henderson",
    description: site.description,
    url: site.url,
    image: `${site.url}/images/dr-amanda-henderson-960.webp`,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/images/logo.png`,
      width: 600,
      height: 600,
    },
    // Areas of interest only - NOT specialist registration.
    medicalSpecialty: "PrimaryCare",
    knowsAbout,
    telephone: practice.phone,
    address: postalAddress,
    areaServed,
    memberOf: [{ "@id": IDS.racgp }, { "@id": IDS.clinic }],
    availableService: availableServices,
    sameAs: practitionerSameAs,
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book an appointment",
      target: {
        "@type": "EntryPoint",
        urlTemplate: practice.bookingUrl,
        inLanguage: "en-AU",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "GP appointment" },
    },
  };
}

// ── MedicalClinic: the location (GP Maroubra) ──────────────────────────────
export function clinicSchema() {
  // Verified local signals — omitted entirely when not yet supplied.
  const openingHoursSpecification = clinicExtras.openingHours.map((o) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }));
  return {
    "@type": "MedicalClinic",
    "@id": IDS.clinic,
    name: practice.name,
    url: site.url,
    telephone: practice.phone,
    address: postalAddress,
    hasMap: practice.mapsUrl,
    areaServed,
    medicalSpecialty: "PrimaryCare",
    availableService: availableServices,
    ...(openingHoursSpecification.length ? { openingHoursSpecification } : {}),
    ...(clinicExtras.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: clinicExtras.geo.latitude,
            longitude: clinicExtras.geo.longitude,
          },
        }
      : {}),
    ...(clinicExtras.sameAs.length ? { sameAs: clinicExtras.sameAs } : {}),
    employee: { "@id": IDS.person },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": IDS.website,
    url: site.url,
    name: `${site.name} - ${site.role}, Maroubra`,
    inLanguage: "en-AU",
    publisher: { "@id": IDS.physician },
    about: { "@id": IDS.physician },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const last = items[items.length - 1]?.path ?? "/";
  return {
    "@type": "BreadcrumbList",
    "@id": `${site.url}${last === "/" ? "/" : last}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

// Reusable WebPage-family node generator. Ties each page into the entity graph:
// it is part of the WebSite, is "about" a core entity (the Physician by
// default; the Person on the About page), and links to its BreadcrumbList and
// primary image by @id. Use AboutPage / ContactPage / CollectionPage /
// MedicalWebPage via `type`.
export function webPageSchema(opts: {
  type?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "MedicalWebPage";
  path: string;
  name: string;
  description: string;
  primaryImage?: string;
  aboutId?: string;
  mainEntityId?: string;
  hasBreadcrumb?: boolean;
  lastReviewed?: string;
}) {
  const url = `${site.url}${opts.path === "/" ? "/" : opts.path}`;
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-AU",
    isPartOf: { "@id": IDS.website },
    about: { "@id": opts.aboutId ?? IDS.physician },
    ...(opts.mainEntityId ? { mainEntity: { "@id": opts.mainEntityId } } : {}),
    ...(opts.primaryImage
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: opts.primaryImage,
          },
        }
      : {}),
    ...(opts.hasBreadcrumb
      ? { breadcrumb: { "@id": `${url}#breadcrumb` } }
      : {}),
    ...(opts.lastReviewed ? { lastReviewed: opts.lastReviewed } : {}),
  };
}

// Article header image, chosen from the migrated pillar photography by category.
const CATEGORY_IMAGE: Record<string, string> = {
  "womens-health": "womens-health",
  pregnancy: "pregnancy",
  "childrens-health": "children",
  "general-gp-care": "lifestyle",
};

export function articleImage(category?: string) {
  const name = category ? CATEGORY_IMAGE[category] : undefined;
  return name
    ? `${site.url}/images/${name}-1200.webp`
    : `${site.url}/images/og-amanda.jpg`;
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  category?: string;
  categoryLabel?: string;
}) {
  return {
    "@type": "Article",
    "@id": `${site.url}/articles/${a.slug}/#article`,
    headline: a.title,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    inLanguage: "en-AU",
    image: articleImage(a.category),
    ...(a.categoryLabel ? { articleSection: a.categoryLabel } : {}),
    // Author markup points at the Person (the human), reviewed by the same
    // clinician, published by the practice (Physician has a logo → valid
    // Article publisher).
    author: { "@id": IDS.person },
    reviewedBy: { "@id": IDS.person },
    publisher: { "@id": IDS.physician },
    mainEntityOfPage: `${site.url}/articles/${a.slug}`,
    isPartOf: { "@id": IDS.website },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Wraps one or more nodes into a single @graph document. Cross-graph @id
// references resolve because search engines merge all JSON-LD on a page.
export function jsonLdGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
