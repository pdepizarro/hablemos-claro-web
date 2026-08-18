/**
 * Tipos para la funcionalidad de donaciones.
 *
 * La integración con Stripe se documentará en docs/architecture.md.
 * Cuando esté disponible, añadir aquí los tipos de respuesta de Stripe.
 */

export type DonationAmount = 10 | 30 | 50;

export type DonationFormData = {
  /** Importe en euros. Null cuando el usuario selecciona "Otro". */
  presetAmount: DonationAmount | null;
  /** Importe personalizado introducido por el usuario. */
  customAmount: number | null;
};

/** Importe final resuelto en euros. */
export function resolveAmount(data: DonationFormData): number | null {
  if (data.presetAmount !== null) return data.presetAmount;
  if (data.customAmount !== null && data.customAmount > 0) return data.customAmount;
  return null;
}
