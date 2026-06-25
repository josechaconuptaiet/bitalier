import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import NoiseOverlay from './NoiseOverlay'
import { LIME, DARK } from '../constants'

export default function MissionVisionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="nosotros" ref={ref} className="py-32 relative overflow-hidden" style={{ background: DARK }}>
      <NoiseOverlay opacity={0.025} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(3,4,94,0.4) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-16">
          <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
            Por qué existimos
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {[
            { tag: 'Misión', quote: 'Empoderar a las empresas con soluciones tecnológicas hechas a la medida, integrando desarrollo de software y marketing digital para que cada negocio tenga una presencia online sólida y un sistema que realmente ejecute sus operaciones.', delay: 0 },
            { tag: 'Visión', quote: 'Ser el aliado tecnológico de referencia para empresas que buscan transformación digital, donde convergen la ingeniería de software y el marketing creativo en un solo ecosistema.', delay: 0.1 },
          ].map((item) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 lg:p-10 overflow-hidden cursor-default"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${LIME}, transparent)` }} />
              <span className="block text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>
                {item.tag}
              </span>
              <p className="text-xl lg:text-2xl font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                &ldquo;{item.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          id="proceso"
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { step: '01', label: 'Diagnóstico', desc: 'Entendemos tu negocio y mapeamos el ecosistema necesario.' },
            { step: '02', label: 'Estrategia', desc: 'Diseñamos el roadmap digital adaptado a tus objetivos.' },
            { step: '03', label: 'Ejecución', desc: 'Construimos pieza por pieza con calidad artesanal.' },
            { step: '04', label: 'Escalamiento', desc: 'Optimizamos y escalamos para resultados sostenibles.' },
          ].map((p) => (
            <div key={p.step} className="p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px' }}>
              <div className="text-xs mb-3" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}>{p.step}</div>
              <div className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "'Oxanium', sans-serif" }}>{p.label}</div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>{p.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
