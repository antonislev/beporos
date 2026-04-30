"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/society", label: "SOCIETY", subtitle: "CULTURE & EVENTS", color: "#e8729a" },
  { href: "/artifacts", label: "TEES", subtitle: "COLLECTION 001", color: "#3d6b9e" },
  { href: "/drops", label: "DROPS", subtitle: "UPCOMING RELEASES", color: "#e8729a" },
  { href: "/about", label: "ABOUT", subtitle: "THE STORY", color: "#9a9490" },
];

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

export default function HomePage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const mouse = useMousePosition();
  const containerRef = useRef<HTMLElement>(null);
  const activeLink = LINKS.find((l) => l.label === hovered);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const relMouse = containerRef.current
    ? {
        x: (mouse.x / window.innerWidth - 0.5) * 2,
        y: (mouse.y / window.innerHeight - 0.5) * 2,
      }
    : { x: 0, y: 0 };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden cursor-default"
      style={{ background: "var(--color-bg)" }}
    >
      {/* GTA Map background — glitched */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main map layer */}
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/brand/map.png')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          animation: "mapFlicker 10s ease infinite",
        }} />

        {/* Soft pink glow behind map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full" style={{
          background: "radial-gradient(circle, rgba(232,114,154,0.06), transparent 70%)",
        }} />

        {/* Edge fade — clean vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 25%, var(--color-bg) 68%)",
        }} />

        {/* Scan line — single clean sweep */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ background: "linear-gradient(90deg, transparent 10%, var(--color-pink), transparent 90%)", opacity: 0.12 }}
        />

        {/* Second scan — slower, opposite feel */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          animate={{ top: ["100%", "0%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          style={{ background: "linear-gradient(90deg, transparent 20%, var(--color-blue), transparent 80%)", opacity: 0.08 }}
        />
        {/* Corner marks */}
        <div className="absolute top-[18%] left-[18%] w-5 h-5 border-t border-l border-[var(--color-pink)] opacity-[0.1]" />
        <div className="absolute top-[18%] right-[18%] w-5 h-5 border-t border-r border-[var(--color-pink)] opacity-[0.1]" />
        <div className="absolute bottom-[18%] left-[18%] w-5 h-5 border-b border-l border-[var(--color-pink)] opacity-[0.1]" />
        <div className="absolute bottom-[18%] right-[18%] w-5 h-5 border-b border-r border-[var(--color-pink)] opacity-[0.1]" />
      </div>
      {/* Glow burst — pulses at center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        animate={{
          opacity: [0, 0, 0.1, 0.04, 0, 0, 0.08, 0],
          scale: [0.6, 0.6, 1.3, 1, 0.6, 0.6, 1.2, 0.6],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, var(--color-pink), transparent 60%)" }}
      />

      {/* Blue glow — offset, different rhythm */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
        animate={{
          opacity: [0, 0.05, 0, 0, 0.04, 0],
          scale: [0.8, 1.2, 0.8, 0.8, 1.1, 0.8],
          x: ["-10%", "0%", "10%", "0%", "-5%", "-10%"],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "40%", left: "55%", background: "radial-gradient(circle, var(--color-blue), transparent 60%)" }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(232,114,154,0.02) 59px, rgba(232,114,154,0.02) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(232,114,154,0.02) 59px, rgba(232,114,154,0.02) 60px)",
      }} />

      {/* Scan line glow trail — pink line leaves a fading wake */}
      <motion.div
        className="absolute left-0 right-0 h-[30px] pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ background: "linear-gradient(180deg, transparent, rgba(232,114,154,0.03), transparent)" }}
      />

      {/* Scan line glow trail — blue line */}
      <motion.div
        className="absolute left-0 right-0 h-[20px] pointer-events-none"
        animate={{ top: ["100%", "0%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        style={{ background: "linear-gradient(180deg, transparent, rgba(61,107,158,0.025), transparent)" }}
      />

      {/* Outer ring pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-pink)] pointer-events-none"
        animate={{
          width: ["100px", "500px"],
          height: ["100px", "500px"],
          opacity: [0.08, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 4 }}
      />

      {/* Second ring — staggered */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-blue)] pointer-events-none"
        animate={{
          width: ["80px", "400px"],
          height: ["80px", "400px"],
          opacity: [0.06, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 4, delay: 2 }}
      />
      {/* Animated gradient blob following cursor */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none blur-[180px]"
        animate={{
          x: mouse.x - 250,
          y: mouse.y - 250,
          background: activeLink ? `radial-gradient(circle, ${activeLink.color}20, transparent)` : "radial-gradient(circle, rgba(232,114,154,0.08), transparent)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
        style={{ position: "fixed", top: 0, left: 0 }}
      />

      {/* Grid lines background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--color-pink)] opacity-20 pointer-events-none"
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * -100, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          style={{ top: `${20 + i * 15}%`, left: `${10 + i * 18}%` }}
        />
      ))}

      {/* Logo with parallax */}
      <motion.div
        className="relative w-[220px] h-[72px] md:w-[320px] md:h-[105px] mb-3"
        style={{ perspective: 800 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: entered ? (hovered ? 0.5 : 1) : 0,
          y: entered ? 0 : 30,
          scale: hovered ? 0.92 : 1,
          rotateY: 360,
        }}
        transition={{
          rotateY: { duration: 10, ease: "linear", repeat: Infinity },
          opacity: { type: "spring", damping: 20, stiffness: 80 },
          y: { type: "spring", damping: 20, stiffness: 80 },
          scale: { type: "spring", damping: 20, stiffness: 80 },
        }}
      >
        <Image src="/images/brand/logo.png" alt="Poros Island" fill className="object-contain" sizes="320px" priority />
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="flex items-center gap-3 mb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div
          className="h-[1px] bg-[var(--color-pink)] opacity-40"
          initial={{ width: 0 }}
          animate={{ width: hovered ? 16 : 28 }}
          transition={{ duration: 0.4 }}
        />
        <motion.p
          className="font-display text-[10px] tracking-[5px] text-[var(--color-muted)] uppercase"
          animate={{ letterSpacing: hovered ? "8px" : "5px", opacity: hovered ? 0.3 : 0.7 }}
          transition={{ duration: 0.4 }}
        >
          By locals, for locals
        </motion.p>
        <motion.div
          className="h-[1px] bg-[var(--color-pink)] opacity-40"
          initial={{ width: 0 }}
          animate={{ width: hovered ? 16 : 28 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-1 w-full max-w-[340px] relative z-10">
        {LINKS.map((link, i) => (
          <motion.div
            key={link.href}
            className="w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: entered ? 1 : 0, x: entered ? 0 : -20 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href={link.href}
              onMouseEnter={() => setHovered(link.label)}
              onMouseLeave={() => setHovered(null)}
              className="w-full flex items-center gap-4 py-4 px-2 relative group"
            >
              {/* Line that extends on hover */}
              <motion.div
                className="h-[1px] flex-shrink-0"
                animate={{
                  width: hovered === link.label ? 40 : 16,
                  backgroundColor: hovered === link.label ? link.color : "var(--color-muted)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {/* Label */}
              <motion.span
                style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 800, letterSpacing: "4px", textTransform: "uppercase" as const }}
                animate={{
                  color: hovered === link.label ? link.color : "var(--color-text)",
                  x: hovered === link.label ? 6 : 0,
                  textShadow: hovered === link.label ? `0 0 20px ${link.color}30` : "none",
                }}
                transition={{ duration: 0.3 }}
              >
                {link.label}
              </motion.span>

              {/* Subtitle slides in */}
              <motion.span
                style={{ fontFamily: "var(--font-display)", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}
                animate={{
                  opacity: hovered === link.label ? 0.4 : 0,
                  x: hovered === link.label ? 0 : -8,
                  color: link.color,
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {link.subtitle}
              </motion.span>

              {/* Arrow far right */}
              <motion.span
                className="ml-auto"
                style={{ fontFamily: "var(--font-display)", fontSize: "16px" }}
                animate={{
                  opacity: hovered === link.label ? 1 : 0,
                  x: hovered === link.label ? 0 : -10,
                  color: link.color,
                }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>

              {/* Bottom underline sweep */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
                animate={{
                  scaleX: hovered === link.label ? 1 : 0,
                  backgroundColor: link.color,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* IG Link */}
      <motion.a
        href="https://instagram.com/beporos"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 font-display text-[10px] tracking-[3px] text-[var(--color-pink)] font-bold relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? (hovered ? 0.3 : 0.8) : 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05, opacity: 1 }}
      >
        @BEPOROS
        <motion.span
          className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-pink)]"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>

      {/* Location */}
      <motion.span
        className="absolute bottom-8 font-display text-[9px] tracking-[3px] text-[var(--color-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? (hovered ? 0.15 : 0.4) : 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        37.4967° N, 23.4572° E — POROS ISLAND
      </motion.span>

      {/* Horizontal scan lines (subtle) */}
      <AnimatePresence>
        {hovered && (
          <>
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none"
              initial={{ opacity: 0, top: "30%" }}
              animate={{ opacity: 0.15, top: "70%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "linear" }}
              style={{ background: `linear-gradient(90deg, transparent, ${activeLink?.color}40, transparent)` }}
            />
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none"
              initial={{ opacity: 0, top: "70%" }}
              animate={{ opacity: 0.1, top: "25%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "linear" }}
              style={{ background: `linear-gradient(90deg, transparent, ${activeLink?.color}25, transparent)` }}
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}