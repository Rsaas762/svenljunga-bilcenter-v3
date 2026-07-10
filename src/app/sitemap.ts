import type { MetadataRoute } from "next";
import { inStockCars } from "@/lib/cars";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/bilar",
    "/salj-din-bil",
    "/hitta-min-bil",
    "/om-oss",
    "/kontakt",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const carPages = inStockCars().map((car) => ({
    url: `${site.url}/bilar/${car.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...carPages];
}
