export type FooterColumn = {
  title: string;
  items: { label: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Secciones",
    items: [
      { label: "Inicio", href: "/" },
      { label: "Quiénes somos", href: "/about" },
      { label: "Contacto", href: "/contact" },
      { label: "Compra libertad", href: "/donate" }
    ]
  }
];

export const footerDescription =
  "Defendemos libertad, unidad y participación cívica con acciones concretas en toda España.";

export const copyrightOwner = "Asociación Hablemos Claro";
