"use client";

import { useState } from "react";

type RegionKey = "eu" | "uk" | "us";

const REGIONS: Record<
  RegionKey,
  { label: string; sizes: [string, string][] }
> = {
  eu: {
    label: "Europa (ES/IT/FR)",
    sizes: [
      ["34", "XS"],
      ["36", "XS"],
      ["38", "S"],
      ["40", "M"],
      ["42", "L"],
    ],
  },
  uk: {
    label: "Reino Unido",
    sizes: [
      ["6", "XS"],
      ["8", "S"],
      ["10", "M"],
      ["12", "L"],
    ],
  },
  us: {
    label: "Estados Unidos",
    sizes: [
      ["2", "XS"],
      ["4", "S"],
      ["6", "M"],
      ["8", "L"],
    ],
  },
};

export default function SizeConverter() {
  const [region, setRegion] = useState<RegionKey>("eu");
  const [size, setSize] = useState("40");

  const options = REGIONS[region].sizes;
  const vibeSize =
    options.find(([value]) => value === size)?.[1] ?? options[0]?.[1] ?? "—";

  return (
    <div className="flex flex-wrap gap-6">
      <div className="min-w-[200px] flex-1 border border-grey-light bg-white p-6">
        <label className="mb-2 block text-[0.75rem] uppercase tracking-[0.1em] text-grey">
          Tu región
        </label>
        <select
          value={region}
          onChange={(e) => {
            const next = e.target.value as RegionKey;
            setRegion(next);
            setSize(REGIONS[next].sizes[Math.floor(REGIONS[next].sizes.length / 2)][0]);
          }}
          className="w-full border border-grey-light bg-white p-3 text-sm outline-none"
        >
          {Object.entries(REGIONS).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-[200px] flex-1 border border-grey-light bg-white p-6">
        <label className="mb-2 block text-[0.75rem] uppercase tracking-[0.1em] text-grey">
          Tu talla
        </label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border border-grey-light bg-white p-3 text-sm outline-none"
        >
          {options.map(([value]) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-[200px] flex-1 border border-grey-light bg-white p-6">
        <label className="mb-2 block text-[0.75rem] uppercase tracking-[0.1em] text-grey">
          Talla Vibe & Fit
        </label>
        <select
          value={vibeSize}
          disabled
          className="w-full cursor-pointer border border-grey-light bg-white p-3 text-sm outline-none disabled:opacity-100"
        >
          <option>{vibeSize}</option>
        </select>
      </div>
    </div>
  );
}