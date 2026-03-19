import { motion } from "framer-motion";
import { useInView } from "../../../hooks/useInView";
import { Container } from "../../../components/layout/Container";
import { currentFocus } from "../../../data";

export const ValueProposition = () => {
  const [ref, isInView] = useInView(0.2);

  return (
    <section className="py-16 md:py-24 border-y border-slate-800/50 bg-slate-900/30">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="grid md:grid-cols-3 gap-8 md:gap-12"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              What I Build
            </h3>
            <p className="text-slate-400">
              Production-grade web applications with focus on scalability,
              real-time features, and exceptional user experience.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Who I Help
            </h3>
            <p className="text-slate-400">
              EdTech startups, vocational training centers, and engineering
              teams building systems that impact thousands of users.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Current Focus
            </h3>
            <ul className="space-y-1">
              {currentFocus.map((item) => (
                <li
                  key={item}
                  className="text-slate-400 text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
