import { LegalDocument } from "@/components/layout/LegalDocument";
import { isLegalDocReady, privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: privacyPolicy.title,
    description: privacyPolicy.description,
    path: `/${privacyPolicy.slug}`,
  }),
  // Mientras el texto legal esté pendiente, la página no se indexa.
  ...(isLegalDocReady(privacyPolicy) ? {} : { robots: { index: false, follow: true } }),
};

export default function Page() {
  return <LegalDocument doc={privacyPolicy} />;
}
