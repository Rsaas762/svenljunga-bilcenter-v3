"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { LeadInput } from "@/lib/types";
import { site } from "@/lib/site";
import { Button } from "@/components/ui";

type FormState = "idle" | "sending" | "sent" | "error";

/**
 * Shared submit machinery for all lead forms: posts to /api/leads,
 * shows honest sending/success/error states, never fakes a success.
 */
export function LeadFormShell({
  buildLead,
  validate,
  submitLabel,
  submitVariant = "primary",
  successTitle,
  successBody,
  children,
}: {
  /** Turn the form's FormData into a LeadInput object. */
  buildLead: (data: FormData) => LeadInput;
  /** Return a map of field-id → error message; empty map = valid. */
  validate: (data: FormData) => Record<string, string>;
  submitLabel: string;
  /** Button variant for the submit CTA. Defaults to the machined-silver
   *  primary; the sell/valuation form uses the one leather moment. */
  submitVariant?: "primary" | "leather";
  successTitle: string;
  successBody: string;
  children: (errors: Record<string, string>) => ReactNode;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen-reader + keyboard users land on it.
  useEffect(() => {
    if (state === "sent") successRef.current?.focus();
  }, [state]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      // Move focus to the first invalid field for keyboard/screen-reader users
      const firstId = Object.keys(fieldErrors)[0];
      (form.querySelector(`#${firstId}`) as HTMLElement | null)?.focus();
      return;
    }

    setState("sending");
    setServerError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildLead(data)),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Något gick fel.");
      }
      setState("sent");
    } catch (err) {
      setState("error");
      setServerError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Något gick fel när meddelandet skulle skickas. Försök igen eller ring oss direkt.",
      );
    }
  }

  if (state === "sent") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="rounded-2xl border border-trust/40 bg-trust/10 p-8 text-center backdrop-blur-sm focus:outline-none"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-trust text-2xl text-white"
        >
          ✓
        </span>
        <h3 className="font-display mt-4 text-xl font-semibold text-ink">
          {successTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          {successBody}
        </p>
        <p className="mt-4 text-sm text-muted">
          Brådskande? Ring oss på{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-silver underline decoration-white/30 underline-offset-2 transition-colors hover:text-cognac hover:decoration-cognac"
          >
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {children(errors)}

      {state === "error" && serverError && (
        <p
          role="alert"
          className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger"
        >
          {serverError}
        </p>
      )}

      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          variant={submitVariant}
          disabled={state === "sending"}
          className="w-full sm:w-auto"
        >
          {state === "sending" ? "Skickar…" : submitLabel}
        </Button>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Vi använder bara dina uppgifter för att kontakta dig om din
          förfrågan. Inga nyhetsbrev, ingen delning med tredje part.
        </p>
      </div>
    </form>
  );
}

// Shared validators
export function requireText(
  data: FormData,
  id: string,
  message: string,
  errors: Record<string, string>,
  minLen = 2,
) {
  const value = String(data.get(id) ?? "").trim();
  if (value.length < minLen) errors[id] = message;
}

export function requirePhone(
  data: FormData,
  id: string,
  errors: Record<string, string>,
) {
  const value = String(data.get(id) ?? "").trim();
  const digits = value.replace(/\D/g, "");
  // Shape check plus a real digit count so "+-----" style junk is caught.
  if (!/^[+\d][\d\s()-]{5,}$/.test(value) || digits.length < 6) {
    errors[id] = "Ange ett giltigt telefonnummer.";
  }
}

export function optionalEmail(
  data: FormData,
  id: string,
  errors: Record<string, string>,
) {
  const value = String(data.get(id) ?? "").trim();
  if (value && !/^\S+@\S+\.\S+$/.test(value)) {
    errors[id] = "Ange en giltig e-postadress.";
  }
}

export function str(data: FormData, id: string): string {
  return String(data.get(id) ?? "").trim();
}
