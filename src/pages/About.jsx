import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HiArrowRight } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STORY = [
  {
    id: "what-i-build",
    label: "01",
    title: "What I Build",
    content: [
      "Backend-heavy web applications, APIs, and data-driven platforms. Systems that handle real operational complexity: role-based workflows, financial transactions, multi-tenant architecture, and real-time updates.",
      "I specialize in Django and Django REST Framework paired with modern frontends (React, Next.js) and production infrastructure (PostgreSQL, Redis, Docker, CI/CD). My systems are built for reliability and scale.",
    ],
  },
  {
    id: "how-i-work",
    label: "02",
    title: "How I Work",
    content: [
      "Understand the domain → Model the data → Design the API → Implement business logic → Test → Deploy → Iterate.",
      "I focus on data modeling first, because correct data models eliminate bugs downstream. Then I design APIs that are intuitive and secure. Testing and deployment are not afterthoughts—they're built in from day one.",
    ],
  },
  {
    id: "what-makes-me-different",
    label: "03",
    title: "What Makes Me Different",
    content: [
      "My background in Arabic Education gives me an unusual advantage: I understand complex user workflows and hierarchical systems. I can translate how people work—whether students in a classroom or cooperative members managing loans—into structured backend systems.",
      "I don't just write code. I think like a domain expert, understand user problems deeply, and build systems that actually solve them.",
    ],
  },
  {
    id: "my-story",
    label: "04",
    title: "My Story",
    content: [
      "I started in Arabic Education—teaching, watching ideas click, understanding how learning works. Then technology called. I taught myself to code: Python, Django, React, full-stack development. But I brought something from teaching: clarity, patience, and purpose.",
      "I founded Algorise Tech Explorers to share what I learned. 150+ students trained. Some reached national competition finals. Then I realized: my real strength wasn't just teaching coding—it was building systems that work.",
    ],
  },
];

const MILESTONES = [
  {
    year: "2019–2024",
    event: "B.A. Arabic Education, Ahmadu Bello University",
    type: "edu",
  },
  {
    year: "2023",
    event: "Began self-teaching full-stack development",
    type: "dev",
  },
  { year: "2024", event: "Founded Algorise Tech Explorers", type: "milestone" },
  {
    year: "2024",
    event: "Deployed ATE Management System (100+ users)",
    type: "milestone",
  },
  {
    year: "2024",
    event: "Trained 150+ students in bootcamps & workshops",
    type: "milestone",
  },
  {
    year: "2025",
    event: "Led students to National ICT Competition finals",
    type: "award",
  },
  {
    year: "2025",
    event: "2nd Runner-Up, African Intelligence LMS Hackathon",
    type: "award",
  },
  {
    year: "2025",
    event: "Completed ALX ProDev Backend Engineering (Django & Python)",
    type: "edu",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "He delivered a production system that transformed our operations. Exceptional understanding of workflow requirements.",
    author: "Cooperative Administrator",
    location: "Nigeria",
  },
  {
    quote:
      "Built our platform end-to-end. Professional, responsive, and production-ready code. Highly recommended.",
    author: "Client",
    location: "Nigeria",
  },
  {
    quote:
      "Muwatta's bootcamps are transforming tech education in Jos. He makes complex systems accessible.",
    author: "Student",
    location: "Jos",
  },
];

const TYPE_COLORS = {
  edu: { dot: "#8b5cf6", label: "Education" },
  dev: { dot: "#3b82f6", label: "Dev" },
  milestone: { dot: "#10b981", label: "Milestone" },
  award: { dot: "#f59e0b", label: "Award" },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400" />
    <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-slate-500">
      {children}
    </p>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const About = () => {
  const [openId, setOpenId] = useState("classroom");
  const [testimonialIdx, setIdx] = useState(0);

  const prev = () =>
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200 relative overflow-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <Helmet>
        <title>About | Abdullahi Musliudeen Oladipupo</title>
        <meta
          name="description"
          content="Full Stack Developer, Educator & Founder — from Arabic Education to building production systems."
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
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600 opacity-[0.06] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-700 opacity-[0.07] blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-20">
        {/* ── HERO ── */}
        <div className="flex flex-col lg:flex-row items-start gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0"
          >
            <div className="w-32 h-32 rounded-2xl overflow-hidden ring-1 ring-slate-800">
              <img
                src="https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg"
                alt="Abdullahi Musliudeen"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-green-400 ring-2 ring-[#06090f]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1"
          >
            <p className="text-[11px] font-mono tracking-[0.28em] uppercase text-blue-400 mb-3">
              Backend Engineer · Full-Stack Developer · Founder
            </p>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.05] mb-5">
              Building Systems That
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Solve Real Problems
              </span>
            </h1>
            <p
              className="text-slate-400 text-[15px] max-w-xl leading-relaxed mb-8"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Backend-heavy engineer who builds production systems. Also mentor
              developer talent through Algorise Tech Explorers. From Arabic
              Education into systems architecture.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors flex items-center gap-2 group"
              >
                Work Together{" "}
                <HiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="/resume.pdf"
                download
                className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-500 text-slate-700 dark:text-slate-300 text-sm font-bold transition-colors"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* STAT CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden xl:flex flex-col gap-3 flex-shrink-0 w-48"
          >
            {[
              { value: "100+", label: "Active Users" },
              { value: "150+", label: "Learners Trained" },
              { value: "6+", label: "Production Systems" },
              { value: "2024", label: "ATE Founded" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 px-4 py-3"
              >
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── STORY ACCORDION ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <SectionLabel>The Journey</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* tab buttons */}
            <div className="flex flex-col gap-2">
              {STORY.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setOpenId(s.id)}
                  className="text-left px-5 py-4 rounded-xl border transition-all duration-200 group"
                  style={{
                    borderColor: openId === s.id ? "#3b82f6" : "#1e293b",
                    backgroundColor:
                      openId === s.id ? "#3b82f610" : "transparent",
                  }}
                >
                  <span className="block text-[10px] font-mono text-slate-600 mb-1">
                    {s.label}
                  </span>
                  <span
                    className={`text-sm font-bold transition-colors ${openId === s.id ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"}`}
                  >
                    {s.title}
                  </span>
                </button>
              ))}
            </div>

            {/* content panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {STORY.filter((s) => s.id === openId).map((s) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 p-8 h-full"
                  >
                    <p className="text-[10px] font-mono text-blue-400 mb-2">
                      {s.label}
                    </p>
                    <h3 className="text-2xl font-extrabold text-white mb-6">
                      {s.title}
                    </h3>
                    <div className="space-y-4">
                      {s.content.map((para, i) => (
                        <p
                          key={i}
                          className="text-slate-400 text-[15px] leading-relaxed"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── MILESTONES ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-24"
        >
          <SectionLabel>Milestones</SectionLabel>
          <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-7">
            {MILESTONES.map((m, i) => {
              const tc = TYPE_COLORS[m.type] || TYPE_COLORS.milestone;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="relative"
                >
                  <div
                    className="absolute -left-[1.65rem] top-1.5 w-3 h-3 rounded-full border-2 border-[#06090f]"
                    style={{ backgroundColor: tc.dot }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-[10px] font-mono text-slate-600 flex-shrink-0 w-20">
                      {m.year}
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {m.event}
                    </p>
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        color: tc.dot,
                        backgroundColor: tc.dot + "18",
                        border: `1px solid ${tc.dot}30`,
                      }}
                    >
                      {tc.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* legend */}
          <div className="flex flex-wrap gap-4 mt-8">
            {Object.entries(TYPE_COLORS).map(([, v]) => (
              <div key={v.label} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: v.dot }}
                />
                <span className="text-[10px] text-slate-600 font-mono">
                  {v.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── TESTIMONIALS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-24"
        >
          <SectionLabel>What People Say</SectionLabel>
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 p-10 sm:p-14 overflow-hidden">
            <div className="absolute top-6 left-8 text-blue-500/10">
              <FaQuoteLeft size={80} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative z-10 max-w-2xl mx-auto text-center"
              >
                <p
                  className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-6"
                  style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}
                >
                  "{TESTIMONIALS[testimonialIdx].quote}"
                </p>
                <p className="text-blue-400 font-bold text-sm">
                  {TESTIMONIALS[testimonialIdx].author}
                </p>
                <p className="text-slate-600 text-xs font-mono mt-1">
                  {TESTIMONIALS[testimonialIdx].location}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-500 dark:text-slate-400 hover:text-blue-400 transition-all flex items-center justify-center text-sm"
              >
                ←
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor:
                        i === testimonialIdx ? "#3b82f6" : "#334155",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-500 dark:text-slate-400 hover:text-blue-400 transition-all flex items-center justify-center text-sm"
              >
                →
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/30 dark:bg-slate-900/30 p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-violet-900/10 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-blue-400 mb-3">
              Open to opportunities
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Let's build something great.
            </h2>
            <p
              className="text-slate-400 text-sm mb-8 max-w-md mx-auto leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Available for full-stack roles, backend contracts, and technical
              education partnerships.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors"
              >
                Hire Me
              </Link>
              <a
                href="/resume.pdf"
                download
                className="px-7 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-500 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
