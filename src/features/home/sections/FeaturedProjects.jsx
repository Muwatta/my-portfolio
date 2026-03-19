import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./../../../components/ui/SectionHeader";
import { Container } from "../../../components/layout/Container";
import { ProjectCard } from "./components/ProjectCard";
import { featuredProjects } from "../../../data";
import { Link } from "react-router-dom";

export const FeaturedProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="projects" className="py-16 md:py-32 bg-slate-900/30">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="text-blue-400">Work</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
