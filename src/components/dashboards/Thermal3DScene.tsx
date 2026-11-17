import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import './Thermal3DScene.css'

type Language = 'EN' | 'FR'
type ViewMode = 'thermal' | 'airflow' | 'hardware'

function AirParticles({ active }: { active: boolean }) {
  const group = useRef<Group>(null)

  const particles = useMemo(
    () =>
      Array.from({ length: 65 }, (_, index) => ({
        x: (index % 13) * 0.48 - 3,
        y: 0.65 + (index % 5) * 0.17,
        z: Math.floor(index / 13) * 0.42 - 1.25,
        speed: 0.45 + (index % 7) * 0.12,
      })),
    [],
  )

  useFrame(({ clock }) => {
    if (!active || !group.current) return

    group.current.children.forEach((particle, index) => {
      const item = particles[index]
      particle.position.x =
        ((item.x + clock.elapsedTime * item.speed + 3) % 6) - 3
    })
  })

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={[particle.x, particle.y, particle.z]}
        >
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? '#00D9FF' : '#62AFFF'}
            transparent
            opacity={0.78}
          />
        </mesh>
      ))}
    </group>
  )
}

function CoolingFan({ active }: { active: boolean }) {
  const blades = useRef<Group>(null)

  useFrame((_, delta) => {
    if (active && blades.current) {
      blades.current.rotation.y += delta * 5
    }
  })

  return (
    <group position={[1.25, 0.28, -0.68]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.43, 0.045, 12, 48]} />
        <meshStandardMaterial color="#64748B" metalness={0.75} roughness={0.3} />
      </mesh>
      <group ref={blades}>
        {[0, 1, 2, 3, 4, 5].map((blade) => (
          <mesh
            key={blade}
            position={[0, 0.035, 0]}
            rotation={[0, (blade * Math.PI) / 3, 0]}
          >
            <boxGeometry args={[0.13, 0.045, 0.38]} />
            <meshStandardMaterial
              color="#18A7C9"
              metalness={0.35}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 24]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.8} />
      </mesh>
    </group>
  )
}

function RaspberryPiBoard({ mode, animate }: { mode: ViewMode; animate: boolean }) {
  const cpu = useRef<Mesh>(null)
  const thermal = mode === 'thermal'
  const hardware = mode === 'hardware'

  useFrame(({ clock }) => {
    if (cpu.current && thermal && animate) {
      const pulse = 0.5 + Math.sin(clock.elapsedTime * 2.2) * 0.12
      const material = cpu.current.material
      if (!Array.isArray(material) && 'emissiveIntensity' in material) {
        material.emissiveIntensity = pulse
      }
    }
  })

  return (
    <group>
      {/* PCB */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.16, 2.55]} />
        <meshStandardMaterial
          color="#075B50"
          roughness={0.65}
          metalness={0.12}
        />
      </mesh>

      {/* PCB edge and mounting holes */}
      {[-1.82, 1.82].flatMap((x) =>
        [-1.08, 1.08].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.09, z]}>
            <cylinderGeometry args={[0.085, 0.085, 0.025, 24]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.8} />
          </mesh>
        )),
      )}

      {/* CPU package */}
      <mesh ref={cpu} position={[0.18, 0.16, 0.12]} castShadow>
        <boxGeometry args={[0.76, 0.2, 0.72]} />
        <meshStandardMaterial
          color={thermal ? '#D94B35' : '#263B59'}
          emissive={thermal ? '#F04420' : '#000000'}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.35}
        />
      </mesh>

      {/* CPU heat spreader */}
      <mesh position={[0.18, 0.275, 0.12]}>
        <boxGeometry args={[0.62, 0.035, 0.58]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Heatsink fins */}
      {Array.from({ length: 9 }, (_, index) => (
        <mesh
          key={index}
          position={[0.18, 0.43, -0.26 + index * 0.095]}
          castShadow
        >
          <boxGeometry args={[0.82, 0.28, 0.045]} />
          <meshStandardMaterial
            color={thermal ? '#B9C5D2' : '#718096'}
            metalness={0.78}
            roughness={0.28}
          />
        </mesh>
      ))}

      {/* RAM packages */}
      {[-0.88, -1.38].map((x) => (
        <mesh key={x} position={[x, 0.16, 0.15]} castShadow>
          <boxGeometry args={[0.38, 0.14, 0.62]} />
          <meshStandardMaterial
            color={thermal ? '#D87939' : '#253B59'}
            emissive={thermal ? '#B94B1C' : '#000000'}
            emissiveIntensity={thermal ? 0.3 : 0}
          />
        </mesh>
      ))}

      {/* I/O connectors */}
      {[-0.8, -0.25, 0.3, 0.85].map((z, index) => (
        <mesh key={index} position={[-2.04, 0.16, z]} castShadow>
          <boxGeometry args={[0.34, 0.27, 0.38]} />
          <meshStandardMaterial color="#AAB5C1" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}

      {/* GPIO header */}
      {Array.from({ length: 20 }, (_, index) => (
        <mesh key={index} position={[-1.55 + (index % 10) * 0.12, 0.22, 0.88 + Math.floor(index / 10) * 0.13]}>
          <cylinderGeometry args={[0.025, 0.025, 0.2, 8]} />
          <meshStandardMaterial color="#D6A84B" metalness={0.8} />
        </mesh>
      ))}

      {/* Fan */}
      <CoolingFan active={animate && !hardware} />

      {/* Thermal halo */}
      {thermal && (
        <mesh position={[0.18, 0.48, 0.12]}>
          <boxGeometry args={[1.05, 0.025, 0.95]} />
          <meshBasicMaterial
            color="#FF633D"
            transparent
            opacity={0.12}
          />
        </mesh>
      )}
    </group>
  )
}

function Scene({ mode, animate }: { mode: ViewMode; animate: boolean }) {
  return (
    <>
      <color attach="background" args={['#081426']} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} castShadow />
      <pointLight position={[-4, 3, -3]} color="#00B9D6" intensity={32} />
      <pointLight position={[2, 2, 3]} color="#FF754F" intensity={thermalLight(mode)} />

      <RaspberryPiBoard mode={mode} animate={animate} />
      <AirParticles active={animate && mode !== 'hardware'} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#081426" roughness={0.9} />
      </mesh>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.07}
        enablePan={false}
        minDistance={4.5}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  )
}

function thermalLight(mode: ViewMode) {
  return mode === 'thermal' ? 18 : 4
}

function Thermal3DScene({ language }: { language: Language }) {
  const [mode, setMode] = useState<ViewMode>('thermal')
  const [motionEnabled, setMotionEnabled] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotionEnabled(!media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const labels = {
    title: language === 'FR' ? 'Exploration 3D du système' : '3D system exploration',
    subtitle:
      language === 'FR'
        ? 'Modèle illustratif interactif · Raspberry Pi 4'
        : 'Interactive illustrative model · Raspberry Pi 4',
    thermal: language === 'FR' ? 'Thermique' : 'Thermal',
    airflow: language === 'FR' ? 'Écoulement d’air' : 'Airflow',
    hardware: language === 'FR' ? 'Composants' : 'Hardware',
    hint:
      language === 'FR'
        ? 'Glisser pour tourner · Molette pour zoomer'
        : 'Drag to rotate · Scroll to zoom',
    note:
      language === 'FR'
        ? 'Visualisation 3D illustrative — ne constitue pas une reconstruction exacte de la géométrie SimScale.'
        : 'Illustrative 3D visualization — not an exact reconstruction of the SimScale geometry.',
  }

  return (
    <section className="thermal-3d-section">
      <div className="thermal-3d-heading">
        <div>
          <span>INTERACTIVE CFD VISUALIZATION</span>
          <h2>{labels.title}</h2>
          <p>{labels.subtitle}</p>
        </div>
        <div className="thermal-3d-live">
          <i />
          {language === 'FR' ? 'SCÈNE INTERACTIVE' : 'INTERACTIVE SCENE'}
        </div>
      </div>

      <div className="thermal-3d-frame">
        <Canvas
          shadows
          frameloop={motionEnabled ? 'always' : 'demand'}
          dpr={[1, 1.25]}
          camera={{ position: [5.8, 4.5, 6.2], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Scene mode={mode} animate={motionEnabled} />
        </Canvas>

        <div className="thermal-3d-controls">
          {([
            ['thermal', labels.thermal],
            ['airflow', labels.airflow],
            ['hardware', labels.hardware],
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

        <div className="thermal-3d-hint">{labels.hint}</div>
        <div className="thermal-3d-legend">
          <span><i className="thermal-legend-hot" /> {labels.thermal}</span>
          <span><i className="thermal-legend-flow" /> {labels.airflow}</span>
        </div>
      </div>

      <p className="thermal-3d-note">{labels.note}</p>
    </section>
  )
}

export default Thermal3DScene
