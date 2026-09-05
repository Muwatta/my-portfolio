import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/layout/Loader";

const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Skills = lazy(() => import("./pages/Skills"));
const Now = lazy(() => import("./pages/Now"));
const EngineeringExperience = lazy(
  () => import("./pages/EngineeringExperience"),
);

const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
  </div>
);

function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <MotionConfig reducedMotion="user">
            <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:text-sm focus:font-semibold"
              >
                Skip to main content
              </a>
              <Loader>
                {!isAdminRoute && <Navbar />}
                <main id="main-content" className="flex-grow">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route
                        path="/portfolio/:id"
                        element={<ProjectDetail />}
                      />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/now" element={<Now />} />
                      <Route
                        path="/engineering-experience"
                        element={<EngineeringExperience />}
                      />
                      <Route path="/resume" element={<Resume />} />
                      <Route path="/admin/login" element={<Admin />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
                {!isAdminRoute && <Footer />}
              </Loader>
              {!isAdminRoute && <PWAInstallPrompt />}
            </div>
          </MotionConfig>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
