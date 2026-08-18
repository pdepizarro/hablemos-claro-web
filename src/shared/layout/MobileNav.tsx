"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navLinks, ctaLink } from "@/content/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        className="rounded p-2 text-hc-text hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow lg:hidden"
      >
        {isOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <Menu size={24} aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-x-0 top-20 z-40 lg:hidden"
        >
          {/* Capa oscura detrás */}
          <div
            className="absolute inset-0 min-h-screen bg-black/60"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          {/* Panel deslizable desde la derecha */}
          <nav className="absolute right-0 top-0 h-screen w-72 max-w-[85vw] overflow-y-auto bg-black/97 px-6 py-8 shadow-2xl">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded px-2 py-3 text-lg font-semibold text-hc-text transition-colors hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4">
                <Link
                  href={ctaLink.href}
                  className="block rounded bg-hc-yellow px-4 py-3 text-center text-lg font-bold text-black transition-colors hover:bg-hc-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
                  onClick={() => setIsOpen(false)}
                >
                  {ctaLink.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
