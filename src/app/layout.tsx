import type { Metadata } from "next";
import { Yeseva_One, Open_Sans } from "next/font/google";

import { defaultMetadata, siteConfig } from "@/shared/config";
import { Footer, Header } from "@/shared/layout";
import "@/styles/globals.css";

const headingFont = Yeseva_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading"
});

const bodyFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = defaultMetadata;

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/img/components/logo_hablemos_claro.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "contacto@hablemosclaro.es",
    contactType: "customer support"
  }
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {/* Skip link de accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-hc-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
        >
          Saltar al contenido principal
        </a>

        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
