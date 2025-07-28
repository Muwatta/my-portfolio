import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              <Routes>
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;