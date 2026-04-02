/**
 * Upload all original site images to Sanity and patch documents to reference them.
 * Run with: node scripts/upload-assets.mjs
 */

import { createClient } from 'next-sanity'
import { createReadStream, readFileSync, existsSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// Load .env.local manually
const raw = readFileSync(resolve(root, '.env.local'), 'utf8')
for (const line of raw.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const idx = trimmed.indexOf('=')
  if (idx === -1) continue
  const key = trimmed.slice(0, idx).trim()
  const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
  if (!process.env[key]) process.env[key] = val
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// ---------------------------------------------------------------------------
// Helper — upload a local file to Sanity assets
// ---------------------------------------------------------------------------
async function upload(relPath, label) {
  const abs = resolve(root, relPath)
  if (!existsSync(abs)) {
    console.warn(`  ⚠  File not found, skipping: ${relPath}`)
    return null
  }
  const ext = abs.split('.').pop().toLowerCase()
  const mimeMap = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', svg: 'image/svg+xml', webp: 'image/webp' }
  const contentType = mimeMap[ext] || 'image/jpeg'
  console.log(`  ↑ uploading ${label ?? relPath}`)
  const asset = await client.assets.upload('image', createReadStream(abs), {
    filename: basename(abs),
    contentType,
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// ---------------------------------------------------------------------------
// 1. Site Settings — logo
// ---------------------------------------------------------------------------
async function uploadSiteAssets() {
  console.log('\n[1/5] Site Settings — logo')
  const logo = await upload('images/temp/logo.png', 'logo')
  if (logo) {
    await client.patch('siteSettings').set({ logo }).commit()
    console.log('  ✔ siteSettings.logo patched')
  }
}

// ---------------------------------------------------------------------------
// 2. Homepage — aboutImage + certifications
// ---------------------------------------------------------------------------
async function uploadHomepageAssets() {
  console.log('\n[2/5] Homepage — aboutImage + certifications')

  const aboutImage = await upload('images/hr.jpg', 'about section image')
  if (aboutImage) {
    await client.patch('homepage').set({ aboutImage }).commit()
    console.log('  ✔ homepage.aboutImage patched')
  }

  const certDefs = [
    { name: 'AIPP', file: 'images/aipp.png', url: 'https://www.aipp.com' },
    { name: 'SETEC', file: 'images/setec.png', url: 'https://www.setec.gob.ec' },
    { name: 'ASIS', file: 'images/asis.png', url: 'https://www.asisonline.org' },
    { name: 'APA', file: 'images/apa.png', url: 'https://www.polygraph.org' },
  ]

  const certifications = []
  for (const c of certDefs) {
    const logo = await upload(c.file, `cert: ${c.name}`)
    if (logo) {
      certifications.push({
        _type: 'certificationLogo',
        _key: c.name.toLowerCase(),
        name: c.name,
        logo,
        url: c.url,
      })
    }
  }

  if (certifications.length) {
    await client.patch('homepage').set({ certifications }).commit()
    console.log(`  ✔ homepage.certifications patched (${certifications.length} logos)`)
  }
}

// ---------------------------------------------------------------------------
// 3. Service hero + card images
// ---------------------------------------------------------------------------
async function uploadServiceImages() {
  console.log('\n[3/5] Service hero images')

  const services = [
    {
      id: 'service-integrity-report',
      heroFile: 'images/temp/intreportcover.jpg',
      cardFile: 'images/temp/intreportcover.jpg',
    },
    {
      id: 'service-poligrafo',
      heroFile: 'images/temp/polygraph.jpg',
      cardFile: 'images/temp/polygraph.jpg',
    },
    {
      id: 'service-amitai',
      heroFile: 'images/temp/integritestcover.jpg',
      cardFile: 'images/temp/integritestcover.jpg',
      partnerLogoFile: 'images/temp/amitai.png',
    },
    {
      id: 'service-seguridad-vial',
      heroFile: 'images/temp/seguridadvcover.jpg',
      cardFile: 'images/temp/seguridadvcover.jpg',
    },
  ]

  for (const svc of services) {
    const patch = {}
    const heroImage = await upload(svc.heroFile, `${svc.id} heroImage`)
    if (heroImage) patch.heroImage = heroImage
    const cardImage = await upload(svc.cardFile, `${svc.id} cardImage`)
    if (cardImage) patch.cardImage = cardImage
    if (svc.partnerLogoFile) {
      const partnerLogo = await upload(svc.partnerLogoFile, `${svc.id} partnerLogo`)
      if (partnerLogo) patch.partnerLogo = partnerLogo
    }
    if (Object.keys(patch).length) {
      await client.patch(svc.id).set(patch).commit()
      console.log(`  ✔ ${svc.id} image fields patched`)
    }
  }

  // Fix Seguridad Vial training programs with correct schema field names
  console.log('\n  Fixing trainingPrograms field names for seguridad-vial...')
  await client.patch('service-seguridad-vial').set({
    trainingPrograms: [
      {
        _type: 'trainingProgram',
        _key: 'tp1',
        title: 'Prevención y Seguridad Vial Laboral',
        certification: 'SETEC',
        targetAudience: 'Conductores de vehículos livianos y carga.',
        duration: '8 horas',
        topics: [
          'Introducción a la Seguridad Vial y el Plan Mundial de la OMS',
          'Análisis de casos reales de siniestros de tránsito',
          'Fases del siniestro: percepción, decisión y conflicto',
          'La seguridad vial y su eficiencia: vía, vehículo y hombre',
          'Psicología del tránsito: personalidad, sueño, fatiga, alcohol',
          'Gestión de la seguridad en la empresa — norma ISO 39001',
        ],
      },
      {
        _type: 'trainingProgram',
        _key: 'tp2',
        title: 'Sistemas de Gestión de Seguridad Vial',
        certification: 'SETEC',
        targetAudience: 'Responsables de gestión de calidad y conductores de vehículos en las organizaciones.',
        duration: '8 horas',
        topics: [
          'Introducción y fundamentos de la prevención de riesgos viales',
          'Sistemas de gestión para la seguridad vial — ISO 39001',
          'Contexto de la organización, liderazgo y planificación',
          'Soporte, operación y evaluación de desempeño',
          'Elementos del siniestro: vía, vehículo y hombre',
          'Indicadores de gestión',
        ],
      },
      {
        _type: 'trainingProgram',
        _key: 'tp3',
        title: 'Taller de Principios de Seguridad en Carga',
        certification: 'SETEC',
        targetAudience: 'Conductores de vehículos de carga y personal de áreas de bodega, despacho y distribución.',
        duration: '8 horas',
        topics: [
          'Introducción a la Seguridad de Carga',
          'Fundamentos: propósito y cómo aplicar la técnica de seguridad',
          'Requerimientos generales: sistemas y componentes de seguridad',
          'Contención, inmovilización y seguridad de la carga',
          'Carga adecuada y protección correcta de la mercadería',
          'Uso de dispositivos de seguridad y límite de carga de trabajo',
        ],
      },
    ],
  }).commit()
  console.log('  ✔ trainingPrograms corrected')
}

// ---------------------------------------------------------------------------
// 4. Client logos — create 27 documents
// ---------------------------------------------------------------------------
async function uploadClientLogos() {
  console.log('\n[4/5] Client logos (client01.png … client27.png)')

  // Delete existing clientLogo docs first to avoid duplicates on re-run
  const existing = await client.fetch('*[_type == "clientLogo"]._id')
  for (const id of existing) {
    await client.delete(id)
  }

  for (let i = 1; i <= 27; i++) {
    const num = String(i).padStart(2, '0')
    const file = `images/client${num}.png`
    const logo = await upload(file, `client${num}`)
    if (logo) {
      await client.create({
        _type: 'clientLogo',
        name: `Cliente ${i}`,
        logo,
        order: i,
      })
    }
  }
  console.log('  ✔ 27 clientLogo documents created')
}

// ---------------------------------------------------------------------------
// 5. Hero background images on homepage
// ---------------------------------------------------------------------------
async function uploadHeroImages() {
  console.log('\n[5/5] Homepage hero slide backgrounds')

  const slides = [
    { file: 'images/temp/92-1.jpg', label: 'hero slide 1' },
    { file: 'images/temp/92-2.jpg', label: 'hero slide 2' },
    { file: 'images/temp/92-3.jpg', label: 'hero slide 3' },
  ]

  const heroImages = []
  for (const s of slides) {
    const img = await upload(s.file, s.label)
    if (img) heroImages.push(img)
  }

  if (heroImages.length) {
    // Store as backgroundImage on the hero object (first one)
    await client.patch('homepage').set({ 'hero.backgroundImage': heroImages[0] }).commit()
    console.log('  ✔ homepage.hero.backgroundImage patched')
  }
}

// ---------------------------------------------------------------------------
// Run all
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\nUploading assets to Sanity "${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}"\n`)
  await uploadSiteAssets()
  await uploadHomepageAssets()
  await uploadServiceImages()
  await uploadClientLogos()
  await uploadHeroImages()
  console.log('\n✅  All assets uploaded and documents patched.\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
