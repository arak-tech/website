'use client'

import { motion } from 'framer-motion'

type SpinButtonProps = {
  pressed?: boolean
}

export function SpinButton({ pressed = false }: SpinButtonProps) {
  return (
    <motion.button
      type="button"
      className="spin-btn"
      aria-label="Scan me to win"
      animate={{ scale: pressed ? 0.92 : 1, y: pressed ? 4 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      SCAN ME TO WIN
    </motion.button>
  )
}
