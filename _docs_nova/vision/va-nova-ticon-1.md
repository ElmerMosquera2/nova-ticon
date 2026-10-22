---
tipo: vision
id: va-nova-ticon-1
estado: Activa
naturaleza: "Propuesta académica — Feria SENA"
---

# [va-nova-ticon-1] Propuesta web de la XI Feria TIC-ON

## Qué es

Un sitio web de **propuesta** para la **XI Feria TIC-ON del SENA** bajo el lema *"Sembrando semillas de innovación"*. Convierte la maqueta estática (`desk/index.html`) en una experiencia navegable de **8 páginas** que sigue la estructura del menú de navegación: Inicio, Nosotros, Proyectos, Expositores, Agenda, Galería, Contacto e Inscripciones.

Es la capa de difusión del evento: presenta agenda, proyectos, expositores, información institucional y un formulario de inscripción como propuesta visual y funcional.

## Cómo se usa

- **Vista previa local (sin build):** `bun install` y luego `bun run dev` desde `desk/`. El servidor de Vite atiende cada página (http://localhost:5173).
- **Componentes compartidos:** el navbar (`<site-nav>`) y el footer (`<site-footer>`) son custom elements en `desk/src/components/`; se editan una sola vez y se reflejan en las 8 páginas.
- **Sistema de diseño:** los tokens de color y tipografía viven en `desk/src/styles/main.css` y se documentan en el dominio `concepto-desing`.

## Qué no es

- No es el sitio de producción final del evento ni tiene integración con un servidor de inscripciones (los formularios son de demostración).
- No usa imágenes de stock externas ni marcas ficticias: usa los assets oficiales del evento (`imaginotipo-evento.svg`, `mascota-evento.svg`).
- No genera artefactos de build (decisión explícita, ver [[adr-2-propuesta-web]]).

## Alternativas cercanas

- **Single Page Application (SPA con enrutador):** más costosa de mantener para una propuesta; se descartó por simplicidad (ver [[adr-1]] y [[adr-2-propuesta-web]]).
- **Sitio estático generado (SSG):** implica un paso de build que por ahora se evita.