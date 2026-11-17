import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { Group } from 'three'
import './Motor3DScene.css'

type Language = 'EN' | 'FR'
type ViewMode = 'architecture' | 'thermal' | 'operation'

function MotorHousing({ mode }: { mode: ViewMode }) {
  const thermal = mode === 'thermal'

  return (
    <group>
      {/* Main stator housing */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[1.02, 1.02, 2.65, 48, 1, true]} />
        <meshStandardMaterial
          color={thermal ? '#854B3D' : '#52677D'}
          metalness={0.78}
          roughness={0.32}
          side={2}
        />
      </mesh>

      {/* Longitudinal cooling fins */}
      {Array.from({ length: 24 }, (_, index) => {
        const angle = (index / 24) * Math.PI * 2
        return (
          <mesh
            key={index}
            position={[
              0,
              Math.cos(angle) * 1.055,
              Math.sin(angle) * 1.055,
            ]}
            rotation={[angle, 0, 0]}
            castShadow
          >
            <boxGeometry args={[2.25, 0.075, 0.12]} />
            <meshStandardMaterial
              color={thermal ? '#B76543' : '#8294A8'}
              metalness={0.72}
              roughness={0.38}
              emissive={thermal ? '#C34B2C' : '#000000'}
              emissiveIntensity={thermal ? 0.18 : 0}
            />
          </mesh>
        )
      })}

      {/* Front and rear end shields */}
      {[-1.36, 1.36].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[1.04, 1.04, 0.16, 48]} />
            <meshStandardMaterial
              color="#71869B"
              metalness={0.82}
              roughness={0.28}
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.76, 0.045, 10, 48]} />
            <meshStandardMaterial color="#B4C2CF" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Stator inner core */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.78, 0.78, 2.15, 48, 1, true]} />
        <meshStandardMaterial
          color="#253C55"
          metalness={0.65}
          roughness={0.42}
          side={2}
        />
      </mesh>

      {/* Stator winding segments */}
      {Array.from({ length: 18 }, (_, index) => {
        const angle = (index / 18) * Math.PI * 2
        return (
          <mesh
            key={index}
            position={[
              0,
              Math.cos(angle) * 0.72,
              Math.sin(angle) * 0.72,
            ]}
            rotation={[angle, 0, 0]}
          >
            <boxGeometry args={[1.82, 0.11, 0.13]} />
            <meshStandardMaterial
              color="#D69A48"
              metalness={0.72}
              roughness={0.28}
            />
          </mesh>
        )
      })}

      {/* Thermal visualization rings */}
      {thermal && [-0.75, 0, 0.75].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.91, 0.018, 8, 48]} />
          <meshBasicMaterial color="#FF7048" transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Mounting feet */}
      {[-0.85, 0.85].map((x) => (
        <group key={x} position={[x, -1.08, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.72, 0.22, 0.72]} />
            <meshStandardMaterial color="#64788D" metalness={0.72} roughness={0.4} />
          </mesh>
          {[-0.22, 0.22].map((z) => (
            <mesh key={z} position={[0, -0.12, z]}>
              <cylinderGeometry args={[0.065, 0.065, 0.035, 12]} />
              <meshStandardMaterial color="#D4DEE8" metalness={0.85} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function Rotor({ active }: { active: boolean }) {
  const rotor = useRef<Group>(null)

  useFrame((_, delta) => {
    if (active && rotor.current) {
      rotor.current.rotation.x += delta * 3.2
    }
  })

  return (
    <group ref={rotor}>
      {/* Rotor core */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.53, 0.53, 1.95, 40]} />
        <meshStandardMaterial
          color="#A5B4C2"
          metalness={0.9}
          roughness={0.27}
        />
      </mesh>

      {/* Rotor end rings */}
      {[-0.91, 0.91].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.49, 0.055, 10, 40]} />
          <meshStandardMaterial color="#D6A44F" metalness={0.82} roughness={0.25} />
        </mesh>
      ))}

      {/* Rotor bars */}
      {Array.from({ length: 20 }, (_, index) => {
        const angle = (index / 20) * Math.PI * 2
        return (
          <mesh
            key={index}
            position={[
              0,
              Math.cos(angle) * 0.49,
              Math.sin(angle) * 0.49,
            ]}
            rotation={[angle, 0, 0]}
          >
            <boxGeometry args={[1.78, 0.045, 0.045]} />
            <meshStandardMaterial color="#D9A34F" metalness={0.85} roughness={0.22} />
          </mesh>
        )
      })}
    </group>
  )
}

function ShaftAndBearings() {
  return (
    <group>
      {/* Through shaft */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.115, 0.115, 3.65, 24]} />
        <meshStandardMaterial color="#D7E0E9" metalness={0.94} roughness={0.18} />
      </mesh>

      {/* Shaft shoulder */}
      {[-1.02, 1.02].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.18, 24]} />
          <meshStandardMaterial color="#8799AA" metalness={0.92} roughness={0.22} />
        </mesh>
      ))}

      {/* Bearing housings */}
      {[-1.48, 1.48].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.27, 0.07, 12, 32]} />
            <meshStandardMaterial color="#D3A65A" metalness={0.88} roughness={0.2} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.17, 0.035, 10, 32]} />
            <meshStandardMaterial color="#E0E8EF" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CoolingFan({ active }: { active: boolean }) {
  const fan = useRef<Group>(null)

  useFrame((_, delta) => {
    if (active && fan.current) {
      fan.current.rotation.x += delta * 3.2
    }
  })

  return (
    <group position={[1.55, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.39, 0.045, 10, 36]} />
        <meshStandardMaterial color="#9BAABD" metalness={0.85} roughness={0.28} />
      </mesh>
      <group ref={fan}>
        {Array.from({ length: 7 }, (_, index) => (
          <mesh
            key={index}
            rotation={[index * Math.PI * 2 / 7, 0, 0]}
            position={[0, 0, 0]}
          >
            <boxGeometry args={[0.045, 0.075, 0.34]} />
            <meshStandardMaterial color="#3C9FB5" metalness={0.55} roughness={0.3} />
          </mesh>
        ))}
      </group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.14, 24]} />
        <meshStandardMaterial color="#C3D0DC" metalness={0.9} />
      </mesh>
    </group>
  )
}

function AirflowParticles({ active }: { active: boolean }) {
  const group = useRef<Group>(null)

  const particles = useMemo(
    () => Array.from({ length: 32 }, (_, index) => ({
      angle: (index / 32) * Math.PI * 2,
      x: (index % 8) * 0.42 - 1.45,
      speed: 0.35 + (index % 5) * 0.1,
    })),
    [],
  )

  useFrame(({ clock }) => {
    if (!active || !group.current) return

    group.current.children.forEach((particle, index) => {
      const item = particles[index]
      const x = ((item.x + clock.elapsedTime * item.speed + 1.45) % 3.2) - 1.6
      particle.position.set(
        x,
        Math.cos(item.angle) * 1.28,
        Math.sin(item.angle) * 1.28,
      )
    })
  })

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={[
            particle.x,
            Math.cos(particle.angle) * 1.28,
            Math.sin(particle.angle) * 1.28,
          ]}
        >
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? '#00D9C5' : '#58AFC9'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function MotorScene({ mode, animate }: { mode: ViewMode; animate: boolean }) {
  const operating = mode === 'operation'
  const thermal = mode === 'thermal'

  return (
    <>
      <color attach="background" args={['#081426']} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} />
      <pointLight
        position={[-3, 2, -2]}
        color={thermal ? '#FF6847' : '#00B9D6'}
        intensity={thermal ? 22 : 12}
      />
      <pointLight position={[3, 1, 3]} color="#D6A44F" intensity={5} />

      <MotorHousing mode={mode} />
      <Rotor active={animate && operating} />
      <ShaftAndBearings />
      <CoolingFan active={animate && operating} />
      <AirflowParticles active={animate && (thermal || operating)} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#081426" roughness={0.92} />
      </mesh>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.075}
        enablePan={false}
        minDistance={4.2}
        maxDistance={9}
        maxPolarAngle={Math.PI / 1.85}
      />
    </>
  )
}

function Motor3DScene({ language }: { language: Language }) {
  const [mode, setMode] = useState<ViewMode>('architecture')
  const [motionEnabled, setMotionEnabled] = useState(true)
  const isFr = language === 'FR'

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotionEnabled(!media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const labels = {
    title: isFr ? 'Exploration du moteur asynchrone' : 'Induction motor exploration',
    subtitle: isFr
      ? 'Modèle 3D procédural · Machine asynchrone triphasée'
      : 'Procedural 3D model · Three-phase induction machine',
    architecture: isFr ? 'Architecture' : 'Architecture',
    thermal: isFr ? 'Thermique' : 'Thermal',
    operation: isFr ? 'Fonctionnement' : 'Operation',
    hint: isFr
      ? 'Glisser pour tourner · Molette pour zoomer'
      : 'Drag to rotate · Scroll to zoom',
    note: isFr
      ? 'Géométrie procédurale illustrative — ne constitue pas une reconstruction CAO ni un modèle dimensionnel validé du moteur étudié.'
      : 'Illustrative procedural geometry — not a CAD reconstruction or a validated dimensional model of the studied motor.',
    badge: isFr ? 'SCÈNE INTERACTIVE' : 'INTERACTIVE SCENE',
  }

  return (
    <section className="motor-3d-section">
      <div className="motor-3d-heading">
        <div>
          <span>INTERACTIVE ELECTROMECHANICAL MODEL</span>
          <h2>{labels.title}</h2>
          <p>{labels.subtitle}</p>
        </div>
        <div className="motor-3d-live">
          <i />
          {labels.badge}
        </div>
      </div>

      <div className="motor-3d-frame">
        <Canvas
          frameloop={motionEnabled ? 'always' : 'demand'}
          dpr={[1, 1.2]}
          camera={{ position: [4.8, 3.4, 5.8], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
        >
          <MotorScene
            mode={mode}
            animate={motionEnabled}
          />
        </Canvas>

        <div className="motor-3d-controls">
          {([
            ['architecture', labels.architecture],
            ['thermal', labels.thermal],
            ['operation', labels.operation],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={mode === value ? 'active' : ''}
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="motor-3d-hint">{labels.hint}</div>
        <div className="motor-3d-legend">
          <span><i className="motor-legend-metal" /> {isFr ? 'Structure' : 'Structure'}</span>
          <span><i className="motor-legend-copper" /> {isFr ? 'Conducteurs' : 'Conductors'}</span>
          <span><i className="motor-legend-flow" /> {isFr ? 'Flux d’air' : 'Airflow'}</span>
        </div>
      </div>

      <p className="motor-3d-note">{labels.note}</p>
    </section>
  )
}

export default Motor3DScene
