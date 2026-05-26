import { Howl } from 'howler'

export type SoundName =
  | 'tap'
  | 'whoosh'
  | 'spin'
  | 'tick'
  | 'win'
  | 'urgent'
  | 'scan'
  | 'sting'
  | 'fireworks'

const makeTone = (
  frequency: number,
  duration: number,
  volume = 0.35,
  type: OscillatorType = 'sine',
) => {
  const sampleRate = 22050
  const samples = Math.floor(sampleRate * duration)
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)

  const writeText = (offset: number, text: string) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index))
    }
  }

  writeText(0, 'RIFF')
  view.setUint32(4, 36 + samples * 2, true)
  writeText(8, 'WAVE')
  writeText(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeText(36, 'data')
  view.setUint32(40, samples * 2, true)

  for (let index = 0; index < samples; index += 1) {
    const attack = Math.min(index / (sampleRate * 0.012), 1)
    const release = Math.min((samples - index) / (sampleRate * 0.04), 1)
    const envelope = Math.max(0, Math.min(attack, release))
    const t = index / sampleRate
    let sample: number
    if (type === 'square') {
      sample = Math.sign(Math.sin(2 * Math.PI * frequency * t))
    } else if (type === 'sawtooth') {
      sample = 2 * ((frequency * t) % 1) - 1
    } else {
      sample = Math.sin(2 * Math.PI * frequency * t)
    }
    view.setInt16(44 + index * 2, sample * envelope * volume * 32767, true)
  }

  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index])
  }

  return `data:audio/wav;base64,${window.btoa(binary)}`
}

const makeRouletteSpin = (duration = 1.2) => {
  const sampleRate = 22050
  const samples = Math.floor(sampleRate * duration)
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)

  const writeText = (offset: number, text: string) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index))
    }
  }

  writeText(0, 'RIFF')
  view.setUint32(4, 36 + samples * 2, true)
  writeText(8, 'WAVE')
  writeText(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeText(36, 'data')
  view.setUint32(40, samples * 2, true)

  let seed = 0x9e3779b9
  const rnd = () => {
    seed = Math.imul(seed ^ (seed >>> 16), 2246822507)
    seed = Math.imul(seed ^ (seed >>> 13), 3266489909)
    return ((seed ^ (seed >>> 16)) >>> 0) / 4294967296
  }

  for (let index = 0; index < samples; index += 1) {
    const t = index / sampleRate
    const wheel = Math.sin(2 * Math.PI * 96 * t) * 0.08 + Math.sin(2 * Math.PI * 192 * t) * 0.035
    const bearing = (rnd() * 2 - 1) * 0.045
    const tickRate = 30 + 18 * Math.sin(2 * Math.PI * 0.55 * t)
    const tickPhase = (t * tickRate) % 1
    const tickEnvelope = Math.max(0, 1 - tickPhase * 32)
    const tickTone = Math.sin(2 * Math.PI * (1450 + rnd() * 900) * t) * tickEnvelope * 0.65
    const marble = Math.sin(2 * Math.PI * (420 + 80 * Math.sin(2 * Math.PI * 3.2 * t)) * t) * 0.055
    const sample = wheel + bearing + tickTone + marble

    view.setInt16(44 + index * 2, Math.max(-32767, Math.min(32767, sample * 23000)), true)
  }

  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index])
  }

  return `data:audio/wav;base64,${window.btoa(binary)}`
}

const makeChord = (frequencies: number[], duration: number, volume = 0.4) => {
  const sampleRate = 22050
  const samples = Math.floor(sampleRate * duration)
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)

  const writeText = (offset: number, text: string) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index))
    }
  }

  writeText(0, 'RIFF')
  view.setUint32(4, 36 + samples * 2, true)
  writeText(8, 'WAVE')
  writeText(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeText(36, 'data')
  view.setUint32(40, samples * 2, true)

  for (let index = 0; index < samples; index += 1) {
    const attack = Math.min(index / (sampleRate * 0.01), 1)
    const release = Math.min((samples - index) / (sampleRate * 0.06), 1)
    const envelope = Math.max(0, Math.min(attack, release))
    const t = index / sampleRate
    const sample =
      frequencies.reduce((sum, f) => sum + Math.sin(2 * Math.PI * f * t), 0) /
      frequencies.length
    view.setInt16(44 + index * 2, sample * envelope * volume * 32767, true)
  }

  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index])
  }

  return `data:audio/wav;base64,${window.btoa(binary)}`
}

/** Layered pops, whistles, and crackle for a short fireworks burst (procedural). */
const makeFireworks = (duration = 2.1) => {
  const sampleRate = 22050
  const samples = Math.floor(sampleRate * duration)
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)

  const writeText = (offset: number, text: string) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index))
    }
  }

  writeText(0, 'RIFF')
  view.setUint32(4, 36 + samples * 2, true)
  writeText(8, 'WAVE')
  writeText(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeText(36, 'data')
  view.setUint32(40, samples * 2, true)

  type Burst = { t0: number; t1: number; kind: 'whistle' | 'crackle' | 'boom' }
  const bursts: Burst[] = [
    { t0: 0.04, t1: 0.22, kind: 'whistle' },
    { t0: 0.18, t1: 0.42, kind: 'crackle' },
    { t0: 0.34, t1: 0.52, kind: 'boom' },
    { t0: 0.48, t1: 0.72, kind: 'crackle' },
    { t0: 0.62, t1: 0.78, kind: 'whistle' },
    { t0: 0.74, t1: 0.95, kind: 'boom' },
    { t0: 0.88, t1: 1.18, kind: 'crackle' },
    { t0: 1.05, t1: 1.35, kind: 'crackle' },
    { t0: 1.28, t1: 1.48, kind: 'boom' },
    { t0: 1.42, t1: duration, kind: 'crackle' },
  ]

  let seed = 0xfeedbeef
  const rnd = () => {
    seed = Math.imul(seed ^ (seed >>> 15), seed | 1)
    seed ^= seed + Math.imul(seed ^ (seed >>> 7), seed | 61)
    return ((seed ^ (seed >>> 14)) >>> 0) / 4294967296
  }

  for (let index = 0; index < samples; index += 1) {
    const t = index / sampleRate
    let sample = 0

    for (const b of bursts) {
      if (t < b.t0 || t >= b.t1) continue
      const u = (t - b.t0) / (b.t1 - b.t0)
      const rise = Math.min(u / 0.08, 1)
      const fall = Math.min((1 - u) / 0.18, 1)
      const envelope = Math.max(0, Math.min(rise, fall))

      if (b.kind === 'whistle') {
        const f = 3200 - 2600 * u * u
        sample += Math.sin(2 * Math.PI * f * (t - b.t0)) * envelope * 0.38
        sample += (rnd() * 2 - 1) * envelope * 0.06
      } else if (b.kind === 'boom') {
        const f = 180 * Math.exp(-u * 4)
        sample += Math.sin(2 * Math.PI * f * (t - b.t0)) * envelope * 0.55
        sample += (rnd() * 2 - 1) * envelope * 0.12
      } else {
        sample += (rnd() * 2 - 1) * envelope * 0.42 * (0.35 + 0.65 * Math.exp(-u * 3))
      }
    }

    view.setInt16(44 + index * 2, Math.max(-32767, Math.min(32767, sample * 12000)), true)
  }

  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index])
  }

  return `data:audio/wav;base64,${window.btoa(binary)}`
}

let sounds: Partial<Record<SoundName, Howl>> = {}
let unlocked = false

const getSounds = () => {
  if (!sounds.tap) {
    sounds = {
      tap: new Howl({ src: [makeTone(720, 0.06, 0.5, 'square')], volume: 0.55 }),
      whoosh: new Howl({ src: [makeTone(180, 0.22, 0.35, 'sawtooth')], volume: 0.45 }),
      spin: new Howl({ src: [makeRouletteSpin()], volume: 0.48, loop: true }),
      tick: new Howl({ src: [makeTone(920, 0.05, 0.42, 'square')], volume: 0.5 }),
      win: new Howl({ src: [makeChord([523, 659, 784, 988], 0.35, 0.55)], volume: 0.65 }),
      urgent: new Howl({ src: [makeTone(1100, 0.08, 0.45, 'square')], volume: 0.55 }),
      scan: new Howl({ src: [makeTone(1400, 0.12, 0.35)], volume: 0.4 }),
      sting: new Howl({ src: [makeChord([392, 494, 587], 0.28, 0.5)], volume: 0.6 }),
      fireworks: new Howl({ src: [makeFireworks(2.1)], volume: 0.72 }),
    }
  }

  return sounds
}

export const unlockAudio = () => {
  unlocked = true
  const ctx = Howler.ctx
  if (ctx?.state === 'suspended') {
    void ctx.resume()
  }
}

export const playSound = (name: SoundName) => {
  if (!unlocked) return
  const sound = getSounds()[name]
  if (name !== 'spin') sound?.stop()
  sound?.play()
}

export const stopSound = (name: SoundName) => {
  getSounds()[name]?.stop()
}

export const isAudioUnlocked = () => unlocked
