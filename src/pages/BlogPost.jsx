import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const file = await import(`/content/blog/${slug}.md?raw`);
        const { data, content } = matter(file.default);
        const processedContent = await remark().use(html).process(content);
        setPost({ ...data, content: processedContent.toString() });
      } catch (error) {
        console.error("Post not found", error);
      }
    }

    fetchPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500"><strong>Date:</strong> {post.date}</p>
      {post.image && <img src={post.image} alt={post.title} className="my-4 w-full rounded-lg" />}
      <div className="prose lg:prose-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
