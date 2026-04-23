"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      <div className="font-display text-[clamp(28px,6vw,52px)] font-bold tracking-[2px] text-[var(--color-pink)]">
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
        <span className="font-display text-[9px] tracking-[4px] text-[var(--color-pink)] uppercase block mb-2">
          TRANSMISSIONS
        </span>
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          DROPS
        </h1>
      </div>

      {/* Upcoming */}
      {upcoming && (
        <div className="border border-[var(--color-pink)] p-8 md:p-16 mb-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[var(--color-pink)] opacity-[0.06] blur-[120px] pointer-events-none" />

          <span className="font-display text-[10px] tracking-[4px] text-[var(--color-pink)] uppercase block mb-8 relative">
            ▲ INCOMING TRANSMISSION
          </span>
          <h2 className="font-display text-[clamp(22px,4vw,36px)] font-bold tracking-[4px] uppercase mb-4 relative">
            {upcoming.title}
          </h2>
          <p className="text-[var(--color-muted)] max-w-[500px] mx-auto leading-relaxed mb-12 font-light text-sm relative">
            {upcoming.description}
          </p>

          <div className="flex justify-center gap-6 md:gap-10 mb-12 relative">
            <CountdownUnit value={countdown.days} label="DAYS" />
            <span className="font-display text-[clamp(28px,6vw,52px)] font-bold text-[var(--color-border)]">:</span>
            <CountdownUnit value={countdown.hours} label="HRS" />
            <span className="font-display text-[clamp(28px,6vw,52px)] font-bold text-[var(--color-border)]">:</span>
            <CountdownUnit value={countdown.minutes} label="MIN" />
            <span className="font-display text-[clamp(28px,6vw,52px)] font-bold text-[var(--color-border)]">:</span>
            <CountdownUnit value={countdown.seconds} label="SEC" />
          </div>

          <span className="font-display text-[10px] tracking-[3px] text-[var(--color-pink)] border border-[var(--color-pink)] px-4 py-2 opacity-60 relative inline-block">
            {upcoming.pieces} NEW ARTIFACTS
          </span>
        </div>
      )}

      {/* Archive */}
      {past.length > 0 && (
        <>
          <h3 className="font-display text-[11px] tracking-[3px] text-[var(--color-muted)] mb-6">
            ARCHIVE
          </h3>
          <div className="flex flex-col gap-4">
            {past.map((drop) => (
              <div key={drop.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-[var(--color-border)]">
                <div>
                  <h4 className="font-display text-sm font-bold tracking-[2px] uppercase mb-1">
                    {drop.title}
                  </h4>
                  <p className="text-sm text-[var(--color-muted)] font-light">
                    {drop.description}
                  </p>
                </div>
                <span className="font-display text-[9px] tracking-[2px] text-[var(--color-pink)] mt-3 md:mt-0 flex-shrink-0">
                  CLAIMED
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}