import { motion } from "framer-motion";
import { useInView } from "../../../../hooks/useInView";

export const SkillBar = ({ skill, index }) => {
  const [ref, isInView] = useInView(0.3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-slate-200">{skill.name}</span>
        <span className="text-slate-400 font-mono text-sm">{skill.level}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};
