"use client";

import { SelectField, TextAreaField, TextField } from "@/components/ui";
import { FileField } from "./FileField";
import {
  LeadFormShell,
  optionalEmail,
  requirePhone,
  requireText,
  str,
} from "./LeadFormShell";

const FUELS = ["Bensin", "Diesel", "Hybrid", "Laddhybrid", "El"] as const;
const GEARBOXES = ["Automat", "Manuell"] as const;

export function SellCarForm() {
  return (
    <LeadFormShell
      submitLabel="Få en gratis värdering"
      submitVariant="leather"
      successTitle="Tack! Din bil är inskickad."
      successBody="Vi går igenom uppgifterna och återkommer med en första bedömning och nästa steg — normalt inom en arbetsdag."
      validate={(data) => {
        const errors: Record<string, string> = {};
        requireText(data, "brand", "Ange bilens märke.", errors);
        requireText(data, "model", "Ange bilens modell.", errors);
        requireText(data, "year", "Ange årsmodell.", errors, 4);
        const year = Number(str(data, "year"));
        if (
          !errors.year &&
          (!Number.isInteger(year) ||
            year < 1950 ||
            year > new Date().getFullYear() + 1)
        ) {
          errors.year = "Ange ett giltigt årtal, t.ex. 2019.";
        }
        requireText(data, "mileage", "Ange mätarställning i mil.", errors, 1);
        requireText(data, "name", "Ange ditt namn.", errors);
        requirePhone(data, "phone", errors);
        optionalEmail(data, "email", errors);
        return errors;
      }}
      buildLead={(data) => ({
        type: "sell",
        registrationNumber: str(data, "regnr") || undefined,
        brand: str(data, "brand"),
        model: str(data, "model"),
        year: str(data, "year"),
        mileageMil: str(data, "mileage"),
        fuel: (str(data, "fuel") || "") as (typeof FUELS)[number] | "",
        gearbox: (str(data, "gearbox") || "") as (typeof GEARBOXES)[number] | "",
        condition: str(data, "condition") || undefined,
        photoNames:
          (data.getAll("photos") as File[])
            .filter((f) => f && f.name)
            .map((f) => f.name) || undefined,
        name: str(data, "name"),
        phone: str(data, "phone"),
        email: str(data, "email") || undefined,
      })}
    >
      {(errors) => (
        <>
          <fieldset className="space-y-5">
            <legend className="eyebrow mb-1 text-brand">Om bilen</legend>
            <TextField
              id="regnr"
              name="regnr"
              label="Registreringsnummer"
              placeholder="ABC 123"
              autoComplete="off"
              hint="Frivilligt — men det går snabbare för oss att ge en bedömning."
              error={errors.regnr}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="brand"
                name="brand"
                label="Märke"
                placeholder="T.ex. Volvo"
                required
                error={errors.brand}
              />
              <TextField
                id="model"
                name="model"
                label="Modell"
                placeholder="T.ex. XC60"
                required
                error={errors.model}
              />
              <TextField
                id="year"
                name="year"
                label="Årsmodell"
                placeholder="T.ex. 2019"
                inputMode="numeric"
                required
                error={errors.year}
              />
              <TextField
                id="mileage"
                name="mileage"
                label="Mätarställning (mil)"
                placeholder="T.ex. 8 500"
                inputMode="numeric"
                required
                error={errors.mileage}
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
              id="condition"
              name="condition"
              label="Bilens skick"
              placeholder="Servicehistorik, eventuella skador, extrautrustning…"
              error={errors.condition}
            />
            <FileField
              id="photos"
              name="photos"
              label="Bilder på bilen"
              hint="Har du bilder? Nämn det gärna här — så hämtar vi in dem när vi hörts av, för en mer träffsäker värdering."
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
