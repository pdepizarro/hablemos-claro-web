"use client";

import { useState } from "react";

type CustomerPortalButtonProps = {
  sessionId: string;
};

type PortalResponse = {
  success: boolean;
  url?: string;
  error?: string;
};

export function CustomerPortalButton({ sessionId }: CustomerPortalButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleOpenPortal() {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/donations/customer-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId })
      });

      const data = await response.json() as PortalResponse;
      if (!response.ok || !data.success || !data.url) {
        setStatus("idle");
        setErrorMessage(data.error ?? "No se pudo abrir el portal de suscripciones.");
        return;
      }

      window.location.assign(data.url);
    } catch {
      setStatus("idle");
      setErrorMessage("Error de red. Inténtalo de nuevo en unos segundos.");
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={handleOpenPortal}
        disabled={status === "loading"}
        className="w-full rounded border border-hc-yellow/45 bg-white/5 px-5 py-3 font-semibold text-hc-text transition-colors hover:border-hc-yellow hover:bg-hc-yellow/15 hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Abriendo portal..." : "Gestionar mi suscripción"}
      </button>

      {errorMessage && (
        <p className="mt-3 rounded-hc-lg border border-hc-red/35 bg-hc-red/10 px-4 py-3 text-sm text-hc-red">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
