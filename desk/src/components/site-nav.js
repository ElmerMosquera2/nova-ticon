import { el } from '../lib/dom.js'
import logoUrl from '../../assets/imaginotipo-evento.svg'

const LINKS = [
  { page: 'inicio', label: 'Inicio', href: 'index.html' },
  { page: 'nosotros', label: 'Nosotros', href: 'nosotros.html' },
  { page: 'proyectos', label: 'Proyectos', href: 'proyectos.html' },
  { page: 'expositores', label: 'Expositores', href: 'expositores.html' },
  { page: 'agenda', label: 'Agenda', href: 'agenda.html' },
  { page: 'galeria', label: 'Galería', href: 'galeria.html' },
  { page: 'contacto', label: 'Contacto', href: 'contacto.html' },
]

function navLink(item, active) {
  const classes = active
    ? 'border-b-2 border-ticon-green pb-1'
    : 'hover:text-ticon-green transition'
  return el(
    'a',
    { href: item.href, class: `font-medium text-sm text-ticon-base ${classes}` },
    item.label,
  )
}

function inscriptionButton() {
  return el(
    'a',
    {
      href: 'inscripciones.html',
      class:
        'hidden md:flex items-center gap-2 bg-ticon-darkgreen text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition shadow-lg',
    },
    el('i', { class: 'ph-fill ph-user-circle text-xl' }),
    'Inscripciones',
  )
}

class SiteNav extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount) return
    const activePage = document.body.dataset.page || 'inicio'
    let open = false

    const desktopLinks = LINKS.map((item) =>
      navLink(item, item.page === activePage),
    )

    const mobileLinks = LINKS.map((item) =>
      el(
        'a',
        {
          href: item.href,
          class: `block px-4 py-2 rounded-lg text-sm font-medium ${
            item.page === activePage ? 'text-ticon-green' : 'text-white'
          } hover:bg-ticon-baselight transition`,
        },
        item.label,
      ),
    )

    const mobileMenu = el(
      'div',
      {
        class: 'md:hidden hidden flex-col gap-1 px-6 pb-6 bg-ticon-base',
        dataset: { menu: '' },
      },
      ...mobileLinks,
      el(
        'a',
        {
          href: 'inscripciones.html',
          class:
            'mt-3 flex items-center justify-center gap-2 bg-ticon-green text-ticon-base px-6 py-2 rounded-full font-medium transition',
        },
        el('i', { class: 'ph-fill ph-user-circle text-xl' }),
        'Inscripciones',
      ),
    )

    const toggle = el(
      'button',
      {
        type: 'button',
        class:
          'md:hidden text-ticon-base text-2xl p-2 rounded-lg hover:bg-ticon-gray transition',
        'aria-label': 'Abrir menú',
        onClick: () => {
          open = !open
          toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú')
          mobileMenu.classList.toggle('hidden', !open)
          mobileMenu.classList.toggle('flex', open)
        },
      },
      el('i', { class: 'ph-fill ph-list' }),
    )

    const nav = el(
      'nav',
      {
        class:
          'container mx-auto px-6 py-4 flex items-center justify-between relative z-50',
      },
      el(
        'a',
        { href: 'index.html', class: 'block shrink-0', 'aria-label': 'Inicio — XI Feria TIC-ON' },
        el('img', { src: logoUrl, alt: 'XI Feria TIC-ON', class: 'h-12 lg:h-14 w-auto' }),
      ),
      el('div', { class: 'hidden md:flex space-x-8' }, ...desktopLinks),
      inscriptionButton(),
      toggle,
    )

    this.append(nav, mobileMenu)
  }
}

customElements.define('site-nav', SiteNav)