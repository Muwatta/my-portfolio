import { motion } from "framer-motion";
import { useInView } from "../../../hooks/useInView";
import { Container } from "../../../components/layout/Container";
import { MagneticButton } from "../../../components/ui/MagneticButton";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  const [ref, isInView] = useInView(0.3);

  return (
    <section id="contact" className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to build something that{" "}
            <span className="text-blue-400">matters</span>?
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
            Whether you need a technical partner for your EdTech startup, a
            workshop facilitator for your team, or a system architect for scale—
            let's discuss how I can help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton size="lg" as={Link} to="/contact">
              Start a Conversation
            </MagneticButton>
            <MagneticButton
              size="lg"
              variant="secondary"
              as={Link}
              to="/workshops"
            >
              Explore Workshops
            </MagneticButton>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-slate-500 text-sm">
              Or email directly:{" "}
              <a
                href="mailto:hello@muwatta.dev"
                className="text-blue-400 hover:text-blue-300"
              >
                hello@muwatta.dev
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
