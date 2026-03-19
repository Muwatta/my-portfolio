import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShareAlt, FaClock } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { Helmet } from "react-helmet-async";

const CATEGORIES = ["All", "Tech", "Education", "IoT", "Frontend"];

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

const ReadTime = ({ time }) =>
  time ? (
    <span className="flex items-center gap-1 text-[10px] font-mono text-slate-600">
      <FaClock className="text-[8px]" /> {time}
    </span>
  ) : null;

const SectionLabel = ({
  children,
  from = "from-blue-400",
  to = "to-cyan-400",
}) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-1 h-5 rounded-full bg-gradient-to-b ${from} ${to}`} />
    <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-slate-500">
      {children}
    </p>
  </div>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetch("/blog.json")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setBlogs(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Couldn't load posts. Make sure /public/blog.json exists.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let r = blogs;
    if (category !== "All") r = r.filter((b) => b.category === category);
    if (search)
      r = r.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          (b.tags || []).some((t) =>
            t.toLowerCase().includes(search.toLowerCase()),
          ),
      );
    setFiltered(r);
  }, [category, search, blogs]);

  const share = (blog) => {
    const url = blog.medium_link || window.location.href;
    if (navigator.share) {
      navigator.share({ title: blog.title, text: blog.excerpt, url });
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId(blog.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const featured = filtered.find((b) => b.featured) || filtered[0];
  const rest = filtered.filter((b) => b.id !== featured?.id);

  return (
    <div
      className="min-h-screen bg-[#06090f] text-slate-200 relative overflow-hidden"
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

      {/* BG */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600 opacity-[0.06] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-600 opacity-[0.06] blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-20">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-[11px] font-mono tracking-[0.28em] uppercase text-blue-400 mb-3">
            Full Stack · Writing
          </p>
          <h1 className="text-5xl sm:text-[4.5rem] font-extrabold text-white leading-[1.05] mb-5">
            The Dev
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              Notebook
            </span>
          </h1>
          <p
            className="text-slate-400 text-[15px] max-w-lg leading-relaxed"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Honest writing on backend systems, React frontends, distributed
            architecture, and teaching tech.
          </p>
        </motion.div>

        {/* SEARCH + FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-12 items-start sm:items-center"
        >
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-[11px]" />
            <input
              type="text"
              placeholder="Search title, topic or tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/60 w-64 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-200"
                style={{
                  backgroundColor: category === cat ? "#2563eb" : "transparent",
                  color: category === cat ? "#fff" : "#475569",
                  border: `1px solid ${category === cat ? "#2563eb" : "#1e293b"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          {!loading && (
            <span className="text-xs font-mono text-slate-600 sm:ml-auto">
              {filtered.length} post{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </motion.div>

        {/* STATES */}
        {loading && (
          <div className="flex items-center gap-3 text-slate-500 text-sm mb-8">
            <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            Loading posts…
          </div>
        )}
        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 mb-8">
            {error}
          </p>
        )}

        {/* FEATURED */}
        <AnimatePresence mode="wait">
          {featured && !loading && !error && (
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-14 group"
            >
              <SectionLabel>Featured</SectionLabel>
              <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-colors duration-300">
                <div className="lg:col-span-7 relative overflow-hidden h-56 lg:h-auto min-h-[300px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/60 hidden lg:block" />
                  <div className="absolute top-4 left-4">
                    <CategoryBadge category={featured.category} />
                  </div>
                </div>
                <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <ReadTime time={featured.readTime} />
                      <span className="text-[10px] font-mono text-slate-600">
                        {featured.date}
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white leading-snug mb-3">
                      {featured.title}
                    </h2>
                    <p
                      className="text-slate-400 text-sm leading-relaxed line-clamp-4"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {featured.excerpt}
                    </p>
                    {featured.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {featured.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-500"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-6 pt-5 border-t border-slate-800">
                    <a
                      href={featured.medium_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      Read article{" "}
                      <HiArrowRight className="transition-transform group-hover/link:translate-x-1" />
                    </a>
                    <button
                      onClick={() => share(featured)}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-blue-400 text-xs transition-colors ml-auto"
                    >
                      <FaShareAlt className="text-[10px]" />{" "}
                      {copiedId === featured.id ? "Copied!" : "Share"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GRID */}
        {rest.length > 0 && !loading && !error && (
          <div className="mb-16">
            <SectionLabel from="from-violet-400" to="to-blue-400">
              All Posts
            </SectionLabel>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
            >
              {rest.map((blog) => (
                <motion.article
                  key={blog.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:border-slate-700 transition-colors duration-300"
                >
                  <div className="overflow-hidden h-44 relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <CategoryBadge category={blog.category} />
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-slate-600">
                        {blog.date}
                      </span>
                      <ReadTime time={blog.readTime} />
                    </div>
                    <h3 className="text-[15px] font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {blog.title}
                    </h3>
                    <p
                      className="text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {blog.excerpt}
                    </p>
                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {blog.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800/80">
                      <a
                        href={blog.medium_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group/link"
                      >
                        Read{" "}
                        <HiArrowRight className="text-[10px] transition-transform group-hover/link:translate-x-0.5" />
                      </a>
                      <button
                        onClick={() => share(blog)}
                        className="flex items-center gap-1 text-slate-600 hover:text-blue-400 text-[11px] transition-colors ml-auto"
                      >
                        <FaShareAlt className="text-[9px]" />{" "}
                        {copiedId === blog.id ? "Copied!" : "Share"}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-5xl mb-5">🔍</p>
            <p className="text-slate-400 text-sm mb-2">
              No posts match{" "}
              <strong className="text-slate-300">"{search || category}"</strong>
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-3 text-blue-400 hover:text-blue-300 text-sm transition-colors underline underline-offset-4"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* DEV HINT — only shows in development */}
        {import.meta.env.DEV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-6"
          >
            <p className="text-xs font-mono text-blue-400 mb-3 uppercase tracking-widest">
              📝 How to add a new post
            </p>
            <p className="text-slate-400 text-xs leading-6 mb-3">
              Open{" "}
              <code className="text-blue-300 bg-slate-800 px-1.5 py-0.5 rounded">
                /public/blog.json
              </code>{" "}
              and add a new object to the array:
            </p>
            <pre className="text-[11px] text-slate-400 bg-slate-950 rounded-lg p-4 overflow-x-auto leading-6 border border-slate-800">{`{
  "id": 5,                          ← next number in sequence
  "title": "Your Post Title",
  "excerpt": "Short teaser shown on cards (1-2 sentences).",
  "body": "Full text.\\n\\nNew paragraph.",
  "category": "Tech",               ← Tech | Education | IoT | Frontend
  "date": "March 19, 2025",
  "image": "https://unsplash.com/…",
  "medium_link": "https://medium.com/@you/slug",
  "tags": ["Django", "API"],
  "readTime": "5 min read",
  "featured": false                 ← only ONE post should be true
}`}</pre>
            <p className="text-slate-600 text-[11px] mt-3">
              💡 This panel is hidden in production builds.
            </p>
          </motion.div>
        )}

        {/* NEWSLETTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/30 p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-violet-900/10 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-blue-400 mb-3">
              Newsletter
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Stay in the loop.
            </h2>
            <p
              className="text-slate-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}
            >
              New posts on full-stack engineering and tech education — no spam,
              ever.
            </p>
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-400 font-bold text-lg"
                >
                  ✓ You're subscribed!
                </motion.p>
              ) : (
                <motion.div key="form" className="flex justify-center">
                  <div className="flex rounded-lg overflow-hidden border border-slate-700 w-full max-w-sm focus-within:border-blue-500 transition-colors">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && email && setSubscribed(true)
                      }
                      className="flex-1 px-4 py-3 bg-slate-900 text-slate-200 text-sm placeholder-slate-600 focus:outline-none"
                    />
                    <button
                      onClick={() => email && setSubscribed(true)}
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
