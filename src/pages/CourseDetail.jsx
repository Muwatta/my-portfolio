import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { fetchCourse } from "../lib/courses";

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCourse(slug)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <Container className="py-16 text-center">Loading course...</Container>;
  }
  if (!course) {
    return (
      <Container className="py-16 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Course not found.
        </p>
        <Link
          to="/courses"
          className="mt-6 inline-block rounded-full bg-blue-500 px-5 py-3 font-semibold text-white"
        >
          Back to courses
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Seo
        title={course.title}
        description={course.description}
        path={`/courses/${course.slug}`}
      />
      <Container className="py-16 md:py-24">
        <div className="mb-8">
          <Link
            to="/courses"
            className="text-sm font-semibold text-blue-500 hover:text-blue-400"
          >
            ← Back to courses
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                {course.category}
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                {course.title}
              </h1>
            </div>
            <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
              {course.price === 0 ? "Free" : `$${course.price}`} ·{" "}
              {course.duration}
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            {course.description}
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                What you will learn
              </h2>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                {course.lessons.map((lesson) => (
                  <li key={lesson} className="flex gap-3">
                    <span className="mt-1 text-blue-500">•</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/80">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Course info
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Level</span>
                  <span>{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format</span>
                  <span>Self-paced</span>
                </div>
                <div className="flex justify-between">
                  <span>Access</span>
                  <span>
                    {course.price === 0 ? "Included" : "Enrollment required"}
                  </span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400">
                {course.price === 0 ? "Start learning" : "Enroll now"}
              </button>
              <a
                href={course.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-center text-sm font-semibold text-red-600 hover:text-red-500"
              >
                Watch this course on YouTube
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
