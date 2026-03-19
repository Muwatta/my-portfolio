import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { FaShareAlt, FaClock } from "react-icons/fa";

const TAG_COLORS = {
  Tech: { bg: "#3b82f615", text: "#60a5fa", border: "#3b82f635" },
  Education: { bg: "#10b98115", text: "#34d399", border: "#10b98135" },
  IoT: { bg: "#f59e0b15", text: "#fbbf24", border: "#f59e0b35" },
  Frontend: { bg: "#8b5cf615", text: "#a78bfa", border: "#8b5cf635" },
  default: { bg: "#64748b15", text: "#94a3b8", border: "#64748b35" },
};

const CategoryBadge = ({ category }) => {
  const c = TAG_COLORS[category] || TAG_COLORS.default;
  return (
    <span
      className="text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-[3px] rounded-full"
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
      }}
    >
      {category}
    </span>
  );
};

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/blog.json")
      .then((r) => r.json())
      .then((data) => {
        setAll(data);
        setPost(data.find((b) => b.id === parseInt(id)) || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const idx = allPosts.findIndex((b) => b.id === parseInt(id));
  const prev = allPosts[idx - 1];
  const next = allPosts[idx + 1];

  const share = () => {
    const url = post?.medium_link || window.location.href;
    if (navigator.share)
      navigator.share({ title: post?.title, text: post?.excerpt, url });
    else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── loading ──
  if (loading)
    return (
      <div className="min-h-screen bg-white dark:bg-[#06090f] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );

  // ── 404 ──
  if (!post)
    return (
      <div className="min-h-screen bg-white dark:bg-[#06090f] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 gap-4">
        <p className="text-6xl font-extrabold text-slate-700">404</p>
        <p className="text-sm">Post not found.</p>
        <Link
          to="/blog"
          className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors"
        >
          <HiArrowLeft /> Back to blog
        </Link>
      </div>
    );

  const paragraphs = post.body?.split(/\n+/).filter(Boolean) || [];

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200 relative overflow-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <Helmet>
        <title>{post.title} | Abdullahi Musliudeen</title>
        <meta name="description" content={post.excerpt} />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* BG */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600 opacity-[0.05] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 sm:py-20">
        {/* BACK */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 text-sm transition-colors w-fit"
          >
            <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />{" "}
            Back to Blog
          </Link>
        </motion.div>

        {/* ARTICLE HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <CategoryBadge category={post.category} />
            {post.readTime && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-slate-600">
                <FaClock className="text-[8px]" /> {post.readTime}
              </span>
            )}
            <span className="text-[10px] font-mono text-slate-600">
              {post.date}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p
            className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed border-l-2 border-blue-500 pl-5"
            style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}
          >
            {post.excerpt}
          </p>

          {/* tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* author row */}
          <div className="flex items-center justify-between mt-7 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-slate-700 flex-shrink-0">
                <img
                  src="https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg"
                  alt="Author"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Abdullahi Musliudeen
                </p>
                <p className="text-[10px] text-slate-600">
                  Full Stack Developer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={share}
                className="flex items-center gap-1.5 text-slate-500 hover:text-blue-400 text-xs transition-colors"
              >
                <FaShareAlt className="text-[10px]" />{" "}
                {copied ? "Copied!" : "Share"}
              </button>
              {post.medium_link && (
                <a
                  href={post.medium_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Medium <HiArrowRight className="text-xs" />
                </a>
              )}
            </div>
          </div>
        </motion.header>

        {/* COVER IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden mb-12 border border-slate-200 dark:border-slate-800"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 sm:h-96 object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* BODY */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-slate-300 text-[16px] leading-[1.9] mb-6"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {para}
            </p>
          ))}

          {post.medium_link && (
            <div className="mt-10 p-7 rounded-xl border border-blue-500/20 bg-blue-500/5 text-center">
              <p className="text-slate-400 text-sm mb-4">
                This post continues on Medium with code examples and diagrams.
              </p>
              <a
                href={post.medium_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
              >
                Read full article <HiArrowRight />
              </a>
            </div>
          )}
        </motion.div>

        {/* PREV / NEXT */}
        {(prev || next) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800 pt-10"
          >
            {prev ? (
              <Link
                to={`/blog/${prev.id}`}
                className="group flex flex-col gap-1.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 bg-slate-100/40 dark:bg-slate-900/40 transition-colors"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 flex items-center gap-1">
                  <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />{" "}
                  Previous
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={`/blog/${next.id}`}
                className="group flex flex-col gap-1.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 bg-slate-100/40 dark:bg-slate-900/40 transition-colors text-right"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 flex items-center gap-1 justify-end">
                  Next{" "}
                  <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
