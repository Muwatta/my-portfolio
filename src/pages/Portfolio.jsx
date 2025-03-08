import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const defaultProjects = [
  {
    id: 1,
    title: "Brand Identity for Tech Startup",
    category: "branding",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1739290847/Hassana-others_znwnly.jpg",
    description: "Logo and brand guidelines for a SaaS company.",
  },
  {
    id: 2,
    title: "Website Redesign for Fashion Brand",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741426739/Screenshot_20250308-102829_fkuajq.jpg",
    description: "Modern, responsive design for an online boutique.",
  },
  {
    id: 3,
    title: "Print Campaign for Restaurant",
    category: "print",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/c_thumb,w_200,g_face/v1741426739/Screenshot_20250308-103005_e6m60t.jpg",
    description: "Creative poster designs and menus for a high-end restaurant.",
  },
  {
    id: 4,
    title: "Illustration Series",
    category: "illustration",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741426739/Screenshot_20250308-103253_tpel8r.jpg",
    description: "A series of detailed illustrations for a campaign.",
  },
  {
    id: 5,
    title: "Logo Redesign for Nonprofit",
    category: "branding",
    image: "https://via.placeholder.com/400x300",
    description: "Updated logo and branding for an NGO.",
  },
  {
    id: 6,
    title: "Packaging Design for Gourmet Snacks",
    category: "packaging",
    image: "https://via.placeholder.com/400x300",
    description: "Innovative packaging design that stands out on shelves.",
  },
  {
    id: 7,
    title: "Editorial Layout for Magazine",
    category: "print",
    image: "https://via.placeholder.com/400x300",
    description: "Dynamic layouts and typography for a lifestyle magazine.",
  },
  {
    id: 8,
    title: "Social Media Campaign",
    category: "digital",
    image: "https://via.placeholder.com/400x300",
    description: "Engaging visuals designed for a social media campaign.",
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
