import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { updatePassword } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Nouveau mot de passe" };

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion?erreur=lien");

  return (
    <AuthForm
      title="Nouveau mot de passe"
      action={updatePassword}
      submit="Enregistrer"
      fields={[
        { name: "password", label: "Nouveau mot de passe", type: "password", autoComplete: "new-password" },
        { name: "confirm", label: "Confirme le mot de passe", type: "password", autoComplete: "new-password" },
      ]}
    />
  );
}
