import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Integrity Solutions',
    short_name: 'Integrity Solutions',
    description:
      'Evaluación de integridad del talento humano en Ecuador. Polígrafo, Integrity Report, AMITAI y Seguridad Vial.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#032D51',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
