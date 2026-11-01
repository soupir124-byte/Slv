// Formules en PAIEMENT UNIQUE (pas d'abonnement).
// Stripe sera branché à l'étape 10 (mode test tant que tu ne l'autorises pas).
export type PlanId = "pro" | "ultimate";

export type Plan = {
  id: PlanId;
  name: string;
  price: number; // en euros
  tagline: string;
  details: { title: string; items: string[] }[];
  highlight?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "pro",
    name: "Pro",
    price: 50,
    tagline: "Tout pour créer ton premier vrai jeu",
    highlight: true,
    details: [
      { title: "Création", items: ["300 générations IA par mois", "Jusqu'à 10 projets", "Maps, bâtiments et objets", "Scripts Luau serveur et client"] },
      { title: "Gameplay", items: ["Économie, monnaies et leaderstats", "Boutiques in-game", "Interfaces (menus, HUD)"] },
      { title: "Outils", items: ["Plugin Roblox Studio", "Corrections automatiques des bugs", "Historique et annulation des modifications"] },
    ],
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: 99,
    tagline: "Pour les projets ambitieux",
    details: [
      { title: "Création", items: ["1 000 générations IA par mois", "Projets illimités", "Générations plus longues pour les gros systèmes"] },
      { title: "En plus de Pro", items: ["Animations", "Systèmes avancés (quêtes, PNJ, sauvegardes complexes)", "Accès en avant-première aux nouvelles fonctions"] },
      { title: "Support", items: ["Support prioritaire"] },
    ],
  },
];

export const euros = (n: number) => `${n} €`;

// Prix à payer selon ce que l'utilisateur possède déjà :
// un Pro qui passe à Ultimate ne paie que la différence.
export function priceFor(target: PlanId, owned: "none" | PlanId): number | null {
  const t = PLANS.find((p) => p.id === target)!;
  if (owned === "none") return t.price;
  const o = PLANS.find((p) => p.id === owned)!;
  if (o.price >= t.price) return null; // déjà possédé (ou supérieur)
  return t.price - o.price;
}

export const UPGRADE_PRICE = priceFor("ultimate", "pro")!; // 49 €

export const PLAN_LABEL: Record<string, string> = { none: "Aucune formule", pro: "Pro", ultimate: "Ultimate", admin: "Admin · accès illimité" };
