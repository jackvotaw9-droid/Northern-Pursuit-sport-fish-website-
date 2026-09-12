"use client";

import { useEffect, useState } from "react";

function formatMonthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function AvailabilityCalendar({
  packageSlug,
  selectedDate,
  onSelect,
}: {
  packageSlug: string;
  selectedDate: string;
  onSelect: (isoDate: string) => void;
}) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [closedDates, setClosedDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const viewDate = new Date();
  viewDate.setDate(1);
  viewDate.setMonth(viewDate.getMonth() + monthOffset);
  const monthKey = formatMonthKey(viewDate);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch(`/api/availability?packageSlug=${packageSlug}&month=${monthKey}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setClosedDates(new Set(data.closedDates as string[]));
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [packageSlug, monthKey]);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const startWeekday = viewDate.getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: (string | null)[] = Array(startWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push(iso);
  }

  return (
    <div className="border border-silver-light rounded p-4">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={() => setMonthOffset((m) => m - 1)} className="text-sm px-2 py-1 hover:text-brand-700">←</button>
        <div className="font-display uppercase text-brand-900 text-sm">
          {viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
        <button type="button" onClick={() => setMonthOffset((m) => m + 1)} className="text-sm px-2 py-1 hover:text-brand-700">→</button>
      </div>

      {error && <p className="text-xs text-red-700 mb-2">Couldn't load availability — connect a database to see live open dates.</p>}
      {loading && <p className="text-xs text-silver-dark mb-2">Loading availability…</p>}

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase text-silver-dark mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((iso, i) => {
          if (!iso) return <div key={i} />;
          const cellDate = new Date(iso + "T00:00:00");
          const isPast = cellDate < today;
          const isClosed = closedDates.has(iso);
          const disabled = isPast || isClosed || loading;
          return (
            <button
              type="button"
              key={iso}
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`aspect-square rounded text-xs flex items-center justify-center ${
                selectedDate === iso
                  ? "bg-brand-500 text-white"
                  : disabled
                  ? "text-silver-dark/50 cursor-not-allowed"
                  : "hover:bg-ice text-charcoal"
              }`}
            >
              {cellDate.getDate()}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-silver-dark mt-3">Greyed-out dates are already booked, blocked, or not yet opened by the captain.</p>
    </div>
  );
}
