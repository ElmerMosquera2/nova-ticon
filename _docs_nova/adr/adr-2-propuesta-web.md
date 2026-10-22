---
tipo: adr
id: adr-2
estado: Aceptada
nombre: Propuesta web multi-página (MPA) con Vite y custom elements.
descripcion: Convertir la maqueta en una propuesta navegable de 8 páginas sin build, usando Vite + Tailwind v4 + componentes custom.
vision_origen: va-nova-ticon-1
dominio: "Sistema de diseño TIC-ON"
requisitos_derivados:
  - req-1
---

# [adr-2] Propuesta web multi-página (MPA)

## Contexto

`desk/index.html` era una maqueta estática de una sola página: usaba Tailwind y Phosphor por CDN, logos ficticios, imágenes de stock y texto de marca para simular secciones (robot, expositores). Se pidió convertirlo en una **propuesta real con varias páginas** que siguiera la estructura del menú (Inicio, Nosotros, Proyectos, Expositores, Agenda, Galería, Contacto, Inscripciones), garantizando que funcionara con **bun y vite** sin ejecutar un build.

La decisión de método, antes que la técnica: por ser una propuesta académica, se priorizó **simplicidad y cero fricción de arranque** sobre una arquitectura de producción completa.

## Alternativas evaluadas

1. **SPA con enrutador (React/Vue, etc.):** más costosa de mantener para una propuesta; contradice el lineamiento de `adr-1` (Vanilla JS).
2. **Sitio estático generado (SSG):** agrega un paso de build que se pidió explícitamente evitar.
3. **Una sola página con anclas:** no cumple el requerimiento de páginas separadas por sección del nav.
4. **MPA estática + componentes JS compartidos (elegida):** 8 archivos HTML en la raíz de `desk/` (Vite las sirve de serie), con navbar y footer como **custom elements** construidos con `append`/`createElement` (sin `innerHTML` para datos), tal como exige `adr-1`.

## Decisión

- **Multi-page static**: `index.html`, `nosotros.html`, `proyectos.html`, `expositores.html`, `agenda.html`, `galeria.html`, `contacto.html`, `inscripciones.html`.
- **Tailwind v4 real con Vite** vía el plugin `@tailwindcss/vite`: los tokens viven en `desk/src/styles/main.css` (`@theme`), sin CDN ni build manual; `bun run dev` basta.
- **Phosphor Icons** por CDN (`unpkg`) para las 8 páginas.
- **Componentes compartidos** como custom elements en modo *light DOM* (para que las clases de Tailwind apliquen globalmente):
  - `src/components/site-nav.js` → `<site-nav>`: logo oficial, enlaces con estado activo según `body[data-page]`, menú móvil.
  - `src/components/site-footer.js` → `<site-footer>`: CTA, mascota oficial, identidad y redes.
  - `src/lib/dom.js`: helper `el(tag, props, children)` construido con `createElement`/`setAttribute`/`append`.
- **Assets oficiales** del evento (`imaginotipo-evento.svg`, `mascota-evento.svg`) reemplazan logos ficticios e imágenes de Unsplash.
- **Interactividad local** en páginas puntuales (`proyectos`, `agenda`, `galeria`, `inscripciones`) en Vanilla JS inline, sin frameworks.
- **`vite.config.js`** declara las 8 entradas en `build.rollupOptions.input` para dejar preparado un eventual build, aunque hoy no se ejecute.

## Consecuencias

- Cambiar un texto del navbar o el footer se hace **una vez** en el componente y se refleja en las 8 páginas.
- La página activa se deriva de un atributo en `<body>`; agregar una sección nueva requiere tocar el componente y el atributo.
- El sitio depende de CDN (Google Fonts, Phosphor). Para producción cabría descargarlos localmente (ADR futuro).
- No genera artefactos de build de momento; el día que se haga `vite build`, `vite.config.js` ya está listo.