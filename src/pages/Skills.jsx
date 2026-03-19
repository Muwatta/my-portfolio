import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const SKILLS = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "HTML5",
    "CSS3",
  ],
  backend: [
    "Python",
    "Django",
    "Django REST Framework",
    "Node.js",
    "REST APIs",
    "JWT Auth",
    "RBAC",
  ],
  database: ["PostgreSQL", "Redis", "Database Design", "Query Optimization"],
  devops: [
    "Docker",
    "Docker Compose",
    "GitHub Actions",
    "CI/CD",
    "Linux",
    "Git",
  ],
  async: ["Celery", "RabbitMQ", "WebSockets", "Background Jobs"],
};

const PROFICIENCY = [
  { label: "Python & Django", value: 90, color: "#3b82f6" },
  { label: "React & Next.js", value: 82, color: "#8b5cf6" },
  { label: "PostgreSQL", value: 80, color: "#06b6d4" },
  { label: "REST API Design", value: 88, color: "#10b981" },
  { label: "Docker & CI/CD", value: 72, color: "#f59e0b" },
  { label: "TypeScript", value: 75, color: "#ec4899" },
];

const TIMELINE = [
  {
    year: "2025",
    role: "Backend Engineer Trainee",
    org: "ALX ProDev",
    type: "work",
    desc: "Built and shipped production-grade backend systems: APIs, async tasks, caching, and deployment pipelines.",
  },
  {
    year: "2024–Present",
    role: "Founder & Technical Lead",
    org: "Algorise Tech Explorers",
    type: "work",
    desc: "Leads backend-focused training, mentors students, and designs full technical curricula.",
  },
  {
    year: "2025",
    role: "ALX ProDev Backend Engineering",
    org: "Python & Django",
    type: "edu",
    desc: "Completed intensive program with E-commerce backend capstone.",
  },
  {
    year: "2019–2024",
    role: "B.A. Arabic Education",
    org: "Ahmadu Bello University, Zaria",
    type: "edu",
    desc: "Graduated with strong analytical and communication foundations.",
  },
];

const PROJECTS = [
  {
    name: "Project Nexus",
    tag: "E-commerce Backend",
    stack: ["Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    desc: "Production-style backend with JWT auth, Redis caching, async task queues, and full CI/CD pipeline.",
    accent: "#3b82f6",
  },
  {
    name: "LMS Backend",
    tag: "Learning Management",
    stack: ["Django REST", "PostgreSQL", "Celery", "JWT"],
    desc: "Secure multi-role API with background email notifications and modular architecture.",
    accent: "#8b5cf6",
  },
  {
    name: "Airbnb & Travel APIs",
    tag: "Platform Backend",
    stack: ["Django", "PostgreSQL", "GitHub Actions"],
    desc: "Relational models, RESTful endpoints, and automated deployment workflows.",
    accent: "#06b6d4",
  },
];

const CodeLine = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="font-mono text-xs leading-relaxed"
  >
    {children}
  </motion.div>
);

const SkillPill = ({ label, color = "#3b82f6" }) => (
  <motion.span
    whileHover={{ scale: 1.07, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="px-3 py-1 rounded-md text-xs font-semibold border cursor-default select-none"
    style={{
      borderColor: color + "55",
      color: color,
      backgroundColor: color + "12",
    }}
  >
    {label}
  </motion.span>
);

const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-violet-500" />
    <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400">
      {children}
    </h2>
  </div>
);

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimateBars(true), 600);
    return () => clearTimeout(t);
  }, []);

  const tabColors = {
    frontend: "#8b5cf6",
    backend: "#3b82f6",
    database: "#06b6d4",
    devops: "#10b981",
    async: "#f59e0b",
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-200 relative overflow-hidden">
      <Helmet>
        <title>Skills | Abdullahi Musliudeen Oladipupo</title>
        <meta
          name="description"
          content="Full Stack Developer — Python, Django, React, PostgreSQL, Docker."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-[120px] bg-blue-600 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-[100px] bg-violet-600 pointer-events-none" />

      <div
        className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-20"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {/* ── HERO HEADER ── */}
        <div className="flex flex-col lg:flex-row items-start gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0"
          >
            <div className="w-28 h-28 rounded-2xl overflow-hidden ring-1 ring-slate-700">
              <img
                src="https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg"
                alt="Abdullahi Musliudeen Oladipupo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-green-400 ring-2 ring-[#080c14]" />
          </motion.div>

          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs tracking-[0.25em] uppercase text-blue-400 mb-2 font-mono"
            >
              Full Stack Developer · Educator · Founder
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl font-extrabold leading-tight text-white mb-4"
            >
              Abdullahi
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400">
                Musliudeen
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-slate-400 text-sm max-w-xl leading-relaxed mb-6"
            >
              I architect full-stack systems end-to-end — from React interfaces
              to Django APIs, PostgreSQL schemas, Redis caches, and Docker-based
              CI/CD pipelines. I also found and run Algorise Tech Explorers,
              mentoring the next generation of engineers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-4"
            >
              <a
                href="/resume.pdf"
                download
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
              >
                Download CV
              </a>
              <a
                href="https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 text-sm font-semibold transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://x.com/MusliudeenAbdu1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 text-sm font-semibold transition-colors"
              >
                X ↗
              </a>
            </motion.div>
          </div>

          {/* Code snippet card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden xl:block w-72 rounded-xl bg-slate-900 border border-slate-800 p-5 flex-shrink-0"
          >
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-slate-500 font-mono">
                stack.py
              </span>
            </div>
            <CodeLine delay={0.6}>
              <span className="text-violet-400">class</span>{" "}
              <span className="text-blue-300">Developer</span>
              <span className="text-slate-500">:</span>
            </CodeLine>
            <CodeLine delay={0.7}>
              <span className="text-slate-500 ml-4">frontend</span>{" "}
              <span className="text-slate-400">=</span>{" "}
              <span className="text-green-400">"React"</span>
            </CodeLine>
            <CodeLine delay={0.8}>
              <span className="text-slate-500 ml-4">backend</span>{" "}
              <span className="text-slate-400">=</span>{" "}
              <span className="text-green-400">"Django"</span>
            </CodeLine>
            <CodeLine delay={0.9}>
              <span className="text-slate-500 ml-4">db</span>{" "}
              <span className="text-slate-400">=</span>{" "}
              <span className="text-green-400">"PostgreSQL"</span>
            </CodeLine>
            <CodeLine delay={1.0}>
              <span className="text-slate-500 ml-4">infra</span>{" "}
              <span className="text-slate-400">=</span>{" "}
              <span className="text-green-400">"Docker"</span>
            </CodeLine>
            <CodeLine delay={1.1}>&nbsp;</CodeLine>
            <CodeLine delay={1.2}>
              <span className="text-violet-400 ml-4">def</span>{" "}
              <span className="text-yellow-300">ship</span>
              <span className="text-slate-400">(self)</span>
              <span className="text-slate-500">:</span>
            </CodeLine>
            <CodeLine delay={1.3}>
              <span className="text-slate-500 ml-8">return</span>{" "}
              <span className="text-green-400">"end-to-end 🚀"</span>
            </CodeLine>
          </motion.div>
        </div>

        {/* ── SKILLS TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <SectionTitle>Tech Stack</SectionTitle>

          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(SKILLS).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  backgroundColor:
                    activeTab === tab ? tabColors[tab] : "transparent",
                  color: activeTab === tab ? "#fff" : "#64748b",
                  border: `1px solid ${activeTab === tab ? tabColors[tab] : "#1e293b"}`,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-2"
            >
              {SKILLS[activeTab].map((skill) => (
                <SkillPill
                  key={skill}
                  label={skill}
                  color={tabColors[activeTab]}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── PROFICIENCY BARS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <SectionTitle>Proficiency</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
            {PROFICIENCY.map((item, i) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <span className="text-xs font-mono text-slate-500">
                    {item.value}%
                  </span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: animateBars ? `${item.value}%` : 0 }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── PROJECTS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <SectionTitle>Featured Projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 cursor-default"
                style={{ borderTopColor: p.accent, borderTopWidth: 2 }}
              >
                <p
                  className="text-xs font-mono mb-1"
                  style={{ color: p.accent }}
                >
                  {p.tag}
                </p>
                <h3 className="text-white font-bold text-lg mb-2">{p.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── TIMELINE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <SectionTitle>Experience & Education</SectionTitle>
          <div className="relative pl-6 border-l border-slate-800 space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="relative"
              >
                <div
                  className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full border-2 border-slate-900"
                  style={{
                    backgroundColor:
                      item.type === "work" ? "#3b82f6" : "#8b5cf6",
                  }}
                />
                <p className="text-xs font-mono text-slate-500 mb-0.5">
                  {item.year}
                </p>
                <p className="text-white font-bold">{item.role}</p>
                <p
                  className="text-xs mb-1"
                  style={{
                    color: item.type === "work" ? "#3b82f6" : "#8b5cf6",
                  }}
                >
                  {item.org}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── SUMMARY CARDS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <SectionTitle>About</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Full Stack",
                desc: "React frontends + Django backends, shipped end-to-end.",
                icon: "⚡",
              },
              {
                label: "Educator",
                desc: "Mentoring engineers at Algorise Tech Explorers.",
                icon: "🎓",
              },
              {
                label: "Bilingual",
                desc: "English & Arabic — fluent in both.",
                icon: "🌍",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <p className="font-bold text-white mb-1">{card.label}</p>
                <p className="text-slate-400 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center border border-slate-800 rounded-2xl p-10 bg-slate-900/30"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-slate-500 mb-2 font-mono">
            Open to opportunities
          </p>
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Let's build something great.
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
            Available for full-stack roles, backend contracts, and technical
            education partnerships.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors"
            >
              Hire Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 font-bold text-sm transition-colors"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
