import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const pages = [
  'index',
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
      input: Object.fromEntries(
        pages.map((name) => [name, resolve(import.meta.dirname, `${name}.html`)]),
      ),
    },
  },
})