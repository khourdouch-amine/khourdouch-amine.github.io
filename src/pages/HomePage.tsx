import { useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useLanguage } from '../context/useLanguage'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/animations/Reveal'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BrainCircuit,
  Cpu,
  Menu,
  Network,
  Orbit,
  Radio,
  ShieldCheck,
  X,
} from 'lucide-react'
import '../App.css'

const CURRENT_YEAR = new Date().getFullYear()

const content = {
  EN: {
    nav: ['About', 'Research', 'Projects', 'Expertise', 'Publications', 'Contact'],
    eyebrow: 'MECHATRONICS ENGINEERING · COMPUTATIONAL RESEARCH',
    title: <>Engineering<br />the <span>intelligent</span><br />systems of tomorrow.</>,
    description:
      'Exploring the intersection of mechanics, electronics, robotics, artificial intelligence and applied mathematics — from theoretical foundations to intelligent engineering systems.',
    explore: 'Explore my work',
    contact: 'Get in touch',
    scroll: 'SCROLL TO EXPLORE',
    status: 'OPEN TO RESEARCH OPPORTUNITIES',
    aboutLabel: '01 / ABOUT',
    aboutTitle: 'Engineering with a scientific mindset.',
    aboutText:
      'I am a Mechatronics Engineering student focused on understanding, designing and validating intelligent systems. My approach combines physical modelling, mathematical reasoning, computational methods and engineering implementation.',
    aboutNote: 'A multidisciplinary approach to complex engineering problems.',
    researchLabel: '02 / RESEARCH DIRECTIONS',
    researchTitle: 'Where disciplines converge.',
    researchText:
      'Research interests spanning intelligent machines, mathematical modelling and computational intelligence.',
    domains: [
      ['Robotics & Autonomous Systems', 'Motion planning, navigation, manipulation and multi-agent systems.', 'robotics'],
      ['Artificial Intelligence', 'Computer vision, machine learning and intelligent perception.', 'ai'],
      ['Advanced Control', 'Model predictive control, optimal control and formal safety.', 'control'],
      ['Embedded Systems', 'Real-time systems, microcontrollers and electronic architectures.', 'embedded'],
      ['Computational Mechanics', 'Dynamic modelling, numerical simulation and multiphysics.', 'mechanics'],
      ['Quantum Computing', 'Quantum algorithms, optimization and computational physics.', 'quantum'],
    ],
    projectsLabel: '03 / SELECTED WORK',
    projectsTitle: 'Research through engineering.',
    projectsText:
      'A selection of engineering studies, prototypes and research directions. Each project has its own technical documentation and development status.',
    allProjects: 'Explore all research projects',
    expertiseLabel: '04 / TECHNICAL FOUNDATION',
    expertiseTitle: 'Tools for rigorous engineering.',
    expertise: [
      [
        'Programming & Scientific Computing',
        'Scientific programming, numerical computation and engineering data analysis.',
        'Python, C, C++, MATLAB, SQL, Bash, LaTeX; algorithms, scripting, data processing, numerical analysis and scientific computing.',
        'NumPy, SciPy, Pandas, Matplotlib; Linux, Ubuntu, Git and GitHub.',
        'Development environments, version control and reproducible computational workflows.',
      ],
      [
        'Embedded Systems & Electronics',
        'Electronic architectures, microcontrollers and real-time embedded applications.',
        'STM32, ESP32, Arduino, Raspberry Pi; embedded C/C++, sensors, actuators, instrumentation, signal acquisition and processing.',
        'UART, SPI, I²C, CAN, MQTT, Modbus/RTU; interrupts, timers, DMA, multitasking and FreeRTOS.',
        'LTspice, Proteus, KiCad; thermocouples type K, MAX6675 and Cobra3 measurement interface.',
      ],
      [
        'Control Systems & Modelling',
        'Mathematical modelling, dynamic systems and advanced control strategies.',
        'Transfer functions, state-space models, system identification, stability analysis, PID, LQR, MPC and PWM control.',
        'Motor control, thermal regulation, electromechanical systems, vehicle dynamics, UAV flight dynamics and wheel-slip regulation.',
        'MATLAB, Simulink, Stateflow, Simscape and Maple.',
      ],
      [
        'Robotics & Industrial Automation',
        'Robotic systems, autonomous navigation and industrial automation.',
        'Robot kinematics, motion planning, mobile robotics, navigation, manipulation, autonomous systems and robotic simulation.',
        'ROS 2, Gazebo, MuJoCo, Pinocchio, RoboDK, CoppeliaSim, Webots, PX4 and MATLAB Robotics System Toolbox.',
        'PLC programming, Siemens TIA Portal, Schneider PLC, Ladder, GRAFCET and ABB RobotStudio.',
      ],
      [
        'Artificial Intelligence & Computer Vision',
        'Learning-based perception, image understanding and intelligent data analysis.',
        'Machine learning, deep learning, computer vision, object detection and tracking, classification, scene analysis and visual perception.',
        'Distance and relative-speed estimation, sensor/perception fusion, defect diagnosis and predictive maintenance.',
        'PyTorch, TensorFlow, OpenCV, Ultralytics, YOLOv8, YOLO26n, ByteTrack, SegFormer, SAM2 and Depth Anything V2.',
      ],
      [
        'Automotive Engineering & ADAS',
        'Vehicle dynamics, active safety systems and model-based validation.',
        'ADAS, FCW, AEB, ACC, TTC, road perception, trajectory estimation, four-wheel vehicle modelling, tyre forces, load transfer and four-channel ABS.',
        'Kalman filtering, regression, Monte Carlo, sensitivity analysis, fault injection, scenario testing and MIL/SIL/HIL validation.',
        'ISO 26262, ASPICE, AUTOSAR, MISRA C, MC/DC, requirements traceability, MATLAB, Simulink, Stateflow, CarMaker, CANalyzer and vSignalyzer.',
      ],
      [
        'Mechanical & Multiphysics Simulation',
        'Computational mechanics, thermal sciences, fluid dynamics and structural analysis.',
        'CAD, 3D modelling, assemblies, technical drawings, material selection, prototyping, CFD, FEM/FEA, finite volumes and conjugate heat transfer.',
        'Thermodynamics, heat transfer, fluid mechanics, turbulence (k-ω SST), aerodynamics, structural dynamics, impact mechanics, energy absorption and mesh-convergence studies.',
        'CATIA V5, SolidWorks, FreeCAD, CES EduPack, COMSOL, ANSYS, Fluent, Mechanical, Abaqus, SimScale, LS-DYNA, Altair Radioss, HyperMesh, HyperWorks and LS-PrePost.',
      ],
      [
        'Quantum Computing & Optimization',
        'Quantum algorithms, hybrid computation and combinatorial optimization.',
        'Quantum circuits, quantum simulation, noise models, computational physics and quantum machine learning.',
        'QAOA, VQE, QUBO, Ising formulations and hybrid classical–quantum optimization.',
        'Qiskit, Qiskit Aer, Qiskit Machine Learning and PennyLane.',
      ],
    ],
    crossSkillsLabel: '06 / CROSS-DISCIPLINARY ENGINEERING',
    crossSkillsTitle: 'Engineering beyond disciplinary boundaries.',
    crossSkills: [
      [
        'Experimental Engineering & Validation',
        'From physical measurements to evidence-based engineering decisions.',
        'EXPERIMENTAL METHODS & PRACTICES',
        'Instrumentation, measurement protocols, experimental characterization, sensor calibration, data acquisition, signal analysis, theory–simulation–experiment correlation, unit and functional testing, model verification and validation, robustness and sensitivity studies, debugging, system integration, performance analysis, technical documentation and scientific reporting.',
      ],
      [
        'Energy & Electromechanical Systems',
        'Energy conversion, machine monitoring and advanced thermal management.',
        'ENERGY SYSTEMS & DIAGNOSTICS',
        'Three-phase induction machines, electromechanical modelling, energy balance, conversion efficiency and losses, motor monitoring, vibration diagnostics using RMS, standard deviation and crest factor, Peltier effect, Bi₂Te₃ thermoelectric modules, thermoelectric heat pumps, electronic thermal management and orbital thermal exchange.',
      ],
      [
        'IoT, Cyber-Physical Systems & Digital Twins',
        'Connecting physical assets, computational models and operational data.',
        'CONNECTED SYSTEMS & MONITORING',
        'Internet of Things (IoT), digital-twin development, cyber-physical systems, physical-system monitoring, real-time data acquisition and processing, operational-state classification, condition monitoring, intelligent supervision and predictive-maintenance workflows.',
      ],
    ],
    bookLabel: '07 / SCIENTIFIC WRITING',
    bookTitle: 'Modern Theory of Metals — From Drude to Sommerfeld',
    bookSubtitle: 'Historical, statistical and quantum perspectives on electronic conduction',
    bookDescription:
      'A theoretical study tracing the evolution of the electron theory of metals, from Drude’s classical model to Sommerfeld’s quantum description. It introduces the statistical foundations of the electron gas, Fermi–Dirac statistics, the Pauli exclusion principle and the limits of early models.',
    bookAuthorLabel: 'AUTHOR',
    bookDateLabel: 'PUBLICATION DATE',
    bookDate: 'July 2025',
    bookStatus: 'THEORETICAL AND HISTORICAL STUDY',
    bookIntroduction: 'Read the introduction',
    bookContents: 'View the contents',
    contactLabel: '05 / CONTACT',
    contactTitle: 'Let’s build something meaningful.',
    contactText:
      'Interested in research collaborations, engineering opportunities, scientific discussions or doctoral research. I would be glad to connect.',
    email: 'Send an email',
    footer: 'ENGINEERING. MATHEMATICS. INTELLIGENCE.',
    location: 'Kénitra, Morocco',
  },
  FR: {
    nav: ['À propos', 'Recherche', 'Projets', 'Expertise', 'Publications', 'Contact'],
    eyebrow: 'INGÉNIERIE MÉCATRONIQUE · RECHERCHE COMPUTATIONNELLE',
    title: <>Concevoir les<br />systèmes <span>intelligents</span><br />de demain.</>,
    description:
      'Explorer l’intersection de la mécanique, de l’électronique, de la robotique, de l’intelligence artificielle et des mathématiques appliquées — des fondements théoriques aux systèmes d’ingénierie intelligents.',
    explore: 'Découvrir mes travaux',
    contact: 'Me contacter',
    scroll: 'DÉFILER POUR EXPLORER',
    status: 'OUVERT AUX OPPORTUNITÉS DE RECHERCHE',
    aboutLabel: '01 / À PROPOS',
    aboutTitle: 'L’ingénierie avec une démarche scientifique.',
    aboutText:
      'Étudiant en ingénierie mécatronique, je m’intéresse à la compréhension, à la conception et à la validation des systèmes intelligents. Mon approche associe modélisation physique, raisonnement mathématique, méthodes computationnelles et réalisation technique.',
    aboutNote: 'Une approche pluridisciplinaire des problèmes d’ingénierie complexes.',
    researchLabel: '02 / AXES DE RECHERCHE',
    researchTitle: 'À la convergence des disciplines.',
    researchText:
      'Des intérêts scientifiques qui couvrent les systèmes intelligents, la modélisation mathématique et l’intelligence computationnelle.',
    domains: [
      ['Robotique & systèmes autonomes', 'Planification de mouvement, navigation, manipulation et systèmes multi-agents.', 'robotics'],
      ['Intelligence artificielle', 'Vision par ordinateur, apprentissage automatique et perception intelligente.', 'ai'],
      ['Commande avancée', 'Commande prédictive, commande optimale et sûreté formelle.', 'control'],
      ['Systèmes embarqués', 'Systèmes temps réel, microcontrôleurs et architectures électroniques.', 'embedded'],
      ['Mécanique computationnelle', 'Modélisation dynamique, simulation numérique et multiphysique.', 'mechanics'],
      ['Calcul quantique', 'Algorithmes quantiques, optimisation et physique computationnelle.', 'quantum'],
    ],
    projectsLabel: '03 / TRAVAUX SÉLECTIONNÉS',
    projectsTitle: 'La recherche par l’ingénierie.',
    projectsText:
      'Une sélection d’études, de prototypes et de pistes de recherche. Chaque projet possède sa propre documentation technique et son statut de développement.',
    allProjects: 'Explorer tous les projets',
    expertiseLabel: '04 / FONDATIONS TECHNIQUES',
    expertiseTitle: 'Des outils pour une ingénierie rigoureuse.',
    expertise: [
      [
        'Programmation & calcul scientifique',
        'Programmation scientifique, calcul numérique et analyse de données d’ingénierie.',
        'Python, C, C++, MATLAB, SQL, Bash, LaTeX ; algorithmique, scripts, traitement de données, analyse numérique et calcul scientifique.',
        'NumPy, SciPy, Pandas, Matplotlib ; Linux, Ubuntu, Git et GitHub.',
        'Environnements de développement, gestion de versions et workflows computationnels reproductibles.',
      ],
      [
        'Systèmes embarqués & électronique',
        'Architectures électroniques, microcontrôleurs et applications embarquées temps réel.',
        'STM32, ESP32, Arduino, Raspberry Pi ; C/C++ embarqué, capteurs, actionneurs, instrumentation, acquisition et traitement du signal.',
        'UART, SPI, I²C, CAN, MQTT, Modbus/RTU ; interruptions, timers, DMA, multitâche et FreeRTOS.',
        'LTspice, Proteus, KiCad ; thermocouples type K, MAX6675 et interface de mesure Cobra3.',
      ],
      [
        'Automatique & modélisation',
        'Modélisation mathématique, systèmes dynamiques et stratégies de commande avancée.',
        'Fonctions de transfert, représentation d’état, identification des systèmes, analyse de stabilité, PID, LQR, MPC et commande PWM.',
        'Commande moteur, régulation thermique, systèmes électromécaniques, dynamique véhicule, dynamique de vol des UAV et régulation du glissement.',
        'MATLAB, Simulink, Stateflow, Simscape et Maple.',
      ],
      [
        'Robotique & automatisation industrielle',
        'Systèmes robotiques, navigation autonome et automatisation industrielle.',
        'Cinématique robotique, planification de mouvement, robotique mobile, navigation, manipulation, systèmes autonomes et simulation robotique.',
        'ROS 2, Gazebo, MuJoCo, Pinocchio, RoboDK, CoppeliaSim, Webots, PX4 et MATLAB Robotics System Toolbox.',
        'Programmation d’automates, Siemens TIA Portal, Schneider PLC, Ladder, GRAFCET et ABB RobotStudio.',
      ],
      [
        'Intelligence artificielle & vision par ordinateur',
        'Perception par apprentissage, compréhension des images et analyse intelligente des données.',
        'Machine learning, deep learning, vision par ordinateur, détection et suivi d’objets, classification, analyse de scène et perception visuelle.',
        'Estimation de distance et de vitesse relative, fusion de perceptions, diagnostic de défauts et maintenance prédictive.',
        'PyTorch, TensorFlow, OpenCV, Ultralytics, YOLOv8, YOLO26n, ByteTrack, SegFormer, SAM2 et Depth Anything V2.',
      ],
      [
        'Ingénierie automobile & ADAS',
        'Dynamique du véhicule, systèmes de sécurité active et validation basée sur les modèles.',
        'ADAS, FCW, AEB, ACC, TTC, perception routière, estimation de trajectoire, modélisation véhicule quatre roues, forces pneumatiques, transferts de charge et ABS quatre canaux.',
        'Filtrage de Kalman, régression, Monte Carlo, analyse de sensibilité, injection de défauts, tests de scénarios et validation MIL/SIL/HIL.',
        'ISO 26262, ASPICE, AUTOSAR, MISRA C, MC/DC, traçabilité exigences-tests, MATLAB, Simulink, Stateflow, CarMaker, CANalyzer et vSignalyzer.',
      ],
      [
        'Simulation mécanique & multiphysique',
        'Mécanique computationnelle, thermique, mécanique des fluides et analyse des structures.',
        'CAO, modélisation 3D, assemblages, dessin technique, choix des matériaux, prototypage, CFD, FEM/FEA, volumes finis et transferts thermiques conjugués.',
        'Thermodynamique, transferts thermiques, mécanique des fluides, turbulence (k-ω SST), aérodynamique, dynamique des structures, impact, absorption d’énergie et études de convergence de maillage.',
        'CATIA V5, SolidWorks, FreeCAD, CES EduPack, COMSOL, ANSYS, Fluent, Mechanical, Abaqus, SimScale, LS-DYNA, Altair Radioss, HyperMesh, HyperWorks et LS-PrePost.',
      ],
      [
        'Calcul quantique & optimisation',
        'Algorithmes quantiques, calcul hybride et optimisation combinatoire.',
        'Circuits quantiques, simulation quantique, modèles de bruit, physique computationnelle et apprentissage automatique quantique.',
        'QAOA, VQE, QUBO, formulations d’Ising et optimisation hybride classique-quantique.',
        'Qiskit, Qiskit Aer, Qiskit Machine Learning et PennyLane.',
      ],
    ],
    crossSkillsLabel: '06 / INGÉNIERIE TRANSDISCIPLINAIRE',
    crossSkillsTitle: 'L’ingénierie au-delà des frontières disciplinaires.',
    crossSkills: [
      [
        'Ingénierie expérimentale & validation',
        'Des mesures physiques aux décisions d’ingénierie fondées sur les résultats.',
        'MÉTHODES & PRATIQUES EXPÉRIMENTALES',
        'Instrumentation, protocoles de mesure, caractérisation expérimentale, étalonnage des capteurs, acquisition de données, analyse de signaux, corrélation théorie–simulation–expérience, tests unitaires et fonctionnels, vérification et validation de modèles, études de robustesse et de sensibilité, débogage, intégration système, analyse des performances, documentation technique et rapports scientifiques.',
      ],
      [
        'Énergie & systèmes électromécaniques',
        'Conversion énergétique, surveillance des machines et gestion thermique avancée.',
        'SYSTÈMES ÉNERGÉTIQUES & DIAGNOSTIC',
        'Machines asynchrones triphasées, modélisation électromécanique, bilans énergétiques, rendement et pertes, surveillance des moteurs, diagnostic vibratoire par RMS, écart-type et facteur de crête, effet Peltier, modules thermoélectriques Bi₂Te₃, pompes à chaleur thermoélectriques, gestion thermique électronique et échanges thermiques orbitaux.',
      ],
      [
        'IoT, systèmes cyberphysiques & jumeaux numériques',
        'Relier les systèmes physiques, les modèles numériques et les données opérationnelles.',
        'SYSTÈMES CONNECTÉS & SUPERVISION',
        'Internet des objets (IoT), développement de jumeaux numériques, systèmes cyberphysiques, surveillance de systèmes physiques, acquisition et traitement de données en temps réel, classification des états de fonctionnement, surveillance conditionnelle, supervision intelligente et démarches de maintenance prédictive.',
      ],
    ],
    bookLabel: '07 / ÉCRIT SCIENTIFIQUE',
    bookTitle: 'Théorie moderne des métaux — De Drude à Sommerfeld',
    bookSubtitle: 'Étude historique, statistique et quantique de la conduction électronique',
    bookDescription:
      'Une étude théorique retraçant l’évolution de la théorie électronique des métaux, du modèle classique de Drude à la description quantique de Sommerfeld. L’ouvrage présente les fondements statistiques du gaz d’électrons, la statistique de Fermi-Dirac, le principe d’exclusion de Pauli et les limites des premiers modèles.',
    bookAuthorLabel: 'AUTEUR',
    bookDateLabel: 'DATE DE PUBLICATION',
    bookDate: 'Juillet 2025',
    bookStatus: 'ÉTUDE THÉORIQUE ET HISTORIQUE',
    bookIntroduction: 'Lire l’introduction',
    bookContents: 'Consulter le sommaire',
    contactLabel: '05 / CONTACT',
    contactTitle: 'Construisons quelque chose de pertinent.',
    contactText:
      'Pour des collaborations de recherche, des opportunités en ingénierie, des échanges scientifiques ou un projet doctoral. Je serai heureux d’échanger.',
    email: 'Envoyer un e-mail',
    footer: 'INGÉNIERIE. MATHÉMATIQUES. INTELLIGENCE.',
    location: 'Kénitra, Maroc',
  },
}

const domainIcons = [Orbit, BrainCircuit, ShieldCheck, Cpu, Network, Atom]
const MotionLink = motion.create(Link)

function HomePage() {
  const { language, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const t = content[language]

  const closeMenu = () => setMenuOpen(false)

  const scrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault()
    closeMenu()
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" onClick={(event) => scrollToSection(event, "home")} aria-label="Khourdouch Amine home">
          <span className="brand-mark">KA<span>.</span></span>
          <span className="brand-caption">ENGINEERING<br />RESEARCH</span>
        </a>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {t.nav.map((item, index) => (
            <a key={item} href={`#${['about', 'research', 'projects', 'expertise', 'publications', 'contact'][index]}`} onClick={(event) => scrollToSection(event, ['about', 'research', 'projects', 'expertise', 'publications', 'contact'][index])}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="language-switch"
            onClick={() => setLanguage(language === 'EN' ? 'FR' : 'EN')}
            aria-label="Change language"
          >
            {language === 'EN' ? 'FR' : 'EN'}
          </button>
          <a className="header-contact" href="#contact" onClick={(event) => scrollToSection(event, "contact")}>
            <span>{t.contact}</span><ArrowUpRight size={15} />
          </a>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-cross cross-one" aria-hidden="true" />
        <div className="hero-cross cross-two" aria-hidden="true" />

        <div className="hero-content">
          <motion.div
            className="quantum-signature"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            QUANTUM IS ALL YOU NEED.
          </motion.div>

          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow-line" />
            {t.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12 }}
          >
            {t.title}
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
          >
            {t.description}
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
          >
            <a className="button-primary" href="#projects" onClick={(event) => scrollToSection(event, "projects")}>{t.explore}<ArrowUpRight size={17} /></a>
            <a className="button-secondary" href="#contact" onClick={(event) => scrollToSection(event, "contact")}>{t.contact}<ArrowRight size={16} /></a>
          </motion.div>

          <motion.div
            className="hero-bottomline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span><span className="status-dot" />{t.status}</span>
            <span className="scroll-cue">{t.scroll}<ArrowDown size={13} /></span>
          </motion.div>
        </div>

        <motion.div
          className="hero-portrait-frame"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          <img
            src="/images/amine-profile.png"
            alt={language === 'EN' ? 'Professional portrait of Amine Khourdouch' : 'Portrait professionnel d’Amine Khourdouch'}
            loading="eager"
          />
          <span className="portrait-caption">AMINE KHOURDOUCH · ENGINEERING RESEARCH</span>
        </motion.div>

        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <span className="hero-index-line" />
          <span>05</span>
        </div>
        <div className="hero-coordinate" aria-hidden="true">34°15' N — 6°35' W</div>
      </section>

      <section className="about-section section-wrap" id="about">
        <Reveal>
          <div className="section-kicker">{t.aboutLabel}</div>
        </Reveal>
        <Reveal>
          <div className="about-layout">
          <h2>{t.aboutTitle}</h2>
          <div className="about-copy">
            <p>{t.aboutText}</p>
            <div className="about-note"><span />{t.aboutNote}</div>
          </div>
          <div className="about-portrait">
            <img
              src="/images/portrait-laboratoire-robotique.png"
              alt="Portrait of Amine Khourdouch"
              loading="lazy"
            />
            <span>MECHATRONICS ENGINEERING</span>
          </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="about-signature">
          <span>KHOURDOUCH AMINE</span>
            <span>MECHATRONICS ENGINEERING</span>
          </div>
        </Reveal>
      </section>

      <section className="research-section section-wrap" id="research">
        <Reveal>
          <div className="section-heading">
            <div>
              <div className="section-kicker">{t.researchLabel}</div>
            <h2>{t.researchTitle}</h2>
          </div>
            <p>{t.researchText}</p>
          </div>
        </Reveal>

        <div className="domain-grid">
          {t.domains.map((domain, index) => {
            const Icon = domainIcons[index]
            return (
              <motion.article
                className="domain-item"
                key={domain[0]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="domain-topline">
                  <span className="domain-number">0{index + 1}</span>
                  <Icon size={21} strokeWidth={1.4} />
                </div>
                <h3>{domain[0]}</h3>
                <p>{domain[1]}</p>
                <span className="domain-code">{domain[2].toUpperCase()}</span>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="projects-section section-wrap" id="projects">
        <Reveal>
          <div className="section-heading">
            <div>
              <div className="section-kicker">{t.projectsLabel}</div>
            <h2>{t.projectsTitle}</h2>
          </div>
            <p>{t.projectsText}</p>
          </div>
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => (
            <MotionLink
              to={`/projects/${project.id}`}
              className="project-row"
              key={project.id}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
            >
              <span className="project-number">{project.number}</span>
              <div className="project-main">
                <span className="project-category">
                  {project.status === 'completed'
                    ? (language === 'FR' ? 'PROJET RÉALISÉ' : 'COMPLETED PROJECT')
                    : project.status === 'prototype'
                      ? (language === 'FR' ? 'PROTOTYPE' : 'RESEARCH PROTOTYPE')
                      : project.status === 'study'
                        ? (language === 'FR' ? 'ÉTUDE' : 'ENGINEERING STUDY')
                        : (language === 'FR' ? 'AXE DE RECHERCHE' : 'RESEARCH DIRECTION')}
                </span>
                <h3>{language === 'FR' ? project.titleFr : project.title}</h3>
                <span className="project-tags">
                  {language === 'FR' ? project.subtitleFr : project.subtitle}
                </span>
              </div>
              <span className="project-status">
                {language === 'FR' ? project.statusLabelFr : project.statusLabel}
              </span>
              <ArrowUpRight className="project-arrow" size={21} />
            </MotionLink>
          ))}
        </div>
        <a className="text-link" href="#contact" onClick={(event) => scrollToSection(event, "contact")}>{t.allProjects}<ArrowUpRight size={16} /></a>
      </section>

      <section className="expertise-section section-wrap" id="expertise">
        <Reveal>
          <div className="section-kicker">{t.expertiseLabel}</div>
          <h2>{t.expertiseTitle}</h2>
        </Reveal>
        <Reveal>
          <div className="expertise-grid">
          {t.expertise.map((item, index) => (
            <article className="expertise-item" key={item[0]}>
              <span className="expertise-index">0{index + 1}</span>
              <div className="expertise-copy">
                <h3>{item[0]}</h3>
                <p className="expertise-description">{item[1]}</p>
                <div className="expertise-details">
                  <div className="expertise-detail">
                    <span className="expertise-detail-label">
                      {language === 'FR' ? 'COMPÉTENCES' : 'CORE COMPETENCIES'}
                    </span>
                    <p>{item[2]}</p>
                  </div>
                  <div className="expertise-detail">
                    <span className="expertise-detail-label">
                      {language === 'FR' ? 'MÉTHODES & APPLICATIONS' : 'METHODS & APPLICATIONS'}
                    </span>
                    <p>{item[3]}</p>
                  </div>
                  <div className="expertise-detail">
                    <span className="expertise-detail-label">
                      {language === 'FR' ? 'OUTILS & ENVIRONNEMENTS' : 'TOOLS & ENVIRONMENTS'}
                    </span>
                    <p>{item[4]}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
          </div>
        </Reveal>
      </section>

      <section className="cross-skills-section section-wrap" id="cross-disciplinary">
        <Reveal>
          <div className="section-kicker">{t.crossSkillsLabel}</div>
          <h2>{t.crossSkillsTitle}</h2>
        </Reveal>
        <Reveal>
          <div className="cross-skills-grid">
          {t.crossSkills.map((item, index) => (
            <article className="cross-skills-card" key={item[0]}>
              <span className="cross-skills-index">0{index + 1}</span>
              <h3>{item[0]}</h3>
              <p className="cross-skills-description">{item[1]}</p>
              <div className="cross-skills-detail">
                <span>{item[2]}</span>
                <p>{item[3]}</p>
              </div>
            </article>
          ))}
          </div>
        </Reveal>
      </section>

      <section className="book-section section-wrap" id="publications">
        <Reveal>
          <div className="section-kicker">{t.bookLabel}</div>
          <div className="book-feature">
            <div className="book-cover-wrap">
              <img
                className="book-cover"
                src="/assets/books/modern-metals-theory/cover.png"
                alt={t.bookTitle}
                loading="lazy"
              />
            </div>

            <div className="book-information">
              <span className="book-status">{t.bookStatus}</span>
              <h2>{t.bookTitle}</h2>
              <p className="book-subtitle">{t.bookSubtitle}</p>
              <p className="book-description">{t.bookDescription}</p>

              <div className="book-metadata">
                <div>
                  <span>{t.bookAuthorLabel}</span>
                  <strong>KHOURDOUCH Amine</strong>
                </div>
                <div>
                  <span>{t.bookDateLabel}</span>
                  <strong>{t.bookDate}</strong>
                </div>
              </div>

              <div className="book-links">
                <a
                  href="/assets/books/modern-metals-theory/introduction.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.bookIntroduction}
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="/assets/books/modern-metals-theory/contents.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.bookContents}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="contact-section section-wrap" id="contact">
        <Reveal>
          <div className="section-kicker">{t.contactLabel}</div>
          <div className="contact-layout">
          <div>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
          </div>
          <div className="contact-actions">
            <div className="social-links">
              <a
                className="social-card social-email"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=khourdouchamine@gmail.com"
                aria-label="Envoyer un e-mail à Amine Khourdouch"
              >
                <svg className="social-brand-icon gmail-icon" viewBox="0 0 48 36" role="img" aria-hidden="true">
                  <path d="M4 32V6" stroke="#4285F4" strokeWidth="5" strokeLinecap="round" />
                  <path d="M4 6L24 22L44 6" fill="none" stroke="#EA4335" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M44 6V32" stroke="#34A853" strokeWidth="5" strokeLinecap="round" />
                  <path d="M4 32V6" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="social-card-title">Gmail</span>
                <span className="social-card-description">Send an email</span>
              </a>

              <a
                className="social-card social-github"
                href="https://github.com/khourdouch-amine"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visiter le profil GitHub d'Amine Khourdouch"
              >
                <svg className="social-brand-icon" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
                  <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .71 2.08.5 2.59.38.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z" />
                </svg>
                <span className="social-card-title">GitHub</span>
                <span className="social-card-description">Explore my projects</span>
              </a>

              <a
                className="social-card social-linkedin"
                href="https://www.linkedin.com/in/khourdouch-amine-61b083213"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visiter le profil LinkedIn d'Amine Khourdouch"
              >
                <svg className="social-brand-icon linkedin-icon" viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <rect x="1" y="1" width="22" height="22" rx="3" fill="#0A66C2" />
                  <path fill="#FFFFFF" d="M6.2 9.1h2.5v8.1H6.2V9.1Zm1.25-4a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9ZM10.3 9.1h2.4v1.1h.04c.34-.64 1.15-1.31 2.37-1.31 2.54 0 3.01 1.67 3.01 3.84v4.47h-2.5v-3.96c0-.95-.02-2.17-1.32-2.17-1.32 0-1.52 1.03-1.52 2.1v4.03h-2.48V9.1Z" />
                </svg>
                <span className="social-card-title">LinkedIn</span>
                <span className="social-card-description">Professional profile</span>
              </a>
            </div>
          </div>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">KA<span>.</span></div>
        <div className="footer-slogan">{t.footer}</div>
        <div className="footer-location"><Radio size={13} />{t.location}</div>
        <div className="footer-copy">© {CURRENT_YEAR} KHOURDOUCH AMINE</div>
      </footer>

      <AnimatePresence>
        {menuOpen && <motion.button className="menu-backdrop" aria-label="Close menu" onClick={closeMenu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
      </AnimatePresence>
    </main>
  )
}

export default HomePage
