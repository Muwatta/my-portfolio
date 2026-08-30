import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { Container } from "../components/layout/Container";
import { SectionHeader } from "../components/ui/SectionHeader";
import { nowContent } from "../data/now";

export const Now = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200">
      <Helmet>
        <title>Now | Abdullahi Musliudeen</title>
        <meta
          name="description"
          content="What I'm currently working on and focusing on."
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

      <Container className="relative z-10 py-16 sm:py-20">
        <SectionHeader
          title="What I'm"
          highlight="Doing Now"
          subtitle="Current focus areas and ongoing work."
        />

        {/* Current Focus */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Currently Focused On
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {nowContent.currentFocus.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      item.status === "active" ? "bg-green-500" : "bg-blue-400"
                    }`}
                  />
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Work */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Recent Work
          </h2>
          <div className="space-y-4">
            {nowContent.recentWork.map((work, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800"
              >
                <div className="text-blue-500 mt-1">→</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {work.project}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {work.achievement}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {work.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Next Goals */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Next Goals
          </h2>
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800 p-8">
            <ul className="space-y-3">
              {nowContent.nextGoals.map((goal, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 text-slate-800 dark:text-slate-200"
                >
                  <span className="text-blue-500 font-bold mt-0.5 flex-shrink-0">
                    •
                  </span>
                  <span>{goal}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Last updated: {nowContent.lastUpdated}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors group"
          >
            Work Together
            <HiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      </Container>
    </div>
  );
};

export default Now;
