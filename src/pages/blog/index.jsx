import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  const posts = files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      ...data,
      slug: filename.replace(".md", ""),
    };
  });

  return {
    props: { posts },
  };
}

export default function Blog({ posts }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="p-4 border rounded-lg shadow-md">
            <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
            <p className="text-gray-500">
              <strong>Date:</strong> {post.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
