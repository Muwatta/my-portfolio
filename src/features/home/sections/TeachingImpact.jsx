import { Link } from "react-router-dom";
import { Container } from "../../../components/layout/Container";

const teachingHighlights = [
  { title: "Technical mentorship", description: "I help engineering teams and early-career developers build strong foundations and ship with confidence." },
  { title: "Practical learning", description: "The learning path combines system design, backend architecture, and production habits that matter in real teams." },
  { title: "Career growth", description: "I teach the habits, trade-offs, and delivery mindset needed to grow from contributor to dependable engineer." },
];

export const TeachingImpact = () => (
  <section className="py-16 md:py-24 bg-slate-950 text-white">
    <Container>
      <div className="mx-auto max-w-4xl text-center mb-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Teaching & impact</p><h2 className="mt-4 text-3xl md:text-5xl font-bold">I help people move from <span className="text-blue-400">confusion to clarity</span>.</h2></div>
      <div className="grid gap-6 md:grid-cols-3">{teachingHighlights.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"><h3 className="text-xl font-semibold mb-3">{item.title}</h3><p className="text-slate-300 leading-relaxed">{item.description}</p></div>)}</div>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"><Link to="/courses" className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400">Explore courses</Link><Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-blue-300 hover:text-blue-200">Book a session</Link></div>
    </Container>
  </section>
);
