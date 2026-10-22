import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const subpages = [
  'nosotros',
  'proyectos',
  'expositores',
  'agenda',
  'galeria',
  'contacto',
  'inscripciones',
]

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        ...Object.fromEntries(
          subpages.map((name) => [
            name,
            resolve(import.meta.dirname, `pagues/${name}.html`),
          ]),
        ),
      },
    },
  },
})
