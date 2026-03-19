import { motion } from "framer-motion";
import { Container } from "../../../components/layout/Container";
import { socialLinks } from "../../../data";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const ICON_MAP = {
  GitHub: <FaGithub size={18} />,
  LinkedIn: <FaLinkedin size={18} />,
  Twitter: <FaTwitter size={18} />,
  X: <FaTwitter size={18} />,
};

const STATS = [
  { value: "6+", label: "Projects" },
  { value: "100+", label: "Students" },
  { value: "3+", label: "Languages" },
];

export const Hero = () => {
  return (
    <section
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {/* font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Lora:ital@0;1&display=swap');`}</style>

      <Container>
        <div className="flex flex-col items-center text-center gap-6">
          {/* avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 blur-xl opacity-40 animate-pulse" />
            <img
              src="https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg"
              alt="Abdullahi Musliudeen"
              className="relative w-full h-full rounded-full object-cover border-2 border-slate-700 ring-2 ring-blue-500/20"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 ring-2 ring-slate-950" />
          </motion.div>

          {/* text */}
          <div className="max-w-xl px-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] font-mono tracking-[0.25em] uppercase text-blue-400 mb-3"
            >
              Full Stack Engineer · STEM Educator · Founder
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl font-extrabold leading-tight mb-3 text-white"
            >
              Abdullahi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Musliudeen
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6"
              style={{ fontFamily: "'Lora', serif" }}
            >
              I build production-grade backends with Django & PostgreSQL, ship
              React frontends, and train the next wave of Nigerian engineers at
              Algorise Tech Explorers.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors group"
              >
                Hire Me
                <HiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/Muwatta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 text-sm font-bold transition-colors"
              >
                <FaGithub size={15} /> GitHub
              </a>
            </motion.div>

            {/* social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-3"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-all"
                >
                  {ICON_MAP[link.name] || (
                    <span className="text-xs font-bold">{link.name[0]}</span>
                  )}
                </a>
              ))}
            </motion.div>
          </div>

          {/* stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex gap-6 sm:gap-10 mt-2"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">
                  {s.value}
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5 uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mt-2"
          />
        </div>
      </Container>
    </section>
  );
};
