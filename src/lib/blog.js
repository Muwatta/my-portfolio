import { supabase, isSupabaseConfigured } from "./supabase";

const TABLE = "blog_posts";

const TO_PUBLIC = (row) => ({
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
  featured: row.featured,
});

export async function fetchPosts() {
  if (!isSupabaseConfigured || !supabase) {
    const res = await fetch("/blog.json");
    if (!res.ok) throw new Error("Couldn't load posts.");
    return res.json();
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data.map(TO_PUBLIC);
}

export async function fetchPost(id) {
  if (!isSupabaseConfigured || !supabase) {
    const res = await fetch("/blog.json");
    const all = await res.json();
    return all.find((b) => String(b.id) === String(id)) || null;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? TO_PUBLIC(data) : null;
}

const TO_ROW = (post) => ({
  title: post.title,
  excerpt: post.excerpt,
  body: post.body,
  category: post.category,
  date: post.date,
  image: post.image,
  medium_link: post.medium_link,
  tags: post.tags || [],
  read_time: post.readTime || post.read_time || "5 min read",
  featured: post.featured || false,
});

export async function createPost(post) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(TO_ROW(post))
    .select()
    .single();
  if (error) throw error;
  return TO_PUBLIC(data);
}

export async function updatePost(id, post) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(TO_ROW(post))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return TO_PUBLIC(data);
}

export async function deletePost(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
