// Adresse publique du site : à définir dans .env une fois le domaine choisi.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
