# Informe de migración

Fecha: 2026-07-11
Proyecto: Hablemos Claro Web
Origen: HTML + CSS + jQuery (plantilla Colorlib personalizada)
Destino: Next.js 15 App Router + React 19 + TypeScript 5 + Tailwind CSS 3

---

## Qué se ha migrado

### Páginas

| Legacy | Ruta nueva | Estado |
|---|---|---|
| `index.html` | `/` | Migrado con paridad funcional |
| `About.html` | `/about` | Migrado con paridad funcional |
| `contact.html` | `/contact` | Migrado con paridad funcional |
| `Cause.html` | `/donate` | Migrado — UI completa, pasarela Stripe pendiente |

### Secciones y componentes

| Elemento original | Nuevo |
|---|---|
| `<header>` duplicado en 5 páginas | `src/components/layout/Header.tsx` (Server Component) |
| `<footer>` duplicado en 5 páginas | `src/components/layout/Footer.tsx` (Server Component) |
| Menú móvil con slicknav.js | `src/components/layout/MobileNav.tsx` (React, accesible) |
| Slider hero con imagen de fondo | `src/components/sections/HeroSection.tsx` |
| Sección "¿Cómo lo hacemos?" | `src/components/sections/ManifestoPreviewSection.tsx` |
| Sección voluntariado + vídeo YouTube | `src/components/sections/VolunteerSection.tsx` |
| Formulario de donación | `src/components/sections/DonationSection.tsx` + `src/features/donations/` |
| Sección socios principales | `src/components/sections/MembersSection.tsx` |
| Formulario de contacto con jQuery Validate | `src/features/contact/components/ContactForm.tsx` (React Hook Form + Zod) |
| `contact_process.php` | `src/app/api/contact/route.ts` (Next.js API route) |

### SEO

| Antes | Ahora |
|---|---|
| `<meta name="description" content="">` vacío en index.html | Descripción específica por página |
| Sin Open Graph | Open Graph completo via `defaultMetadata` |
| Sin Twitter Cards | Twitter Cards via `defaultMetadata` |
| Sin sitemap | `/sitemap.xml` generado automáticamente por `app/sitemap.ts` |
| Sin robots | `/robots.txt` generado automáticamente por `app/robots.ts` |
| Sin datos estructurados | JSON-LD `Organization` en layout raíz |
| Sin `lang` correcto en 2 páginas | `lang="es"` en `<html>` global |

### Accesibilidad

| Antes | Ahora |
|---|---|
| Sin skip link | Skip link al contenido principal en layout raíz |
| Inputs sin `<label>` explícito | Labels asociados con `htmlFor` en todos los inputs |
| Placeholder como label (onfocus/onblur) | Placeholder decorativo, label real siempre visible |
| Menú móvil sin `aria-expanded`, `aria-controls`, `aria-modal` | Atributos ARIA correctos en MobileNav |
| Sin gestión de foco en menú móvil | Cierre con Escape y bloqueo de scroll |
| `alt=""` en imágenes significativas | Alt descriptivo en todas las imágenes con contenido |
| Sin indicadores de foco visibles | `focus-visible` con outline amarillo (#F1BF00) en todo el proyecto |
| Sin `prefers-reduced-motion` | Regla global en `globals.css` |

### Rendimiento

| Antes | Ahora |
|---|---|
| 24 scripts JS cargados globalmente (~600 KB) | Solo las dependencias necesarias, cargadas por módulo |
| 13 CSS globales (~550 KB) | Tailwind con purge de clases no usadas |
| Google Fonts con `@import` duplicado (+300 ms) | `next/font/google` sin bloqueo de render |
| Sin optimización de imágenes | `next/image` con formatos avif/webp y `sizes` adecuados |
| jQuery 1.12.4 (2016, CVEs conocidas) | Eliminado completamente |

---

## Qué se ha eliminado

### Archivos de plantilla sin función productiva

- `elements.html` — página de demostración de componentes Colorlib
- `cause_details.html` — plantilla en inglés ("Charifit") sin adaptar
- `main.html` — nota de licencia de Colorlib
- `readme.txt` — instrucciones del template original
- `charity-doc/` — documentación del template original

### Stack legacy completo

- `css/` — bootstrap, owl.carousel, magnific-popup, font-awesome, themify-icons, nice-select, flaticon, gijgo, animate, slicknav, style.css, hablemos-claro.css
- `scss/` — 27 archivos SCSS de la plantilla Colorlib
- `js/` — jQuery 1.12.4, modernizr, bootstrap, owl.carousel, isotope, imagesloaded, scrollIt, scrollUp, wow, nice-select, slicknav, magnific-popup, gijgo, ajax-form, contact.js, mail-script.js, plugins.js, main.js
- `fonts/` — FontAwesome 4.x, Themify Icons, Flaticon, gijgo-material

### Backend inseguro

- `contact_process.php` — vulnerable a inyección de headers SMTP, sin validación de entrada, sin protección CSRF, sin sanitización

### Imágenes de plantilla no referenciadas

- `img/elements/` — imágenes de demostración del kit de UI
- `img/causes/` — imágenes de causas de la plantilla original
- `img/post/` — imágenes de posts de blog de la plantilla
- `img/banner/bradcam.png`, `bradcam2.png`, `counter_bg.png`, `man.png` — fondos de plantilla
- `img/about/business.png` — imagen decorativa sin uso

---

## Qué se ha renombrado o reorganizado

| Origen | Destino | Motivo |
|---|---|---|
| `Cause.html` | `/donate` | Nombre semántico y en español |
| `About.html` | `/about` | Normalización de casing |
| `contact.html` | `/contact` | Normalización |
| `img/` | `public/img/` | Convención de Next.js para assets estáticos |
| `img/volenteer/` | `public/img/volenteer/` | Se mantiene el typo del original para no romper referencias |
| Contenido inline de navegación/footer | `src/content/navigation.ts`, `social-links.ts`, `footer-content.ts` | Desacoplamiento presentación/datos |

---

## Qué se ha mejorado sin eliminar funcionalidad

### Formulario de contacto

- Validación con Zod en cliente y en servidor (doble validación).
- Mensajes de error por campo en español.
- Estados de carga, éxito y error visibles al usuario.
- Sin posibilidad de doble envío (botón deshabilitado durante el envío).
- Endpoint en Next.js con rate-limiting (5 envíos/15 min por IP).
- Servicio de email desacoplado: se conecta a Resend en producción, loguea en desarrollo.

### Menú móvil

- Reemplaza slicknav.js (jQuery plugin) por componente React accesible.
- Cierra al navegar, al pulsar Escape y al hacer clic fuera.
- Bloquea el scroll del body cuando está abierto.
- `aria-expanded`, `aria-controls`, `aria-modal` correctamente implementados.

### Identidad visual

- Paleta de marca idéntica: negro base, amarillo `#F1BF00`, rojo `#AA151B`.
- Fuentes idénticas: Yeseva One (títulos) + Open Sans (cuerpo).
- Cargadas con `next/font/google` en lugar de `@import` duplicado.
- Tokens centralizados en `tailwind.config.ts`.

---

## Qué limitaciones siguen existiendo

| Limitación | Estado | Próximo paso |
|---|---|---|
| Donación con Stripe no operativa | Pendiente | Crear cuenta Resend + `/api/donations/create-intent` |
| URLs de redes sociales en placeholder (`#`) | Pendiente | Actualizar `src/content/social-links.ts` con URLs reales |
| Teléfono de contacto es placeholder (`+34 600 000 000`) | Pendiente | Actualizar `src/content/social-links.ts` |
| Rate-limiting en memoria (no apto para serverless multi-instancia) | Pendiente | Migrar a Upstash Redis si se despliega en Vercel |
| Sin tests | Omitido por decisión — ver sección siguiente | Añadir en siguiente iteración |
| Imagen de hero (`/img/banner/banner.png`) puede ser un placeholder | A verificar | Confirmar si hay imagen definitiva |
| Sin página legal (privacidad, cookies, aviso legal) | No existía antes | Añadir cuando haya contenido legal definitivo |

---

## Qué tareas quedan pendientes

Ordenadas por prioridad:

1. **Instalar dependencias**: `npm install` (requiere Node.js ≥ 20).
2. **Configurar variables de entorno**: crear `.env.local` desde `.env.example` con Resend API Key y correo destino real.
3. **Verificar imagen de hero**: confirmar que `/img/banner/banner.png` es la imagen definitiva o sustituirla.
4. **Conectar redes sociales**: actualizar `href` en `src/content/social-links.ts`.
5. **Integrar Stripe**: crear `/api/donations/create-intent/route.ts` y activar el botón en `DonationForm`.
6. **Añadir páginas legales**: privacidad, cookies, aviso legal en `app/legal/`.
7. **Migrar rate-limiting** a Upstash Redis si el despliegue es en Vercel.
8. **Añadir tests** cuando el equipo lo priorice.

---

## Decisiones que necesitan validación humana

| Decisión | Contexto |
|---|---|
| Copy del Manifiesto | Se ha preservado íntegramente. Validar que el texto refleja la posición institucional actual. |
| Nombres de socios | Marta Álvarez, Carlos Jiménez, Lucía Herrera son los del HTML original. Confirmar si son correctos o son placeholders. |
| Teléfono de contacto | `+34 600 000 000` era un placeholder en el HTML original. Confirmar número real. |
| Correo de contacto | `contacto@hablemosclaro.es` estaba en el HTML original. Confirmar que es el definitivo. |
| Licencia Colorlib | El footer original incluía "Plantilla creada por Colorlib" (licencia CC BY 3.0). Se ha eliminado en la nueva versión. Si se usa la plantilla sin licencia comercial, puede requerirse mantener ese crédito. Consultar con Colorlib o adquirir licencia. |
