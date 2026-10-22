---
tipo: dominio
dominio: "Sistema de diseño TIC-ON"
estado: Delimitado
vision_origen: va-nova-ticon-1
---

# Dominio — Sistema de diseño TIC-ON

## Qué es

El conjunto de decisiones visuales y de interacción que da identidad a la propuesta web de la XI Feria TIC-ON. Es el pilar estético que compartirán todos los ADR y páginas del proyecto.

### Paleta (tokens en `desk/src/styles/main.css`)

|Token Tailwind|Valor|Uso|
|---|---|---|
|`ticon-base`|`#001c36`|Azul oscuro principal (agenda, footer, fondos de página)|
|`ticon-baselight`|`#002b52`|Azul para tarjetas oscuras y bordes|
|`ticon-green`|`#75c043`|Verde vivo: acentos, CTAs, marca|
|`ticon-darkgreen`|`#006b5f`|Botones del navbar y acciones principales|
|`ticon-lightblue`|`#00aeef`|Azul robot: tarjetas destacadas, enlaces|
|`ticon-gray`|`#e5e7eb`|Gris neutro: secciones y tarjetas claras|

La paleta se alinea con los colores del imagotipo oficial (navy `#021d42` y verdes `#76cc06`).

### Tipografías

- **`--font-display`:** Montserrat (títulos). Cargas: 400, 500, 700, 800, 900.
- **`--font-body`:** Inter (cuerpo). Cargas: 400, 500, 600.
- Cargadas por Google Fonts en el `<head>` de cada página.

### Componentes

- **Navegación (`<site-nav>`):** logo real (`imaginotipo-evento.svg`), enlaces de las 7 secciones, botón *Inscripciones* y menú móvil desplegable. Marca la página activa con `body[data-page]`. Custom element en `desk/src/components/site-nav.js`.
- **Footer (`<site-footer>`):** mascota oficial (`mascota-evento.svg`), CTA *"¡Sé parte del cambio!"*, identidad SENA y redes sociales. Custom element en `desk/src/components/site-footer.js`.
- **Utilidades:** `leaf-shape` (morfología de hojas), `text-gradient-green`, `bg-hero-pattern` (fondo del héroe).

### Assets oficiales

- `desk/assets/imaginotipo-evento.svg` — logotipo del evento.
- `desk/assets/mascota-evento.svg` — mascota oficial (robot azul).

## Qué no es

- No es un kit de componentes reutilizables fuera del contexto de la feria (no aspiran a ser una librería).
- No incluye fotografía real del evento: las galerías usan placeholders de marca (gradientes + íconos Phosphor) a la espera de fotografías oficiales.
- No es la guía de marca del SENA; es solo el sistema de diseño visual de la propuesta.