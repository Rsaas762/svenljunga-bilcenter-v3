"use client";

import { useState } from "react";

/**
 * Image picker for the "Sälj din bil" form. Lets the seller attach photos
 * of their car and shows the selected file names.
 *
 * NOTE: the lead currently POSTs JSON to /api/leads, so only the file NAMES
 * travel with the lead (see SellCarForm.buildLead). Sending the actual image
 * bytes needs a storage backend (e.g. Vercel Blob / S3) and a multipart
 * endpoint — wire that where the lead destination is chosen.
 */
export function FileField({
  id,
  name,
  label,
  accept = "image/*",
  multiple = true,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  hint?: string;
}) {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-ink"
      >
        {label}
        <span className="ml-1 text-xs font-normal text-muted">(valfritt)</span>
      </label>

      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/[0.03] px-4 py-6 text-center transition-colors hover:border-cognac/60 hover:bg-white/[0.05]"
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-silver"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M12 3v13" />
          <path d="m7 8 5-5 5 5" />
        </svg>
        <span className="text-sm text-muted">
          {files.length > 0
            ? `${files.length} ${files.length === 1 ? "bild" : "bilder"} vald${files.length === 1 ? "" : "a"}`
            : "Dra hit bilder eller klicka för att välja"}
        </span>
        <span className="text-xs text-muted">JPG eller PNG</span>
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) =>
            setFiles(Array.from(e.target.files ?? []).map((f) => f.name))
          }
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-muted">
          {files.map((n) => (
            <li key={n} className="truncate">
              • {n}
            </li>
          ))}
        </ul>
      )}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
