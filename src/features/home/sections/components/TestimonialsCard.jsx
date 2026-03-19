import { motion } from "framer-motion";

export const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 md:p-8 rounded-2xl max-w-2xl mx-4">
        <div className="text-4xl text-blue-500/30 font-serif mb-4">"</div>
        <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-6">
          {testimonial.quote}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
              {testimonial.avatar}
            </div>
            <div>
              <p className="font-semibold text-white">{testimonial.author}</p>
              <p className="text-sm text-slate-400">{testimonial.role}</p>
              <p className="text-xs text-slate-500">
                {testimonial.organization}
              </p>
            </div>
          </div>

          <div className="hidden md:block text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
              {testimonial.outcome}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
