export const engineeringExperience = [
  {
    id: "ate-founder",
    title: "Founder & Technical Lead",
    organization: "Algorise Tech Explorers",
    period: "2024 – Present",
    type: "leadership",
    description:
      "Built and maintain production platform serving 100+ active users. Architected full-stack system for bootcamp management, student progression tracking, and real-time dashboards.",
    highlights: [
      "Designed and deployed ATE Management System (100+ users)",
      "Mentored 150+ learners through bootcamps and workshops",
      "Led students to National ICT Competition finals",
      "Built technical curriculum for multiple disciplines",
    ],
    technologies: ["Django REST", "React", "PostgreSQL", "Redis", "TypeScript"],
    metrics: {
      users: "100+",
      learners: "150+",
      systems: "1 live platform",
    },
  },
  {
    id: "independent-engineer",
    title: "Independent Software Engineer",
    organization: "Full Stack Development",
    period: "2024 – Present",
    type: "engineering",
    description:
      "Delivered production systems for multiple clients and organizations. Specialized in backend architecture, REST APIs, and complex business logic workflows.",
    highlights: [
      "SSC Cooperative: Live financial management system (loan approvals, savings tracking)",
      "KMA Spices: Production e-commerce platform",
      "DGHI Academy: School management platform",
      "NexusLMS: Full-featured learning management system",
    ],
    technologies: [
      "Django",
      "DRF",
      "Next.js",
      "React",
      "PostgreSQL",
      "Supabase",
    ],
    metrics: {
      systems: "6+ production",
      clients: "Multiple",
      delivery: "End-to-end",
    },
  },
  {
    id: "alx-backend",
    title: "ALX Backend Engineering Program",
    organization: "ALX ProDev",
    period: "2025",
    type: "education",
    description:
      "Completed intensive backend engineering program focused on production-grade systems. Mastered Django, Django REST Framework, database design, async systems, and DevOps.",
    highlights: [
      "Django & Django REST Framework mastery",
      "PostgreSQL database design & optimization",
      "Redis caching strategies",
      "Celery & async task processing",
      "Docker containerization & CI/CD pipelines",
      "Testing and quality assurance",
    ],
    technologies: ["Python", "Django", "DRF", "PostgreSQL", "Redis", "Docker"],
    metrics: {
      completion: "100%",
      capstone: "E-commerce backend",
    },
  },
];

export const getExperienceById = (id) =>
  engineeringExperience.find((exp) => exp.id === id);
