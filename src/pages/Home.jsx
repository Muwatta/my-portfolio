import { Helmet } from "react-helmet-async";
import AnimatedBackground from "../components/layout/AnimatedBackground";
import {
  Hero,
  ValueProposition,
  Skills,
  FeaturedProjects,
  ImpactMetrics,
  Testimonials,
  AboutSummary,
  CallToAction,
} from "../features/home";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Abdullahi Musliudeen | Backend Engineer & Full-Stack Developer</title>
        <meta
          name="description"
          content="Backend Engineer & Full-Stack Developer. I build production systems with Django, Django REST Framework, PostgreSQL, Redis, and React/TypeScript — and mentor developer talent through Algorise Tech Explorers."
        />
      </Helmet>

      <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500/30 transition-colors duration-300">
        <AnimatedBackground />
        <main className="relative z-10">
          <Hero />
          <ValueProposition />
          <Skills />
          <FeaturedProjects />
          <ImpactMetrics />
          <Testimonials />
          <AboutSummary />
          <CallToAction />
        </main>
      </div>
    </>
  );
}
