import AnimatedBackground from "../components/layout/AnimatedBackground";
import Seo from "../components/seo/Seo";
import { SITE } from "../lib/seo";
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
      <Seo
        title="Abdullahi Musliudeen | Backend Engineer & Full-Stack Developer"
        description={SITE.description}
        path="/"
      />

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
