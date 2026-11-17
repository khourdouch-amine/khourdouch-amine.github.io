import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Activity,
  ArrowLeft,
  BrainCircuit,
  Gauge,
  GitBranch,
  FileText,
  ArrowUpRight,
  Radio,
  ShieldCheck,
  Thermometer,
  Waves,
  Zap,
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
import './MotorDashboard.css'

const Motor3DScene = lazy(() => import('./Motor3DScene'))

const robustnessData = [
  { noise: '0%', accuracy: 98.94, f1: 98.35, auc: 99.89 },
  { noise: '5%', accuracy: 98.83, f1: 98.17, auc: 99.90 },
  { noise: '10%', accuracy: 98.79, f1: 98.11, auc: 99.84 },
  { noise: '20%', accuracy: 97.89, f1: 96.70, auc: 99.51 },
  { noise: '30%', accuracy: 96.75, f1: 94.95, auc: 99.06 },
]

const scenarioTypes = [
  {
    id: 'normal',
    en: 'Normal operation',
    fr: 'Fonctionnement normal',
    detailEn: 'Reference operating condition',
    detailFr: 'Condition de fonctionnement de référence',
    color: '#00c9b7',
  },
  {
    id: 'variable',
    en: 'Variable load',
    fr: 'Charge variable',
    detailEn: 'Time-varying mechanical demand',
    detailFr: 'Demande mécanique variable dans le temps',
    color: '#8b9eff',
  },
  {
    id: 'overload',
    en: 'Overload',
    fr: 'Surcharge',
    detailEn: 'Increased mechanical load',
    detailFr: 'Augmentation de la charge mécanique',
    color: '#ffad66',
  },
  {
    id: 'bearing',
    en: 'Bearing fault',
    fr: 'Défaut de roulement',
    detailEn: 'Synthetic vibration anomaly',
    detailFr: 'Anomalie vibratoire synthétique',
    color: '#ed8294',
  },
  {
    id: 'combined',
    en: 'Combined faults',
    fr: 'Défauts combinés',
    detailEn: 'Combined simulated degradation',
    detailFr: 'Dégradation simulée combinée',
    color: '#b49aff',
  },
]

const featureDefinitions = [
  {
    name: 'RMS',
    en: 'Root mean square',
    fr: 'Valeur quadratique moyenne',
    formula: '√mean(x²)',
    unit: 'm/s²',
  },
  {
    name: 'Standard deviation',
    en: 'Dispersion within the window',
    fr: 'Dispersion dans la fenêtre',
    formula: 'std(x)',
    unit: 'm/s²',
  },
  {
    name: 'Crest factor',
    en: 'Peak-to-RMS ratio',
    fr: 'Rapport crête / RMS',
    formula: 'max(|x|) / RMS',
    unit: '—',
  },
]

function MotorDashboard() {
  const { language } = useLanguage()
  const isFr = language === 'FR'

  const text = {
    back: isFr ? 'Retour au portfolio' : 'Back to portfolio',
    discipline: isFr ? 'INGÉNIERIE ÉLECTROMÉCANIQUE' : 'ELECTROMECHANICAL ENGINEERING',
    status: isFr ? 'PROJET D’INGÉNIERIE' : 'ENGINEERING PROJECT',
    title: isFr
      ? 'Jumeau numérique d’un moteur asynchrone triphasé'
      : 'Digital Twin of a Three-Phase Induction Motor',
    subtitle: isFr
      ? 'Modélisation électromécanique · Simulation numérique · Surveillance conditionnelle'
      : 'Electromechanical modelling · Numerical simulation · Condition monitoring',
    intro: isFr
      ? 'Une étude numérique du comportement d’une machine asynchrone, associant scénarios de fonctionnement, indicateurs vibratoires et exploration de méthodes de détection de défauts.'
      : 'A numerical study of induction-machine behaviour, combining operating scenarios, vibration indicators and an exploration of fault-detection methods.',
    scope: isFr ? 'PÉRIMÈTRE DE L’ÉTUDE' : 'STUDY SCOPE',
    scopeTitle: isFr ? 'Du modèle physique aux indicateurs de surveillance' : 'From physical modelling to condition indicators',
    scopeText: isFr
      ? 'Le workflow relie la représentation du moteur, la génération de scénarios de fonctionnement et l’analyse de signaux vibratoires synthétiques. Il constitue une étude méthodologique, et non un jumeau numérique industriel validé.'
      : 'The workflow connects a motor representation, operating-scenario generation and the analysis of synthetic vibration signals. It is a methodological study, not a validated industrial digital twin.',
    architecture: isFr ? 'Architecture du système' : 'System architecture',
    simulation: isFr ? 'Simulation des scénarios' : 'Scenario simulation',
    indicators: isFr ? 'Indicateurs vibratoires' : 'Vibration indicators',
    detection: isFr ? 'Détection de défauts' : 'Fault detection',
    results: isFr ? 'RÉSULTATS NUMÉRIQUES' : 'NUMERICAL RESULTS',
    resultsTitle: isFr ? 'Évaluation sur données synthétiques' : 'Evaluation on synthetic data',
    resultsNote: isFr
      ? 'Résultats issus du jeu de test synthétique. Ils ne représentent pas des performances industrielles ni une validation sur machine réelle.'
      : 'Results obtained on the synthetic test set. They do not represent industrial performance or validation on a real machine.',
    accuracy: 'Accuracy',
    f1: 'F1-score',
    auc: 'ROC-AUC',
    windows: isFr ? 'Fenêtres analysées' : 'Analysed windows',
    robustness: isFr ? 'ROBUSTESSE NUMÉRIQUE' : 'NUMERICAL ROBUSTNESS',
    robustnessTitle: isFr ? 'Sensibilité aux perturbations des entrées' : 'Sensitivity to input perturbations',
    robustnessText: isFr
      ? 'Moyennes de 30 répétitions par niveau. Un bruit gaussien synthétique est ajouté aux trois caractéristiques d’entrée du jeu de test, sans réentraînement du modèle.'
      : 'Means over 30 repetitions per level. Synthetic Gaussian noise is added to the three test-set input features, without retraining the model.',
    noise: isFr ? 'Bruit ajouté' : 'Added noise',
    performance: isFr ? 'Performance (%)' : 'Performance (%)',
    featureTitle: isFr ? 'Indicateurs extraits du signal' : 'Extracted signal features',
    featureText: isFr
      ? 'Trois caractéristiques calculées sur chaque fenêtre vibratoire de cinq secondes. Elles constituent les entrées du classifieur.'
      : 'Three features computed for each five-second vibration window. They form the classifier inputs.',
    methodology: isFr ? 'MÉTHODOLOGIE' : 'METHODOLOGY',
    methodologyTitle: isFr ? 'Chaîne de traitement' : 'Processing pipeline',
    limits: isFr ? 'LIMITES SCIENTIFIQUES' : 'SCIENTIFIC LIMITATIONS',
    limitsTitle: isFr ? 'Ce que ces résultats permettent — et ne permettent pas — de conclure' : 'What these results do — and do not — establish',
    future: isFr ? 'PERSPECTIVES' : 'FUTURE DIRECTIONS',
    futureTitle: isFr ? 'Vers une validation expérimentale' : 'Towards experimental validation',
    resources: isFr ? 'RESSOURCES' : 'RESOURCES',
    synthetic: isFr ? 'DONNÉES SYNTHÉTIQUES' : 'SYNTHETIC DATA',
    illustrative: isFr ? 'GÉOMÉTRIE ILLUSTRATIVE' : 'ILLUSTRATIVE GEOMETRY',
    footer: isFr ? 'Modélisation · Simulation · Surveillance conditionnelle' : 'Modelling · Simulation · Condition monitoring',
  }

  const methods = [
    {
      number: '01',
      title: isFr ? 'Génération des scénarios' : 'Scenario generation',
      description: isFr
        ? '20 scénarios indépendants répartis en cinq familles de fonctionnement et de défauts.'
        : '20 independent scenarios distributed across five operating and fault categories.',
    },
    {
      number: '02',
      title: isFr ? 'Extraction des indicateurs' : 'Feature extraction',
      description: isFr
        ? 'Fenêtres vibratoires de 5 secondes, avec calcul du RMS, de l’écart-type et du facteur de crête.'
        : 'Five-second vibration windows, with RMS, standard deviation and crest-factor computation.',
    },
    {
      number: '03',
      title: isFr ? 'Séparation des données' : 'Dataset separation',
      description: isFr
        ? 'Séparation par identifiant de scénario afin d’éviter le partage d’un même scénario entre apprentissage et test.'
        : 'Scenario-ID-based split to prevent the same scenario from appearing in both training and test sets.',
    },
    {
      number: '04',
      title: isFr ? 'Apprentissage et évaluation' : 'Training and evaluation',
      description: isFr
        ? 'Random Forest de 300 arbres, évaluation sur scénarios réservés et étude de sensibilité au bruit.'
        : 'A 300-tree Random Forest, evaluation on held-out scenarios and a noise-sensitivity study.',
    },
  ]

  const limitations = isFr
    ? [
        'Les signaux vibratoires sont des niveaux RMS synthétiques, et non des formes d’onde brutes issues d’un accéléromètre.',
        'Aucune validation expérimentale sur un moteur physique n’est établie par ces résultats.',
        'Les performances dépendent des hypothèses et de la distribution des scénarios simulés.',
        'Les perturbations gaussiennes étudiées ne constituent pas une caractérisation métrologique du bruit réel des capteurs.',
        'La géométrie 3D présentée est procédurale et illustrative, sans reconstruction CAO dimensionnelle validée.',
      ]
    : [
        'Vibration signals are synthetic RMS-level values, not raw waveforms acquired from an accelerometer.',
        'No experimental validation on a physical motor is established by these results.',
        'Performance depends on the assumptions and distribution of the simulated scenarios.',
        'The Gaussian perturbations are not a metrological characterization of real sensor noise.',
        'The displayed 3D geometry is procedural and illustrative, not a validated dimensional CAD reconstruction.',
      ]

  const future = isFr
    ? [
        'Acquérir des signaux réels de courant, vibration et température sur une machine instrumentée.',
        'Comparer les réponses du modèle aux mesures physiques et quantifier les incertitudes.',
        'Étudier la généralisation à des régimes de charge et des défauts non observés.',
        'Évaluer des méthodes de détection en ligne et de maintenance prédictive.',
      ]
    : [
        'Acquire real current, vibration and temperature signals from an instrumented machine.',
        'Compare model responses with physical measurements and quantify uncertainty.',
        'Study generalisation to unseen load regimes and fault conditions.',
        'Evaluate online detection and predictive-maintenance methods.',
      ]

  return (
    <main className="motor-dashboard">
      <header className="motor-topbar">
        <Link className="motor-brand" to="/">
          <span className="motor-brand-mark">KA<span>.</span></span>
          <span>ENGINEERING RESEARCH</span>
        </Link>
        <Link className="motor-back" to="/">
          <ArrowLeft size={15} />
          {text.back}
        </Link>
      </header>

      <section className="motor-hero">
        <div className="motor-hero-inner">
          <div className="motor-eyebrow">
            <span>01 / 12</span>
            <span>{text.discipline}</span>
            <span>{text.status}</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <h1>{text.title}</h1>
            <p className="motor-subtitle">{text.subtitle}</p>
            <div className="motor-hero-bottom">
              <p>{text.intro}</p>
              <div className="motor-hero-stamp">
                <span>MATLAB / SIMULINK</span>
                <span>PYTHON</span>
                <span>RANDOM FOREST</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="motor-section motor-scope">
        <div className="motor-section-heading">
          <span>01 / {text.scope}</span>
          <h2>{text.scopeTitle}</h2>
          <p>{text.scopeText}</p>
        </div>
        <div className="motor-kpis">
          <article className="motor-kpi">
            <Activity />
            <strong>20</strong>
            <span>{isFr ? 'Scénarios simulés' : 'Simulated scenarios'}</span>
          </article>
          <article className="motor-kpi">
            <Gauge />
            <strong>600 s</strong>
            <span>{isFr ? 'Durée par scénario' : 'Duration per scenario'}</span>
          </article>
          <article className="motor-kpi">
            <Waves />
            <strong>2,384</strong>
            <span>{text.windows}</span>
          </article>
          <article className="motor-kpi">
            <BrainCircuit />
            <strong>300</strong>
            <span>{isFr ? 'Arbres Random Forest' : 'Random Forest trees'}</span>
          </article>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="motor-scene-loading">
            {isFr ? 'Chargement de la scène 3D…' : 'Loading 3D scene…'}
          </div>
        }
      >
        <Motor3DScene language={language} />
      </Suspense>

      <section className="motor-section">
        <div className="motor-section-heading">
          <span>02 / {isFr ? 'SCÉNARIOS' : 'SCENARIOS'}</span>
          <h2>{isFr ? 'Cinq familles de fonctionnement étudiées' : 'Five operating and fault categories'}</h2>
          <p>
            {isFr
              ? 'Chaque famille comporte quatre scénarios indépendants générés numériquement.'
              : 'Each category contains four independently generated numerical scenarios.'}
          </p>
        </div>
        <div className="motor-scenario-grid">
          {scenarioTypes.map((scenario, index) => (
            <article className="motor-scenario" key={scenario.id}>
              <div className="motor-scenario-index">0{index + 1}</div>
              <div className="motor-scenario-indicator" style={{ background: scenario.color }} />
              <h3>{isFr ? scenario.fr : scenario.en}</h3>
              <p>{isFr ? scenario.detailFr : scenario.detailEn}</p>
              <span>04 {isFr ? 'SCÉNARIOS' : 'SCENARIOS'}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="motor-section">
        <div className="motor-section-heading">
          <span>03 / {text.results}</span>
          <h2>{text.resultsTitle}</h2>
          <p>{text.resultsNote}</p>
        </div>
        <div className="motor-results-grid">
          <article className="motor-result-card">
            <span>{text.accuracy}</span>
            <strong>98.94<small>%</small></strong>
            <p>{isFr ? 'Exactitude globale' : 'Overall classification accuracy'}</p>
          </article>
          <article className="motor-result-card">
            <span>{text.f1}</span>
            <strong>98.35<small>%</small></strong>
            <p>{isFr ? 'Équilibre précision / rappel' : 'Precision / recall balance'}</p>
          </article>
          <article className="motor-result-card">
            <span>{text.auc}</span>
            <strong>99.89<small>%</small></strong>
            <p>{isFr ? 'Capacité de classement' : 'Ranking discrimination'}</p>
          </article>
        </div>
        <div className="motor-result-context">
          <ShieldCheck size={19} />
          <p>
            {isFr
              ? 'Jeu de test : 472 fenêtres issues de quatre scénarios réservés (IDs 14, 16, 18 et 20). Les résultats caractérisent uniquement cette expérience numérique.'
              : 'Test set: 472 windows from four held-out scenarios (IDs 14, 16, 18 and 20). These results characterize this numerical experiment only.'}
          </p>
        </div>
      </section>

      <section className="motor-section">
        <div className="motor-section-heading">
          <span>04 / {text.robustness}</span>
          <h2>{text.robustnessTitle}</h2>
          <p>{text.robustnessText}</p>
        </div>
        <div className="motor-chart-panel">
          <div className="motor-chart-legend">
            <span><i className="motor-legend-accuracy" /> Accuracy</span>
            <span><i className="motor-legend-f1" /> F1-score</span>
            <span><i className="motor-legend-auc" /> ROC-AUC</span>
          </div>
          <div className="motor-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={robustnessData} margin={{ top: 12, right: 18, left: 0, bottom: 4 }}>
                <CartesianGrid stroke="rgba(148,163,184,.13)" strokeDasharray="3 5" />
                <XAxis dataKey="noise" tick={{ fill: '#94A3B8', fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis domain={[90, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ background: '#10233B', border: '1px solid rgba(148,163,184,.25)', borderRadius: 8 }}
                  labelStyle={{ color: '#F1F5F9' }}
                  formatter={(value) => [`${Number(value).toFixed(2)}%`]}
                  labelFormatter={(label) => `${text.noise} : ${label}`}
                />
                <Line type="monotone" dataKey="accuracy" name="Accuracy" stroke="#00C9B7" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="f1" name="F1-score" stroke="#FFAD66" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="auc" name="ROC-AUC" stroke="#8B9EFF" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="motor-robustness-table">
            {robustnessData.map((item) => (
              <div key={item.noise}>
                <strong>{item.noise}</strong>
                <span>{item.accuracy.toFixed(2)}%</span>
                <span>{item.f1.toFixed(2)}%</span>
                <span>{item.auc.toFixed(2)}%</span>
              </div>
            ))}
          </div>
          <p className="motor-chart-note">
            {isFr
              ? 'Les écarts-types sont calculés sur 30 répétitions. À 0 % de bruit, les répétitions sont identiques car le test est déterministe.'
              : 'Standard deviations are computed over 30 repetitions. At 0% noise, repetitions are identical because the baseline test is deterministic.'}
          </p>
        </div>
      </section>

      <section className="motor-section">
        <div className="motor-section-heading">
          <span>05 / {isFr ? 'ANALYSE DES VARIABLES' : 'FEATURE ANALYSIS'}</span>
          <h2>{text.featureTitle}</h2>
          <p>{text.featureText}</p>
        </div>
        <div className="motor-feature-panel">
          <div className="motor-feature-grid">
            {featureDefinitions.map((feature, index) => (
              <article className="motor-feature-card" key={feature.name}>
                <span className="motor-feature-index">0{index + 1}</span>
                <h3>{feature.name}</h3>
                <p>{isFr ? feature.fr : feature.en}</p>
                <code>{feature.formula}</code>
                <small>{feature.unit}</small>
              </article>
            ))}
          </div>
          <p className="motor-chart-note">
            {isFr
              ? 'Les fenêtres contiennent 100 échantillons à 20 Hz. Le signal d’entrée est un niveau vibratoire synthétique, et non une forme d’onde accélérométrique brute.'
              : 'Each window contains 100 samples at 20 Hz. The input is a synthetic vibration-level signal, not a raw accelerometer waveform.'}
          </p>
        </div>
      </section>

      <section className="motor-section">
        <div className="motor-section-heading">
          <span>06 / {text.methodology}</span>
          <h2>{text.methodologyTitle}</h2>
        </div>
        <div className="motor-method-grid">
          {methods.map((method) => (
            <article key={method.number}>
              <span>{method.number}</span>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="motor-section motor-assessment">
        <div>
          <div className="motor-section-heading">
            <span>07 / {text.limits}</span>
            <h2>{text.limitsTitle}</h2>
          </div>
          <ul>{limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <div className="motor-section-heading">
            <span>08 / {text.future}</span>
            <h2>{text.futureTitle}</h2>
          </div>
          <ul>{future.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="motor-section">
        <div className="motor-section-heading">
          <span>09 / {text.resources}</span>
          <h2>{isFr ? 'Environnement technique' : 'Technical environment'}</h2>
        </div>
        <div className="motor-tool-grid">
          <div><Zap /><strong>MATLAB</strong><span>{isFr ? 'Modélisation numérique' : 'Numerical modelling'}</span></div>
          <div><Activity /><strong>Simulink</strong><span>{isFr ? 'Simulation système' : 'System simulation'}</span></div>
          <div><Radio /><strong>Python</strong><span>{isFr ? 'Traitement des données' : 'Data processing'}</span></div>
          <div><BrainCircuit /><strong>Scikit-learn</strong><span>{isFr ? 'Apprentissage automatique' : 'Machine learning'}</span></div>
          <div><Thermometer /><strong>NumPy</strong><span>{isFr ? 'Calcul scientifique' : 'Scientific computing'}</span></div>
          <div><Gauge /><strong>CSV / Pandas</strong><span>{isFr ? 'Analyse des données' : 'Dataset analysis'}</span></div>
        </div>
      </section>

      <section className="motor-section motor-resources">
        <div className="motor-section-heading">
          <span>10 / {isFr ? 'RESSOURCES SCIENTIFIQUES ET TECHNIQUES' : 'RESEARCH & TECHNICAL RESOURCES'}</span>
          <h2>{isFr ? 'Explorer le travail et ses ressources' : 'Explore the work and its resources'}</h2>
          <p>
            {isFr
              ? 'Consultez le document de recherche et accédez au code source du projet.'
              : 'Read the research document and access the project source code.'}
          </p>
        </div>

        <div className="motor-resource-grid">
          <a
            className="motor-resource-card"
            href="/projects/motor-digital-twin/conception-simulation-jumeau-numerique.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span className="motor-resource-icon"><FileText size={23} /></span>
            <span className="motor-resource-type">
              {isFr ? 'DOCUMENT DE RECHERCHE' : 'RESEARCH PAPER'}
            </span>
            <strong>{isFr ? 'Conception et simulation d’un jumeau numérique' : 'Design and Simulation of a Digital Twin'}</strong>
            <span className="motor-resource-description">
              {isFr
                ? 'Consulter le document scientifique au format PDF.'
                : 'Read the research document in PDF format.'}
            </span>
            <span className="motor-resource-action">
              {isFr ? 'Lire le document' : 'Read the paper'} <ArrowUpRight size={16} />
            </span>
          </a>

          <a
            className="motor-resource-card motor-resource-github"
            href="https://github.com/khourdouch-amine/motor-digital-twin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="motor-resource-icon"><GitBranch size={23} /></span>
            <span className="motor-resource-type">
              {isFr ? 'CODE SOURCE' : 'SOURCE CODE'}
            </span>
            <strong>GitHub Repository</strong>
            <span className="motor-resource-description">
              {isFr
                ? 'Explorer le dépôt, les scripts et les fichiers du projet.'
                : 'Explore the repository, scripts and project files.'}
            </span>
            <span className="motor-resource-action">
              {isFr ? 'Explorer le dépôt' : 'Explore repository'} <ArrowUpRight size={16} />
            </span>
          </a>
        </div>
      </section>

      <footer className="motor-footer">
        <span>KHOURDOUCH AMINE · ELECTROMECHANICAL SYSTEMS</span>
        <span>{text.footer}</span>
      </footer>
    </main>
  )
}

export default MotorDashboard
