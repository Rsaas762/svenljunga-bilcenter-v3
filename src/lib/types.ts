/**
 * Shared data shapes for inventory and leads.
 *
 * These types are the contract for the future admin dashboard
 * (see Svenljunga_Bilcenter_Claude_Website/implementation/03_future_dashboard_scope.md):
 * the dashboard should be able to consume Car and Lead objects exactly as
 * defined here, so avoid renaming fields casually.
 */

export type Fuel = "Bensin" | "Diesel" | "Hybrid" | "Laddhybrid" | "El";
export type Gearbox = "Automat" | "Manuell";
export type BodyType =
  | "SUV"
  | "Kombi"
  | "Halvkombi"
  | "Sedan"
  | "Coupé"
  | "Cab"
  | "Pickup"
  | "Transportbil";

export interface Car {
  /** Stable id — becomes the shareable URL /bilar/[slug]. */
  slug: string;
  brand: string;
  model: string;
  /** Trim/engine label shown after the model name, e.g. "B4 AWD Momentum". */
  variant?: string;
  year: number;
  /** Mätarställning i mil (1 mil = 10 km), as Swedish listings use. */
  mileageMil: number;
  fuel: Fuel;
  gearbox: Gearbox;
  bodyType: BodyType;
  /** Pris i SEK. */
  priceSek: number;
  /** First image is the primary/listing photo. */
  images: string[];
  description: string;
  features: string[];
  /** Link to the car's live Blocket ad (inventory is synced from Blocket). */
  blocketUrl?: string;
  /**
   * Inspection valid-until date (besiktigad t.o.m.), ISO `YYYY-MM-DD`.
   * Only set from a real date stated in the listing; omit when unknown —
   * never guess. Surfaced as a trust field on the detail page.
   */
  inspectedUntil?: string;
  /** Set false to keep a sold car's page alive but out of listings. */
  inStock: boolean;
}

// ── Leads ────────────────────────────────────────────────────────────
// Status values from the dashboard scope doc. The website only ever
// creates leads with status "Ny"; the rest exist for the future dashboard.
export type LeadStatus =
  | "Ny"
  | "Kontaktad"
  | "Intresserad"
  | "Pågående"
  | "Avslutad"
  | "Ej aktuell";

export interface LeadBase {
  /** ISO timestamp, set server-side when the lead is received. */
  receivedAt: string;
  status: LeadStatus;
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

/** "Sälj din bil" — someone wants to sell their car to the dealership. */
export interface SellCarLead extends LeadBase {
  type: "sell";
  registrationNumber?: string;
  brand: string;
  model: string;
  year: string;
  mileageMil: string;
  fuel?: Fuel | "";
  gearbox?: Gearbox | "";
  condition?: string;
  /** File names of photos the seller attached (binary upload needs a storage backend). */
  photoNames?: string[];
}

/** "Hitta min bil" — someone wants help finding a specific car. */
export interface FindCarLead extends LeadBase {
  type: "find";
  brandModel: string;
  budgetSek: string;
  yearRange?: string;
  maxMileageMil?: string;
  fuel?: Fuel | "";
  gearbox?: Gearbox | "";
  bodyType?: BodyType | "";
  mustHaves?: string;
}

/** "Jag är intresserad" — interest in a specific car in stock. */
export interface InterestedLead extends LeadBase {
  type: "interested";
  carSlug: string;
  carLabel: string;
}

/** General contact-form message. */
export interface ContactLead extends LeadBase {
  type: "contact";
}

export type Lead = SellCarLead | FindCarLead | InterestedLead | ContactLead;
export type LeadInput =
  | Omit<SellCarLead, "receivedAt" | "status">
  | Omit<FindCarLead, "receivedAt" | "status">
  | Omit<InterestedLead, "receivedAt" | "status">
  | Omit<ContactLead, "receivedAt" | "status">;
