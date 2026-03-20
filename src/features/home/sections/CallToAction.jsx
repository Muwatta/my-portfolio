import { motion } from "framer-motion";
import { useInView } from "../../../hooks/useInView";
import { Container } from "../../../components/layout/Container";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AVAILABLE_FOR = [
  "Full Stack Roles",
  "Backend Contracts",
  "Tech Education",
  "Open Source",
];

export const CallToAction = () => {
  const [ref, isInView] = useInView(0.2);

  return (
    <section
      id="contact"
      className="py-20 md:py-36 relative overflow-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-violet-600/10 dark:from-blue-600/15 dark:to-violet-600/15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(100,100,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,100,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* availability pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
              Open to Work
            </span>
          </motion.div>

          {/* headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6"
          >
            Ready to build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              that matters?
            </span>
          </motion.h2>

          {/* sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Whether you need a full-stack engineer, a backend specialist, or a
            tech educator — I bring production-grade thinking and real-world
            experience to every project.
          </motion.p>

          {/* available for chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {AVAILABLE_FOR.map((item) => (
              <span
                key={item}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Start a Conversation
              <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://github.com/Muwatta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold text-sm transition-all hover:-translate-y-0.5"
            >
              <FaGithub size={16} /> View GitHub
            </a>
          </motion.div>

          {/* divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-8"
          />

          {/* bottom row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-500"
          >
            
            
            <span className="font-mono text-xs">
              📍 Lagos, Nigeria (WAT · UTC+1)
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
