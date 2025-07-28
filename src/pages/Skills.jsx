import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ParticleBackground = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{ background: "radial-gradient(circle at 50%, rgba(255,255,255,0.05), transparent)" }}
    animate={{ opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function Skills() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    {
      title: "Professional Summary",
      content: (
        <ul className="list-disc list-inside text-gray-700 text-justify space-y-2">
          <li>Frontend developer, STEM educator, and founder with a background in Arabic Education, passionate about impactful tech solutions.</li>
          <li>Skilled in React, TypeScript, Tailwind, and Next.js, building scalable, maintainable interfaces.</li>
          <li>Leads bootcamps teaching web development, JavaScript, C++, and Scratch to Nigerian students.</li>
          <li>Founder of Algorise Tech Explorers, empowering students with 4IR skills.</li>
          <li>Experienced in IoT and embedded systems with Arduino and ESP32.</li>
          <li>Active content creator and open-source contributor.</li>
        </ul>
      ),
    },
    {
      title: "Skills",
      content: (
        <div>
          <ul className="list-disc list-inside text-gray-700 text-justify space-y-2">
            <li><strong>Frontend Stack:</strong> HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS</li>
            <li><strong>Tooling & Workflow:</strong> Git, GitHub, VS Code, Vite, REST APIs, Socket.IO, Prisma</li>
            <li><strong>Backend & DevOps (Basic):</strong> Node.js, Express, PostgreSQL, CI/CD principles</li>
            <li><strong>Embedded Systems:</strong> Arduino, ESP32, Sensor Integration (Ultrasonic, Soil, Servo, Buzzer)</li>
            <li><strong>Other Skills:</strong> Teaching, Curriculum Design, Creative Writing, Project Leadership</li>
            <li><strong>Languages:</strong> English (Fluent), Arabic (Fluent)</li>
          </ul>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Skill Proficiency</h3>
            <div className="space-y-2 mt-2">
              {["React (90%)", "JavaScript (85%)", "Tailwind CSS (80%)", "IoT Systems (75%)"].map((skill, index) => (
                <div key={skill} className="flex items-center">
                  <span className="w-32 text-gray-700">{skill.split(" (")[0]}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: skill.match(/(\d+)%/)[1] + "%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <ul className="list-disc list-inside text-gray-700 text-justify space-y-2">
          <li>Bachelor’s in Arabic Education — Ahmadu Bello University, Zaria (2019 - 2024)</li>
          <li>Frontend Web Development — Udemy & Self-paced Study (2023 - 2024)</li>
          <li>Embedded Systems and IoT — Self-taught via projects and workshops (2024)</li>
        </ul>
      ),
    },
    {
      title: "Projects",
      content: (
        <ul className="list-disc list-inside text-gray-700 text-justify space-y-2">
          <li><strong>Smart Perishable Goods Marketplace:</strong> Next.js app with IoT sensor data, payment, and analytics to reduce food waste.</li>
          <li><strong>Offline Face Recognition App:</strong> Tracks school staff attendance with face ID and local storage.</li>
          <li><strong>Arduino Reaction Game & Smart Bin:</strong> Built with servo motors and ultrasonic sensors.</li>
          <li><strong>Animal Speed Clicker Game:</strong> Educational JavaScript game for kids.</li>
          <li><strong>Past Question Web App:</strong> School exam platform with scoring and leaderboards.</li>
          <li><strong>Event Ticket App:</strong> Generates QR-coded tickets using React and Tailwind.</li>
        </ul>
      ),
    },
    {
      title: "Experience",
      content: (
        <ul className="list-disc list-inside text-gray-700 text-justify space-y-2">
          <li><strong>Founder, Algorise Tech Explorers (2024 - Present):</strong> Leads tech education for Nigerian youth, teaching web development and IoT.</li>
          <li><strong>Freelance Frontend Developer:</strong> Builds responsive applications like e-commerce platforms and school tools.</li>
          <li><strong>STEM Educator & Workshop Facilitator:</strong> Teaches C++, Scratch, HTML/CSS, and AI to students.</li>
        </ul>
      ),
    },
    {
      title: "Additional Information",
      content: (
        <ul className="list-disc list-inside text-gray-700 text-justify space-y-2">
          <li>Trains students in web development, Scratch, C++, and cloud concepts.</li>
          <li>Creates weekly tech content on LinkedIn.</li>
          <li>Delivers workshops on AI, web development, and digital skills.</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 sm:py-16 relative bg-gradient-to-b from-gray-900 to-blue-950">
      <Helmet>
        <title>Skills | Abdullahi Musliudeen Oladipupo</title>
        <meta
          name="description"
          content="Explore Abdullahi Musliudeen Oladipupo's skills as a frontend developer, STEM educator, and founder empowering youth through technology."
        />
      </Helmet>

      <ParticleBackground />

      <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-8 relative z-10">
        {/* Main Content */}
        <div className="flex-1 bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center mb-8">
            <motion.img
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg"
              src="https://res.cloudinary.com/dee5edoss/image/upload/w_400,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg"
              alt="Abdullahi Musliudeen Oladipupo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              loading="lazy"
            />
            <div className="mt-6 sm:mt-0 sm:ml-8 text-center sm:text-left">
              <motion.h1
                className="text-3xl sm:text-4xl font-extrabold text-blue-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Abdullahi Musliudeen Oladipupo
              </motion.h1>
              <p className="mt-2 text-gray-600 text-lg">
                Frontend Developer | STEM Educator | Founder
              </p>
              <div className="mt-4 flex justify-center sm:justify-start space-x-4">
                <a
                  href="https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                    alt="LinkedIn"
                    className="h-8 w-8 hover:opacity-80 transition-opacity"
                  />
                </a>
                <a
                  href="https://x.com/MusliudeenAbdu1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Profile"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
                    alt="X"
                    className="h-8 w-8 hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Mastered Stacks */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-center text-white mb-4">Mastered Stacks</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind", "Node.js", "Next.js", "Git", "GitHub", "Vite", "Python", "Arduino", "ESP32", "Raspberry Pi"].map((tech) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Resume Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="mb-6"
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
                    className="bg-white bg-opacity-90 rounded-lg p-6 mt-2 shadow-md"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Download Resume CTA */}
          <div className="text-center mt-8">
            <a
              href="/resume.pdf"
              download
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Download Resume"
            >
              Download Resume
            </a>
          </div>
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
                <a
                  href="/contact"
                  className="text-blue-300 hover:text-blue-400 transition-colors"
                  aria-label="Contact Me"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}