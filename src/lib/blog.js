import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, isFirebaseConfigured, storage } from "./firebase";

export const asPublicPost = (row = {}) => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  body: row.body,
  category: row.category,
  date: row.date?.toDate ? row.date.toDate().toISOString() : row.date,
  image: row.image || row.coverImage,
  medium_link: row.medium_link || row.mediumLink,
  tags: row.tags || [],
  readTime: row.read_time || row.readTime,
  featured: Boolean(row.featured),
  published: row.published !== false,
});

export const filterPublicPosts = (posts = []) =>
  posts.filter((post) => post.published !== false);

const fromFirestore = (snapshot) =>
  snapshot.docs.map((item) => ({ id: item.id, ...asPublicPost(item.data()) }));

const fetchLegacyPosts = async (includeDrafts) => {
  const res = await fetch("/blog.json");
  if (!res.ok) throw new Error("Couldn't load posts.");
  const posts = await res.json();
  return includeDrafts ? posts : filterPublicPosts(posts);
};

export async function fetchPosts({ includeDrafts = false } = {}) {
  if (isFirebaseConfigured && db) {
    try {
      const articles = collection(db, "articles");
      const articleQuery = includeDrafts
        ? query(articles)
        : query(articles, where("status", "==", "published"));
      const posts = fromFirestore(await getDocs(articleQuery));
      if (posts.length || includeDrafts) return posts;
    } catch (error) {
      if (includeDrafts) throw error;
    }
  }
  return fetchLegacyPosts(includeDrafts);
}

export async function fetchPost(id) {
  const posts = await fetchPosts();
  return posts.find((post) => String(post.id) === String(id)) || null;
}

export async function createPost(post) {
  if (!isFirebaseConfigured || !db) throw new Error("Firebase is not configured.");
  const status = post.status || (post.published === false ? "draft" : "published");
  const now = serverTimestamp();
  const article = { ...post, status, published: status === "published", publishedAt: status === "published" ? now : null, createdAt: now, updatedAt: now };
  const created = await addDoc(collection(db, "articles"), article);
  return { id: created.id, ...asPublicPost({ ...post, status, published: status === "published" }) };
}

export async function updatePost(id, post) {
  if (!isFirebaseConfigured || !db) throw new Error("Firebase is not configured.");
  const status = post.status || (post.published === false ? "draft" : "published");
  const article = { ...post, status, published: status === "published", updatedAt: serverTimestamp() };
  if (status === "published" && !post.publishedAt) article.publishedAt = serverTimestamp();
  delete article.id;
  delete article.createdAt;
  await updateDoc(doc(db, "articles", id), article);
  return { id, ...asPublicPost({ ...post, status, published: status === "published" }) };
}

export async function deletePost(id) {
  if (!isFirebaseConfigured || !db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "articles", id));
}

export async function uploadArticleCover(file, articleId = crypto.randomUUID()) {
  if (!isFirebaseConfigured || !storage) throw new Error("Firebase is not configured.");
  const snapshot = await uploadBytes(ref(storage, `article-covers/${articleId}/${file.name}`), file, { contentType: file.type });
  return getDownloadURL(snapshot.ref);
}
