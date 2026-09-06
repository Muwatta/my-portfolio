import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../../../components/layout/Container";
import { ProjectCard } from "./components/ProjectCard";
import { projects } from "../../../data";
import { Link } from "react-router-dom";
import { fetchAchievements } from "../../../lib/achievements";

const ACHIEVEMENT_PLACEHOLDERS = [
  {
    title: "Bootcamp certificate ceremony",
    description: "Learners gathered with their certificates at the end of the Algorise Tech Explorers bootcamp.",
    imageUrl: "/images/achievements/third-place-hackathon.jpg",
  },
  {
    title: "African Intelligence Hackathon — 3rd place",
    description: "A learner is pictured with the 3rd Place Champion award at the African Intelligence Hackathon 2025.",
    imageUrl: "/images/achievements/abuja-student-awards.jpg",
  },
  {
    title: "Students working on a coding project",
    description: "Three learners work together on a laptop-based computing activity.",
    imageUrl: "/images/achievements/students-coding-team.jpg",
  },
  {
    title: "AgroGuard AI dashboard",
    description: "A crop-protection dashboard showing detection analytics, system status, and confidence results.",
    imageUrl: "/images/achievements/agroguard-ai.png",
  },
  {
    title: "Scratch classroom",
    description: "Learners practise Scratch programming in a computer classroom using a projected lesson.",
    imageUrl: "/images/achievements/scratch-class-2025.jpg",
  },
  {
    title: "Students recognised at Code, Create & Inspire",
    description: "Students receive devices and recognition at a Code, Create & Inspire event.",
    imageUrl: "/images/achievements/bootcamp-2025.jpg",
  },
];

export const FeaturedProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const customerIds = ["ate-management", "ssc-cooperative", "kma-spices", "dghi-academy"];
  const engineeringIds = ["nexus-lms", "nextalk", "agroguard"];
  const customerProjects = customerIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean);
  const engineeringProjects = engineeringIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean);
  useEffect(() => {
    fetchAchievements().then(setAchievements).catch(() => setAchievements([]));
  }, []);
  const displayedAchievements = achievements.length ? achievements : ACHIEVEMENT_PLACEHOLDERS;

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

        <h3 className="mb-5 text-xl font-bold sm:text-2xl">Customer & Production Work</h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {customerProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <div className="mt-12">
          <h3 className="mb-5 text-xl font-bold sm:text-2xl">Engineering & Technical Projects</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {engineeringProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isActive={false} onClick={() => {}} />
            ))}
          </div>
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
            {displayedAchievements.slice(0, 6).map((achievement, index) => (
              <article
                key={achievement.id || achievement.title}
                className="min-h-28 overflow-hidden rounded-xl border border-slate-300 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/50 sm:min-h-36 sm:p-5"
              >
                {achievement.imageUrl && <img src={achievement.imageUrl} alt={achievement.title} className="mb-4 aspect-[4/3] h-auto w-full rounded-lg object-cover sm:aspect-[16/10]" loading="lazy" />}
                <span className="text-xs font-mono text-blue-500 dark:text-blue-400">
                  0{index + 1}
                </span>
                <h4 className="mt-3 text-sm font-semibold leading-snug text-slate-800 dark:text-slate-200 sm:text-base">
                  {achievement.title}
                </h4>
                <p className="mt-2 text-xs text-slate-500">
                  {achievement.description || "Achievement details coming soon"}
                </p>
                {achievement.studentName && <p className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400">{achievement.studentName}</p>}
                {achievement.projectUrl && (
                  <a
                    href={achievement.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    View project →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
