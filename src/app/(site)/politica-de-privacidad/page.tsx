import { LegalDocument } from "@/components/layout/LegalDocument";
import { privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: `/${privacyPolicy.slug}`,
});

export default function PrivacyPage() {
  return <LegalDocument doc={privacyPolicy} />;
}
