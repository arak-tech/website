"use client"

import { type FormEvent, useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BUSINESS_TYPE_OPTIONS } from "@/lib/entry-form"
import { submitLead } from "@/lib/lead"

const SERVICE_OPTIONS = [
  { value: "vending-machines", label: "Vending machines" },
  { value: "led-delivery-boxes", label: "LED delivery boxes" },
  { value: "both", label: "Both services" },
] as const

export function LandingInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState<string | null>(null)
  const [businessType, setBusinessType] = useState("")
  const [serviceInterest, setServiceInterest] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setStatus("submitting")
    setMessage(null)

    const result = await submitLead({
      source: "landing-page",
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      businessType: String(formData.get("businessType") ?? ""),
      serviceInterest: String(formData.get("serviceInterest") ?? ""),
      location: String(formData.get("location") ?? ""),
      message: String(formData.get("message") ?? ""),
    })

    if (!result.ok) {
      setStatus("error")
      setMessage(result.error)
      return
    }

    form.reset()
    setBusinessType("")
    setServiceInterest("")
    setStatus("success")
    setMessage("Thanks. Arak Holdings will contact you shortly.")
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FieldGroup className="gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone number</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="businessType">Type of business</FieldLabel>
            <Select
              name="businessType"
              required
              value={businessType}
              onValueChange={setBusinessType}
            >
              <SelectTrigger id="businessType" className="h-10 w-full">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {BUSINESS_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="serviceInterest">Interested in</FieldLabel>
            <Select
              name="serviceInterest"
              required
              value={serviceInterest}
              onValueChange={setServiceInterest}
            >
              <SelectTrigger id="serviceInterest" className="h-10 w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SERVICE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input
            id="location"
            name="location"
            autoComplete="address-level2"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us where the machine or LED box will be used."
          />
        </Field>
      </FieldGroup>

      <FieldGroup className="gap-3">
        {message && (
          <FieldError className={status === "success" ? "text-primary" : undefined}>
            {message}
          </FieldError>
        )}
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-11 w-full px-6 text-[15px] font-semibold md:w-fit"
        >
          <Send data-icon="inline-start" aria-hidden />
          {status === "submitting" ? "Sending..." : "Send inquiry"}
        </Button>
      </FieldGroup>
    </form>
  )
}
