# Arak Holdings Landing Page and LED SpinBox

Next.js app for Arak Holdings. The homepage is a one-page rental landing page for vending machines and LED food delivery boxes. The existing Spin to Win reel advert now lives at `/spin-to-win`.

## Run Locally

```bash
npm install
npm run dev
```

Open the URL Next prints, usually `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Google Sheets Lead Capture

Set this environment variable to a Google Apps Script web app URL:

```bash
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
```

The landing page inquiry form posts to `/api/leads`, which forwards timestamped lead payloads to that webhook. Spin to Win entries also attempt to post to the same endpoint and still keep the existing browser `localStorage` fallback under `ledbox:entries`.

Lead payloads include a `source` field:

- `landing-page`
- `spin-to-win`

## Configure Campaign

Campaign data lives in `lib/config.ts`:

- `whatsappNumber`
- `brandLine`
- `offers` (headline, detail, code, WhatsApp `href`, colors)

Business type dropdown options: `lib/entry-form.ts` -> `BUSINESS_TYPE_OPTIONS`.

Scene timing: `lib/reel-timeline.ts`.

## Stored Spin Entries

To inspect local fallback entries in DevTools:

```js
JSON.parse(localStorage.getItem('ledbox:entries') ?? '[]')
```

## Project Layout

- `app/` - Next.js App Router pages, API routes, and layout
- `components/reel/` - 3D food box, reel scenes, and entry form UI
- `components/landing-inquiry-form.tsx` - landing page lead form
- `lib/` - campaign config, lead capture, entry form helper, sounds, and timeline
- `public/` - static campaign and landing page assets
