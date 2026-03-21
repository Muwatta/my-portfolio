import { motion } from "framer-motion";
import { useInView } from "../../../hooks/useInView";
import { Container } from "../../../components/layout/Container";
import { MagneticButton } from "../../../components/ui/MagneticButton";
import { Link } from "react-router-dom";

export const AboutSummary = () => {
  const [ref, isInView] = useInView(0.2);

  return (
    <section className="py-16 md:py-32">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Engineer. Educator.{" "}
              <span className="text-blue-400">Builder.</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I specialize in turning complex educational challenges into
                scalable software solutions. My work sits at the intersection of
                engineering rigor and pedagogical impact.
              </p>
              <p>
                Currently leading technical architecture for NigeriaSkills LMS,
                a platform training 500+ students across 5 states. Previously
                mentored 50+ developers into their first engineering roles.
              </p>
              <p>
                I believe the best code is the code that teaches—whether that's
                through clean architecture, thorough documentation, or direct
                mentorship.
              </p>
            </div>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">2+</div>
              <div className="text-slate-400 text-sm">Years Building</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-slate-400 text-sm">Developers Mentored</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-slate-400 text-sm">Users Served</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">3</div>
              <div className="text-slate-400 text-sm">Production Systems</div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
