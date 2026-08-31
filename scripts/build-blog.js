import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const postsDir = join(__dirname, "..", "public", "blog", "posts");
const outFile = join(__dirname, "..", "public", "blog.json");

const posts = readdirSync(postsDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(postsDir, f), "utf8")))
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((post, i) => ({ ...post, id: i + 1 }));

writeFileSync(outFile, JSON.stringify(posts, null, 2) + "\n", "utf8");
console.log(`✔ Generated public/blog.json with ${posts.length} posts`);
