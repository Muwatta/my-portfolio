import { motion } from "framer-motion";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Container } from "../../../components/layout/Container";
import { SkillBar } from "./components/SkillBar";
import { technicalSkills, skillCategories } from "../../../data";

export const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-32">
      <Container>
        <SectionHeader
          title="Technical"
          highlight="Expertise"
          subtitle="Core technologies I use to build production systems. No fluff, just tools that ship."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Skill Bars */}
          <div className="space-y-6">
            {technicalSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          {/* Skill Categories */}
          <div className="space-y-6">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800"
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
