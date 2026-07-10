import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  onDark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow ${align === "left" ? "eyebrow-rule" : ""} ${
            onDark ? "text-silver" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display mt-3 text-[2rem] font-semibold leading-[1.12] text-balance sm:text-[2.5rem] ${
          onDark ? "text-pearl" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-[1.0625rem] leading-relaxed sm:text-lg ${
            onDark ? "text-pearl/70" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
