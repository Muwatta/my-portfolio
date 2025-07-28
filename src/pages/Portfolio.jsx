import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Lightning = () => (
  <motion.div
    className="absolute top-0 left-0 w-full h-full pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.5, 0] }}
    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
    style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.15), transparent)" }}
  />
);

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "AI Text Processing",
      category: "API",
      image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741622032/AIText_cwd9xe.png",
      description: "Web app using AI API for text processing and analysis."
    },
    {
      id: 2,
      title: "Data Filteration Dashboard",
      category: "Dashboard",
      image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741622032/Data-Filteration_ggkqyy.png",
      description: "Dashboard for filtering and visualizing database data."
    },
    {
      id: 3,
      title: "Blog for Daily Updates",
      category: "Web",
      image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741622031/Blog_wjxgcg.png",
      description: "Modern blog design for daily content updates."
    },
    {
      id: 4,
      title: "E-commerce Website",
      category: "Web",
      image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741622033/onlineStore_jojmcp.png",
      description: "Responsive e-commerce platform with modern design."
    },
    {
      id: 5,
      title: "Budget-Tracker App",
      category: "App",
      image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741426739/Screenshot_20250308-103005_e6m60t.jpg",
      description: "Mobile app for tracking personal finances."
    },
    {
      id: 6,
      title: "Brainiac-Quiz",
      category: "Web",
      image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1748057065/Screenshot_2025-05-24_042302_mo4osb.png",
      description: "Offline quiz app for school-based questions."
    },
    {
      id: 7,
      title: "Smart Perishable Goods Marketplace",
      category: "Web",
      image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741622033/onlineStore_jojmcp.png",
      description: "Next.js app with IoT for food waste reduction."
    },
    {
      id: 8,
      title: "Soil Irrigation System",
      category: "IoT",
      image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741426739/Screenshot_20250308-103005_e6m60t.jpg",
      description: "Arduino-based irrigation system for farming."
    },
  ];

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16 bg-gradient-to-b from-gray-900 to-blue-950 relative font-sans">
      <Helmet>
        <title>Portfolio | Abdullahi Musliudeen Oladipupo</title>
        <meta name="description" content="Explore Abdullahi Musliudeen Oladipupo's portfolio of web development, IoT, and educational projects." />
      </Helmet>

      <Lightning />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Profile Header Card */}
        <motion.section
          className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-12 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg border-2 border-blue-500 mx-auto mb-4"
            src="https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg"
            alt="Abdullahi Musliudeen Oladipupo"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.h1
            className="text-2xl sm:text-3xl font-extrabold text-blue-300 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Abdullahi Musliudeen Oladipupo
          </motion.h1>
          <p className="text-lg text-gray-300 mb-2">Frontend Developer | STEM Educator | Founder</p>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Building impactful tech solutions to empower Nigerian youth.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-6 h-6 text-blue-400 hover:text-blue-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="https://x.com/MusliudeenAbdu1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile"
            >
              <svg className="w-6 h-6 text-blue-400 hover:text-blue-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
              </svg>
            </a>
          </div>
        </motion.section>

        {/* Portfolio Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-300 mb-4">Portfolio</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Explore my projects in web development, IoT, and educational technology.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-lg p-5 shadow-lg hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <div className="relative">
                  <span className="absolute top-0 right-0 px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full -translate-y-6">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                <Link
                  to={`/portfolio/${project.id}`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`View details of ${project.title}`}
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/contact"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Contact Me"
            >
              Get in Touch
            </Link>
          </div>
        </motion.section>

        {/* Back to Top Button */}
        <motion.button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to Top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ↑
        </motion.button>
      </div>
    </div>
  );
};

export default Portfolio;