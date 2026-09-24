import Image from "next/image";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StratusLines } from "@/components/ui/StratusLines";
import { mq, sizes } from "@/design/media";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type PageHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumbs?: readonly Crumb[];
  image?: { src: string; alt: string };
  /** Contenido extra bajo el texto (botones, etc.). */
  children?: ReactNode;
};

/** Cabecera oscura de páginas internas (h1). */
export function PageHeader({ eyebrow, title, lead, breadcrumbs, image, children }: PageHeaderProps) {
  return (
    <Section tone="dark" as="header" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={image ? "lg:col-span-7" : "lg:col-span-10"}>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <SectionHeader as="h1" size="display-1" eyebrow={eyebrow} title={title} lead={lead} />
          {children && <div className="mt-10">{children}</div>}
          {!image && <StratusLines className="mt-14 w-32" />}
        </div>
        {image && (
          <div className="relative lg:col-span-5">
            <div aria-hidden className="absolute -right-4 -bottom-4 hidden size-full border border-accent md:block" />
            <div className="relative aspect-4/5 overflow-hidden bg-surface-raised">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes={sizes([[mq.lg, "40vw"]])}
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
