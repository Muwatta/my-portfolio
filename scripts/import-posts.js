/**
 * One-time import of the existing static posts (public/blog/posts/*.json)
 * into the Supabase `blog_posts` table.
 *
 * Usage (from repo root):
 *   VITE_SUPABASE_URL="https://xxxx.supabase.co" \
 *   SUPABASE_SERVICE_ROLE_KEY="sb_secret_service_role_key" \
 *   node scripts/import-posts.js
 *
 * The service role key is required because inserts bypass RLS; do NOT use it
 * in the frontend. It is only used by this local script.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing env vars. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
  process.exit(1);
}

const postsDir = join(process.cwd(), "public", "blog", "posts");
const files = readdirSync(postsDir).filter((f) => f.endsWith(".json"));

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function main() {
  const rows = files.map((f) => {
    const p = JSON.parse(readFileSync(join(postsDir, f), "utf8"));
    return {
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      category: p.category,
      date: p.date,
      image: p.image,
      medium_link: p.medium_link,
      tags: p.tags || [],
      read_time: p.readTime || p.read_time || "5 min read",
      featured: p.featured || false,
    };
  });

  for (const row of rows) {
    const { error } = await supabase.from("blog_posts").insert(row);
    if (error) {
      console.error(`✖ Failed: ${row.title} -> ${error.message}`);
    } else {
      console.log(`✔ Imported: ${row.title}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
