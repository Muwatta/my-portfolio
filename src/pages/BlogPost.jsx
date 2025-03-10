import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch("/blog.json")
      .then((response) => response.json())
      .then((data) => {
        const foundPost = data.find((b) => b.id === parseInt(id));
        setPost(foundPost);
      })
      .catch((error) => console.error("Error loading blog data:", error));
  }, [id]);

  if (!post) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <img src={post.image} alt={post.title} className="w-full h-80 object-cover rounded my-4" />
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
};

export default BlogPost;
