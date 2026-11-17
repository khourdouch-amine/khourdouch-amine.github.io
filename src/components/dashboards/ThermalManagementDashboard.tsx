import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  ExternalLink,
  Activity,
  Thermometer,
  Gauge,
  Layers3,
} from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useLanguage } from '../../context/useLanguage'
import './ThermalManagementDashboard.css'

const thermalData = [
  { configuration: '01', velocity: 1, power: 3, cpu: 69.8, ram: 51.2 },
  { configuration: '02', velocity: 2, power: 5, cpu: 63.4, ram: 46.5 },
  { configuration: '03', velocity: 3, power: 7, cpu: 58.6, ram: 42.8 },
  { configuration: '04', velocity: 4, power: 9, cpu: 55.4, ram: 40.6 },
  { configuration: '05', velocity: 5, power: 10, cpu: 53.9, ram: 39.1 },
]

const pressureData = [
  { velocity: 1, pressure: 7.8 },
  { velocity: 3, pressure: 26.4 },
  { velocity: 5, pressure: 55.2 },
]

const gallery = [
  {
    file: 'geometry.png',
    title: 'Computational geometry',
    titleFr: 'Géométrie de calcul',
    description: 'Computational geometry and simulation domain.',
    descriptionFr: 'Géométrie du système et domaine de simulation.',
  },
  {
    file: 'mesh.png',
    title: 'Computational mesh',
    titleFr: 'Maillage numérique',
    description: 'Computational mesh used for the CFD analysis.',
    descriptionFr: 'Maillage utilisé pour l’analyse CFD.',
  },
  {
    file: 'temperature.png',
    title: 'Temperature field',
    titleFr: 'Champ de température',
    description: 'Temperature distribution under forced convection.',
    descriptionFr: 'Distribution de température en convection forcée.',
  },
  {
    file: 'velocity.png',
    title: 'Velocity field',
    titleFr: 'Champ de vitesse',
    description: 'Air velocity distribution around the system.',
    descriptionFr: 'Distribution de la vitesse de l’air autour du système.',
  },
  {
    file: 'streamlines.png',
    title: 'Airflow streamlines',
    titleFr: 'Lignes de courant',
    description: 'Airflow streamlines illustrating forced convection.',
    descriptionFr: 'Lignes de courant illustrant la convection forcée.',
  },
]

const Thermal3DScene = lazy(() => import('./Thermal3DScene'))

function ThermalManagementDashboard() {
  const { language } = useLanguage()
  const isFr = language === 'FR'
  const [activeImage, setActiveImage] = useState(0)

  const text = {
    back: isFr ? 'Tous les projets' : 'All projects',
    eyebrow: isFr ? 'ÉTUDE CFD · TRANSFERT THERMIQUE' : 'CFD STUDY · HEAT TRANSFER',
    title: isFr
      ? 'Gestion thermique par convection forcée'
      : 'Forced-Convection Thermal Management',
    subtitle: isFr
      ? 'Étude thermo-fluidique couplée appliquée au Raspberry Pi 4 Model B'
      : 'Conjugate thermo-fluid analysis applied to the Raspberry Pi 4 Model B',
    overview: isFr ? 'VUE D’ENSEMBLE' : 'PROJECT OVERVIEW',
    overviewTitle: isFr ? 'Performance thermique et compromis aéraulique' : 'Thermal performance and airflow trade-off',
    overviewText: isFr
      ? 'Cette étude numérique examine le refroidissement d’un système embarqué par convection forcée, en considérant le transfert thermique dans les solides et le transport d’énergie dans l’air.'
      : 'This numerical study investigates forced-air cooling of an embedded computing system, considering heat transfer in solid components and energy transport in the surrounding airflow.',
    cpu: isFr ? 'TEMPÉRATURE CPU' : 'CPU TEMPERATURE',
    ram: isFr ? 'TEMPÉRATURE RAM' : 'RAM TEMPERATURE',
    pressure: isFr ? 'PERTE DE CHARGE' : 'PRESSURE DROP',
    mesh: isFr ? 'MAILLAGE RETENU' : 'SELECTED MESH',
    fromTo: isFr ? 'Configuration 1 → 5' : 'Configuration 1 → 5',
    cells: isFr ? 'cellules' : 'cells',
    analysis: isFr ? 'ANALYSE THERMIQUE' : 'THERMAL ANALYSIS',
    analysisTitle: isFr ? 'Évolution des températures' : 'Temperature evolution',
    analysisNote: isFr
      ? 'Les cinq configurations font varier simultanément la vitesse d’entrée et la puissance thermique du CPU.'
      : 'Across the five configurations, inlet velocity and CPU heat load vary simultaneously.',
    caseLabel: isFr ? 'Configuration' : 'Configuration',
    velocityLabel: isFr ? 'Vitesse d’entrée' : 'Inlet velocity',
    powerLabel: isFr ? 'Puissance CPU' : 'CPU heat load',
    cpuLabel: 'CPU',
    ramLabel: 'RAM',
    pressureTitle: isFr ? 'Perte de charge selon la vitesse' : 'Pressure drop versus inlet velocity',
    pressureNote: isFr
      ? 'Valeurs documentées pour 1, 3 et 5 m/s uniquement.'
      : 'Documented values are available for 1, 3 and 5 m/s only.',
    gallery: isFr ? 'VISUALISATIONS CFD' : 'CFD VISUALIZATIONS',
    galleryTitle: isFr ? 'Domaine numérique et champs physiques' : 'Computational domain and physical fields',
    methodology: isFr ? 'MÉTHODOLOGIE' : 'METHODOLOGY',
    methodologyTitle: isFr ? 'Approche numérique' : 'Numerical approach',
    methods: [
      ['CHT', isFr ? 'Transfert thermique conjugué entre solides et fluide.' : 'Conjugate heat transfer between solid components and fluid.'],
      [isFr ? 'Volumes finis' : 'Finite volume', isFr ? 'Discrétisation numérique des équations de conservation.' : 'Numerical discretization of conservation equations.'],
      ['k-ω SST', isFr ? 'Modèle de turbulence utilisé pour l’écoulement.' : 'Turbulence model used for the airflow analysis.'],
      ['SimScale', isFr ? 'Environnement de simulation CFD.' : 'CFD simulation environment.'],
    ],
    meshTitle: isFr ? 'Indépendance du maillage' : 'Mesh independence',
    meshText: isFr
      ? 'Le rapport retient un maillage de 1 026 438 cellules. La variation rapportée entre les deux niveaux les plus fins est de 1,07 %, puis 0,21 %.'
      : 'The report retains a mesh of 1,026,438 cells. The reported variation across the two finest mesh levels is 1.07%, then 0.21%.',
    limits: isFr ? 'LIMITES SCIENTIFIQUES' : 'SCIENTIFIC LIMITATIONS',
    limitsTitle: isFr ? 'Interprétation et précautions' : 'Interpretation and caveats',
    limitations: isFr
      ? [
          'La vitesse d’entrée et la puissance thermique du CPU varient simultanément : leur influence respective ne peut pas être isolée à partir de ces cinq cas.',
          'Les propriétés thermophysiques sont supposées constantes.',
          'Le rayonnement thermique et la gravité ne sont pas pris en compte.',
          'Une validation expérimentale reste nécessaire.',
        ]
      : [
          'Inlet velocity and CPU heat load vary simultaneously: their individual effects cannot be isolated from these five cases.',
          'Thermophysical properties are assumed constant.',
          'Thermal radiation and gravity are not included.',
          'Experimental validation is still required.',
        ],
    next: isFr ? 'PERSPECTIVES' : 'FUTURE WORK',
    nextTitle: isFr ? 'Prochaines étapes scientifiques' : 'Next scientific steps',
    future: isFr
      ? [
          'Réaliser une étude à puissance CPU constante.',
          'Construire une matrice de simulation vitesse–puissance.',
          'Comparer les résultats numériques à des mesures expérimentales.',
        ]
      : [
          'Run a study at constant CPU heat load.',
          'Build a velocity–power simulation matrix.',
          'Compare numerical results against experimental measurements.',
        ],
    resources: isFr ? 'RESSOURCES SCIENTIFIQUES' : 'SCIENTIFIC RESOURCES',
    report: isFr ? 'Rapport technique complet' : 'Full technical report',
    presentation: isFr ? 'Présentation du projet' : 'Project presentation',
    open: isFr ? 'Ouvrir' : 'Open',
    footer: isFr ? 'ÉTUDE D’INGÉNIERIE · 2025–2026' : 'ENGINEERING STUDY · 2025–2026',
  }

  const resourceBase = '/projects/thermal-management/'

  return (
    <main className="thermal-dashboard">
      <header className="thermal-topbar">
        <Link to="/" className="thermal-brand">
          <span className="thermal-brand-mark">KA<span>.</span></span>
          <span>ENGINEERING RESEARCH</span>
        </Link>
        <Link to="/" className="thermal-back">
          <ArrowLeft size={15} />
          {text.back}
        </Link>
      </header>

      <section className="thermal-hero">
        <motion.div
          className="thermal-hero-inner"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="thermal-eyebrow">
            <span>03 / 12</span>
            <span>{text.eyebrow}</span>
            <span>2025—2026</span>
          </div>
          <h1>{text.title}</h1>
          <p className="thermal-subtitle">{text.subtitle}</p>
          <div className="thermal-hero-bottom">
            <p>{text.overviewText}</p>
            <div className="thermal-hero-stamp">
              <span>CFD</span>
              <span>CHT</span>
              <span>RPI 4</span>
            </div>
          </div>
        </motion.div>
      </section>

      <Suspense
        fallback={
          <div className="thermal-3d-loading">
            {isFr ? 'Chargement de la scène 3D…' : 'Loading 3D scene…'}
          </div>
        }
      >
        <Thermal3DScene language={language} />
      </Suspense>

      <section className="thermal-section">
        <div className="thermal-section-heading">
          <span>01 / {text.overview}</span>
          <h2>{text.overviewTitle}</h2>
        </div>
        <div className="thermal-kpis">
          <article className="thermal-kpi">
            <Thermometer />
            <strong>69.8 → 53.9 <small>°C</small></strong>
            <span>{text.cpu}</span>
            <p>−15.9 °C · −22.8%</p>
          </article>
          <article className="thermal-kpi">
            <Activity />
            <strong>51.2 → 39.1 <small>°C</small></strong>
            <span>{text.ram}</span>
            <p>−12.1 °C · −23.6%</p>
          </article>
          <article className="thermal-kpi">
            <Gauge />
            <strong>7.8 → 55.2 <small>Pa</small></strong>
            <span>{text.pressure}</span>
            <p>×7.08 · 1 to 5 m/s</p>
          </article>
          <article className="thermal-kpi">
            <Layers3 />
            <strong>1.026 <small>M</small></strong>
            <span>{text.mesh}</span>
            <p>1,026,438 {text.cells}</p>
          </article>
        </div>
      </section>

      <section className="thermal-section">
        <div className="thermal-section-heading">
          <span>02 / {text.analysis}</span>
          <h2>{text.analysisTitle}</h2>
        </div>
        <div className="thermal-chart-panel">
          <div className="thermal-chart-legend">
            <span><i className="legend-cpu" /> CPU</span>
            <span><i className="legend-ram" /> RAM</span>
          </div>
          <div className="thermal-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={thermalData} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid stroke="rgba(148,163,184,.13)" strokeDasharray="3 5" />
                <XAxis dataKey="configuration" tick={{ fill: '#94A3B8', fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis domain={[30, 75]} tick={{ fill: '#94A3B8', fontSize: 11 }} tickLine={false} axisLine={false} unit="°" />
                <Tooltip
                  contentStyle={{ background: '#10233B', border: '1px solid rgba(148,163,184,.25)', borderRadius: 8 }}
                  labelStyle={{ color: '#F1F5F9' }}
                  formatter={(value, name) => [`${value} °C`, name]}
                  labelFormatter={(label) => `${text.caseLabel} ${label}`}
                />
                <Line type="monotone" dataKey="cpu" name="CPU" stroke="#00C9B7" strokeWidth={3} dot={{ r: 4, fill: '#00C9B7' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="ram" name="RAM" stroke="#8B9EFF" strokeWidth={3} dot={{ r: 4, fill: '#8B9EFF' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="thermal-chart-note">{text.analysisNote}</p>
          <div className="thermal-case-strip">
            {thermalData.map((item) => (
              <div key={item.configuration}>
                <strong>{text.caseLabel} {item.configuration}</strong>
                <span>{item.velocity} m/s · {item.power} W</span>
              </div>
            ))}
          </div>
        </div>

        <div className="thermal-chart-panel thermal-pressure-panel">
          <div className="thermal-section-heading compact">
            <span>03 / PRESSURE</span>
            <h2>{text.pressureTitle}</h2>
          </div>
          <div className="thermal-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pressureData} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid stroke="rgba(148,163,184,.13)" strokeDasharray="3 5" />
                <XAxis dataKey="velocity" tick={{ fill: '#94A3B8', fontSize: 11 }} tickLine={false} axisLine={false} unit=" m/s" />
                <YAxis domain={[0, 60]} tick={{ fill: '#94A3B8', fontSize: 11 }} tickLine={false} axisLine={false} unit=" Pa" />
                <Tooltip
                  contentStyle={{ background: '#10233B', border: '1px solid rgba(148,163,184,.25)', borderRadius: 8 }}
                  formatter={(value) => [`${value} Pa`, 'Δp']}
                />
                <Line type="monotone" dataKey="pressure" name="Δp" stroke="#FF8A3D" strokeWidth={3} dot={{ r: 5, fill: '#FF8A3D' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="thermal-chart-note">{text.pressureNote}</p>
        </div>
      </section>

      <section className="thermal-section">
        <div className="thermal-section-heading">
          <span>04 / {text.gallery}</span>
          <h2>{text.galleryTitle}</h2>
        </div>
        <div className="thermal-gallery">
          <div className="thermal-gallery-main">
            <img
              src={`${resourceBase}${gallery[activeImage].file}`}
              alt={isFr ? gallery[activeImage].titleFr : gallery[activeImage].title}
              loading="lazy"
            />
            <div className="thermal-gallery-caption">
              <span>0{activeImage + 1} / 05</span>
              <div>
                <strong>{isFr ? gallery[activeImage].titleFr : gallery[activeImage].title}</strong>
                <p>{isFr ? gallery[activeImage].descriptionFr : gallery[activeImage].description}</p>
              </div>
              <a href={`${resourceBase}${gallery[activeImage].file}`} target="_blank" rel="noreferrer" aria-label={text.open}>
                <ExternalLink size={17} />
              </a>
            </div>
          </div>
          <div className="thermal-gallery-thumbs">
            {gallery.map((image, index) => (
              <button
                key={image.file}
                type="button"
                className={activeImage === index ? 'active' : ''}
                onClick={() => setActiveImage(index)}
                aria-pressed={activeImage === index}
                aria-label={isFr ? image.titleFr : image.title}
              >
                <img src={`${resourceBase}${image.file}`} alt="" loading="lazy" />
                <span>0{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="thermal-section">
        <div className="thermal-section-heading">
          <span>05 / {text.methodology}</span>
          <h2>{text.methodologyTitle}</h2>
        </div>
        <div className="thermal-method-grid">
          {text.methods.map(([name, description]) => (
            <article key={name}>
              <span>{name}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="thermal-mesh-note">
          <div>
            <span>{text.meshTitle}</span>
            <strong>1,026,438 {text.cells}</strong>
          </div>
          <p>{text.meshText}</p>
        </div>
      </section>

      <section className="thermal-section thermal-assessment">
        <div>
          <div className="thermal-section-heading">
            <span>06 / {text.limits}</span>
            <h2>{text.limitsTitle}</h2>
          </div>
          <ul>{text.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <div className="thermal-section-heading">
            <span>07 / {text.next}</span>
            <h2>{text.nextTitle}</h2>
          </div>
          <ul>{text.future.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="thermal-section">
        <div className="thermal-section-heading">
          <span>08 / {text.resources}</span>
          <h2>{isFr ? 'Documentation du projet' : 'Project documentation'}</h2>
        </div>
        <div className="thermal-resources">
          <a href={`${resourceBase}technical-report.pdf`} target="_blank" rel="noreferrer">
            <Download />
            <span><strong>{text.report}</strong><small>PDF · 15 pages</small></span>
            <ArrowUpRight />
          </a>
          <a href={`${resourceBase}presentation.pdf`} target="_blank" rel="noreferrer">
            <Download />
            <span><strong>{text.presentation}</strong><small>PDF · 42 slides</small></span>
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <footer className="thermal-footer">
        <span>KHOURDOUCH AMINE · CFD / 03</span>
        <span>{text.footer}</span>
      </footer>
    </main>
  )
}

export default ThermalManagementDashboard
