import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import NoiseOverlay from './NoiseOverlay'
import { LIME, DARK, SERVICES } from '../constants'

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const Icon = service.icon

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col p-7 overflow-hidden cursor-default transition-colors duration-300"
      style={{
        border: `1px solid ${hovered ? 'rgba(165,240,0,0.25)' : 'rgba(255,255,255,0.06)'}`,
        background: hovered ? 'rgba(165,240,0,0.03)' : 'rgba(255,255,255,0.02)',
        borderRadius: '2px',
      }}
    >
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(165,240,0,0.12) 0%, transparent 70%)`, opacity: hovered ? 1 : 0 }}
      />

      <div className="flex items-start justify-between mb-6">
        <div
          className="w-11 h-11 rounded flex items-center justify-center transition-colors duration-300"
          style={{
            background: hovered ? 'rgba(165,240,0,0.12)' : 'rgba(3,4,94,0.6)',
            border: `1px solid ${hovered ? 'rgba(165,240,0,0.3)' : 'rgba(3,4,94,0.8)'}`,
          }}
        >
          <Icon size={18} style={{ color: LIME }} />
        </div>
        <span className="text-xs transition-colors duration-300" style={{ fontFamily: "'JetBrains Mono', monospace", color: hovered ? 'rgba(165,240,0,0.5)' : 'rgba(255,255,255,0.15)' }}>
          {service.number}
        </span>
      </div>

      <h3 className="text-base font-semibold mb-3 transition-colors duration-300" style={{ fontFamily: "'Oxanium', sans-serif", color: hovered ? 'white' : 'rgba(255,255,255,0.85)' }}>
        {service.title}
      </h3>

      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {service.short}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2.5 py-1 rounded-sm transition-colors duration-300"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              border: `1px solid ${hovered ? 'rgba(165,240,0,0.2)' : 'rgba(255,255,255,0.08)'}`,
              color: hovered ? 'rgba(165,240,0,0.7)' : 'rgba(255,255,255,0.3)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-6 right-6"
      >
        <ArrowUpRight size={16} style={{ color: LIME }} />
      </motion.div>
    </motion.article>
  )
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" className="py-32 relative overflow-hidden" style={{ background: DARK }}>
      <NoiseOverlay opacity={0.025} />

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(${LIME} 1px, transparent 1px), linear-gradient(90deg, ${LIME} 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
              Nuestros servicios
            </span>
            <h2 className="text-4xl lg:text-6xl font-black leading-[1.02] tracking-tight text-white" style={{ fontFamily: "'Oxanium', sans-serif" }}>
              Lo que<br /><span style={{ color: LIME }}>construimos</span><br />para ti
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm leading-relaxed max-w-xs text-right hidden lg:block"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Cada servicio es una pieza de un sistema mayor. Combinados, forman
            un ecosistema digital completo para tu empresa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.number} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
