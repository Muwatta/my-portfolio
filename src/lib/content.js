import { supabase, isSupabaseConfigured } from "./supabase";

/**
 * PROJECTS CRUD
 */
export async function fetchProjects() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createProject(project) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(id, project) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("projects")
    .update({ ...project, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

/**
 * SKILLS CRUD
 */
export async function fetchSkills() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createSkill(skill) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("skills")
    .insert(skill)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateSkill(id, skill) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("skills")
    .update({ ...skill, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteSkill(id) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw error;
}

/**
 * TESTIMONIALS CRUD
 */
export async function fetchTestimonials() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createTestimonial(testimonial) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("testimonials")
    .insert(testimonial)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id, testimonial) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("testimonials")
    .update({ ...testimonial, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}

/**
 * EXPERIENCE CRUD
 */
export async function fetchExperience() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createExperience(experience) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("experience")
    .insert(experience)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateExperience(id, experience) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("experience")
    .update({ ...experience, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExperience(id) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw error;
}

/**
 * STATS CRUD
 */
export async function fetchStats() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase.from("stats").select("*");
  if (error) throw error;
  return data || [];
}

export async function createStat(stat) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("stats")
    .insert(stat)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateStat(key, stat) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("stats")
    .update({ ...stat, updated_at: new Date() })
    .eq("key", key)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteStat(key) {
  if (!isSupabaseConfigured) throw new Error("Supabase not configured");
  const { error } = await supabase.from("stats").delete().eq("key", key);
  if (error) throw error;
}
