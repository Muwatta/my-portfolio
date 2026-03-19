import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Container } from "../../../components/layout/Container";
import { TestimonialCard } from "./components/TestimonialsCard";
import { testimonials } from "../../../data";

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-32 bg-slate-900/30">
      <Container>
        <SectionHeader
          title="What People"
          highlight="Say"
          subtitle="Specific outcomes from real collaborations, not vague praise."
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={activeIndex}
                testimonial={testimonials[activeIndex]}
              />
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${i === activeIndex ? "bg-blue-500 w-8" : "bg-slate-700 hover:bg-slate-600 w-2"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
