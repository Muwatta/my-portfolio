import { useState } from "react";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import emailjs from "emailjs-com";

// Inline Robot Animation component
const RobotAnimation = () => (
  <div className="relative">
    {/* Pulsing Call Ring */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0.8 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut",
        repeatDelay: 0.5,
      }}
      className="absolute inset-0 rounded-full border border-blue-400"
    />
    {/* Robot Icon with Pulse */}
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10"
    >
      <FaRobot size={80} className="text-yellow-400" />
    </motion.div>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_9kguwow";
    const templateID = "template_7ccra8p";
    const userID = "2ObI2uamZr8oxG0IO";

    emailjs
      .send(
        serviceID,
        templateID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        userID
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccessMessage("Your message has been sent successfully!");
          setForm({ name: "", email: "", message: "" });
          setIsSubmitting(false);
        },
        (error) => {
          console.error(error.text);
          setSuccessMessage(
            "There was an error sending your message. Please try again."
          );
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="relative min-h-screen bg-blue-900 flex flex-col items-center justify-center p-8">
      {/* For large screens, display robot absolutely */}
      <div className="hidden md:block absolute top-8 left-8">
        <RobotAnimation />
      </div>
      {/* For small screens, show robot above the form */}
      <div className="block md:hidden mb-6">
        <RobotAnimation />
      </div>
      <div className="bg-white p-8 rounded shadow-lg z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-900">Message Me</h2>
        </div>
        {successMessage && (
          <p className="text-green-500 text-center my-4">{successMessage}</p>
        )}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-gray-700">Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Your Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Your Message</span>
            <textarea
              name="message"
              placeholder="Type your message"
              value={form.message}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </label>
          <motion.button
            type="submit"
            className={`w-full p-2 rounded ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
