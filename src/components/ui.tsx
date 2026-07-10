import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

// ── Buttons ──────────────────────────────────────────────────────────

const btnBase =
  "btn-cognac inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[color,background-color,border-color,box-shadow,filter,transform,opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const btnStyles = {
  // Machined-silver plate: milled bright button, dark ink text
  primary: `${btnBase} btn-machined text-[#20252a] hover:brightness-105 active:translate-y-px`,
  // Carbon weave: dark, silver text
  dark: `${btnBase} surface-carbon text-pearl hover:brightness-125`,
  // Ghost on dark: light hairline, brightens on hover
  outline: `${btnBase} border border-white/25 bg-white/[0.04] text-pearl hover:border-white/45 hover:bg-white/[0.09]`,
  outlineOnDark: `${btnBase} border border-pearl/40 text-pearl hover:border-silver hover:text-silver`,
  // Cognac leather: the ONE warm conversion moment (sell/valuation CTA only)
  leather: `${btnBase} bg-leather text-cream border border-cognac-deep/50 shadow-card hover:brightness-110 active:translate-y-px`,
} as const;

const btnSizes = {
  md: "px-6 py-3 text-[0.9rem]",
  lg: "px-8 py-4 text-base",
} as const;

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
}: {
  href: string;
  variant?: keyof typeof btnStyles;
  size?: keyof typeof btnSizes;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${btnStyles[variant]} ${btnSizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof btnStyles;
  size?: keyof typeof btnSizes;
}) {
  return (
    <button
      {...props}
      className={`${btnStyles[variant]} ${btnSizes[size]} ${className}`}
    />
  );
}

// ── Form fields ──────────────────────────────────────────────────────

const fieldBase =
  "w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted transition-colors focus:border-cognac focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-cognac/60";

function FieldWrap({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? (
          <>
            <span className="text-cognac" aria-hidden="true">
              {" "}
              *
            </span>
            <span className="sr-only"> (obligatoriskt)</span>
          </>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted">
            (valfritt)
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && (
        <p
          id={`${id}-fel`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  id,
  label,
  error,
  hint,
  required,
  type,
  inputMode,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}) {
  // Give tel/email fields the right mobile keyboard without each form repeating it.
  const resolvedInputMode =
    inputMode ??
    (type === "tel" ? "tel" : type === "email" ? "email" : undefined);
  return (
    <FieldWrap id={id} label={label} required={required} error={error} hint={hint}>
      <input
        id={id}
        type={type}
        inputMode={resolvedInputMode}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-fel` : undefined}
        className={`${fieldBase} ${error ? "border-danger" : ""}`}
        {...props}
      />
    </FieldWrap>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  required,
  options,
  placeholder = "Välj…",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <FieldWrap id={id} label={label} required={required} error={error} hint={hint}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-fel` : undefined}
        defaultValue=""
        className={`${fieldBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%239aa2a8%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10 ${
          error ? "border-danger" : ""
        }`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldWrap>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  required,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}) {
  return (
    <FieldWrap id={id} label={label} required={required} error={error} hint={hint}>
      <textarea
        id={id}
        required={required}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-fel` : undefined}
        className={`${fieldBase} resize-y ${error ? "border-danger" : ""}`}
        {...props}
      />
    </FieldWrap>
  );
}
