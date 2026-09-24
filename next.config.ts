import type { NextConfig } from "next";
import { env } from "./src/config/env";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Producción indexable: cualquier acceso por *.vercel.app se redirige
   * (301) al dominio oficial para que Google vea un solo sitio.
   */
  async redirects() {
    if (!env.indexable) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*)\\.vercel\\.app" }],
        destination: `${env.siteUrl}/:path*`,
        permanent: true,
      },
    ];
  },

  /** No indexable (vistas previas / pre-lanzamiento): noindex también para imágenes y archivos. */
  async headers() {
    if (env.indexable) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
