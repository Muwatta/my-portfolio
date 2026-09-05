import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { existsSync, readFileSync } from "node:fs";

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  console.error(
    "Set GOOGLE_APPLICATION_CREDENTIALS to the path of your service account JSON key before running this script.\n" +
      'Example: GOOGLE_APPLICATION_CREDENTIALS="./secrets/service-account.json" node scripts/seed-courses.mjs',
  );
  process.exit(1);
}

if (!existsSync(serviceAccountPath)) {
  console.error(
    `Service account file not found: ${serviceAccountPath}\n` +
      "Download it from Firebase Console -> Project settings -> Service accounts, " +
      "save it outside version control, then rerun the command.",
  );
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));
} catch (error) {
  console.error(
    `Could not read a valid JSON service account file: ${serviceAccountPath}`,
  );
  console.error(error.message);
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

const courses = [
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
    youtubeUrl:
      "https://www.youtube.com/results?search_query=backend+engineering+foundations",
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
    youtubeUrl:
      "https://www.youtube.com/results?search_query=production+REST+API+tutorial",
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
    youtubeUrl:
      "https://www.youtube.com/results?search_query=Django+PostgreSQL+production+tutorial",
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

const batch = db.batch();
const now = new Date();

for (const course of courses) {
  const ref = db.collection("courses").doc(course.slug);
  batch.set(ref, {
    ...course,
    status: "published",
    createdAt: now,
    updatedAt: now,
  });
}

await batch.commit();
console.log(`Seeded ${courses.length} courses into Firestore.`);
