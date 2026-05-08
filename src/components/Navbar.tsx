import { Menu, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button'

const navItems = [
  { label: 'Platform', href: '#platform' },
  { label: 'Credit Analysis', href: '#dashboard' },
  { label: 'Portfolio Monitoring', href: '#monitoring' },
  { label: 'IC Memos', href: '#memo' },
  { label: 'Demo', href: '#demo' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className="mx-auto max-w-7xl rounded-[var(--radius-sm)] border border-white/10 bg-black/34 px-4 py-3 shadow-glass backdrop-blur-2xl"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
            <span className="flex size-9 items-center justify-center rounded-[var(--radius-xs)] border border-cyan-100/20 bg-white/[0.07] text-cyan-100 shadow-glow">
              <ShieldCheck size={18} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-[0.08em] text-white">
              CreditLens
            </span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden lg:block">
            <Button href="#demo" variant="nav">
              Request Demo
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-xs)] border border-white/12 bg-white/[0.055] text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
        {open && (
          <div id="mobile-nav" className="mt-4 grid gap-2 border-t border-white/10 pt-4 lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                className="rounded-[var(--radius-xs)] px-3 py-3 text-sm text-[color:var(--text-soft)] hover:bg-white/[0.06] hover:text-white"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button href="#demo" variant="primary" className="mt-2 w-full">
              Request Demo
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
