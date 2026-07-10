import { LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 pt-24 text-center sm:px-6">
      <p className="eyebrow text-brand">404</p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        Sidan kunde inte hittas
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Sidan kan ha flyttats — eller så är bilen du letade efter redan såld.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/bilar">Se bilar i lager</LinkButton>
        <LinkButton href="/" variant="outline">
          Till startsidan
        </LinkButton>
      </div>
    </div>
  );
}
