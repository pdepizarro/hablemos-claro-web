"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { Highlight, Section, SectionTitle } from "@/shared/ui";

type Collaborator = {
  name: string;
  logoSrc: string;
  href: string;
};

const collaborators: Collaborator[] = [
  { name: "Patrio España", logoSrc: "/img/collaborators/patrio-espana.webp", href: "https://patrioespana.es/" }
];

const INITIAL_CENTER = Math.floor((collaborators.length - 1) / 2);

export function CollaboratorsSection() {
  const [activeIdx, setActiveIdx] = useState(INITIAL_CENTER);
  const scrollRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const findClosest = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return null;
    const viewCenter = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    itemRefs.current.forEach((card, idx) => {
      if (!card) return;
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - viewCenter);
      if (dist < minDist) { minDist = dist; closest = idx; }
    });
    return closest;
  }, []);

  const snapToNearest = useCallback(() => {
    const container = scrollRef.current;
    const closest = findClosest();
    const card = closest === null ? null : itemRefs.current[closest];
    if (!container || closest === null || !card) return;
    container.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - container.offsetWidth / 2,
      behavior: "smooth"
    });
    setActiveIdx(closest);
  }, [findClosest]);

  const handleScroll = useCallback(() => {
    const closest = findClosest();
    if (closest !== null) setActiveIdx(closest);
  }, [findClosest]);

  const endDrag = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (scrollRef.current) { scrollRef.current.style.cursor = "grab"; scrollRef.current.style.userSelect = ""; }
    snapToNearest();
  }, [snapToNearest]);

  // Center initial card after paint — double rAF ensures images/transitions settled
  useLayoutEffect(() => {
    const center = () => {
      const container = scrollRef.current;
      const card = itemRefs.current[INITIAL_CENTER];
      if (!container || !card) return;
      container.scrollLeft = card.offsetLeft + card.offsetWidth / 2 - container.offsetWidth / 2;
    };
    requestAnimationFrame(() => requestAnimationFrame(center));
  }, []);

  return (
    <Section id="colaboradores">
      <div className="container">
        <div className="mb-4 text-center sm:mb-6">
          <SectionTitle>
            <Highlight>Colaboradores</Highlight>
          </SectionTitle>
        </div>

        <div className="relative">
          <ul
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={(e) => {
              const el = scrollRef.current;
              if (!el) return;
              drag.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false };
              el.style.cursor = "grabbing";
              el.style.userSelect = "none";
            }}
            onMouseMove={(e) => {
              if (!drag.current.active) return;
              const el = scrollRef.current;
              if (!el) return;
              const dx = e.pageX - el.offsetLeft - drag.current.startX;
              if (Math.abs(dx) > 3) drag.current.moved = true;
              el.scrollLeft = drag.current.scrollLeft - dx;
            }}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchEnd={snapToNearest}
            // Un arrastre no debe abrir el enlace del colaborador
            onClickCapture={(e) => {
              if (drag.current.moved) {
                e.preventDefault();
                e.stopPropagation();
                drag.current.moved = false;
              }
            }}
            className="flex items-center gap-4 overflow-x-auto py-4 sm:gap-6"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch", cursor: "grab" } as React.CSSProperties}
          >
            {/* Left spacer */}
            <li aria-hidden className="shrink-0" style={{ width: "calc(50vw - 5rem)" }} />

            {collaborators.map((collaborator, idx) => {
              const isActive = idx === activeIdx;
              return (
                <li
                  key={collaborator.name}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  className={[
                    "w-32 shrink-0 transition-opacity duration-500 ease-out",
                    isActive ? "opacity-100" : "opacity-60"
                  ].join(" ")}
                >
                  <a
                    href={collaborator.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    aria-label={`${collaborator.name} (se abre en nueva pestaña)`}
                    className="group block rounded-hc-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <div className="relative aspect-square w-full transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={collaborator.logoSrc}
                        alt={`Logotipo de ${collaborator.name}`}
                        fill
                        draggable={false}
                        className="pointer-events-none object-contain"
                        sizes="128px"
                      />
                    </div>
                  </a>
                </li>
              );
            })}

            {/* Right spacer */}
            <li aria-hidden className="shrink-0" style={{ width: "calc(50vw - 5rem)" }} />
          </ul>
        </div>

        {/* Dot indicators (display only) */}
        <div className="mt-6 flex justify-center gap-2">
          {collaborators.map((collaborator, idx) => (
            <span
              key={collaborator.name}
              aria-hidden
              className={[
                "h-2 rounded-full transition-all duration-300",
                idx === activeIdx ? "w-6 bg-hc-yellow" : "w-2 bg-white/30"
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
