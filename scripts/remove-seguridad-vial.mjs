/**
 * One-shot script: removes Seguridad Vial from Sanity and cleans up
 * references in homepage and siteSettings documents.
 * Run with: node scripts/remove-seguridad-vial.mjs
 */

import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnv(path) {
  const raw = readFileSync(path, 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnv(resolve(root, '.env.local'))

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function main() {
  console.log('\nRemoving Seguridad Vial from Sanity...\n')

  // 1. Delete the service document
  const existing = await client.fetch(`*[_id == "service-seguridad-vial"][0]._id`)
  if (existing) {
    await client.delete('service-seguridad-vial')
    console.log('  ✔ Deleted service-seguridad-vial')
  } else {
    console.log('  — service-seguridad-vial not found (already deleted?)')
  }

  // 2. Patch homepage: remove seguridad vial mentions from subheading/SEO
  await client
    .patch('homepage')
    .set({
      servicesSubheading: 'Proveemos servicios de verificación de la integridad del talento humano.',
      'seo.metaDescription':
        'Empresa ecuatoriana líder en evaluación de integridad laboral. Ofrecemos polígrafo, verificación de antecedentes y test AMITAI® Honestidad en Quito y Guayaquil.',
    })
    .commit()
  console.log('  ✔ Patched homepage (servicesSubheading + SEO)')

  // 3. Patch siteSettings SEO description
  await client
    .patch('siteSettings')
    .set({
      'seo.metaDescription':
        'Empresa ecuatoriana experta en evaluación de integridad del talento humano. Polígrafo, Integrity Report y AMITAI® Honestidad en Quito y Guayaquil.',
    })
    .commit()
  console.log('  ✔ Patched siteSettings SEO')

  console.log('\n✅  Done!\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
