// src/components/Loader.jsx (Premium version)
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Trigger exit animation
        controls.start("exit").then(() => {
          setTimeout(() => onComplete?.(), 100);
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [controls, onComplete]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        when: "afterChildren",
      },
    },
  };

  const slideUpVariants = {
    initial: { y: "0%" },
    exit: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  const slideDownVariants = {
    initial: { y: "0%" },
    exit: {
      y: "100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999]"
      variants={containerVariants}
      initial="initial"
      animate={controls}
    >
      {/* Split screen panels */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-slate-950"
        variants={slideUpVariants}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-slate-950"
        variants={slideDownVariants}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex flex-col items-center">
          {/* Animated rings */}
          <div className="relative mb-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-blue-500/20 rounded-full"
                style={{
                  width: 120 + i * 40,
                  height: 120 + i * 40,
                  x: -(60 + i * 20),
                  y: -(60 + i * 20),
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            ))}

            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-4xl font-bold text-white">AM</span>
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 tracking-wider">
            ABDULLAHI MUSLIUDEEN
          </h2>
          <p className="text-slate-400 text-sm mb-8 tracking-widest uppercase">
            Full-Stack Developer & Educator
          </p>

          {/* Progress */}
          <div className="w-64 space-y-4">
            <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>LOADING</span>
              <span className="text-blue-400">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
