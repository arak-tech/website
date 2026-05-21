import { motion } from 'framer-motion'

type CountdownProps = {
  seconds: number
}

export function Countdown({ seconds }: CountdownProps) {
  return (
    <motion.div
      className="countdown-panel"
      animate={{ scale: seconds <= 3 ? [1, 1.06, 1] : [1, 1.025, 1] }}
      transition={{ duration: 0.55, repeat: Infinity }}
    >
      <span>CLAIM BEFORE TIME RUNS OUT</span>
      <strong>00:{seconds.toString().padStart(2, '0')}</strong>
    </motion.div>
  )
}
