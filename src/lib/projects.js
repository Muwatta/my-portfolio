import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { getProjectById, projects as legacyProjects } from "../data/projects";

const STATUS_VALUES = ["draft", "published", "archived"];

export const projectStatusValues = STATUS_VALUES;

export const legacyProjectToDocument = (project, order = 0) => ({
  title: project.title || "",
  slug: project.slug || project.id || "",
  shortDescription: project.shortDescription || project.description || "",
  description: project.description || "",
  technologies: project.technologies || project.tech || [],
  category: project.category || "",
  imageUrl: project.imageUrl || project.image || "",
  githubUrl: project.githubUrl || project.github || "",
  liveUrl: project.liveUrl || project.live || "",
  featured: Boolean(project.featured),
  status: project.status || "published",
  order: Number.isFinite(project.order) ? project.order : order,
  seoTitle: project.seoTitle || "",
  seoDescription:
    project.seoDescription ||
    project.shortDescription ||
    project.description ||
    "",
  canonicalUrl: project.canonicalUrl || "",
});

export const asProject = (row = {}, id = row.id, order) => {
  const normalized = legacyProjectToDocument({ ...row, id }, order);
  return {
    ...normalized,
    id,
    tech: normalized.technologies,
    image: normalized.imageUrl,
    github: normalized.githubUrl,
    live: normalized.liveUrl,
    problem: row.problem,
    approach: row.approach,
    architecture: row.architecture,
    engineering: row.engineering || [],
    result: row.result,
    metrics: row.metrics || [],
    impact: row.impact,
  };
};

const sortProjects = (items) =>
  [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const legacyFallback = () =>
  legacyProjects.map((project, index) => asProject(project, project.id, index));

export async function fetchProjects({ includeDrafts = false } = {}) {
  if (isFirebaseConfigured && db) {
    const projectsQuery = includeDrafts
      ? query(collection(db, "projects"))
      : query(collection(db, "projects"), where("status", "==", "published"));
    const snapshot = await getDocs(projectsQuery);
    const items = snapshot.docs.map((item) => asProject(item.data(), item.id));
    if (items.length || includeDrafts) return sortProjects(items);
  }
  return sortProjects(legacyFallback());
}

export async function fetchProject(id, { includeDrafts = false } = {}) {
  const normalizedId = String(id ?? "").trim();
  if (isFirebaseConfigured && db && normalizedId) {
    const directSnapshot = await getDoc(doc(db, "projects", normalizedId));
    if (directSnapshot.exists()) {
      const project = asProject(directSnapshot.data(), directSnapshot.id);
      if (includeDrafts || project.status === "published") return project;
      return null;
    }

    const slugSnapshot = await getDocs(
      query(collection(db, "projects"), where("slug", "==", normalizedId)),
    );
    if (!slugSnapshot.empty) {
      const firstMatch = slugSnapshot.docs[0];
      const project = asProject(firstMatch.data(), firstMatch.id);
      if (includeDrafts || project.status === "published") return project;
      return null;
    }
  }

  const legacy =
    getProjectById(normalizedId) ||
    legacyProjects.find((project) => project.slug === normalizedId);
  if (!legacy) return null;
  const normalized = asProject(legacy, legacy.id);
  if (includeDrafts || normalized.status === "published") return normalized;
  return null;
}

export async function saveProject(id, project, { isNew = false } = {}) {
  if (!isFirebaseConfigured || !db)
    throw new Error("Firebase is not configured.");
  if (!STATUS_VALUES.includes(project.status))
    throw new Error("Invalid project status.");
  const projectId = String(id || project.slug);
  const reference = doc(db, "projects", projectId);
  const data = {
    ...project,
    technologies: project.technologies || [],
    order: Number(project.order || 0),
    featured: Boolean(project.featured),
    updatedAt: serverTimestamp(),
    ...(isNew ? { createdAt: serverTimestamp() } : {}),
    ...(project.status === "published" && !project.publishedAt
      ? { publishedAt: serverTimestamp() }
      : {}),
  };
  await setDoc(reference, data, { merge: true });
  return asProject({ ...project, ...data }, projectId);
}

export async function deleteProject(id) {
  if (!isFirebaseConfigured || !db)
    throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "projects", String(id)));
}
