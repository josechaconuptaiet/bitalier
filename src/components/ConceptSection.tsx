import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import NoiseOverlay from './NoiseOverlay'
import { LIME, DEEP } from '../constants'

export default function ConceptSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="concepto" className="relative py-32 overflow-hidden" style={{ background: DEEP }}>
      <NoiseOverlay opacity={0.04} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(165,240,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(165,240,0,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[28vw] font-black leading-none tracking-tight" style={{ fontFamily: "'Oxanium', sans-serif", color: 'rgba(255,255,255,0.02)' }}>
          BIT
        </span>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.25em] uppercase mb-16"
          style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace" }}
        >
          El concepto de marca
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-0">
              {[
                { label: 'Bit', sub: 'Código · Precisión · Ingeniería · Lógica', accent: false },
                { label: '+', sub: '', accent: true, operator: true },
                { label: 'Atelier', sub: 'Oficio · Cuidado · Personalización · Arte', accent: true },
                { label: '=', sub: '', accent: false, operator: true },
                { label: 'Bitalier', sub: '', accent: true, result: true },
              ].map((item, i) => {
                if (item.result) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="pt-4"
                    >
                      <div className="text-5xl lg:text-7xl font-black mb-3" style={{ fontFamily: "'Oxanium', sans-serif", color: LIME, textShadow: '0 0 60px rgba(165,240,0,0.3)' }}>
                        {item.label}
                      </div>
                      <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        No somos una fábrica de software en serie. Cada línea de
                        código se escribe con el mismo esmero con el que un artesano
                        trabaja su pieza.
                      </p>
                    </motion.div>
                  )
                }

                if (item.operator) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.2 + i * 0.12 }}
                      className="text-6xl font-black py-2"
                      style={{ fontFamily: "'Oxanium', sans-serif", color: item.accent ? LIME : 'rgba(255,255,255,0.2)' }}
                    >
                      {item.label}
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="py-3 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-4xl lg:text-5xl font-black mb-1" style={{ fontFamily: "'Oxanium', sans-serif", color: item.accent ? LIME : 'white' }}>
                      {item.label}
                    </div>
                    <div className="text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}>
                      {item.sub}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 lg:pt-4"
          >
            {[
              { n: '01', title: 'El Bit', body: 'Representa lo digital, lo lógico, lo exacto. El tagline "Bit por bit" alude a que todo gran ecosistema digital se construye pieza por pieza, como un rompecabezas de unos y ceros que cobra sentido.' },
              { n: '02', title: 'El Atelier', body: 'Es el taller, el oficio, la artesanía. Cada proyecto se describe como una pieza única hecha a mano, no un producto genérico. El concepto de taller artesanal digital es el corazón de la marca.' },
              { n: '03', title: 'El Ecosistema', body: 'Una gota de agua es una unidad mínima que, en conjunto con otras, forma un ecosistema vivo. Así como el bit es la unidad mínima digital, pequeñas piezas interconectadas crean algo mayor.' },
            ].map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 rounded-sm transition-all duration-300 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex gap-5">
                  <span className="text-xs shrink-0 mt-0.5" style={{ color: LIME, fontFamily: "'JetBrains Mono', monospace", opacity: 0.6 }}>
                    {p.n}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white mb-2" style={{ fontFamily: "'Oxanium', sans-serif" }}>{p.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 }}
              className="flex gap-3 pt-4"
            >
              {[
                { hex: DEEP, name: 'Azul profundo', border: 'rgba(255,255,255,0.15)' },
                { hex: LIME, name: 'Verde lima neón', border: 'rgba(165,240,0,0.4)' },
              ].map((c) => (
                <div key={c.hex} className="flex items-center gap-3 px-4 py-3 rounded-sm flex-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-6 h-6 rounded-sm shrink-0" style={{ background: c.hex, border: `1px solid ${c.border}` }} />
                  <div>
                    <div className="text-[10px] text-white font-medium" style={{ fontFamily: "'Oxanium', sans-serif" }}>{c.name}</div>
                    <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>{c.hex}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
