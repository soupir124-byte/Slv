import type { Metadata, Viewport } from "next";
import "./globals.css";

import { SITE_URL } from "@/lib/site";
import { InstallApp } from "@/components/InstallApp";

const description =
  "Crée ton propre jeu Roblox sans coder : décris ton idée, l'IA construit la map, écrit les scripts Luau et les interfaces directement dans Roblox Studio.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Embr — Crée ton jeu Roblox avec l'IA", template: "%s · Embr" },
  description,
  keywords: ["créer un jeu Roblox", "IA Roblox", "Roblox Studio", "script Luau", "jeu Roblox sans coder"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_FR", siteName: "Embr", title: "Embr — Une idée. Un jeu. L'IA s'occupe du reste.", description },
  twitter: { card: "summary_large_image", title: "Embr — Crée ton jeu Roblox avec l'IA", description },
  // Code fourni par Google Search Console (méthode "Balise HTML")
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  applicationName: "Embr",
  appleWebApp: { capable: true, title: "Embr", statusBarStyle: "black-translucent" },
  icons: { apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#07070a", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <InstallApp />
      </body>
    </html>
  );
}
