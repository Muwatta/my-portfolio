import { useState } from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <motion.div
      className="perspective cursor-pointer"
      onClick={handleFlip}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`relative w-full h-64 transition-transform duration-700 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 bg-white shadow-md flex flex-col items-center justify-center p-4 backface-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-32 object-cover mb-2"
          />
          <h3 className="text-xl font-bold">{project.title}</h3>
        </div>
        {/* Back Side */}
        <div className="absolute inset-0 bg-gray-200 shadow-md flex flex-col items-center justify-center p-4 backface-hidden transform rotate-y-180">
          <p className="text-gray-800 text-center">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
