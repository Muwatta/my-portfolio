import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShareAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample categories (replace with dynamic categories if available in blog.json)
  const categories = ["All", "Tech", "Education", "IoT", "Frontend"];

  useEffect(() => {
    setLoading(true);
    fetch("/blog.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch blog data");
        return response.json();
      })
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading blog data:", error);
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = blogs;
    if (category !== "All") {
      result = result.filter((blog) => blog.category === category);
    }
    if (searchTerm) {
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBlogs(result);
  }, [category, searchTerm, blogs]);

  // Share function (simplified for demo; integrate with Web Share API if needed)
  const sharePost = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: blog.medium_link,
      });
    } else {
      alert("Share this post: " + blog.medium_link);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white flex flex-col items-center px-4 py-12 sm:py-16 relative">

      <Helmet>
        <title>Blog | Abdullahi Musliudeen Oladipupo</title>
        <meta name="description" content="Explore the latest insights and articles from Abdullahi Musliudeen Oladipupo, a Frontend Developer & Tech Trainer." />
      </Helmet>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50%, rgba(255,255,255,0.05), transparent)" }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center text-blue-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Blog Posts
        </motion.h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search blog posts"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold text-sm ${
                  category === cat ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                } transition-colors duration-300`}
                aria-label={`Filter by ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-gray-400">Loading blog posts...</div>
        )}
        {error && <div className="text-center text-red-400">{error}</div>}

        {/* Featured Post */}
        {filteredBlogs.length > 0 && !loading && !error && (
          <motion.div
            className="mb-12 bg-gray-800 bg-opacity-90 rounded-lg shadow-xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Featured Post</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={filteredBlogs[0].image}
                alt={filteredBlogs[0].title}
                className="w-full sm:w-1/3 h-48 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{filteredBlogs[0].title}</h3>
                <p className="text-xs text-gray-400">{filteredBlogs[0].date}</p>
                <p className="text-gray-300 mt-2">{filteredBlogs[0].excerpt}</p>
                <div className="mt-4 flex gap-4">
                  <a
                    href={filteredBlogs[0].medium_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                    aria-label={`Read more about ${filteredBlogs[0].title}`}
                  >
                    Read More →
                  </a>
                  <button
                    onClick={() => sharePost(filteredBlogs[0])}
                    className="text-gray-300 hover:text-blue-400 flex items-center gap-2"
                    aria-label={`Share ${filteredBlogs[0].title}`}
                  >
                    <FaShareAlt /> Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {filteredBlogs.slice(1).map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-gray-800 bg-opacity-90 p-4 rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <h2 className="text-lg font-semibold text-white">{blog.title}</h2>
              <p className="text-xs text-gray-400">{blog.date}</p>
              <p className="text-gray-300 mt-2 text-sm">{blog.excerpt}</p>
              <div className="mt-3 flex gap-4">
                <a
                  href={blog.medium_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                  aria-label={`Read more about ${blog.title}`}
                >
                  Read More →
                </a>
                <button
                  onClick={() => sharePost(blog)}
                  className="text-gray-300 hover:text-blue-400 flex items-center gap-2"
                  aria-label={`Share ${blog.title}`}
                >
                  <FaShareAlt /> Share
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {!loading && !error && filteredBlogs.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No blog posts found. Try adjusting the search or category.
          </div>
        )}

        {/* Newsletter Signup CTA */}
        <motion.div
          className="mt-12 text-center bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-4">Subscribe to my newsletter for the latest tech tips and insights.</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-full bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              aria-label="Email for newsletter"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors duration-300"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;