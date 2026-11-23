import { lazy, Suspense } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import Reveal from '../components/animations/Reveal'
import { projects } from '../data/projects'
import { useLanguage } from '../context/useLanguage'
import './ProjectDetailPage.css'

const ThermalManagementDashboard = lazy(
  () => import('../components/dashboards/ThermalManagementDashboard')
)

const ADASDashboard = lazy(
  () => import('../components/dashboards/ADASDashboard')
)

const GroverDashboard = lazy(
  () => import('../components/dashboards/GroverDashboard')
)

const MotorDashboard = lazy(
  () => import('../components/dashboards/MotorDashboard')
)

const MazeRaceDashboard = lazy(
  () => import('../components/dashboards/MazeRaceDashboard')
)

const statusLabels = {
  completed: { EN: 'Completed project', FR: 'Projet terminé' },
  prototype: { EN: 'Research prototype', FR: 'Prototype de recherche' },
  study: { EN: 'Engineering study', FR: 'Étude d’ingénierie' },
  'research-direction': { EN: 'Research direction', FR: 'Axe de recherche' },
}

function ProjectDetailPage() {
  const { projectId } = useParams()
  const { language } = useLanguage()

  if (projectId === 'secure-dynamic-multi-agent-maze-race') {
    return (
      <Suspense
        fallback={
          <main className="project-detail-loading">
            {language === 'FR'
              ? 'Chargement du tableau de bord Maze Race…'
              : 'Loading Maze Race dashboard…'}
          </main>
        }
      >
        <MazeRaceDashboard />
      </Suspense>
    )
  }

  if (projectId === 'grover-geometric-path-search') {
    return (
      <Suspense
        fallback={
          <main className="project-detail-loading">
            {language === 'FR'
              ? 'Chargement du tableau de bord Grover…'
              : 'Loading Grover dashboard…'}
          </main>
        }
      >
        <GroverDashboard />
      </Suspense>
    )
  }

  if (projectId === 'adas-monocular-ttc-aeb') {
    return (
      <Suspense
        fallback={
          <main className="project-detail-loading">
            {language === 'FR'
              ? 'Chargement du tableau de bord ADAS…'
              : 'Loading ADAS dashboard…'}
          </main>
        }
      >
        <ADASDashboard />
      </Suspense>
    )
  }

  if (projectId === 'thermal-management-embedded-system') {
    return (
      <Suspense
        fallback={
          <main className="project-detail-loading">
            {language === 'FR'
              ? 'Chargement du tableau de bord…'
              : 'Loading project dashboard…'}
          </main>
        }
      >
        <ThermalManagementDashboard />
      </Suspense>
    )
  }

  if (projectId === 'digital-twin-induction-motor') {
    return (
      <Suspense
        fallback={
          <main className="project-detail-loading">
            {language === 'FR'
              ? 'Chargement du tableau de bord moteur…'
              : 'Loading motor dashboard…'}
          </main>
        }
      >
        <MotorDashboard />
      </Suspense>
    )
  }

  const project = projects.find((item) => item.id === projectId)

  if (!project) return <Navigate to="/" replace />

  const isFr = language === 'FR'
  const title = isFr ? project.titleFr : project.title
  const subtitle = isFr ? project.subtitleFr : project.subtitle
  const summary = isFr ? project.summaryFr : project.summary
  const problem = isFr ? project.problemFr : project.problem
  const objectives = isFr ? project.objectivesFr : project.objectives
  const limitations = isFr ? project.limitationsFr : project.limitations
  const futureWork = isFr ? project.futureWorkFr : project.futureWork
  const status = statusLabels[project.status][language]

  return (
    <main className="project-detail">
      <header className="detail-header">
        <Link className="detail-brand" to="/">
          <span className="detail-brand-mark">KA<span>.</span></span>
          <span>ENGINEERING RESEARCH</span>
        </Link>
        <Link className="detail-back" to="/">
          <ArrowLeft size={16} />
          {isFr ? 'Retour à l’accueil' : 'Back to home'}
        </Link>
      </header>

      <section className="detail-hero">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="detail-hero-content"
        >
          <div className="detail-kicker">
            <span>{project.number} / {projects.length}</span>
            <span>{project.year}</span>
            <span>{status}</span>
          </div>
          <h1>{title}</h1>
          <p className="detail-subtitle">{subtitle}</p>
          <p className="detail-summary">{summary}</p>
        </motion.div>
      </section>

      {project.metrics.length > 0 && (
        <Reveal>
          <section className="detail-section">
          <div className="detail-section-heading">
            <span>01 / {isFr ? 'INDICATEURS' : 'METRICS'}</span>
            <h2>{isFr ? 'Données documentées' : 'Documented metrics'}</h2>
          </div>
          <div className="detail-metrics">
            {project.metrics.map((metric) => (
              <article className="detail-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <p>{metric.context}</p>
              </article>
            ))}
          </div>
          </section>
        </Reveal>
      )}

      <Reveal delay={0.04}>
      <section className="detail-section detail-problem">
        <div className="detail-section-heading">
          <span>{project.metrics.length > 0 ? '02' : '01'} / {isFr ? 'PROBLÉMATIQUE' : 'PROBLEM STATEMENT'}</span>
          <h2>{isFr ? 'Le problème d’ingénierie' : 'The engineering problem'}</h2>
        </div>
        <p>{problem}</p>
      </section>

      </Reveal>

      <Reveal delay={0.06}>
      <section className="detail-section">
        <div className="detail-section-heading">
          <span>03 / {isFr ? 'OBJECTIFS' : 'OBJECTIVES'}</span>
          <h2>{isFr ? 'Objectifs du projet' : 'Project objectives'}</h2>
        </div>
        <ol className="detail-objectives">
          {objectives.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>
      </Reveal>

      <Reveal delay={0.08}>
      <section className="detail-section detail-two-columns">
        <div>
          <div className="detail-section-heading">
            <span>04 / {isFr ? 'MÉTHODES' : 'METHODS'}</span>
            <h2>{isFr ? 'Méthodologie' : 'Methodology'}</h2>
          </div>
          <ul className="detail-list">
            {project.methods.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <div className="detail-section-heading">
            <span>05 / {isFr ? 'OUTILS' : 'TOOLS'}</span>
            <h2>{isFr ? 'Environnement technique' : 'Technical environment'}</h2>
          </div>
          <div className="detail-tags">
            {project.tools.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal delay={0.08}>
      <section className="detail-section">
        <div className="detail-section-heading">
          <span>06 / {isFr ? 'DISCIPLINES' : 'DISCIPLINES'}</span>
          <h2>{isFr ? 'Domaines scientifiques mobilisés' : 'Scientific disciplines involved'}</h2>
        </div>
        <div className="detail-tags">
          {project.disciplines.map((item) => (
            <span key={item}>{item.replaceAll('-', ' ')}</span>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal delay={0.08}>
      <section className="detail-section detail-two-columns">
        <div>
          <div className="detail-section-heading">
            <span>07 / {isFr ? 'LIMITES' : 'LIMITATIONS'}</span>
            <h2>{isFr ? 'Limites et précautions' : 'Limitations and caveats'}</h2>
          </div>
          <ul className="detail-list">
            {limitations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <div className="detail-section-heading">
            <span>08 / {isFr ? 'PERSPECTIVES' : 'FUTURE WORK'}</span>
            <h2>{isFr ? 'Développements futurs' : 'Future directions'}</h2>
          </div>
          <ul className="detail-list">
            {futureWork.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
      </Reveal>

      {project.links.length > 0 && (
        <Reveal delay={0.08}>
        <section className="detail-section">
          <div className="detail-section-heading">
            <span>09 / {isFr ? 'RESSOURCES' : 'RESOURCES'}</span>
            <h2>{isFr ? 'Ressources externes' : 'External resources'}</h2>
          </div>
          <div className="detail-resources">
            {project.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                {link.label}<ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </section>
        </Reveal>
      )}

      <Reveal delay={0.05}>
      <footer className="detail-footer">
        <span>KHOURDOUCH AMINE · {project.number}</span>
      </footer>
      </Reveal>
    </main>
  )
}

export default ProjectDetailPage
