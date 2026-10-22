import '../estilos/main.css'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import logoUrl from '../assets/imaginotipo-evento.svg'
import mascotaUrl from '../assets/mascota-evento.svg'

const firebaseConfig = {
  apiKey: 'AIzaSyCIdbrfs2nN_ua_X0rJT82iwTnWipHQ4-w',
  authDomain: 'nova-ticon.firebaseapp.com',
  projectId: 'nova-ticon',
  storageBucket: 'nova-ticon.firebasestorage.app',
  messagingSenderId: '919194102209',
  appId: '1:919194102209:web:79145b74101d2a93e8e740',
  measurementId: 'G-1GDR093ZG0',
}

export const app = initializeApp(firebaseConfig)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export const NAMESPACE = 'http://www.w3.org/2000/svg'

export function el(tag, props = {}, ...children) {
  const node =
    tag === 'svg' || tag === 'path' || tag === 'use' || tag === 'circle'
      ? document.createElementNS(NAMESPACE, tag)
      : document.createElement(tag)

  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue
    if (key === 'class') node.className = value
    else if (key === 'dataset') Object.assign(node.dataset, value)
    else if (key === 'text') node.textContent = value
    else if (key === 'style' && typeof value === 'object') {
      Object.assign(node.style, value)
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2), value)
    } else if (key === 'svg') node.setAttribute(value, true)
    else node.setAttribute(key, value)
  }

  for (const child of children.flat()) {
    if (child == null || child === false) continue
    node.append(
      typeof child === 'string' ? document.createTextNode(child) : child,
    )
  }

  return node
}

function resolvePageHref(pageFile) {
  const inPagues = window.location.pathname.includes('/pagues/')
  if (pageFile === 'index.html') {
    return inPagues ? '../index.html' : 'index.html'
  }
  return inPagues ? pageFile : `pagues/${pageFile}`
}

const LINKS = [
  { page: 'inicio', label: 'Inicio', file: 'index.html' },
  { page: 'nosotros', label: 'Nosotros', file: 'nosotros.html' },
  { page: 'proyectos', label: 'Proyectos', file: 'proyectos.html' },
  { page: 'expositores', label: 'Expositores', file: 'expositores.html' },
  { page: 'agenda', label: 'Agenda', file: 'agenda.html' },
  { page: 'galeria', label: 'Galería', file: 'galeria.html' },
  { page: 'contacto', label: 'Contacto', file: 'contacto.html' },
]

function navLink(item, active) {
  const classes = active
    ? 'border-b-2 border-ticon-green pb-1'
    : 'hover:text-ticon-green transition'
  return el(
    'a',
    {
      href: resolvePageHref(item.file),
      class: `font-medium text-sm text-ticon-base ${classes}`,
    },
    item.label,
  )
}

function inscriptionButton() {
  return el(
    'a',
    {
      href: resolvePageHref('inscripciones.html'),
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
          href: resolvePageHref(item.file),
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
          href: resolvePageHref('inscripciones.html'),
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
        {
          href: resolvePageHref('index.html'),
          class: 'block shrink-0',
          'aria-label': 'Inicio — XI Feria TIC-ON',
        },
        el('img', {
          src: logoUrl,
          alt: 'XI Feria TIC-ON',
          class: 'h-12 lg:h-14 w-auto',
        }),
      ),
      el('div', { class: 'hidden md:flex space-x-8' }, ...desktopLinks),
      inscriptionButton(),
      toggle,
    )

    this.append(nav, mobileMenu)
  }
}

const SOCIALS = [
  { label: 'Facebook', icon: 'ph-fill ph-facebook-logo' },
  { label: 'Instagram', icon: 'ph-fill ph-instagram-logo' },
  { label: 'YouTube', icon: 'ph-fill ph-youtube-logo' },
  { label: 'X', icon: 'ph-bold ph-x' },
]

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount) return

    const cta = el(
      'div',
      {
        class:
          'w-full md:w-1/3 p-8 -mt-16 md:mt-0 relative z-10 bg-white rounded-3xl md:rounded-none md:bg-transparent shadow-2xl md:shadow-none mx-4 md:mx-0 text-center md:text-left',
      },
      el(
        'h3',
        {
          class:
            'text-2xl font-bold font-display text-ticon-darkgreen md:text-ticon-green mb-2',
        },
        '¡Sé parte del cambio!',
      ),
      el(
        'p',
        { class: 'text-sm text-gray-600 md:text-gray-300 mb-6' },
        'La XI Feria ',
        el('span', { class: 'font-bold' }, 'TIC-ON'),
        ' es el punto de encuentro donde la tecnología, la educación y la sostenibilidad se unen para sembrar semillas de innovación.',
      ),
      el(
        'a',
        {
          href: resolvePageHref('inscripciones.html'),
          class:
            'inline-flex items-center justify-center gap-2 bg-ticon-darkgreen md:bg-ticon-green text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition',
        },
        el('i', { class: 'ph-bold ph-chat-teardrop-text' }),
        'Inscríbete ahora',
      ),
    )

    const identity = el(
      'div',
      {
        class:
          'w-full md:w-1/3 p-8 flex flex-col items-center md:items-end justify-center text-white',
      },
      el(
        'div',
        { class: 'flex items-center gap-6 mb-6' },
        el(
          'div',
          { class: 'text-4xl font-black tracking-tighter font-display' },
          'SENA',
        ),
        el('div', { class: 'border-l border-gray-600 h-10' }),
        el(
          'div',
          { class: 'flex gap-3' },
          SOCIALS.map((s) =>
            el(
              'a',
              {
                href: '#',
                'aria-label': s.label,
                class:
                  'w-8 h-8 rounded-full bg-white text-ticon-base flex items-center justify-center hover:bg-ticon-green hover:text-white transition',
              },
              el('i', { class: s.icon }),
            ),
          ),
        ),
      ),
      el(
        'div',
        { class: 'text-xs text-gray-400 text-center md:text-right' },
        'XI Feria TIC-ON 2025 | Sembrando semillas de innovación',
      ),
    )

    const mascot = el(
      'div',
      {
        class:
          'w-full md:w-1/3 h-64 flex items-center justify-center overflow-hidden relative',
      },
      el('div', {
        class:
          'absolute w-40 h-40 bg-ticon-green opacity-30 leaf-shape transform -rotate-45',
      }),
      el('div', {
        class:
          'absolute w-24 h-24 bg-ticon-lightblue opacity-20 leaf-shape transform rotate-12 bottom-4 right-8',
      }),
      el('img', {
        src: mascotaUrl,
        alt: 'Mascota oficial de la XI Feria TIC-ON',
        class: 'relative z-10 h-56 md:h-64 w-auto object-contain',
      }),
    )

    const footer = el(
      'footer',
      {
        class:
          'bg-ticon-base border-t border-ticon-baselight overflow-hidden relative',
      },
      el(
        'div',
        { class: 'container mx-auto' },
        el(
          'div',
          { class: 'flex flex-col md:flex-row items-center' },
          mascot,
          cta,
          identity,
        ),
      ),
    )

    this.append(footer)
  }
}

customElements.define('site-nav', SiteNav)
customElements.define('site-footer', SiteFooter)
