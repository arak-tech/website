import { NextResponse } from 'next/server'
import type { LeadPayload } from '@/lib/lead'

const REQUIRED_FIELDS = ['name', 'phone', 'businessType', 'source'] as const

function getTextField(data: unknown, field: keyof LeadPayload) {
  if (!data || typeof data !== 'object') return ''
  const value = (data as Record<string, unknown>)[field]
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Google Sheets is not configured yet.' },
      { status: 503 },
    )
  }

  let data: unknown
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  for (const field of REQUIRED_FIELDS) {
    if (!getTextField(data, field)) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }
  }

  const source = getTextField(data, 'source')
  if (source !== 'landing-page' && source !== 'spin-to-win') {
    return NextResponse.json({ error: 'Invalid lead source.' }, { status: 400 })
  }

  const payload: LeadPayload = {
    source,
    name: getTextField(data, 'name'),
    phone: getTextField(data, 'phone'),
    businessType: getTextField(data, 'businessType'),
    gender: getTextField(data, 'gender'),
    serviceInterest: getTextField(data, 'serviceInterest'),
    location: getTextField(data, 'location'),
    message: getTextField(data, 'message'),
    submittedAt: new Date().toISOString(),
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Could not save your details to Google Sheets.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
