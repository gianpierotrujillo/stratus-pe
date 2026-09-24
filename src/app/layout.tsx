import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/design/fonts";
import { toneColor } from "@/design/tokens";
import { site } from "@/config/site";
import { env } from "@/config/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${site.name} | Estudio de abogados en Lima`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
  },
  robots: env.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
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
