---
tipo: requisito
id: req-1
estado: En Progreso
prioridad: Alta
origen: adr-2
responsable: "@equipo"
---

# [req-1] Páginas de la propuesta web de la XI Feria TIC-ON

## 🎯 1. El "Por Qué"

La maqueta de una sola página no permitía evaluar la **navegación completa** de la propuesta. Para presentar la feria como un sitio de verdad era necesario convertir cada sección del menú en una página propia, navegable entre sí, reutilizando la identidad visual y los componentes.
Es necesario **ahora** porque la propuesta se presenta próximamente y debe verse y sentirse completa sin depender de un build.

## 👥 2. Actores y Alcance

- **Comité organizador / aprendiz presentador:** navega la propuesta para validar secciones y contenidos.
- **Visitante de la feria:** conoce agenda, proyectos, expositores y se inscribe.
- **Fuera del alcance:** back-end de inscripciones, autenticación, CMS, fotografía real del evento, SEO de producción y despliegue.

## 📋 3. Criterios de Aceptación

- [x] `bun run dev` sirve las 8 páginas sin ejecutar build (verificado: HTTP 200 en cada ruta).
- [x] Navbar y footer compartidos mediante custom elements (`<site-nav>`, `<site-footer>`).
- [x] El navbar marca como activa la página actual (`body[data-page]`).
- [x] Menú móvil desplegable en el navbar.
- [x] `Inicio`: héroe con mascota oficial, características, resumen de agenda y expositores.
- [x] `Nosotros`: misión, visión, valores e historia.
- [x] `Proyectos`: grid con filtros por categoría.
- [x] `Expositores`: listado de categorías de aliados y CTA para ser expositor.
- [x] `Agenda`: cronograma por día (12–15 mayo) con selector de días.
- [x] `Galería`: grid con lightbox y placeholders de marca.
- [x] `Contacto`: formulario + datos de contacto + redes.
- [x] `Inscripciones`: formulario con confirmación de demostración.
- [x] Los assets oficiales (imaginotipo y mascota) reemplazan los placeholders; sin imágenes de Unsplash.
- [x] Los tokens de color/tipografía se definen en `desk/src/styles/main.css` (`@theme` de Tailwind v4).
- [ ] PR/envío fusionado y aprobado por el equipo (DoD).

## 🔗 4. Trazabilidad

*   **Origen:** [[adr-2-propuesta-web]]
*   **Decisiones relacionadas:** [[adr-1]]
*   **Dominio:** [[concepto-desing]]
*   **Implementación:** `desk/index.html` y páginas hermanas; componentes en `desk/src/components/`.