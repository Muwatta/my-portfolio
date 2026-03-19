export const projects = [
  {
    id: "brainiac-quiz",
    title: "Brainiac Quiz Platform",
    category: "EdTech",
    description:
      "Interactive quiz platform serving 500+ concurrent users with real-time leaderboards.",
    tech: ["React", "Python", "MongoDB", "Socket.io"],
    metrics: ["500+ concurrent users", "99.9% uptime"],
    image: "/images/atTheNational.jpg",
    github: "https://github.com/Muwatta/brainiac-quiz",
    live: "https://brainiac.muwatta.dev",
    featured: true,
  },
  {
    id: "edtech-dashboard",
    title: "NigeriaSkills LMS",
    category: "EdTech",
    description:
      "Learning management system for vocational training centers across 12 states.",
    tech: ["Next.js", "Django REST", "PostgreSQL", "AWS S3"],
    metrics: ["12 states", "2,000+ students", "40% time saved"],
    image: "/images/withMyStudent.jpg",
    github: "https://github.com/Muwatta/nigeriaskills-lms",
    live: "https://nigeriaskills.edu.ng",
    featured: true,
  },
  {
    id: "git-monitor",
    title: "IoT Git Monitoring System",
    category: "IoT + Fullstack",
    description:
      "Real-time environmental monitoring for agricultural facilities.",
    tech: ["React", "Python", "MQTT", "InfluxDB"],
    metrics: ["30% spoilage reduction", "50+ sensors"],
    image: "/images/scratch_students.jpg",
    github: "https://github.com/Muwatta/git-monitor",
    live: "https://git-monitor.vercel.app",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProjectById = (id) => projects.find((p) => p.id === id);
