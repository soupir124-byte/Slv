// Formules d'abonnement. Stripe sera branché à l'étape 10 (mode test tant que tu ne l'autorises pas).
export type PlanId = "pro" | "ultimate";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  tagline: string;
  generations: string;
  projects: string;
  features: string[];
  highlight?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "pro",
    name: "Pro",
    price: "50 €",
    tagline: "Pour créer sérieusement",
    generations: "300 générations / mois",
    projects: "10 projets",
    features: ["Studio IA complet", "Scripts Luau", "Plugin Roblox Studio", "Corrections automatiques", "Historique et annulation"],
    highlight: true,
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: "99 €",
    tagline: "Pour les gros projets",
    generations: "1 000 générations / mois",
    projects: "Projets illimités",
    features: ["Tout Pro", "Générations plus longues", "Fonctions avancées", "Support prioritaire"],
  },
];

export const PLAN_LABEL: Record<string, string> = { none: "Aucun abonnement", pro: "Pro", ultimate: "Ultimate", admin: "Admin · accès illimité" };
