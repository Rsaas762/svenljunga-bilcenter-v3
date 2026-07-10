/** Swedish-locale display helpers. */

const sek = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

const num = new Intl.NumberFormat("sv-SE");

export function formatPrice(priceSek: number): string {
  return sek.format(priceSek);
}

export function formatMileage(mileageMil: number): string {
  return `${num.format(mileageMil)} mil`;
}
