import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <motion.img
        src="/images/favicon-32x32.png"
        alt="Loading..."
        className="w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  ) : (
    children
  );
};

export default Loader;
