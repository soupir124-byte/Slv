import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export const metadata = { title: "Tableau de bord" };

// Version minimale de l'étape 3 : prouve que la connexion fonctionne.
// Les projets arrivent à l'étape 4.
export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");
  const pseudo = (user.user_metadata?.pseudo as string) || user.email?.split("@")[0];

  return (
    <main className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/"><Logo /></Link>
          <form action={signOut}>
            <button className="rounded-full border border-line px-4 py-2 text-sm hover:border-ember/60">Déconnexion</button>
          </form>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">Salut {pseudo} 👋</h1>
        <p className="mt-2 text-fog">Connecté avec {user.email}</p>
        <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-fog">
          Tes projets apparaîtront ici à l&apos;étape 4.
        </div>
      </section>
    </main>
  );
}
