import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { toneColor } from "@/design/tokens";
import { appIcons } from "@/config/brand-assets";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    lang: site.lang,
    start_url: "/",
    display: "standalone",
    background_color: toneColor("dark", "surface"),
    theme_color: toneColor("dark", "surface"),
    icons: [
      { src: appIcons.icon192, sizes: "192x192", type: "image/png" },
      { src: appIcons.icon512, sizes: "512x512", type: "image/png" },
      { src: appIcons.maskable512, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
