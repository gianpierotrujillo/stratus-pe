import { LegalDocument } from "@/components/layout/LegalDocument";
import { isLegalDocReady, cookiePolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({ title: cookiePolicy.title, description: cookiePolicy.description, path: `/${cookiePolicy.slug}` }),
  // Mientras el texto legal esté pendiente, la página no se indexa.
  ...(isLegalDocReady(cookiePolicy) ? {} : { robots: { index: false, follow: true } }),
};

export default function Page() {
  return <LegalDocument doc={cookiePolicy} />;
}
