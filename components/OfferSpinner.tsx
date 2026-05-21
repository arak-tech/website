import { motion } from 'framer-motion'

type OfferSpinnerProps = {
  active: boolean
}

const labels = ['PRIZE 1', 'PRIZE 2', 'PRIZE 3', 'PRIZE 4']

export function OfferSpinner({ active }: OfferSpinnerProps) {
  const reel = [...labels, ...labels, ...labels]

  return (
    <motion.div className="offer-spinner" aria-hidden={!active}>
      <motion.div
        className="offer-reel"
        animate={active ? { y: ['0%', '-66.66%'] } : { y: '0%' }}
        transition={active ? { duration: 0.72, ease: 'linear', repeat: Infinity } : { duration: 0 }}
      >
        {reel.map((offer, index) => (
          <motion.div className="offer-frame" key={`${offer}-${index}`}>
            {offer}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
