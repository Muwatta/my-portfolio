import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { FaShareAlt } from "react-icons/fa";

const TAG_COLORS = {
  Tech: { bg: "#3b82f620", text: "#60a5fa", border: "#3b82f640" },
  Education: { bg: "#10b98120", text: "#34d399", border: "#10b98140" },
  IoT: { bg: "#f59e0b20", text: "#fbbf24", border: "#f59e0b40" },
  Frontend: { bg: "#8b5cf620", text: "#a78bfa", border: "#8b5cf640" },
  default: { bg: "#64748b20", text: "#94a3b8", border: "#64748b40" },
};

const CategoryTag = ({ category }) => {
  const c = TAG_COLORS[category] || TAG_COLORS.default;
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
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
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/blog.json")
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
        const found = data.find((b) => b.id === parseInt(id));
        setPost(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blog data:", err);
        setLoading(false);
      });
  }, [id]);

  const currentIndex = allPosts.findIndex((b) => b.id === parseInt(id));
  const prev = allPosts[currentIndex - 1];
  const next = allPosts[currentIndex + 1];

  const sharePost = () => {
    if (!post) return;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: post.medium_link,
      });
    } else {
      navigator.clipboard.writeText(post.medium_link);
      alert("Link copied!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b12] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#070b12] flex flex-col items-center justify-center text-slate-400">
        <p className="text-5xl mb-4">404</p>
        <p className="mb-6 text-sm">Post not found.</p>
        <Link
          to="/blog"
          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
        >
          <HiArrowLeft /> Back to blog
        </Link>
      </div>
    );
  }

  // Split body into paragraphs for better readability
  const paragraphs = post.body ? post.body.split(/\n+/).filter(Boolean) : [];

  return (
    <div
      className="min-h-screen bg-[#070b12] text-slate-200 relative overflow-hidden"
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

      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-700 opacity-[0.06] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 sm:py-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="flex items-center gap-2 text-slate-500 hover:text-blue-400 text-sm transition-colors group"
          >
            <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </motion.div>

        {/* ── ARTICLE HEADER ── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <CategoryTag category={post.category} />
            <span className="text-xs font-mono text-slate-500">
              {post.date}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p
            className="text-lg text-slate-400 leading-relaxed border-l-2 border-blue-500 pl-4"
            style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}
          >
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-slate-700">
                <img
                  src="https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg"
                  alt="Author"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-300">
                  Abdullahi Musliudeen
                </p>
                <p className="text-[10px] text-slate-500">
                  Full Stack Developer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={sharePost}
                className="flex items-center gap-1.5 text-slate-500 hover:text-blue-400 text-xs transition-colors"
              >
                <FaShareAlt className="text-[10px]" /> Share
              </button>
              {post.medium_link && (
                <a
                  href={post.medium_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Read on Medium <HiArrowRight className="text-xs" />
                </a>
              )}
            </div>
          </div>
        </motion.header>

        {/* ── COVER IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden mb-12 border border-slate-800"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 sm:h-96 object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* ── ARTICLE BODY ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-slate-300 text-base leading-8 mb-6"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {para}
              </p>
            ))
          ) : (
            <p
              className="text-slate-300 text-base leading-8"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {post.body}
            </p>
          )}

          {post.medium_link && (
            <div className="mt-10 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 text-center">
              <p className="text-slate-400 text-sm mb-4">
                Continue reading the full article on Medium
              </p>
              <a
                href={post.medium_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
              >
                Read full article <HiArrowRight />
              </a>
            </div>
          )}
        </motion.div>

        {/* ── PREV / NEXT ── */}
        {(prev || next) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-10"
          >
            {prev ? (
              <Link
                to={`/blog/${prev.id}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-800 hover:border-blue-500/40 bg-slate-900/40 transition-colors"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1">
                  <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />{" "}
                  Previous
                </span>
                <span className="text-sm font-bold text-slate-300 line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                to={`/blog/${next.id}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-800 hover:border-blue-500/40 bg-slate-900/40 transition-colors text-right"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1 justify-end">
                  Next{" "}
                  <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm font-bold text-slate-300 line-clamp-2">
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
