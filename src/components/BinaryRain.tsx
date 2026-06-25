import { motion } from 'motion/react'
import { LIME } from '../constants'

export default function BinaryRain() {
  const chars = '01'.split('')
  const cols = 18

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {Array.from({ length: cols }).map((_, col) => (
        <motion.div
          key={col}
          className="absolute top-0 flex flex-col gap-1"
          style={{
            left: `${(col / cols) * 100}%`,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: LIME,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.25, 0],
            y: ['-10%', '110%'],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            delay: Math.random() * 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 28 }).map((_, r) => (
            <span key={r}>{chars[Math.floor(Math.random() * chars.length)]}</span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
