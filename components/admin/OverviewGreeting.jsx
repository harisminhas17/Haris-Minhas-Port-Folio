"use client";

import { useEffect, useState } from "react";

import NotificationBell from "@/components/admin/NotificationBell";

const TIME_ZONE = "Asia/Karachi";

function greetingFor(hour) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Night owl";
}

function readClock(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const map = {};
  for (const part of parts) map[part.type] = part.value;

  const hour24 = Number(map.hour) % 24;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  return {
    hour: hour24,
    time: `${hour12}:${map.minute}:${map.second} ${period}`,
    date: `${map.weekday}, ${map.day} ${map.month} ${map.year}`,
  };
}

export default function OverviewGreeting({ initialIso }) {
  const [now, setNow] = useState(() => new Date(initialIso ?? Date.now()));

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const clock = readClock(now);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          Content management
        </p>
        <NotificationBell />
      </div>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {greetingFor(clock.hour)}
          </h1>
          <p className="mt-2 text-sm text-muted">{clock.date}</p>
        </div>

        <div className="text-right">
          <p className="font-mono text-xl tabular-nums text-ink">{clock.time}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            Karachi · PKT
          </p>
        </div>
      </div>
    </div>
  );
}
