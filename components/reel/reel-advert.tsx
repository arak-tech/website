'use client'

import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { spinBoxConfig } from '../../lib/config'
import {
  BUSINESS_TYPE_OPTIONS,
  EMPTY_ENTRY_FORM,
  ENTRY_STORAGE_KEY,
  submitEntryForm,
  type EntryFormData,
  type StoredEntryFormData,
} from '../../lib/entry-form'
import { REEL_SCENES, type ReelSceneId } from '../../lib/reel-timeline'
import { playSound, stopSound, unlockAudio } from '../../lib/sounds'
import { FinalBrandShot } from '../final-brand-shot'
import { BOX_LID_OPEN_DURATION_MS, CUBE_SETTLE_MS, LedFoodBox } from './led-food-box'
import { SpinButton } from './spin-button'

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

const sceneSound: Partial<Record<ReelSceneId, () => void>> = {
  intro: () => playSound('sting'),
  spin: () => playSound('spin'),
  win: () => {
    stopSound('spin')
    playSound('fireworks')
  },
  brand: () => playSound('whoosh'),
}

const BOX_SCENES = new Set<ReelSceneId>(['spin', 'win', 'brand'])

const offerBrands = [
  { name: 'Chicken Inn', image: '/brand-offers/chicken-inn.png' },
  { name: 'Pizza Inn', image: '/brand-offers/pizza-inn.png' },
  { name: 'Creamy Inn', image: '/brand-offers/creamy-inn.jpg' },
  { name: "Baker's Inn", image: '/brand-offers/bakers-inn.jpg' },
  { name: 'RocoMamas', image: '/brand-offers/rocomamas.jpg' },
  { name: "Nando's", image: '/brand-offers/nandos.jpg' },
  { name: 'Steers', image: '/brand-offers/steers.jpg' },
  { name: "Galito's", image: '/brand-offers/galitos.jpg' },
  { name: 'Ocean Basket', image: '/brand-offers/ocean-basket.png' },
  { name: 'Grilll Shack', image: '/brand-offers/grilll-shack.png' },
]

const marqueeBrands = [...offerBrands, ...offerBrands]


function readLatestStoredEntry(): EntryFormData | null {
  try {
    const rawEntries = window.localStorage.getItem(ENTRY_STORAGE_KEY)
    if (!rawEntries) return null

    const entries = JSON.parse(rawEntries) as unknown
    if (!Array.isArray(entries) || entries.length === 0) return null

    const latest = entries[entries.length - 1] as Partial<StoredEntryFormData>
    if (!latest.name || !latest.phone || !latest.gender || !latest.businessType) return null

    return {
      name: latest.name,
      phone: latest.phone,
      gender: latest.gender,
      businessType: latest.businessType,
    }
  } catch {
    return null
  }
}

export function ReelAdvert() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [audioReady, setAudioReady] = useState(false)
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [entryForm, setEntryForm] = useState<EntryFormData>(EMPTY_ENTRY_FORM)
  const [hasStoredEntry, setHasStoredEntry] = useState(false)
  const [entrySubmitting, setEntrySubmitting] = useState(false)
  const [entryError, setEntryError] = useState<string | null>(null)
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

    const nextSceneId = REEL_SCENES[index]?.id
    if (nextSceneId === 'spin') {
      setWinningOfferIndex(Math.floor(Math.random() * spinBoxConfig.offers.length))
    }
    setSceneIndex(index)
  }, [])

  const replay = useCallback(() => {
    clearTimers()
    stopSound('spin')
    stopSound('fireworks')
    setSceneIndex(0)
    setWinningOfferIndex(0)
    setAudioReady(false)
    setShowEntryForm(false)
    setEntryError(null)
    setEntrySubmitting(false)

    const storedEntry = readLatestStoredEntry()
    if (storedEntry) {
      setEntryForm(storedEntry)
      setHasStoredEntry(true)
    }

    setReplayKey((k) => k + 1)
  }, [clearTimers])

  const startWithSound = useCallback(() => {
    unlockAudio()
    clearTimers()
    setWinningOfferIndex(Math.floor(Math.random() * spinBoxConfig.offers.length))
    setSceneIndex(1)
    setAudioReady(true)
    setShowEntryForm(false)
  }, [clearTimers])

  const openEntryForm = useCallback(() => {
    setEntryError(null)

    const storedEntry = readLatestStoredEntry()
    if (storedEntry) {
      setEntryForm(storedEntry)
      setHasStoredEntry(true)
      startWithSound()
      return
    }

    setShowEntryForm(true)
  }, [startWithSound])

  const handleEntrySubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setEntryError(null)
      setEntrySubmitting(true)

      const result = await submitEntryForm(entryForm)
      setEntrySubmitting(false)

      if (!result.ok) {
        setEntryError(result.error)
        return
      }

      setHasStoredEntry(true)
      startWithSound()
    },
    [entryForm, startWithSound],
  )

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const storedEntry = readLatestStoredEntry()
      if (!storedEntry) return

      setEntryForm(storedEntry)
      setHasStoredEntry(true)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

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
    <main className="spinbox-app">
      <section className="spinbox-workspace" aria-label="LED box spin advert">
        <div className="spinbox-copy">
          <p>Spin to win</p>
          <h1>Get offers and daily discounts</h1>
          <span>Enter once, spin the box, and unlock food deals from brands people already love.</span>

          <div className="offer-marquee" aria-label="Participating offer brands">
            <div className="offer-marquee-track">
              {marqueeBrands.map((brand, index) => (
                <div className="offer-brand-card" key={`${brand.name}-${index}`}>
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    width={120}
                    height={72}
                    className="offer-brand-logo"
                  />
                  <span>{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="spinbox-stage" key={replayKey}>
          {!audioReady && !showEntryForm && (
            <button type="button" className="spinbox-start-button" onClick={openEntryForm}>
              <strong>Spin to win</strong>
              <span>{hasStoredEntry ? 'Tap to spin with your saved details' : 'Tap to enter your details'}</span>
            </button>
          )}

          {showEntryForm && !audioReady && (
            <div
              className="entry-modal-backdrop"
              role="presentation"
            >
              <motion.form
                className="entry-modal"
                aria-label="Entry form before spin"
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onSubmit={handleEntrySubmit}
              >
                <div className="entry-modal-header">
                  <p className="entry-eyebrow">
                    Enter to play
                  </p>
                  <h2 className="entry-title">
                    Play to win
                  </h2>
                </div>

                <label className="entry-field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={entryForm.name}
                    onChange={(event) => setEntryForm((form) => ({ ...form, name: event.target.value }))}
                    className="entry-control"
                    required
                  />
                </label>

                <label className="entry-field">
                  <span>Phone number</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={entryForm.phone}
                    onChange={(event) => setEntryForm((form) => ({ ...form, phone: event.target.value }))}
                    className="entry-control"
                    required
                  />
                </label>

                <label className="entry-field">
                  <span>Type of business</span>
                  <select
                    name="businessType"
                    value={entryForm.businessType}
                    onChange={(event) =>
                      setEntryForm((form) => ({ ...form, businessType: event.target.value }))
                    }
                    className="entry-control"
                    required
                  >
                    <option value="" disabled>
                      Select business type
                    </option>
                    {BUSINESS_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="entry-field">
                  <span>Gender</span>
                  <select
                    name="gender"
                    value={entryForm.gender}
                    onChange={(event) => setEntryForm((form) => ({ ...form, gender: event.target.value }))}
                    className="entry-control"
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

                {entryError && (
                  <p className="entry-error">
                    {entryError}
                  </p>
                )}

                <button
                  type="submit"
                  className="entry-submit"
                  disabled={entrySubmitting}
                >
                  {entrySubmitting ? 'Saving...' : 'Start spinning'}
                </button>
              </motion.form>
            </div>
          )}

          {sceneId === 'intro' && <IntroScene />}

          {showBox && (
            <motion.div
              className={`spinbox-scene box-scene${sceneId === 'spin' ? ' box-scene--spinning' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <LedFoodBox
                key={`box-${replayKey}`}
                spinning={sceneId === 'spin'}
                winningIndex={winningOfferIndex}
                lidOpen={sceneId === 'win' || sceneId === 'brand'}
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
                    CONGRATS!
                  </motion.p>
                  <motion.a
                    className="claim-offer-btn"
                    href={winningOffer.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: LID_OPEN_FINISH_MS / 1000 + 0.48,
                      duration: 0.35,
                      ease: 'easeOut',
                    }}
                  >
                    Claim {winningOffer.headline}
                  </motion.a>
                </>
              )}

            </motion.div>
          )}
        </div>
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
      className="spinbox-scene intro-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SpinButton pressed={pressed} />
    </motion.div>
  )
}
