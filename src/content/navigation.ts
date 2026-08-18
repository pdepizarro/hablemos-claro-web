import { routes } from "@/shared/config";

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: routes.home },
  { label: "Quiénes somos", href: routes.about },
  { label: "Contacto", href: routes.contact }
];

export const ctaLink: NavLink = {
  label: "Compra libertad",
  href: routes.donate
};
