export type ReelSceneId = 'intro' | 'spin' | 'win' | 'scan' | 'brand'

export type ReelScene = {
  id: ReelSceneId
  durationMs: number
}

export const REEL_SCENES: ReelScene[] = [
  { id: 'intro', durationMs: 1400 },
  { id: 'spin', durationMs: 6000 },
  { id: 'win', durationMs: 2200 },
  { id: 'scan', durationMs: 10000 },
  { id: 'brand', durationMs: 2000 },
]

export const REEL_TOTAL_MS = REEL_SCENES.reduce((sum, scene) => sum + scene.durationMs, 0)

export const COUNTDOWN_SECONDS = 10
