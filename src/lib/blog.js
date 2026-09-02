export const asPublicPost = (row = {}) => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  body: row.body,
  category: row.category,
  date: row.date,
  image: row.image,
  medium_link: row.medium_link,
  tags: row.tags || [],
  readTime: row.read_time || row.readTime,
  featured: Boolean(row.featured),
  published: row.published !== false,
});

export const filterPublicPosts = (posts = []) =>
  posts.filter((post) => post.published !== false);

export async function fetchPosts({ includeDrafts = false } = {}) {
  const res = await fetch("/blog.json");
  if (!res.ok) throw new Error("Couldn't load posts.");
  const posts = await res.json();
  return includeDrafts ? posts : filterPublicPosts(posts);
}

export async function fetchPost(id) {
  const posts = await fetchPosts();
  return posts.find((post) => String(post.id) === String(id)) || null;
}
