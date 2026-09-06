import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { FiEdit3, FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { openUploadWidget } from "../lib/cloudinary";
import {
  achievementStatusValues,
  deleteAchievement,
  fetchAchievements,
  saveAchievement,
} from "../lib/achievements";

const EMPTY = {
  title: "",
  studentName: "",
  description: "",
  imageUrl: "",
  projectUrl: "",
  status: "draft",
  order: 0,
};

function Frame({ children }) {
  return (
    <>
      <Helmet>
        <title>Student Achievements CMS | Abdullahi Musliudeen</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen bg-[#f6f8fb] px-4 py-6 text-slate-900 dark:bg-[#080c14] dark:text-slate-100 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </>
  );
}

export default function AdminAchievements() {
  const { user, loading, signOut } = useAuth();
  const [authorized, setAuthorized] = useState(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

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
    if (authorized) {
      fetchAchievements({ includeDrafts: true })
        .then(setItems)
        .catch(() => setNotice("Failed to load achievements."));
    }
  }, [authorized]);

  if (loading) return <Frame><p className="py-20 text-center">Loading...</p></Frame>;
  if (!user) return <Navigate to="/admin" replace />;
  if (authorized === null) return <Frame><p className="py-20 text-center">Checking access...</p></Frame>;
  if (!authorized) {
    return (
      <Frame>
        <div className="mx-auto max-w-md py-20 text-center">
          <p className="text-sm text-slate-500">This account is not an active admin.</p>
          <button className="mt-4 text-blue-600" onClick={signOut}>Sign out</button>
        </div>
      </Frame>
    );
  }

  const change = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const openNew = () => {
    setSelected(null);
    setForm(EMPTY);
    setNotice("");
  };
  const openEdit = (item) => {
    setSelected(item);
    setForm(item);
    setNotice("");
  };
  const uploadImage = () =>
    openUploadWidget({
      folder: "portfolio/student-achievements",
      onSuccess: ({ url }) => change("imageUrl", url),
      onError: (error) => setNotice(error.message || "Image upload failed."),
    });
  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    try {
      const result = await saveAchievement(selected?.id, form, { isNew: !selected });
      setItems((current) => {
        const next = current.filter((item) => item.id !== result.id);
        return [...next, result].sort((a, b) => a.order - b.order);
      });
      setSelected(result);
      setForm(result);
      setNotice("Achievement saved.");
    } catch (error) {
      setNotice(error.message || "Failed to save achievement.");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (item) => {
    if (!window.confirm(`Delete ${item.title}?`)) return;
    try {
      await deleteAchievement(item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      if (selected?.id === item.id) openNew();
      setNotice("Achievement deleted.");
    } catch (error) {
      setNotice(error.message || "Failed to delete achievement.");
    }
  };

  return (
    <Frame>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <Link to="/admin" className="text-sm font-bold text-blue-600 dark:text-blue-400">Muwatta CMS</Link>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-500">
          <Link to="/admin">Articles</Link>
          <Link to="/admin/projects">Projects</Link>
          <Link to="/admin/courses">Courses</Link>
          <Link to="/" className="text-blue-600">View site</Link>
        </nav>
      </header>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <section>
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-blue-600">Student outcomes</p><h1 className="mt-1 text-2xl font-bold">Achievements</h1></div>
            <button className="button-primary inline-flex items-center gap-2" onClick={openNew}><FiPlus /> New</button>
          </div>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <article key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                {item.imageUrl && <img src={item.imageUrl} alt="" className="h-12 w-12 rounded-lg object-cover" />}
                <button className="min-w-0 flex-1 text-left" onClick={() => openEdit(item)}>
                  <p className="truncate font-semibold">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.studentName || "Student name not set"} · {item.status}</p>
                </button>
                <button className="p-2 text-blue-600" aria-label={`Edit ${item.title}`} onClick={() => openEdit(item)}><FiEdit3 /></button>
                <button className="p-2 text-red-600" aria-label={`Delete ${item.title}`} onClick={() => remove(item)}><FiTrash2 /></button>
              </article>
            ))}
            {!items.length && <p className="rounded-xl border border-dashed p-6 text-sm text-slate-500">No achievements yet. Add the first standout learner project.</p>}
          </div>
        </section>
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <h2 className="text-lg font-bold">{selected ? "Edit achievement" : "Add achievement"}</h2>
          <label className="label">Achievement title<input className="field" required value={form.title} onChange={(event) => change("title", event.target.value)} placeholder="Built a smart irrigation prototype" /></label>
          <label className="label">Student name<input className="field" value={form.studentName} onChange={(event) => change("studentName", event.target.value)} placeholder="Student name or team" /></label>
          <label className="label">Description<textarea className="field min-h-28" required value={form.description} onChange={(event) => change("description", event.target.value)} placeholder="What did the learner build or achieve?" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="label">Status<select className="field" value={form.status} onChange={(event) => change("status", event.target.value)}>{achievementStatusValues.map((status) => <option key={status}>{status}</option>)}</select></label>
            <label className="label">Display order<input className="field" type="number" min="0" value={form.order} onChange={(event) => change("order", Number(event.target.value))} /></label>
          </div>
          <label className="label">Project link<input className="field" type="url" value={form.projectUrl} onChange={(event) => change("projectUrl", event.target.value)} placeholder="https://..." /></label>
          <div>
            <span className="label">Achievement image</span>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              {form.imageUrl && <img src={form.imageUrl} alt="" className="h-16 w-24 rounded-lg object-cover" />}
              <button type="button" className="button-secondary inline-flex items-center gap-2" onClick={uploadImage}><FiUpload /> Upload image</button>
            </div>
          </div>
          {notice && <p className="text-sm text-blue-600">{notice}</p>}
          <button className="button-primary w-full" disabled={saving}>{saving ? "Saving..." : "Save achievement"}</button>
        </form>
      </div>
    </Frame>
  );
}
