import { motion } from "framer-motion";
import { MagneticButton } from "../../../components/ui/MagneticButton";
import { Container } from "../../../components/layout/Container";
import { ctaNavigation } from "../../../data";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-blue-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for projects
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-slate-400 text-xl md:text-2xl font-normal mb-2">
                Full-Stack Engineer
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
                Abdullahi Musliudeen
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I build scalable EdTech systems and mentor developers. Currently
              focused on learning management platforms serving 10,000+ users
              across Nigeria.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <MagneticButton
                size="lg"
                onClick={() =>
                  (window.location.href = ctaNavigation.primary.href)
                }
              >
                {ctaNavigation.primary.name}
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                size="lg"
                onClick={() =>
                  window.open(ctaNavigation.secondary.href, "_blank")
                }
              >
                {ctaNavigation.secondary.name}
              </MagneticButton>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-slate-700/50"
              />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                <img
                  src="https://res.cloudinary.com/dee5edoss/image/upload/v1763611836/national_image_otksdm.jpg"
                  alt="Abdullahi Musliudeen"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
