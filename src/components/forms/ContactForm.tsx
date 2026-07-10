"use client";

import { TextAreaField, TextField } from "@/components/ui";
import {
  LeadFormShell,
  optionalEmail,
  requirePhone,
  requireText,
  str,
} from "./LeadFormShell";

/** General inquiry form — deliberately just three required fields. */
export function ContactForm() {
  return (
    <LeadFormShell
      submitLabel="Skicka meddelande"
      successTitle="Tack för ditt meddelande!"
      successBody="Vi läser alla meddelanden och återkommer normalt inom en arbetsdag."
      validate={(data) => {
        const errors: Record<string, string> = {};
        requireText(data, "name", "Ange ditt namn.", errors);
        requirePhone(data, "phone", errors);
        requireText(data, "message", "Skriv ett kort meddelande.", errors, 5);
        optionalEmail(data, "email", errors);
        return errors;
      }}
      buildLead={(data) => ({
        type: "contact",
        name: str(data, "name"),
        phone: str(data, "phone"),
        email: str(data, "email") || undefined,
        message: str(data, "message"),
      })}
    >
      {(errors) => (
        <>
          <TextField
            id="name"
            name="name"
            label="Namn"
            autoComplete="name"
            required
            error={errors.name}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="phone"
              name="phone"
              label="Telefon"
              type="tel"
              autoComplete="tel"
              required
              error={errors.phone}
            />
            <TextField
              id="email"
              name="email"
              label="E-post"
              type="email"
              autoComplete="email"
              error={errors.email}
            />
          </div>
          <TextAreaField
            id="message"
            name="message"
            label="Meddelande"
            placeholder="Vad kan vi hjälpa dig med?"
            required
            error={errors.message}
          />
        </>
      )}
    </LeadFormShell>
  );
}
