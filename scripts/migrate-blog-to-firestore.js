import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const rootDir = join(fileURLToPath(new URL(".", import.meta.url)), "..");

function readLocalEnv() {
  const envPath = join(rootDir, ".env.local");
  if (!existsSync(envPath)) return {};
  return Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .map((line) =>
        line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*["']?(.*?)["']?\s*$/),
      )
      .filter(Boolean)
      .map(([, key, value]) => [key, value]),
  );
}

const env = { ...readLocalEnv(), ...process.env };
const required = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
  "FIREBASE_MIGRATION_EMAIL",
  "FIREBASE_MIGRATION_PASSWORD",
];
const missing = required.filter((key) => !env[key]);

if (missing.length) {
  console.error(
    `Missing migration environment variables: ${missing.join(", ")}`,
  );
  process.exit(1);
}

if (env.VITE_FIREBASE_PROJECT_ID !== "muwatta-portfolio") {
  console.error("VITE_FIREBASE_PROJECT_ID must be muwatta-portfolio.");
  process.exit(1);
}

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});
const auth = getAuth(app);
const db = getFirestore(app);
const posts = JSON.parse(
  readFileSync(join(rootDir, "public", "blog.json"), "utf8"),
);

async function main() {
  await signInWithEmailAndPassword(
    auth,
    env.FIREBASE_MIGRATION_EMAIL,
    env.FIREBASE_MIGRATION_PASSWORD,
  );

  for (const post of posts) {
    const id = String(post.id);
    if (!post.id) throw new Error(`Article is missing an id: ${post.title}`);
    const articleRef = doc(db, "articles", id);
    const existing = await getDoc(articleRef);
    const status =
      post.status || (post.published === false ? "draft" : "published");
    const article = {
      id,
      slug: post.slug || id,
      title: post.title || "",
      excerpt: post.excerpt || "",
      body: post.body || "",
      category: post.category || "",
      date: post.date || "",
      image: post.image || "",
      medium_link: post.medium_link || post.mediumLink || "",
      tags: post.tags || [],
      readTime: post.readTime || post.read_time || "5 min read",
      featured: Boolean(post.featured),
      published: status === "published",
      status,
      updatedAt: serverTimestamp(),
    };
    if (!existing.exists()) article.createdAt = serverTimestamp();
    if (status === "published" && !existing.data()?.publishedAt) {
      article.publishedAt = serverTimestamp();
    }
    await setDoc(articleRef, article, { merge: true });
    console.log(
      `${existing.exists() ? "Updated" : "Imported"}: ${id} ${post.title}`,
    );
  }
}

main().catch((error) => {
  console.error(`Migration failed: ${error.message}`);
  process.exit(1);
});
