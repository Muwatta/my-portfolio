import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../../../components/layout/Container";

export const Hero = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="min-h-0 lg:min-h-screen flex items-center justify-center pt-28 pb-16 lg:pt-20 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full text-center"
          >
            <div className="home-hero-status inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-blue-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for projects
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-slate-400 text-xl md:text-2xl font-normal mb-2">
                Software Engineer and Technology Educator
              </span>
              <span className="home-hero-name bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
                Abdullahi Musliudeen
              </span>
            </h1>

            <motion.p
              initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed"
            >
              I build production software, teach practical technology, and work
              with students on projects that connect code to the physical world.
            </motion.p>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md"
          >
            <div className="relative mx-auto aspect-square w-full">
              {/* Animated rings */}
              <motion.div
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-slate-700/50"
              />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                <img
                  src="https://res.cloudinary.com/dee5edoss/image/upload/v1763611836/national_image_otksdm.jpg"
                  alt="Abdullahi Musliudeen"
                  width={576}
                  height={576}
                  decoding="async"
                  fetchpriority="high"
                  loading="eager"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <motion.p
              initial={reduceMotion ? {} : { opacity: 0, y: 18, scale: 0.98 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              className="mx-auto mt-6 max-w-md text-center text-sm leading-6 text-slate-500"
            >
              My work connects Arabic education, software engineering, embedded
              systems, artificial intelligence, and the Internet of Things.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
