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
      { label: "Calendario", href: routes.calendar },
      { label: "Contacto", href: routes.contact },
      { label: "Compra libertad", href: routes.donate }
    ]
  }
];

export const footerDescription =
  "Defendemos la libertad de expresión, la ejercemos y coordinamos la movilización civil en toda España";

export const copyrightOwner = "Asociación Hablemos Claro";
