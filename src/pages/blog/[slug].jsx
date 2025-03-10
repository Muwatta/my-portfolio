import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false, // Set to false so Next.js shows a 404 if a post doesn’t exist
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "content/blog", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);

  return {
    props: {
      post: { ...data, content: processedContent.toString() },
    },
  };
}

export default function BlogPost({ post }) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">
        <strong>Date:</strong> {post.date}
      </p>
      {post.image && <img src={post.image} alt={post.title} className="my-4 w-full rounded-lg" />}
      <div className="prose lg:prose-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
