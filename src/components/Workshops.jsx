import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Animated background for subtle visual effect
const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900 opacity-80">
    <motion.div
      className="absolute inset-0"
      style={{ background: "radial-gradient(circle at 50%, rgba(255,255,255,0.1), transparent)" }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const workshops = [
  {
    title: "Scratch for Kids",
    description: "Learn coding basics through fun, interactive projects using Scratch. Perfect for ages 6-12.",
    duration: "4 weeks",
    level: "Beginner",
  },
  {
    title: "Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, and React to build modern websites. Ideal for teens and adults.",
    duration: "8 weeks",
    level: "Intermediate",
  },
  {
    title: "IoT with Arduino & Raspberry Pi",
    description: "Create smart devices with hands-on projects using Arduino and Raspberry Pi. For ages 12+.",
    duration: "6 weeks",
    level: "Intermediate",
  },
];

const Workshops = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ageGroup: "",
    workshop: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.ageGroup || !formData.workshop) {
      setFormStatus("Please fill out all fields.");
      return;
    }
    try {
      const response = await fetch("https://formspree.io/f/mldlngpe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus("Thank you for registering! You'll hear from us soon.");
        setFormData({ name: "", email: "", ageGroup: "", workshop: "" });
      } else {
        setFormStatus("Failed to register. Please try again.");
      }
    } catch (error) {
      setFormStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="relative bg-gray-900 min-h-screen">
      <AnimatedBackground />
      <Helmet>
        <title>Join Workshops | Abdullahi Musliudeen Oladipupo</title>
        <meta name="description" content="Register for tech workshops on Scratch, Web Development, and IoT with Muwatta." />
      </Helmet>
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        {/* Header */}
        <motion.section
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Join My Workshops</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Empower yourself or your kids with cutting-edge tech skills through hands-on, engaging workshops. From coding basics to building smart devices, there’s something for everyone!
          </p>
        </motion.section>

        {/* Workshop List */}
        <motion.section
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">Available Workshops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.title}
                className="bg-gray-800 bg-opacity-80 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-2">{workshop.title}</h3>
                <p className="text-gray-300 mb-4">{workshop.description}</p>
                <p className="text-gray-400">Duration: {workshop.duration}</p>
                <p className="text-gray-400">Level: {workshop.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Registration Form */}
        <motion.section
          className="bg-gray-800 bg-opacity-90 rounded-2xl shadow-xl p-6 sm:p-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-300 mb-6">Register Now</h2>
          <p className="text-center text-gray-200 mb-6">
            Fill out the form below to join a workshop and start your tech journey!
          </p>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-200 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-200 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Your Email"
                required
              />
            </div>
            <div>
              <label htmlFor="ageGroup" className="block text-gray-200 font-semibold mb-1">
                Age Group
              </label>
              <select
                id="ageGroup"
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select Age Group"
                required
              >
                <option value="">Select Age Group</option>
                <option value="6-12">6-12 (Kids)</option>
                <option value="13-18">13-18 (Teens)</option>
                <option value="18+">18+ (Adults)</option>
              </select>
            </div>
            <div>
              <label htmlFor="workshop" className="block text-gray-200 font-semibold mb-1">
                Preferred Workshop
              </label>
              <select
                id="workshop"
                name="workshop"
                value={formData.workshop}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select Preferred Workshop"
                required
              >
                <option value="">Select Workshop</option>
                {workshops.map((workshop) => (
                  <option key={workshop.title} value={workshop.title}>
                    {workshop.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Register for Workshop"
            >
              Register
            </button>
            {formStatus && (
              <motion.p
                className={`text-center ${formStatus.includes("Thank") ? "text-green-400" : "text-red-400"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {formStatus}
              </motion.p>
            )}
          </form>
        </motion.section>

        {/* Back to Top Button */}
        <motion.button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to Top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ↑
        </motion.button>
      </div>
    </div>
  );
};

export default Workshops;