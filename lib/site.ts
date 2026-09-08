// ---------------------------------------------------------------------------
// Central site configuration & content model.
// Content is separated from presentation so copy, practice details and SEO
// metadata can be edited here (or later moved to a lightweight CMS) without
// touching layout code.
// ---------------------------------------------------------------------------

export const site = {
  name: "Dr Amanda Henderson",
  shortName: "Dr Amanda Henderson",
  role: "Family GP",
  // Preferred canonical origin. Keep in sync with the deployed domain.
  // Primary domain is the Australian .com.au; the .com is kept only as a
  // permanent redirect to the matching .com.au path (configured in Vercel).
  url: "https://dramandahenderson.com.au",
  locale: "en_AU",
  tagline: "Thoughtful, thorough GP care for every stage of life.",
  description:
    "Dr Amanda Henderson is a female family GP in Maroubra, Sydney, with a particular interest in women's health, pregnancy and preconception care, shared antenatal care, children's health and family medicine.",
} as const;

export const practice = {
  // Place of practice - distinct from Dr Henderson (the doctor).
  name: "GP Maroubra",
  streetAddress: "14 Meagher Avenue",
  suburb: "South Maroubra",
  region: "NSW",
  postcode: "2035",
  country: "AU",
  countryName: "Australia",
  phone: "(02) 9311 9311",
  phoneHref: "tel:0293119311",
  // Established online booking provider (HotDoc). Do not build a custom flow.
  bookingUrl:
    "https://www.hotdoc.com.au/medical-centres/maroubra-NSW-2035/gp-maroubra/doctors/dr-amanda-henderson-1",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=14+Meagher+Avenue+South+Maroubra+NSW+2035",
  afterHours: {
    label: "Sydney Medical Service (after-hours home visits)",
    phone: "1300 466 347",
    phoneHref: "tel:1300466347",
    altPhone: "(02) 8724 6300",
    altPhoneHref: "tel:0287246300",
  },
  emergency: {
    label: "In an emergency, always call",
    phone: "000",
    phoneHref: "tel:000",
  },
} as const;

export const fullAddress = `${practice.streetAddress}, ${practice.suburb} NSW ${practice.postcode}`;

// Verified Google Business Profile for Dr Amanda Henderson (her practitioner
// listing - Google entity /g/11w29m2jgw). Used as a sameAs on the Person and
// Physician entities to reconcile the site with her Google profile and reviews.
// This is the share link Google generates for the profile; can be swapped for a
// plain maps.google.com place URL if preferred. Leave "" to omit.
export const googleBusinessProfile = "https://share.google/k1eoAIwoCXWrrA0q1";

// ---------------------------------------------------------------------------
// HotDoc website widget (live availability).
//
// To activate: in the HotDoc dashboard go to Settings → "Website integration"
// (or "Add HotDoc to your website"), copy the embed code, and paste it below as
// a single string. Two kinds of embed are supported:
//   • iframe-based  → paste the <iframe ...></iframe> markup here as-is.
//   • script-based  → paste the markup here; if it includes a <script> tag,
//     tell me and I'll switch the widget to load it via next/script (a plain
//     string can't execute a <script>).
// Leave empty to show the accurate "book online" fallback (no fabricated slot).
// ---------------------------------------------------------------------------
export const hotdocEmbed = "";

// ---------------------------------------------------------------------------
// Verified local / entity signals for the MedicalClinic structured data.
// These strengthen local SEO and the knowledge/local pack, but ONLY when the
// values are confirmed. Leave them empty until verified — empty values are
// omitted from the JSON-LD (never emitted blank), so nothing is invented.
//
// TODO (needs verified input):
//   • openingHours — the practice's real consulting hours, e.g.
//       [{ days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
//          opens: "09:00", closes: "17:00" }]
//     (days use full English weekday names; times are 24-hour "HH:MM").
//   • geo — DONE (geocoded from the address; refine to the GBP pin if needed).
//   • sameAs — verified public profiles that belong to THIS Dr Amanda Henderson
//     / GP Maroubra (e.g. the practice's Google Business Profile URL). Never add
//     an unverified URL or a profile for a different person of the same name.
// ---------------------------------------------------------------------------
export const clinicExtras: {
  openingHours: { days: string[]; opens: string; closes: string }[];
  geo: { latitude: number; longitude: number } | null;
  sameAs: string[];
} = {
  openingHours: [],
  // Geocoded from the practice street address (street-level point on Meagher
  // Avenue, South Maroubra). Refine to the exact Google Business Profile pin
  // when that is confirmed.
  geo: { latitude: -33.952084, longitude: 151.249297 },
  sameAs: [],
};

// Qualifications relevant to Amanda's current focus. Skin-cancer and cosmetic
// certificates are intentionally omitted from the new positioning.
export const qualifications = [
  "MBBS",
  "FRACGP",
  "MAppIFin",
  "BComm",
  "BBus",
] as const;

export const credentials = [
  "Fellow of the Royal Australian College of General Practitioners (FRACGP)",
  "Female family GP in Maroubra, Sydney",
  "Registered shared antenatal care provider - Royal Hospital for Women, Randwick",
] as const;

// Primary navigation - humans first. A small, clear set.
export const nav = [
  { label: "About", href: "/about" },
  { label: "Women's Health", href: "/womens-health" },
  { label: "Pregnancy", href: "/pregnancy-care" },
  { label: "Children's Health", href: "/childrens-health" },
  { label: "General GP Care", href: "/general-gp-care" },
  { label: "Articles", href: "/articles" },
  { label: "Fees", href: "/fees" },
] as const;

export type ServiceArea = {
  slug: string;
  title: string;
  href: string;
  eyebrow: string;
  image: { name: string; alt: string }; // header photo (migrated, in /public/images)
  summary: string; // homepage / card summary
  intro: string; // page lead
  covers: { heading: string; body: string }[];
  whenToSee: string[];
  consultation: string;
  faqs: { q: string; a: string }[];
  related: string[]; // slugs of related service areas
  metaTitle: string;
  metaDescription: string;
  knowsAbout: string[]; // for schema knowsAbout
};

// The core clinical pillars. Skin cancer and cosmetic procedures are
// deliberately absent from this positioning.
export const serviceAreas: ServiceArea[] = [
  {
    slug: "womens-health",
    title: "Women's Health",
    href: "/womens-health",
    eyebrow: "Care across every life stage",
    image: { name: "womens-health", alt: "A woman stretching outdoors at sunset" },
    summary:
      "Contraception, periods and pelvic pain, PCOS, breast concerns, sexual health, perimenopause and menopause - discussed properly and without judgement.",
    intro:
      "Women's health is one of the areas I care for most often, and one I find especially rewarding. Whether it's contraception, difficult periods, a breast concern, or the changes of perimenopause, my aim is the same: to listen carefully, explain your options clearly, and help you make a decision that suits your life.",
    covers: [
      {
        heading: "Contraception",
        body: "From the pill to long-acting options such as the implant (Implanon) and IUDs, we can talk through what might suit your body, your plans and your preferences - and I can arrange or provide most options in the practice.",
      },
      {
        heading: "Periods, pain and PCOS",
        body: "Heavy, painful or irregular periods can have a real impact on everyday life. We can work through what might be causing them - including PCOS, endometriosis, fibroids or iron deficiency - and discuss the options available.",
      },
      {
        heading: "Cervical screening & sexual health",
        body: "Cervical screening (including self-collection), STI testing and vaginal symptoms are routine parts of general practice. A visit should feel private, unhurried and free of judgement.",
      },
      {
        heading: "Breast concerns",
        body: "If you've noticed a lump, pain or change, we can examine it, arrange the right imaging if needed, and explain what happens next - and talk through screening when it's due.",
      },
      {
        heading: "Perimenopause & menopause",
        body: "Hot flushes, sleep changes, mood and brain fog are common and treatable. We can talk through what's happening and the options - including menopausal hormone therapy where appropriate.",
      },
    ],
    whenToSee: [
      "Your periods are heavy, painful, irregular or affecting daily life",
      "You'd like to start, change or review contraception",
      "You've noticed a breast lump, pain or change",
      "You're due for cervical screening or would like STI testing",
      "You're noticing symptoms of perimenopause or menopause",
    ],
    consultation:
      "We'll start by talking through what's brought you in and how it's affecting you. Depending on your concern that might involve an examination, blood tests, a cervical screening test or imaging. I'll explain what I'm looking for, what the options are, and we'll decide on the next step together. Some things are sorted in one visit; others are worth reviewing over time.",
    faqs: [
      {
        q: "Can a GP help with perimenopause and menopause?",
        a: "Yes. A GP is often the best place to start. We can talk through your symptoms, check whether anything else might be contributing, and discuss the options - from lifestyle measures to menopausal hormone therapy (MHT) - referring on only if that's needed.",
      },
      {
        q: "When should I see a GP about heavy periods?",
        a: "It's worth booking if your periods soak through pads or tampons quickly, last more than about a week, come with flooding or large clots, or leave you tired or short of breath. We can look for causes - such as iron deficiency, fibroids, PCOS or endometriosis - and talk through ways to manage them.",
      },
      {
        q: "What contraception can I discuss with a GP?",
        a: "All of it - the pill, mini-pill, vaginal ring, contraceptive implant (Implanon), hormonal and copper IUDs, the injection, and non-hormonal options. We can weigh up effectiveness, bleeding patterns, side effects and your history, and I can start or arrange most options.",
      },
      {
        q: "Can a GP help with PCOS?",
        a: "Yes. A GP can do the initial assessment for polycystic ovary syndrome - history, examination and the relevant tests - and help manage symptoms such as irregular periods, skin changes and fertility questions, involving a specialist when that's helpful.",
      },
      {
        q: "I've found a breast lump - should I see a GP?",
        a: "Yes, please book to have it checked. Most breast changes are not cancer, but a new lump, pain or change deserves an examination and, if needed, the right imaging so you get a clear answer.",
      },
      {
        q: "Do I need a referral for cervical screening?",
        a: "No. Cervical screening is done in general practice, and self-collection is now an option for most people. You can book directly - no referral needed.",
      },
    ],
    related: ["pregnancy-care", "general-gp-care"],
    metaTitle: "Women's Health GP in Maroubra | Dr Amanda Henderson",
    metaDescription:
      "Women's health care in Maroubra with Dr Amanda Henderson: contraception, periods and PCOS, cervical screening, breast concerns, perimenopause and menopause.",
    knowsAbout: [
      "Women's health",
      "Contraception",
      "Cervical screening",
      "Polycystic ovary syndrome",
      "Endometriosis",
      "Menopause",
      "Perimenopause",
    ],
  },
  {
    slug: "pregnancy-care",
    title: "Pregnancy & Preconception Care",
    href: "/pregnancy-care",
    eyebrow: "From planning to postnatal",
    image: { name: "pregnancy", alt: "A pregnant woman cradling her belly in soft light" },
    summary:
      "Preconception planning, shared antenatal care with the Royal Hospital for Women, and looking after you and your baby after the birth.",
    intro:
      "Pregnancy is a good time to have a GP who knows you and can walk alongside you. I offer preconception advice, shared antenatal care with the Royal Hospital for Women, and postnatal care for you and your baby - so much of the journey can be looked after close to home.",
    covers: [
      {
        heading: "Before you conceive",
        body: "Ideally we'd meet a few months before you start trying. We can review your health and medications, check immunity and screening, start folate, and talk through anything specific to you - including planning after 35 or with an existing condition.",
      },
      {
        heading: "Shared antenatal care",
        body: "As a registered shared care provider with the Royal Hospital for Women in Randwick, I can look after much of your routine pregnancy care locally, coordinating with the hospital for your scans, tests and birth.",
      },
      {
        heading: "Through your pregnancy",
        body: "We'll keep an eye on your health and your baby's, arrange the recommended tests and screening, and talk through the everyday questions - food and medication safety, nausea, exercise, and how you're feeling.",
      },
      {
        heading: "After the birth",
        body: "The six-week check looks after both mother and baby. We can also support feeding, sleep, recovery, contraception and perinatal mental health - for as long as you need.",
      },
    ],
    whenToSee: [
      "You're thinking about trying for a baby in the next year",
      "You've had a positive pregnancy test",
      "You'd like shared antenatal care close to home",
      "You're approaching your six-week postnatal check",
      "Pregnancy or new parenthood is feeling hard",
    ],
    consultation:
      "At a first pregnancy visit we'll confirm dates, talk through your health and history, arrange your early tests and screening, and set up a plan for the months ahead - including whether shared care suits you. There's no rush; it's a chance to ask anything that's on your mind.",
    faqs: [
      {
        q: "What is GP shared antenatal care?",
        a: "In shared antenatal care, your routine pregnancy check-ups happen with your GP close to home, while the hospital manages your scans, specialist care and the birth. It means continuity with someone who knows you, with the hospital's expertise behind you.",
      },
      {
        q: "Can a GP do pregnancy shared care with the Royal Hospital for Women?",
        a: "Yes. I'm a registered shared antenatal care provider with the Royal Hospital for Women in Randwick, so many of your routine antenatal visits can happen here in Maroubra, coordinated with the hospital.",
      },
      {
        q: "When should I see a GP before trying to get pregnant?",
        a: "Ideally about three months before you start trying. That gives time to start folate, review your medications and immunity, address any health issues and answer your questions - so you go into pregnancy well prepared.",
      },
      {
        q: "What happens at a pre-pregnancy (preconception) GP appointment?",
        a: "We talk through your health and history, review any medications, check immunity and screening, recommend folate, and discuss anything specific to you - including planning after 35 or with an existing condition.",
      },
      {
        q: "I've had a positive pregnancy test - what happens at the first GP visit?",
        a: "We confirm your dates, talk through your health and history, arrange your early tests and screening, discuss food and medication safety, and set up a plan for the months ahead - including whether shared care suits you.",
      },
      {
        q: "What does the six-week postnatal check involve?",
        a: "It looks after both mother and baby - your recovery, mood and contraception, and your baby's growth, feeding and development. It's also a natural time to raise anything that's been on your mind.",
      },
    ],
    related: ["womens-health", "childrens-health"],
    metaTitle: "Pregnancy & Shared Antenatal Care GP, Maroubra | Dr Amanda Henderson",
    metaDescription:
      "Preconception advice, shared antenatal care with the Royal Hospital for Women, and postnatal care in Maroubra with Dr Amanda Henderson.",
    knowsAbout: [
      "Preconception care",
      "Antenatal care",
      "Shared maternity care",
      "Postnatal care",
      "Perinatal mental health",
    ],
  },
  {
    slug: "childrens-health",
    title: "Children's Health",
    href: "/childrens-health",
    eyebrow: "Babies, children & families",
    image: { name: "children", alt: "A newborn baby's feet cradled in a parent's hands" },
    summary:
      "Newborn and childhood care, feeding and development, immunisations, common illnesses, and taking parents' concerns seriously.",
    intro:
      "Caring for children - and reassuring their parents - is one of the joys of family medicine. From newborn checks and immunisations to feeding, development and the common illnesses of childhood, I try to give parents clear guidance and take their concerns seriously.",
    covers: [
      {
        heading: "Babies & feeding",
        body: "Weight and growth, feeding (breast and bottle), starting solids and introducing allergy foods, sleep and settling - the practical questions of the early months.",
      },
      {
        heading: "Development & checks",
        body: "Routine developmental checks help pick up anything worth watching early. If you have concerns about your child's milestones, movement, speech or behaviour, we can look into them together.",
      },
      {
        heading: "Immunisations",
        body: "I provide the routine childhood immunisations on the National Immunisation Program, and can talk through the schedule and any catch-ups.",
      },
      {
        heading: "Common illnesses & concerns",
        body: "Coughs, fevers, rashes, ears, tummies and childhood eczema - the everyday illnesses of childhood, plus early steps if you have concerns such as ADHD.",
      },
    ],
    whenToSee: [
      "Your baby is due for a check, weigh or immunisation",
      "You have questions about feeding, sleep or starting solids",
      "You're worried about your child's development or behaviour",
      "Your child is unwell and you'd like them seen",
      "You'd like to talk through concerns such as ADHD",
    ],
    consultation:
      "With children I take my time and follow the parent's lead - you know your child best. We'll talk through what you've noticed, examine your child gently, and make a plan together, whether that's simple reassurance, treatment, a review, or a referral if it's needed.",
    faqs: [
      {
        q: "When should I take my child to a GP for a fever?",
        a: "See a GP promptly if your baby is under 3 months old with any fever, or if your child seems very unwell, is difficult to wake, is breathing quickly, has a rash that doesn't fade when pressed, isn't drinking or having wet nappies, or the fever lasts more than a couple of days. If your child is seriously unwell, call 000.",
      },
      {
        q: "What does a GP check at a baby's six-week appointment?",
        a: "The six-week check reviews your baby's growth, feeding, movement and development, includes a gentle physical examination, and is usually when the first scheduled immunisations are given. It's also a chance to check in on how you're going as a parent.",
      },
      {
        q: "When are childhood immunisations due?",
        a: "Routine childhood immunisations follow the National Immunisation Program schedule, starting from birth and continuing through the early years and school age. I can give the routine vaccinations and talk through the schedule and any catch-ups.",
      },
      {
        q: "Can a GP help with my child's eczema?",
        a: "Yes. A GP can diagnose eczema, set up a day-to-day plan (including moisturisers and, when needed, other treatments), help you spot and treat flare-ups, and refer on if it's severe or not settling.",
      },
      {
        q: "I'm worried about my child's development - should I see a GP?",
        a: "Yes - a GP is a good first step. We can talk through what you've noticed, do an initial assessment, and coordinate referral to a paediatrician or allied health if that's the right next step. It's always reasonable to check.",
      },
      {
        q: "Can I talk to a GP about ADHD concerns in my child?",
        a: "Yes. A GP can listen to your concerns, do an initial assessment and help rule out other contributors, then guide you on next steps - which usually involves referral to a paediatrician for formal assessment.",
      },
    ],
    related: ["pregnancy-care", "general-gp-care"],
    metaTitle: "Children's Health GP in Maroubra | Dr Amanda Henderson",
    metaDescription:
      "Family GP care for babies and children in Maroubra: feeding and development, immunisations, common childhood illnesses and parental concerns.",
    knowsAbout: [
      "Paediatrics",
      "Childhood immunisation",
      "Child development",
      "Infant feeding",
      "Childhood eczema",
    ],
  },
  {
    slug: "general-gp-care",
    title: "General GP Care",
    href: "/general-gp-care",
    eyebrow: "Whole-person family medicine",
    image: { name: "lifestyle", alt: "A person walking outdoors, keeping active" },
    summary:
      "The broad range of physical and mental health concerns people bring to their GP - plus preventative health, men's health, travel medicine and lifestyle care.",
    intro:
      "Much of general practice is the everyday work of family medicine: the new symptom, the ongoing condition, the check-up, the referral, and the mental health concern. I care for adults across the whole range of health issues, with an emphasis on prevention and on knowing you over time.",
    covers: [
      {
        heading: "Everyday & ongoing health",
        body: "New symptoms, acute illness, chronic conditions such as blood pressure, cholesterol and diabetes, and coordinating care with specialists and allied health.",
      },
      {
        heading: "Mental health",
        body: "Stress, anxiety, low mood and sleep are common reasons to see a GP. We can talk it through, make a plan, and arrange a mental health care plan or referral where that helps.",
      },
      {
        heading: "Preventative health",
        body: "Health checks, screening, cardiovascular and diabetes risk, immunisations and healthy-lifestyle support - helping you understand and manage your longer-term health.",
      },
      {
        heading: "Men's health",
        body: "The health check men often put off - heart and diabetes risk, blood pressure, prostate discussion, mental health - in a straightforward, practical visit.",
      },
      {
        heading: "Travel medicine",
        body: "Pre-travel consultations covering vaccines, malaria prevention, and staying well abroad - ideally a few weeks before you go.",
      },
      {
        heading: "Lifestyle medicine",
        body: "Weight, sleep, alcohol, smoking and wellbeing - practical, non-judgemental support for the changes you'd like to make.",
      },
    ],
    whenToSee: [
      "You have a new symptom or an ongoing condition to manage",
      "You're due for a general health check or screening",
      "You'd like to talk about your mental health",
      "You have a trip coming up and need travel advice or vaccines",
      "You'd like support with weight, sleep, alcohol or smoking",
    ],
    consultation:
      "A standard consultation is a chance to work through what's brought you in, in the context of your wider health. I'd rather understand the whole picture than treat a symptom in isolation, so we may cover more than one thing, agree what's most important, and plan a review if we need more time.",
    faqs: [
      {
        q: "What does continuity of care with a family GP mean?",
        a: "It means seeing a GP who knows you and your history, so your care builds over time rather than starting from scratch each visit. Continuity is linked to better health and fewer things falling through the cracks - and it's central to how I like to work.",
      },
      {
        q: "What happens at a general health check?",
        a: "We review your history and risk factors - things like blood pressure, cholesterol, diabetes risk, weight, smoking and family history - do any relevant tests, and make a plan for anything that needs attention or follow-up.",
      },
      {
        q: "Can a GP help with my mental health?",
        a: "Yes. Stress, anxiety, low mood and sleep are common reasons to see a GP. We can talk it through and make a plan, and where it helps, arrange a mental health care plan or referral.",
      },
      {
        q: "Can a GP help with men's health checks?",
        a: "Yes. A practical men's health check can cover heart and diabetes risk, blood pressure, weight, mental health and other concerns men often put off - in a straightforward visit.",
      },
      {
        q: "How far in advance should I book a travel appointment?",
        a: "Ideally six to eight weeks before you travel, as some vaccines need time or several doses. If your trip is sooner, it's still worth coming in - we'll do what we can.",
      },
      {
        q: "What should I bring to my first appointment?",
        a: "Bring your Medicare card, any current medications (or a list), details of your past medical history and immunisations if you have them, any recent test results or specialist letters, and a note of what you'd like to cover.",
      },
    ],
    related: ["womens-health", "childrens-health"],
    metaTitle: "General Family Medicine GP in Maroubra | Dr Amanda Henderson",
    metaDescription:
      "Whole-person general practice in Maroubra: everyday and ongoing health, mental health, preventative care, men's health, travel medicine and lifestyle support.",
    knowsAbout: [
      "General practice",
      "Preventive medicine",
      "Men's health",
      "Travel medicine",
      "Lifestyle medicine",
      "Mental health",
    ],
  },
];

export function getServiceArea(slug: string) {
  return serviceAreas.find((s) => s.slug === slug);
}

// "In brief" - a concise, factual, citeable summary shown at the top of each
// clinical hub. Facts only; no promotional language.
export const inBriefByArea: Record<string, string[]> = {
  "womens-health": [
    "Dr Amanda Henderson provides women's health care at GP Maroubra, in South Maroubra.",
    "Common reasons to visit include contraception, heavy or painful periods, PCOS, breast concerns, cervical screening, sexual health, and perimenopause or menopause.",
    "Most concerns can be assessed and managed in general practice, with referral arranged when it's needed.",
    "Cervical screening - including self-collection for most people - is available without a referral.",
  ],
  "pregnancy-care": [
    "Dr Amanda Henderson offers preconception advice, shared antenatal care and postnatal care in Maroubra.",
    "She is a registered shared antenatal care provider with the Royal Hospital for Women, Randwick.",
    "It's ideal to see a GP about three months before trying to conceive.",
    "Much of routine pregnancy care can happen locally, coordinated with the hospital.",
  ],
  "childrens-health": [
    "Dr Amanda Henderson provides family GP care for babies and children at GP Maroubra.",
    "This includes newborn and six-week checks, immunisations, feeding and development, and common childhood illnesses.",
    "A GP is a good first step for concerns about development, behaviour, or conditions such as ADHD.",
    "If a child is seriously unwell, call 000.",
  ],
  "general-gp-care": [
    "Dr Amanda Henderson provides whole-person general practice for adults and families in Maroubra.",
    "This covers everyday and ongoing health, mental health, preventative checks, men's health, travel medicine and lifestyle support.",
    "Care emphasises prevention and continuity - knowing you over time.",
  ],
};

// "Sources and further reading" - reputable Australian sources, per hub.
// Every URL was checked to resolve (HTTP 200) at build time. Do not add a link
// here without confirming it loads.
export type SourceLink = { label: string; url: string; note?: string };

export const furtherReadingByArea: Record<string, SourceLink[]> = {
  "womens-health": [
    { label: "Jean Hailes for Women's Health", url: "https://www.jeanhailes.org.au/", note: "Australian information on periods, PCOS, menopause and more" },
    { label: "Healthdirect - Menopause", url: "https://www.healthdirect.gov.au/menopause" },
    { label: "Healthdirect - Heavy periods", url: "https://www.healthdirect.gov.au/heavy-periods" },
    { label: "Healthdirect - Cervical Screening Test", url: "https://www.healthdirect.gov.au/cervical-screening-test" },
    { label: "RANZCOG", url: "https://ranzcog.edu.au/", note: "Royal Australian and New Zealand College of Obstetricians and Gynaecologists" },
  ],
  "pregnancy-care": [
    { label: "Pregnancy, Birth and Baby", url: "https://www.pregnancybirthbaby.org.au/", note: "Australian Government pregnancy and parenting information" },
    { label: "Royal Hospital for Women, Randwick", url: "https://www.seslhd.health.nsw.gov.au/royal-hospital-for-women" },
    { label: "Healthdirect - Breastfeeding", url: "https://www.healthdirect.gov.au/breastfeeding" },
    { label: "RANZCOG", url: "https://ranzcog.edu.au/" },
  ],
  "childrens-health": [
    { label: "Healthdirect - Fever in children", url: "https://www.healthdirect.gov.au/fever-in-children" },
    { label: "Healthdirect - Child development", url: "https://www.healthdirect.gov.au/child-development" },
    { label: "Healthdirect - Eczema", url: "https://www.healthdirect.gov.au/eczema" },
    { label: "NSW Health", url: "https://www.health.nsw.gov.au/", note: "Immunisation information and services in NSW" },
  ],
  "general-gp-care": [
    { label: "Healthdirect - Men's health", url: "https://www.healthdirect.gov.au/mens-health" },
    { label: "Healthdirect - Travel vaccinations", url: "https://www.healthdirect.gov.au/travel-vaccinations" },
    { label: "Cancer Council Australia", url: "https://www.cancer.org.au/" },
    { label: "RACGP", url: "https://www.racgp.org.au/", note: "Royal Australian College of General Practitioners" },
  ],
};

// "What you can expect" (homepage) - the TANGIBLE experience of a visit: what
// actually happens, how things are communicated, and what gets followed up.
export const expectations = [
  {
    title: "Time to talk properly",
    body: "Appointments that aren't rushed. Bring your list - if there's more than one thing on it, we'll agree what to sort today and what deserves a longer visit.",
  },
  {
    title: "A plan in plain language",
    body: "What's going on, what we're doing about it, and the next step - explained without jargon, and written down when that makes it easier to follow.",
  },
  {
    title: "Options you can weigh up",
    body: "When there's a real choice - a contraceptive, a test, a treatment - I'll lay out the options and the trade-offs, and the decision stays yours.",
  },
  {
    title: "Loose ends followed up",
    body: "I'll chase your results, arrange referrals when you need them, and tell you plainly when something is better handled by a specialist or needs urgent care.",
  },
];

// "How I like to work" (About) - the APPROACH and PHILOSOPHY: the principles
// that shape every consultation, deliberately distinct from the tangible
// "expectations" above and from the About-page introduction.
export const approach = [
  {
    title: "Nothing's too awkward to raise",
    body: "Contraception, sex, low mood, a worry you've carried for months - much of it only improves once it's said out loud. Whatever you bring won't be met with a raised eyebrow.",
  },
  {
    title: "Ask me twice if you need to",
    body: "There's no silly question. If an explanation doesn't land, tell me and I'll try it a different way - I'd far rather that than have you nod along and leave unsure.",
  },
  {
    title: "Honest when it isn't clear-cut",
    body: "Medicine often isn't black and white. When something is genuinely uncertain I'll say so, and we'll decide what's sensible together rather than force a tidy answer.",
  },
  {
    title: "I keep the whole thread",
    body: "Seeing the same families over time means I can join the dots - last year's result, the medication that didn't suit you, the thing we said we'd keep an eye on. You're never starting from scratch.",
  },
];

// Nearby areas for natural local relevance (used sparingly, not as doorway
// pages). Maroubra/South Maroubra are the PRIMARY location; the rest are
// genuinely-served neighbouring suburbs listed as SECONDARY signals only.
// Keep this list to suburbs the practice actually serves - never add a suburb
// for SEO alone.
export const nearbyAreas = [
  "Maroubra",
  "South Maroubra",
  "Coogee",
  "South Coogee",
  "Randwick",
  "Kingsford",
  "Malabar",
  "Matraville",
  "Pagewood",
];

// The practice's single strongest location signal. Never diluted or replaced by
// broader "Eastern Suburbs" terminology in titles, H1s or the NAP.
export const primaryArea = "Maroubra";

// Neighbouring suburbs (everything after Maroubra/South Maroubra) - the
// secondary catchment.
export const neighbouringAreas = nearbyAreas.slice(2);

// Natural-language ", X, Y and Z" fragment from a suburb list, so body copy,
// FAQs and llms.txt stay in sync with `nearbyAreas` (avoids hard-coded, drift-
// prone slices).
export function areasSentence(list: readonly string[] = nearbyAreas): string {
  if (list.length === 0) return "";
  if (list.length === 1) return list[0];
  return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
}

// Practice status surfaced to patients and answer engines. Rendered ONLY when
// `acceptingNewPatients` is a boolean - left null until confirmed, so the site
// never asserts an unverified fact. Set to true/false (and an optional note)
// once the practice confirms.
export const practiceStatus: {
  acceptingNewPatients: boolean | null;
  note: string;
} = {
  acceptingNewPatients: true,
  note: "",
};

// Location / catchment FAQs for the Contact page. Genuine patient questions,
// answered only from facts the site already establishes (address, catchment,
// shared-care arrangement) - not doorway-page filler.
export const locationFaqs: { q: string; a: string }[] = [
  {
    q: "Where is Dr Amanda Henderson's practice?",
    a: `Dr Amanda Henderson consults at ${practice.name}, ${fullAddress} - in South Maroubra, in Sydney's eastern suburbs. Use the "Get directions" link on this page to open the exact location in Google Maps.`,
  },
  {
    q: "Which suburbs does the practice serve?",
    a: `The practice is based in South Maroubra and welcomes patients from across the eastern suburbs, including ${areasSentence()}.`,
  },
  {
    q: "Can I see the GP if I live in Coogee, Randwick or Kingsford?",
    a: `Yes. The practice is in South Maroubra and welcomes patients from neighbouring suburbs such as ${areasSentence(neighbouringAreas)} - most are only a short drive away.`,
  },
  {
    q: "Can much of my pregnancy or ongoing care happen close to home?",
    a: "Often, yes. As a registered shared antenatal care provider with the Royal Hospital for Women in Randwick, Dr Henderson can look after much of your routine pregnancy care in Maroubra, coordinating with the hospital - so more of your care stays local.",
  },
];
