import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaArrowLeft,
  FaCheck,
  FaImage,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured } from "../lib/supabase";
import { fetchPosts, createPost, updatePost, deletePost } from "../lib/blog";

const EMPTY = {
  title: "",
  excerpt: "",
  body: "",
  category: "Tech",
  date: "",
  image: "",
  medium_link: "",
  tags: [],
  readTime: "5 min read",
  featured: false,
  published: true,
};

const CATEGORIES = ["Tech", "Education", "IoT", "Frontend"];

export default function AdminPage() {
  const { user, loading, signIn, signOut } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [tagsText, setTagsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const publishedCount = posts.filter(
    (post) => post.published !== false,
  ).length;
  const draftCount = posts.filter((post) => post.published === false).length;

  const load = async () => {
    setLoadingPosts(true);
    try {
      const data = await fetchPosts({ includeDrafts: true });
      setPosts(data);
    } catch {
      setMsg({ type: "error", text: "Couldn't load posts." });
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (user && isSupabaseConfigured) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isSupabaseConfigured]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setAuthError(err.message || "Login failed.");
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setTagsText("");
    setSelected(null);
  };

  const openEdit = (post) => {
    setSelected(post);
    setForm({
      ...post,
      date: typeof post.date === "string" ? post.date.slice(0, 10) : post.date,
    });
    setTagsText((post.tags || []).join(", "));
    window.scrollTo(0, 0);
  };

  const openNew = () => {
    reset();
    setForm({ ...EMPTY, date: new Date().toISOString().slice(0, 10) });
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    try {
      await deletePost(post.id);
      setPosts((p) => p.filter((x) => x.id !== post.id));
      if (selected?.id === post.id) reset();
      setMsg({ type: "success", text: "Post deleted." });
    } catch {
      setMsg({ type: "error", text: "Delete failed." });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const payload = {
      ...form,
      published: Boolean(form.published),
      featured: Boolean(form.featured),
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (selected) {
        const updated = await updatePost(selected.id, payload);
        setPosts((p) => p.map((x) => (x.id === updated.id ? updated : x)));
        setMsg({ type: "success", text: "Post updated." });
      } else {
        const created = await createPost(payload);
        setPosts((p) => [created, ...p]);
        setSelected(created);
        setForm({ ...payload, id: created.id });
        setMsg({ type: "success", text: "Post created." });
      }
    } catch {
      setMsg({ type: "error", text: "Save failed. Check your connection." });
    } finally {
      setSaving(false);
    }
  };

  // ── Not configured / loading / login screens ──
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <p className="text-5xl mb-4">🔒</p>
          <h1 className="text-2xl font-extrabold mb-3">Admin not configured</h1>
          <p className="text-slate-500 text-sm mb-6">
            Set <code className="text-blue-400">VITE_SUPABASE_URL</code> and{" "}
            <code className="text-blue-400">VITE_SUPABASE_ANON_KEY</code> to use
            the admin editor.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
          >
            <FaArrowLeft /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#06090f] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <Helmet>
            <title>Admin Login | Abdullahi Musliudeen</title>
            <meta name="robots" content="noindex" />
          </Helmet>
          <div className="mb-8 text-center">
            <p className="text-5xl mb-4">🔐</p>
            <h1 className="text-2xl font-extrabold">Admin Login</h1>
            <p className="text-slate-500 text-sm mt-1">
              Sign in to manage published content and private drafts
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 p-6 space-y-4"
          >
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-blue-500"
            />
            {authError && <p className="text-red-400 text-xs">{authError}</p>}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
            >
              Sign in
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 text-sm"
            >
              <FaArrowLeft /> Back to blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Editor ──
  return (
    <div className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200">
      <Helmet>
        <title>Admin | Abdullahi Musliudeen</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 text-sm mb-3"
            >
              <FaArrowLeft /> View blog
            </Link>
            <h1 className="text-3xl font-extrabold">CMS Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">
              Logged in as <span className="text-blue-400">{user.email}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={openNew}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <FaPlus /> New Post
            </button>
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm flex items-center gap-2 hover:border-red-400 hover:text-red-400 transition-colors"
            >
              <FaSignOutAlt /> Sign out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
              Total
            </p>
            <p className="mt-3 text-3xl font-bold">{posts.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
              Published
            </p>
            <p className="mt-3 text-3xl font-bold">{publishedCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
              Drafts
            </p>
            <p className="mt-3 text-3xl font-bold">{draftCount}</p>
          </div>
        </div>

        {msg && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-sm border flex items-center gap-2 ${
              msg.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <FaCheck className="text-xs" /> {msg.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* POSTS LIST */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
              Posts ({posts.length})
            </h2>
            {loadingPosts ? (
              <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            ) : (
              <div className="space-y-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`group flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selected?.id === post.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600"
                    }`}
                    onClick={() => openEdit(post)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{post.title}</p>
                      <p className="text-[10px] font-mono text-slate-500">
                        {post.category} · {String(post.date).slice(0, 10)}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(post);
                        }}
                        className="p-2 rounded-lg text-slate-500 hover:text-blue-400"
                        aria-label={`Edit ${post.title}`}
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post);
                        }}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-400"
                        aria-label={`Delete ${post.title}`}
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EDITOR FORM */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
              {selected ? "Edit Post" : "New Post"}
            </h2>
            <form
              onSubmit={handleSave}
              className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 p-6"
            >
              <Field label="Title">
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Excerpt">
                <textarea
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Body">
                <textarea
                  required
                  rows={10}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className={inputCls}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Date">
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Tags (comma separated)">
                  <input
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    placeholder="Django, API"
                    className={inputCls}
                  />
                </Field>
                <Field label="Read Time">
                  <input
                    value={form.readTime}
                    onChange={(e) =>
                      setForm({ ...form, readTime: e.target.value })
                    }
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Cover Image URL">
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://…"
                  className={inputCls}
                />
              </Field>
              <Field label="Medium Link">
                <input
                  value={form.medium_link}
                  onChange={(e) =>
                    setForm({ ...form, medium_link: e.target.value })
                  }
                  placeholder="https://medium.com/…"
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                  />
                  Featured post
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                  />
                  Publish immediately
                </label>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold transition-colors"
              >
                {saving ? "Saving…" : selected ? "Update Post" : "Create Post"}
              </button>
              {selected && (
                <button
                  type="button"
                  onClick={reset}
                  className="w-full py-2 rounded-lg text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Cancel edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-blue-500";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
