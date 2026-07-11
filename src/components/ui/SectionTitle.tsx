type HeadingLevel = "h1" | "h2" | "h3" | "h4";

type SectionTitleProps = {
  /** Texto del título. Puede incluir una parte que se resalta. */
  children: React.ReactNode;
  as?: HeadingLevel;
  /** Clases adicionales para el título. */
  className?: string;
  /** Alineación del título. */
  align?: "left" | "center";
};

const sizes: Record<HeadingLevel, string> = {
  h1: "text-5xl sm:text-6xl",
  h2: "text-3xl sm:text-4xl",
  h3: "text-2xl sm:text-3xl",
  h4: "text-xl sm:text-2xl"
};

export function SectionTitle({
  children,
  as: Tag = "h2",
  className = "",
  align = "center"
}: SectionTitleProps) {
  return (
    <Tag
      className={[
        "font-heading font-bold leading-tight text-hc-text",
        sizes[Tag],
        align === "center" ? "text-center" : "text-left",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

/**
 * Envuelve texto para que aparezca en color amarillo acento.
 * Uso: <SectionTitle>Texto <Highlight>resaltado</Highlight></SectionTitle>
 */
export function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-hc-yellow">{children}</span>;
}
