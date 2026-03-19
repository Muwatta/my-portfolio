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
        <title>Abdullahi Musliudeen | Full-Stack Engineer & Educator</title>
        <meta
          name="description"
          content="I build scalable EdTech systems and mentor developers. Currently serving 10,000+ users across Nigeria."
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
