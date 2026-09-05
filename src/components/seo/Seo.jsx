import { Helmet } from "react-helmet-async";
import { pageUrl, SITE } from "../../lib/seo";

/**
 * Reusable, consistent SEO meta for every page.
 *
 * Always renders a canonical URL, Open Graph and Twitter/X tags so that
 * social shares and search crawlers see the same signal as the <head> tags
 * in index.html. Pass `path` as the absolute path on the site (e.g. "/work").
 */
export default function Seo({
  title = SITE.title,
  description = SITE.description,
  path = "/",
  image = SITE.image,
  type = "website",
  jsonLd,
  robots = "index, follow",
  children,
}) {
  const url = pageUrl(path);
  const canonical = url;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Abdullahi Oladipupo Musliudeen" />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${title} image`} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:creator" content={SITE.twitter} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}

      {children}
    </Helmet>
  );
}
