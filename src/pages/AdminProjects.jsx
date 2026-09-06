import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import {
  FiArchive,
  FiCheck,
  FiEdit3,
  FiEye,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import {
  deleteProject,
  fetchProjects,
  projectStatusValues,
  saveProject,
} from "../lib/projects";

const EMPTY = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  technologies: [],
  category: "Backend",
  imageUrl: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  status: "draft",
  order: 0,
  seoTitle: "",
  seoDescription: "",
  canonicalUrl: "",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const validUrl = (value) => {
  if (!value) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

function StatusPill({ status }) {
  const colors = {
    published:
      "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-400/10",
    archived:
      "text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800",
    draft:
      "text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-400/10",
  };
  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${colors[status] || colors.draft}`}
    >
      {status}
    </span>
  );
}

function AdminFrame({ children }) {
  return (
    <>
      <Helmet>
        <title>Projects CMS | Abdullahi Musliudeen</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen bg-[#f6f8fb] px-4 py-6 text-slate-900 dark:bg-[#080c14] dark:text-slate-100 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
            <Link
              to="/admin"
              className="text-sm font-bold text-blue-600 dark:text-blue-400"
            >
              Muwatta CMS
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/admin" className="text-slate-500 hover:text-blue-600">
                Articles
              </Link>
              <Link to="/admin/courses" className="text-slate-500 hover:text-blue-600">
                Courses
              </Link>
              <Link to="/admin/achievements" className="text-slate-500 hover:text-blue-600">
                Achievements
              </Link>
              <Link to="/blog" className="text-slate-500 hover:text-blue-600">
                View site
              </Link>
            </div>
          </header>
          {children}
        </div>
      </main>
    </>
  );
}

export default function AdminProjects() {
  const { user, loading, signOut } = useAuth();
  const [authorized, setAuthorized] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [technologiesText, setTechnologiesText] = useState("");
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
    if (authorized)
      fetchProjects({ includeDrafts: true })
        .then(setProjects)
        .catch(() => setNotice("Failed to load projects."));
  }, [authorized]);

  if (loading)
    return (
      <AdminFrame>
        <p className="py-20 text-center text-sm text-slate-500">Loading...</p>
      </AdminFrame>
    );
  if (!user) return <Navigate to="/admin" replace />;
  if (authorized === null)
    return (
      <AdminFrame>
        <p className="py-20 text-center text-sm text-slate-500">
          Checking access...
        </p>
      </AdminFrame>
    );
  if (!authorized)
    return (
      <AdminFrame>
        <div className="mx-auto max-w-md py-20 text-center">
          <p className="text-sm text-slate-500">
            This account is not an active admin.
          </p>
          <button className="mt-4 text-blue-600" onClick={signOut}>
            Sign out
          </button>
        </div>
      </AdminFrame>
    );

  const change = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  const openNew = () => {
    setSelected(null);
    setForm(EMPTY);
    setTechnologiesText("");
    setPreview(false);
    setNotice("");
  };
  const openEdit = (project) => {
    setSelected(project);
    setForm({ ...EMPTY, ...project });
    setTechnologiesText(
      (project.technologies || project.tech || []).join(", "),
    );
    setPreview(false);
    setNotice("");
  };
  const openPreview = (project) => {
    if (!project?.id) return;
    window.open(
      `/admin/projects/preview/${project.id}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  const save = async (event) => {
    event.preventDefault();
    if (!form.title || !form.slug || !form.description)
      return setNotice("Title, slug, and full description are required.");
    const urls = [
      form.imageUrl,
      form.githubUrl,
      form.liveUrl,
      form.canonicalUrl,
    ];
    if (urls.some((value) => !validUrl(value)))
      return setNotice("Use complete http:// or https:// URLs.");
    setSaving(true);
    setNotice("");
    try {
      const payload = {
        ...form,
        technologies: technologiesText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };
      const result = await saveProject(selected?.id || payload.slug, payload, {
        isNew: !selected,
      });
      setProjects((current) =>
        selected
          ? current.map((item) => (item.id === selected.id ? result : item))
          : [result, ...current],
      );
      setSelected(result);
      setForm(result);
      setTechnologiesText(result.technologies.join(", "));
      setNotice("Project saved successfully.");
    } catch (error) {
      setNotice(error.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    try {
      await deleteProject(project.id);
      setProjects((current) =>
        current.filter((item) => item.id !== project.id),
      );
      if (selected?.id === project.id) openNew();
    } catch (error) {
      setNotice(error.message || "Failed to delete project.");
    }
  };
  const updateStatus = async (project, status) => {
    try {
      const result = await saveProject(
        project.id,
        { ...project, status },
        { isNew: false },
      );
      setProjects((current) =>
        current.map((item) => (item.id === project.id ? result : item)),
      );
      if (selected?.id === project.id) openEdit(result);
      setNotice(
        `Project ${status === "published" ? "published" : status === "archived" ? "archived" : "returned to draft"}.`,
      );
    } catch (error) {
      setNotice(error.message || "Failed to update project.");
    }
  };

  return (
    <AdminFrame>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Portfolio CMS
          </p>
          <h1 className="text-3xl font-black tracking-tight">Projects</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage the work shown on your public portfolio.
          </p>
        </div>
        <button
          className="button-primary inline-flex items-center justify-center gap-2"
          onClick={openNew}
        >
          <FiPlus /> New project
        </button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-6">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="font-bold">All projects</h2>
            <span className="text-xs text-slate-500">{projects.length}</span>
          </div>
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`group flex gap-2 rounded-xl border p-2 ${selected?.id === project.id ? "border-blue-300 bg-blue-50/70 dark:border-blue-500/40 dark:bg-blue-400/10" : "border-transparent hover:border-slate-200 dark:hover:border-slate-700"}`}
              >
                <button
                  className="min-w-0 flex-1 text-left"
                  onClick={() => openEdit(project)}
                >
                  <span className="block truncate text-sm font-semibold">
                    {project.title}
                  </span>
                  <StatusPill status={project.status} />
                </button>
                <button
                  className="rounded p-2 text-slate-400 hover:text-blue-600"
                  aria-label={`Preview ${project.title}`}
                  onClick={() => openPreview(project)}
                  title="Open preview"
                >
                  <FiEye />
                </button>
                <button
                  className="rounded p-2 text-slate-400 hover:text-red-600"
                  aria-label={`Delete ${project.title}`}
                  onClick={() => remove(project)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </aside>
        <form
          onSubmit={save}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"
        >
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {selected ? "Editing project" : "New project"}
              </p>
              <h2 className="mt-1 text-xl font-black">
                {form.title || "Untitled project"}
              </h2>
            </div>
            {selected && <StatusPill status={form.status} />}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="label">
              Title
              <input
                className="field"
                required
                value={form.title}
                onChange={(event) => change("title", event.target.value)}
              />
            </label>
            <label className="label">
              Slug
              <input
                className="field"
                required
                value={form.slug}
                onChange={(event) =>
                  change("slug", event.target.value || slugify(form.title))
                }
              />
            </label>
            <label className="label">
              Category
              <input
                className="field"
                value={form.category}
                onChange={(event) => change("category", event.target.value)}
              />
            </label>
            <label className="label">
              Status
              <select
                className="field"
                value={form.status}
                onChange={(event) => change("status", event.target.value)}
              >
                {projectStatusValues.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
            <label className="label">
              Display order
              <input
                className="field"
                type="number"
                min="0"
                value={form.order}
                onChange={(event) => change("order", event.target.value)}
              />
            </label>
            <label className="label flex items-center gap-3 pt-7">
              <input
                className="h-4 w-4 accent-blue-600"
                type="checkbox"
                checked={form.featured}
                onChange={(event) => change("featured", event.target.checked)}
              />
              Featured project
            </label>
          </div>
          <label className="label">
            Short description
            <textarea
              className="field"
              rows="3"
              value={form.shortDescription}
              onChange={(event) =>
                change("shortDescription", event.target.value)
              }
            />
          </label>
          <label className="label">
            Full description
            <textarea
              className="field"
              rows="7"
              required
              value={form.description}
              onChange={(event) => change("description", event.target.value)}
            />
          </label>
          <label className="label">
            Technologies
            <input
              className="field"
              placeholder="Django, React, PostgreSQL"
              value={technologiesText}
              onChange={(event) => setTechnologiesText(event.target.value)}
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="label">
              Project image URL
              <input
                className="field"
                type="url"
                value={form.imageUrl}
                onChange={(event) => change("imageUrl", event.target.value)}
              />
              {form.imageUrl && (
                <img
                  className="mt-3 aspect-video w-full rounded-lg object-cover"
                  src={form.imageUrl}
                  alt="Project preview"
                  onError={(event) => {
                    event.currentTarget.hidden = true;
                  }}
                  onLoad={(event) => {
                    event.currentTarget.hidden = false;
                  }}
                />
              )}
            </label>
            <div className="space-y-4">
              <label className="label">
                GitHub URL
                <input
                  className="field"
                  type="url"
                  value={form.githubUrl}
                  onChange={(event) => change("githubUrl", event.target.value)}
                />
              </label>
              <label className="label">
                Live demo URL
                <input
                  className="field"
                  type="url"
                  value={form.liveUrl}
                  onChange={(event) => change("liveUrl", event.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              SEO metadata
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="label">
                SEO title
                <input
                  className="field"
                  value={form.seoTitle}
                  onChange={(event) => change("seoTitle", event.target.value)}
                />
              </label>
              <label className="label">
                Canonical URL
                <input
                  className="field"
                  type="url"
                  value={form.canonicalUrl}
                  onChange={(event) =>
                    change("canonicalUrl", event.target.value)
                  }
                />
              </label>
            </div>
            <label className="label mt-4">
              SEO description
              <textarea
                className="field"
                rows="3"
                value={form.seoDescription}
                onChange={(event) =>
                  change("seoDescription", event.target.value)
                }
              />
            </label>
          </div>
          {notice && (
            <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
              {notice}
            </p>
          )}
          {preview && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 dark:border-blue-500/30 dark:bg-blue-400/5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                Preview
              </p>
              <h3 className="text-2xl font-black">
                {form.title || "Untitled project"}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {form.description ||
                  "Add a description to preview this project."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {technologiesText
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .map((item) => (
                    <span
                      key={item}
                      className="rounded bg-slate-200 px-2 py-1 text-xs dark:bg-slate-800"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <button
              className="button-secondary inline-flex items-center gap-2"
              type="button"
              onClick={() => setPreview((value) => !value)}
            >
              <FiEye />
              {preview ? "Hide preview" : "Preview"}
            </button>
            {selected && (
              <button
                className="button-secondary inline-flex items-center gap-2"
                type="button"
                onClick={() => openPreview(selected)}
              >
                <FiEye />
                Open preview
              </button>
            )}
            <button className="button-primary" disabled={saving} type="submit">
              {saving ? "Saving..." : "Save project"}
            </button>
            {selected && form.status !== "published" && (
              <button
                className="button-secondary inline-flex items-center gap-2"
                type="button"
                onClick={() => updateStatus(selected, "published")}
              >
                <FiCheck />
                Publish
              </button>
            )}
            {selected && form.status === "published" && (
              <button
                className="button-secondary"
                type="button"
                onClick={() => updateStatus(selected, "draft")}
              >
                Unpublish
              </button>
            )}
            {selected && form.status !== "archived" && (
              <button
                className="button-secondary inline-flex items-center gap-2"
                type="button"
                onClick={() => updateStatus(selected, "archived")}
              >
                <FiArchive />
                Archive
              </button>
            )}
          </div>
        </form>
      </div>
    </AdminFrame>
  );
}
