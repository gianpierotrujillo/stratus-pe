/**
 * GUÍA DE ESTILO — solo para revisión interna.
 * Muestra todos los componentes en sus tres tonos. En producción devuelve 404.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaCard, AreaGrid } from "@/components/blocks/AreaCard";
import { CtaBand } from "@/components/blocks/CtaBand";
import { NumberedItem } from "@/components/blocks/NumberedItem";
import { PartnerCard } from "@/components/blocks/PartnerCard";
import { Quote } from "@/components/blocks/Quote";
import { Stat } from "@/components/blocks/Stat";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StratusLines } from "@/components/ui/StratusLines";
import { Tag } from "@/components/ui/Tag";
import { env } from "@/config/env";
import { tokens, type Tone } from "@/design/tokens";
import { practiceAreas } from "@/content/areas";
import { partners } from "@/content/partners";

export const metadata: Metadata = {
  title: "Guía de estilo",
  robots: { index: false, follow: false },
};

const tones: Tone[] = ["light", "dark", "navy"];
const palette = Object.entries(tokens.color).filter(([k]) => !k.startsWith("$"));
const typeScale = Object.keys(tokens.text).filter((k) => !k.startsWith("$"));

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 text-eyebrow uppercase tracking-eyebrow text-muted">{children}</p>;
}

export default function StyleGuidePage() {
  if (env.indexable) notFound();

  return (
    <>
      <Section tone="dark">
        <SectionHeader
          as="h1"
          size="hero"
          eyebrow="Sistema de diseño"
          title={
            <>
              Guía de <span className="text-accent">estilo</span>
            </>
          }
          lead="Todos los componentes del sitio, alimentados por src/design/tokens.json. Cambiar un token actualiza esta página y el sitio completo."
        />
      </Section>

      {/* Paleta */}
      <Section tone="light" spacing="compact">
        <Label>Paleta primitiva (tokens.json → color)</Label>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {palette.map(([name, hex]) => (
            <li key={name}>
              <span
                className="block aspect-square border border-line"
                style={{ backgroundColor: `var(--color-${name})` }}
              />
              <p className="mt-3 text-small font-semibold text-heading">{name}</p>
              <p className="text-small text-muted">{String(hex)}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Tipografía */}
      <Section tone="light" spacing="compact" className="border-t border-line">
        <Label>Escala tipográfica (tokens.json → text)</Label>
        <div className="flex flex-col gap-8">
          {typeScale.map((key) => (
            <div key={key} className="grid gap-2 border-b border-line pb-8 md:grid-cols-12 md:items-baseline">
              <p className="text-small text-muted md:col-span-2">text-{key}</p>
              <p
                className={`md:col-span-10 ${["hero", "display-1", "display-2", "display-3", "title"].includes(key) ? "font-display font-semibold text-heading" : ""}`}
                style={{ fontSize: `var(--text-${key})`, lineHeight: `var(--text-${key}--line-height)` }}
              >
                {key === "eyebrow" ? "ANTETÍTULO EN VERSALITAS" : "Estrategia. Derecho. Resultados."}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Componentes por tono */}
      {tones.map((tone) => (
        <Section key={tone} tone={tone} className="border-t border-line">
          <Label>Tono: {tone}</Label>
          <SectionHeader
            eyebrow="Por qué Stratus"
            title="Más que asesoría legal. Estrategia."
            lead="Acompañamos a entidades públicas y privadas en sus decisiones más críticas."
          />

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Button href="/contacto">Iniciar una consulta</Button>
            <Button href="/contacto" variant="outline">
              Consultar ahora
            </Button>
            <Button href="/areas-de-practica" variant="link">
              Conocer nuestros servicios
            </Button>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            <Stat value="+15" label="años de experiencia" emphasis={tone === "light" ? "heading" : "accent"} />
            <Stat value="200+" label="casos atendidos" emphasis={tone === "light" ? "heading" : "accent"} />
            <Stat value="4" label="áreas de práctica" emphasis={tone === "light" ? "heading" : "accent"} />
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <NumberedItem index={1} title="Enfoque multidisciplinario">
              Integramos perspectivas legales, empresariales e institucionales para ofrecer soluciones completas.
            </NumberedItem>
            <NumberedItem index={2} title="Conocimiento del entorno peruano">
              Profundo entendimiento del marco regulatorio, institucional y político del Perú.
            </NumberedItem>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
            <Quote>
              La diferencia entre una decisión correcta y una decisión estratégica es el asesor que la acompaña.
            </Quote>
            <div className="flex flex-col gap-8">
              <Eyebrow>Antetítulo</Eyebrow>
              <StratusLines />
              <div className="flex flex-wrap gap-2">
                <Tag>Derecho Corporativo</Tag>
                <Tag>Gestión de Tierras</Tag>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Áreas */}
      <Section tone="light" className="border-t border-line">
        <SectionHeader eyebrow="Áreas de práctica" title="Especialización que marca la diferencia" />
        <div className="mt-14">
          <AreaGrid>
            {practiceAreas.map((a) => (
              <AreaCard key={a.slug} area={a} href={`/areas-de-practica/${a.slug}`} />
            ))}
          </AreaGrid>
        </div>
      </Section>

      {/* Socios */}
      <Section tone="light" className="border-t border-line">
        <Label>Tarjeta de socio — compacta</Label>
        <div className="grid gap-12 sm:grid-cols-2 lg:w-2/3">
          {partners.map((p) => (
            <PartnerCard key={p.slug} partner={p} variant="compact" as="h3" />
          ))}
        </div>
      </Section>

      <Section tone="light" className="border-t border-line">
        <Label>Tarjeta de socio — perfil completo</Label>
        <div className="flex flex-col gap-24">
          {partners.map((p) => (
            <PartnerCard key={p.slug} partner={p} as="h3" />
          ))}
        </div>
      </Section>

      <CtaBand
        title="¿Tiene un desafío estratégico que resolver?"
        text="Conversemos. Nuestro equipo está disponible para analizar su situación y proponer el camino más adecuado."
      />
    </>
  );
}
