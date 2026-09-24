import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/design/fonts";
import { toneColor } from "@/design/tokens";
import { site } from "@/config/site";
import { env } from "@/config/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: site.seoTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: env.siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "legal",
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { title: site.shortName, statusBarStyle: "black-translucent" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.seoTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.description,
  },
  robots: env.indexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
      }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  ...(env.googleVerification ? { verification: { google: env.googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: toneColor("dark", "surface"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
