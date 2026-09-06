import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { courses as legacyCourses } from "../data/courses";

const STATUS_VALUES = ["draft", "published", "archived"];

export const courseStatusValues = STATUS_VALUES;

export const asCourse = (row = {}, id = row.id, order = 0) => ({
  ...row,
  id,
  slug: row.slug || id,
  title: row.title || "",
  category: row.category || "Backend",
  level: row.level || "Beginner",
  duration: row.duration || "",
  price: Number(row.price || 0),
  featured: Boolean(row.featured),
  description: row.description || "",
  lessons: Array.isArray(row.lessons) ? row.lessons : [],
  youtubeUrl: row.youtubeUrl || "",
  trialVideoUrl: row.trialVideoUrl || "",
  trialText: row.trialText || "",
  status: row.status || "published",
  order: Number.isFinite(row.order) ? row.order : order,
});

const fallbackCourses = () =>
  legacyCourses.map((course, index) => asCourse(course, course.slug, index));

const sortCourses = (items) =>
  [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export async function fetchCourses({ includeDrafts = false } = {}) {
  if (isFirebaseConfigured && db) {
    try {
      const reference = collection(db, "courses");
      const courseQuery = includeDrafts
        ? query(reference)
        : query(reference, where("status", "==", "published"));
      const snapshot = await getDocs(courseQuery);
      const items = snapshot.docs.map((item) => asCourse(item.data(), item.id));
      if (items.length || includeDrafts) return sortCourses(items);
    } catch (error) {
      console.warn("Falling back to static courses:", error);
    }

  }
  return sortCourses(fallbackCourses());
}

export async function fetchCourse(slug, options = {}) {
  const items = await fetchCourses(options);
  return items.find((course) => course.slug === slug || course.id === slug) || null;
}

export async function saveCourse(id, course, { isNew = false } = {}) {
  if (!isFirebaseConfigured || !db)
    throw new Error("Firebase is not configured.");
  if (!STATUS_VALUES.includes(course.status))
    throw new Error("Invalid course status.");
  const courseId = String(id || course.slug);
  const data = {
    ...course,
    slug: course.slug || courseId,
    lessons: course.lessons || [],
    price: Number(course.price || 0),
    order: Number(course.order || 0),
    featured: Boolean(course.featured),
    updatedAt: serverTimestamp(),
    ...(isNew ? { createdAt: serverTimestamp() } : {}),
  };
  await setDoc(doc(db, "courses", courseId), data, { merge: true });
  return asCourse({ ...course, ...data }, courseId);
}

export async function deleteCourse(id) {
  if (!isFirebaseConfigured || !db)
    throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "courses", String(id)));
}

export async function enrollInCourse(userId, course) {
  if (!isFirebaseConfigured || !db)
    throw new Error("Firebase is not configured.");
  if (!userId) throw new Error("Sign in before enrolling.");
  await setDoc(
    doc(db, "users", userId, "enrollments", course.slug),
    {
      courseSlug: course.slug,
      courseTitle: course.title,
      status: "active",
      enrolledAt: serverTimestamp(),
    },
    { merge: true },
  );
}
