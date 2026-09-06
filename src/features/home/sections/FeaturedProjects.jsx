import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../../../components/layout/Container";
import { ProjectCard } from "./components/ProjectCard";
import { projects } from "../../../data";
import { Link } from "react-router-dom";
import { fetchAchievements } from "../../../lib/achievements";

const ACHIEVEMENT_PLACEHOLDERS = [
  {
    title: "Third-place hackathon finish",
    description: "A learner represented Algorise Tech Explorers at the African Intelligence Hackathon.",
    imageUrl: "/images/achievements/third-place-hackathon.jpg",
  },
  {
    title: "Students recognised at Code, Create & Inspire",
    description: "Learners showcased their work and received awards for their technology projects.",
    imageUrl: "/images/achievements/abuja-student-awards.jpg",
  },
  {
    title: "Student coding projects",
    description: "Learners building practical software projects together through guided technology education.",
    imageUrl: "/images/achievements/students-coding-team.jpg",
  },
  {
    title: "AgroGuard AI prototype",
    description: "A physical-computing and AI project connecting software with real agricultural challenges.",
    imageUrl: "/images/achievements/agroguard-ai.png",
  },
  {
    title: "Scratch learning showcase",
    description: "Young learners creating interactive stories, games, and animations with Scratch.",
    imageUrl: "/images/achievements/scratch-students.jpg",
  },
  {
    title: "Technology learning community",
    description: "Students and mentors learning, presenting, and celebrating progress together.",
    imageUrl: "/images/achievements/at-the-national.jpg",
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
                className="min-h-28 overflow-hidden rounded-xl border border-slate-300 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/50 sm:min-h-36 sm:p-5"
              >
                {achievement.imageUrl && <img src={achievement.imageUrl} alt="" className="mb-3 h-20 w-full rounded-lg object-cover" />}
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
