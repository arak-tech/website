import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import type { FormEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { spinBoxConfig } from '../../lib/config'
import { COUNTDOWN_SECONDS, REEL_SCENES, type ReelSceneId } from '../../lib/reelTimeline'
import { playSound, stopSound, unlockAudio } from '../../lib/sounds'
import { FinalBrandShot } from '../FinalBrandShot'
import { BOX_LID_OPEN_DURATION_MS, CUBE_SETTLE_MS, LedFoodBox } from './LedFoodBox'
import { SpinButton } from './SpinButton'
import './reel.css'

/** After spin settles, then flap opens, then congrats / confetti */
const LID_OPEN_FINISH_MS = CUBE_SETTLE_MS + BOX_LID_OPEN_DURATION_MS + 70

const fireConfetti = () => {
  confetti({
    particleCount: 160,
    spread: 100,
    origin: { y: 0.38 },
    colors: ['#ffe566', '#16f4ff', '#ff5c8a', '#8bff76', '#ffffff'],
  })
  window.setTimeout(() => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#ffe566', '#ffffff'],
    })
  }, 180)
}

/** Confetti bursts that read like fireworks when the QR is “scanned”. */
const fireScanFireworks = () => {
  const burst = (x: number, delay: number) => {
    window.setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 90,
        spread: 65,
        origin: { x, y: 0.72 },
        startVelocity: 42,
        decay: 0.89,
        gravity: 1.05,
        ticks: 140,
        scalar: 1.05,
        colors: ['#ff9f1c', '#ffd60a', '#ff006e', '#3a86ff', '#ffffff', '#fb5607'],
      })
    }, delay)
  }
  burst(0.26, 0)
  burst(0.52, 120)
  burst(0.74, 260)
  burst(0.4, 400)
}

const sceneSound: Partial<Record<ReelSceneId, () => void>> = {
  intro: () => playSound('sting'),
  spin: () => playSound('spin'),
  win: () => {
    stopSound('spin')
    playSound('win')
  },
  scan: () => {
    playSound('fireworks')
    fireScanFireworks()
  },
  brand: () => playSound('whoosh'),
}

const BOX_SCENES = new Set<ReelSceneId>(['spin', 'win', 'scan', 'brand'])

export function ReelAdvert() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [audioReady, setAudioReady] = useState(false)
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [entryForm, setEntryForm] = useState({
    name: '',
    email: '',
    gender: '',
    phone: '',
  })
  const [replayKey, setReplayKey] = useState(0)
  const [winningOfferIndex, setWinningOfferIndex] = useState(0)
  const timers = useRef<number[]>([])

  const scene = REEL_SCENES[sceneIndex]
  const sceneId = scene?.id ?? 'intro'
  const winningOffer = spinBoxConfig.offers[winningOfferIndex]
  const showBox = BOX_SCENES.has(sceneId)

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
    return id
  }, [])

  const goToScene = useCallback((index: number) => {
    if (index >= REEL_SCENES.length) return
    if (REEL_SCENES[index]?.id === 'spin') {
      setWinningOfferIndex(Math.floor(Math.random() * spinBoxConfig.offers.length))
    }
    setSceneIndex(index)
  }, [])

  const replay = useCallback(() => {
    clearTimers()
    stopSound('spin')
    stopSound('fireworks')
    setSceneIndex(0)
    setCountdown(COUNTDOWN_SECONDS)
    setWinningOfferIndex(0)
    setReplayKey((k) => k + 1)
  }, [clearTimers])

  const startWithSound = useCallback(() => {
    unlockAudio()
    setAudioReady(true)
    setShowEntryForm(false)
  }, [])

  const openEntryForm = useCallback(() => {
    setShowEntryForm(true)
  }, [])

  const submitEntryForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      startWithSound()
    },
    [startWithSound],
  )

  useEffect(() => clearTimers, [clearTimers, replayKey])

  useEffect(() => {
    if (!audioReady) return
    sceneSound[sceneId]?.()
  }, [sceneId, audioReady, replayKey])

  useEffect(() => {
    if (!audioReady || sceneId !== 'win') return
    const id = schedule(() => fireConfetti(), LID_OPEN_FINISH_MS)
    return () => window.clearTimeout(id)
  }, [sceneId, audioReady, replayKey, schedule])

  useEffect(() => {
    if (!audioReady || sceneId !== 'scan') return

    setCountdown(COUNTDOWN_SECONDS)
    playSound('tick')

    let remaining = COUNTDOWN_SECONDS
    const tick = () => {
      remaining -= 1
      if (remaining <= 0) {
        setCountdown(0)
        return
      }
      setCountdown(remaining)
      playSound(remaining <= 2 ? 'urgent' : 'tick')
    }

    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [sceneId, audioReady, replayKey])

  useEffect(() => {
    if (!audioReady) return

    const { durationMs } = scene
    const next = sceneIndex + 1

    if (sceneId === 'spin') {
      schedule(() => stopSound('spin'), durationMs - 300)
    }

    const id = schedule(() => {
      if (next < REEL_SCENES.length) goToScene(next)
    }, durationMs)

    return () => window.clearTimeout(id)
  }, [sceneIndex, sceneId, scene, audioReady, goToScene, schedule, replayKey])

  useEffect(() => {
    if (sceneId === 'brand' && audioReady) {
      schedule(replay, scene.durationMs - 100)
    }
  }, [sceneId, scene.durationMs, audioReady, replay, schedule, replayKey])

  return (
    <main className="reel-app">
      <section className="reel-viewport" aria-label="LED box spin advert">
        {!audioReady && (
          <button type="button" className="reel-start-overlay" onClick={openEntryForm}>
            <strong>Play to win</strong>
          </button>
        )}

        {showEntryForm && !audioReady && (
          <div className="entry-modal-backdrop" role="presentation">
            <motion.form
              className="entry-modal"
              aria-label="Play to win entry form"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onSubmit={submitEntryForm}
            >
              <div className="entry-modal-header">
                <p>Enter to play</p>
                <h2>Play to win</h2>
              </div>

              <label className="entry-field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={entryForm.name}
                  onChange={(event) => setEntryForm((form) => ({ ...form, name: event.target.value }))}
                  required
                />
              </label>

              <label className="entry-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={entryForm.email}
                  onChange={(event) => setEntryForm((form) => ({ ...form, email: event.target.value }))}
                  required
                />
              </label>

              <label className="entry-field">
                <span>Gender</span>
                <select
                  name="gender"
                  value={entryForm.gender}
                  onChange={(event) => setEntryForm((form) => ({ ...form, gender: event.target.value }))}
                  required
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </label>

              <label className="entry-field">
                <span>Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={entryForm.phone}
                  onChange={(event) => setEntryForm((form) => ({ ...form, phone: event.target.value }))}
                  required
                />
              </label>

              <button type="submit" className="entry-submit-btn">
                Start playing
              </button>
            </motion.form>
          </div>
        )}

        <div className="reel-frame" key={replayKey}>
          {sceneId === 'intro' && <IntroScene />}

          {showBox && (
            <motion.div
              className={`reel-scene box-scene box-scene--courier${sceneId === 'spin' ? ' box-scene--rush' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <LedFoodBox
                key={`box-${replayKey}`}
                spinning={sceneId === 'spin'}
                winningIndex={winningOfferIndex}
                lidOpen={sceneId === 'win' || sceneId === 'scan' || sceneId === 'brand'}
                countdownSeconds={sceneId === 'scan' ? countdown : undefined}
              />

              {sceneId === 'brand' && (
                <motion.div
                  className="brand-over-box"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <FinalBrandShot />
                </motion.div>
              )}

              {sceneId === 'win' && (
                <>
                  <motion.p
                    className="congrats-banner"
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: LID_OPEN_FINISH_MS / 1000,
                      duration: 0.38,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    CONGRATS! 🎉
                  </motion.p>
                  <motion.p
                    className="win-offer-label"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: LID_OPEN_FINISH_MS / 1000 + 0.28,
                      duration: 0.35,
                      ease: 'easeOut',
                    }}
                  >
                    You won: <strong>{winningOffer.headline}</strong>
                  </motion.p>
                </>
              )}

              {sceneId === 'scan' && (
                <a
                  className="claim-offer-btn"
                  href={winningOffer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playSound('fireworks')
                    fireScanFireworks()
                  }}
                >
                  Claim {winningOffer.headline}
                </a>
              )}
            </motion.div>
          )}
        </div>

        <button type="button" className="reel-replay-btn" onClick={replay}>
          Replay
        </button>
      </section>
    </main>
  )
}

function IntroScene() {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setPressed(true), 900)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="reel-scene intro-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SpinButton pressed={pressed} />
    </motion.div>
  )
}
