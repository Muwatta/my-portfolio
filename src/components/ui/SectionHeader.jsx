import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";

export const SectionHeader = ({
  title,
  highlight,
  subtitle,
  align = "center",
  className = "",
  headingLevel = "h2",
}) => {
  const [ref, isInView] = useInView(0.2);

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  const Heading = headingLevel === "h1" ? "h1" : "h2";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${alignClasses[align]} ${className}`}
    >
      <Heading className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}{" "}
        {highlight && (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            {highlight}
          </span>
        )}
      </Heading>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
