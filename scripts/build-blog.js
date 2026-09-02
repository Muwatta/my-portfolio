import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const rootDir = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const postsDir = join(rootDir, "public", "blog", "posts");
const markdownDir = join(rootDir, "content", "blog");
const outFile = join(rootDir, "public", "blog.json");

const legacyPosts = existsSync(postsDir)
  ? readdirSync(postsDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(readFileSync(join(postsDir, f), "utf8")))
  : [];

const markdownPosts = existsSync(markdownDir)
  ? readdirSync(markdownDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const source = readFileSync(join(markdownDir, f), "utf8");
        const { data, content } = matter(source);
        return { ...data, body: content.trim() };
      })
  : [];

const posts = [...legacyPosts, ...markdownPosts]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((post, i) => ({ ...post, id: post.id || i + 1 }));

writeFileSync(outFile, JSON.stringify(posts, null, 2) + "\n", "utf8");
console.log(`✔ Generated public/blog.json with ${posts.length} posts`);
