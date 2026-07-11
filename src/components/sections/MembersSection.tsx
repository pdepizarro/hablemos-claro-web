import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionTitle, Highlight } from "@/components/ui/SectionTitle";

type Member = {
  name: string;
  role: string;
  imageSrc: string;
};

const members: Member[] = [
  { name: "Marta Álvarez", role: "Presidenta", imageSrc: "/img/volenteer/1.png" },
  { name: "Carlos Jiménez", role: "Coordinador nacional", imageSrc: "/img/volenteer/2.png" },
  { name: "Lucía Herrera", role: "Portavoz", imageSrc: "/img/volenteer/3.png" }
];

export function MembersSection() {
  return (
    <Section id="socios">
      <div className="container">
        <div className="mb-14 text-center">
          <SectionTitle>
            <Highlight>Socios principales</Highlight>
          </SectionTitle>
        </div>

        <ul className="flex flex-wrap justify-center gap-8">
          {members.map(({ name, role, imageSrc }) => (
            <li
              key={name}
              className="group relative w-full overflow-hidden rounded-hc-lg sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={imageSrc}
                  alt={`Foto de ${name}, ${role}`}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              {/* Info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5">
                <p className="font-heading text-xl font-bold text-hc-text">{name}</p>
                <p className="mt-1 text-sm text-hc-yellow">{role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
