import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { signIn } from "@/app/auth/actions";

export const metadata = { title: "Connexion" };

export default async function Page({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { erreur } = await searchParams;
  return (
    <AuthForm
      title="Bon retour !"
      subtitle="Connecte-toi pour retrouver tes jeux."
      action={signIn}
      submit="Se connecter"
      notice={erreur === "lien" ? "Ce lien est invalide ou a expiré. Reconnecte-toi ou demande un nouveau lien." : undefined}
      fields={[
        { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
        { name: "password", label: "Mot de passe", type: "password", autoComplete: "current-password" },
      ]}
      footer={
        <div className="space-y-2">
          <p><Link href="/mot-de-passe-oublie" className="hover:text-white">Mot de passe oublié ?</Link></p>
          <p>Pas encore de compte ? <Link href="/inscription" className="text-ember hover:underline">S&apos;inscrire</Link></p>
        </div>
      }
    />
  );
}
