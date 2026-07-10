"use client";

import { TextAreaField, TextField } from "@/components/ui";
import {
  LeadFormShell,
  optionalEmail,
  requirePhone,
  requireText,
  str,
} from "./LeadFormShell";

/** "Jag är intresserad" — attached to a specific car on its detail page. */
export function InterestForm({
  carSlug,
  carLabel,
}: {
  carSlug: string;
  carLabel: string;
}) {
  return (
    <LeadFormShell
      submitLabel="Skicka intresseanmälan"
      successTitle="Tack för din intresseanmälan!"
      successBody={`Vi återkommer till dig om ${carLabel} så snart vi kan — normalt inom en arbetsdag.`}
      validate={(data) => {
        const errors: Record<string, string> = {};
        requireText(data, "name", "Ange ditt namn.", errors);
        requirePhone(data, "phone", errors);
        optionalEmail(data, "email", errors);
        return errors;
      }}
      buildLead={(data) => ({
        type: "interested",
        carSlug,
        carLabel,
        name: str(data, "name"),
        phone: str(data, "phone"),
        email: str(data, "email") || undefined,
        message: str(data, "message") || undefined,
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
            label="Fråga eller meddelande"
            placeholder="T.ex. Är bilen kvar? Kan jag boka en provkörning?"
            error={errors.message}
          />
        </>
      )}
    </LeadFormShell>
  );
}
