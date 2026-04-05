/**
 * CMS Content Update Script
 * ─────────────────────────────────────────────────────────────────────────
 * Populates / updates every editable field in Sanity so that the website
 * requires ZERO hardcoded fallbacks.  Run after any schema change or when
 * you want to reset the content to the canonical "source of truth" values.
 *
 * Usage:
 *   node scripts/update-cms-content.mjs
 *
 * Requirements:
 *   - .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *     and SANITY_API_TOKEN (needs write access: editor or above).
 */

import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ─── Env loader ────────────────────────────────────────────────────────────
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
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'fmq3q28r',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// ─── Helpers ───────────────────────────────────────────────────────────────
let _keyCounter = 0
function key(prefix = 'k') {
  return `${prefix}${(++_keyCounter).toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

function benefit(title) {
  return { _type: 'benefit', _key: key('b'), title }
}

/**
 * Patch a document by ID.  Only the supplied fields are overwritten;
 * images and other fields set via the Studio are preserved.
 */
async function patch(id, fields) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id })
  if (!existing) {
    console.warn(`  ⚠ document "${id}" not found — skipping patch`)
    return
  }
  console.log(`  ✎ patching  "${id}"`)
  return client.patch(id).set(fields).commit()
}

/**
 * Create a document if it doesn't exist, otherwise patch it.
 * Use this only for documents that might not have been seeded yet.
 */
async function upsert(doc) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id })
  if (existing) {
    console.log(`  ↻ updating  "${doc._id}"`)
    return client.createOrReplace(doc)
  }
  console.log(`  ✚ creating  "${doc._id}"`)
  return client.create(doc)
}

// ─── Update Operations ─────────────────────────────────────────────────────

async function updateSiteSettings() {
  console.log('\n[1/4] Site Settings')
  await patch('siteSettings', {
    companyName: 'Integrity Solutions',
    companyFoundedYear: 2006,   // 18+ years as of 2024
    email: 'vguevara@integritysolutions.ec',
    whatsappNumber: '593995527670',
    businessHours: 'Lun–Vie 08:00–18:00',
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
        addressLine1: 'Edificio Ágora XXI, Oficina 612',
        addressLine2: '',
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
    defaultSeo: {
      _type: 'seo',
      metaTitle: 'Integrity Solutions Ecuador | Integridad del Talento Humano',
      metaDescription:
        'Empresa ecuatoriana con 18+ años de experiencia en evaluación de integridad del talento humano. Polígrafo, Integrity Report y AMITAI® Honestidad en Quito y Guayaquil.',
    },
  })
}

async function updateHomepage() {
  console.log('\n[2/4] Homepage')
  await patch('homepage', {
    // ── Hero ─────────────────────────────────────────────────────────────
    hero: {
      _type: 'hero',
      heading: 'Sepa con certeza\nquién trabaja\ncon usted',
      description:
        'Evaluaciones certificadas de integridad del talento humano — respaldadas por APA, AIPP y ASIS. Más de una década protegiendo organizaciones ecuatorianas.',
      ctaText: 'Conocer nuestros servicios',
      ctaHref: '#nosotros',
      secondaryCtaText: 'Agendar consulta',
      secondaryCtaHref: '/contacto',
    },

    // ── About ─────────────────────────────────────────────────────────────
    aboutHeading: '18 años construyendo organizaciones más seguras',
    aboutText:
      'Somos la empresa ecuatoriana de referencia en evaluación de integridad del talento humano. Con más de 18 años de trayectoria, ayudamos a organizaciones del sector privado y público a tomar decisiones de contratación fundamentadas, prevenir el fraude interno y reducir los riesgos derivados del talento humano.\n\nNuestros profesionales cuentan con certificaciones internacionales de la American Polygraph Association (APA), la Asociación Internacional de Profesionales en Poligrafía (AIPP) y ASIS International — los mismos estándares que exigen las empresas más exigentes del mundo.',

    // ── Certifications bar ────────────────────────────────────────────────
    certificationsHeading: 'Avalados por',

    // ── Stats (máx. 4) ────────────────────────────────────────────────────
    stats: [
      { _type: 'stat', _key: key('s'), number: '50,000+', label: 'Evaluaciones de talento completadas' },
      { _type: 'stat', _key: key('s'), number: '7,500+',  label: 'Exámenes poligráficos realizados' },
      { _type: 'stat', _key: key('s'), number: '150+',    label: 'Empresas que confían en nosotros' },
      { _type: 'stat', _key: key('s'), number: '18+',     label: 'Años en el mercado' },
    ],

    // ── Mission / Vision / Values ─────────────────────────────────────────
    mission:
      'Proveer servicios de evaluación de integridad del talento humano de alta calidad, contribuyendo a la construcción de organizaciones éticas y confiables en Ecuador.',
    vision:
      'Ser la empresa líder en soluciones de integridad laboral en Ecuador y Latinoamérica, reconocida por nuestra excelencia, innovación y compromiso con la ética organizacional.',
    values: 'Integridad. Profesionalismo. Confidencialidad. Precisión. Innovación.',

    // ── Services heading ──────────────────────────────────────────────────
    servicesHeading: 'Nuestros servicios',
    servicesSubheading:
      'Tres instrumentos complementarios para que su empresa contrate con certeza y opere sin riesgos derivados del talento humano.',

    // ── Clients heading ───────────────────────────────────────────────────
    clientsHeading: 'Empresas que ya confían en nosotros',

    // ── CTA Banner ────────────────────────────────────────────────────────
    ctaBanner: {
      _type: 'ctaBanner',
      heading: 'Proteja su empresa antes de que ocurra el problema',
      subheading:
        'Cada contratación sin verificar es un riesgo evitable. Conversemos sobre cómo podemos ayudarle.',
      ctaText: 'Solicitar evaluación',
      ctaHref: '/contacto',
    },

    // ── Testimonials (máx. 6) ─────────────────────────────────────────────
    testimonials: [
      {
        _type: 'testimonial',
        _key: key('t'),
        quote:
          'Gracias a Integrity Solutions identificamos inconsistencias críticas en el perfil de tres candidatos a puestos financieros que, de no haber sido detectadas, habrían representado un riesgo significativo para nuestra organización. El proceso fue profesional, ágil y completamente confidencial.',
        authorRole: 'Director de Recursos Humanos',
        authorCompany: 'Empresa del sector bancario',
        isAnonymized: true,
      },
      {
        _type: 'testimonial',
        _key: key('t'),
        quote:
          'Llevamos más de cinco años trabajando con ellos para el proceso de preempleo de nuestros conductores y operadores logísticos. La combinación de polígrafo y verificación de antecedentes nos ha permitido reducir considerablemente los incidentes internos.',
        authorRole: 'Gerente de Seguridad',
        authorCompany: 'Empresa del sector logístico',
        isAnonymized: true,
      },
      {
        _type: 'testimonial',
        _key: key('t'),
        quote:
          'El test AMITAI nos dio una perspectiva que la entrevista tradicional no puede ofrecer. Hemos mejorado la calidad de nuestras contrataciones y reducido la rotación en puestos de alto impacto. Lo recomendamos ampliamente para cualquier empresa que tome en serio su talento humano.',
        authorRole: 'Gerente General',
        authorCompany: 'Empresa del sector retail',
        isAnonymized: true,
      },
    ],

    // ── Process Steps (máx. 6) ────────────────────────────────────────────
    processSteps: [
      {
        _type: 'processStep',
        _key: key('p'),
        stepNumber: 1,
        title: 'Solicitud',
        description:
          'Contáctenos por teléfono, correo o WhatsApp. Analizamos sus necesidades y le orientamos hacia el servicio más adecuado para su caso.',
      },
      {
        _type: 'processStep',
        _key: key('p'),
        stepNumber: 2,
        title: 'Diseño del proceso',
        description:
          'Definimos conjuntamente el alcance de la evaluación: perfiles, número de candidatos, cronograma y criterios específicos de su industria.',
      },
      {
        _type: 'processStep',
        _key: key('p'),
        stepNumber: 3,
        title: 'Evaluación',
        description:
          'Nuestros profesionales certificados aplican los instrumentos seleccionados con rigor técnico, respeto a las personas y total confidencialidad.',
      },
      {
        _type: 'processStep',
        _key: key('p'),
        stepNumber: 4,
        title: 'Informe confidencial',
        description:
          'Entregamos un informe detallado y accionable directamente al responsable designado. Sin ambigüedades — solo la información que su empresa necesita para decidir.',
      },
    ],

    // ── FAQ Items (máx. 12) ───────────────────────────────────────────────
    faqItems: [
      {
        _type: 'faqItem',
        _key: key('f'),
        question: '¿Es legal la prueba de polígrafo en Ecuador?',
        answer:
          'Sí. En Ecuador, la aplicación del polígrafo está permitida en procesos de preempleo y en investigaciones internas corporativas, siempre que exista consentimiento informado y escrito del evaluado. Nuestros protocolos cumplen con la legislación ecuatoriana vigente y los estándares internacionales de la American Polygraph Association (APA).',
      },
      {
        _type: 'faqItem',
        _key: key('f'),
        question: '¿Cuánto tiempo tarda una evaluación?',
        answer:
          'Depende del servicio seleccionado. Un examen poligráfico de preempleo toma entre 90 y 120 minutos por persona. La verificación de antecedentes (Integrity Report) se entrega en un plazo de 3 a 5 días hábiles. El test AMITAI puede completarse en línea en aproximadamente 45 minutos. Para volúmenes grandes de candidatos, diseñamos un cronograma personalizado.',
      },
      {
        _type: 'faqItem',
        _key: key('f'),
        question: '¿Cómo se protege la confidencialidad de los resultados?',
        answer:
          'Los informes son entregados exclusivamente al responsable designado por la empresa contratante, mediante canales seguros. Ningún resultado es compartido con terceros sin autorización expresa. Nuestros profesionales están sujetos a estrictos acuerdos de confidencialidad y el manejo de datos cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador.',
      },
      {
        _type: 'faqItem',
        _key: key('f'),
        question: '¿Se puede aplicar el polígrafo a empleados actuales?',
        answer:
          'Sí. Además de los procesos de preempleo, aplicamos exámenes poligráficos en investigaciones de fraude, robo, filtración de información, y otras situaciones donde es necesario establecer la verdad dentro de un equipo de trabajo. Esta modalidad también cuenta con protocolos de consentimiento y cumple la misma rigurosidad técnica que los procesos de contratación.',
      },
      {
        _type: 'faqItem',
        _key: key('f'),
        question: '¿Qué es el AMITAI y por qué es diferente a otros tests?',
        answer:
          'AMITAI® es un test psicométrico desarrollado y validado en 16 países para evaluar la propensión a la deshonestidad laboral. A diferencia de los tests de personalidad genéricos, fue diseñado específicamente para contextos corporativos y mide factores de riesgo concretos: tendencia al fraude, robo, falsedad en el historial y actitud ante las normas. Es especialmente útil para puestos con acceso a información sensible, manejo de dinero o posiciones de confianza.',
      },
      {
        _type: 'faqItem',
        _key: key('f'),
        question: '¿En qué sectores trabajan habitualmente?',
        answer:
          'Trabajamos con empresas de todos los sectores: banca y finanzas, logística y transporte, retail, tecnología, salud, manufactura y sector público. Nuestros servicios se adaptan a los requisitos específicos de cada industria — por ejemplo, para empresas con flotas contamos con programas de Seguridad Vial certificados por SETEC, y para entidades financieras aplicamos protocolos reforzados de verificación de antecedentes.',
      },
      {
        _type: 'faqItem',
        _key: key('f'),
        question: '¿Cómo solicito una cotización?',
        answer:
          'Puede contactarnos directamente por WhatsApp, por teléfono o a través del formulario de contacto en este sitio. Le responderemos en un plazo máximo de 24 horas hábiles con una propuesta adaptada a sus necesidades y el tamaño de su empresa.',
      },
    ],

    // ── SEO ───────────────────────────────────────────────────────────────
    seo: {
      _type: 'seo',
      metaTitle: 'Integrity Solutions | Evaluación de Integridad del Talento Humano · Ecuador',
      metaDescription:
        'Empresa ecuatoriana con 18+ años evaluando la integridad del talento humano. Polígrafo, verificación de antecedentes (Integrity Report) y AMITAI® Honestidad. Quito y Guayaquil.',
    },
  })
}

async function updateContactPage() {
  console.log('\n[3/4] Contact Page')
  await patch('contactPage', {
    heading: 'Hablemos sobre su empresa',
    subheading:
      'Cuéntenos qué necesita. Nos pondremos en contacto en un máximo de 24 horas hábiles con una propuesta personalizada.',
    seo: {
      _type: 'seo',
      metaTitle: 'Contacto | Integrity Solutions Ecuador',
      metaDescription:
        'Solicite una cotización de servicios de evaluación de integridad del talento humano. Atendemos en Quito, Guayaquil y todo Ecuador.',
    },
  })
}

async function updateServices() {
  console.log('\n[4/4] Services')

  // Integrity Report
  await patch('service-integrity-report', {
    title: 'Integrity Report',
    slug: { _type: 'slug', current: 'integrity-report' },
    shortDescription:
      'Verificación exhaustiva de antecedentes laborales, académicos, judiciales y financieros de candidatos y personal activo.',
    description:
      'El Integrity Report verifica y corrobora la veracidad de la información judicial, académica, laboral, financiera y de referencia de los candidatos y el personal activo en su organización. Es el primer paso para contratar con certeza.\n\nNuestro equipo cruza datos de múltiples fuentes — registros públicos, bases de datos especializadas y referencias directas — y entrega un informe claro y accionable en 3 a 5 días hábiles.',
    benefitsHeading: '¿Por qué aplicar el Integrity Report?',
    benefits: [
      benefit('Detecta inconsistencias y falsedades antes de que impacten su organización'),
      benefit('Actúa como agente disuasivo efectivo: los candidatos deshonestos se descartan solos'),
      benefit('Reduce el riesgo en nuevas contrataciones con datos verificados de primera mano'),
      benefit('Protege la información confidencial y los activos estratégicos de su empresa'),
      benefit('Previene fraudes internos desde el momento de la incorporación'),
      benefit('Procedimiento estandarizado, ágil y con entrega en 3 a 5 días hábiles'),
    ],
    ctaBanner: {
      _type: 'ctaBanner',
      heading: 'Creamos paquetes a la medida de su empresa',
      subheading: 'Desde evaluaciones individuales hasta programas masivos de preempleo.',
      ctaText: 'Solicitar cotización',
      ctaHref: '/contacto',
    },
    order: 1,
    seo: {
      _type: 'seo',
      metaTitle: 'Integrity Report — Verificación de Antecedentes Ecuador | Integrity Solutions',
      metaDescription:
        'Verificación de antecedentes laborales, académicos, judiciales y financieros en Ecuador. Entrega en 3–5 días hábiles. Quito y Guayaquil.',
    },
  })

  // Polígrafo
  await patch('service-poligrafo', {
    title: 'Polígrafo',
    slug: { _type: 'slug', current: 'poligrafo' },
    shortDescription:
      'Pruebas poligráficas de preempleo, rutina e investigación específica, aplicadas por examinadores certificados por la APA.',
    description:
      'El polígrafo es el instrumento más preciso para evaluar la veracidad de un candidato o empleado en situaciones de alta criticidad. Utilizamos tecnología Lafayette de última generación y un equipo de examinadores certificados por la American Polygraph Association (APA) y la AIPP.\n\nRealizamos tres tipos de evaluaciones: pre-empleo (para nuevas contrataciones), de rutina (para personal activo) y específicas (para investigaciones de fraude, robo o fuga de información).',
    benefitsHeading: '¿Por qué elegir nuestro servicio de polígrafo?',
    benefits: [
      benefit('Examinadores certificados APA e AIPP con más de una década de experiencia en Ecuador'),
      benefit('Tecnología Lafayette de última generación que mide factores fisiológicos imperceptibles'),
      benefit('Tres modalidades: preempleo, rutina e investigación específica'),
      benefit('Reduce drásticamente el riesgo en contrataciones para puestos críticos'),
      benefit('Actúa como poderoso agente disuasivo en la prevención del fraude interno'),
      benefit('Resultados claros y objetivos en un informe confidencial entregado al responsable designado'),
      benefit('Procedimiento estandarizado que cumple los protocolos internacionales de la APA'),
    ],
    ctaBanner: {
      _type: 'ctaBanner',
      heading: '¿Necesita certeza antes de contratar para un puesto crítico?',
      subheading: 'Contáctenos y le explicamos cuál modalidad de polígrafo es la más adecuada para su caso.',
      ctaText: 'Consultar ahora',
      ctaHref: '/contacto',
    },
    order: 2,
    seo: {
      _type: 'seo',
      metaTitle: 'Polígrafo Quito y Guayaquil — Certificado APA | Integrity Solutions',
      metaDescription:
        'Pruebas poligráficas de preempleo, rutina e investigación interna en Ecuador. Examinadores certificados APA. Resultados objetivos y confidenciales.',
    },
  })

  // AMITAI
  await patch('service-amitai', {
    title: 'AMITAI® Honestidad',
    slug: { _type: 'slug', current: 'amitai-honestidad' },
    shortDescription:
      'Test psicométrico validado internacionalmente para medir la propensión a conductas deshonestas en candidatos y empleados.',
    description:
      'AMITAI® Honestidad es un test psicométrico desarrollado y validado en 16 países que mide la tendencia de candidatos y empleados a involucrarse en actos deshonestos. A diferencia de los tests de personalidad genéricos, fue diseñado exclusivamente para contextos laborales.\n\nGenera datos estadísticos sobre la probabilidad de permanencia del candidato, su actitud ante las normas y su perfil de riesgo en puestos con acceso a información sensible, dinero o posiciones de confianza. Se puede aplicar de forma masiva en línea, haciendo del proceso de selección algo más eficiente y objetivo.',
    externalUrl: 'https://www.amitai.com/es/honestidad/',
    benefitsHeading: '¿Qué le aporta el AMITAI a su empresa?',
    benefits: [
      benefit('Identifica el grado de riesgo de deshonestidad en candidatos y empleados actuales'),
      benefit('Aplicación masiva en línea: ideal para procesos de selección con muchos candidatos'),
      benefit('Mide la probabilidad estadística de permanencia y rotación temprana'),
      benefit('Detecta cambios en la conducta del empleado a lo largo del tiempo'),
      benefit('Compara competencias del candidato con los requisitos específicos del puesto'),
      benefit('Examina capacidad cognitiva y aprendizaje desde múltiples perspectivas'),
      benefit('Genera recomendaciones accionables para potenciar la retención del talento'),
    ],
    ctaBanner: {
      _type: 'ctaBanner',
      heading: 'Optimice su proceso de selección con datos objetivos',
      subheading: 'El AMITAI combina con Integrity Report y Polígrafo para una evaluación integral.',
      ctaText: 'Conocer más',
      ctaHref: '/contacto',
    },
    order: 3,
    seo: {
      _type: 'seo',
      metaTitle: 'Test AMITAI® Honestidad — Evaluación Psicométrica Laboral | Integrity Solutions Ecuador',
      metaDescription:
        'Test psicométrico AMITAI® Honestidad: mide la propensión a conductas deshonestas, predice rotación y evalúa el perfil de riesgo de candidatos y empleados en Ecuador.',
    },
  })

  // Seguridad Vial — update descriptions and CTAs; keep existing training programs
  await patch('service-seguridad-vial', {
    title: 'Seguridad Vial',
    slug: { _type: 'slug', current: 'seguridad-vial' },
    shortDescription:
      'Capacitaciones certificadas por SETEC en prevención y gestión de seguridad vial laboral para conductores y personal corporativo.',
    description:
      'Los accidentes de tránsito representan una de las principales causas de pérdidas económicas y humanas en las empresas ecuatorianas. Nuestros programas de Seguridad Vial, certificados por SETEC, están diseñados para reducir la siniestralidad en flotas corporativas y equipos que interactúan con el sistema vial.\n\nAplicamos una metodología práctica basada en la norma ISO 39001 y el Plan Mundial de la OMS para la Seguridad Vial, adaptada a la realidad de las organizaciones ecuatorianas del sector público y privado.',
    benefitsHeading: '¿Por qué invertir en Seguridad Vial corporativa?',
    benefits: [
      benefit('Reduce la siniestralidad y el impacto económico de los accidentes de tránsito'),
      benefit('Capacitaciones certificadas por SETEC — válidas para procesos de auditoría y compliance'),
      benefit('Disminuye el costo en primas de seguros, reclamos y días perdidos por lesiones'),
      benefit('Mejora la productividad y reduce el estrés operativo del personal de campo'),
      benefit('Cumple requisitos de la norma ISO 39001 de Gestión de Seguridad Vial'),
      benefit('Refuerza la imagen corporativa de responsabilidad ante empleados y clientes'),
      benefit('Disponible en modalidad presencial e in-company para todo el Ecuador'),
    ],
    ctaBanner: {
      _type: 'ctaBanner',
      heading: 'Reduzca la siniestralidad en su flota corporativa',
      subheading: 'Diseñamos un programa a la medida del tamaño y riesgos específicos de su empresa.',
      ctaText: 'Solicitar programa',
      ctaHref: '/contacto',
    },
    order: 4,
    seo: {
      _type: 'seo',
      metaTitle: 'Seguridad Vial Corporativa — Certificado SETEC | Integrity Solutions Ecuador',
      metaDescription:
        'Capacitaciones certificadas por SETEC en prevención vial laboral. Programas basados en ISO 39001 para flotas y personal corporativo en Ecuador.',
    },
  })
}

// ─── Entry point ───────────────────────────────────────────────────────────
async function main() {
  console.log('🔄 Integrity Solutions — CMS Content Update')
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'fmq3q28r'}`)
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}\n`)

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌  SANITY_API_TOKEN is not set in .env.local')
    console.error('   Generate a token at https://sanity.io → your project → API → Tokens')
    process.exit(1)
  }

  try {
    await updateSiteSettings()
    await updateHomepage()
    await updateContactPage()
    await updateServices()
    console.log('\n✅  CMS content updated successfully.')
    console.log('   Open Sanity Studio (/studio) to review or adjust any field.\n')
  } catch (err) {
    console.error('\n❌  Update failed:', err.message ?? err)
    process.exit(1)
  }
}

main()
