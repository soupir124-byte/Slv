import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/inscription", "/connexion"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
    priority: p === "" ? 1 : 0.5,
  }));
}
