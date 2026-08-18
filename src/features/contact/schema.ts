import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede superar los 100 caracteres."),
  email: z.string().email("Introduce un correo electrónico válido."),
  subject: z
    .string()
    .min(4, "El asunto debe tener al menos 4 caracteres.")
    .max(200, "El asunto no puede superar los 200 caracteres."),
  message: z
    .string()
    .min(20, "El mensaje debe tener al menos 20 caracteres.")
    .max(4000, "El mensaje no puede superar los 4000 caracteres.")
});

export type ContactSchema = typeof contactSchema;
