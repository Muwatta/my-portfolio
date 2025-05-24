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
    title: "Nigeria-Fintech-Week'23 @ Lekki",
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
  {
    id: 9,
    title: "Regional-National Virtual presentation solved EdTech Challenge",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/v1748055293/IMG-20250417-WA0009_u0hipk.jpg",
    description: "Formal closing of the bootcamp",
  },
  {
    id: 10,
    title: "Girls in ICT-National Award among the finalists selected",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1748055267/IMG_20250430_142055_942_1296526293_mhznpl.jpg",
    description: "National Award among the last finalists",
  },
  {
    id: 11,
    title: "Showing up at the National",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/v1748055281/IMG-20250503-WA0015_pb0il2.jpg",
    description: "Showing up at the National event in Abuja",
  },
  {
    id: 11,
    title: "Brainiac-Quiz App presented at the Girls in ICT-pitching",
    category: "web",
    image: "https://res.cloudinary.com/dee5edoss/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1748057065/Screenshot_2025-05-24_042302_mo4osb.png",
    description: "Showing up at the National event in Abuja",
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
              transition={{ duration: 10, repeat: Infinity }}
              className="text-5xl font-bold text-white"
            >
              Hi, I'm Muwatta
            </motion.h1>
            {/* Animated paragraph with a slight delay, looping in sync */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 1, 0], y: [-20, 0, 0, -20] }}
              transition={{ duration: 10, repeat: Infinity, delay: 0.6 }}
              className="mt-4 text-xl text-gray-300"
            >Educator | Frontend Dev | Embedded & IoT Builder | Arabic & Tech Multilinguist



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
<section className="mb-12 flex justify-center">
  <div className="bg-gray-800 bg-opacity-90 rounded-xl shadow-lg p-8 w-full max-w-2xl lg:max-w-5xl text-center">
    <h2 className="text-3xl font-bold mb-4 text-white">My Story</h2>
    <div
      className="text-lg text-gray-300 select-none md:columns-2 gap-8 text-justify"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-blue-300">From Arabic Classrooms to Grassroots Innovation Lab: My Journey Into Tech Empowerment</h2>
        <h5 className="text-lg font-medium mb-2 text-blue-200">I didn't start in tech.</h5>
        <p className="mb-2">
          In fact, I studied Arabic Education. I spent years in classrooms, surrounded by chalkboards, dusty textbooks, and curious young minds. I loved teaching—the human connection, the “aha!” moments, the way a student’s eyes lit up when a concept finally made sense. But something inside me always whispered, <em>“There’s more you can do. Learn a new skill. Keep going.”</em>
        </p>
        <p className="mb-2">
          Then I discovered technology.
        </p>
        <p className="mb-2">
          It wasn’t love at first sight. I struggled. I Googled everything. I watched YouTube tutorials deep into the night while my friends slept. I broke code more times than I can count. Slowly but surely, something shifted: I stopped being afraid of errors and started learning from them. I wasn’t just learning anymore: I was becoming a builder. 
        </p>
        <p className="mb-2">
          That shift changed everything.
        </p>
        <p className="mb-2">
          I taught myself frontend development: HTML, CSS, JavaScript, React, Tailwind, Next.js. Not just the syntax, but the art of building things people could use and feel. I realized that coding wasn’t so different, it was about making things clear, engaging, and powerful.
        </p>
        <p className="mb-2">
          I founded <strong>Algorise Tech Explorers</strong> with a mission: <strong>help Nigerian school students unlock their potential with 4IR (Fourth Industrial Revolution) skills</strong>. Not just code, but the confidence to create, fail, and try again. Because I’ve been there too; curious, scared, unsure of where to begin.
        </p>
            </div>
      <div>
        <p className="mb-2">
          Since then, I’ve successfully organized a tech bootcamp and trained over 50 students. Watching them grow from curious learners into confident builders has been one of the most fulfilling parts of my journey.
        </p>
        <p className="mb-2">
          Some of my students even made it to the <strong>finals of the National ICT Competition for Girls</strong> in Abuja. A proud moment that started all the way from Jos. Their victory wasn’t just theirs. It was ours. A testimony that grassroots innovation matters.
        </p>
        <p className="mb-2">
          Today, I build real-world projects, train students, lead workshops, and create content for those navigating their own tech journey. I collaborate with schools, parents, and communities. I teach Frontend and mBlock, C++ to future embedded systems engineers. I help students build smart devices with Arduino, Raspberry Pi. I host bootcamps on Web Dev and Scratch programming—for kids as young as six.
        </p>
        <p className="mb-2">
          But more than anything, I remind them of this: <strong>Your background doesn't limit your future.</strong>
        </p>
        <p className="mb-2">
          If a boy who studied Arabic and taught in local classrooms can now build full-stack apps, mentor young coders, and speak the language of both AI and humanity, so can you.
        </p>
        <p className="mb-2">
          Because this journey isn't just about tech. It’s about purpose. Progress and not validation.
        </p>
        <p className="mb-0">
          And I’m just getting started, In Sha'a Allah.
        </p>
      </div>
    </div>
  </div>
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
