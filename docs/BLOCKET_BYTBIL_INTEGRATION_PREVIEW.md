# Blocket & Bytbil Integration Preview

## Vad förhandsvisningen demonstrerar

Sidan `/admin-preview/integrationer` visar hur Svenljunga Bilcenter kan arbeta med lagerdata i tre nivåer: manuell lagerhantering, automatisk import från Blocket/Bytbil och en framtida tvåvägssynk. Den visar också ett tänkbart ägarvänligt statusgränssnitt, provbilar och de tekniska flödena från annonsplattform till hemsida.

## Vad som endast är mockdata

Alla mätvärden, synktider, varningar, annons-id:n och provbilar är påhittade. Knappen **Testa import** ändrar endast lokalt React-tillstånd i webbläsaren. Ingenting sparas, ingen bil läggs till i det riktiga lagret och inga externa tjänster kontaktas. Publicerade annonser visas alltid som noll eftersom någon publiceringskoppling inte finns.

## Varför officiell API-access krävs

En stabil integration behöver ett dokumenterat avtal och ett gränssnitt som får läsa företagets annonser. Tvåvägspublicering kräver dessutom uttrycklig skrivrättighet, kontokoppling, fältvalidering, felkoder och regler för bilder, priser, obligatoriska fordonsuppgifter och annonsstatus. Dessa förutsättningar måste komma från Blocket, Bytbil eller en auktoriserad integrationspartner.

## Varför scraping inte rekommenderas

Scraping är känsligt för layoutändringar, kan missa eller feltolka data och saknar garanterad åtkomst till annonsstatus och felinformation. Det kan också strida mot plattformens villkor. För ett affärskritiskt lager skapar det onödiga drift-, kvalitets- och avtalsrisker. Förhandsvisningen innehåller därför ingen scraping och ska inte utvecklas till en scraper.

## Rekommenderad produktionsväg

1. Bekräfta vilket system som ska vara huvudlager.
2. Börja med Blocket/Bytbil som *source of truth* och importera till hemsidan via officiell export, API eller integrationspartner.
3. Lägg en schemalagd synk med loggning, validering, idempotenta uppdateringar och manuell felkö.
4. Kör en pilot med ett mindre antal annonser och jämför pris, status, utrustning och bilder.
5. Utvärdera tvåvägspublicering som en separat fas först när officiell skrivåtkomst och ansvarsfördelning är klar.

## Frågor till ägaren

- Vilket Blocket-företagskonto och annonspaket används?
- Använder verksamheten Bytbil i dag?
- Finns API-, export- eller feed-access i avtalet?
- Vem är kontaktperson hos Blocket, Bytbil eller nuvarande integrationspartner?
- Kan vi få ett exempel på en befintlig annons och dess interna fordons-id?
- Vilken källa ska vara huvudlager: Blocket/Bytbil eller hemsidan?
- Vem ansvarar för att rätta varningar och godkänna publicering?
- Hur snabbt måste sålda eller reserverade bilar försvinna från hemsidan?

## Framtida implementationsalternativ

### Alternativ A — Manuell admin

Bygg ett enkelt lageradmin på hemsidan. Det kräver ingen marknadsplats-API men innebär dubbelregistrering om samma bil också annonseras externt.

### Alternativ B — Envägsimport, rekommenderad start

Läs en officiell feed eller API och översätt posterna till hemsidans befintliga bilmodell. Blocket/Bytbil förblir huvudlager. Detta ger lägre risk och tydligt ägarskap för data.

### Alternativ C — Integrationspartner

Anslut via en partner som redan har avtal och färdiga kopplingar till marknadsplatserna. Det kan ge snabbare införande men innebär partnerkostnad och beroende av deras datamodell.

### Alternativ D — Tvåvägssynk

Låt hemsidans admin skapa och uppdatera annonser via en officiell publicerings-API. Detta kräver skrivbehörighet, robust validering, konfliktregler, revisionslogg, köhantering och tydliga återställningsrutiner. Det ska behandlas som en separat produktionsfas.

## Säkerhetsgräns

Inga riktiga credentials, tokens eller hemligheter ska lagras i källkoden. Produktionsuppgifter hör hemma i en godkänd secrets-tjänst och ska bara användas från serversidan. Preview-sidan får aldrig kopplas direkt till ett externt produktionskonto.

