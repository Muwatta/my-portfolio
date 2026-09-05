export const courses = [
  {
    slug: "backend-engineering-foundations",
    title: "Backend Engineering Foundations",
    category: "Backend",
    level: "Beginner",
    duration: "6 weeks",
    price: 0,
    featured: true,
    description:
      "Learn how resilient backend systems are designed, built, and shipped for real-world products.",
    lessons: [
      "System design fundamentals",
      "API design and contracts",
      "Databases, migrations, and querying",
      "Background jobs and async workflows",
      "Observability and production readiness",
    ],
  },
  {
    slug: "building-production-rest-apis",
    title: "Building Production REST APIs",
    category: "APIs",
    level: "Intermediate",
    duration: "8 weeks",
    price: 49,
    featured: true,
    description:
      "Design, secure, and ship APIs that can handle growth, real traffic, and team collaboration.",
    lessons: [
      "REST architecture and versioning",
      "Authentication and authorization",
      "Rate limiting and error handling",
      "Testing and deployment",
      "Monitoring and API quality",
    ],
  },
  {
    slug: "django-and-postgresql-for-teams",
    title: "Django + PostgreSQL for Teams",
    category: "Frameworks",
    level: "Intermediate",
    duration: "7 weeks",
    price: 79,
    featured: false,
    description:
      "Use Django and PostgreSQL to build maintainable platforms with clear ownership and sustainable growth.",
    lessons: [
      "Project structure and clean architecture",
      "ORM patterns and query optimization",
      "Security best practices",
      "Testing and CI for teams",
      "Deployment and maintenance",
    ],
  },
  {
    slug: "python-programming-for-beginners",
    title: "Python Programming for Beginners",
    category: "Python",
    level: "Beginner",
    duration: "5 weeks",
    price: 0,
    featured: true,
    description:
      "Build a confident Python foundation through small projects, problem solving, and automation.",
    lessons: [
      "Python syntax and core types",
      "Functions, modules, and packages",
      "Object-oriented programming",
      "Files, APIs, and automation",
      "Build a practical CLI project",
    ],
    youtubeUrl:
      "https://www.youtube.com/results?search_query=Python+programming+for+beginners",
  },
  {
    slug: "scratch-creative-computing",
    title: "Scratch Creative Computing",
    category: "Scratch",
    level: "Beginner",
    duration: "4 weeks",
    price: 0,
    featured: true,
    description:
      "Learn programming ideas through games, stories, animations, and playful creative projects in Scratch.",
    lessons: [
      "Sprites, scenes, and events",
      "Loops, conditions, and variables",
      "Animation and storytelling",
      "Game controls and scoring",
      "Publish a complete Scratch project",
    ],
    youtubeUrl:
      "https://www.youtube.com/results?search_query=Scratch+programming+for+beginners",
  },
  {
    slug: "embedded-systems-foundations",
    title: "Embedded Systems Foundations",
    category: "Embedded Systems",
    level: "Beginner",
    duration: "8 weeks",
    price: 59,
    featured: true,
    description:
      "Understand how software interacts with hardware, sensors, microcontrollers, and the physical world.",
    lessons: [
      "Microcontrollers and embedded architecture",
      "C fundamentals for hardware",
      "GPIO, sensors, and communication",
      "Debugging and real-time constraints",
      "Build a connected device prototype",
    ],
    youtubeUrl:
      "https://www.youtube.com/results?search_query=embedded+systems+for+beginners",
  },
];

export const featuredCourseSlugs = courses
  .filter((course) => course.featured)
  .map((course) => course.slug);

export const getCourseBySlug = (slug) =>
  courses.find((course) => course.slug === slug);
