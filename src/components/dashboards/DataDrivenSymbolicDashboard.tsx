import { useEffect, useState } from 'react'
import {
  Activity, ArrowLeft, ArrowUpRight, BrainCircuit, ChartNoAxesCombined,
  CircleAlert, Crosshair, Database, FileText, Code2, Route,
  ShieldCheck, Target, Video, Gauge, Layers3,
} from 'lucide-react'
import {
  ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis,
  BarChart, Bar, LineChart, Line, Legend, PieChart, Pie, Cell,
} from 'recharts'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/useLanguage'
import './DataDrivenSymbolicDashboard.css'

type DashboardData = {
  dynamics: {
    model: string
    transitions: { train: number; calibration: number; test: number }
    errors: { target: string; rmse: number; mae: number }[]
    coverage: number
  }
  navigation: {
    actions: number
    duration: number
    initialDistance: number
    finalDistance: number
    clearance: number
    requiredMargin: number
    actionCounts: Record<string, number>
    status: string
  }
  validation: {
    episodes: number
    successes: number
    failures: number
    collisions: number
    successRate: number
    results: {
      initialState: string
      status: string
      actions: number
      goalDistance: number
      obstacleDistance: number
    }[]
  }
  symbolic: {
    totalStates: number
    safeStates: number
    goalStates: number
    winningStates: number
    initialCandidates: number
    initialWinningStates: number
    horizon: number
    headingBins: number
  }
}

type Tab = 'overview' | 'dynamics' | 'navigation' | 'validation'

const BASE = `${import.meta.env.BASE_URL}projects/data-driven-symbolic-control/`
const VIDEO = `${BASE}video/geometric_navigation_3d_industrial.mp4`
const PAPER = `${BASE}paper/Data_Driven_Symbolic_Modeling_and_Predictive_Navigation_for_Autonomous_Mobile_Robots__An_Experimental_Study.pdf`
const DATA = `${BASE}data/dashboard_results.json`
const REPOSITORY = 'https://github.com/khourdouch-amine/DATA_DRIVEN_SYMBOLIC_CONTROL'


function DataDrivenSymbolicDashboard() {
  const { language } = useLanguage()
  const isFr = language === 'FR'
  const [tab, setTab] = useState<Tab>('overview')
  const [data, setData] = useState<DashboardData | null>(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let active = true
    fetch(DATA)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load experimental data')
        return response.json()
      })
      .then((result: DashboardData) => {
        if (active) setData(result)
      })
      .catch(() => {
        if (active) setLoadError(true)
      })
    return () => { active = false }
  }, [])

  const t = {
    back: isFr ? 'Retour au portfolio' : 'Back to portfolio',
    eyebrow: isFr ? 'ROBOTIQUE AUTONOME · RECHERCHE EXPÉRIMENTALE' : 'AUTONOMOUS ROBOTICS · EXPERIMENTAL RESEARCH',
    title: isFr ? 'Commande symbolique pilotée par les données' : 'Data-Driven Symbolic Control',
    subtitle: isFr
      ? 'Apprentissage de dynamique · Abstraction symbolique · Navigation prédictive'
      : 'Learned dynamics · Symbolic abstraction · Predictive navigation',
    prototype: isFr ? 'PROTOTYPE EXPÉRIMENTAL' : 'EXPERIMENTAL PROTOTYPE',
    overview: isFr ? 'Vue générale' : 'Overview',
    dynamics: isFr ? 'Dynamique' : 'Dynamics',
    navigation: isFr ? 'Navigation' : 'Navigation',
    validation: isFr ? 'Validation symbolique' : 'Symbolic validation',
    video: isFr ? 'VIDÉO RÉELLE DE LA SIMULATION' : 'REAL SIMULATION VIDEO',
    videoCaption: isFr
      ? 'Enregistrement de la simulation de navigation du robot mobile.'
      : 'Recorded mobile-robot navigation simulation.',
    paper: isFr ? 'Lire l’article scientifique' : 'Read scientific paper',
    repo: isFr ? 'Explorer le dépôt GitHub' : 'Explore GitHub repository',
    results: isFr ? 'INDICATEURS EXPÉRIMENTAUX' : 'EXPERIMENTAL INDICATORS',
    coverage: isFr ? 'Couverture empirique' : 'Empirical coverage',
    actions: isFr ? 'Actions exécutées' : 'Actions executed',
    clearance: isFr ? 'Dégagement minimal' : 'Minimum clearance',
    success: isFr ? 'Réussite indépendante' : 'Independent success',
    dataUnavailable: isFr ? 'Impossible de charger les données expérimentales.' : 'Unable to load experimental data.',
    loading: isFr ? 'Chargement des résultats…' : 'Loading experimental results…',
    errorChart: isFr ? 'Erreurs du modèle appris' : 'Learned model errors',
    errorDesc: isFr ? 'Comparaison RMSE / MAE sur les trois sorties.' : 'RMSE / MAE comparison across the three outputs.',
    split: isFr ? 'Répartition des transitions' : 'Transition split',
    splitDesc: isFr ? 'Jeux utilisés pour entraîner, calibrer et tester le modèle.' : 'Data used to train, calibrate and test the model.',
    actionChart: isFr ? 'Répartition des actions nominales' : 'Nominal action distribution',
    actionDesc: isFr ? 'Comptage des commandes durant la navigation réussie.' : 'Command counts during the successful navigation run.',
    episodes: isFr ? 'Épisodes de validation indépendante' : 'Independent validation episodes',
    episodeDesc: isFr ? 'Nombre d’actions par épisode et statut final.' : 'Action count per episode and final status.',
    goalDistance: isFr ? 'Distance finale à la cible (m)' : 'Final goal distance (m)',
    symbolic: isFr ? 'ABSTRACTION SYMBOLIQUE H05' : 'H05 SYMBOLIC ABSTRACTION',
    safeStates: isFr ? 'États sûrs' : 'Safe states',
    goalStates: isFr ? 'États cibles' : 'Goal states',
    winningStates: isFr ? 'États gagnants' : 'Winning states',
    candidates: isFr ? 'Candidats initiaux' : 'Initial candidates',
    noWinning: isFr ? 'Aucun candidat initial dans l’ensemble gagnant.' : 'No initial candidate belongs to the winning set.',
    pipeline: isFr ? 'CHAÎNE MÉTHODOLOGIQUE' : 'METHODOLOGICAL PIPELINE',
    steps: isFr
      ? ['Apprentissage supervisé de la dynamique', 'Abstraction symbolique échantillonnée', 'Calcul d’un ensemble gagnant', 'Filtrage géométrique prédictif']
      : ['Supervised dynamics learning', 'Sampled symbolic abstraction', 'Winning-set computation', 'Geometric predictive filtering'],
    limitations: isFr ? 'LIMITES ET INTERPRÉTATION SCIENTIFIQUE' : 'SCIENTIFIC SCOPE AND LIMITATIONS',
    limitationText: isFr
      ? 'La couverture de 94,9 % est empirique. L’incertitude est estimée par calibration de dispersion d’ensemble et ne constitue pas une garantie probabiliste formelle. L’abstraction repose sur un échantillonnage intra-cellule fini. Le filtre géométrique n’est pas un contrôleur CBF. La validation indépendante a obtenu 1 réussite sur 8 épisodes, sans collision observée dans ces 8 essais.'
      : 'The 94.9% coverage is empirical. Uncertainty is estimated using ensemble-spread calibration and is not a formal probabilistic guarantee. The abstraction relies on finite intra-cell sampling. The geometric filter is not a CBF controller. Independent validation achieved 1 success in 8 episodes, with no collision observed in those 8 trials.',
    model: isFr ? 'Modèle' : 'Model',
    transitions: isFr ? 'Transitions' : 'Transitions',
    horizon: isFr ? 'Horizon' : 'Horizon',
    headings: isFr ? 'Bins d’orientation' : 'Heading bins',
    duration: isFr ? 'Temps simulé' : 'Simulated time',
    finalDistance: isFr ? 'Distance finale à l’objectif' : 'Final goal distance',
    initialDistance: isFr ? 'Distance initiale à l’objectif' : 'Initial goal distance',
    margin: isFr ? 'Marge de sécurité configurée' : 'Configured safety margin',
    collisions: isFr ? 'Collisions observées' : 'Observed collisions',
    failed: isFr ? 'Échecs' : 'Failures',
    successful: isFr ? 'Réussites' : 'Successes',
    footer: isFr ? 'Résultats expérimentaux — aucune certification formelle' : 'Experimental results — no formal certification',
  }

  const tabs: { id: Tab; label: string; icon: typeof Activity }[] = [
    { id: 'overview', label: t.overview, icon: Activity },
    { id: 'dynamics', label: t.dynamics, icon: BrainCircuit },
    { id: 'navigation', label: t.navigation, icon: Route },
    { id: 'validation', label: t.validation, icon: ShieldCheck },
  ]

  const tooltipStyle = {
    background: '#102331',
    border: '1px solid #365467',
    borderRadius: 8,
    color: '#e7f0f6',
    fontSize: 12,
  }

  const transitionData = data ? [
    { name: isFr ? 'Entraînement' : 'Training', count: data.dynamics.transitions.train },
    { name: isFr ? 'Calibration' : 'Calibration', count: data.dynamics.transitions.calibration },
    { name: isFr ? 'Test' : 'Test', count: data.dynamics.transitions.test },
  ] : []

  const actionData = data ? Object.entries(data.navigation.actionCounts).map(([name, value]) => ({
    name: name.replaceAll('_', ' '),
    actions: value,
  })) : []

  const episodeData = data ? data.validation.results.map((episode, index) => ({
    name: `E${index + 1}`,
    actions: episode.actions,
    distance: Number(episode.goalDistance.toFixed(3)),
    status: episode.status,
    initialState: episode.initialState,
  })) : []

  const validationPie = data ? [
    { name: t.successful, value: data.validation.successes },
    { name: t.failed, value: data.validation.failures },
  ] : []

  const metrics = data ? [
    { icon: BrainCircuit, value: `${(data.dynamics.coverage * 100).toFixed(1)}%`, label: t.coverage, detail: '3,000 test transitions' },
    { icon: Route, value: String(data.navigation.actions), label: t.actions, detail: t.duration + ': ' + data.navigation.duration.toFixed(1) + ' s' },
    { icon: Crosshair, value: `${(data.navigation.clearance * 100).toFixed(2)} cm`, label: t.clearance, detail: t.margin + ': ' + (data.navigation.requiredMargin * 100).toFixed(1) + ' cm' },
    { icon: Target, value: `${data.validation.successes}/${data.validation.episodes}`, label: t.success, detail: `${(data.validation.successRate * 100).toFixed(1)}%` },
  ] : []

  return (
    <main className="ddsc-dashboard">
      <header className="ddsc-header">
        <Link to="/" className="ddsc-back"><ArrowLeft size={16} /> {t.back}</Link>
        <span className="ddsc-eyebrow">{t.eyebrow}</span>
        <span className="ddsc-status"><i /> {t.prototype}</span>
      </header>

      <section className="ddsc-hero">
        <div>
          <p className="ddsc-kicker">RESEARCH PROJECT / 015</p>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="ddsc-hero-links">
          <a className="ddsc-repo" href={REPOSITORY} target="_blank" rel="noreferrer">
            <Code2 size={16} /> {t.repo} <ArrowUpRight size={15} />
          </a>
          <a className="ddsc-paper-link" href={PAPER} target="_blank" rel="noreferrer">
            <FileText size={16} /> {t.paper} <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <section className="ddsc-video-panel">
        <div className="ddsc-panel-heading">
          <span><Video size={16} /> {t.video}</span>
          <span className="ddsc-video-label">MP4 · EXPERIMENTAL RECORDING</span>
        </div>
        <video className="ddsc-video" controls playsInline preload="metadata">
          <source src={VIDEO} type="video/mp4" />
          {isFr ? 'Votre navigateur ne prend pas en charge la lecture vidéo.' : 'Your browser does not support video playback.'}
        </video>
        <p className="ddsc-video-caption">{t.videoCaption}</p>
      </section>

      <nav className="ddsc-tabs" aria-label={isFr ? 'Sections du tableau de bord' : 'Dashboard sections'}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)} aria-pressed={tab === id}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>

      {!data && (
        <div className="ddsc-loading">
          {loadError ? <><CircleAlert size={18} /> {t.dataUnavailable}</> : <><Activity size={18} /> {t.loading}</>}
        </div>
      )}

      {data && (
        <>
          {tab === 'overview' && (
            <>
              <section className="ddsc-metrics-section">
                <div className="ddsc-section-title"><span>{t.results}</span><small>MEASURED / REPORTED</small></div>
                <div className="ddsc-metric-grid">
                  {metrics.map(({ icon: Icon, value, label, detail }) => (
                    <article key={label}><Icon /><strong>{value}</strong><span>{label}</span><small>{detail}</small></article>
                  ))}
                </div>
              </section>

              <section className="ddsc-overview-grid">
                <article className="ddsc-info-card">
                  <div className="ddsc-section-title"><span><Layers3 size={15} /> {t.symbolic}</span><small>H05 · {data.symbolic.horizon.toFixed(1)} s</small></div>
                  <div className="ddsc-symbolic-stats">
                    <div><strong>{data.symbolic.safeStates.toLocaleString()}</strong><span>{t.safeStates}</span></div>
                    <div><strong>{data.symbolic.goalStates.toLocaleString()}</strong><span>{t.goalStates}</span></div>
                    <div><strong>{data.symbolic.winningStates.toLocaleString()}</strong><span>{t.winningStates}</span></div>
                    <div><strong>{data.symbolic.initialCandidates}</strong><span>{t.candidates}</span></div>
                  </div>
                  <p className="ddsc-footnote">{t.noWinning} {data.symbolic.initialWinningStates}/{data.symbolic.initialCandidates}.</p>
                </article>
                <article className="ddsc-info-card">
                  <div className="ddsc-section-title"><span><ChartNoAxesCombined size={15} /> {t.pipeline}</span><small>4 STAGES</small></div>
                  <ol className="ddsc-pipeline">{t.steps.map((step, index) => <li key={step}><i>{index + 1}</i><span>{step}</span></li>)}</ol>
                </article>
              </section>
            </>
          )}

          {tab === 'dynamics' && (
            <section className="ddsc-chart-grid">
              <article className="ddsc-chart-card ddsc-chart-wide">
                <div className="ddsc-section-title"><span>{t.errorChart}</span><small>RMSE / MAE</small></div>
                <p className="ddsc-chart-description">{t.errorDesc}</p>
                <div className="ddsc-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.dynamics.errors} margin={{ top: 12, right: 15, left: 4, bottom: 8 }}>
                      <CartesianGrid stroke="#29404e" strokeDasharray="3 3" />
                      <XAxis dataKey="target" stroke="#91a9b9" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#91a9b9" tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend />
                      <Bar dataKey="rmse" name="RMSE" fill="#42c9c1" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="mae" name="MAE" fill="#e4a35b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
              <article className="ddsc-chart-card">
                <div className="ddsc-section-title"><span>{t.split}</span><small>{data.dynamics.transitions.train + data.dynamics.transitions.calibration + data.dynamics.transitions.test} TOTAL</small></div>
                <p className="ddsc-chart-description">{t.splitDesc}</p>
                <div className="ddsc-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transitionData} margin={{ top: 12, right: 10, left: 0, bottom: 8 }}>
                      <CartesianGrid stroke="#29404e" strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#91a9b9" tick={{ fontSize: 10 }} />
                      <YAxis stroke="#91a9b9" tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="count" name={isFr ? 'Transitions' : 'Transitions'} fill="#6689d8" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="ddsc-chart-note">{t.model}: {data.dynamics.model} · {data.dynamics.transitions.train.toLocaleString()} / {data.dynamics.transitions.calibration.toLocaleString()} / {data.dynamics.transitions.test.toLocaleString()}</p>
              </article>
            </section>
          )}

          {tab === 'navigation' && (
            <>
              <section className="ddsc-metric-grid ddsc-navigation-metrics">
                <article><Route /><strong>{data.navigation.actions}</strong><span>{t.actions}</span><small>{data.navigation.duration.toFixed(2)} s</small></article>
                <article><Gauge /><strong>{data.navigation.finalDistance.toFixed(3)} m</strong><span>{t.finalDistance}</span><small>{t.initialDistance}: {data.navigation.initialDistance.toFixed(3)} m</small></article>
                <article><Crosshair /><strong>{(data.navigation.clearance * 100).toFixed(2)} cm</strong><span>{t.clearance}</span><small>{t.margin}: {(data.navigation.requiredMargin * 100).toFixed(1)} cm</small></article>
                <article><ShieldCheck /><strong>{data.navigation.status.replaceAll('_', ' ')}</strong><span>{isFr ? 'Statut nominal' : 'Nominal status'}</span><small>{isFr ? 'Simulation géométrique' : 'Geometric simulation'}</small></article>
              </section>
              <article className="ddsc-chart-card ddsc-chart-full">
                <div className="ddsc-section-title"><span>{t.actionChart}</span><small>{data.navigation.actions} ACTIONS</small></div>
                <p className="ddsc-chart-description">{t.actionDesc}</p>
                <div className="ddsc-chart ddsc-chart-tall">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={actionData} margin={{ top: 12, right: 20, left: 5, bottom: 8 }}>
                      <CartesianGrid stroke="#29404e" strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#91a9b9" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#91a9b9" tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="actions" name={isFr ? 'Nombre d’actions' : 'Action count'} fill="#42c9c1" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </>
          )}

          {tab === 'validation' && (
            <>
              <section className="ddsc-metric-grid ddsc-validation-metrics">
                <article><Target /><strong>{data.validation.successes}/{data.validation.episodes}</strong><span>{t.successful}</span><small>{(data.validation.successRate * 100).toFixed(1)}%</small></article>
                <article><CircleAlert /><strong>{data.validation.failures}</strong><span>{t.failed}</span><small>{isFr ? 'Épisodes non réussis' : 'Unsuccessful episodes'}</small></article>
                <article><ShieldCheck /><strong>{data.validation.collisions}</strong><span>{t.collisions}</span><small>{isFr ? 'Sur les essais observés' : 'Across observed trials'}</small></article>
                <article><Database /><strong>{data.symbolic.totalStates.toLocaleString()}</strong><span>{isFr ? 'États abstraits' : 'Abstract states'}</span><small>{data.symbolic.headingBins} {t.headings.toLowerCase()}</small></article>
              </section>
              <section className="ddsc-validation-grid">
                <article className="ddsc-chart-card">
                  <div className="ddsc-section-title"><span>{t.episodes}</span><small>8 EPISODES</small></div>
                  <p className="ddsc-chart-description">{t.episodeDesc}</p>
                  <div className="ddsc-chart ddsc-chart-tall">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={episodeData} margin={{ top: 12, right: 8, left: 0, bottom: 8 }}>
                        <CartesianGrid stroke="#29404e" strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#91a9b9" tick={{ fontSize: 10 }} />
                        <YAxis stroke="#91a9b9" tick={{ fontSize: 10 }} />
                        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}`, isFr ? 'Actions' : 'Actions']} />
                        <Bar dataKey="actions" name={isFr ? 'Actions' : 'Actions'} radius={[4, 4, 0, 0]}>
                          {episodeData.map((entry, index) => <Cell key={index} fill={entry.status === 'goal_reached' ? '#42c9c1' : '#d18b58'} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </article>
                <article className="ddsc-chart-card">
                  <div className="ddsc-section-title"><span>{t.goalDistance}</span><small>METRES</small></div>
                  <div className="ddsc-chart ddsc-chart-tall">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={episodeData} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
                        <CartesianGrid stroke="#29404e" strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#91a9b9" tick={{ fontSize: 10 }} />
                        <YAxis stroke="#91a9b9" tick={{ fontSize: 10 }} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Line type="monotone" dataKey="distance" name={t.goalDistance} stroke="#6689d8" strokeWidth={2.5} dot={{ r: 4, fill: '#42c9c1' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="ddsc-validation-pie">
                    <ResponsiveContainer width="100%" height={130}>
                      <PieChart>
                        <Pie data={validationPie} dataKey="value" nameKey="name" innerRadius={35} outerRadius={55} paddingAngle={3}>
                          {validationPie.map((_, index) => <Cell key={index} fill={index === 0 ? '#42c9c1' : '#d18b58'} />)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </article>
              </section>
              <article className="ddsc-info-card ddsc-episode-table">
                <div className="ddsc-section-title"><span>{isFr ? 'DÉTAIL DES ÉPISODES' : 'EPISODE DETAILS'}</span><small>RAW VALIDATION RECORDS</small></div>
                <div className="ddsc-table-scroll">
                  <table>
                    <thead><tr><th>Episode</th><th>{isFr ? 'État initial' : 'Initial state'}</th><th>{t.actions}</th><th>{t.goalDistance}</th><th>Status</th></tr></thead>
                    <tbody>{episodeData.map((episode) => (
                      <tr key={episode.name}>
                        <td>{episode.name}</td><td>{episode.initialState}</td><td>{episode.actions}</td>
                        <td>{episode.distance.toFixed(3)} m</td>
                        <td><span className={episode.status === 'goal_reached' ? 'ddsc-result-success' : 'ddsc-result-failure'}>{episode.status.replaceAll('_', ' ')}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </article>
            </>
          )}
        </>
      )}

      <section className="ddsc-warning">
        <CircleAlert size={19} />
        <div><strong>{t.limitations}</strong><p>{t.limitationText}</p></div>
      </section>

      <footer className="ddsc-footer">
        <span>DATA-DRIVEN SYMBOLIC CONTROL · 2026</span>
        <span><ShieldCheck size={14} /> {t.footer}</span>
      </footer>
    </main>
  )
}

export default DataDrivenSymbolicDashboard
