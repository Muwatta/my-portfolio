import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

const CATEGORY_COLORS = {
  Backend: { bg: "#3b82f620", text: "#60a5fa", border: "#3b82f640" },
  "Full Stack": { bg: "#8b5cf620", text: "#a78bfa", border: "#8b5cf640" },
  Frontend: { bg: "#06b6d420", text: "#22d3ee", border: "#06b6d440" },
  "AI + IoT": { bg: "#10b98120", text: "#34d399", border: "#10b98140" },
  EdTech: { bg: "#f59e0b20", text: "#fbbf24", border: "#f59e0b40" },
};

const CoverFallback = ({ title }) => (
  <div
    className="w-full h-full flex items-center justify-center"
    style={{
      background:
        "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #111827 100%)",
    }}
  >
    <span
      className="text-6xl font-extrabold text-slate-700/70 select-none"
      aria-hidden="true"
    >
      {title.split(" ")[0].charAt(0)}
    </span>
  </div>
);

export const PortfolioCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors =
    CATEGORY_COLORS[project.category] || CATEGORY_COLORS["Backend"];
  const detailPath = `/portfolio/${project.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-500 flex flex-col"
    >
      {/* Image → case study */}
      <Link
        to={detailPath}
        aria-label={`View case study for ${project.title}`}
        className="relative aspect-video overflow-hidden block"
      >
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <CoverFallback title={project.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <span
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur"
          style={{
            backgroundColor: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          }}
        >
          {project.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
          <Link to={detailPath}>{project.title}</Link>
        </h3>

        {/* Problem / solution one-liner */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.problem || project.description}
        </p>

        {/* Key technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-500">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Verified metric */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800 mb-5">
          {project.metrics.slice(0, 3).map((metric) => (
            <span
              key={metric}
              className="text-xs text-slate-500 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              {metric}
            </span>
          ))}
        </div>

        {/* Actions — always visible, never hover-only */}
        <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-slate-800">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors"
            >
              <FiExternalLink size={14} /> Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              <FiGithub size={14} /> Code
            </a>
          )}
          <Link
            to={detailPath}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-500/60 transition-colors ml-auto whitespace-nowrap"
          >
            Case Study <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};