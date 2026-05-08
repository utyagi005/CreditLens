import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import { Color, Vector3 } from 'three'
import { SectionHeader } from '../SectionHeader'
import { Button } from '../Button'

const intelligenceSlides = [
  {
    title: 'Data Center HoldCo',
    subtitle: 'Capacity contracts and refinance pressure',
    metric: 'DSCR 1.36x',
    insight: 'Exploded signal map shows tenant concentration, power hedge exposure, and maturity wall sensitivity.',
    color: '#84ddff',
  },
  {
    title: 'Solar Portfolio SPV',
    subtitle: 'Availability profile and PPA durability',
    metric: 'Headroom 24%',
    insight: 'Credit shards separate contracted revenue, merchant tail, curtailment risk, and reserve account coverage.',
    color: '#a98cff',
  },
  {
    title: 'Toll Road Concession',
    subtitle: 'Traffic downside and covenant compression',
    metric: 'Risk Elevated',
    insight: 'Stress fragments widen around traffic beta, inflation indexation, debt sculpting, and liquidity runway.',
    color: '#ffb06a',
  },
]

function CreditShard({
  index,
  active,
  color,
}: {
  index: number
  active: number
  color: string
}) {
  const meshRef = useRef<Mesh>(null)
  const baseAngle = (index / 12) * Math.PI * 2
  const base = useMemo(
    () => new Vector3(Math.cos(baseAngle) * 1.45, Math.sin(baseAngle * 1.7) * 0.48, Math.sin(baseAngle) * 1.45),
    [baseAngle],
  )
  const exploded = useMemo(
    () => new Vector3(Math.cos(baseAngle) * 2.65, Math.sin(baseAngle * 1.7) * 1.05, Math.sin(baseAngle) * 2.65),
    [baseAngle],
  )
  const current = useRef(base.clone())

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const target = active > 0 ? exploded : base
    current.current.lerp(target, 1 - Math.pow(0.04, delta))
    meshRef.current.position.copy(current.current)
    meshRef.current.rotation.x += delta * (0.35 + index * 0.018)
    meshRef.current.rotation.y += delta * (0.48 + index * 0.012)
  })

  return (
    <mesh ref={meshRef}>
      {index % 3 === 0 ? <boxGeometry args={[0.34, 0.12, 0.22]} /> : <icosahedronGeometry args={[0.18, 1]} />}
      <meshStandardMaterial
        color={new Color(color)}
        emissive={new Color(color)}
        emissiveIntensity={active > 0 ? 1.15 : 0.45}
        roughness={0.2}
        metalness={0.7}
        transparent
        opacity={0.72}
      />
    </mesh>
  )
}

function CreditExploderScene({ active, color }: { active: number; color: string }) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.12
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.08
  })

  return (
    <>
      <ambientLight intensity={0.36} />
      <pointLight position={[2.4, 2.5, 3]} intensity={2.8} color="#8bdfff" />
      <pointLight position={[-2.8, -1.8, 1.4]} intensity={1.7} color="#b08cff" />
      <group ref={groupRef} scale={1.18}>
        <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.28}>
          <mesh>
            <icosahedronGeometry args={[1.18, 5]} />
            <MeshDistortMaterial
              color={color}
              distort={0.18 + active * 0.04}
              speed={1.8}
              roughness={0.18}
              metalness={0.55}
              emissive={color}
              emissiveIntensity={0.42 + active * 0.18}
              transparent
              opacity={0.62}
            />
          </mesh>
        </Float>
        {Array.from({ length: 12 }).map((_, index) => (
          <CreditShard key={index} index={index} active={active} color={color} />
        ))}
      </group>
    </>
  )
}

export function DealIntelligenceLab() {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const selected = intelligenceSlides[active]

  return (
    <section className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Immersive intelligence"
            title="Explode a deal into the risk objects that matter."
            copy="A cinematic 3D signal model turns deal structure, covenants, downside cases, and sector context into a scannable investment surface."
          />
          <div className="grid gap-3">
            {intelligenceSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`group rounded-[var(--radius-sm)] border p-4 text-left transition duration-300 ${
                  active === index
                    ? 'border-cyan-100/35 bg-cyan-200/[0.075]'
                    : 'border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.055]'
                }`}
                onClick={() => setActive(index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{slide.title}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">{slide.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/24 px-3 py-1 text-xs text-[color:var(--text-soft)]">
                    {slide.metric}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <Button className="mt-7" href="#memo">
            Convert Signal to Memo
          </Button>
        </div>

        <motion.div
          className="glass-panel relative min-h-[32rem] overflow-hidden p-4"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(133,220,255,0.16),transparent_42%)]" />
          {!reduceMotion && (
            <Canvas camera={{ position: [0, 0, 4.2], fov: 38 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
              <CreditExploderScene active={active + 1} color={selected.color} />
            </Canvas>
          )}
          <motion.div
            key={selected.title}
            className="absolute inset-x-4 bottom-4 rounded-[var(--radius-sm)] border border-white/10 bg-black/34 p-4 backdrop-blur-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/42">Active signal object</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{selected.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{selected.insight}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
