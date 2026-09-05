import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Seo from "../components/seo/Seo";
import {
  HiArrowLeft,
  HiOutlineLightningBolt,
  HiOutlineChip,
  HiOutlineCube,
  HiOutlineChartBar,
  HiOutlineCode,
} from "react-icons/hi";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { getProjectById } from "../data";
import { ArchitectureDiagram } from "../features/portfolio/components/ArchitectureDiagram";
import { breadcrumbSchema, pageUrl, PERSON_ID, SITE } from "../lib/seo";

const CATEGORY_COLORS = {
  Backend: { bg: "#3b82f620", text: "#60a5fa", border: "#3b82f640" },
  "Full Stack": { bg: "#8b5cf620", text: "#a78bfa", border: "#8b5cf640" },
  Frontend: { bg: "#06b6d420", text: "#22d3ee", border: "#06b6d440" },
  "AI + IoT": { bg: "#10b98120", text: "#34d399", border: "#10b98140" },
  EdTech: { bg: "#f59e0b20", text: "#fbbf24", border: "#f59e0b40" },
};

const CoverFallback = ({ title, category }) => (
  <div
    className="w-full h-full flex items-center justify-center"
    style={{
      background:
        "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #111827 100%)",
    }}
  >
    <span
      className="text-7xl font-extrabold text-slate-700/70 select-none"
      aria-hidden="true"
    >
      {title.split(" ")[0].charAt(0)}
    </span>
    <span className="sr-only">{category}</span>
  </div>
);

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
      {icon}
    </span>
    <div>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 mb-1">
        Case Study
      </p>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
  </div>
);

const Section = ({ icon, title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8"
  >
    <SectionHeader icon={icon} title={title} />
    {children}
  </motion.section>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const project = getProjectById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#06090f] flex flex-col items-center justify-center px-4 text-center">
        <Helmet>
          <title>Project Not Found | Abdullahi Musliudeen</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <p className="text-[11px] font-mono tracking-[0.28em] uppercase text-blue-400 mb-4">
          Error 404
        </p>
        <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
          Project not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-[15px] mb-8 max-w-md leading-relaxed">
          No case study exists for this project. It may be private, renamed, or
          the link is broken.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
        >
          <HiArrowLeft /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const colors =
    CATEGORY_COLORS[project.category] || CATEGORY_COLORS["Backend"];

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200 relative overflow-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <Seo
        title={`${project.title} | Abdullahi Musliudeen`}
        description={project.description}
        path={`/portfolio/${project.id}`}
        image={project.image}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": `${pageUrl(`/portfolio/${project.id}`)}#case-study`,
            name: project.title,
            description: project.description,
            url: pageUrl(`/portfolio/${project.id}`),
            ...(project.image ? { image: project.image } : {}),
            author: { "@id": PERSON_ID },
            keywords: project.tech,
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
            { name: project.title, path: `/portfolio/${project.id}` },
          ]),
        ]}
      />

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-20">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            to="/portfolio"
            className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 text-sm transition-colors w-fit"
          >
            <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            >
              {project.category}
            </span>
            {project.impact && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600">
                {project.impact}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            {project.title}
          </h1>

          <p
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed border-l-2 border-blue-500 pl-4"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white text-sm font-bold transition-all"
              >
                <FiGithub size={16} /> View Source Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
              >
                <FiExternalLink size={16} /> Visit Live Demo
              </a>
            )}
          </div>
        </motion.header>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-slate-800 mb-12 aspect-video"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <CoverFallback title={project.title} category={project.category} />
          )}
        </motion.div>

        {/* Case study sections — only rendered when the project has data */}
        <div className="space-y-8">
          {project.problem && (
            <Section icon={<HiOutlineChip size={18} />} title="The Problem">
              <p
                className="text-slate-400 text-[15px] leading-relaxed"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {project.problem}
              </p>
            </Section>
          )}

          {project.approach && (
            <Section
              icon={<HiOutlineLightningBolt size={18} />}
              title="Solution"
            >
              <p
                className="text-slate-400 text-[15px] leading-relaxed"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {project.approach}
              </p>
            </Section>
          )}

          {project.engineering?.length > 0 && (
            <Section icon={<HiOutlineCode size={18} />} title="Engineering">
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.engineering.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-400"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {project.architecture && (
            <Section icon={<HiOutlineCube size={18} />} title="Architecture">
              <p className="text-sm font-mono text-slate-500 mb-2 break-words">
                {project.architecture}
              </p>
              <ArchitectureDiagram architecture={project.architecture} />
            </Section>
          )}

          {project.tech?.length > 0 && (
            <Section icon={<HiOutlineChip size={18} />} title="Tech Stack">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {(project.result || project.metrics?.length > 0) && (
            <Section icon={<HiOutlineChartBar size={18} />} title="Outcome">
              {project.result && (
                <p
                  className="text-slate-400 text-[15px] leading-relaxed mb-5"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {project.result}
                </p>
              )}
              {project.metrics?.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="text-xs px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              )}
            </Section>
          )}
        </div>

        {/* Footer actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white text-sm font-bold transition-all"
          >
            <HiArrowLeft /> More Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
