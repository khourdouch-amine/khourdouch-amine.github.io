import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowUpRight,
  Atom,
  CheckCircle2,
  CircleAlert,
  CircuitBoard,
  Clock3,
  Cpu,
  ExternalLink,
  FlaskConical,
  GitBranch,
  Grid3X3,
  Route,
  ShieldCheck,
  Target,
  Zap,
} from 'lucide-react'
import { useLanguage } from '../../context/useLanguage'
import './GroverDashboard.css'

const routeCells = new Set([0, 4, 5, 9, 10, 11, 15])
const obstacles = new Set([1, 6])

const classicalResults = [
  {
    id: 'astar',
    name: 'A*',
    objective: 'Shortest path',
    objectiveFr: 'Plus court chemin',
    time: 0.031438,
    valid: '30/30',
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra',
    objective: 'Shortest path',
    objectiveFr: 'Plus court chemin',
    time: 0.0282405,
    valid: '30/30',
  },
  {
    id: 'exhaustive',
    name: 'Exhaustive enumeration',
    nameFr: 'Énumération exhaustive',
    objective: 'Fixed-length route search',
    objectiveFr: 'Recherche à longueur fixe',
    time: 8.51493,
    valid: '30/30',
  },
]

const validIndices = [63, 207, 243, 783, 819, 3087, 3123]

function GroverDashboard() {
  const { language } = useLanguage()
  const isFr = language === 'FR'

  const t = {
    back: isFr ? 'Retour au portfolio' : 'Back to portfolio',
    discipline: isFr ? 'CALCUL QUANTIQUE · RECHERCHE COMBINATOIRE' : 'QUANTUM COMPUTING · COMBINATORIAL SEARCH',
    status: isFr ? 'PROTOTYPE DE RECHERCHE' : 'RESEARCH PROTOTYPE',
    title: isFr ? 'Recherche géométrique de chemins par Grover' : 'Grover Geometric Path Search',
    intro: isFr
      ? 'Étude d’un oracle de phase géométrique réversible pour rechercher des chemins de longueur fixe dans un labyrinthe avec obstacles.'
      : 'A study of a reversible geometric phase oracle for searching fixed-length paths in an obstacle-constrained maze.',
    scenario: isFr ? 'SCÉNARIO G3 · CONFIGURATION' : 'G3 SCENARIO · CONFIGURATION',
    mazeTitle: isFr ? 'Labyrinthe de référence 4 × 4' : '4 × 4 reference maze',
    mazeNote: isFr
      ? 'Un plus court chemin classique valide est mis en évidence. Les obstacles sont fixes.'
      : 'One valid classical shortest path is highlighted. Obstacles are fixed.',
    start: isFr ? 'Départ' : 'Start',
    goal: isFr ? 'Arrivée' : 'Goal',
    obstacle: isFr ? 'Obstacle' : 'Obstacle',
    route: isFr ? 'Chemin classique illustré' : 'Illustrated classical path',
    metrics: isFr ? '01 / ESPACE DE RECHERCHE' : '01 / SEARCH SPACE',
    metricsTitle: isFr ? 'Structure du problème' : 'Problem structure',
    candidates: isFr ? 'Chemins candidats' : 'Candidate paths',
    solutions: isFr ? 'Chemins valides' : 'Valid paths',
    length: isFr ? 'Longueur imposée' : 'Fixed path length',
    iterations: isFr ? 'Itérations de Grover' : 'Grover iterations',
    classical: isFr ? '02 / RÉFÉRENCES CLASSIQUES' : '02 / CLASSICAL BASELINES',
    classicalTitle: isFr ? 'Temps d’exécution mesurés' : 'Measured execution times',
    classicalNote: isFr
      ? 'Moyennes de 30 répétitions. Échelle linéaire en millisecondes. A* et Dijkstra résolvent le plus court chemin ; seule l’énumération exhaustive partage directement l’objectif de recherche à longueur fixe.'
      : 'Means over 30 repetitions. Linear scale in milliseconds. A* and Dijkstra solve the shortest-path objective; exhaustive enumeration is the direct fixed-length search comparator.',
    mean: isFr ? 'Moyenne' : 'Mean',
    validRuns: isFr ? 'Exécutions valides' : 'Valid runs',
    circuit: isFr ? '03 / RESSOURCES QUANTIQUES' : '03 / QUANTUM RESOURCES',
    circuitTitle: isFr ? 'Construction et transpilation' : 'Circuit construction and transpilation',
    circuitNote: isFr
      ? 'Mesures structurelles du circuit géométrique G3. Elles ne constituent pas un résultat de simulation.'
      : 'Structural measurements of the geometric G3 circuit. These are not simulation results.',
    qubits: isFr ? 'Qubits' : 'Qubits',
    initialDepth: isFr ? 'Profondeur initiale' : 'Initial depth',
    transpiledDepth: isFr ? 'Profondeur transpillée' : 'Transpiled depth',
    operations: isFr ? 'Opérations transpillées' : 'Transpiled operations',
    transpileTime: isFr ? 'Temps de transpilation' : 'Transpilation time',
    oracle: isFr ? 'Oracle géométrique' : 'Geometric oracle',
    oracleStatus: isFr ? 'Construit · 26 qubits' : 'Constructed · 26 qubits',
    noSimulation: isFr
      ? 'Simulation G3 non achevée'
      : 'G3 simulation not completed',
    noSimulationText: isFr
      ? 'Le checkpoint de transpilation est disponible, mais le tableau de résultats G3 ne contient aucune répétition de simulation. Aucun taux de succès quantique G3 ne peut donc être rapporté.'
      : 'The transpilation checkpoint is available, but the G3 results file contains no simulation repetitions. No G3 quantum success rate can therefore be reported.',
    lookup: isFr ? '04 / RÉFÉRENCE INDÉPENDANTE' : '04 / INDEPENDENT REFERENCE',
    lookupTitle: isFr ? 'Expérience Grover avec oracle lookup' : 'Grover experiment with lookup oracle',
    lookupNote: isFr
      ? 'Expérience distincte à 13 qubits, utilisant une table des solutions. Elle vérifie l’amplification d’amplitude idéale, pas l’exécution de l’oracle géométrique G3.'
      : 'A separate 13-qubit experiment using a lookup table of solutions. It validates ideal amplitude amplification, not execution of the geometric G3 oracle.',
    success: isFr ? 'Succès observés' : 'Observed successes',
    shots: isFr ? 'Tirs simulés' : 'Simulated shots',
    confidence: isFr ? 'IC Wilson à 95 %' : '95% Wilson CI',
    exact: isFr ? 'Probabilité exacte statevector' : 'Exact statevector probability',
    interpretation: isFr ? 'Interprétation scientifique' : 'Scientific interpretation',
    interpretationText: isFr
      ? 'Les résultats lookup sont cohérents avec la probabilité théorique de ce modèle idéal. Ils ne démontrent ni la simulation du circuit géométrique G3 à 26 qubits, ni un avantage quantique.'
      : 'The lookup results are consistent with the theoretical probability of this ideal model. They do not demonstrate simulation of the 26-qubit geometric G3 circuit or a quantum advantage.',
    methodology: isFr ? '05 / MÉTHODOLOGIE' : '05 / METHODOLOGY',
    methodologyTitle: isFr ? 'Chaîne expérimentale' : 'Experimental workflow',
    limitations: isFr ? 'LIMITES ET VALIDITÉ' : 'LIMITATIONS AND VALIDITY',
    limitationsTitle: isFr ? 'Ce que les résultats établissent' : 'What the results establish',
    resources: isFr ? 'RESSOURCES' : 'RESOURCES',
    github: isFr ? 'Dépôt GitHub' : 'GitHub repository',
    article: isFr ? 'Article scientifique' : 'Scientific article',
    preparing: isFr ? 'En préparation' : 'In preparation',
    footer: isFr
      ? 'Calcul réversible · Algorithmes quantiques · Recherche de chemins'
      : 'Reversible computing · Quantum algorithms · Path search',
  }

  const methods = [
    {
      number: '01',
      title: isFr ? 'Encodage des chemins' : 'Path encoding',
      text: isFr
        ? 'Encodage binaire des 6 déplacements dans un espace de 4 096 candidats.'
        : 'Binary encoding of six moves in a 4,096-candidate search space.',
    },
    {
      number: '02',
      title: isFr ? 'Oracle géométrique réversible' : 'Reversible geometric oracle',
      text: isFr
        ? 'Calcul des coordonnées et marquage de phase des chemins satisfaisant les contraintes.'
        : 'Coordinate computation and phase marking for paths satisfying the constraints.',
    },
    {
      number: '03',
      title: isFr ? 'Amplification de Grover' : 'Grover amplification',
      text: isFr
        ? 'Construction de 18 itérations à partir des 7 solutions comptées classiquement.'
        : 'Construction of 18 iterations based on the seven classically counted solutions.',
    },
    {
      number: '04',
      title: isFr ? 'Analyse des ressources' : 'Resource analysis',
      text: isFr
        ? 'Tests automatisés, profondeur de circuit et checkpoint de transpilation.'
        : 'Automated tests, circuit depth and transpilation checkpoint.',
    },
  ]

  const limitations = isFr
    ? [
        'Aucune simulation Aer complète du circuit géométrique G3 à 26 qubits.',
        'Le checkpoint de transpilation ne constitue pas une exécution quantique.',
        'Les 99,8 % proviennent exclusivement de l’oracle lookup indépendant à 13 qubits.',
        'Aucun essai sur matériel quantique ni avantage quantique démontré.',
      ]
    : [
        'No completed Aer simulation of the 26-qubit geometric G3 circuit.',
        'The transpilation checkpoint is not a quantum execution.',
        'The 99.8% result belongs exclusively to the independent 13-qubit lookup oracle.',
        'No quantum hardware experiment or quantum advantage has been demonstrated.',
      ]

  return (
    <main className="grover-dashboard">
      <header className="grover-topbar">
        <Link className="grover-brand" to="/">
          <span className="grover-brand-mark">KA<span>.</span></span>
          <span>ENGINEERING RESEARCH</span>
        </Link>
        <Link className="grover-back" to="/">
          <ArrowLeft size={15} />
          {t.back}
        </Link>
      </header>

      <section className="grover-hero">
        <div className="grover-hero-inner">
          <div className="grover-eyebrow">
            <span>14 / 14</span>
            <span>{t.discipline}</span>
            <span>{t.status}</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="grover-hero-icon"><Atom size={27} /></div>
            <h1>{t.title}</h1>
            <p className="grover-subtitle">{t.intro}</p>
            <div className="grover-hero-tags">
              <span>QISKIT</span><span>REVERSIBLE ORACLE</span><span>GROVER</span><span>G3 · 4×4</span>
            </div>
          </motion.div>
          <div className="grover-hero-orbit" aria-hidden="true">
            <span /><span /><span />
          </div>
        </div>
      </section>

      <section className="grover-section">
        <div className="grover-section-heading">
          <span>{t.scenario}</span>
          <h2>{t.mazeTitle}</h2>
          <p>{t.mazeNote}</p>
        </div>
        <div className="grover-maze-layout">
          <div className="grover-maze-panel">
            <div className="grover-maze-topline">
              <span>G3_4x4_L6</span>
              <span className="grover-live-dot">{isFr ? 'SCÉNARIO FIXE' : 'FIXED SCENARIO'}</span>
            </div>
            <div className="grover-maze" role="img" aria-label={isFr ? 'Grille 4 par 4 avec départ, arrivée, deux obstacles et un chemin classique valide' : '4 by 4 grid with start, goal, two obstacles and one valid classical path'}>
              {Array.from({ length: 16 }, (_, index) => (
                <motion.div
                  key={index}
                  className={[
                    'grover-cell',
                    index === 0 ? 'is-start' : '',
                    index === 15 ? 'is-goal' : '',
                    obstacles.has(index) ? 'is-obstacle' : '',
                    routeCells.has(index) ? 'is-route' : '',
                  ].filter(Boolean).join(' ')}
                  initial={{ opacity: 0.25, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.035, duration: 0.35 }}
                >
                  {index === 0 && <span>S</span>}
                  {index === 15 && <span>G</span>}
                  {obstacles.has(index) && <span>×</span>}
                  {routeCells.has(index) && index !== 0 && index !== 15 && <i />}
                </motion.div>
              ))}
              <svg className="grover-route-overlay" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
                <path d="M50 50 L50 150 L150 150 L150 250 L250 250 L350 250 L350 350" />
              </svg>
            </div>
            <div className="grover-maze-legend">
              <span><i className="legend-start" />{t.start}</span>
              <span><i className="legend-goal" />{t.goal}</span>
              <span><i className="legend-obstacle" />{t.obstacle}</span>
              <span><i className="legend-route" />{t.route}</span>
            </div>
          </div>
          <div className="grover-maze-data">
            <div className="grover-data-line"><span>{isFr ? 'Dimensions' : 'Dimensions'}</span><strong>4 × 4</strong></div>
            <div className="grover-data-line"><span>{t.start}</span><strong>(0, 0)</strong></div>
            <div className="grover-data-line"><span>{t.goal}</span><strong>(3, 3)</strong></div>
            <div className="grover-data-line"><span>{t.obstacle}s</span><strong>(1, 0) · (2, 1)</strong></div>
            <div className="grover-data-line"><span>{isFr ? 'Déplacements' : 'Moves'}</span><strong>6</strong></div>
            <div className="grover-valid-indices">
              <span>{isFr ? 'Indices des 7 solutions valides' : 'Indices of the 7 valid solutions'}</span>
              <div>{validIndices.map((value) => <code key={value}>{value}</code>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grover-section grover-section-alt">
        <div className="grover-section-heading">
          <span>{t.metrics}</span>
          <h2>{t.metricsTitle}</h2>
        </div>
        <div className="grover-kpis">
          <motion.article className="grover-kpi" whileInView={{ y: [12, 0], opacity: [0, 1] }} viewport={{ once: true }}>
            <Grid3X3 />
            <strong>4,096</strong>
            <span>{t.candidates}</span>
            <small>2¹² · 12 search bits</small>
          </motion.article>
          <motion.article className="grover-kpi" whileInView={{ y: [12, 0], opacity: [0, 1] }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <Target />
            <strong>7</strong>
            <span>{t.solutions}</span>
            <small>0.171% of the search space</small>
          </motion.article>
          <motion.article className="grover-kpi" whileInView={{ y: [12, 0], opacity: [0, 1] }} viewport={{ once: true }} transition={{ delay: 0.16 }}>
            <Route />
            <strong>6</strong>
            <span>{t.length}</span>
            <small>{isFr ? 'Déplacements par chemin' : 'Moves per route'}</small>
          </motion.article>
          <motion.article className="grover-kpi" whileInView={{ y: [12, 0], opacity: [0, 1] }} viewport={{ once: true }} transition={{ delay: 0.24 }}>
            <Zap />
            <strong>18</strong>
            <span>{t.iterations}</span>
            <small>{isFr ? 'Circuit construit' : 'Circuit constructed'}</small>
          </motion.article>
        </div>
      </section>

      <section className="grover-section">
        <div className="grover-section-heading">
          <span>{t.classical}</span>
          <h2>{t.classicalTitle}</h2>
          <p>{t.classicalNote}</p>
        </div>
        <div className="grover-benchmark">
          {classicalResults.map((item, index) => (
            <motion.article
              className="grover-benchmark-row"
              key={item.id}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="grover-benchmark-name">
                <strong>{item.id === 'exhaustive' && isFr ? item.nameFr : item.name}</strong>
                <span>{isFr ? item.objectiveFr : item.objective}</span>
              </div>
              <div className="grover-benchmark-track">
                <motion.div
                  className={`grover-benchmark-fill ${item.id}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(item.time / 8.514930466662917) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.25 + index * 0.12 }}
                />
              </div>
              <div className="grover-benchmark-value">
                <strong>{item.time.toFixed(item.id === 'exhaustive' ? 3 : 5)} ms</strong>
                <span>{t.mean}</span>
              </div>
              <div className="grover-benchmark-valid">
                <CheckCircle2 size={14} />
                <span>{item.valid}</span>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="grover-chart-footnote">
          {isFr
            ? 'Mesures sur CPU, 30 répétitions par méthode, après une exécution d’échauffement. La barre utilise une échelle linéaire.'
            : 'CPU measurements, 30 repetitions per method, after one warm-up run. Bars use a linear scale.'}
        </p>
      </section>

      <section className="grover-section grover-section-alt">
        <div className="grover-section-heading">
          <span>{t.circuit}</span>
          <h2>{t.circuitTitle}</h2>
          <p>{t.circuitNote}</p>
        </div>
        <div className="grover-circuit-status">
          <div className="grover-circuit-status-icon"><CircuitBoard size={22} /></div>
          <div><span>{t.oracle}</span><strong>{t.oracleStatus}</strong></div>
          <span className="grover-status-pill">{isFr ? 'STRUCTURE CONSTRUITE' : 'STRUCTURE BUILT'}</span>
        </div>
        <div className="grover-circuit-grid">
          <article><Cpu /><strong>26</strong><span>{t.qubits}</span></article>
          <article><GitBranch /><strong>3,243</strong><span>{t.initialDepth}</span></article>
          <article><CircuitBoard /><strong>83,588</strong><span>{t.transpiledDepth}</span></article>
          <article><Zap /><strong>104,296</strong><span>{t.operations}</span></article>
          <article><Clock3 /><strong>7.87 s</strong><span>{t.transpileTime}</span></article>
        </div>
        <div className="grover-warning">
          <CircleAlert size={21} />
          <div><strong>{t.noSimulation}</strong><p>{t.noSimulationText}</p></div>
        </div>
      </section>

      <section className="grover-section">
        <div className="grover-section-heading">
          <span>{t.lookup}</span>
          <h2>{t.lookupTitle}</h2>
          <p>{t.lookupNote}</p>
        </div>
        <div className="grover-lookup-panel">
          <div className="grover-lookup-main">
            <div className="grover-lookup-ring">
              <div><strong>99.8%</strong><span>{t.success}</span></div>
            </div>
            <div className="grover-lookup-label">
              <span>LOOKUP ORACLE · 13 QUBITS</span>
              <strong>2,994 / 3,000</strong>
              <small>{isFr ? '30 répétitions × 100 tirs' : '30 repetitions × 100 shots'}</small>
            </div>
          </div>
          <div className="grover-lookup-stats">
            <div><span>{t.confidence}</span><strong>99.5643–99.9083%</strong></div>
            <div><span>{t.exact}</span><strong>99.8337%</strong></div>
            <div><span>{isFr ? 'Échecs observés' : 'Observed failures'}</span><strong>6 / 3,000</strong></div>
          </div>
          <div className="grover-lookup-caveat">
            <ShieldCheck size={18} />
            <div><strong>{t.interpretation}</strong><p>{t.interpretationText}</p></div>
          </div>
        </div>
      </section>

      <section className="grover-section grover-section-alt">
        <div className="grover-section-heading">
          <span>{t.methodology}</span>
          <h2>{t.methodologyTitle}</h2>
        </div>
        <div className="grover-method-grid">
          {methods.map((method, index) => (
            <motion.article
              key={method.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <span>{method.number}</span>
              <h3>{method.title}</h3>
              <p>{method.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="grover-section">
        <div className="grover-section-heading">
          <span>{t.limitations}</span>
          <h2>{t.limitationsTitle}</h2>
        </div>
        <ul className="grover-limitations">
          {limitations.map((item) => <li key={item}><CircleAlert size={16} /><span>{item}</span></li>)}
        </ul>
      </section>

      <section className="grover-section grover-resources-section">
        <div className="grover-section-heading">
          <span>06 / {t.resources}</span>
          <h2>{isFr ? 'Code et publication' : 'Code and publication'}</h2>
        </div>
        <div className="grover-resources">
          <a href="https://github.com/khourdouch-amine/Grover-Geometric-Path-Search" target="_blank" rel="noreferrer">
            <GitBranch size={19} /><span><strong>{t.github}</strong><small>Source code · Experiments · Results</small></span><ArrowUpRight size={17} />
          </a>
          <div className="grover-article-resource">
            <FlaskConical size={19} /><span><strong>{t.article}</strong><small>{t.preparing}</small></span><span className="grover-preparing">{t.preparing}</span>
          </div>
        </div>
      </section>

      <footer className="grover-footer">
        <span>KHOURDOUCH AMINE · PROJECT 14</span>
        <span>{t.footer}</span>
        <a href="https://github.com/khourdouch-amine/Grover-Geometric-Path-Search" target="_blank" rel="noreferrer">
          GitHub <ExternalLink size={13} />
        </a>
      </footer>
    </main>
  )
}

export default GroverDashboard
