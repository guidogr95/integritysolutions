/**
 * Seed script — populates Sanity with content extracted from the original HTML files.
 * Run with: node scripts/seed-content.mjs
 */

import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// Load env without requiring dotenv package
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function benefit(title) {
  return { _type: 'benefit', _key: Math.random().toString(36).slice(2), title }
}

function trainingProgram({ title, audience, objective, benefits, topics, duration }) {
  return {
    _type: 'trainingProgram',
    _key: Math.random().toString(36).slice(2),
    title,
    audience,
    objective,
    benefits,
    topics,
    duration,
  }
}

async function upsert(doc) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id })
  if (existing) {
    console.log(`  ↻ updating  ${doc._type} "${doc._id}"`)
    return client.createOrReplace(doc)
  }
  console.log(`  ✚ creating  ${doc._type} "${doc._id}"`)
  return client.create(doc)
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

const documents = [

  // -------------------------------------------------------------------------
  // Site Settings
  // -------------------------------------------------------------------------
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'Integrity Solutions',
    companyFoundedYear: 2013,
    email: 'info@integritysolutions.ec',
    whatsappNumber: '593995527670',
    offices: [
      {
        _type: 'officeLocation',
        _key: 'quito',
        city: 'Quito',
        addressLine1: 'Edificio AXIOS, Oficina 904',
        addressLine2: 'Av. De los Shyris N41-151 e Isla Floreana',
        phones: ['+593 995 527 670', '+593 995 527 732', '(02) 513 3970'],
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15959.205069172745!2d-78.479449!3d-0.1675183!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xac28efccab48eeaa!2sIntegrity+Solutions+Ecuador!5e0!3m2!1sen!2sec!4v1566288735373!5m2!1sen!2sec',
      },
      {
        _type: 'officeLocation',
        _key: 'guayaquil',
        city: 'Guayaquil',
        addressLine1: 'Av. Francisco de Orellana MZ 101 Solar 2',
        addressLine2: 'y Av. Agustín Freire',
        phones: ['+593 995 527 670'],
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.017800971279!2d-79.90222068524486!3d-2.14687009843509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDgnNDguNyJTIDc5wrA1NCcwMC4xIlc!5e0!3m2!1ses!2sec!4v1567113715973!5m2!1ses!2sec',
      },
    ],
    socialLinks: [
      {
        _type: 'socialLink',
        _key: 'facebook',
        platform: 'Facebook',
        url: 'https://www.facebook.com/IntegritySolutionsEC',
      },
      {
        _type: 'socialLink',
        _key: 'linkedin',
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/company/integrity-solutions-ec/',
      },
    ],
    reportsAccessUrl: 'https://1drv.ms/u/s!Ai5jre2Bpevggd8OGVjEs7Eawx_JHg?e=44gcpJ',
    seo: {
      _type: 'seo',
      metaTitle: 'Integrity Solutions Ecuador | Integridad del Talento Humano',
      metaDescription:
        'Empresa ecuatoriana experta en evaluación de integridad del talento humano. Polígrafo, Integrity Report, AMITAI® Honestidad y Seguridad Vial en Quito y Guayaquil.',
    },
  },

  // -------------------------------------------------------------------------
  // Homepage
  // -------------------------------------------------------------------------
  {
    _id: 'homepage',
    _type: 'homepage',
    hero: {
      _type: 'hero',
      heading: 'Expertos en Integridad del Talento Humano',
      subheading:
        'INTEGRITY SOLUTIONS® es una empresa ecuatoriana fundada hace más de una década con la finalidad de satisfacer la demanda de la evaluación de integridad del talento humano.',
      ctaLabel: 'Conocer más',
      ctaHref: '#servicios',
    },
    aboutHeading: 'Expertos en Integridad',
    aboutText:
      'Desde hace más de 11 años, estamos comprometidos con el desarrollo de la Ética Organizacional. Contamos con un equipo de consultores con experiencia y altamente motivados para el desarrollo de soluciones de acuerdo a las necesidades de nuestros clientes.\n\nEsta experiencia combinada con la alta exigencia de nuestros clientes del sector privado y público, se fusionan con el objetivo de ofrecer servicios vanguardistas, innovadores y de calidad sustentados en un genuino interés por las personas.',
    stats: [
      { _type: 'stat', _key: 's1', number: '50,000+', label: 'Reportes de integridad evaluados' },
      { _type: 'stat', _key: 's2', number: '7,500+', label: 'Pruebas de polígrafo aplicadas' },
      { _type: 'stat', _key: 's3', number: '11+', label: 'Años de experiencia' },
      { _type: 'stat', _key: 's4', number: '100+', label: 'Clientes satisfechos' },
    ],
    missionHeading: 'Misión',
    mission:
      'Proveer servicios de evaluación de integridad del talento humano de alta calidad, contribuyendo a la construcción de organizaciones éticas y confiables en Ecuador.',
    visionHeading: 'Visión',
    vision:
      'Ser la empresa líder en soluciones de integridad laboral en Ecuador y Latinoamérica, reconocida por nuestra excelencia, innovación y compromiso con la ética organizacional.',
    valuesHeading: 'Valores',
    values: 'Integridad · Profesionalismo · Confidencialidad · Precisión · Innovación',
    servicesHeading: '¿Qué hacemos?',
    servicesSubheading:
      'Proveemos servicios enfocados en la seguridad vial y verificación de la integridad del talento humano.',
    ctaBanner: {
      _type: 'ctaBanner',
      heading: '¿Listo para llevar tu empresa al siguiente nivel?',
      ctaText: 'Contáctanos',
      ctaHref: '/contacto',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Integrity Solutions | Evaluación de Integridad del Talento Humano en Ecuador',
      metaDescription:
        'Empresa ecuatoriana líder en evaluación de integridad laboral. Ofrecemos polígrafo, verificación de antecedentes, test AMITAI® y capacitación en seguridad vial.',
    },
  },

  // -------------------------------------------------------------------------
  // Contact Page
  // -------------------------------------------------------------------------
  {
    _id: 'contactPage',
    _type: 'contactPage',
    heading: 'Contáctanos',
    subheading:
      'Estamos listos para ayudarte. Completa el formulario y nos pondremos en contacto contigo a la brevedad.',
    seo: {
      _type: 'seo',
      metaTitle: 'Contacto | Integrity Solutions Ecuador',
      metaDescription:
        'Contáctanos para una cotización de nuestros servicios de integridad laboral. Atendemos en Quito y Guayaquil.',
    },
  },

  // -------------------------------------------------------------------------
  // Service: Integrity Report
  // -------------------------------------------------------------------------
  {
    _id: 'service-integrity-report',
    _type: 'service',
    title: 'Integrity Report',
    slug: { _type: 'slug', current: 'integrity-report' },
    description:
      'Verifica y corrobora la veracidad de la información judicial, académica, laboral, financiera, entre otras, de los candidatos y el personal activo en las organizaciones.',
    shortDescription:
      'Verificación de antecedentes para candidatos y personal activo.',
    benefitsHeading: 'Ventajas',
    benefits: [
      benefit('Es un agente disuasivo efectivo'),
      benefit('Evalúa aspectos claves de la integridad de los candidatos'),
      benefit('Previene actividades fraudulentas'),
      benefit('Protege la información de su compañía'),
      benefit('Reduce el riesgo en nuevas contrataciones'),
      benefit('Procedimiento estandarizado, ágil y veraz'),
    ],
    ctaBanner: {
      _type: 'ctaBanner',
      heading: 'Creamos paquetes de acuerdo a tus necesidades',
      ctaLabel: 'Contáctanos',
      ctaHref: '/contacto',
    },
    order: 1,
    seo: {
      _type: 'seo',
      metaTitle: 'Integrity Report — Verificación de Antecedentes | Integrity Solutions',
      metaDescription:
        'Verificación de antecedentes: corrobora la veracidad de la información judicial, académica, laboral y financiera de tus candidatos en Ecuador.',
    },
  },

  // -------------------------------------------------------------------------
  // Service: Polígrafo
  // -------------------------------------------------------------------------
  {
    _id: 'service-poligrafo',
    _type: 'service',
    title: 'Polígrafo',
    slug: { _type: 'slug', current: 'poligrafo' },
    description:
      'Identificar el aplicante correcto para una posición crítica puede ser un gran desafío. El uso de servicios poligráficos puede proveerle el conocimiento necesario para minimizar riesgos en la selección de empleados.\n\nRealizamos pruebas de rutina y específicas para investigaciones de fuga de información, robo y fraudes.',
    shortDescription:
      'Pruebas poligráficas de rutina, pre empleo y específicas para investigación de fraudes, robos y fuga de información.',
    benefitsHeading: 'Ventajas',
    benefits: [
      benefit('Se utiliza tecnología de punta para medir factores fisiológicos imperceptibles para el ojo humano'),
      benefit('Precisión garantizada por nuestro equipo de expertos en psicofisiología forense'),
      benefit('Es un agente disuasivo efectivo'),
      benefit('Evalúa aspectos claves de la integridad de los candidatos'),
      benefit('Previene actividades fraudulentas'),
      benefit('Protege la información de su compañía'),
      benefit('Reduce el riesgo en nuevas contrataciones'),
      benefit('Procedimiento estandarizado, ágil y veraz'),
    ],
    ctaBanner: {
      _type: 'ctaBanner',
      heading: '¿Tienes problemas para encontrar los empleados correctos?',
      ctaLabel: 'Contáctanos',
      ctaHref: '/contacto',
    },
    order: 2,
    seo: {
      _type: 'seo',
      metaTitle: 'Polígrafo Quito-Guayaquil | Integrity Solutions',
      metaDescription:
        'Pruebas poligráficas de rutina, pre empleo y específicas. Investigación de fraudes, robos y fuga de información en Quito y Guayaquil.',
    },
  },

  // -------------------------------------------------------------------------
  // Service: AMITAI® Honestidad
  // -------------------------------------------------------------------------
  {
    _id: 'service-amitai',
    _type: 'service',
    title: 'AMITAI® Honestidad',
    slug: { _type: 'slug', current: 'amitai-honestidad' },
    description:
      'AMITAI® Honestidad es una manera confiable y objetiva de medir la tendencia de candidatos y empleados a involucrarse en actos deshonestos y producir datos estadísticos sobre permanencia y separación de empleados.',
    shortDescription:
      'Test de integridad laboral para medir la tendencia a conductas deshonestas en candidatos y empleados.',
    externalUrl: 'https://www.amitai.com/es/honestidad/',
    benefitsHeading: 'Ventajas',
    benefits: [
      benefit('Identifica el grado de riesgo en nuevas contrataciones y/o empleados actuales'),
      benefit('Permite comparar las competencias personales con aquellas requeridas por un puesto específico'),
      benefit('Detecta cambios en la forma de pensar del empleado a través del tiempo, identificando riesgos y recomendaciones'),
      benefit('Predice estadísticamente la probabilidad de permanencia del candidato en el empleo'),
      benefit('Examina la inteligencia y capacidad de aprendizaje de los empleados desde diferentes perspectivas cognitivas'),
      benefit('Provee información sobre la separación de empleados y genera recomendaciones para potenciar la retención'),
    ],
    ctaBanner: {
      _type: 'ctaBanner',
      heading: 'Efectiviza tus procesos de selección y retención de empleados',
      ctaLabel: 'Contáctanos',
      ctaHref: '/contacto',
    },
    order: 3,
    seo: {
      _type: 'seo',
      metaTitle: 'Test de Integridad AMITAI® Honestidad | Integrity Solutions Ecuador',
      metaDescription:
        'Test de integridad laboral AMITAI® Honestidad: mide la tendencia a actos deshonestos y predice la permanencia de candidatos y empleados.',
    },
  },

  // -------------------------------------------------------------------------
  // Service: Seguridad Vial
  // -------------------------------------------------------------------------
  {
    _id: 'service-seguridad-vial',
    _type: 'service',
    title: 'Seguridad Vial',
    slug: { _type: 'slug', current: 'seguridad-vial' },
    description:
      'Se aplica tanto a organizaciones públicas como privadas que interactúan o tengan incidencia con el sistema vial. Una buena manera de enfrentar el problema de la siniestralidad vial en una empresa es reconocer la importancia del mismo.',
    shortDescription:
      'Capacitaciones certificadas en seguridad y prevención vial laboral para conductores y personal de empresas.',
    benefitsHeading: 'Ventajas',
    benefits: [
      benefit('Garantiza un mejor control de costos en primas de seguros y reclamos'),
      benefit('Ayuda a reducir los días perdidos por lesiones del personal'),
      benefit('Minimiza el riesgo de enfermedades profesionales'),
      benefit('Reduce el impacto del estrés y mejora el estado de ánimo del personal'),
      benefit('Reduce las cargas de trabajo administrativas'),
      benefit('Mejora y efectiviza la organización del trabajo'),
      benefit('Impulsa la productividad y mejora las oportunidades de negocio'),
    ],
    trainingPrograms: [
      trainingProgram({
        title: 'Prevención y Seguridad Vial Laboral',
        audience: 'Conductores de vehículos livianos y carga.',
        objective:
          'Crear actitudes de prevención, conociendo y aplicando técnicas positivas en relación a su desempeño, para evitar los factores de riesgo que existe en el tránsito y transporte terrestre.',
        benefits:
          'Certificar a los conductores que cumplan con lineamientos de seguridad durante el manejo de vehículos a fin de evitar siniestros de tránsito.',
        topics: [
          'Introducción a la Seguridad Vial y el Plan Mundial de la OMS',
          'Análisis de casos reales de siniestros de tránsito',
          'Fases del siniestro: percepción, decisión y conflicto',
          'La seguridad vial y su eficiencia: vía, vehículo y hombre',
          'Psicología del tránsito: personalidad, sueño, fatiga, alcohol',
          'Gestión de la seguridad en la empresa — norma ISO 39001',
        ],
        duration: '8 horas',
      }),
      trainingProgram({
        title: 'Sistemas de Gestión de Seguridad Vial',
        audience:
          'Responsables de gestión de calidad de las empresas y conductores de vehículos en las organizaciones.',
        objective:
          'Desarrollar habilidades y competencias en sistemas de gestión de seguridad vial para disminuir los factores de riesgo en los siniestros de tránsito.',
        benefits:
          'Dar a conocer los beneficios del Sistema de Gestión de Seguridad Vial ISO 39001, sus requisitos y recomendaciones de buenas prácticas.',
        topics: [
          'Introducción y fundamentos de la prevención de riesgos viales',
          'Sistemas de gestión para la seguridad vial — ISO 39001',
          'Contexto de la organización, liderazgo y planificación',
          'Soporte, operación y evaluación de desempeño',
          'Elementos que intervienen en el siniestro: vía, vehículo y hombre',
          'Indicadores de gestión',
        ],
        duration: '8 horas',
      }),
      trainingProgram({
        title: 'Taller de Principios de Seguridad en Carga',
        audience:
          'Conductores de vehículos de carga y personal de áreas de bodega, despacho y distribución.',
        objective:
          'Dotar a los participantes de técnicas de análisis y diagnóstico para cargar y asegurar la carga correctamente y evitar los factores de riesgo.',
        benefits:
          'Certificar a los conductores y personal de logística con lineamientos de seguridad para el manejo de cargas y operación eficiente de vehículos.',
        topics: [
          'Introducción a la Seguridad de Carga',
          'Fundamentos: propósito y cómo aplicar la técnica de seguridad',
          'Requerimientos generales: sistemas y componentes de seguridad',
          'Contención, inmovilización y seguridad de la carga',
          'Carga adecuada y protección correcta de la mercadería',
          'Uso de dispositivos de seguridad y límite de carga de trabajo',
        ],
        duration: '8 horas',
      }),
    ],
    ctaBanner: {
      _type: 'ctaBanner',
      heading: 'Reduce las probabilidades de accidentes laborales',
      ctaLabel: 'Contáctanos',
      ctaHref: '/contacto',
    },
    order: 4,
    seo: {
      _type: 'seo',
      metaTitle: 'Seguridad Vial — Capacitaciones Certificadas | Integrity Solutions',
      metaDescription:
        'Capacitaciones certificadas en prevención y seguridad vial laboral para empresas en Ecuador. Cursos para conductores y personal administrativo.',
    },
  },
]

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

async function main() {
  console.log(
    `\nSeeding Sanity project "${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}" (${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'})\n`,
  )

  for (const doc of documents) {
    await upsert(doc)
  }

  console.log('\n✅  Done! All documents seeded.\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
