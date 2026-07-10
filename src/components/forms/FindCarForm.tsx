"use client";

import { SelectField, TextAreaField, TextField } from "@/components/ui";
import {
  LeadFormShell,
  optionalEmail,
  requirePhone,
  requireText,
  str,
} from "./LeadFormShell";

const FUELS = ["Bensin", "Diesel", "Hybrid", "Laddhybrid", "El"] as const;
const GEARBOXES = ["Automat", "Manuell"] as const;
const BODY_TYPES = [
  "SUV",
  "Kombi",
  "Halvkombi",
  "Sedan",
  "Coupé",
  "Cab",
  "Transportbil",
] as const;

export function FindCarForm() {
  return (
    <LeadFormShell
      submitLabel="Skicka bilförfrågan"
      successTitle="Tack! Vi håller utkik."
      successBody="Vi har tagit emot dina önskemål och hör av oss så snart vi hittar en bil som stämmer — eller om vi behöver veta mer."
      validate={(data) => {
        const errors: Record<string, string> = {};
        requireText(
          data,
          "brandModel",
          "Berätta vilken bil eller typ av bil du söker.",
          errors,
        );
        requireText(data, "budget", "Ange ungefärlig budget.", errors, 1);
        requireText(data, "name", "Ange ditt namn.", errors);
        requirePhone(data, "phone", errors);
        optionalEmail(data, "email", errors);
        return errors;
      }}
      buildLead={(data) => ({
        type: "find",
        brandModel: str(data, "brandModel"),
        budgetSek: str(data, "budget"),
        yearRange: str(data, "yearRange") || undefined,
        maxMileageMil: str(data, "maxMileage") || undefined,
        fuel: (str(data, "fuel") || "") as (typeof FUELS)[number] | "",
        gearbox: (str(data, "gearbox") || "") as (typeof GEARBOXES)[number] | "",
        bodyType: (str(data, "bodyType") || "") as (typeof BODY_TYPES)[number] | "",
        mustHaves: str(data, "mustHaves") || undefined,
        name: str(data, "name"),
        phone: str(data, "phone"),
        email: str(data, "email") || undefined,
      })}
    >
      {(errors) => (
        <>
          <fieldset className="space-y-5">
            <legend className="eyebrow mb-1 text-brand">
              Vad letar du efter?
            </legend>
            <TextField
              id="brandModel"
              name="brandModel"
              label="Märke / modell eller typ av bil"
              placeholder="T.ex. Volvo V60, eller ”en pålitlig familjekombi”"
              required
              error={errors.brandModel}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="budget"
                name="budget"
                label="Budget (kr)"
                placeholder="T.ex. 150 000–200 000"
                required
                error={errors.budget}
              />
              <TextField
                id="yearRange"
                name="yearRange"
                label="Årsmodell"
                placeholder="T.ex. 2018 eller nyare"
                error={errors.yearRange}
              />
              <TextField
                id="maxMileage"
                name="maxMileage"
                label="Max mätarställning (mil)"
                placeholder="T.ex. 10 000"
                inputMode="numeric"
                error={errors.maxMileage}
              />
              <SelectField
                id="bodyType"
                name="bodyType"
                label="Karosstyp"
                options={BODY_TYPES}
                error={errors.bodyType}
              />
              <SelectField
                id="fuel"
                name="fuel"
                label="Drivmedel"
                options={FUELS}
                error={errors.fuel}
              />
              <SelectField
                id="gearbox"
                name="gearbox"
                label="Växellåda"
                options={GEARBOXES}
                error={errors.gearbox}
              />
            </div>
            <TextAreaField
              id="mustHaves"
              name="mustHaves"
              label="Viktigast för dig"
              placeholder="T.ex. dragkrok, automat, låg förbrukning, plats för barnvagn…"
              error={errors.mustHaves}
            />
          </fieldset>

          <fieldset className="space-y-5 border-t border-mist pt-6">
            <legend className="eyebrow float-left mb-4 w-full text-brand">
              Dina kontaktuppgifter
            </legend>
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
          </fieldset>
        </>
      )}
    </LeadFormShell>
  );
}
