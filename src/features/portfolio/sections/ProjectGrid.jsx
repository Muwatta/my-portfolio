import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/ui/SectionHeader";
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
    <section className="py-20">
      <Container>
        <SectionHeader
          title="Selected"
          highlight="Works"
          subtitle="Production systems shipped with measurable impact."
          align="center"
        />

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
