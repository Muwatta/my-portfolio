import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Workshops from "./components/Workshops";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Preload critical assets
  useEffect(() => {
    const preloadAssets = async () => {
      const criticalImages = [
        "https://res.cloudinary.com/dee5edoss/image/upload/v1763611836/national_image_otksdm.jpg",
      ];

      try {
        await Promise.all(
          criticalImages.map(
            (src) =>
              new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // Continue even if image fails
                img.src = src;
              })
          )        );
      } catch (error) {
        console.log("Preload error:", error);
      }

      // Minimum display time for loader (prevents flash)
      setTimeout(() => setIsLoading(false), 1500);
    };

    preloadAssets();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen"
          >
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;