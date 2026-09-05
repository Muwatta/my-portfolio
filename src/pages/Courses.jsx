import { useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiClock,
  FiPlay,
  FiSearch,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { courses } from "../data/courses"; // Updated import to include new courses

const categoryOptions = [
  "All",
  ...new Set(courses.map((course) => course.category)),
];
const formatPrice = (price) => (price === 0 ? "Free" : `$${price}`);

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All" || course.category === activeCategory;
      const searchableText =
        `${course.title} ${course.category} ${course.description}`.toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [activeCategory, searchTerm]);

  return (
    <>
      <Seo
        title="Courses"
        description="Teaching and backend engineering courses from Abdullahi Musliudeen."
        path="/courses"
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white md:py-24">
          <Container>
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-sm font-semibold text-blue-200">
                <FiBookOpen aria-hidden="true" /> Muwatta Learning Lab
              </div>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Learn by building{" "}
                <span className="text-blue-400">useful things.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                Practical learning paths for curious beginners, growing
                developers, and teams building for the real world.
              </p>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-6 text-sm text-slate-300">
              <div>
                <strong className="block text-2xl text-white">
                  {courses.length}
                </strong>
                courses
              </div>
              <div>
                <strong className="block text-2xl text-white">4</strong>learning
                tracks
              </div>
              <div>
                <strong className="block text-2xl text-white">1:1</strong>
                mentor-led mindset
              </div>
            </div>
          </Container>
        </section>

        <Container className="py-10 md:py-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Explore the catalog
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                Choose your next build
              </h2>
            </div>
            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Search courses</span>
              <FiSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search Python, Scratch..."
                className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </label>
          </div>
          <div
            className="mt-7 flex gap-2 overflow-x-auto pb-2"
            aria-label="Course categories"
          >
            {categoryOptions.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "bg-blue-600 text-white" : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <article
                key={course.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
                      {course.category}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-300">
                      {course.level}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {course.title}
                  </h2>
                  <p className="mt-4 flex-1 text-slate-600 dark:text-slate-300">
                    {course.description}
                  </p>
                  <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <FiClock aria-hidden="true" />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiBookOpen aria-hidden="true" />
                      {course.lessons.length} lessons
                    </span>
                    <span className="ml-auto font-bold text-slate-900 dark:text-white">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {course.lessons.slice(0, 3).map((lesson) => (
                      <li key={lesson}>• {lesson}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/courses/${course.slug}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400"
                    >
                      View course <FiArrowUpRight aria-hidden="true" />
                    </Link>
                    <a
                      href={course.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Watch ${course.title} on YouTube`}
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 text-red-600 transition hover:border-red-300 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-950/30"
                    >
                      <FiPlay aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
