import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// Lightning flash component that overlays the background.
const Lightning = () => (
  <motion.div
    className="absolute top-0 left-0 w-full h-full pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{
      duration: 0.35,
      repeat: Infinity,
      repeatDelay: 5,
      ease: "easeInOut"
    }}
    style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
  />
);

export default function Skills() {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12 relative"
      style={{ backgroundColor: "#001F3F" }} // Navy-blue outer background
    >
      <Helmet>
        <title>Resume | Abdullahi Musliudeen Oladipupo</title>
        <meta
          name="description"
          content="Learn more about Abdullahi Musliudeen Oladipupo - a passionate frontend developer and Arabic language graduate, dedicated to building engaging digital experiences. Connect with me on LinkedIn and X."
        />
      </Helmet>
      
      {/* Lightning effect overlay */}
      <Lightning />

      {/* Resume Container */}
      <div className="shadow-lg rounded-lg p-8 max-w-4xl w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img 
              className="w-40 h-40 rounded-full object-cover" 
              src="https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg" 
              alt="Profile"
            />
          </div>
          {/* About & Social Information */}
          <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl font-bold text-center"
              style={{ color: "#3B82F6" }} // Blue for header
            >
              Abdullahi Musliudeen Oladipupo
            </motion.h1>
            <p className="mt-2 text-justify" style={{ color: "#E0E7FF" }}>
              I'm a frontend developer with a background in Arabic language, blending art and technology to craft digital experiences that resonate with both culture and functionality.
            </p>
            {/* Social Handles */}
            <div className="mt-4 flex justify-center items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt="LinkedIn"
                  className="h-8 w-8"
                />
              </a>
              <a
                href="https://x.com/MusliudeenAbdu1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
                  alt="X"
                  className="h-8 w-8"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Stacks & Skills Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center" style={{ color: "#fff" }}>
            Mastered Stacks
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              "HTML5", "CSS3", "JavaScript", "Python", "Git", "GitHub", 
              "TypeScript", "React", "Tailwind", "Node.js", "Automation", "Next.js"
            ].map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: "#2563EB", color: "#EFF6FF" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center" style={{ color: "#1E3A8A" }}>
            Resume
          </h2>

          <div className="mt-4 space-y-6">
            {/* Header Card */}
            <div
              className="shadow-md p-4 rounded text-center"
              style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A" }}
            >
              <p className="font-bold text-lg">Abdullahi Musliudeen Oladipupo</p>
              <p className="text-justify">
                Email:{" "}
                <a
                  href="mailto:abdullahmusliudeen@gmail.com"
                  className="hover:underline"
                  style={{ color: "#1E40AF" }}
                >
                  abdullahmusliudeen@gmail.com
                </a>
              </p>
              <p className="text-justify">
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/abdullahi-musliudeen-64435a239/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "#1E40AF" }}
                >
                  linkedin.com/in/abdullahi-musliudeen-64435a239/
                </a>
              </p>
              <p className="font-bold">FRONTEND DEVELOPER || MULTILINGUIST</p>
            </div>

            {/* Professional Summary Card */}
            <div
              className="shadow-md p-4 rounded text-center"
              style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A" }}
            >
              <p className="font-semibold text-xl" style={{ color: "#1E3A8A" }}>
                PROFESSIONAL SUMMARY
              </p>
              <ul className="list-disc list-inside text-justify">
                <li>
                  Dedicated Frontend Developer and Arabic Language Graduate with a passion for creative writing and continuous learning.
                </li>
                <li>
                  Skilled in developing engaging user experiences using modern web technologies.
                </li>
                <li>
                  Proven track record of helping clients build portfolios and collaborating on e-commerce sites.
                </li>
                <li>
                  Experienced in organizing bootcamps and teaching programming.
                </li>
                <li>
                  Currently developing a web past question app for a school.
                </li>
              </ul>
            </div>

            {/* Skills Card */}
            <div
              className="shadow-md p-4 rounded text-center"
              style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A" }}
            >
              <p className="font-semibold text-xl" style={{ color: "#1E3A8A" }}>
                SKILLS
              </p>
              <ul className="list-disc list-inside text-justify">
                <li>
                  <strong>Web Technologies:</strong> HTML5, CSS3, JavaScript, React, Tailwind CSS, Node.js, Python
                </li>
                <li>
                  <strong>Tools:</strong> Git, GitHub, VS Code
                </li>
                <li>
                  <strong>Soft Skills:</strong> Creative Writing, Communication, Continuous Learning, Team Collaboration
                </li>
                <li>
                  <strong>Languages:</strong> English (Fluent), Arabic (Fluent)
                </li>
              </ul>
            </div>

            {/* Education Card */}
            <div
              className="shadow-md p-4 rounded text-center"
              style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A" }}
            >
              <p className="font-semibold text-xl" style={{ color: "#1E3A8A" }}>
                EDUCATION
              </p>
              <ul className="list-disc list-inside text-justify">
                <li>
                  Bachelor’s in Arabic Language — Ahmadu Bello University, Zaria, Nigeria (2019 - 2024)
                </li>
                <li>
                  Frontend Development Studies — Udemy (2023 - 2024)
                </li>
              </ul>
            </div>

{/* Projects Card */}
<div
  className="shadow-md p-4 rounded text-center md:text-center"
  style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A" }}
>
  <p className="font-semibold text-xl" style={{ color: "#1E3A8A" }}>
    PROJECTS
  </p>
  <ul className="space-y-1 list-disc list-inside text-justify">

    <li>
      <span className="font-bold">Animal Speed Clicker Game:</span> Created an interactive JavaScript-based game to improve reflexes and educate children about animals. (Role: Developer)
    </li>
    <li>
      <span className="font-bold">Random ID Project:</span> Built a dynamic web application showcasing responsive design and modern development practices. (Role: Developer)
    </li>
    <li>
      <span className="font-bold">E-commerce Website:</span> Designed and developed a fully responsive e-commerce website focusing on user experience and secure online transactions.
    </li>
    <li>
      <span className="font-bold">Blog for Updates:</span> Created a dynamic blog platform to share updates and insights, integrating modern design and interactive features.
    </li>
    <li>
      <span className="font-bold">Data Filtration Web App:</span> Designed a web application that enables efficient data filtering and visualization for enhanced user decision-making.
    </li>
    <li>
      <span className="font-bold">Daily Budget Tracker App:</span> Developed an intuitive app for tracking daily expenses and managing budgets, ensuring financial insights are at users' fingertips.
    </li>
    <li>
      <span className="font-bold">Event Ticket Application:</span> Developed a web application generating event tickets with QR codes using React and Tailwind CSS
    </li>
  </ul>
</div>

            {/* Experience Card */}
            <div
              className="shadow-md p-4 rounded text-center"
              style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A" }}
            >
              <p className="font-semibold text-xl" style={{ color: "#1E3A8A" }}>
                EXPERIENCE
              </p>
              <ul className="space-y-1 list-disc list-inside text-justify">
                <li>
                  <span className="font-bold">Freelance Frontend Developer:</span> Designed and developed responsive websites for local clients with a focus on enhancing user experience and performance using modern web technologies. Collaborated with clients to build professional portfolios and deliver high-quality web solutions. Worked on an e-commerce site project to drive online business growth. Currently developing a web past question application for a school.
                </li>
              </ul>
            </div>

            {/* Additional Information Card */}
            <div
              className="shadow-md p-4 rounded text-center"
              style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A" }}
            >
              <p className="font-semibold text-xl" style={{ color: "#1E3A8A" }}>
                ADDITIONAL INFORMATION
              </p>
              <ul className="space-y-1 list-disc list-inside text-justify">
                <li>
                  Organized programming bootcamps and taught students, fostering skills in web development.
                </li>
                <li>
                  Active contributor to open-source projects and committed to continuous professional development.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
