"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DONATION_PRESET_AMOUNTS,
  resolveDonationAmount
} from "../types";
import type {
  DonationCheckoutResponse,
  DonationMode,
  DonationPresetAmount
} from "../types";

type FormStatus = "idle" | "loading";

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

export function DonationForm() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<DonationMode>("one_time");
  const [presetAmount, setPresetAmount] = useState<DonationPresetAmount | null>(20);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const resolvedAmount = resolveDonationAmount(presetAmount, customAmount);
  const paymentStatus = searchParams.get("status");
  const cadenceText = mode === "monthly" ? "al mes" : "ahora";
  const modeLabel =
    mode === "monthly" ? "Donación mensual (suscripción)" : "Donación puntual (pago único)";

  function handlePresetChange(amount: DonationPresetAmount) {
    setPresetAmount(amount);
    setCustomAmount("");
    setErrorMessage("");
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomAmount(e.target.value);
    setPresetAmount(null);
    setErrorMessage("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (resolvedAmount === null) {
      setErrorMessage("Selecciona o escribe una cantidad válida para continuar.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/donations/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, amount: resolvedAmount })
      });

      const data = await response.json() as DonationCheckoutResponse;

      if (!response.ok || !data.success || !data.checkoutUrl) {
        setStatus("idle");
        setErrorMessage(data.error ?? "No hemos podido iniciar el pago. Inténtalo de nuevo.");
        return;
      }

      window.location.assign(data.checkoutUrl);
    } catch {
      setStatus("idle");
      setErrorMessage("Error de red al iniciar el pago. Comprueba tu conexión e inténtalo de nuevo.");
    }
  }

  return (
    <form aria-label="Formulario de donación" noValidate onSubmit={handleSubmit}>
      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-hc-muted">
          Tipo de donación
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setMode("one_time")}
            className={`rounded-hc-lg border px-4 py-4 text-left transition-colors ${
              mode === "one_time"
                ? "border-hc-yellow bg-hc-yellow/12 text-hc-yellow"
                : "border-white/15 bg-black/35 text-hc-text hover:border-hc-yellow/45"
            }`}
            aria-pressed={mode === "one_time"}
          >
            <p className="font-heading text-xl font-bold">Donación puntual</p>
            <p className="mt-1 text-sm text-hc-muted">Pago único</p>
          </button>
          <button
            type="button"
            onClick={() => setMode("monthly")}
            className={`rounded-hc-lg border px-4 py-4 text-left transition-colors ${
              mode === "monthly"
                ? "border-hc-yellow bg-hc-yellow/12 text-hc-yellow"
                : "border-white/15 bg-black/35 text-hc-text hover:border-hc-yellow/45"
            }`}
            aria-pressed={mode === "monthly"}
          >
            <p className="font-heading text-xl font-bold">Donación mensual</p>
            <p className="mt-1 text-sm text-hc-muted">Suscripción recurrente</p>
          </button>
        </div>
      </fieldset>

      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-hc-muted">
          Cantidad
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {DONATION_PRESET_AMOUNTS.map((amount) => (
            <label
              key={amount}
              className={[
                "flex cursor-pointer items-center justify-center rounded-hc-lg border px-4 py-3 text-base font-semibold transition",
                presetAmount === amount
                  ? "border-hc-yellow bg-hc-yellow text-black"
                  : "border-hc-yellow/40 text-hc-text hover:border-hc-yellow"
              ].join(" ")}
            >
              <input
                type="radio"
                name="preset-amount"
                value={amount}
                checked={presetAmount === amount}
                onChange={() => handlePresetChange(amount)}
                className="sr-only"
                aria-label={`${amount} euros`}
              />
              {amount}€
            </label>
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor="custom-amount" className="mb-2 block text-sm font-semibold text-hc-text">
            Cantidad personalizada
          </label>
          <div className="flex overflow-hidden rounded-hc-lg border border-white/20 bg-black/40 focus-within:border-hc-yellow">
            <span className="flex items-center bg-white/10 px-3 text-sm text-hc-muted" aria-hidden="true">
              €
            </span>
            <input
              id="custom-amount"
              type="number"
              min="1"
              step="1"
              placeholder="Introduce tu cantidad"
              value={customAmount}
              onChange={handleCustomChange}
              onFocus={() => setPresetAmount(null)}
              aria-label="Importe de donación personalizado en euros"
              className="flex-1 bg-transparent px-3 py-3 text-hc-text placeholder-hc-muted focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      {(paymentStatus === "success" || paymentStatus === "canceled") && (
        <p
          className={`mb-6 rounded-hc-lg border px-4 py-3 text-sm ${
            paymentStatus === "success"
              ? "border-hc-yellow/35 bg-hc-yellow/10 text-hc-yellow"
              : "border-hc-red/35 bg-hc-red/10 text-hc-red"
          }`}
        >
          {paymentStatus === "success"
            ? "Gracias por tu apoyo. Tu donación se ha registrado correctamente."
            : "El proceso de pago fue cancelado. Puedes intentarlo de nuevo cuando quieras."}
        </p>
      )}

      {errorMessage && (
        <p className="mb-6 rounded-hc-lg border border-hc-red/35 bg-hc-red/10 px-4 py-3 text-sm text-hc-red">
          {errorMessage}
        </p>
      )}

      <div className="rounded-hc-lg border border-hc-yellow/25 bg-hc-yellow/10 p-4">
        <p className="text-sm uppercase tracking-[0.18em] text-hc-muted">Selección actual</p>
        <p className="mt-2 text-lg font-semibold text-hc-text">{modeLabel}</p>
        <p className="mt-1 text-base text-hc-yellow">
          {resolvedAmount !== null
            ? `Vas a donar ${formatEuro(resolvedAmount)} ${cadenceText}.`
            : `Selecciona una cantidad para donar ${mode === "monthly" ? "al mes" : "ahora"}.`}
        </p>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === "loading" || resolvedAmount === null}
          className="w-full rounded bg-hc-yellow px-6 py-3 font-bold text-black transition-colors hover:bg-[#FFD54A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading"
            ? "Conectando con Stripe..."
            : resolvedAmount === null
              ? "Selecciona una cantidad"
              : mode === "monthly"
                ? `Suscribirme por ${formatEuro(resolvedAmount)}/mes`
                : `Donar ${formatEuro(resolvedAmount)} ahora`}
        </button>

        <p className="mt-3 text-center text-sm text-hc-muted">
          {mode === "monthly"
            ? "Pago seguro con Stripe. Puedes cancelar la suscripción cuando quieras."
            : "Pago seguro con Stripe. Esta donación es puntual y no se renovará automáticamente."}
        </p>
      </div>
    </form>
  );
}
