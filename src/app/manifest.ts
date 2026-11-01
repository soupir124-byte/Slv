import type { MetadataRoute } from "next";

// Rend le site installable comme une application (Android, iPhone, ordinateur).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Embr — Crée ton jeu Roblox avec l'IA",
    short_name: "Embr",
    description: "Décris ton jeu Roblox, l'IA le construit.",
    lang: "fr",
    start_url: "/tableau-de-bord",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#07070a",
    theme_color: "#07070a",
    categories: ["games", "productivity", "developer"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
