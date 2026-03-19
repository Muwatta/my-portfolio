import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../../../components/layout/Container";
import { PortfolioCard } from "../components/PortfolioCard";
import { FilterTabs } from "../components/FilterTabs";
import { projects } from "../../../data";

export const ProjectGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      className="py-12 sm:py-20"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <Container>
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-10 px-2">
          <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-blue-400 mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Production{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Systems
            </span>
          </h2>
          <p
            className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Real-world backends, full-stack apps, and IoT systems — built,
            shipped, and open source.
          </p>
        </div>

        {/* Filter tabs — horizontally scrollable on mobile */}
        <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="min-w-max sm:min-w-0 flex justify-start sm:justify-center">
            <FilterTabs active={activeFilter} onChange={setActiveFilter} />
          </div>
        </div>

        {/* Count */}
        <p className="text-xs font-mono text-slate-600 text-center mb-6">
          {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""}
        </p>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-slate-400 text-sm">
              No projects in this category yet.
            </p>
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">
            See everything I'm building
          </p>
          <a
            href="https://github.com/Muwatta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white text-sm font-bold transition-all"
          >
            View GitHub Profile →
          </a>
        </motion.div>
      </Container>
    </section>
  );
};
