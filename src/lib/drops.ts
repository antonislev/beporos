import { Drop } from "@/types";

export const drops: Drop[] = [
  {
    id: "drop-002",
    slug: "static-noise",
    title: "DROP 002 — STATIC NOISE",
    date: "2026-05-15T18:00:00",
    status: "upcoming",
    description:
      "5 new pieces. Inspired by Athens FM frequencies at 3AM. Tees, a jacket, and something you haven't seen before.",
    pieces: 5,
  },
  {
    id: "drop-001",
    slug: "first-transmission",
    title: "DROP 001 — FIRST TRANSMISSION",
    date: "2026-03-01T18:00:00",
    status: "past",
    description:
      "Where it started. 3 designs. Raw, unfiltered, Athens-born. The foundation of beporos.",
    pieces: 3,
  },
];

export function getUpcomingDrop(): Drop | undefined {
  return drops.find((d) => d.status === "upcoming");
}

export function getPastDrops(): Drop[] {
  return drops.filter((d) => d.status === "past");
}