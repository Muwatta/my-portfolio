import { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/blog.json")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error loading blog data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">Blog Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full max-w-5xl">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            className="bg-gray-800 p-4 rounded-lg shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
          >
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{blog.title}</h2>
            <p className="text-xs text-gray-400">{blog.date}</p>
            <p className="text-gray-300 mt-2">{blog.excerpt}</p>
            <a 
              href={blog.medium_link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 font-bold mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
