import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShareAlt } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { Helmet } from "react-helmet-async";

const CATEGORIES = ["All", "Tech", "Education", "IoT", "Frontend"];

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

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/blog.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = blogs;
    if (category !== "All")
      result = result.filter((b) => b.category === category);
    if (searchTerm)
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    setFilteredBlogs(result);
  }, [category, searchTerm, blogs]);

  const sharePost = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: blog.medium_link,
      });
    } else {
      navigator.clipboard.writeText(blog.medium_link);
      alert("Link copied to clipboard!");
    }
  };

  const featured = filteredBlogs[0];
  const rest = filteredBlogs.slice(1);

  return (
    <div
      className="min-h-screen bg-[#070b12] text-slate-200 relative overflow-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <Helmet>
        <title>Blog | Abdullahi Musliudeen Oladipupo</title>
        <meta
          name="description"
          content="Writing on full-stack engineering, backend systems, education, and tech."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-700 opacity-[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-violet-700 opacity-[0.07] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-20">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-blue-400 mb-3">
            Writing & Thinking
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4">
            The Dev
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Notebook
            </span>
          </h1>
          <p className="text-slate-400 text-base max-w-lg leading-relaxed">
            Notes on full-stack engineering, backend systems, IoT, and teaching
            tech to the next generation.
          </p>
        </motion.div>

        {/* ── SEARCH + FILTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center"
        >
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 w-56 transition-colors"
              aria-label="Search blog posts"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: category === cat ? "#3b82f6" : "transparent",
                  color: category === cat ? "#fff" : "#64748b",
                  border: `1px solid ${category === cat ? "#3b82f6" : "#1e293b"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── LOADING / ERROR ── */}
        {loading && (
          <div className="flex items-center gap-3 text-slate-500 text-sm mb-8">
            <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            Loading posts...
          </div>
        )}
        {error && <p className="text-red-400 text-sm mb-8">{error}</p>}

        {/* ── FEATURED POST ── */}
        {featured && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-14 group"
          >
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-4">
              Featured
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50">
              <div className="lg:col-span-3 relative overflow-hidden h-56 lg:h-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60 hidden lg:block" />
              </div>
              <div className="lg:col-span-2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <CategoryTag category={featured.category} />
                    <span className="text-xs font-mono text-slate-500">
                      {featured.date}
                    </span>
                  </div>
                  <h2
                    className="text-2xl font-extrabold text-white leading-snug mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <a
                    href={featured.medium_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group/link"
                  >
                    Read article
                    <HiArrowRight className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                  <button
                    onClick={() => sharePost(featured)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-blue-400 text-xs transition-colors"
                  >
                    <FaShareAlt /> Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── POSTS GRID ── */}
        {rest.length > 0 && !loading && !error && (
          <div className="mb-16">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-6">
              All Posts
            </p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
            >
              {rest.map((blog) => (
                <motion.article
                  key={blog.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -4 }}
                  className="group rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="overflow-hidden h-44">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryTag category={blog.category} />
                      <span className="text-[10px] font-mono text-slate-600">
                        {blog.date}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 flex-1">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800">
                      <a
                        href={blog.medium_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group/link"
                      >
                        Read
                        <HiArrowRight className="text-[10px] transition-transform group-hover/link:translate-x-0.5" />
                      </a>
                      <button
                        onClick={() => sharePost(blog)}
                        className="flex items-center gap-1 text-slate-600 hover:text-blue-400 text-xs transition-colors ml-auto"
                      >
                        <FaShareAlt className="text-[10px]" /> Share
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && !error && filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-slate-400 text-sm">
              No posts match your search.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCategory("All");
              }}
              className="mt-4 text-blue-400 text-sm hover:text-blue-300 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* ── NEWSLETTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center"
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-blue-400 mb-3">
            Newsletter
          </p>
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Stay in the loop.
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
            Get new posts on full-stack engineering, backend systems, and tech
            education — straight to your inbox.
          </p>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-400 font-semibold"
            >
              ✓ You're subscribed!
            </motion.p>
          ) : (
            <div className="flex justify-center">
              <div className="flex rounded-lg overflow-hidden border border-slate-700 max-w-sm w-full">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-900 text-slate-200 text-sm placeholder-slate-600 focus:outline-none"
                  aria-label="Email for newsletter"
                />
                <button
                  onClick={() => email && setSubscribed(true)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
