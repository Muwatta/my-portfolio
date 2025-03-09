import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/blog-posts.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Blog</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-gray-800 p-6 rounded shadow hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-2xl font-bold text-white mt-4">{post.title}</h2>
            <p className="text-gray-400 mt-2">{post.excerpt}</p>
            <a
              href={post.mediumLink || "https://medium.com/@abdullahiMusliudeen"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Read More
            </a>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-400">
          For full details, please visit my Medium profile:{" "}
          <a
            href="https://medium.com/@abdullahiMusliudeen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            @abdullahiMusliudeen on Medium
          </a>
        </p>
      </div>
    </div>
  );
};

export default Blog;
