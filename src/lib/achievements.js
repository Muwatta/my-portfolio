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

export const achievementStatusValues = ["draft", "published", "archived"];

export const asAchievement = (row = {}, id = row.id, order = 0) => ({
  id,
  title: row.title || "",
  description: row.description || "",
  studentName: row.studentName || "",
  imageUrl: row.imageUrl || "",
  projectUrl: row.projectUrl || "",
  status: row.status || "draft",
  order: Number.isFinite(row.order) ? row.order : order,
});

export async function fetchAchievements({ includeDrafts = false } = {}) {
  if (!isFirebaseConfigured || !db) return [];
  const reference = collection(db, "student_achievements");
  const achievementQuery = includeDrafts
    ? query(reference)
    : query(reference, where("status", "==", "published"));
  const snapshot = await getDocs(achievementQuery);
  return snapshot.docs
    .map((item, index) => asAchievement(item.data(), item.id, index))
    .sort((a, b) => a.order - b.order);
}

export async function saveAchievement(id, achievement, { isNew = false } = {}) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured.");
  }
  if (!achievementStatusValues.includes(achievement.status)) {
    throw new Error("Invalid achievement status.");
  }
  const achievementId = String(id || achievement.title).toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!achievementId) throw new Error("Add an achievement title.");
  await setDoc(
    doc(db, "student_achievements", achievementId),
    {
      ...achievement,
      order: Number(achievement.order || 0),
      updatedAt: serverTimestamp(),
      ...(isNew ? { createdAt: serverTimestamp() } : {}),
    },
    { merge: true },
  );
  return asAchievement(achievement, achievementId);
}

export async function deleteAchievement(id) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured.");
  }
  await deleteDoc(doc(db, "student_achievements", String(id)));
}
