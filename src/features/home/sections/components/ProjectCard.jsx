import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Badge } from "../../../../components/ui/Badge";

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

export const ProjectCard = ({ project, index, isActive, onClick }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer transition-all duration-300 ${isActive ? "ring-2 ring-blue-500/50" : ""}`}
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CoverFallback title={project.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="primary" size="sm">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.metrics.slice(0, 2).map((metric) => (
            <span key={metric} className="text-xs text-slate-500">
              • {metric}
            </span>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-slate-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub size={16} /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors ml-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink size={16} /> Live
            </a>
          )}
          <Link
            to={`/portfolio/${project.id}`}
            className="flex items-center gap-1 text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Case Study <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};
