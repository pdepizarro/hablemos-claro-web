# Auditoría de refactorización

Fecha: 2026-07-11
Proyecto: Hablemos Claro Web
Alcance de esta fase: auditoría integral del estado actual antes de migrar a Next.js + React + TypeScript + Tailwind CSS.

## 1. Resumen del estado actual

El proyecto actual es una web multipágina estática basada en plantilla Colorlib, con personalizaciones para la identidad de Hablemos Claro. Está construido con HTML + CSS + JavaScript (jQuery y plugins), y mantiene el funcionamiento básico de navegación informativa, formulario de contacto y sección de donación.

Fortalezas actuales:
- Identidad visual parcialmente adaptada mediante tema propio en css/hablemos-claro.css.
- Contenido institucional principal ya en castellano (inicio, manifiesto, contacto).
- Navegación principal simple y clara (Inicio, Quienes somos, Contacto, Compra libertad).
- Base de recursos visuales ya disponible (logos, fondos, iconografía, fotos).

Debilidades críticas:
- Alta duplicación estructural (cabecera y footer repetidos por página).
- Dependencia fuerte de jQuery/plugins legacy y carga global indiscriminada.
- Deuda técnica de accesibilidad, SEO y semántica.
- Endpoint PHP de contacto inseguro y sin robustez.
- Presencia de páginas de plantilla sin adaptar (cause_details.html, elements.html, main.html).

Conclusión de estado:
- Base apta para migración progresiva.
- No apta para escalar funcionalmente sin refactor arquitectónico.

## 2. Inventario de páginas

Páginas en raíz:
- index.html: página de inicio con hero, manifiesto resumido, voluntariado, CTA de donación, footer.
- About.html: manifiesto ampliado + socios principales.
- contact.html: formulario de contacto y datos de contacto.
- Cause.html: bloque aislado de donación (sin integración real de pago).
- cause_details.html: plantilla heredada en inglés (Charifit), no alineada con la asociación.
- elements.html: página de demostración de componentes de plantilla, no orientada a producción.
- main.html: nota de licencia/agradecimiento Colorlib.
- readme.txt: instrucciones/licencia del template.

Otros activos relevantes:
- contact_process.php: procesamiento del formulario de contacto.
- charity-doc/: documentación original del template (no funcional para la web pública).

Rutas de navegación activas observadas:
- Inicio -> index.html
- Quienes somos -> About.html
- Contacto -> contact.html
- Compra libertad -> Cause.html

## 3. Inventario de funcionalidades

Funcionalidades visibles y su estado:
- Navegación superior y móvil con sticky header: funcional.
- Menú móvil (slicknav): funcional, con dependencias legacy.
- Hero con CTA: funcional.
- Secciones informativas: funcional.
- Video modal (YouTube): funcional (magnific popup).
- Formulario de contacto: funcional en front, backend inseguro.
- Formulario de donación: intención funcional, sin pasarela real conectada.
- Botón scroll top: funcional.
- Animaciones de entrada/scroll: funcionales mediante wow.js.

Funcionalidades en código pero no claramente usadas en la web real:
- Isotope/imagesLoaded.
- nice-select.
- gijgo.
- MailChimp script (mail-script.js) con endpoint no existente (mail.php).

## 4. Inventario de componentes visuales

Componentes/zonas repetidas:
- Header completo (topbar + nav + CTA).
- Footer completo (4 columnas + copyright).
- Bloque de enlaces sociales.
- Estilo de títulos de sección y tarjetas.
- Patrón visual de donación (selector de importe + CTA).

Componentes específicos actuales:
- Hero principal (index).
- Tarjetas manifiesto en inicio.
- Tarjetas de socios en About.
- Formulario de contacto en contact.
- Módulo donación en index/Cause.

Recursos de marca actuales a preservar:
- img/components/logo_hablemos_claro.png
- img/components/hablemos_claro_topbar_bg.png
- Paleta en css/hablemos-claro.css (negro + acentos amarillo/rojo)

## 5. Problemas detectados

### 5.1 Arquitectura y mantenibilidad
- Ausencia de sistema de componentes: repetición manual de estructura en múltiples HTML.
- Carga de librerías globales en páginas que no usan todas las funcionalidades.
- Mezcla de responsabilidades (presentación, contenido, interacción y configuración acopladas en archivos planos).
- Naming heredado de plantilla y errores tipográficos (ejemplo: volenteer).

### 5.2 Accesibilidad (WCAG 2.2 AA)
- Imágenes significativas con alt vacío en múltiples páginas.
- Jerarquía de headings inconsistente y ausencia de h1 en páginas principales.
- Inputs de contacto sin label explícito, dependencia de placeholder.
- Manejo de placeholder con eventos onfocus/onblur poco accesible.
- Páginas con lang="zxx" en lugar de idioma real.

### 5.3 SEO técnico
- Meta description vacía en páginas relevantes.
- Títulos y contenidos heredados de plantilla en páginas no adaptadas.
- Sin metadatos Open Graph/Twitter.
- Sin sitemap ni robots.
- Sin datos estructurados JSON-LD.

### 5.4 Rendimiento
- Dependencias front legacy de alto peso y parte no utilizada.
- jQuery 1.12.4 obsoleto.
- Duplicación de import de Google Fonts en css/style.css.
- Muchas peticiones CSS/JS en todas las páginas independientemente del uso real.

### 5.5 Seguridad y privacidad
- contact_process.php con entrada no validada/sanitizada y cabeceras de correo susceptibles a inyección.
- Falta de protección anti abuso (rate limiting, honeypot, captcha o similares).
- Enlaces externos con target="_blank" sin rel="noopener noreferrer".
- URLs placeholder con href="#" en redes/acciones.

### 5.6 Integridad funcional
- Donación sin conexión a Stripe real (CTA y formulario sin flujo completo).
- Referencias a endpoint mail.php en js/mail-script.js no presente en repo.
- Reglas de validación de contacto piden campo number que no existe en el formulario actual.

## 6. Riesgos de la migración

Riesgos técnicos:
- Migrar todo de golpe puede romper comportamiento visual y responsive.
- Sustituir plugins jQuery por React sin pruebas incrementa regresiones UI.
- Reubicar assets puede romper rutas si no se planifica mapa de equivalencias.
- Cambios de semántica y accesibilidad pueden alterar estilos esperados si no se desacopla bien presentación.

Riesgos de contenido/comunicación:
- Al limpiar textos heredados, riesgo de modificar matices del mensaje institucional.
- Riesgo de perder contenido de páginas secundarias no claramente enlazadas.

Riesgos operativos:
- Falta de backend moderno para contacto/donación en primera iteración.
- Dependencia de validación manual del cliente para enlaces sociales y legales definitivos.

Estrategia de mitigación:
- Migración por fases con paridad funcional por página.
- Criterio de conservación por defecto: no eliminar sin trazabilidad en informe de migración.
- Pruebas incrementales y checklist de regresión por fase.

## 7. Elementos que deben conservarse

Elementos funcionales y de producto:
- Todas las rutas/páginas hoy publicadas (o sus equivalentes explícitos en nuevas rutas).
- Estructura de navegación principal y CTA Compra libertad.
- Formulario de contacto (reimplementado de forma segura, manteniendo intención y campos clave).
- Sección de voluntariado, manifiesto y socios principales.
- Footer con bloques de navegación, contacto y redes.

Elementos de identidad visual:
- Base negra y acentos inspirados en bandera de España.
- Logo y activos gráficos de marca.
- Jerarquía visual general de secciones y CTAs.

Elementos de comportamiento:
- Header sticky.
- Menú móvil.
- Apertura de video/modal (si se mantiene la sección).
- Responsive en breakpoints móviles/tablet/escritorio.

## 8. Elementos que deben reformularse

Arquitectura:
- HTML multipágina con duplicación manual -> App Router con layout compartido y componentes reutilizables.

Interactividad:
- jQuery/plugins legacy -> React + TypeScript con componentes cliente solo donde sea necesario.

Estilos:
- CSS global disperso -> Tailwind con tokens en configuración y utilidades consistentes.

Calidad técnica:
- JS no tipado -> TypeScript estricto sin any.
- Formulario con validación legacy -> React Hook Form + Zod (siempre con separación esquema/tipos/UI/servicio).

SEO/Accesibilidad:
- Metadatos básicos/ausentes -> metadata global y por ruta en Next.js.
- Semántica y labels incompletos -> estructura semántica correcta y formularios accesibles.

Seguridad:
- PHP de contacto inseguro -> route handler en Next.js con validación robusta, sanitización y protección anti abuso.

## 9. Propuesta de arquitectura (adaptada al caso real)

Estructura objetivo propuesta:

src/
  app/
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
    error.tsx
    about/page.tsx
    contact/page.tsx
    donate/page.tsx
  components/
    layout/
      Header.tsx
      Footer.tsx
      Navigation.tsx
      MobileNavigation.tsx
    sections/
      HeroSection.tsx
      ManifestoPreviewSection.tsx
      VolunteerSection.tsx
      DonationSection.tsx
      MembersSection.tsx
      ContactSection.tsx
    ui/
      Button.tsx
      Container.tsx
      Section.tsx
      Heading.tsx
      Card.tsx
      FormField.tsx
  features/
    contact/
      components/ContactForm.tsx
      schemas/contact.schema.ts
      services/contact.service.ts
      types/contact.types.ts
    donations/
      components/DonationForm.tsx
      services/donations.service.ts
      types/donations.types.ts
  content/
    navigation.ts
    site-content.ts
    social-links.ts
    legal-content.ts
  config/
    site.ts
    routes.ts
    metadata.ts
  lib/
    seo/
    utils/
    validation/
  types/
  assets/ (si aplica)

public/
  img/ (migrado y depurado)
  icons/
  manifest.webmanifest

Criterios clave:
- Server Components por defecto.
- Client Components solo para menú móvil, formularios, modales/carruseles y estados de UI.
- Separar contenido editable de la capa de presentación cuando aporte mantenibilidad.
- Evitar sobrearquitectura: solo carpetas que tengan responsabilidad real.

## 10. Plan de migración por fases

Fase 1. Auditoría (completada)
- Resultado: este documento.
- Validación: inventario confirmado de HTML/CSS/JS/PHP y recursos.

Fase 2. Inicialización de proyecto Next.js + TypeScript + Tailwind
- Crear nuevo esqueleto en el mismo repo.
- Configurar strict true, alias de imports, ESLint y Prettier.
- Definir scripts dev/build/lint/typecheck/test.

Fase 3. Base de arquitectura y layout global
- Implementar app/layout.tsx, estructura semántica base, skip link y metadata global.
- Crear Header/Footer reutilizables y navegación con paridad de enlaces actuales.

Fase 4. Tokens de diseño y sistema UI mínimo
- Mapear paleta actual a tokens de Tailwind.
- Definir tipografías, contenedores, espaciados, radios, sombras y estados de foco.
- Migrar estilos críticos de css/hablemos-claro.css al nuevo sistema.

Fase 5. Migración incremental de páginas
- page.tsx (inicio) con secciones equivalentes.
- about/page.tsx.
- contact/page.tsx.
- donate/page.tsx (equivalente funcional de Cause.html).
- Decisión documentada para cause_details.html y elements.html: conservar como legado fuera de navegación o retirar en fase de limpieza con trazabilidad.

Fase 6. Formularios y capa de servicio
- Rehacer formulario de contacto tipado con validación y mensajes accesibles.
- Implementar endpoint en app/api/contact/route.ts.
- Sustituir lógica jQuery por flujo moderno con estados loading/success/error.

Fase 7. SEO, accesibilidad y rendimiento
- Metadata por página, OG/Twitter, robots y sitemap.
- Revisión de headings, landmarks, labels, contrastes, foco y reduced motion.
- Migración de imágenes a next/image cuando proceda y reducción de JS cliente.

Fase 8. Testing base
- Unit/integration con Vitest + React Testing Library para navegación y formulario.
- E2E básico (Playwright) para rutas principales y flujo de contacto.

Fase 9. Limpieza de legado
- Eliminar dependencias y archivos sin uso comprobado.
- Documentar qué se elimina/renombra y por qué.

Fase 10. Documentación final
- README.md actualizado.
- docs/architecture.md.
- docs/migration-report.md.

---

## Anexo A. Dependencias legacy detectadas (resumen)

CSS cargado globalmente:
- bootstrap.min.css
- owl.carousel.min.css
- magnific-popup.css
- font-awesome.min.css
- themify-icons.css
- nice-select.css
- flaticon.css
- gijgo.css
- animate.css
- slicknav.css
- style.css
- hablemos-claro.css

JS cargado globalmente:
- modernizr-3.5.0.min.js
- jquery-1.12.4.min.js
- popper.min.js
- bootstrap.min.js
- owl.carousel.min.js
- isotope.pkgd.min.js
- ajax-form.js
- waypoints.min.js
- jquery.counterup.min.js
- imagesloaded.pkgd.min.js
- scrollIt.js
- jquery.scrollUp.min.js
- wow.min.js
- nice-select.min.js
- jquery.slicknav.min.js
- jquery.magnific-popup.min.js
- plugins.js
- gijgo.min.js
- contact.js
- jquery.ajaxchimp.min.js
- jquery.form.js
- jquery.validate.min.js
- mail-script.js
- main.js

## Anexo B. Decisiones conservadoras para la migración

- Mantener copy institucional principal y tono actual, corrigiendo solo ortografía/claridad sin cambiar mensaje.
- Mantener rutas equivalentes para evitar pérdida de tráfico/enlaces.
- No introducir backend complejo ni autenticación en esta fase.
- Preparar puntos de extensión para eventos/noticias/donaciones sin implementar módulos muertos.

## Anexo C. Estado de ejecución de la migración

Estado actual:
- Fase 1 (auditoría): completada.
- Fase 2 (bootstrap técnico): iniciada y aplicada por archivos.

Implementado en Fase 2:
- package.json con scripts dev/build/start/lint/typecheck/test.
- Configuración TypeScript estricta.
- Configuración inicial de Next.js App Router.
- Configuración inicial de Tailwind y PostCSS.
- Configuración ESLint y Prettier.
- Estructura base src/app con layout, page, not-found y error.
- Configuración inicial de metadatos y rutas en src/config.

Limitación de entorno detectada:
- El entorno actual no dispone de Node.js/npm/pnpm/yarn en terminal.
- Por este motivo no fue posible ejecutar npm install, npm run dev, npm run build, npm run lint ni npm run typecheck en esta máquina durante este bloque.

Validación pendiente al instalar Node:
1. npm install
2. npm run typecheck
3. npm run lint
4. npm run build
5. npm run dev
