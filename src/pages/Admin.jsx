import { Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-extrabold mb-3">Content Manager</h1>
        <p className="text-slate-500 mb-6">
          Open the GitHub-backed content manager to create and edit blog posts.
        </p>
        <a
          href="/admin/"
          className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white"
        >
          Open Content Manager
        </a>
        <Link to="/blog" className="block mt-4 text-sm text-blue-500">
          Back to blog
        </Link>
      </div>
    </main>
  );
}
