import { motion } from "framer-motion";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Container } from "../../../components/layout/Container";
import { technicalSkills, skillCategories } from "../../../data";

export const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-32">
      <Container>
        <SectionHeader
          title="Technical"
          highlight="Expertise"
          subtitle="A concise technical focus, backed by the systems and projects shown below."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Core Stack */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-5">
              Technical Focus
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Evidence-based categories */}
          <div className="space-y-6">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="always-dark p-6 rounded-2xl bg-slate-900/50 border border-slate-800"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {category.title}
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
