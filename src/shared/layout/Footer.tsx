import Image from "next/image";
import Link from "next/link";

import {
  footerColumns,
  footerDescription,
  copyrightOwner
} from "@/content/footer-content";
import { socialLinks, contactEmail } from "@/content/social-links";

const socialLogos: Record<string, string> = {
  youtube: "/img/logos/youtube_logo.png",
  twitter: "/img/logos/x_logo.png",
  instagram: "/img/logos/instagram_logo.png",
  tiktok: "/img/logos/tiktok_logo.png"
};

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
                src="/img/components/logo_hablemos_claro.png"
                alt="Hablemos Claro"
                width={480}
                height={144}
                className="mb-4 h-[7.5rem] w-auto"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-hc-muted">
              Asociación Hablemos Claro. <br />
              {footerDescription}
            </p>
            <div className="flex items-center gap-4" aria-label="Redes sociales">
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  aria-label={s.label}
                  className="opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hc-yellow"
                  {...(s.href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Image
                    src={socialLogos[s.platform]}
                    alt={s.label}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                </a>
              ))}
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
              {socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex items-center gap-3 transition-opacity hover:opacity-80"
                    {...(s.href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Image
                      src={socialLogos[s.platform]}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                      aria-hidden
                    />
                    <div>
                      <p className="font-semibold text-hc-text">{s.label}</p>
                      <span>{s.href === "#" ? "Próximamente" : s.href.replace("https://", "")}</span>
                    </div>
                  </a>
                </li>
              ))}
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
