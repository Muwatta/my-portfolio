export const projects = [
  {
    id: "project-nexus",
    title: "Project Nexus — E-Commerce Backend",
    category: "Backend",
    description:
      "Production-grade e-commerce backend with JWT authentication, Redis caching, async task queues via Celery & RabbitMQ, and a full Docker + CI/CD pipeline on GitHub Actions.",
    tech: [
      "Django",
      "PostgreSQL",
      "Redis",
      "Celery",
      "RabbitMQ",
      "Docker",
      "GitHub Actions",
    ],
    metrics: ["JWT Auth", "Dockerized", "CI/CD Pipeline"],
    image: "/images/atTheNational.jpg",
    github: "https://github.com/Muwatta/alx-project-nexus",
    live: null,
    featured: true,
  },
  {
    id: "nexus-lms",
    title: "NexusLMS — Full Stack LMS",
    category: "Full Stack",
    description:
      "Monorepo Learning Management System with a Django REST API backend featuring JWT role-based access and a React + Vite frontend. Docker-ready for production deployment.",
    tech: [
      "Django REST",
      "React",
      "TypeScript",
      "Vite",
      "PostgreSQL",
      "Docker",
    ],
    metrics: ["Multi-role system", "JWT RBAC", "Docker ready"],
    image: "/images/withMyStudent.jpg",
    github: "https://github.com/Muwatta/nexuslms",
    live: null,
    featured: true,
  },
  {
    id: "nexus-fintech",
    title: "Nexus Fintech Backend",
    category: "Backend",
    description:
      "Django REST backend for a fintech platform exposing secure JSON endpoints consumed by a React frontend. Fully Dockerized with JWT authentication and production-ready architecture.",
    tech: ["Django REST", "PostgreSQL", "JWT", "Docker"],
    metrics: ["Secure JWT Auth", "REST API", "Dockerized"],
    image: "/images/scratch_students.jpg",
    github: "https://github.com/Muwatta/nexus-fintech-backend",
    live: null,
    featured: true,
  },
  {
    id: "ate-lms-backend",
    title: "ATE LMS Backend",
    category: "Backend",
    description:
      "Multi-role learning management system backend with secure APIs, background email notifications via Celery, and a modular architecture designed for real-world deployment.",
    tech: ["Django REST", "PostgreSQL", "Celery", "JWT"],
    metrics: ["Multi-role RBAC", "Background jobs", "Modular design"],
    image: "/images/atTheNational.jpg",
    github: "https://github.com/Muwatta/ate_lms_backend",
    live: null,
    featured: false,
  },
  {
    id: "agroguard",
    title: "AgroGuard — AI Crop Protection",
    category: "IoT + AI",
    description:
      "AI-powered autonomous crop protection and smart irrigation system integrating machine learning with IoT sensors for real-time agricultural monitoring and intervention.",
    tech: ["Python", "AI/ML", "IoT", "Raspberry Pi"],
    metrics: [
      "Autonomous protection",
      "Smart irrigation",
      "Real-time monitoring",
    ],
    image: "/images/scratch_students.jpg",
    github: "https://github.com/Muwatta/agroguard",
    live: null,
    featured: true,
  },
  {
    id: "nexus-fintech-frontend",
    title: "Nexus Fintech Frontend",
    category: "Frontend",
    description:
      "Modern, responsive React frontend for the Nexus Fintech platform built with TypeScript and Tailwind CSS. Handles JWT authentication and integrates cleanly with the Django REST backend.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "JWT"],
    metrics: ["TypeScript", "Responsive UI", "JWT Auth flow"],
    image: "/images/withMyStudent.jpg",
    github: "https://github.com/Muwatta/nexus-fintech-frotend",
    live: null,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProjectById = (id) => projects.find((p) => p.id === id);
