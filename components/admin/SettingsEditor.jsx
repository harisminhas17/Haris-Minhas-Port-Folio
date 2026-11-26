"use client";

import { useCallback, useEffect, useState } from "react";

import { Field } from "@/components/admin/fields";

const sections = [
  {
    key: "meta",
    label: "Identity & navigation",
    fields: [
      { name: "siteName", label: "Site name", type: "text" },
      { name: "role", label: "Role", type: "text" },
      {
        name: "avatar",
        label: "Profile image",
        type: "image",
        imageKind: "avatar",
        hint: "Square, shown in the nav and admin",
      },
      { name: "availabilityNote", label: "Availability note", type: "text" },
      { name: "available", label: "Show availability dot", type: "boolean" },
    ],
  },
  {
    key: "hero",
    label: "Hero",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "headlineLines", label: "Headline lines", type: "list", hint: "One per line" },
      { name: "intro", label: "Intro", type: "textarea", rows: 4 },
      {
        name: "image",
        label: "Hero image",
        type: "image",
        imageKind: "hero",
        preview: "portrait",
        hint: "Portrait photo in the hero panel",
      },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
    ],
  },
  {
    key: "about",
    label: "About",
    fields: [
      { name: "kicker", label: "Kicker", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "paragraphs", label: "Paragraphs", type: "list", hint: "One per line" },
      { name: "pullQuote", label: "Pull quote", type: "textarea", rows: 2 },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    fields: [
      { name: "kicker", label: "Kicker", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea", rows: 3 },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "whatsapp", label: "WhatsApp number", type: "text" },
      { name: "location", label: "Location", type: "text" },
    ],
  },
];

export default function SettingsEditor() {
  const [settings, setSettings] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/settings", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load settings");
        setSettings(data.settings ?? {});
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  const update = useCallback((section, name, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...(prev[section] ?? {}), [name]: value },
    }));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setStatus("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSettings(data.settings);
      setStatus("Settings saved");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    if (!error) return <p className="text-sm text-muted">Loading…</p>;

    return (
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Site settings
        </h1>
        <div className="mt-6 rounded-lg border border-line-strong bg-surface p-6">
          <p className="text-sm font-medium text-ink">{error}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Settings are stored in Postgres. Add{" "}
            <code className="font-mono text-[12px] text-accent">DATABASE_URL</code>{" "}
            to <code className="font-mono text-[12px]">.env</code>, then run{" "}
            <code className="font-mono text-[12px] text-accent">pnpm db:push</code>{" "}
            and{" "}
            <code className="font-mono text-[12px] text-accent">pnpm db:seed</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={save}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Site settings
          </h1>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Identity, hero, about, contact
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-[13px] font-medium text-[color:var(--accent-ink)] transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save settings"}
        </button>
      </div>

      {(status || error) && (
        <p role="status" className={`mt-4 text-[13px] ${error ? "text-danger" : "text-accent"}`}>
          {error || status}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.key} className="rounded-lg border border-line bg-surface p-5">
            <h2 className="font-display text-base font-medium tracking-tight">
              {section.label}
            </h2>
            <div className="mt-5 space-y-5">
              {section.fields.map((field) => (
                <div key={field.name}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {field.label}
                  </span>
                  <div className="mt-1.5">
                    {field.type === "boolean" ? (
                      <label className="flex cursor-pointer items-center gap-2 text-[13px] text-muted">
                        <input
                          type="checkbox"
                          checked={Boolean(settings[section.key]?.[field.name])}
                          onChange={(e) =>
                            update(section.key, field.name, e.target.checked)
                          }
                          className="h-4 w-4 accent-[color:var(--accent)]"
                        />
                        Enabled
                      </label>
                    ) : (
                      <Field
                        field={field}
                        value={settings[section.key]?.[field.name]}
                        onChange={(value) => update(section.key, field.name, value)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </form>
  );
}
