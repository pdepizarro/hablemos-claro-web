# Hablemos Claro — Web

Plataforma web de la asociación **Hablemos Claro**, construida con Next.js App Router, TypeScript y Tailwind CSS.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript 5 (modo estricto) |
| Estilos | Tailwind CSS 3 |
| Fuentes | Yeseva One + Open Sans (Google Fonts via `next/font`) |
| Formularios | React Hook Form + Zod |
| Email | Resend |
| Iconos | Lucide React |
| Tests | Vitest + React Testing Library |
| Linting | ESLint (next/core-web-vitals) |
| Formato | Prettier |

## Requisitos

- **Node.js** ≥ 20 LTS
- **npm** ≥ 10

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar imágenes al directorio público (una sola vez)
.\scripts\migrate-assets.ps1

# 3. Configurar variables de entorno
# Crear .env.local en la raíz del proyecto y añadir los valores reales
```

## Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripción | Obligatoria en prod |
|---|---|---|
| `RESEND_API_KEY` | API Key de [Resend](https://resend.com) para envío de correo | Sí |
| `CONTACT_EMAIL_TO` | Correo destinatario del formulario de contacto | Sí |
| `RESEND_FROM_EMAIL` | Correo remitente verificado en Resend | Sí |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe para crear sesiones de Checkout | Sí |
| `STRIPE_WEBHOOK_SECRET` | Firma de webhook de Stripe para validar eventos entrantes | Sí |
| `STRIPE_PORTAL_RETURN_URL` | URL de retorno al salir del Customer Portal de Stripe | No |
| `DONATIONS_DB_PATH` | Ruta del archivo SQLite para registrar donaciones y eventos de suscripción | No |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio sin barra final | Sí |

En desarrollo sin `RESEND_API_KEY`, los mensajes del formulario se registran en consola en lugar de enviarse.

## Scripts

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Lint con ESLint
npm run typecheck    # Verificar tipos con tsc --noEmit
npm run test         # Ejecutar tests con Vitest
```

## Estructura del proyecto

```
src/
  app/                    # Rutas de Next.js App Router
    layout.tsx            # Layout raíz (Header + Footer + meta globales)
    page.tsx              # Página de inicio (/)
    about/page.tsx        # Quiénes somos (/about)
    contact/page.tsx      # Contacto (/contact)
    donate/page.tsx       # Compra libertad (/donate)
    api/contact/route.ts  # API de envío de correo
    api/donations/checkout/route.ts # API Stripe para donación puntual/suscripción mensual
    api/donations/customer-portal/route.ts # API para abrir el Customer Portal de Stripe
    api/webhooks/stripe/route.ts # Webhook Stripe para pagos y suscripciones
    sitemap.ts            # Sitemap automático
    robots.ts             # robots.txt
  components/
    layout/               # Header, Footer, MobileNav
    sections/             # HeroSection, VolunteerSection, etc.
    ui/                   # Button, Section, SectionTitle
  content/                # Datos desacoplados de la UI (navegación, social links)
  config/                 # site.ts, routes.ts, metadata.ts
  features/
    contact/              # Schema, tipos, servicio y formulario de contacto
    donations/            # Tipos y formulario de donación
  test/                   # Configuración de Vitest
scripts/
  migrate-assets.ps1      # Copia img/ -> public/img/
docs/
  refactor-audit.md       # Auditoría del proyecto legacy
```

## Convenciones

- **Server Components por defecto**. Solo se añade `"use client"` cuando es necesario (formularios, menú móvil, estado interactivo).
- **Imports**: alias `@/` para `src/`. Evitar rutas relativas profundas.
- **TypeScript**: modo estricto. Sin `any`. Props tipadas. Zod para validación en formularios.
- **Nombres de archivos**: PascalCase para componentes, camelCase para utilidades.
- **Estilos**: Tailwind utility classes. Sin CSS global salvo en `globals.css`.

## Testing

```bash
npm run test           # Todos los tests
npm run test:ui        # Tests con interfaz visual de Vitest
```

Los tests residen en archivos `*.test.tsx` junto al código que prueban, o en `src/test/` para utilidades globales.

## Build y despliegue

```bash
npm run build
npm run start
```

Recomendado: Vercel. Compatible con cualquier plataforma Node.js ≥ 20.

## Imágenes y assets

Los recursos estáticos deben estar en `public/img/`. El script [scripts/migrate-assets.ps1](scripts/migrate-assets.ps1) los copia desde el directorio `img/` legacy al primer arranque.

## Licencia

La plantilla original pertenece a [Colorlib](https://colorlib.com) bajo licencia CC BY 3.0. El código personalizado pertenece a Asociación Hablemos Claro.
