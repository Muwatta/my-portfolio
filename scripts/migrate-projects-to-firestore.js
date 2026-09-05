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
import { projects } from "../src/data/projects.js";

const rootDir = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const readEnv = () => {
  const file = join(rootDir, ".env.local");
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .map((line) =>
        line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*["']?(.*?)["']?\s*$/),
      )
      .filter(Boolean)
      .map(([, key, value]) => [key, value]),
  );
};
const env = { ...readEnv(), ...process.env };
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

const toDocument = (project, order) => ({
  title: project.title || "",
  slug: project.id,
  shortDescription: project.description || "",
  description: project.description || "",
  technologies: project.tech || [],
  category: project.category || "",
  imageUrl: project.image || "",
  githubUrl: project.github || "",
  liveUrl: project.live || "",
  featured: Boolean(project.featured),
  status: "published",
  order,
  seoTitle: `${project.title} | Muwatta`,
  seoDescription: project.description || "",
  canonicalUrl: `https://www.muwatta.com.ng/portfolio/${project.id}`,
  problem: project.problem || "",
  approach: project.approach || "",
  architecture: project.architecture || "",
  engineering: project.engineering || [],
  result: project.result || "",
  metrics: project.metrics || [],
  impact: project.impact || "",
});

async function main() {
  await signInWithEmailAndPassword(
    auth,
    env.FIREBASE_MIGRATION_EMAIL,
    env.FIREBASE_MIGRATION_PASSWORD,
  );
  for (const [order, project] of projects.entries()) {
    const reference = doc(db, "projects", project.id);
    const existing = await getDoc(reference);
    const data = {
      ...toDocument(project, order),
      updatedAt: serverTimestamp(),
    };
    if (!existing.exists()) {
      data.createdAt = serverTimestamp();
      data.publishedAt = serverTimestamp();
    }
    await setDoc(reference, data, { merge: true });
    console.log(`${existing.exists() ? "Updated" : "Imported"}: ${project.id}`);
  }
}
main().catch((error) => {
  console.error(`Project migration failed: ${error.message}`);
  process.exit(1);
});
