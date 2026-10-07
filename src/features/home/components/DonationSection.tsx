import Link from "next/link";

import { routes } from "@/shared/config";
import { Highlight, Section, SectionTitle } from "@/shared/ui";

export function DonationSection() {
  return (
    <Section id="donar" className="relative overflow-hidden !py-20 sm:!py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(241,191,0,0.16),transparent_65%)]"
      />

      <div className="container relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <SectionTitle className="max-w-3xl text-balance !text-2xl !leading-snug sm:!text-3xl lg:!text-4xl">
            Agradecemos <Highlight>toda ayuda</Highlight> para hacer crecer el proyecto y llevar el debate político a{" "}
            <Highlight>toda España</Highlight>
          </SectionTitle>

          <Link
            href={routes.donate}
            aria-label="Compra libertad"
            className="group relative mt-10 flex w-full items-center justify-center gap-3 rounded-hc-lg border-2 border-hc-yellow bg-hc-yellow whitespace-nowrap px-4 py-6 font-heading text-[1.65rem] font-bold text-black shadow-[0_0_60px_rgba(241,191,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-hc-red hover:bg-hc-red hover:text-white hover:shadow-[0_0_70px_rgba(170,21,27,0.55)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hc-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:w-auto sm:gap-4 sm:px-16 sm:py-8 sm:text-5xl lg:px-24 lg:py-10 lg:text-6xl"
          >
            Compra libertad
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-2 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </Section>
  );
}
