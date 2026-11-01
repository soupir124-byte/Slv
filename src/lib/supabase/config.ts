// Valeurs PUBLIQUES de Supabase (prévues pour être visibles dans le navigateur).
// La clé secrète, elle, ne doit JAMAIS apparaître dans le code : uniquement dans Vercel.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://intjvxtzvjdkszgejrmp.supabase.co";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_9n80JWEosxLjuK9IS_L7TQ_iVWXjGD8";
