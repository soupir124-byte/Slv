import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";
import { getProfile, hasAccess } from "@/lib/profile";
import { PLAN_LABEL, UPGRADE_PRICE, euros } from "@/lib/plans";
import { signOut } from "@/app/auth/actions";

export const metadata = { title: "Tableau de bord" };

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const profile = await getProfile(user.id);
  const pseudo = profile?.pseudo || (user.user_metadata?.pseudo as string) || user.email?.split("@")[0];
  const label = profile?.is_admin ? PLAN_LABEL.admin : PLAN_LABEL[profile?.plan ?? "none"];
  const access = hasAccess(profile);

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
        <p className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${access ? "bg-ember/15 text-ember-2 ring-1 ring-ember/40" : "bg-ink-3 text-fog ring-1 ring-line"}`}>
          {label}
        </p>

        {profile?.plan === "pro" && !profile.is_admin && (
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-ember/40 bg-ember/5 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold">Passe à Ultimate pour {euros(UPGRADE_PRICE)}</p>
              <p className="mt-1 text-sm text-fog">Tu as déjà Pro : tu ne paies que la différence (au lieu de 99 €).</p>
            </div>
            <span className="rounded-full border border-line px-5 py-2.5 text-sm text-fog">Paiement bientôt disponible</span>
          </div>
        )}

        {access ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-fog">
            Tes projets apparaîtront ici à l&apos;étape 4.
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-line bg-ink-2 p-8 text-center">
            <p className="font-semibold">Choisis une formule pour commencer à créer.</p>
            <p className="mt-2 text-sm text-fog">Pro à 50 € ou Ultimate à 99 €, en paiement unique. Le paiement sera activé prochainement.</p>
            <Link href="/#tarifs" className="mt-6 inline-flex rounded-full bg-ember px-6 py-3 font-semibold text-ink hover:bg-ember-2">Voir les formules</Link>
          </div>
        )}
      </section>
    </main>
  );
}
