import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../../../components/layout/Container";
import { ProjectCard } from "./components/ProjectCard";
import { featuredProjects } from "../../../data";
import { Link } from "react-router-dom";

const STUDENT_ACHIEVEMENTS = [
  "Student project showcase",
  "Scratch game or animation",
  "Arduino or ESP32 build",
  "Python application",
  "Robotics or sensor project",
  "Learner progress highlight",
];

export const FeaturedProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = featuredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-32 bg-slate-900/30">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4">
              Featured <span className="text-blue-400">Work</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Systems I've built that are currently serving real users.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 group"
          >
            View all projects
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="mt-14 md:mt-24">
          <div className="mb-6 md:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
              Student outcomes
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Learner achievements
            </h3>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
              A space for standout student projects and milestones from
              Algorise Tech Explorers. Real achievements will be added here.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {STUDENT_ACHIEVEMENTS.map((achievement, index) => (
              <article
                key={achievement}
                className="min-h-28 rounded-xl border border-dashed border-slate-300 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/50 sm:min-h-36 sm:p-5"
              >
                <span className="text-xs font-mono text-blue-500 dark:text-blue-400">
                  0{index + 1}
                </span>
                <h4 className="mt-3 text-sm font-semibold leading-snug text-slate-800 dark:text-slate-200 sm:text-base">
                  {achievement}
                </h4>
                <p className="mt-2 text-xs text-slate-500">
                  Achievement details coming soon
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
