"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { Highlight, Section, SectionTitle } from "@/shared/ui";

type Member = {
  name: string;
  role: string;
  imageSrc: string;
};

const members: Member[] = [
  { name: "Pedro Pizarro", role: "Presidente", imageSrc: "/img/volenteer/1.png" },
  { name: "Noelia Barrero", role: "Secretaria", imageSrc: "/img/volenteer/2.png" },
];

/**
 * Reorders items so items[0] is in the center, items[1] to the right,
 * items[2] to the left, items[3] further right, items[4] further left, …
 *
 * The center slot index is Math.floor((n-1)/2) so that for even n there is
 * always at least one slot to the right of center.
 *
 * Example with 5 items → DOM order: [items[4], items[2], items[0], items[1], items[3]]
 * Example with 2 items → DOM order: [items[0], items[1]]  (center=0, right=1)
 * Example with 3 items → DOM order: [items[2], items[0], items[1]]  (center=1)
 */
function buildCarouselOrder(items: Member[]): { ordered: Member[]; centerIdx: number } {
  if (items.length === 0) return { ordered: [], centerIdx: 0 };
  if (items.length === 1) return { ordered: items, centerIdx: 0 };

  const n = items.length;
  const center = Math.floor((n - 1) / 2);
  const result = new Array<Member>(n);

  result[center] = items[0];

  let r = center + 1;
  let l = center - 1;
  for (let i = 1; i < n; i++) {
    if (i % 2 === 1) {
      // odd → right
      if (r < n) result[r++] = items[i];
      else result[l--] = items[i];
    } else {
      // even → left
      if (l >= 0) result[l--] = items[i];
      else result[r++] = items[i];
    }
  }

  return { ordered: result, centerIdx: center };
}

const { ordered, centerIdx: INITIAL_CENTER } = buildCarouselOrder(members);

export function MembersSection() {
  const [activeIdx, setActiveIdx] = useState(INITIAL_CENTER);
  const scrollRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const getCardCenter = (idx: number) => {
    const el = scrollRef.current;
    const card = itemRefs.current[idx];
    if (!el || !card) return 0;
    return card.offsetLeft + card.offsetWidth / 2;
  };

  // Snap to nearest card (used after drag ends and on scroll settle)
  const snapToNearest = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const viewCenter = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    itemRefs.current.forEach((card, idx) => {
      if (!card) return;
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - viewCenter);
      if (dist < minDist) { minDist = dist; closest = idx; }
    });
    container.scrollTo({ left: getCardCenter(closest) - container.offsetWidth / 2, behavior: "smooth" });
    setActiveIdx(closest);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update active indicator while scrolling (without snapping)
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const viewCenter = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    itemRefs.current.forEach((card, idx) => {
      if (!card) return;
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - viewCenter);
      if (dist < minDist) { minDist = dist; closest = idx; }
    });
    setActiveIdx(closest);
  }, []);

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
    <Section id="socios">
      <div className="container">
        <div className="mb-14 text-center">
          <SectionTitle>
            <Highlight>Socios principales</Highlight>
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
            onMouseUp={() => {
              if (!drag.current.active) return;
              drag.current.active = false;
              if (scrollRef.current) { scrollRef.current.style.cursor = "grab"; scrollRef.current.style.userSelect = ""; }
              snapToNearest();
            }}
            onMouseLeave={() => {
              if (!drag.current.active) return;
              drag.current.active = false;
              if (scrollRef.current) { scrollRef.current.style.cursor = "grab"; scrollRef.current.style.userSelect = ""; }
              snapToNearest();
            }}
            onTouchEnd={snapToNearest}
            className="flex items-center gap-4 overflow-x-auto pb-4 sm:gap-6"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch", cursor: "grab" } as React.CSSProperties}
          >
            {/* Left spacer */}
            <li aria-hidden className="shrink-0" style={{ width: "calc(50vw - 9rem)" }} />

            {ordered.map((member, idx) => {
              const isActive = idx === activeIdx;
              return (
                <li
                  key={member.name}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  className={[
                    "relative shrink-0 overflow-hidden rounded-hc-lg",
                    "transition-all duration-500 ease-out",
                    isActive
                      ? "w-64 sm:w-72 lg:w-80 opacity-100 shadow-hc-card ring-2 ring-hc-yellow/50"
                      : "w-48 sm:w-52 lg:w-60 opacity-60 scale-95 shadow-md"
                  ].join(" ")}
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={member.imageSrc}
                      alt={`Foto de ${member.name}, ${member.role}`}
                      fill
                      draggable={false}
                      className="pointer-events-none object-cover object-top"
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 256px"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5">
                    <p className="font-heading text-xl font-bold text-hc-text">{member.name}</p>
                    <p className="mt-1 text-sm text-hc-yellow">{member.role}</p>
                  </div>
                </li>
              );
            })}

            {/* Right spacer */}
            <li aria-hidden className="shrink-0" style={{ width: "calc(50vw - 9rem)" }} />
          </ul>
        </div>

        {/* Dot indicators (display only) */}
        <div className="mt-6 flex justify-center gap-2">
          {ordered.map((member, idx) => (
            <span
              key={member.name}
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

