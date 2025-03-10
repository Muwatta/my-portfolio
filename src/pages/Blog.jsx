import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const blogFiles = import.meta.glob("/content/blog/*.md", { as: "raw" });

      const postPromises = Object.keys(blogFiles).map(async (filePath) => {
        const fileContent = await blogFiles[filePath]();
        const { data } = matter(fileContent);
        return { ...data, slug: filePath.split("/").pop().replace(".md", "") };
      });

      setPosts(await Promise.all(postPromises));
    }

    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="p-4 border rounded-lg shadow-md">
            <Link to={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
            <p className="text-gray-500"><strong>Date:</strong> {post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
