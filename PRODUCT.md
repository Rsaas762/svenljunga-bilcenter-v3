# Product

## Register

brand

## Users

Local and regional private car buyers and sellers in Svenljunga and the wider
Sjuhärad / Västra Götaland area. Everyday people across all ages — not fleet or
business buyers. Most arrive on a phone. Their context is one of four moments:

- **Judging trust** — sizing up a small independent dealer online before they'll
  call or drive over.
- **Browsing stock** — looking for a specific used car or scanning what's in.
- **Selling** — wanting a quick, low-friction valuation of the car they own now.
- **Asking for help** — describing a car they want that isn't currently in stock.

The job to be done: buy, sell, or find the right car without friction or
pressure, from a dealer that feels real, local, and reachable.

## Product Purpose

A marketing + lead-generation site for **Svenljunga Bilcenter AB**, a
märkesoberoende (brand-independent) used-car dealer on Boråsvägen 16. It exists
to convert local interest into contact: browse the real Blocket inventory, sell
a car with a free valuation ("fri värdering"), request help finding a specific
car, or reach the dealership directly. Success = qualified leads (sell / find /
interested-in-a-car / general contact) and a first impression of competence and
trust that competes with bigger dealers. The lead and inventory data shapes are
built so a future private admin/lead dashboard can plug in without a rebuild.

## Brand Personality

Local, trustworthy, premium-yet-approachable. Three words: **trygg, tydlig,
personlig** (safe, clear, personal). The visual language is dark automotive
craft — smoked-titanium heroes, gunmetal and carbon-fibre surfaces, one
restrained cognac-leather moment — but it stays warm and human, never cold or
precious. Voice: plain, warm Swedish; short sentences; no car-sales cliché;
low-pressure, specific CTAs ("Få en gratis värdering", not "Skicka"). The
feeling to evoke is *trygghet* — you're dealing with a serious local shop where
a real person answers, not a faceless marketplace.

## Anti-references

- **Generic SaaS landing** — Inter-for-everything, purple/blue gradients, the
  hero-metric template, identical icon-card grids, eyebrow-on-every-section.
- **Faceless marketplace** (a Blocket/Bilweb clone) — this is a *dealer* with a
  face, address, and phone, not a listings aggregator.
- **Fashion / luxury-goods brand** — over-leathered, precious, boutique. The
  cognac stays ≈3%; leather is one moment, not a theme.
- **Fake-luxury car-ad gloss** — neon rim-light hero renders, shouting hero type,
  manufactured hype. The photography is the real showroom and real stock.
- **AI-slop tells** — gradient text, glassmorphism-by-default, 01/02/03 numbered
  section scaffolding, side-stripe accent borders, invented stats.

## Design Principles

1. **Trust before flash.** Every claim is real. No invented reviews, ratings,
   opening hours, certifications, or vehicles — unconfirmed facts are guarded and
   hidden until real (see `hoursConfirmed` / `statsConfirmed`), never faked.
2. **Show the real business.** Real logo, real Blocket inventory, real photos of
   the actual showroom, real address and phone. Specificity is the trust signal.
3. **One human on the other end.** Personal and local — "svar av en människa,
   inte en växel." Copy and flows should feel like a person, not a funnel.
4. **Materials with restraint.** The craft (titanium, carbon, leather) is clearly
   visible but disciplined — cognac ≈3%, one chrome/smoked moment, never two loud
   textures in a viewport, and never texture over photography.
5. **Mobile-first honesty.** Most traffic is phones: stock filters and lead forms
   must be effortless there, and the site is always honest about where a
   submitted lead actually goes.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Already in place and to be maintained: AA contrast on the
dark palette (light body text on carbon/gunmetal), visible **cognac focus rings**
on all interactive elements, a `prefers-reduced-motion` fallback for every
animation (reveals, hero drift, dial draw, slideshow autoplay → manual), ≥44px
touch targets, one `<h1>` per page with sane heading order, real accessible
`<a>`/`<Link>` navigation, and alt text on all meaningful imagery. Content never
depends on motion or JS to become visible.
