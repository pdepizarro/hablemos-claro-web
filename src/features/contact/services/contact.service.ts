import type { ContactFormData } from "../types";

/**
 * Envía el mensaje de contacto por correo electrónico mediante Resend.
 *
 * Para integrar con Resend:
 *   1. Crear cuenta en https://resend.com
 *   2. Añadir dominio hablemosclaro.es y verificarlo
 *   3. Generar una API Key y añadirla en .env.local como RESEND_API_KEY
 *
 * En desarrollo sin API Key, el mensaje se registra en consola en lugar de enviarse.
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  const toEmail = process.env["CONTACT_EMAIL_TO"] ?? "contacto@hablemosclaro.es";
  const fromEmail = process.env["RESEND_FROM_EMAIL"] ?? "noreply@hablemosclaro.es";

  if (!apiKey) {
    if (process.env["NODE_ENV"] === "development") {
      // eslint-disable-next-line no-console
      console.info("[ContactService] Sin RESEND_API_KEY. Simulando envío:", data);
      return;
    }
    throw new Error("Servicio de correo no configurado.");
  }

  // Importación dinámica para evitar cargar Resend en el bundle de cliente
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject: `Hablemos Claro — Contacto: ${data.subject}`,
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
    </body>
    </html>
  `;
}
