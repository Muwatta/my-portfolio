import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export const PortfolioCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

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
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Category */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur text-blue-300 text-xs font-medium border border-blue-500/30">
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
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 backdrop-blur text-white rounded-lg text-sm font-medium hover:bg-slate-800"
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
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 ml-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink size={16} /> Live
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {project.metrics.map((metric) => (
            <span
              key={metric}
              className="text-xs text-slate-500 flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-green-500" />
              {metric}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
