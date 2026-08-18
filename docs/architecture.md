# Arquitectura del proyecto

## Resumen

La aplicación sigue una estructura **feature-based con capas claras**:

- **`src/app/`**: routing y layouts de Next.js App Router, con lógica mínima
- **`src/features/`**: dominios completos y autocontenidos
- **`src/shared/`**: piezas reutilizables transversales
- **`src/content/`**: contenido estático desacoplado
- **`src/styles/`**: estilos globales

El objetivo es escalar sin mezclar UI compartida, contenido editorial y lógica de dominio.

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Next.js 15 App Router |
| Lenguaje | TypeScript 5 strict |
| Estilos | Tailwind CSS 3 |
| Formularios | React Hook Form + Zod |
| Email | Resend |
| Iconos | Lucide React |
| Tests | Vitest + Testing Library |

## Estructura actual

```text
src/
  app/
    about/
    api/contact/
    contact/
    donate/
    error.tsx
    layout.tsx
    not-found.tsx
    page.tsx
    robots.ts
    sitemap.ts
  content/
    footer-content.ts
    navigation.ts
    social-links.ts
  features/
    about/
      components/
      index.ts
    contact/
      components/
      services/
      index.ts
      schema.ts
      types.ts
    donations/
      components/
      index.ts
      types.ts
    home/
      components/
      index.ts
  shared/
    config/
      index.ts
      metadata.ts
      routes.ts
      site.ts
    layout/
      index.ts
      Footer.tsx
      Header.tsx
      MobileNav.tsx
    ui/
      index.ts
      Button.tsx
      Section.tsx
      SectionTitle.tsx
  styles/
    globals.css
  test/
    setup.ts
```

## Responsabilidades por capa

### `src/app/`

Solo contiene entrada de rutas y composición de alto nivel.

- [layout.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/app/layout.tsx): layout raíz, fuentes, JSON-LD, skip link y shell global
- [page.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/app/page.tsx): delega en la feature de home
- [about/page.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/app/about/page.tsx): delega en la feature about
- [contact/page.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/app/contact/page.tsx): delega en la feature contact
- [donate/page.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/app/donate/page.tsx): delega en la feature donations
- [route.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/app/api/contact/route.ts): API route del contacto

Regla: **`app/` no debe alojar lógica de dominio ni markup extenso reutilizable**.

### `src/features/`

Cada carpeta representa una funcionalidad o área de negocio con su propia API pública.

#### `features/home/`

- secciones de la home
- [HomePageContent.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/home/components/HomePageContent.tsx) compone la portada
- [index.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/home/index.ts) expone solo lo público

#### `features/about/`

- contenido específico de “Quiénes somos”
- [AboutPageContent.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/about/components/AboutPageContent.tsx)
- [MembersSection.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/about/components/MembersSection.tsx)

#### `features/contact/`

- [schema.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/contact/schema.ts): fuente de verdad Zod
- [types.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/contact/types.ts): tipos derivados
- [contact.service.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/contact/services/contact.service.ts): integración de email
- [ContactForm.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/contact/components/ContactForm.tsx): client component interactivo
- [ContactPageContent.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/contact/components/ContactPageContent.tsx): composición de página

#### `features/donations/`

- [DonationForm.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/donations/components/DonationForm.tsx): formulario preparado para Stripe
- [DonatePageContent.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/donations/components/DonatePageContent.tsx)
- [types.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/donations/types.ts): tipos y helpers del dominio

### `src/shared/`

Infraestructura reutilizable entre features.

#### `shared/ui/`

UI pura sin conocimiento de negocio:

- [Button.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/ui/Button.tsx)
- [Section.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/ui/Section.tsx)
- [SectionTitle.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/ui/SectionTitle.tsx)

#### `shared/layout/`

Shell global compartido:

- [Header.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/layout/Header.tsx)
- [Footer.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/layout/Footer.tsx)
- [MobileNav.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/layout/MobileNav.tsx)

#### `shared/config/`

Configuración centralizada y tipada:

- [site.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/config/site.ts)
- [routes.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/config/routes.ts)
- [metadata.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/config/metadata.ts)

### `src/content/`

Datos editoriales estáticos. Puede evolucionar a i18n o CMS sin tocar la capa visual.

- [navigation.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/content/navigation.ts)
- [footer-content.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/content/footer-content.ts)
- [social-links.ts](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/content/social-links.ts)

### `src/styles/`

- [globals.css](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/styles/globals.css): estilos globales importados desde el root layout

## Convenciones

### Server Components por defecto

Todo componente es server por defecto salvo necesidad real de estado, efectos o APIs del navegador.

Client Components actuales:

- [MobileNav.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/shared/layout/MobileNav.tsx)
- [ContactForm.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/contact/components/ContactForm.tsx)
- [DonationForm.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/features/donations/components/DonationForm.tsx)
- [error.tsx](C:/Users/ppiza/Desktop/hablemos_claro/web/hablemos-claro-web/src/app/error.tsx)

### API pública por feature

Cada feature debe tener un `index.ts` que exponga solo su superficie pública.

Ejemplos:

- `@/features/contact`
- `@/features/donations`
- `@/features/home`
- `@/features/about`

Desde fuera de la feature deben evitarse imports profundos salvo necesidad excepcional.

### Reglas de ubicación

- Si algo es reutilizable entre dominios, va a `shared/`
- Si algo representa una capacidad de negocio o una página compuesta, va a `features/`
- Si es contenido editable/estático, va a `content/`
- Si define rutas, metadata o identidad del sitio, va a `shared/config/`

### Naming

- Componentes: `PascalCase.tsx`
- Utilidades, config, schemas y servicios: `camelCase.ts` cuando aplique
- Barrels públicos: `index.ts`

## Formularios

Patrón del contacto:

```text
schema.ts
  -> types.ts con z.infer
  -> ContactForm.tsx con react-hook-form + zodResolver
  -> POST /api/contact
  -> contact.service.ts
```

Esto evita duplicar reglas entre cliente y servidor.

## Estilo y marca

- base negra y neutros oscuros
- acento amarillo principal
- acento rojo secundario
- alto contraste y enfoque mobile-first

Estas reglas se reflejan en Tailwind y en la composición de secciones institucionales.

## Escalabilidad recomendada

Nuevas áreas deberían seguir el mismo patrón:

- `src/features/events/`
- `src/features/newsletter/`
- `src/features/news/`

Si aparecen helpers globales o tipos compartidos, se podrán añadir:

- `src/shared/lib/`
- `src/shared/types/`

sin romper la arquitectura actual.
