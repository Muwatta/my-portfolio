export const SITE = {
  name: "Muwatta",
  title:
    "Muwatta | Abdullahi Musliudeen — Software Engineer, Technology Educator & Builder",
  description:
    "Portfolio of Abdullahi Musliudeen, a Nigerian software engineer, technology educator, and builder working across backend systems, React, embedded systems, AI, and IoT.",
  url: "https://www.muwatta.com.ng",
  canonical: "https://www.muwatta.com.ng/",
  twitter: "@MusliudeenAbdu1",
  locale: "en_NG",
  image:
    "https://res.cloudinary.com/dee5edoss/image/upload/w_600,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg",
};

export const PERSON_ID = `${SITE.url}/#person`;

export const pageUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/"
    ? SITE.canonical
    : `${SITE.url}${normalizedPath.replace(/\/$/, "")}`;
};

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Abdullahi Oladipupo Musliudeen",
  givenName: "Abdullahi",
  familyName: "Musliudeen",
  alternateName: ["Abdullahi Musliudeen", "Muwatta"],
  url: SITE.url,
  image: SITE.image,
  jobTitle: "Software Engineer, Technology Educator & Builder",
  description: SITE.description,
  knowsAbout: [
    "Python",
    "Django",
    "Django REST Framework",
    "React",
    "TypeScript",
    "REST APIs",
    "PostgreSQL",
    "EdTech",
    "Embedded Systems",
    "Arduino",
    "ESP32",
    "Raspberry Pi",
    "Artificial Intelligence",
    "IoT",
    "Arabic Education",
  ],
  sameAs: [
    "https://github.com/muwatta",
    "https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
  },
};

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.title,
      alternateName: ["Muwatta", "Abdullahi Musliudeen portfolio"],
      description: SITE.description,
      publisher: { "@id": PERSON_ID },
      inLanguage: "en-NG",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE.url}/#webpage`,
      url: SITE.canonical,
      name: SITE.title,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": PERSON_ID },
      description: SITE.description,
    },
  ],
};

export const absoluteUrl = (value) =>
  value?.startsWith("http") ? value : `${SITE.url}${value || "/"}`;

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const openGraphImage = SITE.image;

export const defaultSeoMeta = {
  siteName: SITE.name,
  locale: SITE.locale,
  twitterHandle: SITE.twitter,
  image: SITE.image,
  url: SITE.canonical,
};
