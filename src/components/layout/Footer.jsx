import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaArrowUp,
  FaHeart,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    href: "https://github.com/Muwatta",
    label: "GitHub",
    color: "#94a3b8",
    hoverBg: "rgba(148,163,184,0.15)",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/abdullahi-musliudeen-64435a239",
    label: "LinkedIn",
    color: "#0077B5",
    hoverBg: "rgba(0,119,181,0.15)",
  },
  {
    icon: FaTwitter,
    href: "https://x.com/MusliudeenAbdu1",
    label: "Twitter",
    color: "#1DA1F2",
    hoverBg: "rgba(29,161,242,0.15)",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/2349026642320",
    label: "WhatsApp",
    color: "#25D366",
    hoverBg: "rgba(37,211,102,0.15)",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/abdullahi.musliudeen",
    label: "Facebook",
    color: "#1877F2",
    hoverBg: "rgba(24,119,242,0.15)",
  },
  {
    icon: SiLeetcode,
    href: "https://leetcode.com/u/muwatta/",
    label: "LeetCode",
    color: "#FFA116",
    hoverBg: "rgba(255,161,22,0.15)",
  },
];

const QUICK_LINKS = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Skills", href: "/skills" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Resume", href: "/resume.pdf" },
];

const CONTACT_INFO = [
  {
    icon: FaEnvelope,
    value: "abdullahimusliudeen@gmail.com",
    href: "mailto:abdullahimusliudeen@gmail.com",
    color: "text-blue-500",
  },
  {
    icon: FaWhatsapp,
    value: "+234 902 664 2320",
    href: "https://wa.me/2349026642320",
    color: "text-green-500",
  },
  {
    icon: FaMapMarkerAlt,
    value: "Jos, Nigeria (WAT · UTC+1)",
    href: null,
    color: "text-cyan-500",
  },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const SocialIcon = ({ href, icon: Icon, label, color, hoverBg }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.93 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 transition-colors duration-200"
      style={{ backgroundColor: hovered ? hoverBg : "transparent" }}
    >
      <Icon size={15} style={{ color }} />
    </motion.a>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useEffect(() => scrollY.on("change", (v) => setVisible(v > 400)), [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowUp className="text-white w-4 h-4" />
          </motion.div>
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
    <div>
      <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-1">
        Stay Updated
      </h4>
      <p className="text-slate-500 dark:text-slate-500 text-xs mb-4 leading-relaxed">
        New posts on full-stack engineering and tech education.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 focus-within:border-blue-500/60 transition-colors"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status !== "idle"}
          className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status !== "idle"}
          className={`px-4 py-2.5 text-xs font-bold text-white transition-colors whitespace-nowrap flex items-center justify-center min-w-[80px] ${
            status === "success"
              ? "bg-green-500"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {status === "loading" ? (
            <motion.div
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : status === "success" ? (
            "✓ Done!"
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    </div>
  );
};

const FooterHeading = ({ children, accent = "bg-blue-500" }) => (
  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
    <span className={`w-5 h-[2px] rounded-full ${accent}`} />
    {children}
  </h4>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer
        className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50 overflow-hidden transition-colors duration-300"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-14 relative z-10">
          {/* ── GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-block mb-3">
                <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  AM
                </span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
                Full-Stack Engineer & Tech Educator — building production
                systems and mentoring the next generation of Nigerian
                developers.
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <SocialIcon key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <FooterHeading>Navigation</FooterHeading>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-blue-400 rounded-full transition-all duration-300" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <FooterHeading accent="bg-violet-500">Contact</FooterHeading>
              <ul className="space-y-3">
                {CONTACT_INFO.map(({ icon: Icon, value, href, color }) => {
                  const inner = (
                    <>
                      <span
                        className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 ${color}`}
                      >
                        <Icon size={12} />
                      </span>
                      <span className="text-sm truncate">{value}</span>
                    </>
                  );
                  return (
                    <li key={value}>
                      {href ? (
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <Newsletter />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-7" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-600">
            <p className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
              © {year} Abdullahi Musliudeen · Made with
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <FaHeart className="text-red-500 w-3 h-3 mx-0.5" />
              </motion.span>
              in Jos, Nigeria
            </p>
            <div className="flex gap-5">
              {["Privacy", "Terms"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
