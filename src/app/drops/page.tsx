"use client";

import { useState, useEffect } from "react";
import { drops } from "@/lib/drops";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-[clamp(32px,6vw,56px)] font-bold tracking-[2px]">
        {String(value).padStart(2, "0")}
      </div>
      <div className="font-display text-[9px] tracking-[3px] text-[var(--color-muted)] mt-1">
        {label}
      </div>
    </div>
  );
}

export default function DropsPage() {
  const upcoming = drops.find((d) => d.status === "upcoming");
  const past = drops.filter((d) => d.status === "past");
  const countdown = useCountdown(upcoming?.date || "");

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
      <div className="border-b border-[var(--color-border)] pb-5 mb-14">
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          DROPS
        </h1>
      </div>

      {/* Upcoming Drop */}
      {upcoming && (
        <div className="bg-[var(--color-text)] text-[var(--color-text-inv)] p-8 md:p-16 mb-16 text-center">
          <span className="font-display text-[10px] tracking-[4px] text-[var(--color-muted)] uppercase block mb-6">
            UPCOMING
          </span>
          <h2 className="font-display text-[clamp(22px,4vw,36px)] font-bold tracking-[4px] uppercase mb-4">
            {upcoming.title}
          </h2>
          <p className="text-[var(--color-muted)] max-w-[500px] mx-auto leading-relaxed mb-12 font-light text-sm">
            {upcoming.description}
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-8 md:gap-12 mb-12">
            <CountdownUnit value={countdown.days} label="DAYS" />
            <span className="font-display text-[clamp(32px,6vw,56px)] font-bold text-[var(--color-muted)]">:</span>
            <CountdownUnit value={countdown.hours} label="HRS" />
            <span className="font-display text-[clamp(32px,6vw,56px)] font-bold text-[var(--color-muted)]">:</span>
            <CountdownUnit value={countdown.minutes} label="MIN" />
            <span className="font-display text-[clamp(32px,6vw,56px)] font-bold text-[var(--color-muted)]">:</span>
            <CountdownUnit value={countdown.seconds} label="SEC" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-[10px] tracking-[3px] text-[var(--color-muted)]">
              {upcoming.pieces} PIECES
            </span>
          </div>
        </div>
      )}

      {/* Past Drops */}
      {past.length > 0 && (
        <>
          <h3 className="font-display text-[13px] tracking-[3px] text-[var(--color-muted)] mb-8">
            ARCHIVE
          </h3>
          <div className="flex flex-col gap-4">
            {past.map((drop) => (
              <div
                key={drop.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-[var(--color-border)]"
              >
                <div>
                  <h4 className="font-display text-sm font-bold tracking-[2px] uppercase mb-1">
                    {drop.title}
                  </h4>
                  <p className="text-sm text-[var(--color-muted)] font-light">
                    {drop.description}
                  </p>
                </div>
                <span className="font-display text-[9px] tracking-[2px] text-[var(--color-accent)] mt-3 md:mt-0 flex-shrink-0">
                  SOLD OUT
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}