import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const defaultProjects = [
  {
    id: 1,
    title: "AI Text Processing Using API",
    category: "API",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741622032/AIText_cwd9xe.png",
    description: "A web app that uses an AI API to process text data.",
  },
  {
    id: 2,
    title: "Data Filteration Dashboard",
    category: "dashboard",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741622032/Data-Filteration_ggkqyy.png",
    description: "A dashboard that filters and visualizes data from a database.",
  },
  {
    id: 3,
    title: "Blog Design for Daily Updates",
    category: "Blog",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741622031/Blog_wjxgcg.png",
    description: "A clean and modern blog design for daily updates.",
  },
  {
    id: 4,
    title: "Login Detail Illustration",
    category: "illustration",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741622033/login_detail_akpaok.png",
    description: "Illustration for a login page with user details.",
  },
  {
    id: 5,
    title: "E-commerce Website Design",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741622033/onlineStore_jojmcp.png",
    description: "Modern and responsive design for an e-commerce website.",
  },
  {
    id: 6,
    title: "Budget-Tracker App Design",
    category: "app",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741426739/Screenshot_20250308-103005_e6m60t.jpg",
    description: "A mobile app design for tracking personal finances.",
  },
  {
    id: 7,
    title: "Event Ticket Design",
    category: "print",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741426739/Screenshot_20250308-103253_tpel8r.jpg",
    description: "A ticket design for a Fest event with perforated edges.",
  },
  {
    id: 8,
    title: "Animal Web Game Design",
    category: "game",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741426739/Screenshot_20250308-103124_fpgq9d.jpg",
    description: "A web game design with animal characters and UI elements.",
  },
];

// Inline component to handle flipping animation
function FlippableCard({ project }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      onClick={() => setFlipped(!flipped)}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ perspective: 1000 }}
      className="cursor-pointer w-full h-64"
    >
      <div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <ProjectCard project={project} />
        </div>
        {/* Back side */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="bg-white p-4 rounded shadow-lg flex items-center justify-center h-full">
            <p className="text-center text-gray-800">{project.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio({ projects = defaultProjects }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="px-4 py-8 bg-gradient-to-br from-indigo-800 to-purple-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center text-white">Portfolio</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FlippableCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
