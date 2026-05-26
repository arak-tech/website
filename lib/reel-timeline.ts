export type ReelSceneId = 'intro' | 'spin' | 'win' | 'brand'

export type ReelScene = {
  id: ReelSceneId
  durationMs: number
}

export const REEL_SCENES: ReelScene[] = [
  { id: 'intro', durationMs: 1400 },
  { id: 'spin', durationMs: 6000 },
  { id: 'win', durationMs: 6500 },
  { id: 'brand', durationMs: 2000 },
]

export const REEL_TOTAL_MS = REEL_SCENES.reduce((sum, scene) => sum + scene.durationMs, 0)
