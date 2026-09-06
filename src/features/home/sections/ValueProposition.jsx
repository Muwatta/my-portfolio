import { motion } from "framer-motion";
import { useInView } from "../../../hooks/useInView";
import { Container } from "../../../components/layout/Container";

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
              Software Engineering
            </h3>
            <p className="text-slate-400">
              Web applications, APIs, and backend platforms for education,
              business, and operational workflows.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Technology Education
            </h3>
            <p className="text-slate-400">
              Practical programming, web development, Scratch, embedded systems,
              robotics, and AI concepts for learners.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Hardware & Physical Computing
            </h3>
            <ul className="space-y-1">
              {[
                "Arduino, ESP32, and Raspberry Pi",
                "Sensors, actuators, and cameras",
                "Python, computer vision, and IoT",
              ].map((item) => (
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
