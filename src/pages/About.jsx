import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ParticleBackground = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{ background: "radial-gradient(circle at 50%, rgba(255,255,255,0.05), transparent)" }}
    animate={{ opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />
);

const About = () => {
  const [openSections, setOpenSections] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const testimonials = [
    {
      quote: "Muwatta’s bootcamps ignited my passion for coding. I am launching my first app at 10!",
      author: "Muhammad, Jos",
    },
    {
      quote: "His leadership in Algorise Tech Explorers is transforming tech education in Jos.",
      author: "Colleague, Kwara",
    },
    {
      quote: "Muwatta’s workshops are engaging and empowering. He makes tech accessible!",
      author: "Parent, Lagos",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const sections = [
    {
      title: "From Classroom to Code",
      content: (
        <div className="space-y-4">
          <p className="text-gray-200">
            My roots lie in Arabic Education, teaching in classrooms filled with chalk dust and eager students. I cherished the "aha!" moments when ideas clicked, but a quiet voice urged me to explore beyond the blackboard.
          </p>
          <p className="text-gray-200">
            Technology wasn’t an instant love. I wrestled with code, leaned on late-night YouTube tutorials, and broke things often. Each error taught me resilience. I wasn’t just learning, I was becoming a creator.
          </p>
        </div>
      ),
    },
    {
      title: "Crafting Impactful Experiences",
      content: (
        <div className="space-y-4">
          <p className="text-gray-200">
            I taught myself frontend development—HTML, CSS, JavaScript, React, Tailwind, Next.js—focusing on crafting experiences that resonate. Coding, I realized, mirrors teaching: it’s about clarity, engagement, and impact.
          </p>
          <p className="text-gray-200">
            This sparked <strong>Algorise Tech Explorers</strong>, my mission to empower Nigerian students with 4IR skills. It’s not just about code—it’s about fostering confidence to create, fail, and rise again, just as I did.
          </p>
        </div>
      ),
    },
    {
      title: "Empowering the Next Generation",
      content: (
        <div className="space-y-4">
          <p className="text-gray-200">
            Through tech bootcamps, I’ve trained over 50 students, watching them grow into confident builders. Some reached the finals of the <strong>National ICT Competition for Girls</strong> in Abuja—a proud milestone rooted in Jos.
          </p>
          <p className="text-gray-200">
            Today, I build real-world projects, lead workshops, and create content for aspiring coders. I teach Frontend, Scratch, C++ for embedded systems, and guide students in crafting smart devices with Arduino and Raspberry Pi. My bootcamps cover Web Dev and Scratch for kids as young as seven.
          </p>
        </div>
      ),
    },
    {
      title: "My Philosophy",
      content: (
        <div className="space-y-4">
          <p className="text-gray-200">
            My core belief? <strong>Your past doesn’t define your future.</strong> If an Arabic graduate can build full-stack apps and mentor young innovators, so can you.
          </p>
          <p className="text-gray-200">
            This journey isn’t just about tech—it’s about purpose and progress. I’m just getting started, <em>In Sha'a Allah</em>.
          </p>
        </div>
      ),
    },
  ];

  const milestones = [
    { year: "2019-2024", event: "Earned Bachelor’s in Arabic Education, Ahmadu Bello University" },
    { year: "2023", event: "Began self-learning frontend development" },
    { year: "2024", event: "Founded Algorise Tech Explorers" },
    { year: "2024", event: "Trained 50+ students in tech bootcamps" },
    { year: "2025", event: "Led students to National ICT Competition finals" },
    { year: "2025", event: "2nd Runner-Up, African Intelligence LMS Hackathon" },
    { year: "2025", event: "Bootcamp 2.0 | teamed to trained primary & students on Embedded system, AI & ML, Web Dev"},
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please fill out all fields.");
      return;
    }
    try {
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus("Thank you for your feedback!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("Failed to send feedback. Please try again.");
      }
    } catch (error) {
      setFormStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16 bg-gradient-to-b from-gray-900 to-blue-950 relative">
      <Helmet>
        <title>About | Abdullahi Musliudeen Oladipupo</title>
        <meta name="description" content="Frontend Developer & Tech Trainer" />
      </Helmet>
      <ParticleBackground />
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Main Content */}
        <div className="flex-1">
          <motion.section
            className="bg-gray-800 bg-opacity-90 rounded-2xl shadow-xl p-6 sm:p-10 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-300 mb-6" aria-label="My Story">
              My Story
            </h2>
            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex justify-between items-center text-xl font-semibold text-white bg-blue-800 bg-opacity-80 rounded-lg p-4 hover:bg-blue-700 transition-colors"
                    aria-expanded={openSections[section.title] || false}
                    aria-controls={`section-${section.title.toLowerCase().replace(" ", "-")}`}
                  >
                    {section.title}
                    {openSections[section.title] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  <AnimatePresence>
                    {openSections[section.title] && (
                      <motion.div
                        id={`section-${section.title.toLowerCase().replace(" ", "-")}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 rounded-lg p-6 mt-2 text-gray-200 text-base sm:text-lg leading-relaxed"
                      >
                        {section.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Contact me to collaborate"
              >
                Get in Touch
              </Link>
              <a
                href="/resume.pdf"
                download
                className="inline-block px-8 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Download Resume"
              >
                Download Resume
              </a>
            </div>
          </motion.section>

          {/* Milestone Timeline */}
          <motion.section
            className="bg-gray-800 bg-opacity-90 rounded-2xl shadow-xl p-6 sm:p-10 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-300 mb-6">Milestones</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center mb-8 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-1/2 px-4">
                    <div className="bg-gray-900 rounded-lg p-4 shadow-md">
                      <p className="text-blue-300 font-semibold">{milestone.year}</p>
                      <p className="text-gray-200">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonial Carousel */}
          <motion.section
            className="bg-gray-800 bg-opacity-90 rounded-2xl shadow-xl p-6 sm:p-10 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-300 mb-6">What People Say</h2>
            <div className="relative max-w-3xl mx-auto">
              <motion.div
                key={testimonials[currentTestimonial].quote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 rounded-lg p-6 text-center"
              >
                <p className="text-gray-200 italic text-lg">"{testimonials[currentTestimonial].quote}"</p>
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
          </motion.section>

       </div>

        {/* Sticky Sidebar */}
        <div className="hidden lg:block w-64">
          <div className="sticky top-24 bg-gray-800 bg-opacity-90 rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="text-blue-300 hover:text-blue-400 transition-colors w-full text-left"
                    aria-label={`Jump to ${section.title}`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-blue-300 hover:text-blue-400 transition-colors"
                  aria-label="Contact Me"
                >
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;