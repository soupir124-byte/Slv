const ITEMS = [
  ["Faut-il savoir programmer ?", "Non. Tu décris ton jeu en français, Claude écrit les scripts Luau et construit les éléments. Tu peux quand même lire et modifier tout le code."],
  ["Comment le jeu arrive-t-il dans Roblox Studio ?", "Tu installes le plugin Embr dans Roblox Studio et tu le relies à ton compte. Chaque modification validée dans le studio est appliquée directement dans ton projet."],
  ["Peut-on tester le jeu sur le site ?", "Le site affiche un aperçu 3D simplifié de la map. Le vrai test (physique, scripts, multijoueur) se fait dans Roblox Studio avec le bouton Play."],
  ["Quelle IA est utilisée ?", "Claude, développé par Anthropic, via son API officielle."],
  ["Le jeu m'appartient-il ?", "Oui. Le projet est enregistré dans ton propre fichier Roblox, tu le publies et le monétises comme tu veux, dans le respect des règles de Roblox."],
  ["Est-ce un abonnement ?", "Non. Tu paies une seule fois et tu gardes ta formule. Le nombre de générations IA se recharge chaque mois."],
  ["J'ai Pro, puis-je passer à Ultimate ?", "Oui, à tout moment depuis ton tableau de bord. Tu ne paies que la différence entre les deux formules (49 €)."],
];

export function Faq() {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-ink-2">
      {ITEMS.map(([q, a]) => (
        <details key={q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
            {q}
            <span className="text-ember transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-fog">{a}</p>
        </details>
      ))}
    </div>
  );
}
