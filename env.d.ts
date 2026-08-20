declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production";

    NEXT_PUBLIC_SITE_URL?: string;

    RESEND_API_KEY?: string;
    RESEND_FROM_EMAIL?: string;

    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    STRIPE_PORTAL_RETURN_URL?: string;

    DONATIONS_DB_PATH?: string;
  }
}

export {};
