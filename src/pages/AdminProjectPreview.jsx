import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Seo from "../components/seo/Seo";
import { fetchProject } from "../lib/projects";
import { useAuth } from "../context/AuthContext";
import { useAdminGuard } from "../hooks/useAdminGuard";

export default function AdminProjectPreview() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { authorized } = useAdminGuard();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !authorized) {
      if (authorized !== null) setLoading(false);
      return undefined;
    }

    let active = true;
    setLoading(true);
    setError("");
    fetchProject(id, { includeDrafts: true })
      .then((result) => {
        if (!active) return;
        setProject(result);
      })
      .catch(() => {
        if (!active) return;
        setError("Project preview is unavailable.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id, user, authorized]);

  if (authLoading || (user && authorized === null)) {
    return (
      <main className="always-dark min-h-screen bg-slate-950 px-4 py-24 text-center text-slate-300">
        Checking access...
      </main>
    );
  }

  if (!user || !authorized) return <Navigate to="/admin" replace />;

  if (loading) {
    return (
      <main className="always-dark min-h-screen bg-slate-950 px-4 py-24 text-center text-slate-300">
        Loading project preview...
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="always-dark min-h-screen bg-slate-950 px-4 py-24 text-center text-slate-300">
        <Helmet>
          <title>Project preview unavailable</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1 className="text-3xl font-bold text-white">Preview unavailable</h1>
        <p className="mt-4 text-slate-400">
          {error || "This project could not be loaded."}
        </p>
        <Link to="/admin/projects" className="mt-8 inline-block text-blue-400">
          Back to admin projects
        </Link>
      </main>
    );
  }

  return (
    <>
      <Seo
        title={project.seoTitle || `${project.title} | Muwatta`}
        description={
          project.seoDescription ||
          project.shortDescription ||
          project.description
        }
        path={`/portfolio/${project.id}`}
        image={project.image || project.imageUrl}
        robots="noindex, nofollow"
      />
      <main className="always-dark min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
                Preview
              </p>
              <h1 className="mt-2 text-3xl font-black">{project.title}</h1>
            </div>
            <Link to="/admin/projects" className="text-sm text-blue-400">
              Back to Projects
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            {project.imageUrl || project.image ? (
              <img
                src={project.imageUrl || project.image}
                alt={project.title}
                className="h-64 w-full object-cover sm:h-80"
              />
            ) : null}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">{project.category}</p>
            <p className="mt-4 text-slate-300">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(project.technologies || project.tech || []).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
            {(project.githubUrl ||
              project.github ||
              project.liveUrl ||
              project.live) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {(project.githubUrl || project.github) && (
                  <a
                    href={project.githubUrl || project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white"
                  >
                    GitHub
                  </a>
                )}
                {(project.liveUrl || project.live) && (
                  <a
                    href={project.liveUrl || project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Live demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
