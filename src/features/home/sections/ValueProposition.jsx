import { motion } from "framer-motion";
import { useInView } from "../../../hooks/useInView";
import { Container } from "../../../components/layout/Container";

export const ValueProposition = () => {
  const [ref, isInView] = useInView(0.2);

  return (
    <section className="py-16 md:py-24 border-y border-slate-800/50 bg-slate-900/30">
      <Container>
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">A different path into technology</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Education shaped how I build.</h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            I studied Arabic Education at Ahmadu Bello University, Zaria, then
            moved through teaching and technology education into software
            engineering. Today my work spans production software, embedded
            systems, AI, and IoT.
          </p>
        </motion.div>
        <motion.div
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
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Arduino",
              description: "Embedded programming, electronics, and sensors.",
              image: "/images/achievements/agroguard-ai.png",
              alt: "AgroGuard AI project dashboard",
            },
            {
              title: "ESP32",
              description: "Connected systems and IoT concepts.",
              image: "/images/achievements/students-coding-team.jpg",
              alt: "Students working together on a technology project",
            },
            {
              title: "Raspberry Pi",
              description: "Python, cameras, and computer vision.",
              image: "/images/achievements/scratch-students.jpg",
              alt: "Students learning with computers in a classroom",
            },
          ].map(({ title, description, image, alt }) => (
            <div key={title} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50">
              <img src={image} alt={alt} className="h-32 w-full object-cover opacity-80" loading="lazy" />
              <div className="p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
