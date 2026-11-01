"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string };

async function origin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

// Traduction des erreurs Supabase les plus courantes.
function fr(msg: string) {
  if (/invalid login credentials/i.test(msg)) return "E-mail ou mot de passe incorrect.";
  if (/email not confirmed/i.test(msg)) return "Confirme d'abord ton e-mail grâce au lien reçu.";
  if (/already registered/i.test(msg)) return "Un compte existe déjà avec cet e-mail.";
  if (/at least/i.test(msg) && /password/i.test(msg)) return "Le mot de passe doit contenir au moins 8 caractères.";
  if (/rate limit/i.test(msg)) return "Trop de tentatives. Réessaie dans quelques minutes.";
  return msg;
}

export async function signUp(_: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const pseudo = String(form.get("pseudo") || "").trim();
  if (password.length < 8) return { error: "Le mot de passe doit contenir au moins 8 caractères." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { pseudo }, emailRedirectTo: `${await origin()}/auth/callback?next=/tableau-de-bord` },
  });
  if (error) return { error: fr(error.message) };
  if (data.session) redirect("/tableau-de-bord");
  return { message: `Compte créé ! Clique sur le lien envoyé à ${email} pour l'activer.` };
}

export async function signIn(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(form.get("email") || "").trim(),
    password: String(form.get("password") || ""),
  });
  if (error) return { error: fr(error.message) };
  redirect("/tableau-de-bord");
}

export async function requestReset(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const email = String(form.get("email") || "").trim();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await origin()}/auth/callback?next=/nouveau-mot-de-passe`,
  });
  if (error) return { error: fr(error.message) };
  return { message: "Si un compte existe avec cet e-mail, un lien de réinitialisation vient d'être envoyé." };
}

export async function updatePassword(_: AuthState, form: FormData): Promise<AuthState> {
  const password = String(form.get("password") || "");
  if (password.length < 8) return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  if (password !== form.get("confirm")) return { error: "Les deux mots de passe ne correspondent pas." };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: fr(error.message) };
  redirect("/tableau-de-bord");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
