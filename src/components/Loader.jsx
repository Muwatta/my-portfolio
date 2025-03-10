import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 via-green-900 to-black">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-6 h-6 bg-blue-400 rounded-full"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  ) : (
    children
  );
};

export default Loader;
