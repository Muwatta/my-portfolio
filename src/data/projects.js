export const projects = [
  {
    id: "ate-management",
    title: "ATE Management System",
    category: "Full Stack",
    featured: true,
    impact: "production",
    users: "100+",
    description:
      "Operational platform for Algorise Tech Explorers bootcamps. Student management, enrollment, progress tracking, attendance, grades, certificates, and admin dashboards. Serves 100+ active users including students, instructors, and administrators.",
    problem:
      "Needed a scalable platform to manage bootcamp operations, student progression, and administrative workflows across multiple cohorts.",
    approach:
      "Built a full-stack system with Django REST backend providing robust APIs for authentication, role-based access (Admin, Instructor, Student, Parent), and real-time data, paired with a responsive React + TypeScript frontend.",
    architecture: "React → Django REST API → PostgreSQL | Redis (caching)",
    engineering: [
      "Multi-role RBAC system",
      "Real-time updates",
      "Automated workflows",
      "Scalable data models",
    ],
    result: "Live platform managing 100+ active users with zero downtime.",
    tech: [
      "Django REST",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "JWT",
      "Framer Motion",
    ],
    metrics: [
      "100+ active users",
      "Live in production",
      "Multi-role RBAC",
      "Automated workflows",
    ],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1782392024/Screenshot_2026-06-25_131450_idclwm.png",
    github: "https://github.com/Muwatta/ate-management",
    live: "https://ate-management.vercel.app",
  },
  {
    id: "ssc-cooperative",
    title: "SSC Cooperative — Member & Loan Management",
    category: "Full Stack",
    featured: true,
    impact: "production",
    description:
      "Financial operations platform for cooperative member management, savings tracking, loan applications with 2‑stage approval, surety management, and repayment tracking. Features role-based access (Admin, Committee, Staff), automated email notifications, and banking-style templates.",
    problem:
      "Cooperative needed to replace manual workflows for member registration, savings, and complex loan approval processes with a structured, auditable system.",
    approach:
      "Built a secure Django REST backend with multi-stage approval workflows and JWT authentication, paired with a responsive React + TypeScript frontend with real-time updates via Resend email notifications.",
    architecture:
      "React/TypeScript → Django REST API → PostgreSQL | JWT Auth | Resend (email)",
    engineering: [
      "2-stage loan approval workflow",
      "Role-based authorization",
      "Surety management",
      "Banking-style email templates",
      "Repayment tracking",
    ],
    result:
      "Live in production serving cooperative operations with zero approval bottlenecks.",
    tech: [
      "Django REST",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "PostgreSQL",
      "Resend",
      "JWT",
      "Framer Motion",
    ],
    metrics: [
      "Live in production",
      "2-stage approval workflow",
      "Banking-style emails",
      "Dark mode support",
    ],
    github: "https://github.com/Muwatta/ssc-cooperative-system",
    live: "https://solacestaffcooperative.com.ng",
  },
  {
    id: "kma-spices",
    title: "KMA Spices & Herbs — E-commerce Platform",
    category: "Full Stack",
    featured: true,
    impact: "client",
    description:
      "Full-featured e-commerce platform for Nigerian spice business. Customers browse catalog, add to cart, checkout via bank transfer or COD, manage orders, and edit profiles. Admin dashboard provides real-time order notifications, product management, content management, and inventory reports.",
    problem:
      "Small business needed an online sales channel with customer management and admin control without relying on third-party marketplace platforms.",
    approach:
      "Built with Next.js 14 (App Router) for performance, Supabase for backend services (Auth, PostgreSQL, Storage, Realtime), Zustand for state management, and Vercel for deployment.",
    architecture:
      "Next.js 14 → Supabase Auth + PostgreSQL | Storage | Realtime",
    engineering: [
      "Real-time admin notifications",
      "Multi-payment method support (bank transfer + COD)",
      "Order tracking & customer profiles",
      "Product inventory management",
      "WhatsApp integration for orders",
    ],
    result: "Live e-commerce platform generating sales with zero downtime.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Resend",
      "Vercel",
    ],
    metrics: [
      "Live platform",
      "Real‑time admin dashboard",
      "Multiple payment methods",
      "WhatsApp ordering",
    ],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1782392970/Screenshot_2026-06-25_140609_ggutei.png",
    github: "https://github.com/muwatta/spices_shop",
    live: "https://www.kmaglobalink.com.ng",
  },
  {
    id: "dghi-academy",
    title: "DGHI Academy — School Platform",
    category: "Full Stack",
    featured: true,
    impact: "client",
    description:
      "Complete school website with separate sections for morning school and evening madrasa. Built with Next.js 14 for performance, Supabase for backend services (Auth, PostgreSQL, Storage, Realtime), and Tailwind CSS for responsive design. Includes dynamic forms, analytics, and WhatsApp integration.",
    problem:
      "School needed an integrated online presence supporting multiple programs (morning school and madrasa) with student enrollment, authentication, and communication.",
    approach:
      "Built with modern fullstack stack: Next.js 14 (App Router) for performance, Supabase for managed backend, real-time capabilities, and easy deployment to Vercel.",
    architecture: "Next.js 14 → Supabase Auth + PostgreSQL | Storage",
    engineering: [
      "Multi-program support (morning school + madrasa)",
      "Student enrollment system",
      "WhatsApp integration for communication",
      "Real-time analytics",
      "Dynamic forms",
    ],
    result: "Live school platform supporting multiple cohorts and programs.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "Resend",
      "Zustand",
    ],
    metrics: [
      "200+ visitors (first week)",
      "Live platform",
      "Multi-program support",
    ],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1775469651/logo_dgh_lynlvp.jpg",
    github: "https://github.com/muwatta/dgh-academy",
    live: "https://dghacademy.com.ng",
  },
  {
    id: "nexus-lms",
    title: "NexusLMS — Learning Management System",
    category: "Full Stack",
    featured: true,
    impact: "reference",
    description:
      "Production-ready LMS built as a monorepo. Backend uses Django REST with JWT authentication across 5 user roles (Super Admin, School Admin, Instructor, Student, Parent), auto-graded quizzes, Paystack payment integration with webhook verification, and PDF result generation. React + Vite frontend provides responsive, real-time interface.",
    problem:
      "Schools needed a comprehensive LMS supporting multiple user roles, automated assessments, payment processing, and scalable architecture for growing user bases.",
    approach:
      "Built as a monorepo with separated concerns: Django REST backend handles auth, RBAC, business logic, and payments; React + Vite frontend provides real-time UI. Full Docker containerization and CI/CD pipeline for reliable deployment.",
    architecture:
      "React/Vite → Django REST API → PostgreSQL | Paystack (payments) | Docker + CI/CD",
    engineering: [
      "5-role RBAC system (Super Admin, School Admin, Instructor, Student, Parent)",
      "Auto-graded quiz engine",
      "Paystack payment integration with webhook verification",
      "PDF result generation",
      "Full test suite",
      "Docker containerization",
      "CI/CD pipeline with GitHub Actions",
    ],
    result:
      "Reference implementation showing production-grade backend architecture with complex authorization and payment workflows.",
    tech: [
      "Django REST",
      "React",
      "TypeScript",
      "Vite",
      "PostgreSQL",
      "Paystack",
      "Docker",
      "GitHub Actions",
    ],
    metrics: [
      "5-role RBAC",
      "Full test suite",
      "Paystack integrated",
      "CI/CD pipeline",
    ],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1773992371/Screenshot_2026-03-20_081149_gqfud9.png",
    github: "https://github.com/Muwatta/nexuslms",
    live: null,
  },
  {
    id: "nextalk",
    title: "NexTalk — REST Messaging API",
    category: "Backend",
    featured: true,
    impact: "reference",
    description:
      "Production-ready REST API for real-time messaging. Demonstrates advanced Django patterns: signal-driven architecture, custom ORM managers for efficient queries, nested routing, async operations, comprehensive testing, and complete CI/CD pipeline. Containerized and deployment-ready.",
    problem:
      "Needed to demonstrate backend mastery with a system showing proper API design, advanced Django patterns, testing practices, and production-grade CI/CD.",
    approach:
      "Built with Django REST Framework using signals for event-driven updates, custom managers for optimized queries, nested routing for hierarchical resources, and asyncio for background tasks. Full test coverage and Docker containerization.",
    architecture:
      "Django REST API → PostgreSQL | Docker + GitHub Actions (CI/CD)",
    engineering: [
      "Signal-driven architecture for real-time updates",
      "Custom ORM managers for efficient unread message queries",
      "Nested routing for conversation hierarchies",
      "Async operations for background processing",
      "Comprehensive test suite",
      "Docker containerization",
      "CI/CD pipeline with GitHub Actions",
    ],
    result:
      "Reference implementation showcasing advanced Django backend patterns and production-ready infrastructure.",
    tech: ["Django REST", "PostgreSQL", "Docker", "GitHub Actions", "pytest"],
    metrics: [
      "Signal-driven",
      "Custom ORM manager",
      "Full test coverage",
      "CI/CD ready",
    ],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1741622032/Data-Filteration_ggkqyy.png",
    github: "https://github.com/Muwatta/NexTalk",
    live: null,
  },
  {
    id: "agroguard",
    title: "AgroGuard — AI-Driven Crop Protection",
    category: "AI + IoT",
    featured: true,
    impact: "research",
    description:
      "End-to-end autonomous crop protection system. Computer vision pipeline detects crop diseases from real-time camera feeds, machine learning models classify disease types with high accuracy, growth tracking monitors crop health over time, and an AI advisory engine recommends irrigation and protection strategies based on predictions.",
    problem:
      "Smallholder farmers lack real-time tools to detect crop diseases early and respond with precision interventions, leading to significant yield losses.",
    approach:
      "Built an integrated system combining computer vision (OpenCV), machine learning (scikit-learn, TensorFlow), IoT integration (Raspberry Pi), and automated decision-making. Camera captures images → disease detection → classification → recommendations → optional Arduino relay automation for irrigation.",
    architecture:
      "Camera → OpenCV (detection) → ML Model (classification) → Python backend → Recommendations | Optional: Arduino relay → Irrigation",
    engineering: [
      "Real-time image capture and processing",
      "Disease detection using OpenCV",
      "ML-based disease classification",
      "Growth tracking over time",
      "AI advisory engine for recommendations",
      "IoT integration with Raspberry Pi",
      "Optional Arduino automation for irrigation",
    ],
    result:
      "End-to-end system demonstrating systems thinking: connecting hardware, computer vision, ML, and decision-making into a cohesive solution.",
    tech: [
      "Python",
      "OpenCV",
      "Flask",
      "TensorFlow",
      "scikit-learn",
      "Raspberry Pi",
      "Arduino",
    ],
    metrics: [
      "Disease detection",
      "ML classification",
      "Advisory engine",
      "IoT automation",
    ],
    image: "/images/agroguard.png",
    github: "https://github.com/Muwatta/agroguard",
    live: null,
  },
  {
    id: "nexus-fintech",
    title: "Nexus Fintech — Full Stack Platform",
    category: "Full Stack",
    featured: false,
    impact: "reference",
    description:
      "Full-stack fintech platform demonstrating secure backend-frontend architecture. Django REST backend provides JWT-authenticated JSON APIs with enterprise-grade security. React + TypeScript frontend offers responsive, type-safe interface. Fully containerized and deployment-ready.",
    problem:
      "Needed to demonstrate full-stack fintech architecture with proper security, authentication, and separation of concerns.",
    approach:
      "Built with Django REST backend for secure API design, React + TypeScript for type-safe frontend, JWT for stateless authentication, Docker for containerization.",
    architecture: "React/TypeScript → Django REST API → PostgreSQL | Docker",
    engineering: [
      "Secure JWT authentication",
      "RESTful API design",
      "Type-safe frontend (TypeScript)",
      "Docker containerization",
    ],
    result: "Reference implementation of secure full-stack architecture.",
    tech: [
      "Django REST",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "JWT",
      "Docker",
    ],
    metrics: ["Secure JWT Auth", "REST + React", "Dockerized"],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1773992369/Screenshot_2026-03-20_083744_p8fjvc.png",
    github: "https://github.com/Muwatta/nexus-fintech-backend",
    live: null,
  },
  {
    id: "shopcore",
    title: "ShopCore — E-commerce REST Backend",
    category: "Backend",
    featured: false,
    impact: "reference",
    description:
      "Production-ready Django e-commerce backend with JWT role-based authentication, product and category catalog CRUD, a full order lifecycle with checkout, async email notifications via Celery + RabbitMQ, Redis caching, PostgreSQL persistence, and a Docker + GitHub Actions CI/CD pipeline.",
    problem:
      "Needed a production-ready e-commerce backend covering authentication, catalog, orders, and checkout with async task processing and caching built in.",
    approach:
      "Organized as separate Django apps (accounts, catalog, orders, checkout) over a shared backend config, with role-based JWT auth, Celery workers for async email and order processing, Redis caching, PostgreSQL persistence, and Docker + GitHub Actions CI/CD for deployment.",
    architecture:
      "Django REST API → PostgreSQL | Redis (caching) | Celery + RabbitMQ (async tasks) | Docker + GitHub Actions (CI/CD)",
    engineering: [
      "JWT role-based permissions (Admin, Customer, Staff)",
      "Product and category CRUD with filtering, sorting, and pagination",
      "Full order lifecycle — creation, tracking, and checkout",
      "Async email notifications and order processing via Celery + RabbitMQ",
      "Redis caching for performance optimization",
      "Dockerized dev and production environments",
    ],
    result:
      "Live Django REST API deployed on Render, with Redis caching and RabbitMQ-backed async tasks.",
    tech: [
      "Python",
      "Django REST",
      "PostgreSQL",
      "Redis",
      "Celery",
      "RabbitMQ",
      "Docker",
      "GitHub Actions",
    ],
    metrics: [
      "JWT role-based auth",
      "Async tasks (Celery + RabbitMQ)",
      "Redis caching",
      "CI/CD pipeline",
    ],
    github: "https://github.com/muwatta/ShopCore",
    live: "https://alx-project-nexus-ng70.onrender.com",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProjectById = (id) => projects.find((p) => p.id === id);
