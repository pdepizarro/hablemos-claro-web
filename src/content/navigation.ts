export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Quiénes somos", href: "/about" },
  { label: "Contacto", href: "/contact" }
];

export const ctaLink: NavLink = {
  label: "Compra libertad",
  href: "/donate"
};
