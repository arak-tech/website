import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ScreenVariant = 'idle' | 'spin' | 'won' | 'countdown' | 'qr' | 'brand'

type LedBoxVisualProps = {
  variant: ScreenVariant
  children: ReactNode
  shake?: boolean
  glowPulse?: boolean
}

export function LedBoxVisual({ variant, children, shake = false, glowPulse = false }: LedBoxVisualProps) {
  return (
    <motion.div
      className={`reel-led-box variant-${variant}`}
      animate={
        shake
          ? { x: [-3, 4, -2, 3, 0], rotate: [-0.6, 0.5, -0.3, 0.2, 0] }
          : glowPulse
            ? { scale: [1, 1.012, 1] }
            : { x: 0, rotate: 0, scale: 1 }
      }
      transition={
        shake
          ? { duration: 0.18, repeat: Infinity }
          : glowPulse
            ? { duration: 0.9, repeat: Infinity }
            : { duration: 0.35 }
      }
    >
      <motion.div
        className="reel-box-chassis"
        animate={glowPulse ? { boxShadow: ['0 0 30px rgba(22,244,255,0.2)', '0 0 55px rgba(255,107,26,0.45)', '0 0 30px rgba(22,244,255,0.2)'] } : {}}
        transition={{ duration: 0.8, repeat: glowPulse ? Infinity : 0 }}
      >
        <motion.div
          className="reel-box-screen"
          animate={
            variant === 'spin'
              ? {
                  filter: ['blur(0px)', 'blur(2.5px)', 'blur(0px)'],
                  scale: [1, 1.02, 1],
                }
              : {}
          }
          transition={variant === 'spin' ? { duration: 0.12, repeat: Infinity } : {}}
        >
          <motion.div
            className="reel-screen-inner"
            style={{ transformStyle: 'preserve-3d', perspective: 800 }}
            animate={
              variant === 'spin'
                ? {
                    rotateX: [0, 8, -6, 4, 0],
                    rotateY: [0, -12, 10, -8, 0],
                  }
                : { rotateX: 0, rotateY: 0 }
            }
            transition={variant === 'spin' ? { duration: 0.35, repeat: Infinity, ease: 'easeInOut' } : {}}
          >
            <motion.div
              className="reel-screen-glass"
              animate={variant === 'spin' ? { opacity: [0.85, 1, 0.9] } : { opacity: 1 }}
              transition={{ duration: 0.2, repeat: variant === 'spin' ? Infinity : 0 }}
            >
              {children}
            </motion.div>
          </motion.div>
          <div className="reel-scanlines" aria-hidden />
          <motion.div
            className="reel-screen-glare"
            animate={variant === 'spin' ? { x: ['-120%', '220%'] } : { x: '-120%' }}
            transition={variant === 'spin' ? { duration: 0.55, repeat: Infinity, ease: 'linear' } : {}}
            aria-hidden
          />
        </motion.div>
        <div className="reel-box-stand" />
        <motion.div
          className="reel-floor-glow"
          animate={glowPulse ? { opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.7, repeat: glowPulse ? Infinity : 0 }}
        />
      </motion.div>
    </motion.div>
  )
}
