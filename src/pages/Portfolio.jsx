import { Helmet } from "react-helmet-async";
import AnimatedBackground from "../components/layout/AnimatedBackground";
import { Hero, ProjectGrid } from "../features/portfolio";

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio | Abdullahi Musliudeen - Full-Stack Engineer</title>
        <meta
          name="description"
          content="Explore production-grade web applications, IoT systems, and EdTech platforms built by Abdullahi Musliudeen."
        />
      </Helmet>

      <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500/30 transition-colors duration-300">
        <AnimatedBackground />
        <main className="relative z-10">
          <Hero />
          <ProjectGrid />
        </main>
      </div>
    </>
  );
}
