import { useEffect, useState } from 'react'
import { animate, motion, useReducedMotion } from 'motion/react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useLanguage } from '../../context/useLanguage'
import { mazeRaceData } from './mazeRaceData'
import './MazeRaceDashboard.css'

const palette = {
  teal: '#00c9b7',
  blue: '#60a5fa',
  violet: '#a78bfa',
  amber: '#fbbf24',
  muted: '#54708f',
  grid: 'rgba(148,163,184,0.14)',
  text: '#cbd5e1',
}

const tooltipStyle = {
  background: '#101f34',
  border: '1px solid rgba(0,201,183,.3)',
  borderRadius: 8,
  color: '#f1f5f9',
  fontSize: 11,
}

const staticMetrics = [
  { value: 10, suffix: '', label: 'Agents', labelFr: 'Agents', detail: '5 classical · 5 hybrid', detailFr: '5 classiques · 5 hybrides' },
  { value: 3, suffix: '/10', label: 'Goals reached', labelFr: 'Objectifs atteints', detail: '30% completion rate', detailFr: 'Taux d’achèvement de 30 %' },
  { value: 2000, suffix: '', label: 'Simulation cycles', labelFr: 'Cycles de simulation', detail: '66.67 s simulated time', detailFr: '66,67 s simulées' },
  { value: 217, suffix: '', label: 'Successful moves', labelFr: 'Déplacements réussis', detail: 'Recorded by the manager', detailFr: 'Enregistrés par le gestionnaire' },
  { value: 13853, suffix: '', label: 'Blocked moves', labelFr: 'Déplacements bloqués', detail: 'Coordination and movement constraints', detailFr: 'Coordination et contraintes de déplacement' },
  { value: 1970, suffix: '', label: 'Destination conflicts', labelFr: 'Conflits de destination', detail: 'Recorded conflict events', detailFr: 'Événements enregistrés' },
  { value: 23, suffix: '', label: 'Robot safety blocks', labelFr: 'Blocages de sécurité robot', detail: 'Trajectory rejections', detailFr: 'Rejets de trajectoire' },
]

const completionData = [
  { name: 'Reached', nameFr: 'Atteints', value: 3 },
  { name: 'Not reached', nameFr: 'Non atteints', value: 7 },
]

const rejectionData = [
  { name: 'Destination conflicts', nameFr: 'Conflits de destination', value: 1970, fill: palette.amber },
  { name: 'Cycle rejections', nameFr: 'Rejets de cycle', value: 9116, fill: palette.blue },
  { name: 'Dependency blocked', nameFr: 'Blocages de dépendance', value: 2744, fill: palette.violet },
  { name: 'Robot safety blocks', nameFr: 'Blocages sécurité robot', value: 23, fill: palette.teal },
]

const architecture = [
  { n: '01', title: 'Dynamic environment', titleFr: 'Environnement dynamique', desc: 'Grid, walls, moving obstacles and mission connectivity', descFr: 'Grille, murs, obstacles mobiles et connectivité des missions' },
  { n: '02', title: 'Planning agents', titleFr: 'Agents planificateurs', desc: 'Classical planners and hybrid quantum-walk planners', descFr: 'Planificateurs classiques et marches quantiques hybrides' },
  { n: '03', title: 'Multi-agent manager', titleFr: 'Gestionnaire multi-agent', desc: 'Proposal collection, priority arbitration and conflict resolution', descFr: 'Collecte des propositions, arbitrage et résolution des conflits' },
  { n: '04', title: 'Physical safety filter', titleFr: 'Filtre de sécurité physique', desc: 'Continuous trajectory checks for robots and moving obstacles', descFr: 'Vérification continue des trajectoires robot et obstacles mobiles' },
  { n: '05', title: 'Simulation & metrics', titleFr: 'Simulation et métriques', desc: 'State updates, event history and quantitative evaluation', descFr: 'Mise à jour des états, historique et évaluation quantitative' },
]

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [value, reduceMotion])

  return <>{display.toLocaleString('en-US')}{suffix}</>
}

function MazeRaceDashboard() {
  const { language } = useLanguage()
  const isFr = language === 'FR'
  const s = mazeRaceData.static
  const d = mazeRaceData.dynamic

  const baselineMeans = ['A*', 'Quantum Walk hybride'].map((algorithm) => {
    const rows = mazeRaceData.baseline.filter((row) => row.algorithm === algorithm)
    return {
      algorithm,
      meanLatency: rows.reduce((sum, row) => sum + row.latencyMs, 0) / rows.length,
      completion: rows.filter((row) => row.completed).length,
      meanPath: rows.reduce((sum, row) => sum + row.pathLength, 0) / rows.length,
    }
  })

  const agentPlanning = [...s.robots].sort((a, b) => a.planningTimeMs - b.planningTimeMs)
  const agentMoves = [...s.robots].map((agent) => ({
    ...agent,
    label: agent.id,
    movesClassical: agent.family === 'classical' ? agent.moves : 0,
    movesQuantum: agent.family === 'quantum' ? agent.moves : 0,
  }))

  return (
    <section className="detail-section maze-dashboard" aria-label={isFr ? 'Résultats quantitatifs' : 'Quantitative results'}>
      <div className="detail-section-heading">
        <span>04 / {isFr ? 'RÉSULTATS EXPÉRIMENTAUX' : 'EXPERIMENTAL RESULTS'}</span>
        <h2>{isFr ? 'Analyse quantitative du benchmark' : 'Benchmark quantitative analysis'}</h2>
      </div>

      <div className="maze-video-card">
        <div className="maze-video-heading">
          <h3>{isFr ? 'Visualisation de la simulation' : 'Simulation visualization'}</h3>
          <span>{isFr ? 'ENREGISTREMENT DU PROJET' : 'PROJECT RECORDING'}</span>
        </div>
        <video controls preload="metadata" poster="/projects/maze/dashboard-preview.png">
          <source src="/projects/maze/secure-dynamic-maze-race.mp4" type="video/mp4" />
          {isFr ? 'Votre navigateur ne prend pas en charge la vidéo.' : 'Your browser does not support the video element.'}
        </video>
        <img
          className="maze-animation-preview"
          src="/projects/maze/maze-animation.gif"
          alt={isFr ? 'Animation de la navigation dans le labyrinthe' : 'Maze navigation animation'}
          loading="lazy"
        />
      </div>

      <div className="maze-section-intro">
        <span className="maze-section-index">01</span>
        <div>
          <h3>{isFr ? 'Architecture fonctionnelle' : 'System architecture'}</h3>
          <p>{isFr ? 'Chaîne de traitement de la perception de l’environnement à l’évaluation des trajectoires.' : 'Processing pipeline from environment state to trajectory evaluation.'}</p>
        </div>
      </div>

      <div className="maze-architecture">
        {architecture.map((item, index) => (
          <div className="maze-architecture-node" key={item.n}>
            <span>{item.n}</span>
            <strong>{isFr ? item.titleFr : item.title}</strong>
            <p>{isFr ? item.descFr : item.desc}</p>
            {index < architecture.length - 1 && <i aria-hidden="true">→</i>}
          </div>
        ))}
      </div>
      <p className="maze-chart-note">
        {isFr
          ? 'Le filtre géométrique de trajectoire est intégré au gestionnaire. Le module CBF présenté dans le dépôt est expérimental et reste séparé de cette chaîne.'
          : 'The geometric trajectory filter is integrated into the manager. The CBF module in the research repository is experimental and remains separate from this pipeline.'}
      </p>

      <div className="maze-benchmark-label">
        <span className="maze-status-dot" />
        {isFr ? 'BENCHMARK STATIQUE · 25 × 25 · SEED 42' : 'STATIC BENCHMARK · 25 × 25 · SEED 42'}
      </div>

      <div className="maze-kpi-grid">
        {staticMetrics.map((metric, index) => (
          <motion.article
            className="maze-kpi"
            key={metric.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <strong><AnimatedNumber value={metric.value} suffix={metric.suffix} /></strong>
            <span>{isFr ? metric.labelFr : metric.label}</span>
            <p>{isFr ? metric.detailFr : metric.detail}</p>
          </motion.article>
        ))}
      </div>

      <div className="maze-section-intro">
        <span className="maze-section-index">02</span>
        <div>
          <h3>{isFr ? 'Évolution temporelle' : 'Temporal evolution'}</h3>
          <p>{isFr ? 'Historique cumulé échantillonné tous les 100 cycles sur 2 000 cycles.' : 'Cumulative history sampled every 100 cycles across the 2,000-cycle run.'}</p>
        </div>
      </div>

      <article className="maze-chart-card maze-chart-card-wide">
        <div className="maze-chart-heading">
          <h3>{isFr ? 'Mouvements réussis et bloqués' : 'Successful and blocked moves'}</h3>
          <span>Cycle 1–2,000 · {s.simulationTime.toFixed(2)} s</span>
        </div>
        <div className="maze-chart maze-chart-tall">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[...s.series]} margin={{ top: 10, right: 18, bottom: 0, left: 4 }}>
              <defs>
                <linearGradient id="mazeMovesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.teal} stopOpacity={0.32} />
                  <stop offset="95%" stopColor={palette.teal} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="mazeBlockedFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.blue} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={palette.blue} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={palette.grid} strokeDasharray="3 4" />
              <XAxis dataKey="cycle" tick={{ fill: '#8ca4c2', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#8ca4c2', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={(value) => `${isFr ? 'Cycle' : 'Cycle'} ${value}`} />
              <Legend wrapperStyle={{ color: palette.text, fontSize: 10 }} />
              <Area type="monotone" dataKey="blocked" name={isFr ? 'Bloqués' : 'Blocked'} stroke={palette.blue} fill="url(#mazeBlockedFill)" strokeWidth={2} />
              <Area type="monotone" dataKey="moves" name={isFr ? 'Réussis' : 'Successful'} stroke={palette.teal} fill="url(#mazeMovesFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="maze-chart-note">
          {isFr
            ? 'Les mouvements réussis atteignent 217 au cycle 100 puis restent constants. Les blocages continuent d’augmenter jusqu’à 13 853 : le système entre dans une phase de stagnation prolongée.'
            : 'Successful moves reach 217 by cycle 100 and then remain unchanged. Blocked moves continue rising to 13,853, indicating prolonged stagnation.'}
        </p>
      </article>

      <div className="maze-charts-grid">
        <article className="maze-chart-card">
          <div className="maze-chart-heading">
            <h3>{isFr ? 'Origine des rejets comptabilisés' : 'Recorded rejection categories'}</h3>
            <span>13,853 {isFr ? 'blocages' : 'blocked'}</span>
          </div>
          <div className="maze-chart maze-chart-tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rejectionData} layout="vertical" margin={{ top: 4, right: 18, bottom: 4, left: 8 }}>
                <CartesianGrid stroke={palette.grid} horizontal={false} />
                <XAxis type="number" tick={{ fill: '#8ca4c2', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey={isFr ? 'nameFr' : 'name'} width={125} tick={{ fill: palette.text, fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => [Number(value).toLocaleString('en-US'), isFr ? 'Événements' : 'Events']} />
                <Bar dataKey="value" name={isFr ? 'Événements' : 'Events'} radius={[0, 5, 5, 0]} barSize={19}>
                  {rejectionData.map((item) => <Cell key={item.name} fill={item.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="maze-chart-note">
            {isFr
              ? 'Catégories enregistrées par le gestionnaire. Les blocages de sécurité robot sont distincts des conflits de destination et des rejets de coordination.'
              : 'Categories recorded by the manager. Robot safety blocks are distinct from destination conflicts and coordination rejections.'}
          </p>
        </article>

        <article className="maze-chart-card">
          <div className="maze-chart-heading">
            <h3>{isFr ? 'Taux d’achèvement' : 'Goal completion'}</h3>
            <span>10 {isFr ? 'agents' : 'agents'}</span>
          </div>
          <div className="maze-completion-visual">
            <div className="maze-donut">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={completionData} dataKey="value" nameKey={isFr ? 'nameFr' : 'name'} innerRadius="68%" outerRadius="92%" paddingAngle={3} stroke="none">
                    <Cell fill={palette.teal} />
                    <Cell fill={palette.muted} />
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}/10`, isFr ? 'Agents' : 'Agents']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="maze-donut-center">
                <strong>30%</strong>
                <span>{isFr ? 'réussite' : 'completed'}</span>
              </div>
            </div>
            <div className="maze-legend">
              <p><i className="maze-legend-reached" />{isFr ? '3 objectifs atteints' : '3 goals reached'}</p>
              <p><i className="maze-legend-pending" />{isFr ? '7 non atteints' : '7 not reached'}</p>
            </div>
          </div>
          <p className="maze-chart-note">
            {isFr ? 'Résultat final après 2 000 cycles. Aucun agent n’a enregistré de collision.' : 'Final result after 2,000 cycles. No agent recorded a collision.'}
          </p>
        </article>
      </div>

      <div className="maze-section-intro">
        <span className="maze-section-index">03</span>
        <div>
          <h3>{isFr ? 'Analyse individuelle des agents' : 'Per-agent analysis'}</h3>
          <p>{isFr ? 'Comparaison des déplacements et du temps de planification rapporté par chaque agent.' : 'Comparison of moves and reported planning time for each agent.'}</p>
        </div>
      </div>

      <div className="maze-charts-grid">
        <article className="maze-chart-card">
          <div className="maze-chart-heading">
            <h3>{isFr ? 'Déplacements par agent' : 'Moves per agent'}</h3>
            <span>R01–R10</span>
          </div>
          <div className="maze-chart maze-chart-tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentMoves} margin={{ top: 8, right: 12, bottom: 4, left: -15 }}>
                <CartesianGrid stroke={palette.grid} vertical={false} />
                <XAxis dataKey="label" tick={{ fill: '#8ca4c2', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8ca4c2', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: palette.text, fontSize: 10 }} />
                <Bar dataKey="movesClassical" name={isFr ? 'Classiques' : 'Classical'} stackId="agents" fill={palette.blue} />
                <Bar dataKey="movesQuantum" name={isFr ? 'Hybrides quantiques' : 'Hybrid quantum'} stackId="agents" fill={palette.violet} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="maze-chart-note">
            {isFr ? 'Le nombre de déplacements exécutés n’est pas équivalent à la longueur du chemin planifié.' : 'Executed moves are not equivalent to planned path length.'}
          </p>
        </article>

        <article className="maze-chart-card">
          <div className="maze-chart-heading">
            <h3>{isFr ? 'Temps de planification par agent' : 'Planning time per agent'}</h3>
            <span>{isFr ? 'Échelle logarithmique' : 'Logarithmic scale'}</span>
          </div>
          <div className="maze-chart maze-chart-tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentPlanning} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid stroke={palette.grid} horizontal={false} />
                <XAxis type="number" scale="log" domain={[0.05, 30000]} tick={{ fill: '#8ca4c2', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="id" width={38} tick={{ fill: palette.text, fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${Number(value).toLocaleString('en-US')} ms`, isFr ? 'Planification' : 'Planning']} />
                <Bar dataKey="planningTimeMs" name={isFr ? 'Temps (ms)' : 'Time (ms)'} radius={[0, 5, 5, 0]} barSize={15}>
                  {agentPlanning.map((agent) => <Cell key={agent.id} fill={agent.family === 'classical' ? palette.blue : palette.violet} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="maze-chart-note">
            {isFr ? 'Les temps sont issus des mesures individuelles du benchmark. L’échelle logarithmique rend visibles les deux familles de planificateurs.' : 'Times come from individual benchmark measurements. The logarithmic scale makes both planner families visible.'}
          </p>
        </article>
      </div>

      <div className="maze-agent-table-wrap">
        <table className="maze-agent-table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>{isFr ? 'Famille' : 'Family'}</th>
              <th>{isFr ? 'Départ' : 'Start'}</th>
              <th>{isFr ? 'Objectif' : 'Goal'}</th>
              <th>{isFr ? 'Final' : 'Final'}</th>
              <th>{isFr ? 'Replans' : 'Replans'}</th>
              <th>{isFr ? 'Résultat' : 'Outcome'}</th>
            </tr>
          </thead>
          <tbody>
            {s.robots.map((agent) => (
              <tr key={agent.id}>
                <td>{agent.id}</td>
                <td><span className={`maze-family-tag ${agent.family}`}>{agent.family === 'classical' ? 'Classical' : 'Hybrid Q.'}</span></td>
                <td>{agent.start.join(', ')}</td>
                <td>{agent.goal.join(', ')}</td>
                <td>{agent.final.join(', ')}</td>
                <td>{agent.replans}</td>
                <td className={agent.reached ? 'maze-outcome-success' : 'maze-outcome-pending'}>
                  {agent.reached ? (isFr ? 'Atteint' : 'Reached') : (isFr ? 'Non atteint' : 'Not reached')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="maze-section-intro">
        <span className="maze-section-index">04</span>
        <div>
          <h3>{isFr ? 'Comparaison A* et marche quantique hybride' : 'A* vs hybrid quantum walk'}</h3>
          <p>{isFr ? 'Trois graines communes : 42, 43 et 44. Même longueur de chemin et même taux d’achèvement.' : 'Three shared seeds: 42, 43 and 44. Same path length and completion rate.'}</p>
        </div>
      </div>

      <div className="maze-charts-grid">
        <article className="maze-chart-card">
          <div className="maze-chart-heading">
            <h3>{isFr ? 'Latence moyenne de planification' : 'Mean planning latency'}</h3>
            <span>{isFr ? '3 essais · ms' : '3 runs · ms'}</span>
          </div>
          <div className="maze-chart maze-chart-tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={baselineMeans} margin={{ top: 10, right: 18, bottom: 5, left: 0 }}>
                <CartesianGrid stroke={palette.grid} vertical={false} />
                <XAxis dataKey="algorithm" tick={{ fill: palette.text, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis scale="log" domain={[0.1, 10000]} tick={{ fill: '#8ca4c2', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${Number(value).toFixed(3)} ms`, isFr ? 'Latence moyenne' : 'Mean latency']} />
                <Bar dataKey="meanLatency" name={isFr ? 'Latence moyenne' : 'Mean latency'} radius={[5, 5, 0, 0]} barSize={54}>
                  <Cell fill={palette.blue} />
                  <Cell fill={palette.violet} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="maze-chart-note">
            {isFr ? 'La moyenne est calculée sur trois exécutions par méthode. Axe vertical logarithmique.' : 'Mean calculated over three runs per method. Logarithmic vertical axis.'}
          </p>
        </article>

        <article className="maze-chart-card">
          <div className="maze-chart-heading">
            <h3>{isFr ? 'Résultats sur les trois graines' : 'Results across three seeds'}</h3>
            <span>42 · 43 · 44</span>
          </div>
          <div className="maze-baseline-summary">
            {baselineMeans.map((item) => (
              <div key={item.algorithm}>
                <span>{item.algorithm}</span>
                <strong>{item.completion}/3</strong>
                <small>{isFr ? 'succès · chemin moyen' : 'completed · mean path'} {item.meanPath.toFixed(1)}</small>
                <small>{isFr ? 'latence moyenne' : 'mean latency'} {item.meanLatency.toFixed(3)} ms</small>
              </div>
            ))}
          </div>
          <p className="maze-chart-note">
            {isFr ? 'Les deux méthodes terminent les trois essais avec un chemin de longueur 8. La marche quantique simulée est nettement plus lente dans cette configuration.' : 'Both methods complete all three runs with path length 8. The simulated quantum walk is substantially slower in this setup.'}
          </p>
        </article>
      </div>

      <div className="maze-section-intro">
        <span className="maze-section-index">05</span>
        <div>
          <h3>{isFr ? 'Pilote avec obstacle mobile' : 'Moving-obstacle pilot'}</h3>
          <p>{isFr ? 'Expérience distincte : deux agents, une grille 7 × 7 et 20 cycles.' : 'Separate experiment: two agents, a 7 × 7 grid and 20 cycles.'}</p>
        </div>
      </div>

      <article className="maze-dynamic-card">
        <div>
          <span className="maze-dynamic-eyebrow">{isFr ? 'EXPÉRIENCE DISTINCTE · SEED 42' : 'SEPARATE EXPERIMENT · SEED 42'}</span>
          <h3>{isFr ? 'Essai dynamique préliminaire' : 'Preliminary dynamic pilot'}</h3>
          <p>
            {isFr
              ? 'Un obstacle mobile est actualisé à intervalles de 0,10 s. Les deux agents atteignent leur objectif en 20 cycles. Ce pilote court ne constitue pas une validation statistique générale.'
              : 'One moving obstacle is updated at 0.10 s intervals. Both agents reach their goals within 20 cycles. This short pilot is not a general statistical validation.'}
          </p>
        </div>
        <div className="maze-dynamic-stats">
          <div><strong>2/2</strong><span>{isFr ? 'objectifs atteints' : 'goals reached'}</span></div>
          <div><strong>20</strong><span>{isFr ? 'cycles' : 'cycles'}</span></div>
          <div><strong>18</strong><span>{isFr ? 'mouvements réussis' : 'successful moves'}</span></div>
          <div><strong>1</strong><span>{isFr ? 'conflit de destination' : 'destination conflict'}</span></div>
        </div>
      </article>

      <article className="maze-chart-card maze-chart-card-wide">
        <div className="maze-chart-heading">
          <h3>{isFr ? 'Événements au fil des cycles' : 'Events across simulation cycles'}</h3>
          <span>20 {isFr ? 'cycles' : 'cycles'}</span>
        </div>
        <div className="maze-chart maze-chart-tall">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[...d.series]} margin={{ top: 10, right: 15, bottom: 5, left: 0 }}>
              <CartesianGrid stroke={palette.grid} strokeDasharray="3 4" />
              <XAxis dataKey="cycle" tick={{ fill: '#8ca4c2', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8ca4c2', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={(value) => `${isFr ? 'Cycle' : 'Cycle'} ${value}`} />
              <Legend wrapperStyle={{ color: palette.text, fontSize: 10 }} />
              <Line type="stepAfter" dataKey="moved" name={isFr ? 'Mouvements exécutés' : 'Executed moves'} stroke={palette.teal} strokeWidth={2} dot={false} />
              <Line type="stepAfter" dataKey="blocked" name={isFr ? 'Mouvements bloqués' : 'Blocked moves'} stroke={palette.amber} strokeWidth={2} dot={false} />
              <Line type="stepAfter" dataKey="replanned" name={isFr ? 'Replanifications' : 'Replans'} stroke={palette.violet} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="maze-event-strip">
          {d.series.filter((row) => row.obstacleUpdated).map((row) => (
            <span key={row.cycle}>{isFr ? 'Obstacle actualisé' : 'Obstacle updated'} · C{row.cycle}</span>
          ))}
        </div>
        <p className="maze-chart-note">
          {isFr ? 'Les mises à jour de l’obstacle sont observées aux cycles 3, 6, 9, 12, 15 et 18. Aucun blocage de sécurité robot ou obstacle n’est comptabilisé dans ce pilote.' : 'Obstacle updates occur at cycles 3, 6, 9, 12, 15 and 18. No robot-safety or obstacle-safety blocks are recorded in this pilot.'}
        </p>
      </article>

      <div className="maze-project-resources">
        <div className="maze-section-intro">
          <span className="maze-section-index">06</span>
          <div>
            <h3>{isFr ? 'Ressources du projet' : 'Project resources'}</h3>
            <p>{isFr ? 'Dépôt du code source et accès à la publication scientifique.' : 'Source-code repository and scientific publication access.'}</p>
          </div>
        </div>
        <div className="maze-resource-grid">
          <a
            className="maze-resource-card maze-resource-link"
            href="https://github.com/khourdouch-amine/Secure-Dynamic-Multi-Agent-Maze-Race"
            target="_blank"
            rel="noreferrer"
          >
            <span className="maze-resource-label">GitHub</span>
            <strong>{isFr ? 'Dépôt du code source' : 'Source code repository'}</strong>
            <span className="maze-resource-action">{isFr ? 'Consulter le dépôt' : 'View repository'} ↗</span>
          </a>
          <div className="maze-resource-card maze-resource-pending" aria-disabled="true">
            <span className="maze-resource-label">Publication</span>
            <strong>{isFr ? 'Article scientifique' : 'Scientific article'}</strong>
            <span className="maze-resource-action">{isFr ? 'À venir' : 'Coming soon'}</span>
          </div>
        </div>
      </div>

      <p className="maze-method-note">
        {isFr
          ? 'Précaution méthodologique : le benchmark à dix agents est statique (aucun mur dynamique ni obstacle mobile). Il enregistre 23 blocages de trajectoire robot, sans collision comptabilisée et sans blocage de sécurité obstacle. Le pilote dynamique à deux agents est une expérience séparée et limitée. Les contrôles géométriques sont simulés et ne constituent pas une preuve formelle de sûreté physique. Le module CBF est expérimental et n’est pas intégré au gestionnaire multi-agent. Les approches quantiques sont hybrides et simulées sur matériel classique ; aucun gain quantique n’est revendiqué. 127 tests ciblés passent dans le dépôt de recherche.'
          : 'Methodological note: the ten-agent benchmark is static (no dynamic walls or moving obstacles). It records 23 robot trajectory safety blocks, no counted collisions and no obstacle-safety blocks. The two-agent dynamic pilot is a separate, limited experiment. Geometric checks are simulated and do not constitute formal proof of physical safety. The CBF module is experimental and is not integrated into the multi-agent manager. Quantum approaches are hybrid and simulated on classical hardware; no quantum advantage is claimed. 127 focused tests pass in the research repository.'}
      </p>
    </section>
  )
}

export default MazeRaceDashboard
