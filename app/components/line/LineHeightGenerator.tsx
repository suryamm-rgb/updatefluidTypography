"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

function buildClamp(min: number, max: number, minVw: number, maxVw: number) {
  if (maxVw <= minVw) return `${min}`;
  const slope = (max - min) / (maxVw - minVw);
  const yAxis = min - slope * minVw;
  const vw = (slope * 100).toFixed(4);
  const base = yAxis.toFixed(4);
  return `clamp(${min}, ${base} + ${vw}vw, ${max})`;
}

function lerp(
  min: number,
  max: number,
  minVw: number,
  maxVw: number,
  vw: number,
) {
  if (maxVw <= minVw) return min;
  const t = Math.max(0, Math.min(1, (vw - minVw) / (maxVw - minVw)));
  return min + t * (max - min);
}

export default function LineHeightGenerator() {
  const [lhMin, setLhMin] = useState(1.2);
  const [lhMax, setLhMax] = useState(1.6);
  const [vwMin, setVwMin] = useState(320);
  const [vwMax, setVwMax] = useState(1440);
  const [simVw, setSimVw] = useState(880);
  const [copied, setCopied] = useState(false);

  const clamp = useMemo(
    () => buildClamp(lhMin, lhMax, vwMin, vwMax),
    [lhMin, lhMax, vwMin, vwMax],
  );

  const liveLh = lerp(lhMin, lhMax, vwMin, vwMax, simVw);
  const slope = vwMax > vwMin ? (lhMax - lhMin) / (vwMax - vwMin) : 0;
  const simPct = vwMax > vwMin ? ((simVw - vwMin) / (vwMax - vwMin)) * 100 : 0;
  const cssValue = `line-height: ${clamp};`;

  function handleCopy() {
    navigator.clipboard.writeText(cssValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex items-start sm:items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="w-full max-w-5xl">
        {/* Back link */}
        <div className="px-4 sm:px-6 pt-3 pb-1 mb-10">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-900  bg-gray-200 p-2 rounded-2xl transition-colors text-[14px] flex items-center gap-1.5 no-underline w-fit mt-5"
          >
            ← back
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-gray-200">
              <h2 className="text-base font-medium text-gray-900">
                Fluid line-height generator
              </h2>
              <p className="text-[13px] text-gray-500 mt-0.5">
                Generate a CSS{" "}
                <code className="font-mono text-[12px]">clamp()</code> that
                scales line-height smoothly across viewport widths
              </p>
            </div>

            <div className="px-4 sm:px-6 py-5 flex flex-col gap-5">
              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NumberField
                  label="Min line-height"
                  value={lhMin}
                  onChange={setLhMin}
                  step={0.05}
                  badge="unitless"
                />
                <NumberField
                  label="Max line-height"
                  value={lhMax}
                  onChange={setLhMax}
                  step={0.05}
                  badge="unitless"
                />
                <NumberField
                  label="Min viewport"
                  value={vwMin}
                  onChange={setVwMin}
                  step={10}
                  badge="px"
                />
                <NumberField
                  label="Max viewport"
                  value={vwMax}
                  onChange={setVwMax}
                  step={10}
                  badge="px"
                />
              </div>

              {/* Viewport simulator */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                    Simulate viewport width
                  </span>
                  <span className="text-[12px] font-mono bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-gray-800">
                    {Math.round(simVw)}px
                  </span>
                </div>
                <input
                  type="range"
                  min={vwMin}
                  max={vwMax}
                  step={1}
                  value={simVw}
                  onChange={(e) => setSimVw(Number(e.target.value))}
                  className="w-full accent-blue-400"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">{vwMin}px</span>
                  <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full transition-all duration-200"
                      style={{
                        width: `${Math.max(0, Math.min(100, simPct))}%`,
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-gray-400">{vwMax}px</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <Stat label="live line-height" value={liveLh.toFixed(3)} />
                <Stat label="slope" value={slope.toFixed(5)} />
                <Stat label="range" value={`${lhMin} → ${lhMax}`} />
              </div>

              {/* Preview */}
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-2">
                  Live preview
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p
                    className="text-[14px] text-gray-800 transition-all duration-300"
                    style={{ lineHeight: liveLh }}
                  >
                    Fluid line-height improves readability across all screen
                    sizes. The spacing between these lines changes as the
                    viewport grows — no breakpoints, no jumps, just smooth
                    scaling.
                  </p>
                  <p
                    className="text-[14px] text-gray-500 mt-2 transition-all duration-300"
                    style={{ lineHeight: liveLh }}
                  >
                    Resize the simulator above to see the transition in real
                    time.
                  </p>
                </div>
              </div>

              {/* Output */}
              <div className="bg-[#0f0f0f] rounded-lg px-5 py-4">
                <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-500 mb-2">
                  CSS output
                </p>
                <code className="text-[13px] break-all leading-relaxed">
                  <span className="text-blue-400">line-height</span>
                  <span className="text-neutral-400">: </span>
                  <span className="text-green-400">{clamp}</span>
                  <span className="text-neutral-400">;</span>
                </code>
              </div>

              {/* Copy */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopy}
                  className={`text-[13px] px-4 py-1.5 border rounded-md transition-colors ${
                    copied
                      ? "border-green-400 text-green-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
                {copied && (
                  <span className="text-[12px] text-gray-400 font-mono truncate">
                    {cssValue}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step,
  badge,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step: number;
  badge: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-md px-2.5 py-2 text-[13px] font-mono bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <span className="text-[11px] text-gray-400 whitespace-nowrap">
          {badge}
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-center">
      <p className="text-[17px] font-medium font-mono text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
