import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";
import { cx } from "@/lib/cx";
import { trackAttrs, type Track } from "@/lib/analytics";

type ButtonProps = {
  href: string;
  children: ReactNode;
  /** primary = relleno dorado · outline = borde · link = texto con flecha */
  variant?: "primary" | "outline" | "link";
  size?: "md" | "sm";
  arrow?: boolean;
  track?: Track;
  className?: string;
};

const variantClass = {
  primary: "bg-accent text-on-accent border border-accent hover:bg-transparent hover:text-accent-text",
  outline: "border border-accent text-heading hover:bg-accent hover:text-on-accent",
  link: "text-accent-text hover:text-heading",
};

const sizeClass = {
  md: "min-h-14 px-8 text-small",
  sm: "min-h-11 px-5 text-small",
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = variant === "link",
  track,
  className,
}: ButtonProps) {
  const classes = cx(
    "group inline-flex items-center justify-center gap-3 rounded-control font-semibold tracking-wide",
    "transition-colors duration-(--motion-base) ease-brand",
    variant !== "link" && sizeClass[size],
    variantClass[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-(--motion-base) ease-brand group-hover:translate-x-1" />
      )}
    </>
  );

  if (isExternal(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...trackAttrs(track)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...trackAttrs(track)}>
      {content}
    </Link>
  );
}
