import AnimatedBackground from "../components/layout/AnimatedBackground";
import Seo from "../components/seo/Seo";
import { Hero, ProjectGrid } from "../features/portfolio";

export default function Portfolio() {
  return (
    <>
      <Seo
        title="Work | Abdullahi Musliudeen — Backend Engineer & Full-Stack Developer"
        description="Production systems built by Abdullahi Musliudeen — Django REST APIs, PostgreSQL, Redis, Celery/RabbitMQ, React — used by real users and delivered to clients."
        path="/portfolio"
        type="website"
      />

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
