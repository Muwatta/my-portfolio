import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.js";

const rootDir = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const siteUrl = "https://www.muwatta.com.ng";
const posts = JSON.parse(
  readFileSync(join(rootDir, "public", "blog.json"), "utf8"),
).filter((post) => post.published !== false && post.id != null);
const indexablePosts = posts.filter((post) => post.title && post.excerpt);

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
  ...indexablePosts.map((post) => `/blog/${post.id}`),
];

const xml = routes
  .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
  .join("\n");

writeFileSync(
  join(rootDir, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xml}\n</urlset>\n`,
  "utf8",
);
console.log(`✔ Generated public/sitemap.xml with ${routes.length} URLs`);
