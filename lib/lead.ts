export type LeadSource = 'landing-page' | 'spin-to-win'

export type LeadPayload = {
  source: LeadSource
  name: string
  phone: string
  businessType: string
  gender?: string
  serviceInterest?: string
  location?: string
  message?: string
  submittedAt?: string
}

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: string }

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { error?: string } | null
      return { ok: false, error: result?.error ?? 'Could not send your details. Please try again.' }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: 'Could not send your details. Please check your connection and try again.' }
  }
}
