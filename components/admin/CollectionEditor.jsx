"use client";

import { useCallback, useEffect, useState } from "react";

import { FormRow } from "@/components/admin/fields";

function emptyDraft(config) {
  const draft = {};
  for (const field of config.fields) {
    draft[field.name] = field.type === "list" ? [] : field.default ?? "";
  }
  return draft;
}

export default function CollectionEditor({ configKey, config }) {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${configKey}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load");
      setItems(data.items ?? []);
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [configKey]);

  useEffect(() => {
    load();
  }, [load]);

  const startNew = () => {
    setDraft({ ...emptyDraft(config) });
    setStatus("");
    setError("");
  };

  const startEdit = (item) => {
    const next = {};
    for (const field of config.fields) {
      next[field.name] = item[field.name] ?? (field.type === "list" ? [] : "");
    }
    setDraft({ ...next, id: item.id });
    setStatus("");
    setError("");
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const isEdit = Boolean(draft.id);
    try {
      const res = await fetch(`/api/admin/${configKey}`, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }

      setStatus(isEdit ? "Saved" : "Created");
      setDraft(null);
      await load();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item[config.titleField]}"?`)) return;

    try {
      const res = await fetch(`/api/admin/${configKey}?id=${item.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setStatus("Deleted");
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const move = async (index, direction) => {
    const next = [...items];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;

    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);

    await fetch(`/api/admin/${configKey}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: next.map((i) => i.id) }),
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            {config.label}
          </h1>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {loading
              ? "Loading…"
              : `${items.length} ${items.length === 1 ? "entry" : "entries"}`}
          </p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-medium text-[color:var(--accent-ink)] transition-colors hover:bg-accent-hover"
        >
          New {config.singular.toLowerCase()}
        </button>
      </div>

      {status && (
        <p role="status" className="mt-4 text-[13px] text-accent">
          {status}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_420px]">
        <div>
          {loading ? (
            <p className="text-sm text-muted">Loading…</p>
          ) : error ? (
            <div className="rounded-lg border border-line-strong bg-surface p-6">
              <p className="text-sm font-medium text-ink">{error}</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Entries are stored in Postgres. Add{" "}
                <code className="font-mono text-[12px] text-accent">DATABASE_URL</code>{" "}
                to <code className="font-mono text-[12px]">.env</code>, then run{" "}
                <code className="font-mono text-[12px] text-accent">pnpm db:push</code>{" "}
                and <code className="font-mono text-[12px] text-accent">pnpm db:seed</code>.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-line-strong p-10 text-center">
              <p className="text-sm text-muted">
                Nothing here yet. Create the first {config.singular.toLowerCase()}.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className={`flex items-start justify-between gap-4 py-4 ${
                    draft?.id === item.id ? "bg-raised" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {item[config.titleField] || "Untitled"}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                      {config.fields
                        .filter((f) => f.name !== config.titleField && typeof item[f.name] === "string")
                        .slice(0, 2)
                        .map((f) => item[f.name])
                        .filter(Boolean)
                        .join(" · ") || `#${item.id}`}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label="Move up"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === items.length - 1}
                      aria-label="Move down"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-md px-3 py-1.5 text-[12px] text-muted transition-colors hover:bg-surface hover:text-ink"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(item)}
                      className="rounded-md px-2 py-1.5 text-[12px] text-muted transition-colors hover:bg-surface hover:text-danger"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="xl:sticky xl:top-4 xl:self-start">
          {draft ? (
            <form
              onSubmit={save}
              className="rounded-lg border border-line bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-medium tracking-tight">
                  {draft.id ? `Edit ${config.singular.toLowerCase()}` : `New ${config.singular.toLowerCase()}`}
                </h2>
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="text-[12px] text-muted transition-colors hover:text-ink"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-5 space-y-5">
                {config.fields.map((field) => (
                  <FormRow
                    key={field.name}
                    field={field}
                    value={draft[field.name]}
                    onChange={(value) => setDraft({ ...draft, [field.name]: value })}
                  />
                ))}
              </div>

              {error && (
                <p role="alert" className="mt-4 text-[12px] text-danger">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-full bg-accent text-[13px] font-medium text-[color:var(--accent-ink)] transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {saving ? "Saving…" : draft.id ? "Save changes" : `Create ${config.singular.toLowerCase()}`}
              </button>
            </form>
          ) : (
            <div className="rounded-lg border border-dashed border-line p-5">
              <p className="text-sm text-muted">
                Select an entry to edit, or create a new one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
