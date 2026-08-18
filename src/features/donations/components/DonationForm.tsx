"use client";

import { useState } from "react";
import type { DonationAmount } from "../types";

const PRESET_AMOUNTS: DonationAmount[] = [10, 30, 50];

/**
 * Formulario de donación. Actualmente preparado para integración con Stripe.
 *
 * Para conectar Stripe:
 *   1. Instalar @stripe/stripe-js y @stripe/react-stripe-js
 *   2. Crear /api/donations/create-intent route.ts
 *   3. Envolver esta página con <Elements> de Stripe
 *   4. Reemplazar el onSubmit simulado por el flujo real de pago
 */
export function DonationForm() {
  const [presetAmount, setPresetAmount] = useState<DonationAmount | null>(30);
  const [customAmount, setCustomAmount] = useState<string>("");

  const resolvedAmount =
    presetAmount !== null ? presetAmount : Number(customAmount) || null;

  function handlePresetChange(amount: DonationAmount) {
    setPresetAmount(amount);
    setCustomAmount("");
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomAmount(e.target.value);
    setPresetAmount(null);
  }

  return (
    <form aria-label="Formulario de donación" noValidate>
      {/* Importes predefinidos */}
      <fieldset className="mb-6">
        <legend className="mb-3 font-semibold text-hc-text">Selecciona un importe</legend>
        <div className="flex flex-wrap gap-3">
          {PRESET_AMOUNTS.map((amount) => (
            <label
              key={amount}
              className={[
                "flex cursor-pointer items-center gap-2 rounded border px-4 py-2 transition",
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
              {amount} EUR
            </label>
          ))}
          <label
            className={[
              "flex cursor-pointer items-center gap-2 rounded border px-4 py-2 transition",
              presetAmount === null && customAmount !== ""
                ? "border-hc-yellow bg-hc-yellow text-black"
                : "border-hc-yellow/40 text-hc-text hover:border-hc-yellow"
            ].join(" ")}
          >
            <input
              type="radio"
              name="preset-amount"
              checked={presetAmount === null}
              onChange={() => setPresetAmount(null)}
              className="sr-only"
              aria-label="Otro importe"
            />
            Otro
          </label>
        </div>
      </fieldset>

      {/* Importe personalizado */}
      <div className="mb-8">
        <label htmlFor="custom-amount" className="mb-2 block text-sm font-semibold text-hc-text">
          Importe personalizado (EUR)
        </label>
        <div className="flex overflow-hidden rounded border border-white/20 bg-black/40 focus-within:border-hc-yellow">
          <span className="flex items-center bg-white/10 px-3 text-sm text-hc-muted" aria-hidden="true">
            EUR
          </span>
          <input
            id="custom-amount"
            type="number"
            min="1"
            step="1"
            placeholder="50"
            value={customAmount}
            onChange={handleCustomChange}
            aria-label="Importe de donación personalizado en euros"
            className="flex-1 bg-transparent px-3 py-2 text-hc-text placeholder-hc-muted focus:outline-none"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        {resolvedAmount !== null && (
          <p className="mb-4 text-sm text-hc-muted">
            Importe seleccionado: <strong className="text-hc-yellow">{resolvedAmount} EUR</strong>
          </p>
        )}
        <p className="mb-4 rounded border border-hc-yellow/30 bg-hc-yellow/10 px-4 py-3 text-sm text-hc-yellow">
          La integración con Stripe está en proceso. Pronto podrás completar tu donación en línea.
        </p>
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded bg-hc-yellow/50 px-6 py-3 font-bold text-black/70 sm:w-auto"
          aria-disabled="true"
        >
          Ir a pasarela de pago — Próximamente
        </button>
      </div>
    </form>
  );
}
