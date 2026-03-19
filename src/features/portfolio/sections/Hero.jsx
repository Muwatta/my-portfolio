import { motion } from "framer-motion";
import { Container } from "../../../components/layout/Container";
import { socialLinks } from "../../../data";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse blur-xl opacity-50" />
            <img
              src="https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg"
              alt="Abdullahi Musliudeen"
              className="relative w-full h-full rounded-full object-cover border-2 border-slate-700"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Abdullahi Musliudeen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 mb-4"
          >
            Full-Stack Engineer & STEM Educator
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 mb-8 max-w-xl mx-auto"
          >
            Building production systems that empower Nigerian youth through
            technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                {link.name[0]}
              </a>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
