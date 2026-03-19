import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Shared hooks
import { useInView } from "../hooks/useInView";
import { useMousePosition } from "../hooks/useMousePosition";

// Shared components
import MagneticButton from "../components/MagneticButton";
import AnimatedBackground from "../components/AnimatedBackground";

// Shared data
import {
  featuredProjects,
  skills,
  testimonials,
  stats,
} from "../data/constants";

// ============================================
// LOCAL COMPONENTS (Only used in Home)
// ============================================

const SkillBar = ({ skill, index }) => {
  const [ref, isInView] = useInView(0.3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-medium text-slate-200">{skill.name}</span>
        </div>
        <span className="text-slate-400 font-mono text-sm">{skill.level}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, isActive, onClick }) => (
  <motion.div
    layout
    onClick={onClick}
    className={`relative cursor-pointer group ${isActive ? "flex-[2]" : "flex-1"} transition-all duration-500 ease-out min-w-[300px] md:min-w-[400px]`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
  >
    <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent transition-opacity duration-300 ${isActive ? "opacity-60" : "opacity-80 group-hover:opacity-70"}`}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <motion.div
          initial={false}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0.8 }}
        >
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} text-white mb-3`}
          >
            {project.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-slate-300 mb-3 text-sm line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm"
                >
                  View Project →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
    animate={{
      opacity: isActive ? 1 : 0,
      scale: isActive ? 1 : 0.85,
      rotateY: isActive ? 0 : 15,
      zIndex: isActive ? 10 : 0,
    }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`absolute inset-0 flex items-center justify-center ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
  >
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-6 md:p-8 rounded-3xl max-w-2xl mx-4 shadow-2xl">
      <div className="text-5xl md:text-6xl mb-4 text-blue-500/30 font-serif">
        "
      </div>
      <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-6">
        {testimonial.quote}
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-white text-sm md:text-base">
            {testimonial.author}
          </p>
          <p className="text-xs md:text-sm text-slate-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const StatCounter = ({ stat, index }) => {
  const [ref, isInView] = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const target = stat.num;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.num]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 md:p-8 rounded-2xl hover:border-slate-600 transition-colors duration-300">
        <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 font-mono">
          {count}
          {stat.suffix}
        </div>
        <div className="text-slate-400 font-medium text-sm md:text-base">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN HOME COMPONENT
// ============================================

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroRef, heroInView] = useInView(0.1);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Keyboard navigation for projects
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setActiveProject((p) => (p + 1) % featuredProjects.length);
      } else if (e.key === "ArrowLeft") {
        setActiveProject(
          (p) => (p - 1 + featuredProjects.length) % featuredProjects.length,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((t) => (t + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500/30">
      <Helmet>
        <title>
          Abdullahi Musliudeen | Full-Stack Developer & Tech Educator
        </title>
        <meta
          name="description"
          content="Full-stack software developer specializing in React, Python, modern web apps, Git integration, and tech education."
        />
      </Helmet>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 origin-left z-50"
        style={{ scaleX }}
      />

      <AnimatedBackground />

      <main className="relative z-10">
        {/* ============================================
            HERO SECTION
        ============================================ */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center pt-20 pb-16 md:pb-32 px-4 md:px-6"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-slate-900/50 border border-slate-700 text-xs md:text-sm text-blue-400 mb-4 md:mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for projects
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
                  <span className="block text-slate-400 text-lg md:text-2xl lg:text-3xl font-normal mb-1 md:mb-2">
                    Hi, I'm
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
                    Abdullahi
                  </span>
                  <br />
                  <span className="text-slate-200">Musliudeen</span>
                </h1>

                <p className="text-base md:text-xl text-slate-400 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Full-Stack Developer & Tech Educator crafting scalable web
                  applications and mentoring the next generation of developers.
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                  <MagneticButton className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold shadow-lg shadow-blue-500/25 transition-all text-sm md:text-base">
                    View My Work
                  </MagneticButton>
                  <button className="px-6 py-3 md:px-8 md:py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold border border-slate-700 transition-all flex items-center gap-2 text-sm md:text-base">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download CV
                  </button>
                </div>

                {/* Social Proof */}
                <div className="mt-8 md:mt-12 flex items-center gap-3 md:gap-4 justify-center lg:justify-start">
                  <div className="flex -space-x-2 md:-space-x-3">
                    {["👨‍💻", "👩‍💻", "👨‍🎓", "👩‍🎓"].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-sm md:text-lg"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-slate-500">
                    <span className="text-slate-300 font-semibold">50+</span>{" "}
                    students mentored
                  </p>
                </div>
              </motion.div>

              {/* Image/Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2 relative"
              >
                <div className="relative w-full max-w-[280px] md:max-w-md mx-auto aspect-square">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-slate-700/50"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-3 md:inset-4 rounded-full border border-slate-600/30"
                  />

                  <div className="absolute inset-6 md:inset-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                    <img
                      src="https://res.cloudinary.com/dee5edoss/image/upload/v1763611836/national_image_otksdm.jpg"
                      alt="Abdullahi Musliudeen"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2 md:top-0 md:right-0 bg-slate-900/90 backdrop-blur border border-slate-700 px-2 py-1 md:px-4 md:py-2 rounded-full shadow-xl"
                  >
                    <span className="text-lg md:text-2xl">🏆</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -bottom-2 -left-2 md:bottom-8 md:left-0 bg-slate-900/90 backdrop-blur border border-slate-700 px-2 py-1 md:px-4 md:py-2 rounded-full shadow-xl"
                  >
                    <span className="text-xs md:text-sm font-medium">
                      Full-Stack Dev
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================
            SKILLS SECTION
        ============================================ */}
        <section id="skills" className="py-16 md:py-32 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                  Tech Stack &<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                    Expertise
                  </span>
                </h2>
                <p className="text-slate-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                  Specialized in modern web technologies with a focus on
                  performance, scalability, and developer experience.
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
                  {["React", "Python", "TypeScript", "Git", "MongoDB"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs md:text-sm"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            FEATURED PROJECTS SECTION
        ============================================ */}
        <section id="projects" className="py-16 md:py-32 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-4">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                  Featured Work
                </h2>
                <p className="text-slate-400 text-base md:text-lg">
                  Selected projects showcasing full-stack capabilities
                </p>
              </div>
              <div className="flex gap-2 justify-center md:justify-start">
                {featuredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveProject(i)}
                    className={`w-8 md:w-12 h-1 rounded-full transition-all duration-300 ${i === activeProject ? "bg-blue-500" : "bg-slate-800 hover:bg-slate-700"}`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div
              className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  isActive={i === activeProject}
                  onClick={() => setActiveProject(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            STATS SECTION
        ============================================ */}
        <section className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {stats.map((stat, i) => (
                <StatCounter key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            TESTIMONIALS SECTION
        ============================================ */}
        <section id="testimonials" className="py-16 md:py-32 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-16">
              What People <span className="text-blue-400">Say</span>
            </h2>

            <div className="relative h-[300px] md:h-[400px] perspective-1000">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard
                  key={i}
                  testimonial={testimonial}
                  isActive={i === activeTestimonial}
                />
              ))}
            </div>

            <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 md:h-3 rounded-full transition-all ${i === activeTestimonial ? "bg-blue-500 w-6 md:w-8" : "bg-slate-700 hover:bg-slate-600 w-2 md:w-3"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            CTA SECTION
        ============================================ */}
        <section id="contact" className="py-16 md:py-32 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 p-[1px]">
              <div className="bg-slate-950 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-blue-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-purple-500 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                    Ready to Collaborate?
                  </h2>
                  <p className="text-base md:text-xl text-slate-400 mb-6 md:mb-10 max-w-2xl mx-auto">
                    Whether it's building a full-stack application, integrating
                    Git features, or running tech workshops — let's create
                    something powerful together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <MagneticButton className="px-6 py-3 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm md:text-lg shadow-lg shadow-blue-500/25 transition-all">
                      Start a Project
                    </MagneticButton>
                    <button className="px-6 py-3 md:px-10 md:py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-sm md:text-lg border border-slate-700 transition-all">
                      Schedule a Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
