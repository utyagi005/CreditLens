import { motion } from 'framer-motion'
import {
  BarChart3,
  BrainCircuit,
  DatabaseZap,
  FileText,
  Radar,
  Scale,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react'
import { AppLoader } from './components/AppLoader'
import { CinematicBackground } from './components/CinematicBackground'
import { DashboardPreview } from './components/DashboardPreview'
import { FeatureCard } from './components/FeatureCard'
import { FinalCTA } from './components/FinalCTA'
import { Hero } from './components/Hero'
import { MemoPreview } from './components/MemoPreview'
import { Navbar } from './components/Navbar'
import { PortfolioMonitoring } from './components/PortfolioMonitoring'
import { SectionHeader } from './components/SectionHeader'
import { StressTesting } from './components/StressTesting'
import { platformModules, positioningItems } from './data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function PlatformModules() {
  const icons = [DatabaseZap, BrainCircuit, Scale, FileText]

  return (
    <section id="platform" className="section-shell">
      <SectionHeader
        eyebrow="Platform modules"
        title="A complete credit workflow from intake to committee."
        copy="CreditLens connects deal screening, bottom-up risk analysis, relative value, and memo generation in one controlled institutional workspace."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {platformModules.map((module, index) => {
          const Icon = icons[index]
          return (
            <FeatureCard
              key={module.title}
              icon={<Icon aria-hidden="true" />}
              title={module.title}
              copy={module.copy}
              meta={module.meta}
              delay={index * 0.08}
            />
          )
        })}
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <motion.section
      className="section-shell pt-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
    >
      <div className="glass-panel overflow-hidden px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-3xl text-sm leading-6 text-[color:var(--muted)] sm:text-base">
            Built for private credit, infrastructure debt, direct lending, due
            diligence, and portfolio monitoring workflows.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {positioningItems.map((item) => (
              <div
                key={item}
                className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-medium text-[color:var(--text-soft)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function IntelligenceBand() {
  const capabilities = [
    { icon: Radar, label: 'Covenant anomaly sensing', value: '24 names flagged' },
    { icon: BarChart3, label: 'Risk rating migration', value: '+11% watchlist beta' },
    { icon: TrendingDown, label: 'Downside liquidity bridge', value: '18 month runway' },
  ]

  return (
    <section className="section-shell py-8">
      <div className="grid gap-4 lg:grid-cols-3">
        {capabilities.map(({ icon: Icon, label, value }, index) => (
          <motion.div
            key={label}
            className="glass-panel flex items-center gap-4 p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-cyan-200/15 bg-cyan-300/10 text-cyan-100">
              <Icon size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function LandingPage() {
  return (
    <motion.div
      className="relative min-h-screen overflow-hidden text-[color:var(--foreground)]"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <CinematicBackground />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <PlatformModules />
        <DashboardPreview />
        <StressTesting />
        <MemoPreview />
        <PortfolioMonitoring />
        <IntelligenceBand />
        <FinalCTA />
      </main>
      <footer className="relative z-10 border-t border-white/10 px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[color:var(--text-soft)]">
            <ShieldCheck size={15} aria-hidden="true" />
            CreditLens institutional private credit intelligence
          </div>
          <div className="flex flex-wrap gap-4">
            <a className="premium-link" href="#platform">
              Platform
            </a>
            <a className="premium-link" href="#monitoring">
              Monitoring
            </a>
            <a className="premium-link" href="#memo">
              IC Memos
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}

export default function App() {
  return (
    <AppLoader>
      <LandingPage />
    </AppLoader>
  )
}
