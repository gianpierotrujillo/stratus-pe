"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { mainNav, primaryCta } from "@/config/navigation";
import { site } from "@/config/site";
import { trackAttrs } from "@/lib/analytics";
import { mailtoHref } from "@/lib/contact";
import { cx } from "@/lib/cx";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sombra/borde al desplazarse.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú móvil al cambiar de página.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Bloquear scroll del fondo y cerrar con Escape mientras el menú está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      data-tone="dark"
      className={cx(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-(--motion-base) ease-brand",
        "bg-surface",
        scrolled || open ? "border-line" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-header w-full max-w-site items-center justify-between gap-8 px-gutter">
        <Link href="/" aria-label={`${site.name} — Inicio`} className="shrink-0">
          <Logo tone="dark" priority className="h-auto w-36 md:w-44" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative py-2 text-small font-medium transition-colors duration-(--motion-base) ease-brand",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-(--motion-base)",
                      active
                        ? "text-accent-text after:scale-x-100"
                        : "text-body after:scale-x-0 hover:text-heading hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Button
              href={primaryCta.href}
              variant="outline"
              size="sm"
              track={{ event: "cta_click", location: "header", id: "consultar_ahora" }}
            >
              {primaryCta.label}
            </Button>
          </div>

          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center text-heading lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-header overflow-y-auto border-t border-line bg-surface lg:hidden"
      >
        <nav
          aria-label="Principal móvil"
          className="mx-auto flex min-h-full max-w-site flex-col justify-between gap-12 px-gutter py-12"
        >
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex items-center justify-between py-5 font-display text-display-3",
                      active ? "text-accent-text" : "text-heading",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-6">
            <Button
              href={primaryCta.href}
              className="w-full"
              track={{ event: "cta_click", location: "mobile_menu", id: "consultar_ahora" }}
            >
              {primaryCta.label}
            </Button>
            <a
              href={mailtoHref()}
              className="text-center text-small text-body"
              {...trackAttrs({ event: "contact_click", location: "mobile_menu", params: { method: "email" } })}
            >
              {site.contact.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
