import { Drop } from "@/types";

export const drops: Drop[] = [
  {
    id: "drop-002",
    slug: "summer-transmission",
    title: "DROP 002 — SUMMER TRANSMISSION",
    date: "2026-06-01T18:00:00",
    status: "upcoming",
    description:
      "New artifacts loading. Summer '26. The island speaks — we just put it on fabric.",
    pieces: 2,
  },
  {
    id: "drop-001",
    slug: "first-transmission",
    title: "DROP 001 — FIRST TRANSMISSION",
    date: "2026-03-01T18:00:00",
    status: "past",
    description:
      "Where it all started. 2 designs. Poros Island Black. 1963. Gone in 48 hours.",
    pieces: 2,
  },
];

export function getUpcomingDrop(): Drop | undefined {
  return drops.find((d) => d.status === "upcoming");
}

export function getPastDrops(): Drop[] {
  return drops.filter((d) => d.status === "past");
}