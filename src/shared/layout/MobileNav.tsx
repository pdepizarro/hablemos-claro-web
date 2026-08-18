"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navLinks, ctaLink } from "@/content/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClientMounted, setIsClientMounted] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

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

  // Mantener el foco dentro del panel mientras está abierto
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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

      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!isOpen}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/72 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        <nav
          ref={menuRef}
          className={`absolute right-0 top-0 flex h-full w-80 max-w-[90vw] flex-col overflow-y-auto border-l border-hc-yellow/20 bg-[#060606] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = isClientMounted && pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-lg px-3 py-3.5 text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow ${
                      isActive
                        ? "border border-hc-yellow/35 bg-hc-yellow/12 text-hc-yellow"
                        : "text-hc-text hover:bg-white/5 hover:text-hc-yellow"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto border-t border-white/10 pt-6">
            <Link
              href={ctaLink.href}
              className="block rounded bg-hc-yellow px-4 py-3 text-center text-lg font-bold text-black transition-colors hover:bg-hc-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
              onClick={() => setIsOpen(false)}
            >
              {ctaLink.label}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
