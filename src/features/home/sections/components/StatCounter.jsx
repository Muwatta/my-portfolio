import { motion } from "framer-motion";
import { useInView } from "../../../../hooks/useInView";

export const StatCounter = ({ stat, index }) => {
  const [ref, isInView] = useInView(0.5);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="relative group p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-colors"
    >
      <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 font-mono">
        {stat.value}
        {stat.suffix}
      </div>
      <div className="text-slate-300 font-medium text-sm md:text-base mb-1">
        {stat.label}
      </div>
      <div className="text-slate-500 text-xs md:text-sm">{stat.context}</div>
    </motion.div>
  );
};
