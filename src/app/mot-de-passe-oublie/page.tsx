import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { requestReset } from "@/app/auth/actions";

export const metadata = { title: "Mot de passe oublié" };

export default function Page() {
  return (
    <AuthForm
      title="Mot de passe oublié"
      subtitle="On t'envoie un lien pour en choisir un nouveau."
      action={requestReset}
      submit="Envoyer le lien"
      fields={[{ name: "email", label: "E-mail", type: "email", autoComplete: "email" }]}
      footer={<Link href="/connexion" className="hover:text-white">← Retour à la connexion</Link>}
    />
  );
}
