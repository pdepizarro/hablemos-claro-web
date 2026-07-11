import { z } from "zod";
import { contactSchema } from "../schemas/contact.schema";

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactApiResponse =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Partial<Record<keyof ContactFormData, string[]>> };
