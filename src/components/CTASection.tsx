import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import NoiseOverlay from './NoiseOverlay'
import { LIME, DEEP } from '../constants'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <section id="contacto" ref={ref} className="relative py-36 overflow-hidden" style={{ background: DEEP }}>
      <NoiseOverlay opacity={0.05} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(165,240,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(165,240,0,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(165,240,0,0.12) 0%, transparent 70%)', transform: 'translate(-50%, 40%)' }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-[10px] tracking-[0.25em] uppercase mb-8" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
            ¿Listo para el siguiente nivel?
          </span>
          <h2 className="text-5xl lg:text-7xl font-black leading-[1.0] tracking-tight text-white mb-6" style={{ fontFamily: "'Oxanium', sans-serif" }}>
            Construyamos<br /><span style={{ color: LIME }}>juntos</span>
          </h2>
          <p className="text-base lg:text-lg leading-relaxed max-w-lg mx-auto mb-12" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Cuéntanos tu proyecto. En 24 horas te respondemos con un diagnóstico inicial y un roadmap personalizado, sin compromiso.
          </p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-sm"
              style={{ background: 'rgba(165,240,0,0.1)', border: `1px solid ${LIME}40` }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: LIME }} />
              <span className="text-sm font-medium" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
                ¡Recibido! Te contactamos en 24h.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto mb-8">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="flex-1 px-5 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition-colors duration-200"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', fontFamily: "'DM Sans', sans-serif" }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(165,240,0,0.4)' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold whitespace-nowrap transition-all duration-200"
                style={{ background: LIME, color: DEEP, fontFamily: "'Oxanium', sans-serif", borderRadius: '2px' }}
              >
                Empezar ahora <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace" }}>
            Sin spam. Sin compromisos. Solo resultados.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
