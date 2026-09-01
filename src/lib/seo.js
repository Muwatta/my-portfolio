export const SITE = {
  name: "Abdullahi Musliudeen",
  title: "Abdullahi Musliudeen — Backend Engineer & Full-Stack Developer",
  description:
    "Backend Engineer & Full-Stack Developer. I build production systems with Django, Django REST Framework, PostgreSQL, Redis, Celery, and React/TypeScript.",
  url: "https://muwatta.com.ng",
  canonical: "https://muwatta.com.ng/",
  twitter: "@MusliudeenAbdu1",
  locale: "en_NG",
  image:
    "https://res.cloudinary.com/dee5edoss/image/upload/w_600,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg",
};

export const openGraphImage = SITE.image;

export const defaultSeoMeta = {
  siteName: SITE.name,
  locale: SITE.locale,
  twitterHandle: SITE.twitter,
  image: SITE.image,
  url: SITE.canonical,
};
