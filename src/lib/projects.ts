import type { Profile } from "@/lib/profile";

export type Project = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

// Nombre maximum de projets selon la formule (null = illimité).
export function projectLimit(p: Profile | null): number | null {
  if (!p) return 0;
  if (p.is_admin || p.plan === "ultimate") return null;
  if (p.plan === "pro") return 10;
  return 0;
}

// Structure de départ d'un jeu Roblox : les services standards, vides.
export const EMPTY_TREE = {
  Workspace: { className: "Workspace", children: {} },
  ReplicatedStorage: { className: "ReplicatedStorage", children: {} },
  ServerScriptService: { className: "ServerScriptService", children: {} },
  StarterGui: { className: "StarterGui", children: {} },
  StarterPlayer: { className: "StarterPlayer", children: {} },
};

export function timeAgo(iso: string) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "à l'instant";
  const m = Math.round(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.round(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.round(h / 24);
  return d === 1 ? "hier" : `il y a ${d} jours`;
}
