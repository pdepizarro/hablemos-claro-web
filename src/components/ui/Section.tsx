type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Equivalente a py-16 por defecto. */
  noPadding?: boolean;
};

export function Section({ children, id, className = "", noPadding = false }: SectionProps) {
  return (
    <section id={id} className={[noPadding ? "" : "py-16", className].filter(Boolean).join(" ")}>
      {children}
    </section>
  );
}
