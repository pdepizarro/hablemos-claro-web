import { NextRequest, NextResponse } from "next/server";
import { contactSchema, sendContactEmail } from "@/features/contact";
import type { ContactApiResponse } from "@/features/contact";

/**
 * Rate limiting en memoria. Adecuado para una instancia única.
 * Para despliegue serverless multi-instancia (Vercel), sustituir por
 * Upstash Redis: https://upstash.com/docs/redis/sdks/ts/ratelimit
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : "unknown") ?? "unknown";
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Formato de solicitud inválido." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Partial<
      Record<"name" | "email" | "subject" | "message", string[]>
    >;
    return NextResponse.json(
      { success: false, error: "Los datos enviados no son válidos.", fieldErrors },
      { status: 422 }
    );
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno del servidor.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
