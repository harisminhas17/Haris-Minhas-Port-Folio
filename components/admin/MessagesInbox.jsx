"use client";

import { useEffect, useState } from "react";

export default function MessagesInbox() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load messages");
      setItems(data.items ?? []);
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (item) => {
    const isRead = !item.is_read;
    setItems((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, is_read: isRead } : m))
    );
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, isRead }),
    });
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete message from ${item.name}?`)) return;
    await fetch(`/api/admin/messages?id=${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((m) => m.id !== item.id));
  };

  const unread = items.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Messages
          </h1>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {unread} unread of {items.length}
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-[13px] text-ink transition-colors hover:bg-surface"
        >
          Refresh
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-[13px] text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-muted">Loading…</p>
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-line-strong p-10 text-center">
          <p className="text-sm text-muted">
            No messages yet. Submissions from the contact form land here.
          </p>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.id} className="py-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      item.is_read ? "bg-faint" : "bg-accent"
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {item.name}{" "}
                      <a
                        href={`mailto:${item.email}`}
                        className="ml-1 font-normal text-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-ink"
                      >
                        {item.email}
                      </a>
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleRead(item)}
                    className="rounded-md px-3 py-1.5 text-[12px] text-muted transition-colors hover:bg-surface hover:text-ink"
                  >
                    {item.is_read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item)}
                    className="rounded-md px-2 py-1.5 text-[12px] text-muted transition-colors hover:bg-surface hover:text-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap pl-6 text-[13px] leading-relaxed text-muted">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
