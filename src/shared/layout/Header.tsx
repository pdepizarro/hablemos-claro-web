import Image from "next/image";
import Link from "next/link";
import { Youtube, Twitter, Instagram, Music } from "lucide-react";

import { navLinks, ctaLink } from "@/content/navigation";
import { socialLinks, contactEmail } from "@/content/social-links";
import { MobileNav } from "./MobileNav";

const socialIcons = {
  youtube: Youtube,
  twitter: Twitter,
  instagram: Instagram,
  tiktok: Music
} as const;

/** Server Component. El único Client Component anidado es MobileNav. */
export function Header() {
  return (
    <header
      className="sticky top-0 z-50 bg-black"
      style={{
        backgroundImage: "url(/img/components/hablemos_claro_topbar_bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top",
        backgroundSize: "100% 100%"
      }}
    >
      {/* Topbar — solo escritorio */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="container flex h-10 items-center justify-between text-sm">
          <a
            href={`mailto:${contactEmail}`}
            className="text-hc-muted transition-colors hover:text-hc-yellow"
          >
            {contactEmail}
          </a>
          <div className="flex items-center gap-4" aria-label="Redes sociales">
            {socialLinks.map((s) => {
              const Icon = socialIcons[s.platform];
              return (
                <a
                  key={s.platform}
                  href={s.href}
                  aria-label={s.label}
                  className="text-hc-muted transition-colors hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hc-yellow"
                  {...(s.href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barra de navegación principal */}
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Hablemos Claro — Inicio"
          className="relative z-10 flex h-full items-center overflow-visible"
        >
          <Image
            src="/img/components/logo_hablemos_claro.png"
            alt="Hablemos Claro"
            width={160}
            height={48}
            priority
            className="h-20 w-auto max-w-none -mb-4"
          />
        </Link>

        {/* Navegación escritorio */}
        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-semibold text-hc-text transition-colors hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA escritorio + hamburguesa móvil */}
        <div className="flex items-center gap-3">
          <Link
            href={ctaLink.href}
            className="hidden rounded bg-hc-yellow px-5 py-2 font-bold text-black transition-colors hover:bg-hc-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:inline-flex"
          >
            {ctaLink.label}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
