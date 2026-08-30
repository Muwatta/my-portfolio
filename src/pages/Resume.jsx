import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiDownload } from "react-icons/hi";
import { Container } from "../components/layout/Container";

export const Resume = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200">
      <Helmet>
        <title>Resume | Abdullahi Musliudeen</title>
        <meta
          name="description"
          content="Resume and CV for backend engineer & full-stack developer."
        />
      </Helmet>

      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />

      <Container className="relative z-10 py-16 sm:py-20 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-slate-900 dark:text-white">
            Abdullahi Musliudeen Oladipupo
          </h1>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4">
            Backend Engineer · Full-Stack Developer
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <a
              href="mailto:muwatta@example.com"
              className="hover:text-blue-600"
            >
              📧 Email
            </a>
            <a
              href="https://github.com/Muwatta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              💻 GitHub
            </a>
            <a
              href="https://linkedin.com/in/abdullahi-musliudeen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              🔗 LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
          >
            <HiDownload className="w-5 h-5" />
            Print / Save as PDF
          </button>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Professional Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Professional Summary
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Backend engineer specializing in Django and Django REST Framework.
              I design and build production-grade systems handling complex
              business logic: role-based authorization, financial workflows,
              multi-tenant architectures, and real-time data processing. Founded
              Algorise Tech Explorers, mentoring 150+ learners. 100+ users on
              production platforms built end-to-end.
            </p>
          </motion.section>

          {/* Engineering Experience */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Engineering Experience
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Founder & Technical Lead
                  </h3>
                  <span className="text-sm text-slate-500">2024 – Present</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  Algorise Tech Explorers
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm">
                  <li>
                    Built and maintain production platform managing 100+ active
                    users
                  </li>
                  <li>
                    Designed full-stack system: Django REST API, PostgreSQL,
                    Redis, React frontend
                  </li>
                  <li>
                    Mentored 150+ learners through bootcamps and workshops
                  </li>
                  <li>Led students to National ICT Competition finals</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Independent Software Engineer
                  </h3>
                  <span className="text-sm text-slate-500">2024 – Present</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  Full Stack Development
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm">
                  <li>
                    Delivered 6+ production systems: ATE Management, SSC
                    Cooperative, KMA Spices, NexusLMS, etc.
                  </li>
                  <li>
                    SSC Cooperative: Live financial management system with
                    2-stage loan workflows
                  </li>
                  <li>
                    KMA Spices: E-commerce platform with real-time admin
                    dashboard
                  </li>
                  <li>
                    Full ownership: architecture, backend, frontend, deployment,
                    maintenance
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    ALX Backend Engineering Program
                  </h3>
                  <span className="text-sm text-slate-500">2025</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  Intensive Backend Engineering
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm">
                  <li>
                    Mastered Django, Django REST Framework, PostgreSQL, Redis,
                    Celery
                  </li>
                  <li>
                    Completed production systems capstone with full CI/CD
                    pipeline
                  </li>
                  <li>
                    Database design, query optimization, async task processing
                  </li>
                  <li>Docker containerization and GitHub Actions automation</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Technical Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Backend
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Django · Django REST Framework · PostgreSQL · Redis · JWT
                  Authentication · RBAC · API Design · WebSockets · Async
                  Operations
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Frontend
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  React · Next.js · TypeScript · Tailwind CSS · Vite · Framer
                  Motion · State Management
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Infrastructure
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Docker · Docker Compose · GitHub Actions · CI/CD · Linux ·
                  Nginx · Deployment
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Databases
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  PostgreSQL · Redis · Data Modeling · Query Optimization · ACID
                  Compliance
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  Async Systems
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Celery · RabbitMQ · AsyncIO · Background Jobs · Message Queues
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  AI / ML
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Python · OpenCV · TensorFlow · scikit-learn · Computer Vision
                  · IoT Integration
                </p>
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Education
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    B.A. Arabic Education
                  </h3>
                  <span className="text-sm text-slate-500">2019 – 2024</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Ahmadu Bello University, Zaria
                </p>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    ALX ProDev Backend Engineering
                  </h3>
                  <span className="text-sm text-slate-500">2025</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Intensive Python & Django program with production systems
                  capstone
                </p>
              </div>
            </div>
          </motion.section>

          {/* Recognition */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Recognition & Awards
            </h2>
            <ul className="space-y-2">
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-blue-500">★</span>
                National ICT Competition for Girls — Student Leadership (2025)
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-blue-500">★</span>
                African Intelligence LMS Hackathon — 2nd Runner-up (2025)
              </li>
            </ul>
          </motion.section>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 text-center"
        >
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Want to build something great together?
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </Container>
    </div>
  );
};

export default Resume;
