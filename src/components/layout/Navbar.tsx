"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  //{ href: "/society", label: "SOCIETY" },
  { href: "/artifacts", label: "TEES" },
  { href: "/drops", label: "DROPS" },
  { href: "/about", label: "ABOUT" },
];

const POROS_LAT = 37.4967;
const POROS_LNG = 23.4572;

function getWeatherEmoji(code: number, isDay: boolean): string {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code <= 3) return isDay ? "⛅" : "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌧️";
  if (code <= 86) return "🌨️";
  if (code <= 99) return "⛈️";
  return isDay ? "🌤️" : "🌙";
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState<{ temp: number; emoji: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Athens",
        hour: "2-digit",
        minute: "2-digit",
      }));
    };
    tick();
    const interval = setInterval(tick, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${POROS_LAT}&longitude=${POROS_LNG}&current=temperature_2m,weather_code,is_day&timezone=Europe%2FAthens`)
      .then((res) => res.json())
      .then((data) => {
        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            emoji: getWeatherEmoji(data.current.weather_code, data.current.is_day === 1),
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 border-b border-[var(--color-border)]" style={{ background: "color-mix(in srgb, var(--color-bg) 92%, transparent)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        {/* Left: Island pulse */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-pink)] opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-pink)]" />
          </span>
          <Link href="/" className="flex items-center gap-2">
            <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, letterSpacing: "3px", color: "var(--color-text)" }}>POROS</span>
          </Link>
          <span style={{ width: "1px", height: "14px", background: "var(--color-border)", margin: "0 4px" }} />
          {time && (
            <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "var(--color-text)" }}>{time}</span>
          )}
          {weather && (
            <>
              <span style={{ width: "1px", height: "14px", background: "var(--color-border)", margin: "0 4px" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "var(--color-text)" }}>{weather.emoji} {weather.temp}°</span>
            </>
          )}
        </div>

        {/* Center: Nav (desktop) */}
        {/* Center: Nav (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-6 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" as const, color: "var(--color-muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-pink)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <a href="https://open.spotify.com/playlist/4IC7fu1iz7yZYn45ve2N6g?si=50d53b96477c438a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ fontFamily: "var(--font-display)", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "var(--color-pink)", textDecoration: "none" }}>
            ♫
          </a>
          <button onClick={() => setMobileOpen(true)} className="flex md:hidden flex-col gap-[5px] p-1" aria-label="Menu">
            <span className="block w-[20px] h-[1.5px] bg-[var(--color-text)]" />
            <span className="block w-[14px] h-[1.5px] bg-[var(--color-text)]" />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  );
}