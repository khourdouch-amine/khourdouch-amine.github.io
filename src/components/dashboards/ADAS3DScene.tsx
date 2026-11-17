import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { Group } from 'three'
import './ADAS3DScene.css'

const DURATION = 3.25
const INITIAL_GAP = 38
const CLOSING_SPEED = 8
const EGO_Z = 5

function Vehicle({
  position,
  target = false,
  braking = false,
}: {
  position: [number, number, number]
  target?: boolean
  braking?: boolean
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.9, 0.85, 3.8]} />
        <meshStandardMaterial
          color={target ? '#d97745' : '#1c9bb5'}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, 1.08, -0.15]}>
        <boxGeometry args={[1.55, 0.55, 1.75]} />
        <meshStandardMaterial color="#14283c" metalness={0.3} roughness={0.25} />
      </mesh>

      {[-0.98, 0.98].map((x) =>
        [-1.15, 1.15].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x, 0.38, z]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.34, 0.34, 0.18, 12]} />
            <meshStandardMaterial color="#111923" />
          </mesh>
        )),
      )}

      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, 0.65, 1.93]}>
          <boxGeometry args={[0.32, 0.2, 0.06]} />
          <meshStandardMaterial
            color={braking && !target ? '#ff352f' : '#8f3435'}
            emissive={braking && !target ? '#ff211b' : '#000000'}
            emissiveIntensity={braking && !target ? 2 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

function Road() {
  return (
    <group position={[0, -0.04, -12]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, 100]} />
        <meshStandardMaterial color="#172638" roughness={0.95} />
      </mesh>

      {[-3.2, 3.2].map((x) => (
        <mesh key={x} position={[x, 0.02, 0]}>
          <boxGeometry args={[0.055, 0.02, 100]} />
          <meshBasicMaterial color="#6a8498" />
        </mesh>
      ))}

      {Array.from({ length: 18 }, (_, index) => (
        <mesh key={index} position={[0, 0.025, 34 - index * 5.5]}>
          <boxGeometry args={[0.09, 0.02, 2.6]} />
          <meshBasicMaterial color="#b4c4d1" />
        </mesh>
      ))}
    </group>
  )
}

function DetectionScene({ elapsed }: { elapsed: number }) {
  const targetRef = useRef<Group>(null)

  const gap = Math.max(
    INITIAL_GAP - CLOSING_SPEED * elapsed,
    INITIAL_GAP - CLOSING_SPEED * DURATION,
  )

  const targetZ = EGO_Z - gap
  const warning = gap / CLOSING_SPEED <= 3
  const braking = gap / CLOSING_SPEED <= 1.5

  useFrame(() => {
    if (targetRef.current) {
      targetRef.current.rotation.y = Math.sin(elapsed * 0.45) * 0.008
      targetRef.current.position.y = Math.sin(elapsed * 1.2) * 0.012
    }
  })

  return (
    <>
      <color attach="background" args={['#081426']} />
      <fog attach="fog" args={['#081426', 32, 78]} />

      <ambientLight intensity={1.25} />
      <directionalLight position={[7, 12, 5]} intensity={2} />
      <pointLight
        position={[-5, 5, -16]}
        color="#35c8df"
        intensity={18}
        distance={35}
      />

      <Road />

      <Vehicle position={[0, 0, EGO_Z]} braking={braking} />

      <group ref={targetRef} position={[0, 0, targetZ]}>
        <Vehicle position={[0, 0, 0]} target />

        <mesh position={[0, 1.55, 0]}>
          <boxGeometry args={[2.2, 2.6, 4.1]} />
          <meshBasicMaterial
            color={warning ? '#ff9b54' : '#42d9e8'}
            wireframe
            transparent
            opacity={0.42}
          />
        </mesh>
      </group>

      <mesh position={[0, 1.25, -9]} rotation={[-Math.PI / 2.15, 0, 0]}>
        <coneGeometry args={[5.3, 25, 32, 1, true]} />
        <meshBasicMaterial
          color="#42d9e8"
          transparent
          opacity={0.075}
          side={2}
          depthWrite={false}
        />
      </mesh>

      <gridHelper
        args={[80, 40, '#29435a', '#172c40']}
        position={[0, 0.015, -12]}
      />

      <OrbitControls
        enablePan={false}
        minDistance={9}
        maxDistance={28}
        minPolarAngle={0.65}
        maxPolarAngle={1.48}
        target={[0, 0.5, -10]}
      />
    </>
  )
}

export default function ADAS3DScene({ isFr }: { isFr: boolean }) {
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const intervalRef = useRef<number | null>(null)

  const gap = Math.max(
    INITIAL_GAP - CLOSING_SPEED * elapsed,
    INITIAL_GAP - CLOSING_SPEED * DURATION,
  )

  const ttc = gap / CLOSING_SPEED
  const status = ttc <= 1.5 ? 'AEB' : ttc <= 3 ? 'FCW' : 'TRACKING'

  useEffect(() => {
    if (!playing || elapsed >= DURATION) return

    intervalRef.current = window.setInterval(() => {
      setElapsed((current) => Math.min(DURATION, current + 0.05))
    }, 50)

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [playing, elapsed])

  const reset = () => {
    setElapsed(0)
    setPlaying(true)
  }

  return (
    <section className="adas-scene-section">
      <div className="adas-scene-heading">
        <div>
          <span className="adas-scene-kicker">
            02 / {isFr ? 'VISUALISATION INTERACTIVE' : 'INTERACTIVE VISUALISATION'}
          </span>

          <h2>
            {isFr
              ? 'Perception monoculaire & freinage d’urgence'
              : 'Monocular perception & emergency braking'}
          </h2>

          <p>
            {isFr
              ? 'Scénario cinématique illustratif : détection, suivi, estimation du TTC et décision.'
              : 'Illustrative kinematic scenario: detection, tracking, TTC estimation and decision.'}
          </p>
        </div>

        <span className="adas-scene-live">
          <i />
          {isFr ? 'SCÉNARIO SIMULÉ' : 'SIMULATED SCENARIO'}
        </span>
      </div>

      <div className="adas-scene-layout">
        <div className="adas-scene-canvas">
          <Canvas
            camera={{ position: [9, 8, 15], fov: 42 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: 'low-power' }}
          >
            <DetectionScene elapsed={elapsed} />
          </Canvas>

          <div className="adas-scene-overlay adas-scene-overlay-top">
            <span>CAM 01 · MONOCULAR</span>
            <span>30 FPS · SIMULATION</span>
          </div>

          <div className="adas-scene-overlay adas-scene-overlay-bottom">
            <span>{isFr ? 'VÉHICULE EGO' : 'EGO VEHICLE'}</span>
            <span>{isFr ? 'CIBLE SUIVIE' : 'TRACKED TARGET'}</span>
          </div>
        </div>

        <aside className="adas-scene-telemetry">
          <div className="adas-scene-status-row">
            <span>{isFr ? 'ÉTAT DU SYSTÈME' : 'SYSTEM STATE'}</span>
            <strong className={`adas-scene-state is-${status.toLowerCase()}`}>
              {status}
            </strong>
          </div>

          <div className="adas-scene-metric">
            <span>{isFr ? 'TEMPS AVANT COLLISION' : 'TIME TO COLLISION'}</span>
            <strong>{ttc.toFixed(2)} <small>s</small></strong>
            <div className="adas-scene-meter">
              <i style={{ width: `${Math.min(100, (ttc / 4.75) * 100)}%` }} />
            </div>
          </div>

          <div className="adas-scene-data">
            <div>
              <span>{isFr ? 'Distance relative' : 'Relative distance'}</span>
              <strong>{gap.toFixed(1)} m</strong>
            </div>

            <div>
              <span>{isFr ? 'Vitesse de rapprochement' : 'Closing speed'}</span>
              <strong>{CLOSING_SPEED.toFixed(1)} m/s</strong>
            </div>

            <div>
              <span>{isFr ? 'Alerte FCW' : 'FCW warning'}</span>
              <strong className={status !== 'TRACKING' ? 'is-active' : ''}>
                {status !== 'TRACKING' ? 'ACTIVE' : '—'}
              </strong>
            </div>

            <div>
              <span>{isFr ? 'Freinage AEB' : 'AEB braking'}</span>
              <strong className={status === 'AEB' ? 'is-active' : ''}>
                {status === 'AEB' ? 'ACTIVE' : '—'}
              </strong>
            </div>
          </div>

          <div className="adas-scene-controls">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              disabled={elapsed >= DURATION}
            >
              {playing ? 'Pause' : isFr ? 'Reprendre' : 'Resume'}
            </button>

            <button
              type="button"
              className="adas-scene-reset"
              onClick={reset}
            >
              {isFr ? 'Réinitialiser' : 'Reset'}
            </button>
          </div>

          <p className="adas-scene-disclaimer">
            {isFr
              ? 'Démonstration conceptuelle — paramètres cinématiques illustratifs, distincts des résultats expérimentaux.'
              : 'Concept demonstration — illustrative kinematic parameters, separate from experimental results.'}
          </p>
        </aside>
      </div>

      <p className="adas-scene-hint">
        {isFr
          ? 'Faites glisser pour orbiter · Molette pour zoomer'
          : 'Drag to orbit · Scroll to zoom'}
      </p>
    </section>
  )
}
