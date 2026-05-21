# LED SpinBox — Reel Ad

Mobile-first Vite + React reel advert: grey delivery LED box, spin-to-win, lid opens after rotation, QR claim, fireworks sounds, and brand end card.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Configure

Campaign data in `src/lib/config.ts`:

- `whatsappNumber`
- `brandLine`
- `offers` (headline, detail, code, WhatsApp `href`, colors)

Scene timing in `src/lib/reelTimeline.ts`.

## Project layout

- `src/components/reel/` — 3D food box, reel scenes, styles
- `src/lib/` — config, sounds (Howler), timeline
- `src/App.tsx` — mounts `ReelAdvert`
