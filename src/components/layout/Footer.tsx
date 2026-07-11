import Image from "next/image";
import Link from "next/link";
import { Youtube, Twitter, Instagram, Music } from "lucide-react";

import {
  footerColumns,
  footerDescription,
  copyrightOwner
} from "@/content/footer-content";
import { socialLinks, contactEmail, contactPhone } from "@/content/social-links";

const socialIcons = {
  youtube: Youtube,
  twitter: Twitter,
  instagram: Instagram,
  tiktok: Music
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black">
      <div className="container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Logo + descripción + redes */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Hablemos Claro — Inicio">
              <Image
                src="/img/footer_logo.png"
                alt="Hablemos Claro"
                width={160}
                height={48}
                className="mb-4 h-10 w-auto"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-hc-muted">
              Asociación Hablemos Claro. <br />
              {footerDescription}
            </p>
            <div className="flex gap-4" aria-label="Redes sociales">
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
                    <Icon size={18} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columna 2: Secciones */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-heading text-base font-bold text-hc-text">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-hc-muted transition-colors hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hc-yellow"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="mb-4 font-heading text-base font-bold text-hc-text">Contacto</h3>
            <address className="not-italic">
              <p className="text-sm leading-relaxed text-hc-muted">
                <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="hover:text-hc-yellow">
                  {contactPhone}
                </a>
                <br />
                <a href={`mailto:${contactEmail}`} className="hover:text-hc-yellow">
                  {contactEmail}
                </a>
                <br />
                España
              </p>
            </address>
          </div>

          {/* Columna 4: Redes / próximamente */}
          <div>
            <h3 className="mb-4 font-heading text-base font-bold text-hc-text">Redes</h3>
            <ul className="flex flex-col gap-4 text-sm text-hc-muted">
              <li className="flex items-center gap-3">
                <Image
                  src="/img/news/news_1.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded object-cover"
                />
                <div>
                  <p className="font-semibold text-hc-text">YouTube</p>
                  <span>Próximamente</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="/img/news/news_2.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded object-cover"
                />
                <div>
                  <p className="font-semibold text-hc-text">Instagram / TikTok</p>
                  <span>Próximamente</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container py-4 text-center text-xs text-hc-muted">
          Copyright &copy; {year} {copyrightOwner}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
