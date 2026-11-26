"use client";

import { useEffect, useRef, useState } from "react";

function relativeTime(iso) {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function NotificationBell() {
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res = await fetch("/api/admin/messages", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!active) return;
        setItems(data.items ?? []);
        setUnread(data.items?.filter((m) => !m.is_read).length ?? 0);
      } catch {
        // Notifications are non-critical; fail quietly.
      } finally {
        if (active) setLoaded(true);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markRead = async (item) => {
    setItems((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, is_read: true } : m))
    );
    setUnread((count) => Math.max(0, count - 1));
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, isRead: true }),
    });
  };

  const recent = items.slice(0, 6);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[9px] font-semibold text-[color:var(--accent-ink)]">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg border border-line-strong bg-canvas shadow-2xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              Notifications
            </p>
            <span className="text-[11px] text-muted">{unread} unread</span>
          </div>

          {!loaded ? (
            <p className="px-4 py-6 text-center text-[13px] text-muted">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="px-4 py-6 text-center text-[13px] text-muted">
              You&apos;re all caught up.
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {recent.map((item) => (
                <li key={item.id} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => markRead(item)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface"
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        item.is_read ? "bg-transparent" : "bg-accent"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-[13px] font-medium text-ink">
                          {item.name}
                        </span>
                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
                          {relativeTime(item.created_at)}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] text-muted">
                        {item.message}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <a
            href="/admin/messages"
            className="block border-t border-line px-4 py-3 text-center text-[12px] text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            View all messages
          </a>
        </div>
      )}
    </div>
  );
}
