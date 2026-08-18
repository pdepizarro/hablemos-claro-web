import Image from "next/image";

import { Highlight, Section, SectionTitle } from "@/shared/ui";

const cards = [
  { label: "Discutimos", src: "/img/help/1.png", alt: "Tres personas debatiendo" },
  { label: "Reflexionamos", src: "/img/help/2.png", alt: "Persona leyendo y reflexionando" },
  { label: "Actuamos", src: "/img/help/3.png", alt: "Personas tomando acción conjunta" }
];

export function ManifestoPreviewSection() {
  return (
    <Section id="manifiesto">
      <div className="container">
        <div className="mb-8 text-center">
          <SectionTitle>
            <Highlight>¿Cómo lo hacemos?</Highlight>
          </SectionTitle>
        </div>

        <ul className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {cards.map(({ label, src, alt }) => (
            <li key={label} className="relative flex min-w-0 flex-col items-center">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-hc-lg">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 28vw, 30vw"
                />
              </div>
              <div className="absolute bottom-0 left-1/2 z-10 w-[90%] -translate-x-1/2 translate-y-1/2 rounded-lg bg-white/95 px-2 py-1 shadow-md sm:px-4 sm:py-2">
                <span className="block text-center font-heading text-sm font-bold leading-tight text-black sm:text-xl lg:text-2xl">
                  {label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
