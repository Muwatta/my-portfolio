import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { SITE } from "../lib/seo";

export const NotFound = () => {
  return (
    <div
      className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200 relative overflow-hidden flex items-center justify-center px-4"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <Helmet>
        <title>Page Not Found | Abdullahi Musliudeen</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={SITE.canonical} />
      </Helmet>

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600 opacity-[0.06] blur-[160px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-md"
      >
        <p className="text-[11px] font-mono tracking-[0.28em] uppercase text-blue-400 mb-4">
          Error 404
        </p>
        <h1 className="text-7xl sm:text-8xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
          404
        </h1>
        <p
          className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-8"
          style={{ fontFamily: "'Lora', serif" }}
        >
          This page doesn't exist — it may have been moved or the link is
          broken.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
