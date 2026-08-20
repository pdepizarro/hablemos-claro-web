export type SocialPlatform = "youtube" | "twitter" | "instagram" | "tiktok";

export type SocialLink = {
  label: string;
  href: string;
  platform: SocialPlatform;
};

/**
 * Actualizar href con las URLs reales de las redes sociales
 * cuando estén disponibles.
 */
export const socialLinks: SocialLink[] = [
  { label: "YouTube", href: "#", platform: "youtube" },
  { label: "X (Twitter)", href: "#", platform: "twitter" },
  { label: "Instagram", href: "#", platform: "instagram" },
  { label: "TikTok", href: "#", platform: "tiktok" }
];

export const contactEmail = "asociacionhablemosclaro@gmail.com";
