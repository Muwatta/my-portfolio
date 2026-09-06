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
            Software, Education,
              <br />
            <span className="text-blue-400">and Physical Computing.</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I build production-grade backend systems: REST APIs, role-based
                workflows, financial operations, and data-driven platforms.
              </p>
              <p>
                My work also includes teaching programming and introducing
                learners to embedded systems, AI, IoT, and practical computing.
                I founded Algorise Tech Explorers and have mentored 150+ learners.
              </p>
              <p>
                I hold a Bachelor of Education (B.Ed.) in Arabic Education from
                Ahmadu Bello University, Zaria. That path shapes how I understand
                users, explain systems, and build technology for real contexts.
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
              <div className="text-3xl font-bold text-blue-400 mb-2">100+</div>
              <div className="text-slate-400 text-sm">Active platform users</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
              <div className="text-slate-400 text-sm">Learners mentored</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">6+</div>
              <div className="text-slate-400 text-sm">Production Systems</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">2024</div>
              <div className="text-slate-400 text-sm">ATE Founded</div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
