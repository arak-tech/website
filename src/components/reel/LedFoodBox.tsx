import { motion, type Transition } from 'framer-motion'
import { useEffect, useState } from 'react'
import { spinBoxConfig } from '../../lib/config'
import { QrImageFace } from './QrImageFace'
import './food-box.css'

/** Framer lid flap duration — keep confetti/copy delays in sync in ReelAdvert */
export const BOX_LID_OPEN_DURATION_MS = 650

/** Cube settle after spin ends (matches non-spin cubeTransition duration) */
export const CUBE_SETTLE_MS = 420

const SPIN_SECONDS = 6

/** Winning face points straight at the camera (one side only) */
const STOP_Y = [0, -90, -180, 90]

type LedFoodBoxProps = {
  spinning?: boolean
  winningIndex?: number
  /** Parent allows lid phase (win / scan / brand); flap still waits until rotation stops */
  lidOpen?: boolean
  countdownSeconds?: number
}

export function LedFoodBox({
  spinning = false,
  winningIndex = 0,
  lidOpen = false,
  countdownSeconds,
}: LedFoodBoxProps) {
  const [flapOpen, setFlapOpen] = useState(false)
  const safeIndex = winningIndex % spinBoxConfig.offers.length
  const stopY = STOP_Y[safeIndex] ?? 0
  const fullTurns = 6 * 360
  const spinEndY = fullTurns + stopY

  const cubeAnimate = spinning
    ? { rotateY: [0, 720, 1440, spinEndY], rotateX: [-10, -6, -14, 0], scale: [0.45, 1.04, 1, 1] }
    : { rotateY: stopY, rotateX: 0, scale: 1 }

  const cubeTransition: Transition = spinning
    ? { duration: SPIN_SECONDS, ease: [0.15, 0.9, 0.2, 1], times: [0, 0.35, 0.72, 1] }
    : { duration: CUBE_SETTLE_MS / 1000, ease: 'easeOut' }

  useEffect(() => {
    if (spinning || !lidOpen) {
      setFlapOpen(false)
      return
    }
    const id = window.setTimeout(() => setFlapOpen(true), CUBE_SETTLE_MS)
    return () => window.clearTimeout(id)
  }, [spinning, lidOpen])

  const faceSides = ['front', 'right', 'back', 'left'] as const
  const showLidPhase = lidOpen
  const showFlapOpen = lidOpen && flapOpen

  return (
    <motion.div
      className={`food-box-stage${spinning ? ' is-spinning' : ' is-stopped'}${showLidPhase ? ' is-lid-open' : ''}${showFlapOpen ? ' is-flap-open' : ''}`}
    >
      <motion.div
        className="food-box-shadow"
        animate={spinning ? { scaleX: [0.5, 1.3, 1.05], opacity: [0.2, 0.6, 0.45] } : { scaleX: 1, opacity: 0.45 }}
        transition={{ duration: spinning ? SPIN_SECONDS : 0.35 }}
      />

      <motion.div className="food-box-assembly">
        <motion.div className="food-box-handle" aria-hidden />
        <motion.div
          className="food-box-cube"
          style={{ transformStyle: 'preserve-3d' }}
          initial={false}
          animate={cubeAnimate}
          transition={cubeTransition}
        >
          {spinBoxConfig.offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className={`cube-face cube-face-display cube-face-${faceSides[index]}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <QrImageFace
                offer={offer}
                showQr={!spinning}
                isWinner={!spinning && safeIndex === index}
              />
            </motion.div>
          ))}
          <div className={`cube-face cube-face-top cube-face-top-closed${showFlapOpen ? ' is-hidden' : ''}`}>
            <span className="cube-top-vents" aria-hidden />
          </div>
          <motion.div className="cube-face cube-face-bottom" />

          <motion.div className="box-lid-anchor" style={{ transformStyle: 'preserve-3d' }}>
            <div className="box-lid-anchor-inner">
              <div className="box-lid-flap">
                <motion.div
                  className="box-lid-inner"
                  initial={false}
                  animate={{ opacity: showFlapOpen ? 1 : 0.92 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="box-lid-kicker">MOBILE ROUTE SCREEN • SCAN QR</span>
                  {showFlapOpen && countdownSeconds !== undefined && (
                    <strong className="box-lid-countdown">
                      00:{countdownSeconds.toString().padStart(2, '0')}
                    </strong>
                  )}
                  {showFlapOpen && (
                    <span className="box-lid-offer">{spinBoxConfig.offers[safeIndex].headline}</span>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
