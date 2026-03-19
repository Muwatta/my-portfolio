import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { Helmet } from "react-helmet-async";
import { HiArrowRight } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

// ─── CONTACT LINKS ────────────────────────────────────────────────────────────

const LINKS = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "abdullahimusliudeen@gmail.com",
    href: "mailto:abdullahimusliudeen@gmail.com",
    color: "#3b82f6",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    value: "abdullahi-musliudeen",
    href: "https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6",
    color: "#0ea5e9",
  },
  {
    icon: <FaTwitter />,
    label: "X / Twitter",
    value: "@MusliudeenAbdu1",
    href: "https://x.com/MusliudeenAbdu1",
    color: "#8b5cf6",
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    value: "github.com/Muwatta",
    href: "https://github.com/Muwatta",
    color: "#10b981",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [focused, setFocused] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    emailjs
      .send(
        "service_9kguwow",
        "template_7ccra8p",
        { from_name: form.name, from_email: form.email, message: form.message },
        "2ObI2uamZr8oxG0IO",
      )
      .then(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("error"))
      .finally(() => setSending(false));
  };

  const inputBase =
    "w-full bg-white/80 dark:bg-slate-900/80 border rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-all duration-200";

  const inputStyle = (field) => ({
    borderColor: focused === field ? "#3b82f6" : "#1e293b",
    boxShadow: focused === field ? "0 0 0 3px #3b82f615" : "none",
  });

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#06090f] text-slate-800 dark:text-slate-200 relative overflow-hidden"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <Helmet>
        <title>Contact | Abdullahi Musliudeen Oladipupo</title>
        <meta
          name="description"
          content="Get in touch with Abdullahi Musliudeen — Full Stack Developer & Tech Educator."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* BG */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600 opacity-[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-violet-700 opacity-[0.06] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-20">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="text-[11px] font-mono tracking-[0.28em] uppercase text-blue-400 mb-3">
            Let's Connect
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.05] mb-5">
            Get in
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              Touch
            </span>
          </h1>
          <p
            className="text-slate-400 text-[15px] max-w-lg leading-relaxed"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Whether you're hiring, collaborating on a project, or exploring tech
            education partnerships — I'd love to hear from you.
          </p>
        </motion.div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* LEFT — FORM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 p-8">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-6">
                Send a message
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* name + email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      className={inputBase}
                      style={inputStyle("name")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      required
                      className={inputBase}
                      style={inputStyle("email")}
                    />
                  </div>
                </div>

                {/* message */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="What's on your mind?"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                    rows={6}
                    className={inputBase + " resize-none"}
                    style={inputStyle("message")}
                  />
                </div>

                {/* status */}
                <AnimatePresence>
                  {status && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-sm px-4 py-3 rounded-lg border ${
                        status === "success"
                          ? "text-green-400 bg-green-400/10 border-green-400/20"
                          : "text-red-400 bg-red-400/10 border-red-400/20"
                      }`}
                    >
                      {status === "success"
                        ? "✓ Message sent! I'll get back to you soon."
                        : "✗ Something went wrong. Please try again or email me directly."}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-colors"
                  style={{
                    backgroundColor: sending ? "#1e293b" : "#2563eb",
                    color: sending ? "#64748b" : "#fff",
                    cursor: sending ? "not-allowed" : "pointer",
                  }}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT — LINKS + INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* availability badge */}
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 px-5 py-4 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-green-400">
                  Available for work
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Open to full-stack roles & contracts
                </p>
              </div>
            </div>

            {/* contact links */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 p-6">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-5">
                Find me on
              </p>
              <div className="space-y-3">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-700 bg-slate-100/30 dark:bg-slate-900/30 hover:bg-slate-900/60 transition-all duration-200 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{
                        backgroundColor: link.color + "18",
                        color: link.color,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
                        {link.label}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors truncate">
                        {link.value}
                      </p>
                    </div>
                    <HiArrowRight className="ml-auto text-slate-700 group-hover:text-slate-400 text-xs flex-shrink-0 transition-all group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* response time */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/30 dark:bg-slate-900/30 px-5 py-4">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
                Response time
              </p>
              <p className="text-white font-bold">Usually within 24 hrs</p>
              <p
                className="text-slate-500 text-xs mt-1"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Based in Nigeria (WAT — UTC+1)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
