import type { ContactFormData } from "../types";

/**
 * Envía el mensaje de contacto mediante Resend.
 *
 * Pasos para activarlo:
 *   1. Crea cuenta gratuita en https://resend.com
 *   2. Ve a API Keys → Create API Key → copia la clave
 *   3. Añade en .env.local:
 *        RESEND_API_KEY=re_xxxxxxxxxxxx
 *   4. Reinicia el servidor
 *
 * El remitente usa onboarding@resend.dev (disponible sin verificar dominio).
 * Cuando tengas dominio propio verificado en Resend, cambia RESEND_FROM_EMAIL.
 *
 * En desarrollo sin API Key, el mensaje se registra en consola.
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  const toEmail = "asociacionhablemosclaro@gmail.com";
  const fromEmail = process.env["RESEND_FROM_EMAIL"] ?? "Hablemos Claro <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env["NODE_ENV"] === "development") {
      // eslint-disable-next-line no-console
      console.info("[ContactService] Sin RESEND_API_KEY. Simulando envío:", data);
      return;
    }
    throw new Error("Servicio de correo no configurado.");
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject: `[HC][${data.name}] — ${data.subject}`,
    html: buildEmailHtml(data)
  });

  if (error) {
    throw new Error(`Error al enviar el correo: ${error.message}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(data: ContactFormData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><title>Mensaje de contacto</title></head>
    <body style="font-family: sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #AA151B;">Nuevo mensaje de contacto — Hablemos Claro</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; font-weight: bold;">Nombre:</td><td>${name}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Correo:</td><td>${email}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Asunto:</td><td>${subject}</td></tr>
      </table>
      <hr style="margin: 16px 0; border-color: #eee;" />
      <p style="line-height: 1.7;">${message}</p>
      <hr style="margin: 16px 0; border-color: #eee;" />
      <p style="font-size: 12px; color: #888;">
        Mensaje enviado desde el formulario de contacto de hablemosclaro.es
      </p>
    </body>
    </html>
  `;
}
