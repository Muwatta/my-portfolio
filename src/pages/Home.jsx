import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
// Animated background for subtle visual effect
const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900 opacity-80">
    <motion.div
      className="absolute inset-0"
      style={{ background: "radial-gradient(circle at 50%, rgba(255,255,255,0.1), transparent)" }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const projects = [
  {
    id: 1,
    title: "Scratch Coding",
    category: "Branding",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465823/IMG-20241230-WA0032_hzmxke.jpg",
    description: "Kids learning to code with Scratch.",
  },
  {
    id: 2,
    title: "Bootcamp Attendees",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465826/IMG-20250105-WA0014_cre4mh.jpg",
    description: "Some of the bootcamp attendees.",
  },
  {
    id: 3,
    title: "9-Year-Old Developer",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465823/IMG-20241230-WA0017_sxyaqi.jpg",
    description: "Learning JavaScript after 12 Scratch projects.",
  },
  {
    id: 4,
    title: "ATE Convener & Students",
    category: "Illustration",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465824/IMG-20250103-WA0008_lvaxeu.jpg",
    description: "ATE Convener with students.",
  },
  {
    id: 5,
    title: "On-Session",
    category: "UI/UX",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1739290847/Hassana-others_znwnly.jpg",
    description: "Session with students.",
  },
  {
    id: 6,
    title: "ATE Team",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465826/IMG-20250105-WA0008_dxjjn1.jpg",
    description: "Indefatigable team members.",
  },
  {
    id: 7,
    title: "Nigeria Fintech Week '23",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741467076/myself_finTech_week_brwsi3.jpg",
    description: "At Nigeria Fintech Week in Lekki.",
  },
  {
    id: 8,
    title: "Bootcamp Closing",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465823/IMG-20250101-WA0013_dd3qlv.jpg",
    description: "Formal closing of the bootcamp.",
  },
  {
    id: 9,
    title: "EdTech Challenge",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1748055293/IMG-20250417-WA0009_u0hipk.jpg",
    description: "Regional-National virtual presentation.",
  },
  {
    id: 10,
    title: "Girls in ICT Award",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1748055267/IMG_20250430_142055_942_1296526293_mhznpl.jpg",
    description: "Among finalists at Girls in ICT.",
  },
  {
    id: 11,
    title: "National Event",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1748055281/IMG-20250503-WA0015_pb0il2.jpg",
    description: "Showcasing at the National event in Abuja.",
  },
  {
    id: 12,
    title: "Brainiac Quiz App",
    category: "Web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_16:9,c_fill,g_auto,e_sharpen/v1748057065/Screenshot_2025-05-24_042302_mo4osb.png",
    description: "Presented at Girls in ICT pitching.",
  },
];

const testimonials = [
  {
    quote: "Muwatta’s bootcamps transformed my daughter’s confidence in coding. She’s now building her own apps!",
    author: "Parent, Jos",
  },
  {
    quote: "His mentorship helped our team reach the National ICT Competition finals. Truly inspiring!",
    author: "Student, Abuja",
  },
  {
    quote: "Muwatta’s passion for teaching tech is contagious. His workshops are engaging and impactful.",
    author: "Colleague, Tech Educator",
  },
  {
    quote: "The Algorise Tech Explorers program opened new opportunities for our school’s students.",
    author: "School Administrator, Jos",
  },
  {
    quote: "Muwatta’s ability to simplify complex concepts made learning to code accessible for my child.",
    author: "Parent, Lagos",
  },
];

export default function Home() {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative bg-gray-900 min-h-screen">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
         <Helmet>
      <title>Homepage | Abdullahi Musliudeen Oladipupo</title>
      <meta name="description" content="Frontend Developer & Tech Trainer" />
    </Helmet>
        {/* Hero Section */}
        <header className="flex flex-col md:flex-row items-center justify-center mb-12 sm:mb-16 space-y-8 md:space-y-0 md:space-x-12 text-center md:text-left">
          <motion.img
            src="https://res.cloudinary.com/dee5edoss/image/upload/w_300,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741428140/1735997370137_hjnkf0.jpg"
            alt="Muwatta, Frontend Developer and Educator"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            loading="lazy"
          />
          <div className="max-w-lg">
            <motion.p
              className="text-xl sm:text-2xl font-semibold text-blue-400 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transforming Lives Through Code and Education
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hi, I'm Muwatta
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Educator | Frontend Developer | IoT Innovator | Empowering the Next Generation
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/portfolio"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="View Muwatta's Portfolio"
              >
                Explore My Work
              </Link>
              <a
                href="/resume.pdf"
                className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Download Muwatta's Resume"
                download
              >
                Download Resume
              </a>
            </div>
          </div>
        </header>

        {/* Skills Highlight */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">What I Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Frontend Development", "IoT & Embedded Systems", "Tech Education", "Community Building"].map((skill, index) => (
              <motion.div
                key={skill}
                className="bg-gray-800 bg-opacity-80 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-blue-300">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Project Carousel */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">Featured Project</h2>
          <div className="relative max-w-3xl mx-auto">
            <motion.div
              className="bg-gray-800 bg-opacity-80 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6"
              key={projects[currentProject].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={projects[currentProject].image}
                alt={projects[currentProject].title}
                className="w-full sm:w-1/2 h-48 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-white">{projects[currentProject].title}</h3>
                <p className="text-gray-300 mt-2">{projects[currentProject].description}</p>
                <Link
                  to="/portfolio"
                  className="mt-4 inline-block text-blue-400 hover:underline"
                  aria-label={`View details of ${projects[currentProject].title}`}
                >
                  See More
                </Link>
              </div>
            </motion.div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevProject}
                className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous Project"
              >
                ←
              </button>
              <button
                onClick={nextProject}
                className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next Project"
              >
                →
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">Impact & Testimonials</h2>
          <div className="relative max-w-3xl mx-auto">
            <motion.div
              className="bg-gray-800 bg-opacity-80 p-6 rounded-lg"
              key={testimonials[currentTestimonial].quote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-300 italic text-lg">"{testimonials[currentTestimonial].quote}"</p>
              <p className="text-blue-300 mt-2 font-semibold">— {testimonials[currentTestimonial].author}</p>
            </motion.div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevTestimonial}
                className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous Testimonial"
              >
                ←
              </button>
              <button
                onClick={nextTestimonial}
                className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next Testimonial"
              >
                →
              </button>
            </div>
          </div>
          <p className="text-center text-gray-300 mt-6 text-xl font-semibold">
            Trained <strong>50+ students</strong> and led teams to <strong>national recognition</strong>.
          </p>
        </section>

        {/* Summary Section */}
        <section className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">My Impact at a Glance</h2>
          <motion.div
            className="bg-gray-800 bg-opacity-80 rounded-lg p-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-300 mb-4">
              From building innovative web apps to mentoring over 50 students through Algorise Tech Explorers, I combine technical expertise with a passion for education. My projects, like the Brainiac Quiz App, and achievements, such as guiding teams to the National ICT Competition finals, showcase my commitment to creating impactful solutions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-300">Bootcamp</p>
                <p className="text-gray-300">60+ students Trained</p>
              </div>
              <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-300">10+</p>
                <p className="text-gray-300">Projects Built</p>
              </div>
              <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-300">Finalist</p>
                <p className="text-gray-300">Girls in ICT Award</p>
              </div>
              <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-300">2nd runner-up</p>
                <p className="text-gray-300">African Intelligence Hackathon</p>
              </div>
              <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-300">Staff Training</p>
                <p className="text-gray-300">Trained 20+ staff on EdTech demanding skills</p>
              </div>
              <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-300">Tech Advocate</p>
                <p className="text-gray-300">Promoted tech literacy and access in underserved communities</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact CTA */}
        <section className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Let’s Build Together</h2>
          <p className="text-lg text-gray-300 mb-6 select-none">
            Got a project or want to join my mission to empower the next generation? Reach out, and let’s make something impactful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Contact Muwatta"
            >
              Contact Me
            </Link>
            <Link
              to="/workshops"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Join Muwatta's Workshops"
            >
              Join My Workshops
            </Link>
          </div>
        </section>

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
}