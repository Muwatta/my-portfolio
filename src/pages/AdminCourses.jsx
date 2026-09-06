import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import {
  courseStatusValues,
  deleteCourse,
  fetchCourses,
  saveCourse,
} from "../lib/courses";

const EMPTY = {
  title: "",
  slug: "",
  category: "Backend",
  level: "Beginner",
  duration: "",
  price: 0,
  featured: false,
  description: "",
  lessons: [],
  youtubeUrl: "",
  trialVideoUrl: "",
  trialText: "",
  status: "draft",
  order: 0,
};

const slugify = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Frame({ children }) {
  return (
    <>
      <Helmet>
        <title>Courses CMS | Abdullahi Musliudeen</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-3 py-4 text-slate-900 dark:bg-[#080c14] dark:text-slate-100 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800 sm:mb-8 sm:pb-5">
            <Link to="/admin" className="font-bold text-blue-600 dark:text-blue-400">
              Muwatta CMS
            </Link>
            <nav className="flex w-full flex-wrap gap-x-4 gap-y-2 text-sm sm:w-auto">
              <Link to="/admin" className="text-slate-500 hover:text-blue-600">Articles</Link>
              <Link to="/admin/projects" className="text-slate-500 hover:text-blue-600">Projects</Link>
              <Link to="/courses" className="text-slate-500 hover:text-blue-600">View courses</Link>
            </nav>
          </header>
          {children}
        </div>
      </main>
    </>
  );
}

export default function AdminCourses() {
  const { user, loading, signOut } = useAuth();
  const [authorized, setAuthorized] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [lessonsText, setLessonsText] = useState("");
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
    if (authorized)
      fetchCourses({ includeDrafts: true })
        .then(setCourses)
        .catch(() => setNotice("Failed to load courses."));
  }, [authorized]);

  if (loading) return <Frame><p className="py-20 text-center text-sm text-slate-500">Loading...</p></Frame>;
  if (!user) return <Navigate to="/admin" replace />;
  if (authorized === null) return <Frame><p className="py-20 text-center text-sm text-slate-500">Checking access...</p></Frame>;
  if (!authorized)
    return <Frame><div className="py-20 text-center text-sm text-slate-500">This account is not an active admin.<button className="mt-4 block mx-auto text-blue-600" onClick={signOut}>Sign out</button></div></Frame>;

  const change = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const openNew = () => {
    setSelected(null);
    setForm(EMPTY);
    setLessonsText("");
    setNotice("");
  };
  const openEdit = (course) => {
    setSelected(course);
    setForm({ ...EMPTY, ...course });
    setLessonsText((course.lessons || []).join("\n"));
    setNotice("");
  };
  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        lessons: lessonsText.split("\n").map((item) => item.trim()).filter(Boolean),
      };
      const result = await saveCourse(selected?.id || payload.slug, payload, { isNew: !selected });
      setCourses((current) => selected ? current.map((item) => item.id === selected.id ? result : item) : [result, ...current]);
      setSelected(result);
      setForm(result);
      setLessonsText(result.lessons.join("\n"));
      setNotice("Course saved.");
    } catch (error) {
      setNotice(error.message || "Failed to save course.");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (course) => {
    if (!window.confirm(`Delete "${course.title}"?`)) return;
    await deleteCourse(course.id);
    setCourses((current) => current.filter((item) => item.id !== course.id));
    if (selected?.id === course.id) openNew();
  };
  const field = (label, key, props = {}) => (
    <label className="block text-sm font-semibold">
      {label}
      <input className="field" value={form[key]} onChange={(event) => change(key, event.target.value)} {...props} />
    </label>
  );

  return (
    <Frame>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Course catalog</p><h1 className="mt-2 text-3xl font-black">Courses</h1><p className="mt-2 text-sm text-slate-500">Manage the courses shown on your public site.</p></div>
        <button className="button-primary inline-flex min-h-11 items-center justify-center gap-2" onClick={openNew}><FiPlus /> New course</button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-6">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800"><strong>All courses</strong><span className="text-xs text-slate-500">{courses.length}</span></div>
          <div className="max-h-80 space-y-1 overflow-y-auto">
            {courses.map((course) => <div key={course.id} className="group flex items-center gap-2 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800"><button className="min-w-0 flex-1 truncate text-left text-sm font-semibold" onClick={() => openEdit(course)}>{course.title || "Untitled"}</button><button className="rounded p-2 text-slate-400 hover:text-red-600" aria-label={`Delete ${course.title}`} onClick={() => remove(course)}><FiTrash2 /></button></div>)}
          </div>
        </aside>
        <form onSubmit={save} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="grid gap-4 md:grid-cols-2">
            {field("Title", "title", { required: true })}
            {field("Slug", "slug", { required: true })}
            {field("Category", "category", { required: true })}
            {field("Level", "level", { required: true })}
            {field("Duration", "duration", { placeholder: "6 weeks" })}
            {field("Price", "price", { type: "number", min: 0 })}
            <label className="block text-sm font-semibold">Status<select className="field" value={form.status} onChange={(event) => change("status", event.target.value)}>{courseStatusValues.map((status) => <option key={status}>{status}</option>)}</select></label>
            {field("Display order", "order", { type: "number", min: 0 })}
          </div>
          <label className="block text-sm font-semibold">Description<textarea className="field" rows="4" required value={form.description} onChange={(event) => change("description", event.target.value)} /></label>
          <label className="block text-sm font-semibold">Lessons <span className="font-normal text-slate-500">(one per line)</span><textarea className="field" rows="6" value={lessonsText} onChange={(event) => setLessonsText(event.target.value)} /></label>
          {field("Trial video URL", "trialVideoUrl", { type: "url", placeholder: "https://www.youtube.com/watch?v=..." })}
          <label className="block text-sm font-semibold">Trial lesson text<textarea className="field" rows="5" value={form.trialText} onChange={(event) => change("trialText", event.target.value)} placeholder="Give learners a useful preview of the first lesson." /></label>
          {field("YouTube URL", "youtubeUrl", { type: "url" })}
          <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.featured} onChange={(event) => change("featured", event.target.checked)} /> Featured course</label>
          {notice && <p className="text-sm text-blue-700 dark:text-blue-300">{notice}</p>}
          <div className="grid gap-3 sm:flex sm:flex-wrap"><button className="button-primary min-h-11 w-full sm:w-auto" disabled={saving}>{saving ? "Saving..." : "Save course"}</button><button className="button-secondary min-h-11 w-full sm:w-auto" type="button" onClick={signOut}>Sign out</button></div>
        </form>
      </div>
    </Frame>
  );
}
