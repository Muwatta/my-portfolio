import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { Container } from "../components/layout/Container";
import { SectionHeader } from "../components/ui/SectionHeader";
import { engineeringExperience } from "../data/experience";

export const EngineeringExperience = () => {
  const typeColors = {
    leadership: "from-purple-500 to-pink-500",
    engineering: "from-blue-500 to-cyan-500",
    education: "from-green-500 to-emerald-500",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200">
      <Helmet>
        <title>Engineering Experience | Abdullahi Musliudeen</title>
        <meta
          name="description"
          content="Production systems built. Users served. Learners mentored. Engineering impact."
        />
      </Helmet>

      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />

      <Container className="relative z-10 py-16 sm:py-20">
        <SectionHeader
          title="Engineering"
          highlight="Experience"
          subtitle="Production systems delivered. Real impact measured."
        />

        {/* Experience Timeline */}
        <div className="space-y-12 max-w-4xl">
          {engineeringExperience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline connector */}
              {idx < engineeringExperience.length - 1 && (
                <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-blue-400 via-purple-400 to-transparent opacity-20" />
              )}

              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                      typeColors[exp.type]
                    } flex items-center justify-center text-white font-bold`}
                  >
                    {exp.type === "leadership" && "👤"}
                    {exp.type === "engineering" && "⚙️"}
                    {exp.type === "education" && "📚"}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                      {exp.organization}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {exp.period}
                    </p>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Key Achievements
                    </p>
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <span className="text-blue-500 flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                    {Object.entries(exp.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                      >
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {value}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              What This Experience Means
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Not just code—real systems solving real problems. 100+ active
                users depend on platforms I built. Multiple clients have
                deployed production applications. 150+ learners have benefited
                from mentorship grounded in pragmatic, production-grade
                engineering.
              </p>
              <p>
                I don't abstract away complexity—I embrace it. Building
                financial workflows, multi-tenant architectures, role-based
                authorization, and real-time systems has taught me how to
                translate business requirements into robust technical solutions.
              </p>
              <p>
                This is engineering in the real world. The systems work. The
                users stay. The clients are satisfied.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors group"
          >
            Need a Backend Engineer?
            <HiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </div>
  );
};

export default EngineeringExperience;
