import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// Lightning flash component that overlays the background.
const Lightning = () => (
  <motion.div
    className="absolute top-0 left-0 w-full h-full pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{
      duration: 0.15, // Quick flash duration
      repeat: Infinity,
      repeatDelay: 3, // Flash every 5 seconds
      ease: "easeInOut"
    }}
    style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
  />
);

export default function Skills() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center px-4 py-12 relative">
      <Helmet>
        <title>Skills | Abdullahi Musliudeen Oladipupo</title>
        <meta
          name="description"
          content="Learn more about Abdullahi Musliudeen Oladipupo - a passionate frontend developer and graduate of Arabic language, dedicated to building engaging user experiences. Connect with me on LinkedIn and other platforms."
        />
      </Helmet>
      
      {/* Lightning effect overlay */}
      <Lightning />
      
      <div className="bg-slate-800 shadow-lg rounded-lg p-8 max-w-4xl w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img 
              className="w-40 h-40 rounded-full object-cover" 
              src="https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741434757/IMG-20241231-WA0094_jf4axb.jpg" 
              alt="Profile"
            />
          </div>
          {/* About Information */}
          <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl font-bold text-slate-100"
            >
              Abdullahi Musliudeen Oladipupo
            </motion.h1>
            <p className="mt-2 text-slate-300">
              I'm a passionate frontend developer and a graduate of Arabic language. I specialize in crafting engaging user experiences with modern web technologies, continuously learning and expanding my skill set. I am eager to collaborate on innovative projects and contribute to transformative ideas.
            </p>
            {/* Social Handles */}
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white" 
                  alt="LinkedIn" 
                  className="h-8" 
                />
              </a>
              <a 
                href="https://twitter.com/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white" 
                  alt="Twitter" 
                  className="h-8" 
                />
              </a>
              <a 
                href="mailto:abdullahmusliudeen@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="https://img.shields.io/badge/Gmail-D14836?style=flat&logo=gmail&logoColor=white" 
                  alt="Email" 
                  className="h-8" 
                />
              </a>
            </div>
            {/* Download CV Button */}
            <div className="mt-10">
              <a 
                href="https://drive.google.com/file/d/1KQ4irwj39ILbZDJjnTqWkeSGvlRZxKKJ/view?usp=drive_link" 
                download 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Skills & Expertise Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-100 text-center">My Skills & Expertise</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">HTML5</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">CSS3</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">JavaScript</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Python</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Git</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Github</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">React</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Tailwind CSS</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Node.js</span>
            <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Automation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
