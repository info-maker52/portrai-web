"use client";

import { motion } from "motion/react";

/**
 * Stylised world map (equirectangular projection, simplified) with pulsing
 * dots over the cities where PortrAI has delivered events.
 *
 * Coordinates are normalised to the SVG viewBox (1000×500).
 *
 * Not a perfect cartographic map — it's a stylised silhouette using a
 * coarse country path. Good enough to show "we work everywhere", which is
 * the actual job of this section.
 *
 * If we later want a polished map, swap in `react-simple-maps` with a
 * 110m TopoJSON.
 */

type Location = { code: string; city: string; x: number; y: number };

// Approximate equirectangular pixel coords (1000x500 viewBox, lon -180..180, lat 90..-90)
// x = (lon + 180) / 360 * 1000, y = (90 - lat) / 180 * 500
const LOCATIONS: Location[] = [
  { code: "EE", city: "Tallinn",   x: 571, y: 122 },
  { code: "FI", city: "Helsinki",  x: 567, y: 116 },
  { code: "DE", city: "Berlin",    x: 537, y: 142 },
  { code: "LV", city: "Riga",      x: 567, y: 130 },
  { code: "PL", city: "Warsaw",    x: 558, y: 146 },
  { code: "BE", city: "Brussels",  x: 514, y: 145 },
  { code: "US", city: "Las Vegas", x: 175, y: 187 },
];

export function WorldMap() {
  return (
    <div className="relative aspect-[1000/500] w-full overflow-hidden rounded-md border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]">
      <svg
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        aria-label="World map of PortrAI project locations"
      >
        {/* Grid lines for atmosphere */}
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="1000" height="500" fill="url(#grid)" />

        {/* Equator + central meridian */}
        <line
          x1="0"
          y1="250"
          x2="1000"
          y2="250"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
        />
        <line
          x1="500"
          y1="0"
          x2="500"
          y2="500"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
        />

        {/* Stylised continents — coarse silhouette */}
        <g
          fill="rgba(255, 255, 255, 0.045)"
          stroke="rgba(255, 255, 255, 0.10)"
          strokeWidth="0.6"
        >
          {/* North America */}
          <path d="M 110 100 L 180 90 L 230 110 L 260 130 L 280 170 L 270 210 L 230 230 L 200 220 L 180 200 L 150 180 L 120 150 Z" />
          {/* South America */}
          <path d="M 280 250 L 320 240 L 340 280 L 330 350 L 310 410 L 290 420 L 280 380 L 270 320 Z" />
          {/* Europe */}
          <path d="M 470 110 L 530 105 L 580 115 L 600 135 L 590 160 L 560 170 L 530 165 L 500 155 L 480 140 Z" />
          {/* Africa */}
          <path d="M 510 200 L 570 200 L 600 240 L 620 300 L 600 360 L 560 380 L 530 360 L 510 320 L 500 270 Z" />
          {/* Asia */}
          <path d="M 600 110 L 720 100 L 820 130 L 870 170 L 880 210 L 840 230 L 780 220 L 720 200 L 660 190 L 620 170 Z" />
          {/* Australia */}
          <path d="M 820 320 L 890 315 L 910 340 L 890 370 L 850 380 L 815 365 L 800 345 Z" />
        </g>

        {/* Project location dots */}
        {LOCATIONS.map((loc, i) => (
          <g key={loc.code}>
            {/* Outer pulse ring */}
            <motion.circle
              cx={loc.x}
              cy={loc.y}
              r="3"
              fill="none"
              stroke="var(--color-brand-accent)"
              strokeWidth="1.5"
              initial={{ r: 3, opacity: 0.8 }}
              animate={{ r: 18, opacity: 0 }}
              transition={{
                duration: 2.4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            {/* Solid dot */}
            <circle
              cx={loc.x}
              cy={loc.y}
              r="3.5"
              fill="var(--color-brand-primary)"
              stroke="white"
              strokeWidth="1"
            />
            {/* City label */}
            <text
              x={loc.x + 8}
              y={loc.y + 3}
              fill="rgba(255,255,255,0.85)"
              fontSize="10"
              fontFamily="var(--font-mono)"
              letterSpacing="0.06em"
              style={{ textTransform: "uppercase" }}
            >
              {loc.city}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
