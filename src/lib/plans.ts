// Formules d'abonnement. Prix PROVISOIRES : à valider selon le coût réel de l'API Anthropic.
// Stripe sera branché à l'étape 10 (mode test uniquement tant que tu ne l'autorises pas).
export type Plan = {
  id: "free" | "pro" | "ultimate";
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
    id: "free",
    name: "Free",
    price: "0 €",
    tagline: "Pour découvrir",
    generations: "10 générations / mois",
    projects: "1 projet",
    features: ["Studio IA", "Génération de scripts Luau", "Plugin Roblox Studio"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "14,99 €",
    tagline: "Pour créer sérieusement",
    generations: "300 générations / mois",
    projects: "10 projets",
    features: ["Tout Free", "IA avancée", "Corrections automatiques", "Historique et annulation"],
    highlight: true,
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: "34,99 €",
    tagline: "Pour les gros projets",
    generations: "1 000 générations / mois",
    projects: "Projets illimités",
    features: ["Tout Pro", "Générations plus longues", "Fonctions avancées", "Support prioritaire"],
  },
];
