import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { LIME, DEEP } from '../constants'
import logoSrc from '../assets/logoHeader.webp'

const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10,12,16,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(165,240,0,0.1)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img src={logoSrc} alt="Bitalier" className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm tracking-wide transition-colors duration-200 ${
                location.pathname === item.href
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contacto"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded transition-all duration-200 group"
          style={{
            background: LIME,
            color: DEEP,
            fontFamily: "'Oxanium', sans-serif",
          }}
        >
          Iniciar proyecto
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5 border-t"
          style={{
            background: 'rgba(10,12,16,0.98)',
            borderColor: 'rgba(165,240,0,0.1)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm transition-colors ${
                location.pathname === item.href
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded w-fit"
            style={{ background: LIME, color: DEEP, fontFamily: "'Oxanium', sans-serif" }}
          >
            Iniciar proyecto <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </header>
  )
}
