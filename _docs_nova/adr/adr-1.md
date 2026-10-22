---
tipo: adr
id: adr-1
estado: Aceptada
nombre: Stack tecnológico web para desarrollo.
descripcion: Tecnologías usadas para el desarrollo de la app.
vision_origen: va-nova-ticon-1
dominio: "Sistema de diseño TIC-ON"
requisitos_derivados:
  - req-1
---

## Contexto

Se requiere delimitar el stack tecnológico para el desarrollo de la aplicación.

## Decisión

Usar Vanilla JS en producción para mantener el desarrollo simple, manteniendo abierta la puerta a las librerías. Usaremos Tailwind CSS en desarrollo, junto con Vite y Bun, compilando a un proyecto sin dependencias.

Usar templates y custom elements para los componentes, usando `append` y evitando el uso de `innerHTML`.
