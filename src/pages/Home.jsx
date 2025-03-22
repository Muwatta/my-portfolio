import { motion } from "framer-motion";
import Portfolio from "./Portfolio";

// Snowflake component: A simple white circle that falls from top to bottom in a loop.
const Snowflake = ({ left, delay, duration }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "-10px",
        left: `${left}%`,
        width: "8px",
        height: "8px",
        backgroundColor: "white",
        borderRadius: "50%",
        opacity: 0.8,
      }}
      animate={{ y: [0, 1000] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
};

// Snowfall component: Generates multiple snowflakes with randomized positions and timings.
const Snowfall = () => {
  const snowflakes = [];
  const numberOfSnowflakes = 20;
  for (let i = 0; i < numberOfSnowflakes; i++) {
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 5 + Math.random() * 5; 
    snowflakes.push(
      <Snowflake key={i} left={left} delay={delay} duration={duration} />
    );
  }
  return <>{snowflakes}</>;
};

const projects = [
  {
    id: 1,
    title: "Scratch Coding",
    category: "branding",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465823/IMG-20241230-WA0032_hzmxke.jpg",
    description: "Kids learning to code with Scratch.",
  },
  {
    id: 2,
    title: "Bootcamp Attendees",
    category: "web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465826/IMG-20250105-WA0014_cre4mh.jpg",
    description: "Some of the bootcamp attendee",
  },
  {
    id: 3,
    title: "9-Year-old developer ",
    category: "web",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465823/IMG-20241230-WA0017_sxyaqi.jpg",
    description: "He is currently learning JavaScript after building 12 different Scratch projects",
  },
  {
    id: 4,
    title: "ATE Convener and some students",
    category: "illustration",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465824/IMG-20250103-WA0008_lvaxeu.jpg",
    description: "ATE Convener and his students",
  },
  {
    id: 5,
    title: "on-session",
    category: "UI/UX",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1739290847/Hassana-others_znwnly.jpg",
    description: "Session with the students",
  },
  {
    id: 6,
    title: "The men around the train of ATE",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465826/IMG-20250105-WA0008_dxjjn1.jpg",
    description: "Indefatigable team members",
  },
  {
    id: 7,
    title: "Nigeria-Fintech-Week'23 @ Lekki, Lagos",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741467076/myself_finTech_week_brwsi3.jpg",
    description: "Myself during the FinTech week",
  },
  {
    id: 8,
    title: "Formal Closing",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741465823/IMG-20250101-WA0013_dd3qlv.jpg",
    description: "Formal closing of the bootcamp",
  },
];

export default function Home() {
  return (
    // Outer container with a dark (night) background and relative positioning for the snow overlay.
    <div className="relative bg-gray-900 min-h-screen">
      {/* Snowfall effect */}
      <Snowfall />

      {/* Main content container; set z-index so it appears above the snow */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <header className="flex flex-col md:flex-row items-center justify-center mb-12 space-y-6 md:space-y-0 md:space-x-8 text-center md:text-left">
          <img
            src="https://res.cloudinary.com/dee5edoss/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741428140/1735997370137_hjnkf0.jpg"
            alt="Muwatta Picture"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
          <div>
            {/* Animated heading that loops every 5 seconds */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 1, 0], y: [-20, 0, 0, -20] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-5xl font-bold text-white"
            >
              Hi, I'm Muwatta
            </motion.h1>
            {/* Animated paragraph with a slight delay, looping in sync */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 1, 0], y: [-20, 0, 0, -20] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.6 }}
              className="mt-4 text-xl text-gray-300"
            >
              Software Developer || Educator || Convener || Multilinguist
            </motion.p>
            <a
              href="/Portfolio"
              className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded no-underline hover:bg-blue-600 transition-colors"
            >
              View My Work
            </a>
          </div>
        </header>

        {/* Featured Projects Section */}
        <section className="mb-8">
          <Portfolio projects={projects} />
        </section>

        {/* About Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">My inspiration</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto select-none"
            style={{ textAlign: "justify" }}
            >
          My technology journey began in the wake of the Covid-19 pandemic during my second year (200L) at university.
            With a goal of integrating technology into Arabic culture and education, and ensuring financial security,
            I embarked on a quest to explore diverse technological realms—from cloud computing to data science.
            <br /><br />
            However, a turning point came when I narrowly missed the AWS Practitioner exam with a score of 686,
            which redirected my path toward web development. This experience not only ignited my passion for building
            innovative digital experiences but also deepened my commitment to making technology accessible to all.
            <br /><br />
            Today, I stand as a passionate software developer, educator, and convener. I share my knowledge by teaching
            coding to students and organizing bootcamps to empower aspiring developers. Every project I undertake is a
            chapter in my story—a narrative of exploration, resilience, and the relentless pursuit of innovation.
            I believe in transforming challenges into opportunities and ideas into impactful solutions.
          </p>
        </section>

        {/* Contact Call-to-Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Let's Connect</h2>
          <p className="text-lg text-gray-300 select-none">
            Whether you have a project in mind or just want to say hello, feel free to get in touch.
          </p>
          <a
            href="/Contact"
            className="mt-4 inline-block px-6 py-3 bg-green-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Mail Me
          </a>
        </section>
      </div>
    </div>
  );
}
