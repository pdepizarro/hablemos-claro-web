import { routes } from "@/shared/config";

export type FooterColumn = {
  title: string;
  items: { label: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Secciones",
    items: [
      { label: "Inicio", href: routes.home },
      { label: "Quiénes somos", href: routes.about },
      { label: "Contacto", href: routes.contact },
      { label: "Compra libertad", href: routes.donate }
    ]
  }
];

export const footerDescription =
  "Defendemos libertad, unidad y participación cívica con acciones concretas en toda España.";

export const copyrightOwner = "Asociación Hablemos Claro";
