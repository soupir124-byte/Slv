import Link from "next/link";
import { Logo } from "@/components/Logo";

// Page honnête pour les fonctionnalités des étapes suivantes (pas de faux formulaire).
export function ComingSoon({ title, step }: { title: string; step: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-line bg-ink-2 p-8 text-center">
        <Link href="/" className="inline-block"><Logo /></Link>
        <h1 className="mt-8 font-[family-name:var(--font-display)] text-2xl font-bold">{title}</h1>
        <p className="mt-3 text-sm text-fog">Cette page sera branchée sur Supabase à l&apos;{step}.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full border border-line px-5 py-2.5 text-sm hover:border-ember/60">← Retour à l&apos;accueil</Link>
      </div>
    </main>
  );
}
