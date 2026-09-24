import { LegalDocument } from "@/components/layout/LegalDocument";
import { cookiePolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  path: `/${cookiePolicy.slug}`,
});

export default function CookiesPage() {
  return <LegalDocument doc={cookiePolicy} />;
}
