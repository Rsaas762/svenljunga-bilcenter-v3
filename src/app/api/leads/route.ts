import { NextResponse } from "next/server";
import type { Lead, LeadInput } from "@/lib/types";

/**
 * Lead intake endpoint — every form on the site POSTs here.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  WHERE DO LEADS GO? (decision pending — see docs/OPEN ITEMS)    │
 * │                                                                 │
 * │  Right now: leads are logged to the server console so nothing  │
 * │  is silently required for the first deploy (no env vars).      │
 * │                                                                 │
 * │  To receive leads for real, pick ONE and wire it below:        │
 * │   a) Email — e.g. Resend (resend.com): `npm i resend`, set     │
 * │      RESEND_API_KEY, send to the dealership inbox.             │
 * │   b) Webhook — set LEAD_WEBHOOK_URL (Zapier/Make/Slack/CRM);   │
 * │      the forwarding code below already supports this.         │
 * │   c) Database — when the admin dashboard is built, insert the │
 * │      Lead object here. The Lead type in src/lib/types.ts is   │
 * │      the agreed contract.                                     │
 * └─────────────────────────────────────────────────────────────────┘
 */

const VALID_TYPES = ["sell", "find", "interested", "contact"] as const;

export async function POST(request: Request) {
  let input: LeadInput;
  try {
    input = (await request.json()) as LeadInput;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ogiltig förfrågan." },
      { status: 400 },
    );
  }

  // Minimal server-side validation (the forms validate more thoroughly)
  if (
    !VALID_TYPES.includes(input?.type) ||
    typeof input.name !== "string" ||
    input.name.trim().length < 2 ||
    typeof input.phone !== "string" ||
    input.phone.trim().length < 5
  ) {
    return NextResponse.json(
      { ok: false, error: "Namn och telefonnummer krävs." },
      { status: 400 },
    );
  }

  const lead: Lead = {
    ...input,
    receivedAt: new Date().toISOString(),
    status: "Ny",
  } as Lead;

  // (b) Optional webhook forwarding — active as soon as the env var exists.
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook svarade ${res.status}`);
    } catch (err) {
      console.error("[leads] Webhook-leverans misslyckades:", err);
      // Fail loudly to the visitor rather than pretending it worked
      return NextResponse.json(
        {
          ok: false,
          error:
            "Något gick fel när meddelandet skulle skickas. Ring oss istället så hjälper vi dig direkt.",
        },
        { status: 502 },
      );
    }
  } else {
    // Default v1 behaviour (documented in implementation/01_feature_scope.md):
    // log the lead server-side. Visible in `next dev` output and in Vercel logs.
    console.log("[leads] Nytt lead mottaget:", JSON.stringify(lead, null, 2));
    console.warn(
      "[leads] LEAD_WEBHOOK_URL är inte satt — detta lead loggas bara. Koppla e-post/webhook/databas i src/app/api/leads/route.ts innan lansering.",
    );
  }

  return NextResponse.json({ ok: true });
}
