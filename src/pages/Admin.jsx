import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { createPost, deletePost, fetchPosts, updatePost } from "../lib/blog";

const EMPTY = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  category: "Tech",
  date: new Date().toISOString().slice(0, 10),
  image: "",
  medium_link: "",
  tags: [],
  readTime: "5 min read",
  featured: false,
  status: "draft",
};
const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function Shell({ title, children }) {
  return (
    <>
      <Helmet>
        <title>{title} | Abdullahi Musliudeen</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">{title}</h1>
            <Link className="text-sm text-blue-600" to="/blog">
              View blog
            </Link>
          </div>
          {children}
        </div>
      </main>
    </>
  );
}

function Panel({ title, children }) {
  return (
    <Shell title={title}>
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {children}
      </div>
    </Shell>
  );
}

function Login({ signIn, isConfigured }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  if (!isConfigured)
    return (
      <Panel title="Firebase is not configured">
        Add the VITE_FIREBASE_* values from `.env.example` before signing in.
      </Panel>
    );
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signIn(email, password);
    } catch (nextError) {
      setError(nextError.message || "Unable to sign in.");
    }
  };
  return (
    <Shell title="Admin Login">
      <form
        onSubmit={submit}
        className="mx-auto max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <label className="block text-sm font-semibold">
          Email
          <input
            className="field"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input
            className="field"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="button-primary w-full" type="submit">
          Sign in
        </button>
        <Link className="block text-center text-sm text-blue-600" to="/blog">
          Back to blog
        </Link>
      </form>
    </Shell>
  );
}

export default function AdminPage() {
  const { user, loading, signIn, signOut, isConfigured } = useAuth();
  const [authorized, setAuthorized] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [tagsText, setTagsText] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!user || !db) {
      setAuthorized(user ? false : null);
      return;
    }
    getDoc(doc(db, "admin_users", user.uid))
      .then((snapshot) =>
        setAuthorized(
          snapshot.exists() &&
            snapshot.data().role === "admin" &&
            snapshot.data().active === true,
        ),
      )
      .catch(() => setAuthorized(false));
  }, [user]);
  useEffect(() => {
    if (!user || !authorized) return;
    fetchPosts({ includeDrafts: true })
      .then(setPosts)
      .catch(() =>
        setNotice(
          "Could not load articles. Check the Firestore deployment and indexes.",
        ),
      );
  }, [user, authorized]);

  if (loading) return <Panel title="Loading" />;
  if (!user) return <Login signIn={signIn} isConfigured={isConfigured} />;
  if (authorized === null) return <Panel title="Checking access" />;
  if (!authorized)
    return (
      <Panel title="Access denied">
        This Firebase account is not listed as an admin.
        <button className="mt-4 block mx-auto text-blue-600" onClick={signOut}>
          Sign out
        </button>
      </Panel>
    );
  if (window.location.pathname === "/admin/login")
    return <Navigate to="/admin" replace />;

  const openNew = () => {
    setSelected(null);
    setForm({ ...EMPTY, date: new Date().toISOString().slice(0, 10) });
    setTagsText("");
    setNotice("");
  };
  const openEdit = (post) => {
    setSelected(post);
    setForm({ ...EMPTY, ...post, date: String(post.date || "").slice(0, 10) });
    setTagsText((post.tags || []).join(", "));
    setNotice("");
  };
  const change = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: tagsText
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      const result = selected
        ? await updatePost(selected.id, payload)
        : await createPost(payload);
      setPosts((current) =>
        selected
          ? current.map((post) => (post.id === result.id ? result : post))
          : [result, ...current],
      );
      setSelected(result);
      setForm({ ...payload, id: result.id });
      setNotice("Article saved.");
    } catch (error) {
      setNotice(error.message || "Unable to save article.");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (post) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    await deletePost(post.id);
    setPosts((current) => current.filter((item) => item.id !== post.id));
    if (selected?.id === post.id) openNew();
  };
  return (
    <Shell title="Content Manager">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Articles</h2>
            <button className="button-primary" onClick={openNew}>
              New
            </button>
          </div>
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-2 rounded-lg border border-slate-100 p-2 dark:border-slate-800"
              >
                <button
                  className="min-w-0 flex-1 text-left text-sm"
                  onClick={() => openEdit(post)}
                >
                  <span className="block truncate font-semibold">
                    {post.title || "Untitled"}
                  </span>
                  <span className="text-xs text-slate-500">
                    {post.status || (post.published ? "published" : "draft")}
                  </span>
                </button>
                <button
                  className="text-xs text-red-600"
                  onClick={() => remove(post)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </aside>
        <form
          onSubmit={save}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold">
              Title
              <input
                className="field"
                required
                value={form.title}
                onChange={(event) => change("title", event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold">
              Slug
              <input
                className="field"
                required
                value={form.slug}
                onChange={(event) => change("slug", event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold">
              Status
              <select
                className="field"
                value={form.status}
                onChange={(event) => change("status", event.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Date
              <input
                className="field"
                type="date"
                value={form.date}
                onChange={(event) => change("date", event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold">
              Category
              <input
                className="field"
                value={form.category}
                onChange={(event) => change("category", event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold">
              Read time
              <input
                className="field"
                value={form.readTime}
                onChange={(event) => change("readTime", event.target.value)}
              />
            </label>
          </div>
          <label className="block text-sm font-semibold">
            Excerpt
            <textarea
              className="field"
              rows="3"
              value={form.excerpt}
              onChange={(event) => change("excerpt", event.target.value)}
            />
          </label>
          <label className="block text-sm font-semibold">
            Body
            <textarea
              className="field"
              rows="14"
              required
              value={form.body}
              onChange={(event) => change("body", event.target.value)}
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold">
              Tags
              <input
                className="field"
                placeholder="react, firebase"
                value={tagsText}
                onChange={(event) => setTagsText(event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold">
              Cover image
              <input
                className="field"
                type="url"
                placeholder="https://example.com/cover.jpg"
                value={form.image}
                onChange={(event) => change("image", event.target.value)}
              />
              <span className="mt-1 block text-xs font-normal text-slate-500">
                Firebase Storage requires a paid billing plan. Use an image URL
                on the free plan.
              </span>
            </label>
          </div>
          <label className="block text-sm font-semibold">
            Medium link
            <input
              className="field"
              type="url"
              value={form.medium_link}
              onChange={(event) => change("medium_link", event.target.value)}
            />
          </label>
          {notice && <p className="text-sm text-blue-700">{notice}</p>}
          {preview && (
            <article className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
              {form.image && (
                <img
                  className="mb-4 max-h-64 w-full rounded-lg object-cover"
                  src={form.image}
                  alt=""
                />
              )}
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                {form.category} · {form.status}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold">
                {form.title || "Untitled article"}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{form.excerpt}</p>
              <div className="mt-5 space-y-3 text-sm leading-7">
                {(form.body || "Write the article body to preview it.")
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={`${index}-${paragraph.slice(0, 12)}`}>
                      {paragraph}
                    </p>
                  ))}
              </div>
            </article>
          )}
          <div className="flex gap-3">
            <button
              className="button-secondary"
              type="button"
              onClick={() => setPreview((current) => !current)}
            >
              {preview ? "Hide preview" : "Preview"}
            </button>
            <button className="button-primary" disabled={saving} type="submit">
              {saving ? "Saving..." : "Save article"}
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
