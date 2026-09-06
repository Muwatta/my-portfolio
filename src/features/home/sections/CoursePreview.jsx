import { Link } from "react-router-dom";
import { Container } from "../../../components/layout/Container";
import { courses } from "../../../data/courses";

export const CoursePreview = () => (
  <section className="py-16 md:py-24">
    <Container>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">Learn by building</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Practical technology courses.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Structured learning for programming, software development, and physical computing.
          </p>
        </div>
        <Link to="/courses" className="font-semibold text-blue-600 dark:text-blue-400">Explore courses →</Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.filter((course) => course.featured).slice(0, 3).map((course) => (
          <Link key={course.slug} to={`/courses/${course.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-400 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">{course.category}</p>
            <h3 className="mt-3 font-bold">{course.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{course.description}</p>
          </Link>
        ))}
      </div>
    </Container>
  </section>
);
