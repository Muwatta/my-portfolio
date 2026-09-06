import { Link } from "react-router-dom";
import { Container } from "../../../components/layout/Container";

const teachingHighlights = [
  { title: "Programming & web development", description: "I teach learners practical programming foundations, Python, Scratch, and web development through projects." },
  { title: "Embedded systems", description: "Students explore Arduino, ESP32, Raspberry Pi, sensors, and physical computing alongside software." },
  { title: "Learning with purpose", description: "My background in Arabic Education informs how I make complex technical ideas clear, structured, and useful." },
];

const teachingGallery = [
  ["Scratch classroom", "Learners practising creative computing.", "/images/achievements/scratch-class-2025.jpg"],
  ["Student showcase", "Students presenting their technology work.", "/images/achievements/abuja-student-awards.jpg"],
  ["Learning together", "A project-based technology learning environment.", "/images/achievements/bootcamp-2025.jpg"],
];

export const TeachingImpact = () => (
  <section className="py-16 md:py-24 bg-slate-950 text-white">
    <Container>
      <div className="mx-auto max-w-4xl text-center mb-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Teaching & student impact</p><h2 className="mt-4 text-3xl md:text-5xl font-bold">Technology education grounded in <span className="text-blue-400">building and doing</span>.</h2></div>
      <div className="grid gap-6 md:grid-cols-3">{teachingHighlights.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"><h3 className="text-xl font-semibold mb-3">{item.title}</h3><p className="text-slate-300 leading-relaxed">{item.description}</p></div>)}</div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
       {teachingGallery.map(([title, description, image]) => (
         <figure key={title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
           <img src={image} alt="" className="h-40 w-full object-cover" loading="lazy" />
           <figcaption className="p-4"><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-slate-300">{description}</p></figcaption>
         </figure>
       ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"><Link to="/courses" className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400">Explore courses</Link><Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-blue-300 hover:text-blue-200">Book a session</Link></div>
    </Container>
  </section>
);
