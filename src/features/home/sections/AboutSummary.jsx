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
              Backend Systems That
              <br />
              <span className="text-blue-400">Actually Work.</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I specialize in building production-grade backend systems: REST
                APIs, role-based authorization, financial workflows, real-time
                data processing, and scalable architecture.
              </p>
              <p>
                Current platform manages 100+ active users. Live production
                systems for cooperatives, e-commerce, and educational
                institutions. Also founded and run Algorise Tech Explorers,
                mentoring 150+ learners.
              </p>
              <p>
                My approach: understand domain → model data properly → design
                clear APIs → implement with testing → deploy with confidence.
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
              <div className="text-slate-400 text-sm">Active Users</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
              <div className="text-slate-400 text-sm">Learners Trained</div>
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
