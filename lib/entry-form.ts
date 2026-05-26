import { submitLead } from './lead'

export type EntryFormData = {
  name: string
  phone: string
  gender: string
  businessType: string
}

export type StoredEntryFormData = EntryFormData & {
  id: string
  submittedAt: string
}

export const ENTRY_STORAGE_KEY = 'ledbox:entries'

export const EMPTY_ENTRY_FORM: EntryFormData = {
  name: '',
  phone: '',
  gender: '',
  businessType: '',
}

export const BUSINESS_TYPE_OPTIONS = [
  { value: 'restaurant-food', label: 'Restaurant / food service' },
  { value: 'retail-shop', label: 'Retail shop' },
  { value: 'salon-beauty', label: 'Salon / beauty' },
  { value: 'gym-fitness', label: 'Gym / fitness' },
  { value: 'events-entertainment', label: 'Events / entertainment' },
  { value: 'delivery-logistics', label: 'Delivery / logistics' },
  { value: 'professional-services', label: 'Professional services' },
  { value: 'other', label: 'Other' },
] as const

export type SubmitEntryResult =
  | { ok: true }
  | { ok: false; error: string }

const REQUIRED_FIELDS = ['name', 'phone', 'gender', 'businessType'] as const

function readStoredEntries(): StoredEntryFormData[] {
  const rawEntries = window.localStorage.getItem(ENTRY_STORAGE_KEY)
  if (!rawEntries) return []

  try {
    const entries = JSON.parse(rawEntries) as unknown
    return Array.isArray(entries) ? (entries as StoredEntryFormData[]) : []
  } catch {
    return []
  }
}

export async function submitEntryForm(data: EntryFormData): Promise<SubmitEntryResult> {
  for (const field of REQUIRED_FIELDS) {
    if (!data[field].trim()) {
      return { ok: false, error: 'Please complete all fields before spinning.' }
    }
  }

  const submittedAt = new Date().toISOString()
  const entry: StoredEntryFormData = {
    id: crypto.randomUUID(),
    submittedAt,
    name: data.name.trim(),
    phone: data.phone.trim(),
    gender: data.gender.trim(),
    businessType: data.businessType.trim(),
  }

  try {
    window.localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify([...readStoredEntries(), entry]))
  } catch {
    return { ok: false, error: 'Could not save your details on this device. Please try again.' }
  }

  void submitLead({
    source: 'spin-to-win',
    name: entry.name,
    phone: entry.phone,
    gender: entry.gender,
    businessType: entry.businessType,
    serviceInterest: 'spin-to-win',
    submittedAt,
  }).catch(() => undefined)

  return { ok: true }
}
