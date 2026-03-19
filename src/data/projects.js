export const projects = [
  {
    id: "brainiac-quiz",
    title: "Brainiac Quiz Platform",
    category: "EdTech",
    description:
      "Real-time quiz platform serving 500+ concurrent users with live leaderboards and analytics dashboard.",
    tech: ["React", "TypeScript", "Django", "PostgreSQL", "Redis", "Socket.io"],
    metrics: ["500+ concurrent users", "99.9% uptime", "2s response time"],
    image: "https://res.cloudinary.com/dee5edoss/image/upload/v1748057065/Screenshot_2025-05-24_042302_mo4osb.png",
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
    tech: ["Next.js", "Django REST", "PostgreSQL", "AWS S3", "PWA"],
    metrics: [
      "12 states deployed",
      "2,000+ active students",
      "40% admin time saved",
    ],
    image: "/images/withMyStudent.jpg", // ← Changed to existing image
    github: "https://github.com/Muwatta/nigeriaskills-lms",
    live: "https://nigeriaskills.edu.ng",
    featured: true,
  },
  {
    id: "git-monitor",
    title: "IoT Git Monitoring System",
    category: "IoT + Fullstack",
    description:
      "Real-time environmental monitoring for agricultural facilities with predictive alerts.",
    tech: [
      "React",
      "Python",
      "MQTT",
      "InfluxDB",
      "TensorFlow Lite",
      "Raspberry Pi",
    ],
    metrics: [
      "30% reduction in spoilage",
      "50+ sensors deployed",
      "24/7 monitoring",
    ],
    image: "/images/scratch_students.jpg", // ← Changed to existing image
    github: "https://github.com/Muwatta/git-monitor",
    live: "https://demo.muwatta.dev/git-monitor",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProjectById = (id) => projects.find((p) => p.id === id);
