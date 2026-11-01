import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { signUp } from "@/app/auth/actions";

export const metadata = { title: "Inscription" };

export default function Page() {
  return (
    <AuthForm
      title="Crée ton compte"
      subtitle="Ton premier jeu Roblox en quelques minutes."
      action={signUp}
      submit="Créer mon compte"
      fields={[
        { name: "pseudo", label: "Pseudo (facultatif)", type: "text", autoComplete: "nickname" },
        { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
        { name: "password", label: "Mot de passe (8 caractères min.)", type: "password", autoComplete: "new-password" },
      ]}
      footer={<>Déjà un compte ? <Link href="/connexion" className="text-ember hover:underline">Se connecter</Link></>}
    />
  );
}
