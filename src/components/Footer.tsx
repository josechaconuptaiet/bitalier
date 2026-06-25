import { Link } from 'react-router-dom'
import { LIME, DARK } from '../constants'
import logoSrc from '../assets/LogoFooter.webp'

export default function Footer() {
  return (
    <footer style={{ background: DARK, borderTop: '1px solid rgba(165,240,0,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-5">
              <img src={logoSrc} alt="Bitalier" className="h-12 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Taller artesanal digital donde el código encuentra el arte. Desarrollo de software y marketing digital en un ecosistema.
            </p>
            <span className="text-xs italic" style={{ color: `${LIME}80`, fontFamily: "'JetBrains Mono', monospace" }}>
              "Bit por bit, creamos tu ecosistema digital."
            </span>
          </div>

          <div>
            <h5 className="text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>
              Servicios
            </h5>
            <ul className="space-y-2.5">
              {['Desarrollo de Software', 'Marketing Digital', 'Diseño UX/UI', 'SEO & SEM', 'Branding'].map((s) => (
                <li key={s}><Link to="/servicios" className="text-sm transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.35)' }}>{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>
              Empresa
            </h5>
            <ul className="space-y-2.5">
              {[{ label: 'Inicio', to: '/' }, { label: 'Nosotros', to: '/nosotros' }, { label: 'Contacto', to: '/contacto' }].map((s) => (
                <li key={s.label}><Link to={s.to} className="text-sm transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace" }}>
            © {new Date().getFullYear()} Bitalier. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace" }}>
            Hecho <span style={{ color: `${LIME}60` }}>bit por bit</span> con dedicación artesanal.
          </p>
        </div>
      </div>
    </footer>
  )
}
