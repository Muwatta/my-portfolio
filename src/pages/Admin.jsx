import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import {
  FiArchive,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiLogOut,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
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
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-3 py-4 text-slate-900 dark:bg-[#080c14] dark:text-slate-100 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800 sm:mb-8 sm:gap-4 sm:pb-5">
            <Link to="/admin" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
                A
              </span>
              <span>
                <span className="block text-sm font-bold tracking-tight">
                  Muwatta CMS
                </span>
                <span className="block text-[11px] text-slate-500">
                  Private workspace
                </span>
              </span>
            </Link>
            <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2 text-sm sm:w-auto sm:gap-4">
              <span className="hidden text-slate-500 sm:inline">{title}</span>
              <Link
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                to="/blog"
              >
                View site
              </Link>
              <Link
                className="text-slate-500 hover:text-blue-600"
                to="/admin/projects"
              >
                Projects
              </Link>
              <Link
                className="text-slate-500 hover:text-blue-600"
                to="/admin/courses"
              >
                Courses
              </Link>
              <Link
                to="/admin/achievements"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-slate-700"
              >
                Achievements
              </Link>
            </div>
          </header>
          {children}
        </div>
      </main>
    </>
  );
}

function Panel({ title, children }) {
  return (
    <Shell title={title}>
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {children}
      </div>
    </Shell>
  );
}

function Login({ signIn, isConfigured }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center py-6 sm:min-h-[calc(100vh-10rem)] sm:py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Editorial workspace
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Welcome back.
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Sign in to manage your writing and publish directly to the site.
            </p>
          </div>
          <form
            onSubmit={submit}
            autoComplete="on"
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"
          >
            <label className="block text-sm font-semibold">
              Email
              <input
                className="field"
                type="email"
                name="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold">
              Password
              <span className="relative block">
                <input
                  className="field pr-11"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {showPassword ? (
                    <FiEyeOff aria-hidden="true" />
                  ) : (
                    <FiEye aria-hidden="true" />
                  )}
                </button>
              </span>
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="button-primary w-full" type="submit">
              Sign in
            </button>
            <Link
              className="block text-center text-sm text-blue-600"
              to="/blog"
            >
              Back to blog
            </Link>
          </form>
        </div>
      </div>
    </Shell>
  );
}

function StatusPill({ status }) {
  const styles = {
    published:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    archived:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    draft:
      "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles.draft}`}
    >
      {status || "draft"}
    </span>
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
  const publishedCount = posts.filter(
    (post) => post.status === "published" || post.published,
  ).length;
  const draftCount = posts.filter(
    (post) => (post.status || "draft") === "draft",
  ).length;
  const archivedCount = posts.filter(
    (post) => post.status === "archived",
  ).length;
  return (
    <Shell title="Content Manager">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Content overview
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Your articles
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Write, refine, and publish from one quiet workspace.
          </p>
        </div>
        <button
          className="button-primary inline-flex items-center justify-center gap-2"
          onClick={openNew}
        >
          <FiPlus aria-hidden="true" /> New article
        </button>
      </div>
      <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            label: "All articles",
            value: posts.length,
            icon: FiFileText,
            tone: "text-blue-600 dark:text-blue-400",
          },
          {
            label: "Published",
            value: publishedCount,
            icon: FiCheckCircle,
            tone: "text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Drafts",
            value: draftCount + archivedCount,
            icon: FiClock,
            tone: "text-amber-600 dark:text-amber-400",
          },
        ].map(({ label, value, icon: Icon, tone }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <Icon className={`text-lg ${tone}`} aria-hidden="true" />
            <span>
              <strong className="block text-xl font-black">{value}</strong>
              <span className="text-xs text-slate-500">{label}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-6">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div>
              <h2 className="font-bold">Articles</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                {posts.length} total
              </p>
            </div>
            <button
              className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-400/10"
              onClick={openNew}
              aria-label="Create new article"
              title="Create new article"
            >
              <FiPlus aria-hidden="true" />
            </button>
          </div>
          <div className="max-h-[32rem] space-y-2 overflow-y-auto pr-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`group flex items-center gap-2 rounded-xl border p-2 transition-colors ${selected?.id === post.id ? "border-blue-200 bg-blue-50/70 dark:border-blue-500/40 dark:bg-blue-400/10" : "border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800/60"}`}
              >
                <button
                  className="min-w-0 flex-1 text-left text-sm"
                  onClick={() => openEdit(post)}
                >
                  <span className="block truncate font-semibold">
                    {post.title || "Untitled"}
                  </span>
                  <StatusPill
                    status={
                      post.status || (post.published ? "published" : "draft")
                    }
                  />
                </button>
                <button
                  className="rounded-md p-2 text-slate-400 opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100"
                  aria-label={`Delete ${post.title || "article"}`}
                  title="Delete article"
                  onClick={() => remove(post)}
                >
                  <FiTrash2 aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </aside>
        <form
          onSubmit={save}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {selected ? "Editing article" : "New article"}
              </p>
              <h2 className="mt-1 text-xl font-black">
                {form.title || "Untitled draft"}
              </h2>
            </div>
            {selected && <StatusPill status={form.status} />}
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              <FiEdit3 aria-hidden="true" /> Details
            </div>
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
          </div>
          <div className="space-y-4 border-t border-slate-100 pt-5 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              <FiFileText aria-hidden="true" /> Story
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
          </div>
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
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <button
              className="button-secondary inline-flex min-h-11 w-full items-center justify-center gap-2 sm:w-auto"
              type="button"
              onClick={() => setPreview((current) => !current)}
            >
              <FiEye aria-hidden="true" />
              {preview ? "Hide preview" : "Preview"}
            </button>
            <button
              className="button-primary min-h-11 w-full sm:w-auto"
              disabled={saving}
              type="submit"
            >
              {saving ? "Saving..." : "Save article"}
            </button>
            <button
              className="button-secondary inline-flex min-h-11 w-full items-center justify-center gap-2 sm:w-auto"
              type="button"
              onClick={signOut}
            >
              <FiLogOut aria-hidden="true" />
              Sign out
            </button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
