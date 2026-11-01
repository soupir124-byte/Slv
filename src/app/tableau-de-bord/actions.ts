"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profile";
import { EMPTY_TREE, projectLimit } from "@/lib/projects";

export type ActionState = { error?: string };

async function ctx() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Non connecté");
  return { supabase, user };
}

async function checkLimit(supabase: Awaited<ReturnType<typeof createClient>>, userId: string): Promise<string | null> {
  const profile = await getProfile(userId);
  const limit = projectLimit(profile);
  if (limit === 0) return "Choisis une formule pour créer des projets.";
  if (limit !== null) {
    const { count } = await supabase.from("projects").select("id", { count: "exact", head: true }).eq("user_id", userId);
    if ((count ?? 0) >= limit) return `Ta formule permet ${limit} projets. Passe à Ultimate pour en avoir plus.`;
  }
  return null;
}

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export async function createProject(_: ActionState, form: FormData): Promise<ActionState> {
  const { supabase, user } = await ctx();
  const name = clean(form.get("name"), 60);
  if (!name) return { error: "Donne un nom à ton jeu." };
  const limitError = await checkLimit(supabase, user.id);
  if (limitError) return { error: limitError };

  const { error } = await supabase.from("projects").insert({
    user_id: user.id, name, description: clean(form.get("description"), 300) || null, tree: EMPTY_TREE,
  });
  if (error) return { error: "Impossible de créer le projet. Réessaie." };
  revalidatePath("/tableau-de-bord");
  return {};
}

export async function renameProject(form: FormData) {
  const { supabase } = await ctx();
  const name = clean(form.get("name"), 60);
  if (!name) return;
  await supabase.from("projects").update({ name, updated_at: new Date().toISOString() }).eq("id", String(form.get("id")));
  revalidatePath("/tableau-de-bord");
}

export async function duplicateProject(form: FormData) {
  const { supabase, user } = await ctx();
  if (await checkLimit(supabase, user.id)) return;
  const { data } = await supabase.from("projects").select("name, description, tree").eq("id", String(form.get("id"))).single();
  if (!data) return;
  await supabase.from("projects").insert({ user_id: user.id, name: `${data.name} (copie)`.slice(0, 60), description: data.description, tree: data.tree });
  revalidatePath("/tableau-de-bord");
}

export async function deleteProject(form: FormData) {
  const { supabase } = await ctx();
  await supabase.from("projects").delete().eq("id", String(form.get("id")));
  revalidatePath("/tableau-de-bord");
}
