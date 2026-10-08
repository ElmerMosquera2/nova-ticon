import { el } from '../lib/dom.js'
import mascotaUrl from '../../assets/mascota-evento.svg'

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
          href: 'inscripciones.html',
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

customElements.define('site-footer', SiteFooter)