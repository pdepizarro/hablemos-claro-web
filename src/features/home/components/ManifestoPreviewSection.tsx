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
        <div className="mb-14 text-center">
          <SectionTitle>
            <Highlight>¿Cómo lo hacemos?</Highlight>
          </SectionTitle>
        </div>

        <ul className="flex flex-wrap justify-center gap-8">
          {cards.map(({ label, src, alt }) => (
            <li
              key={label}
              className="relative flex w-full flex-col items-center sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-hc-lg">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              {/* Caption flotante */}
              <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-lg bg-white/95 px-4 py-2 shadow-md">
                <span className="font-heading text-2xl font-bold text-black">{label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
