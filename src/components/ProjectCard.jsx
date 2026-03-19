import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

export default function ProjectCard({ project, index = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Mouse position for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Transform mouse position to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleFlip = (e) => {
    // Prevent flip if clicking on buttons
    if (e.target.closest("button") || e.target.closest("a")) return;
    setIsFlipped(!isFlipped);
  };

  // Color mapping for tech stacks
  const techColors = {
    React: "from-blue-400 to-cyan-400",
    "Next.js": "from-gray-700 to-black",
    "Node.js": "from-green-500 to-emerald-600",
    MongoDB: "from-green-600 to-green-800",
    PostgreSQL: "from-blue-600 to-indigo-600",
    TypeScript: "from-blue-500 to-blue-700",
    IoT: "from-orange-500 to-red-500",
    MQTT: "from-purple-500 to-pink-500",
    default: "from-slate-600 to-slate-800",
  };

  return (
    <div className="relative group" style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        className="relative w-full aspect-[4/3] cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleFlip}
        transition={{
          opacity: { duration: 0.5, delay: index * 0.1 },
          y: { duration: 0.5, delay: index * 0.1 },
          rotateY: {
            duration: 0.8,
            type: "spring",
            stiffness: 260,
            damping: 20,
          },
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          {/* Dynamic Glare Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isHovered ? 1 : 0.8, x: 0 }}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300 text-xs font-semibold">
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              {project.title}
            </h3>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech?.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className={`text-xs px-2 py-1 rounded-md bg-gradient-to-r ${techColors[tech] || techColors.default} text-white font-medium`}
                >
                  {tech}
                </span>
              ))}
              {project.tech?.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-md bg-slate-700 text-slate-300">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* Flip Hint */}
            <motion.div
              className="flex items-center gap-2 text-slate-400 text-sm"
              animate={{ opacity: isHovered ? 1 : 0.6 }}
            >
              <span className="w-8 h-[1px] bg-slate-400" />
              Click to flip
            </motion.div>
          </div>

          {/* Corner Decoration */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <motion.span
              animate={{ rotate: isHovered ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-white text-lg"
            >
              ↻
            </motion.span>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden bg-slate-900 border border-slate-800"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative h-full p-6 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-1">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm">{project.category}</p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {/* Full Tech Stack */}
            <div className="mb-6">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <motion.a
                href={project.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={18} />
                Code
              </motion.a>
              <motion.a
                href={project.live || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink size={18} />
                Live Demo
              </motion.a>
            </div>

            {/* Flip Back Hint */}
            <motion.div
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              <span className="text-slate-400 text-lg">↩</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute -inset-2 rounded-2xl bg-blue-500/20 blur-2xl -z-10"
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
