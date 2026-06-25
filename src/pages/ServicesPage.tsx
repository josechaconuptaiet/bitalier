import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import NoiseOverlay from '../components/NoiseOverlay'
import ServicesSection from '../components/ServicesSection'
import CTASection from '../components/CTASection'
import { LIME, DEEP, DARK } from '../constants'

export default function ServicesPage() {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-32 pb-20" style={{ background: DARK }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 50% at 30% 40%, ${DEEP} 0%, transparent 70%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 40% 40% at 80% 60%, rgba(165,240,0,0.05) 0%, transparent 60%)` }} />
        <NoiseOverlay opacity={0.03} />

        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${LIME} 1px, transparent 1px), linear-gradient(90deg, ${LIME} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="block text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
              Nuestros servicios
            </span>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.0] tracking-tight text-white mb-6" style={{ fontFamily: "'Oxanium', sans-serif" }}>
              Todo lo que tu<br />
              <span style={{ color: LIME }}>negocio necesita</span>
            </h1>
            <p className="text-base lg:text-lg leading-relaxed max-w-xl mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Desde el código hasta la estrategia, cubrimos cada aspecto de tu
              presencia digital. Un solo aliado, todas las soluciones.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contacto"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded transition-all duration-200"
                style={{ background: LIME, color: DEEP, fontFamily: "'Oxanium', sans-serif" }}
              >
                Iniciar proyecto <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ServicesSection />
      <CTASection />
    </>
  )
}
