"use client";

import { useState } from "react";

import { getImageRule, validateImageFile } from "@/lib/admin/image-rules";

export function ImageField({ value, onChange, label, imageKind = "default", preview = "square" }) {
  const rule = getImageRule(imageKind);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    setError("");

    const invalid = await validateImageFile(file, rule);
    if (invalid) {
      setError(invalid);
      setBusy(false);
      return;
    }

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("kind", imageKind);
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const previewClass =
    preview === "portrait" ? "h-full w-full object-cover object-top" : "h-full w-full object-contain p-1";
  const boxClass = preview === "portrait" ? "h-20 w-16" : "h-16 w-16";

  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          className={`flex ${boxClass} shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-surface`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className={previewClass} />
          ) : (
            <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
              None
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/assets/image.png or upload"
            className="field-line !py-1.5 text-[13px]"
            aria-label={label}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 text-[12px] text-muted transition-colors hover:text-ink">
              <input
                type="file"
                accept={rule.formats.join(",")}
                className="sr-only"
                onChange={(e) => upload(e.target.files?.[0])}
              />
              <span className="rounded-md border border-line-strong px-2 py-1">
                {busy ? "Uploading…" : "Upload"}
              </span>
            </label>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setError("");
                }}
                className="rounded-md px-2 py-1 text-[12px] text-muted transition-colors hover:text-danger"
              >
                Remove
              </button>
            )}
          </div>
          <p className="mt-1.5 text-[10px] leading-relaxed text-faint">
            {rule.formatHint} · max {rule.byteHint}
            {rule.enforceDimensions ? ` · ${rule.dimensionHint}` : ""}
          </p>
          {error && <p className="mt-1 text-[11px] text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export function Field({ field, value, onChange }) {
  const id = `field-${field.name}`;

  if (field.type === "image") {
    return (
      <ImageField
        value={value}
        onChange={onChange}
        label={field.label}
        imageKind={field.imageKind}
        preview={field.preview}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        id={id}
        rows={field.rows ?? 3}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="field-line resize-y !py-2 text-[14px]"
      />
    );
  }

  if (field.type === "list") {
    return (
      <textarea
        id={id}
        rows={field.rows ?? 4}
        value={Array.isArray(value) ? value.join("\n") : value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="field-line resize-y !py-2 font-mono text-[13px]"
        placeholder={field.hint}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={id}
        value={value ?? field.default ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="field-line !py-2 text-[14px]"
      >
        {field.options.map((option) => (
          <option key={option} value={option} className="bg-surface">
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={id}
      type={field.type === "url" ? "url" : "text"}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="field-line !py-2 text-[14px]"
    />
  );
}

export function FormRow({ field, value, onChange }) {
  return (
    <label htmlFor={`field-${field.name}`} className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          {field.label}
          {field.required && <span className="ml-1 text-accent">*</span>}
        </span>
        {field.hint && field.type !== "list" && (
          <span className="text-[10px] text-faint">{field.hint}</span>
        )}
      </span>
      <div className="mt-1.5">
        <Field field={field} value={value} onChange={onChange} />
      </div>
    </label>
  );
}
