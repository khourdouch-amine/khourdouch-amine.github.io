import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Clock3,
  Crosshair,
  Eye,
  FileText,
  Code2,
  Radar,
  ShieldAlert,
  Video,
} from 'lucide-react'
import { useLanguage } from '../../context/useLanguage'
import './ADASDashboard.css'
import ADAS3DScene from './ADAS3DScene'
const metrics = [
  {
    value: '1,206',
    label: 'PROCESSED FRAMES',
    labelFr: 'IMAGES TRAITÉES',
    context: 'Video evaluation dataset',
    contextFr: 'Jeu vidéo d’évaluation',
    icon: Video,
  },
  {
    value: '1280 × 720',
    label: 'VIDEO RESOLUTION',
    labelFr: 'RÉSOLUTION VIDÉO',
    context: 'Input video',
    contextFr: 'Vidéo source',
    icon: Camera,
  },
  {
    value: '30.09 FPS',
    label: 'SOURCE FRAME RATE',
    labelFr: 'CADENCE SOURCE',
    context: 'Video frame rate, not processing throughput',
    contextFr: 'Cadence vidéo, pas débit de traitement',
    icon: Activity,
  },
  {
    value: '40.08 s',
    label: 'VIDEO DURATION',
    labelFr: 'DURÉE VIDÉO',
    context: 'Analysed sequence',
    contextFr: 'Séquence analysée',
    icon: Clock3,
  },
]

const latencyMetrics = [
  { label: 'YOLOv8n', value: 10.73, width: 46.9, note: 'Detection component' },
  { label: 'Mean pipeline', value: 20.7, width: 90.6, note: 'Measured mean latency' },
  { label: 'P95 pipeline', value: 22.86, width: 100, note: '95th percentile latency' },
]

function ADASDashboard() {
  const { language } = useLanguage()
  const isFr = language === 'FR'

  const text = {
    back: isFr ? 'Tous les projets' : 'All projects',
    eyebrow: isFr
      ? 'VISION PAR ORDINATEUR · SÉCURITÉ AUTOMOBILE'
      : 'COMPUTER VISION · AUTOMOTIVE SAFETY',
    title: isFr
      ? 'Perception monoculaire et estimation du risque de collision'
      : 'Monocular Perception & Collision-Risk Estimation',
    subtitle: isFr
      ? 'Détection, suivi multi-objets et analyse TTC pour les fonctions FCW/AEB'
      : 'Object detection, multi-object tracking and TTC analysis for FCW/AEB functions',
    summary: isFr
      ? 'Étude vidéo d’une chaîne ADAS combinant détection visuelle, suivi temporel des objets et estimation du temps avant collision. L’objectif est d’examiner les événements d’alerte et de freinage d’urgence, ainsi que les performances de traitement.'
      : 'A video-based ADAS study combining visual object detection, temporal object tracking and time-to-collision estimation. The objective is to investigate warning and emergency-braking events while examining processing performance.',
    overview: isFr ? 'VUE D’ENSEMBLE' : 'PROJECT OVERVIEW',
    overviewTitle: isFr ? 'Une chaîne de perception orientée sécurité' : 'A perception pipeline for safety applications',
    metrics: isFr ? 'DONNÉES DE L’ÉVALUATION' : 'EVALUATION DATA',
    pipeline: isFr ? 'ARCHITECTURE FONCTIONNELLE' : 'FUNCTIONAL ARCHITECTURE',
    pipelineTitle: isFr ? 'De l’image à l’évaluation du risque' : 'From video frame to risk assessment',
    pipelineNote: isFr
      ? 'Schéma fonctionnel conceptuel : il décrit les étapes étudiées et ne constitue pas une capture de l’exécution réelle.'
      : 'Conceptual functional diagram: it describes the investigated stages and is not a screenshot of the actual execution.',
    stages: [
      {
        number: '01',
        name: 'VIDEO INPUT',
        nameFr: 'ENTRÉE VIDÉO',
        detail: isFr ? 'Séquence monoculaire · 1280 × 720' : 'Monocular sequence · 1280 × 720',
        icon: Camera,
      },
      {
        number: '02',
        name: 'YOLOv8n',
        nameFr: 'YOLOv8n',
        detail: isFr ? 'Détection des usagers de la route' : 'Road-user object detection',
        icon: Eye,
      },
      {
        number: '03',
        name: 'BYTETRACK',
        nameFr: 'BYTETRACK',
        detail: isFr ? 'Association et suivi temporel' : 'Temporal association and tracking',
        icon: Radar,
      },
      {
        number: '04',
        name: 'TTC ESTIMATION',
        nameFr: 'ESTIMATION TTC',
        detail: isFr ? 'Analyse temporelle du risque' : 'Temporal collision-risk analysis',
        icon: Crosshair,
      },
      {
        number: '05',
        name: 'FCW / AEB',
        nameFr: 'FCW / AEB',
        detail: isFr ? 'Analyse des événements identifiés' : 'Analysis of identified events',
        icon: ShieldAlert,
      },
    ],
    latency: isFr ? 'PERFORMANCES TEMPORELLES' : 'TIMING PERFORMANCE',
    latencyTitle: isFr ? 'Latence de la chaîne de traitement' : 'Processing pipeline latency',
    latencyNote: isFr
      ? 'Les trois mesures sont présentées séparément. La latence YOLOv8n est celle du composant de détection ; les valeurs moyenne et P95 concernent la chaîne complète.'
      : 'The three measurements are reported separately. YOLOv8n latency refers to the detection component; mean and P95 values refer to the complete pipeline.',
    events: isFr ? 'ÉVÉNEMENTS IDENTIFIÉS' : 'IDENTIFIED EVENTS',
    eventsTitle: isFr ? 'Analyse FCW et AEB' : 'FCW and AEB analysis',
    eventsValue: isFr ? '5 événements' : '5 events',
    eventsText: isFr
      ? 'Cinq événements FCW/AEB ont été identifiés dans la séquence analysée. Les horodatages et la répartition individuelle entre FCW et AEB ne sont pas disponibles dans les données actuellement documentées.'
      : 'Five FCW/AEB events were identified in the analysed sequence. Timestamps and the individual FCW/AEB breakdown are not available in the currently documented data.',
    ttc: isFr ? 'PRINCIPE DE L’ESTIMATION' : 'ESTIMATION PRINCIPLE',
    ttcTitle: isFr ? 'Time-to-Collision (TTC)' : 'Time-to-Collision (TTC)',
    ttcText: isFr
      ? 'Le TTC représente le temps théorique restant avant une collision si la vitesse relative et la trajectoire restent constantes. Avec une caméra monoculaire, son estimation dépend de la géométrie apparente, du mouvement observé et des hypothèses de calibration.'
      : 'TTC represents the theoretical time remaining before a collision if relative speed and trajectory remain constant. With a monocular camera, its estimation depends on apparent geometry, observed motion and calibration assumptions.',
    ttcFormula: 'TTC = d / vᵣ',
    ttcCaption: isFr
      ? 'Forme cinématique simplifiée : d est la distance relative et vᵣ la vitesse de rapprochement positive.'
      : 'Simplified kinematic form: d is relative distance and vᵣ is positive closing speed.',
    methodology: isFr ? 'MÉTHODOLOGIE' : 'METHODOLOGY',
    methodologyTitle: isFr ? 'Outils et méthodes mobilisés' : 'Methods and tools',
    methods: [
      ['YOLOv8n', isFr ? 'Détection visuelle des objets dans les images.' : 'Visual object detection in video frames.'],
      ['ByteTrack', isFr ? 'Suivi multi-objets entre images successives.' : 'Multi-object tracking across consecutive frames.'],
      ['OpenCV', isFr ? 'Traitement vidéo et analyse des séquences.' : 'Video processing and sequence analysis.'],
      ['TTC', isFr ? 'Évaluation temporelle du risque de collision.' : 'Temporal assessment of collision risk.'],
    ],
    limitations: isFr ? 'LIMITES SCIENTIFIQUES' : 'SCIENTIFIC LIMITATIONS',
    limitationsTitle: isFr ? 'Portée et précautions d’interprétation' : 'Scope and interpretation caveats',
    limits: isFr
      ? [
          'La distance et le TTC monoculaires dépendent des hypothèses visuelles et de la calibration.',
          'Les cinq événements concernent uniquement la séquence vidéo étudiée.',
          'La cadence de 30,09 FPS décrit la vidéo source et ne constitue pas une mesure du débit de calcul.',
          'Ces résultats ne constituent ni une homologation automobile ni une validation ISO 26262.',
        ]
      : [
          'Monocular distance and TTC depend on visual assumptions and calibration.',
          'The five events refer only to the analysed video sequence.',
          'The 30.09 FPS figure describes the source video and is not a measurement of computational throughput.',
          'These results do not constitute automotive homologation or ISO 26262 validation.',
        ],
    future: isFr ? 'PERSPECTIVES' : 'FUTURE WORK',
    futureTitle: isFr ? 'Prochaines étapes' : 'Next steps',
    next: isFr
      ? [
          'Évaluer le système dans des scènes et conditions lumineuses variées.',
          'Quantifier les erreurs de distance et de TTC avec des données de référence.',
          'Étudier des seuils d’alerte tenant compte de l’incertitude.',
          'Étendre les essais à des scénarios simulés et des jeux de données indépendants.',
        ]
      : [
          'Evaluate the system across diverse traffic scenes and lighting conditions.',
          'Quantify distance and TTC errors against reference data.',
          'Investigate uncertainty-aware warning thresholds.',
          'Extend testing to simulated scenarios and independent datasets.',
        ],
    resources: isFr ? 'RESSOURCES' : 'RESOURCES',
    resourceTitle: isFr
      ? 'Code, simulation et étude expérimentale'
      : 'Code, simulation & experimental study',
    notebookTitle: isFr ? 'Notebook scientifique' : 'Scientific notebook',
    notebookDescription: isFr
      ? 'Code source, traitement vidéo et estimation TTC'
      : 'Source code, video processing and TTC estimation',
    videoTitle: isFr ? 'Simulation vidéo' : 'Simulation video',
    videoDescription: isFr
      ? 'Démonstration de la détection, du suivi et des alertes'
      : 'Detection, tracking and warning demonstration',
    paperTitle: isFr ? 'Étude expérimentale' : 'Experimental study',
    paperDescription: isFr
      ? 'Rapport technique complet au format PDF'
      : 'Complete technical report in PDF format',
    footer: isFr ? 'ÉTUDE ADAS · 2026' : 'ADAS STUDY · 2026',
  }

  return (
    <main className="adas-dashboard">
      <header className="adas-topbar">
        <Link to="/" className="adas-brand">
          <span className="adas-brand-mark">KA<span>.</span></span>
          <span>ENGINEERING RESEARCH</span>
        </Link>
        <Link to="/" className="adas-back">
          <ArrowLeft size={15} />
          {text.back}
        </Link>
      </header>

      <section className="adas-hero">
        <motion.div
          className="adas-hero-inner"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="adas-eyebrow">
            <span>02 / 12</span>
            <span>{text.eyebrow}</span>
            <span>2026</span>
          </div>
          <h1>{text.title}</h1>
          <p className="adas-subtitle">{text.subtitle}</p>
          <div className="adas-hero-bottom">
            <p>{text.summary}</p>
            <div className="adas-hero-stamp">
              <span>YOLOv8n</span>
              <span>ByteTrack</span>
              <span>FCW / AEB</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive 3D ADAS perception and braking scenario */}
      <ADAS3DScene isFr={isFr} />

      <section className="adas-section">
        <div className="adas-section-heading">
          <span>01 / {text.metrics}</span>
          <h2>{text.overviewTitle}</h2>
        </div>
        <div className="adas-kpis">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.article
                className="adas-kpi"
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <Icon />
                <strong>{metric.value}</strong>
                <span>{isFr ? metric.labelFr : metric.label}</span>
                <p>{isFr ? metric.contextFr : metric.context}</p>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="adas-section">
        <div className="adas-section-heading">
          <span>02 / {text.pipeline}</span>
          <h2>{text.pipelineTitle}</h2>
        </div>
        <div className="adas-pipeline">
          {text.stages.map((stage, index) => {
            const Icon = stage.icon
            return (
              <div className="adas-stage-wrap" key={stage.number}>
                <motion.article
                  className="adas-stage"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <span className="adas-stage-number">{stage.number}</span>
                  <Icon />
                  <strong>{isFr ? stage.nameFr : stage.name}</strong>
                  <p>{stage.detail}</p>
                </motion.article>
                {index < text.stages.length - 1 && (
                  <ArrowUpRight className="adas-stage-arrow" />
                )}
              </div>
            )
          })}
        </div>
        <p className="adas-note">{text.pipelineNote}</p>
      </section>

      <section className="adas-section adas-analysis-grid">
        <div>
          <div className="adas-section-heading">
            <span>03 / {text.latency}</span>
            <h2>{text.latencyTitle}</h2>
          </div>
          <div className="adas-latency-panel">
            {latencyMetrics.map((metric) => (
              <div className="adas-latency-row" key={metric.label}>
                <div className="adas-latency-label">
                  <strong>{metric.label}</strong>
                  <span>{metric.value.toFixed(2)} ms</span>
                </div>
                <div className="adas-latency-track">
                  <motion.div
                    className="adas-latency-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.width}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                  />
                </div>
                <p>{metric.note}</p>
              </div>
            ))}
            <p className="adas-note">{text.latencyNote}</p>
          </div>
        </div>

        <div>
          <div className="adas-section-heading">
            <span>04 / {text.events}</span>
            <h2>{text.eventsTitle}</h2>
          </div>
          <article className="adas-events-panel">
            <div className="adas-events-icon"><ShieldAlert /></div>
            <strong>{text.eventsValue}</strong>
            <p>{text.eventsText}</p>
            <div className="adas-event-markers" aria-label="Five identified events">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>{String(index + 1).padStart(2, '0')}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="adas-section">
        <div className="adas-section-heading">
          <span>05 / {text.ttc}</span>
          <h2>{text.ttcTitle}</h2>
        </div>
        <div className="adas-ttc-panel">
          <div className="adas-ttc-equation">
            <span>{text.ttcFormula}</span>
            <small>{text.ttcCaption}</small>
          </div>
          <p>{text.ttcText}</p>
        </div>
      </section>

      <section className="adas-section">
        <div className="adas-section-heading">
          <span>06 / {text.methodology}</span>
          <h2>{text.methodologyTitle}</h2>
        </div>
        <div className="adas-method-grid">
          {text.methods.map(([name, description]) => (
            <article key={name}>
              <span>{name}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="adas-tool-tags">
          {['Python', 'YOLOv8n', 'ByteTrack', 'OpenCV', 'NumPy', 'Kaggle'].map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </section>

      <section className="adas-section adas-assessment">
        <div>
          <div className="adas-section-heading">
            <span>07 / {text.limitations}</span>
            <h2>{text.limitationsTitle}</h2>
          </div>
          <ul>{text.limits.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <div className="adas-section-heading">
            <span>08 / {text.future}</span>
            <h2>{text.futureTitle}</h2>
          </div>
          <ul>{text.next.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="adas-section">
        <div className="adas-section-heading">
          <span>09 / {text.resources}</span>
          <h2>{text.resourceTitle}</h2>
        </div>
        <div className="adas-resources">
          <a
            href="https://github.com/khourdouch-amine/AEB-TTC-ADAS/blob/b45a10f4bc9e08895abe0fcecc3fb6af8ca07760/AEB-TTC-ADAS.ipynb"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 />
            <span>
              <strong>{text.notebookTitle}</strong>
              <small>{text.notebookDescription}</small>
              <small>GITHUB · JUPYTER NOTEBOOK</small>
            </span>
            <ArrowUpRight />
          </a>

          <a
            href="/projects/adas/simulation-aeb-ttc.mp4"
            target="_blank"
            rel="noreferrer"
          >
            <Video />
            <span>
              <strong>{text.videoTitle}</strong>
              <small>{text.videoDescription}</small>
              <small>MP4 · 1280 × 720 · 40 S</small>
            </span>
            <ArrowUpRight />
          </a>

          <a
            href="/projects/adas/etude-experimentale-aeb-ttc.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <FileText />
            <span>
              <strong>{text.paperTitle}</strong>
              <small>{text.paperDescription}</small>
              <small>PDF · 6 PAGES</small>
            </span>
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <footer className="adas-footer">
        <span>KHOURDOUCH AMINE · ADAS / 02</span>
        <span>{text.footer}</span>
      </footer>
    </main>
  )
}

export default ADASDashboard
