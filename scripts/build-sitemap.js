import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.js";

const rootDir = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const siteUrl = "https://www.muwatta.com.ng";
const localEnv = existsSync(join(rootDir, ".env.local"))
  ? Object.fromEntries(
      readFileSync(join(rootDir, ".env.local"), "utf8")
        .split(/\r?\n/)
        .map((line) =>
          line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*["']?(.*?)["']?\s*$/),
        )
        .filter(Boolean)
        .map(([, key, value]) => [key, value]),
    )
  : {};
const posts = JSON.parse(
  readFileSync(join(rootDir, "public", "blog.json"), "utf8"),
).filter((post) => post.published !== false && post.id != null);
const indexablePosts = posts.filter((post) => post.title && post.excerpt);

async function fetchPublishedProjectRoutes() {
  const projectId =
    process.env.VITE_FIREBASE_PROJECT_ID || localEnv.VITE_FIREBASE_PROJECT_ID;
  if (!projectId) return [];
  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects?pageSize=300`,
    );
    if (!response.ok) return [];
    const payload = await response.json();
    return (payload.documents || [])
      .filter(
        (document) => document.fields?.status?.stringValue === "published",
      )
      .map(
        (document) =>
          document.fields?.slug?.stringValue || document.name.split("/").pop(),
      )
      .filter(Boolean)
      .map((slug) => `/portfolio/${slug}`);
  } catch {
    return [];
  }
}

async function main() {
  const cmsProjectRoutes = await fetchPublishedProjectRoutes();
  const routes = [
    "/",
    "/portfolio",
    "/about",
    "/blog",
    "/skills",
    "/contact",
    "/now",
    "/engineering-experience",
    "/resume",
    ...projects.map((project) => `/portfolio/${project.id}`),
    ...cmsProjectRoutes,
    ...indexablePosts.map((post) => `/blog/${post.id}`),
  ];

  const uniqueRoutes = [...new Set(routes)];
  const xml = uniqueRoutes
    .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
    .join("\n");

  writeFileSync(
    join(rootDir, "public", "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xml}\n</urlset>\n`,
    "utf8",
  );
  console.log(
    `✔ Generated public/sitemap.xml with ${uniqueRoutes.length} URLs`,
  );
}

main();
