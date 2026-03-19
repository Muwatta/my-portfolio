import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const CATEGORY_COLORS = {
  Backend: { bg: "#3b82f620", text: "#60a5fa", border: "#3b82f640" },
  "Full Stack": { bg: "#8b5cf620", text: "#a78bfa", border: "#8b5cf640" },
  Frontend: { bg: "#06b6d420", text: "#22d3ee", border: "#06b6d440" },
  "IoT + AI": { bg: "#10b98120", text: "#34d399", border: "#10b98140" },
  EdTech: { bg: "#f59e0b20", text: "#fbbf24", border: "#f59e0b40" },
};

export const PortfolioCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors =
    CATEGORY_COLORS[project.category] || CATEGORY_COLORS["Backend"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Category badge */}
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

        {/* Hover Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 right-4 flex gap-3"
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 backdrop-blur text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub size={15} /> Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 ml-auto transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink size={15} /> Live
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech pills */}
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

        {/* Metrics */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
          {project.metrics.map((metric) => (
            <span
              key={metric}
              className="text-xs text-slate-500 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              {metric}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
