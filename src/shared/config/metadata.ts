import type { Metadata } from "next";

import { siteConfig } from "./site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: "%s | Hablemos Claro"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/img/favicon/favicon_hablemos_claro.png",
    shortcut: "/img/favicon/favicon_hablemos_claro.png",
    apple: "/img/favicon/favicon_hablemos_claro.png"
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  }
};
