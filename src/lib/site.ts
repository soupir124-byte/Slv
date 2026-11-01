// Adresse publique du site : à définir dans .env une fois le domaine choisi.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://slv-trois.vercel.app").replace(/\/$/, "");
