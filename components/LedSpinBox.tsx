'use client'

import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { LedScreen, type SpinState } from './LedScreen'
import { playSound } from '../lib/sounds'

const COUNTDOWN_SECONDS = 10

export function LedSpinBox() {
  const [state, setState] = useState<SpinState>('idle')
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    timers.current = []
  }

  useEffect(() => clearTimers, [])

  useEffect(() => {
    if (state !== 'countdown') {
      return
    }

    playSound('tick')
    const timer = window.setTimeout(() => {
      if (seconds <= 1) {
        setSeconds(0)
        setState('qr')
        return
      }

      setSeconds((value) => value - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [seconds, state])

  const startSpin = () => {
    if (state !== 'idle') {
      return
    }

    clearTimers()
    playSound('tap')
    setSeconds(COUNTDOWN_SECONDS)
    setState('spinning')

    timers.current.push(
      window.setTimeout(() => {
        setState('won')
        playSound('win')
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.48 },
          colors: ['#16f4ff', '#ff6b1a', '#ff255e', '#ffffff'],
        })
      }, 2800),
      window.setTimeout(() => setState('countdown'), 4800),
    )
  }

  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="LED SpinBox mobile campaign preview">
        <div className="ambient-grid" />
        <motion.div
          className="led-box"
          animate={
            state === 'spinning'
              ? { rotate: [-0.4, 0.55, -0.2, 0.35, 0], scale: [1, 1.01, 1] }
              : { rotate: 0, scale: 1 }
          }
          transition={state === 'spinning' ? { duration: 0.28, repeat: Infinity } : { duration: 0.3 }}
        >
          <div className="box-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="box-body">
            <i className="screw screw-tl" />
            <i className="screw screw-tr" />
            <i className="screw screw-bl" />
            <i className="screw screw-br" />
            <LedScreen state={state} seconds={seconds} onStart={startSpin} onScanned={() => setState('final')} />
          </div>
          <div className="box-stand" />
          <div className="floor-glow" />
        </motion.div>
      </section>
    </main>
  )
}
