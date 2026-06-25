import { motion } from 'motion/react'
import NoiseOverlay from '../components/NoiseOverlay'
import CTASection from '../components/CTASection'
import { LIME, DEEP, DARK } from '../constants'

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-32 pb-20" style={{ background: DARK }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${DEEP} 0%, transparent 70%)` }} />
        <NoiseOverlay opacity={0.03} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="block text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
              Contacto
            </span>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.0] tracking-tight text-white mb-6" style={{ fontFamily: "'Oxanium', sans-serif" }}>
              Hagamos realidad<br />
              <span style={{ color: LIME }}>tu proyecto</span>
            </h1>
            <p className="text-base lg:text-lg leading-relaxed max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Cuéntanos lo que tienes en mente. Te responderemos en 24 horas
              con un diagnóstico inicial sin compromiso.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
