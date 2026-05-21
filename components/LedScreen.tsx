import { motion } from 'framer-motion'
import { Countdown } from './Countdown'
import { FinalBrandShot } from './FinalBrandShot'
import { OfferSpinner } from './OfferSpinner'
import { QRCodeClaim } from './QRCodeClaim'

export type SpinState = 'idle' | 'spinning' | 'won' | 'countdown' | 'qr' | 'final'

type LedScreenProps = {
  state: SpinState
  seconds: number
  onStart: () => void
  onScanned: () => void
}

export function LedScreen({ state, seconds, onStart, onScanned }: LedScreenProps) {
  const isIdle = state === 'idle'

  return (
    <button
      type="button"
      className={`led-screen state-${state}`}
      onClick={isIdle ? onStart : undefined}
      disabled={!isIdle}
      aria-label={isIdle ? 'Tap the LED box to spin and win' : 'LED SpinBox active'}
    >
      <div className="scanlines" />
      <div className="screen-noise" />

      {state === 'idle' && (
        <motion.div
          className="screen-content idle-content"
          animate={{ scale: [1, 1.035, 1], opacity: [0.86, 1, 0.86] }}
          transition={{ duration: 1.35, repeat: Infinity }}
        >
          <span>Tap the LED box</span>
          <h1>PRESS TO WIN</h1>
          <small>Tap to start</small>
        </motion.div>
      )}

      {state === 'spinning' && (
        <motion.div
          className="screen-content spinning-content"
          animate={{ x: [-4, 5, -2, 3, 0], filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          <OfferSpinner active />
          <span>SPINNING...</span>
        </motion.div>
      )}

      {state === 'won' && (
        <motion.div
          className="screen-content won-content"
          initial={{ scale: 0.72, rotate: -2, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 15 }}
        >
          <span>YOU WON</span>
          <h1>SCAN ME</h1>
        </motion.div>
      )}

      {state === 'countdown' && (
        <div className="screen-content">
          <Countdown seconds={seconds} />
        </div>
      )}

      {state === 'qr' && (
        <div className="screen-content">
          <QRCodeClaim onScanned={onScanned} />
        </div>
      )}

      {state === 'final' && (
        <div className="screen-content">
          <FinalBrandShot />
        </div>
      )}
    </button>
  )
}
