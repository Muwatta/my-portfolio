import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaArrowUp,
  FaHeart,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: options.threshold || 0.5, ...options },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold]);
  return [ref, inView];
};

const MagneticSocialLink = ({ href, icon: Icon, label, color, hoverColor }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    });
  };
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-600"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: hoverColor }}
        initial={{ scale: 0 }}
        whileHover={{ scale: 1.5, opacity: 0.2 }}
      />
      <Icon
        className="relative z-10 w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors duration-300"
        style={{ color: hoverColor }}
      />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.a>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  useEffect(
    () => scrollY.on("change", (v) => setIsVisible(v > 400)),
    [scrollY],
  );
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px] shadow-lg shadow-blue-500/25">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-slate-900 transition-colors">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowUp className="w-5 h-5 text-blue-400" />
              </motion.div>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };
  return (
    <div className="max-w-md w-full">
      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
        Stay Updated
      </h4>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
        Get notified about new projects and tech articles.
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 pr-32 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
          disabled={status === "loading" || status === "success"}
        />
        <motion.button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${status === "success" ? "bg-green-500 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"}`}
          whileTap={{ scale: 0.95 }}
        >
          {status === "loading" ? (
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : status === "success" ? (
            "Subscribed!"
          ) : (
            "Subscribe"
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/abdullahi.musliudeen",
      label: "Facebook",
      color: "#1877F2",
      hoverColor: "rgba(24,119,242,0.3)",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/2349026642320",
      label: "WhatsApp",
      color: "#25D366",
      hoverColor: "rgba(37,211,102,0.3)",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/abdullahi-musliudeen-64435a239",
      label: "LinkedIn",
      color: "#0077B5",
      hoverColor: "rgba(0,119,181,0.3)",
    },
    {
      icon: FaTwitter,
      href: "https://x.com/MusliudeenAbdu1",
      label: "Twitter",
      color: "#1DA1F2",
      hoverColor: "rgba(29,161,242,0.3)",
    },
    {
      icon: SiLeetcode,
      href: "https://leetcode.com/u/muwatta/",
      label: "LeetCode",
      color: "#FFA116",
      hoverColor: "rgba(255,161,22,0.3)",
    },
    {
      icon: FaGithub,
      href: "https://github.com/Muwatta",
      label: "GitHub",
      color: "#ffffff",
      hoverColor: "rgba(255,255,255,0.2)",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume.pdf" },
  ];

  return (
    <>
      <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50 overflow-hidden transition-colors duration-300">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  AM
                </span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Full-Stack Developer & Tech Educator crafting scalable solutions
                and mentoring the next generation of developers.
              </p>
              <div className="flex gap-3">
                {socialLinks.slice(0, 4).map((link) => (
                  <MagneticSocialLink key={link.label} {...link} />
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-500 rounded-full" /> Quick
                Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 rounded-full transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-purple-500 rounded-full" /> Get
                in Touch
              </h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800/50 flex items-center justify-center text-blue-500">
                    <FaWhatsapp size={14} />
                  </span>
                  +234 902 664 2320
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800/50 flex items-center justify-center text-purple-500">
                    @
                  </span>
                  abdullahimusliudeen@gmail.com
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800/50 flex items-center justify-center text-cyan-500">
                    📍
                  </span>
                  Jos, Nigeria
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <Newsletter />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-8" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm flex items-center gap-1">
              © {currentYear} Abdullahi Musliudeen. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaHeart className="text-red-500 w-4 h-4 mx-1" />
              </motion.span>
              in Nigeria
            </p>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 dark:text-slate-600 text-sm hidden md:inline">
                Connect:
              </span>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/30 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                    aria-label={link.label}
                  >
                    <link.icon size={14} style={{ color: link.color }} />
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-6 text-sm text-slate-400 dark:text-slate-500">
              <a
                href="#"
                className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
