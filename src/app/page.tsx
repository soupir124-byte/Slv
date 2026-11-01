import Link from "next/link";
import { Logo } from "@/components/Logo";
import { StudioDemo } from "@/components/StudioDemo";
import { Faq } from "@/components/Faq";
import { PLANS } from "@/lib/plans";

const btn = "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all";
const primary = `${btn} bg-ember text-ink hover:bg-ember-2 hover:-translate-y-0.5`;
const ghost = `${btn} border border-line text-white hover:border-ember/60 hover:text-ember-2`;

const IDEAS = [
  { t: "Simulateur de bûcheron", d: "Couper des arbres, vendre le bois, améliorer sa hache." },
  { t: "Obby volcanique", d: "40 niveaux de parcours avec checkpoints et lave mortelle." },
  { t: "Tycoon pizzeria", d: "Construire sa pizzeria, embaucher des PNJ, débloquer des étages." },
  { t: "Tower defense", d: "Vagues d'ennemis, tours améliorables et boutique de gemmes." },
];

const FEATURES = [
  ["Maps & bâtiments", "Terrain, décors et constructions générés à partir de Parts et de modèles."],
  ["Scripts Luau", "Code serveur et client propre, commenté et organisé dans les bons services."],
  ["Économie & boutiques", "Monnaies, leaderstats, sauvegardes DataStore et magasins in-game."],
  ["Interfaces", "Menus, HUD et boutiques en ScreenGui, prêts à l'emploi."],
  ["Corrections", "Colle une erreur de la console : Claude trouve la cause et corrige."],
  ["Plugin Roblox Studio", "Les changements arrivent directement dans ton projet Studio."],
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[700px]" />
      <div className="flicker pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-ember/20 blur-[120px]" />

      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-line/60 bg-ink/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" aria-label="Accueil Embr"><Logo /></Link>
          <div className="hidden items-center gap-7 text-sm text-fog md:flex">
            <a href="#studio" className="hover:text-white">Studio</a>
            <a href="#exemples" className="hover:text-white">Exemples</a>
            <a href="#tarifs" className="hover:text-white">Tarifs</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/connexion" className="hidden px-3 text-sm text-fog hover:text-white sm:inline">Connexion</Link>
            <Link href="/inscription" className={primary}>Inscription</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 text-center md:pt-28">
        <p className="rise mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-3 py-1 text-xs text-fog">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" /> Propulsé par Claude
        </p>
        <h1 className="rise font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl" style={{ animationDelay: ".08s" }}>
          Une idée. Un jeu.<br />
          <span className="bg-gradient-to-r from-ember to-ember-2 bg-clip-text text-transparent">L&apos;IA s&apos;occupe du reste.</span>
        </h1>
        <p className="rise mx-auto mt-6 max-w-xl text-base text-fog sm:text-lg" style={{ animationDelay: ".16s" }}>
          Décris ton jeu Roblox en quelques phrases. Embr construit la map, écrit les scripts et crée les interfaces, directement dans Roblox Studio.
        </p>
        <div className="rise mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: ".24s" }}>
          <Link href="/inscription" className={`${primary} px-7 py-3.5 text-base`}>Créer mon jeu →</Link>
          <a href="#tarifs" className={`${ghost} px-7 py-3.5 text-base`}>Voir les tarifs</a>
        </div>

        <div id="studio" className="rise mx-auto mt-16 max-w-5xl scroll-mt-24" style={{ animationDelay: ".32s" }}>
          <StudioDemo />
          <p className="mt-3 text-xs text-mist">Démonstration de l&apos;interface du studio</p>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">Tout un studio de dev, <span className="text-ember">en conversation</span>.</h2>
        <p className="mt-3 max-w-xl text-fog">Tu demandes, Claude analyse ton projet, propose les changements et les applique.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-line bg-ink-2 p-6 transition-colors hover:border-ember/50">
              <div className="mb-4 h-8 w-8 rounded-lg bg-ember/15 ring-1 ring-ember/40" />
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">Trois étapes.</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Décris ton jeu", "En français, comme à un ami développeur."],
            ["02", "Claude le construit", "Map, scripts, économie et interfaces, organisés proprement."],
            ["03", "Teste dans Studio", "Le plugin applique tout. Appuie sur Play."],
          ].map(([n, t, d]) => (
            <li key={n} className="rounded-2xl border border-line bg-gradient-to-b from-ink-2 to-ink p-6">
              <span className="font-mono text-sm text-ember">{n}</span>
              <h3 className="mt-3 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-fog">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Exemples */}
      <section id="exemples" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">Des idées à essayer</h2>
        <p className="mt-3 text-fog">Des exemples de demandes à envoyer au studio.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IDEAS.map((g, i) => (
            <div key={g.t} className="group overflow-hidden rounded-2xl border border-line bg-ink-2">
              <div className="relative h-32 overflow-hidden bg-ink-3">
                <div className="absolute inset-0 bg-gradient-to-br from-ember/30 via-transparent to-transparent" />
                {[...Array(6)].map((_, k) => (
                  <span key={k} className="absolute rounded-md bg-ember/70 transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ width: 14 + ((k * 7 + i * 5) % 20), height: 14 + ((k * 11 + i * 3) % 26), left: `${10 + k * 14}%`, bottom: 12 + ((k + i) % 3) * 6, opacity: 0.35 + (k % 3) * 0.2 }} />
                ))}
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{g.t}</h3>
                <p className="mt-1.5 text-sm text-fog">{g.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">Tarifs</h2>
        <p className="mt-3 text-center text-fog">Deux formules, sans engagement. Résiliable à tout moment.</p>
        <div className="mt-12 grid gap-5 mx-auto max-w-4xl md:grid-cols-2">
          {PLANS.map((p) => (
            <div key={p.id} className={`relative flex flex-col rounded-3xl border p-7 ${p.highlight ? "glow border-ember/60 bg-ink-2" : "border-line bg-ink-2"}`}>
              {p.highlight && <span className="absolute -top-3 left-7 rounded-full bg-ember px-3 py-0.5 text-xs font-semibold text-ink">Populaire</span>}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-mist">{p.tagline}</p>
              <p className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold">{p.price}<span className="text-base font-normal text-mist"> /mois</span></p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-fog">
                {[p.generations, p.projects, ...p.features].map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-ember">✓</span>{f}</li>
                ))}
              </ul>
              <Link href={`/inscription?plan=${p.id}`} className={`mt-8 ${p.highlight ? primary : ghost}`}>
                {`Choisir ${p.name}`}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <h2 className="mb-10 text-center font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">Questions fréquentes</h2>
        <Faq />
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-ember/40 bg-gradient-to-br from-ember-deep/40 via-ink-2 to-ink p-10 text-center sm:p-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl">Ton prochain jeu commence ici.</h2>
          <Link href="/inscription" className={`${primary} mt-8 px-8 py-3.5 text-base`}>Créer mon jeu →</Link>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-mist sm:flex-row">
          <Logo />
          <p>Embr n&apos;est pas affilié à Roblox Corporation.</p>
          <p>© {new Date().getFullYear()} Embr</p>
        </div>
      </footer>
    </main>
  );
}
