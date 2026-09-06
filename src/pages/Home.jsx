import AnimatedBackground from "../components/layout/AnimatedBackground";
import Seo from "../components/seo/Seo";
import { homeSchema, SITE } from "../lib/seo";
import {
  Hero,
  ValueProposition,
  Skills,
  FeaturedProjects,
  TeachingImpact,
  CoursePreview,
  ImpactMetrics,
  AboutSummary,
  CallToAction,
} from "../features/home";

export default function Home() {
  return (
    <>
      <Seo
        title={SITE.title}
        description={SITE.description}
        path="/"
        jsonLd={homeSchema}
      />

      <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500/30 transition-colors duration-300">
        <AnimatedBackground />
        <main className="relative z-10">
          <Hero />
          <ValueProposition />
          <Skills />
          <FeaturedProjects />
          <TeachingImpact />
          <CoursePreview />
          <ImpactMetrics />
          {/* Testimonials remain available on their dedicated content surfaces; the homepage prioritises evidence and teaching work. */}
          <AboutSummary />
          <CallToAction />
        </main>
      </div>
    </>
  );
}
