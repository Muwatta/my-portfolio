import { motion } from "framer-motion";

const categories = ["All", "Backend", "Full Stack", "Frontend", "IoT + AI"];

export const FilterTabs = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === category
              ? "text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {active === category && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-blue-600 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
};
