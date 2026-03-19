// src/data/constants.js
export const featuredProjects = [
  {
    id: 1,
    title: "Brainiac Quiz App",
    category: "Full-Stack",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_800,ar_16:9,c_fill,g_auto,e_sharpen/v1748057065/Screenshot_2025-05-24_042302_mo4osb.png",
    description:
      "Interactive quiz platform with real-time scoring, user auth, and global leaderboard.",
    tech: ["React", "Python", "MongoDB", "Socket.io"],
    color: "from-blue-500 to-cyan-400",
    github: "https://github.com/Muwatta/brainiac-quiz",
    live: "https://brainiac-quiz.vercel.app",
  },
  {
    id: 2,
    title: "EdTech Dashboard",
    category: "Full-Stack",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_800,ar_16:9,c_fill,g_auto,e_art:hokusai/v1741465823/IMG-20241230-WA0032_hzmxke.jpg",
    description:
      "Admin portal for managing bootcamps with student progress tracking and analytics.",
    tech: ["Next.js", "Tailwind", "PostgreSQL", "Prisma"],
    color: "from-purple-500 to-pink-400",
    github: "https://github.com/Muwatta/edtech-dashboard",
    live: "https://edtech-dashboard.vercel.app",
  },
  {
    id: 3,
    title: "Git Monitoring System",
    category: "Full-Stack + Git",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/w_800,ar_16:9,c_fill,g_auto,e_art:hokusai/v1741465826/IMG-20250105-WA0014_cre4mh.jpg",
    description:
      "Real-time sensor dashboard with MQTT integration and data visualization.",
    tech: ["React", "Python", "MQTT", "Chart.js"],
    color: "from-emerald-500 to-teal-400",
    github: "https://github.com/Muwatta/git-monitor",
    live: "https://git-monitor.vercel.app",
  },
];

export const skills = [
  { name: "JavaScript / TypeScript", level: 95, icon: "⚡" },
  { name: "React & Next.js", level: 92, icon: "⚛️" },
  { name: "Python / Django", level: 90, icon: "🐍" },
  { name: "MongoDB / PostgreSQL", level: 88, icon: "🗄️" },
  { name: "Tailwind CSS", level: 95, icon: "🎨" },
  { name: "Git & Github", level: 85, icon: "🔌" },
];

export const testimonials = [
  {
    quote:
      "Muwatta built a custom learning platform that scaled beautifully and was easy to maintain.",
    author: "Tech Bootcamp Organizer",
    role: "Education Director",
    avatar: "👨‍💼",
  },
  {
    quote:
      "His full-stack skills combined with teaching ability made complex backend concepts accessible.",
    author: "Former Student",
    role: "Junior Developer",
    avatar: "👩‍💻",
  },
  {
    quote:
      "Delivered clean, performant code and turned our idea into a production-ready EdTech tool.",
    author: "EdTech Collaborator",
    role: "Product Manager",
    avatar: "🚀",
  },
];

export const stats = [
  { num: 50, suffix: "+", label: "Students Mentored" },
  { num: 10, suffix: "+", label: "Projects Delivered" },
  { num: 3, suffix: "", label: "Hackathon Awards" },
  { num: 100, suffix: "%", label: "Client Satisfaction" },
];

export const navItems = [
  { name: "Portfolio", path: "/portfolio" },
  { name: "Skills", path: "/skills" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];
