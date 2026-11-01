import { createClient } from "@/lib/supabase/server";

export type Profile = { id: string; pseudo: string | null; plan: "none" | "pro" | "ultimate"; is_admin: boolean };

// Abonnement réel de l'utilisateur. Un admin a accès à tout, sans payer.
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("id, pseudo, plan, is_admin").eq("id", userId).maybeSingle();
  return (data as Profile) ?? null;
}

export function hasAccess(p: Profile | null, needed: "pro" | "ultimate" = "pro") {
  if (!p) return false;
  if (p.is_admin) return true;
  return needed === "pro" ? p.plan === "pro" || p.plan === "ultimate" : p.plan === "ultimate";
}
