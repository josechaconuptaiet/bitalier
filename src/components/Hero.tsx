import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import BinaryRain from './BinaryRain'
import NoiseOverlay from './NoiseOverlay'
import { LIME, DEEP, DARK, STATS } from '../constants'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="min-h-screen flex flex-col overflow-hidden" style={{ background: DARK, position: 'relative' }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${DEEP} 0%, transparent 70%)` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 40% 40% at 20% 80%, rgba(165,240,0,0.06) 0%, transparent 60%)` }} />

      <BinaryRain />
      <NoiseOverlay opacity={0.04} />

      <div className="absolute inset-0 pointer-events-none">
        {[30, 55, 75].map((pct) => (
          <div key={pct} className="absolute inset-x-0 h-px" style={{ top: `${pct}%`, background: 'rgba(165,240,0,0.06)' }} />
        ))}
        {[20, 50, 80].map((pct) => (
          <div key={pct} className="absolute inset-y-0 w-px" style={{ left: `${pct}%`, background: 'rgba(165,240,0,0.04)' }} />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-20 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
            Taller artesanal digital
          </span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full" style={{ background: LIME }} />
            <div className="w-8 h-px self-center" style={{ background: LIME, opacity: 0.4 }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10"
        >
          <h1 className="text-[clamp(3rem,9vw,8rem)] font-black leading-[0.95] tracking-tight" style={{ fontFamily: "'Oxanium', sans-serif" }}>
            <motion.span
              className="block text-white"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Bit por bit,
            </motion.span>
            <motion.span
              className="block text-white/20"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              construimos
            </motion.span>
            <motion.span
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block relative inline-block"
              style={{ color: LIME, textShadow: `0 0 80px rgba(165,240,0,0.35), 0 0 20px rgba(165,240,0,0.2)` }}
            >
              tu ecosistema
            </motion.span>
            <motion.span
              className="block text-white/20"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              digital.
            </motion.span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="text-base lg:text-lg text-white/45 leading-relaxed max-w-md"
          >
            Somos el estudio donde el código se escribe con el mismo esmero
            con el que un artesano trabaja su pieza. Desarrollo de software y
            marketing digital en un solo ecosistema.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contacto"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold rounded transition-all duration-200"
              style={{ background: LIME, color: DEEP, fontFamily: "'Oxanium', sans-serif" }}
            >
              Iniciar mi proyecto
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white/60 hover:text-white transition-colors rounded"
              style={{ border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'Oxanium', sans-serif" }}
            >
              Ver servicios
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-20 flex justify-center pb-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/25" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            scroll
          </span>
          <ChevronDown size={14} className="text-white/25 animate-bounce" />
        </div>
      </motion.div>

      <div className="relative z-20 border-t" style={{ borderColor: 'rgba(165,240,0,0.1)', background: 'rgba(3,4,94,0.25)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0" style={{ borderColor: 'rgba(165,240,0,0.08)' }}>
            {STATS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                  className="flex items-center gap-4 px-6 py-7"
                  style={{ borderColor: 'rgba(165,240,0,0.08)' }}
                >
                  <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{ background: 'rgba(165,240,0,0.08)' }}>
                    <Icon size={16} style={{ color: LIME }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold leading-none mb-0.5" style={{ color: LIME, fontFamily: "'Oxanium', sans-serif" }}>
                      {s.value}
                    </div>
                    <div className="text-[11px] text-white/35 tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {s.label}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
