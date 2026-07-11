# Arquitectura del proyecto

## Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js App Router | 15 |
| Lenguaje | TypeScript | 5 (modo estricto) |
| Estilos | Tailwind CSS | 3 |
| Fuentes | Yeseva One + Open Sans | via `next/font/google` |
| Formularios | React Hook Form + Zod | 7 / 3 |
| Email | Resend | 4 |
| Iconos | Lucide React | 0.460 |
| Tests | Vitest + React Testing Library | 2 / 16 |
| Linting | ESLint (next/core-web-vitals) | 9 |
| Formato | Prettier | 3 |

---

## Estructura de carpetas

```
src/
  app/                         # Rutas de Next.js (App Router)
  components/
    layout/                    # Header, Footer, MobileNav
    sections/                  # Secciones específicas de cada página
    ui/                        # Componentes genéricos reutilizables
  config/                      # Configuración centralizada (site, routes, metadata)
  content/                     # Datos desacoplados de la presentación
  features/
    contact/                   # Todo lo relativo al formulario de contacto
    donations/                 # Todo lo relativo a donaciones
  test/                        # Setup global de tests
```

---

## Responsabilidades por carpeta

### `src/app/`

Contiene exclusivamente las rutas de Next.js App Router. Cada `page.tsx` es un Server Component que compone secciones y recibe su propia metadata de SEO. No contiene lógica de negocio.

```
app/
  layout.tsx          # Layout raíz: fuentes, skip link, Header, Footer, JSON-LD
  page.tsx            # / — Inicio
  about/page.tsx      # /about — Quiénes somos + Manifiesto + Socios
  contact/page.tsx    # /contact — Formulario de contacto
  donate/page.tsx     # /donate — Compra libertad
  api/contact/        # POST /api/contact — envío de correo
  sitemap.ts          # /sitemap.xml generado automáticamente
  robots.ts           # /robots.txt generado automáticamente
  error.tsx           # Boundary de errores (Client Component)
  not-found.tsx       # Página 404
```

### `src/components/layout/`

Componentes presentes en todas las páginas a través del layout raíz.

- **`Header.tsx`** — Server Component. Topbar con email y redes, barra de navegación con logo y CTA. Renderiza `MobileNav` para móvil.
- **`Footer.tsx`** — Server Component. Cuatro columnas: logo + descripción + redes, secciones, contacto, redes próximamente.
- **`MobileNav.tsx`** — **Client Component** (único en el layout). Gestiona el estado open/close del menú móvil, cierre con Escape, cierre por ruta y bloqueo del scroll de body.

### `src/components/sections/`

Componentes de sección específicos por página. Todos son Server Components.

| Componente | Página | Descripción |
|---|---|---|
| `HeroSection` | `/` | Banner principal con imagen de fondo, headline y CTA |
| `ManifestoPreviewSection` | `/` | Tres tarjetas con imagen y caption flotante |
| `VolunteerSection` | `/` | Sección con fondo oscuro, enlace a vídeo YouTube y CTA |
| `DonationSection` | `/` | Bloque de selección de importe (estático, Stripe pendiente) |
| `MembersSection` | `/about` | Grid de fotos de socios principales con overlay de nombre/cargo |

### `src/components/ui/`

Componentes de interfaz genéricos sin lógica de dominio.

- **`Button`** — Discriminated union entre `<button>` y `<Link>`/`<a>`. Variantes `primary`, `secondary`, `ghost`. Tamaños `sm`, `md`, `lg`. Sin `any`.
- **`Section`** — Wrapper semántico `<section>` con padding vertical configurable.
- **`SectionTitle` / `Highlight`** — Tipografía de título de sección con nivel configurable (`h1`–`h4`) y span de color amarillo acento.

### `src/config/`

Configuración centralizada. Ningún componente hardcodea estos valores.

- **`site.ts`** — nombre, descripción, locale, URL del sitio.
- **`routes.ts`** — mapa de rutas tipado como objeto constante.
- **`metadata.ts`** — `defaultMetadata` de Next.js con Open Graph, Twitter Cards y robots.

### `src/content/`

Datos desacoplados de la presentación. Cambiar un enlace de navegación, un dato de contacto o un texto de footer no requiere tocar ningún componente.

- **`navigation.ts`** — `navLinks[]` y `ctaLink`.
- **`social-links.ts`** — `socialLinks[]`, `contactEmail`, `contactPhone`.
- **`footer-content.ts`** — `footerColumns[]`, `footerDescription`, `copyrightOwner`.

### `src/features/`

Agrupación por funcionalidad cuando existe lógica propia (schema, tipos, servicio, componente interactivo).

#### `features/contact/`

```
schemas/contact.schema.ts    # Schema Zod con mensajes en español
types/contact.types.ts       # ContactFormData (inferido de Zod), ContactApiResponse
services/contact.service.ts  # sendContactEmail() — integración Resend, fallback dev
components/ContactForm.tsx   # Client Component: React Hook Form + estados UI
```

El API route `app/api/contact/route.ts` valida con Zod, aplica rate-limiting en memoria y llama al servicio. No expone detalles internos al cliente.

#### `features/donations/`

```
types/donations.types.ts          # DonationAmount, DonationFormData, resolveAmount()
components/DonationForm.tsx       # Client Component: selector de importe, preparado para Stripe
```

---

## Server Components y Client Components

Por defecto todos los componentes son Server Components. Se añade `"use client"` únicamente cuando es estrictamente necesario.

| Componente | Tipo | Motivo |
|---|---|---|
| `MobileNav` | Client | Estado open/close, eventos de teclado, efecto de scroll |
| `ContactForm` | Client | React Hook Form, fetch al API, estados loading/success/error |
| `DonationForm` | Client | Estado de importe seleccionado |
| `error.tsx` | Client | Requerido por Next.js App Router |
| El resto | **Server** | — |

---

## Gestión de estilos

Tailwind CSS con tokens de marca definidos en `tailwind.config.ts`:

```ts
colors: {
  hc: {
    bg:     "#000000",   // fondo base
    text:   "#FAFAFA",   // texto principal
    muted:  "#D9D9D9",   // texto secundario
    yellow: "#F1BF00",   // acento primario (bandera de España)
    red:    "#AA151B"    // acento secundario (bandera de España)
  }
}
```

Fuentes en variables CSS (`--font-heading`, `--font-body`) cargadas con `next/font/google` en el layout raíz, sin bloqueo de render.

No se usa `@apply` salvo en `globals.css` para aplicar las fuentes a `body` y `h1`–`h6`. Sin CSS global de componentes.

---

## Gestión de formularios

El formulario de contacto sigue el patrón:

```
Schema Zod (fuente de verdad)
  → tipos derivados con z.infer
  → React Hook Form con zodResolver en el Client Component
  → fetch POST /api/contact
  → API route: parse body, validar con Zod, llamar al servicio
  → servicio: llamar a Resend (o log en dev si no hay API key)
```

Errores de validación se muestran por campo con `role="alert"` para lectores de pantalla. El botón se deshabilita durante el envío para evitar dobles envíos.

---

## SEO técnico

- `defaultMetadata` en `src/config/metadata.ts` con título template, descripción, Open Graph y Twitter Cards.
- Cada `page.tsx` exporta su propia `metadata` con título y descripción específicos.
- `sitemap.ts` genera `/sitemap.xml` automáticamente.
- `robots.ts` genera `/robots.txt` con reglas y referencia al sitemap.
- JSON-LD de tipo `Organization` en el layout raíz.
- `lang="es"` en `<html>`.
- Skip link de accesibilidad al contenido principal.

---

## Preparación para funcionalidades futuras

El proyecto está estructurado para crecer sin reescrituras:

| Funcionalidad | Dónde añadir |
|---|---|
| Donaciones reales con Stripe | `features/donations/services/`, nuevo API route `/api/donations/create-intent` |
| Eventos | Nueva feature `features/events/` + ruta `app/events/` |
| Noticias / artículos | `app/news/[slug]/` + MDX o CMS headless |
| Autenticación / área privada | `app/(private)/layout.tsx` con middleware de Next.js |
| Newsletter | `features/newsletter/` + integración Brevo/Mailchimp |
| i18n | `next-intl` o `i18next` con rutas `/es/`, `/en/` |
| Analítica | `app/layout.tsx` — añadir `<Script>` de Plausible o Vercel Analytics |
| Consentimiento de cookies | Componente Client en layout raíz |
| CMS | Reemplazar arrays en `src/content/` por llamadas a Contentful, Sanity o Directus |

---

## Decisiones técnicas

**¿Por qué Yeseva One + Open Sans y no las fuentes anteriores?**
La plantilla original cargaba Yeseva One y Open Sans desde Google Fonts con dos `@import` duplicados en `style.css`. Se mantienen las mismas fuentes pero cargadas con `next/font/google` para eliminar bloqueo de render y la petición duplicada.

**¿Por qué no se usa Redux ni Context API?**
El proyecto no tiene estado compartido entre rutas. El único estado es local a formularios y al menú móvil. Redux sería sobrearquitectura.

**¿Por qué rate-limiting en memoria en el API route?**
Es adecuado para un despliegue de instancia única (servidor tradicional). En Vercel (serverless), cada invocación puede ser una instancia diferente, por lo que el comentario del código indica migrar a Upstash Redis cuando se despliegue allí.

**¿Por qué `DonationForm` está deshabilitado?**
La pasarela Stripe requiere cuenta verificada, clave de producción y webhook. Se muestra la UI completa con el botón deshabilitado para que el flujo visual sea correcto desde el primer despliegue y la integración no rompa nada al activarse.

**Elementos deliberadamente no abstraídos:**
- El JSON-LD del layout raíz es un objeto literal inline. Abstraerlo a un helper no aportaría mantenibilidad real para un único tipo de dato estructurado.
- Los textos del Manifiesto están en el JSX de `about/page.tsx` porque son contenido fijo de largo plazo que no se edita con frecuencia.
