"use client";
import { useState, useMemo } from "react";
import { getClampValue, generateTypeScale } from "./CalculateClamp";

const RATIO_PRESETS = [
  { label: "16 → 17 = 1.0625", value: 1.0625 },
  { label: "16 → 18 = 1.125", value: 1.125 },
  { label: "16 → 19 = 1.1875", value: 1.1875 },
  { label: "16 → 20 = 1.25", value: 1.25 },
  { label: "16 → 21 = 1.3125", value: 1.3125 },
  { label: "16 → 22 = 1.375", value: 1.375 },
  { label: "16 → 24 = 1.5", value: 1.5 },
  { label: "16 → 26 = 1.625", value: 1.625 },
];

export default function TypeScale({
  minFont,
  maxFont,
  minScreen,
  maxScreen,
  rootSize,
  unit,
  setUnit,
}) {
  const [ratio, setRatio] = useState(1.25);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const scale = useMemo(
    () =>
      generateTypeScale(
        minFont,
        maxFont,
        minScreen,
        maxScreen,
        rootSize,
        ratio,
      ),
    [minFont, maxFont, minScreen, maxScreen, rootSize, ratio],
  );

  const handleCopy = (value, index) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const UNITS = ["rem", "px", "em"];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 md:p-7 mb-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <p className="text-[11px] uppercase tracking-widest font-mono text-gray-600">
            Type Scale
          </p>
          <p className="text-[11px] font-mono mt-0.5 text-gray-500">
            Ratio ×{ratio}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {UNITS.map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-3 py-1 rounded text-[11px] font-mono border transition ${
                unit === u
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Ratio buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {RATIO_PRESETS.map((r) => (
          <button
            key={r.value}
            onClick={() => setRatio(r.value)}
            className={`px-3 py-1 rounded text-xs border ${
              ratio === r.value
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* scale rows */}
      <div className="flex flex-col gap-2">
        {scale.map(({ label, token, minPx, maxPx, result }, i) => {
          const value = getClampValue(result, unit);
          const copied = copiedIndex === i;

          return (
            <div
              key={label}
              className="grid grid-cols-2 sm:grid-cols-[60px_1fr] md:grid-cols-[60px_140px_80px_1fr_auto]
              gap-2 md:gap-3 px-3 sm:px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
            >
              <span className="text-[11px] font-mono text-gray-600">
                {label}
              </span>

              <span className="text-[11px] font-mono text-gray-500">
                {parseFloat(minPx).toFixed(1)} → {parseFloat(maxPx).toFixed(1)}
                px
              </span>

              <span className="text-[11px] font-mono text-gray-500">fluid</span>

              <span className="col-span-2 sm:col-span-1 text-[12px] font-mono break-words text-gray-900">
                {token}: <span className="text-violet-600">{value}</span>
              </span>

              <button
                onClick={() => handleCopy(value, i)}
                className={`justify-self-start md:justify-self-end text-[10px] font-mono px-2 py-1 border rounded ${
                  copied
                    ? "bg-green-50 text-green-600 border-green-200"
                    : "text-gray-500 border-gray-200 hover:text-violet-600"
                }`}
              >
                {copied ? "✓" : "copy"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// "use client";
// import { useState, useMemo } from "react";
// import { getClampValue, generateTypeScale } from "./CalculateClamp";

// const RATIO_PRESETS = [
//   { label: "Minor Second", value: 1.067, display: "×1.067" },
//   { label: "Major Second", value: 1.125, display: "×1.125" },
//   { label: "Minor Third", value: 1.2, display: "×1.200" },
//   { label: "Major Third", value: 1.25, display: "×1.250" },
//   { label: "Perfect Fourth", value: 1.333, display: "×1.333" },
//   { label: "Augmented Fourth", value: 1.414, display: "×1.414" },
//   { label: "Perfect Fifth", value: 1.5, display: "×1.500" },
//   { label: "Golden Ratio", value: 1.618, display: "×1.618" },
// ];

// const LINE_HEIGHT_PRESETS = [
//   { label: "Tight", value: 1.1 },
//   { label: "Snug", value: 1.25 },
//   { label: "Normal", value: 1.5 },
//   { label: "Relaxed", value: 1.625 },
//   { label: "Loose", value: 2.0 },
// ];

// const PREVIEW_TEXTS = [
//   "Aa",
//   "The quick brown fox",
//   "Fluid typography scales smoothly",
//   "Pack my box with five dozen liquor jugs",
// ];

// // Token → real CSS usage label
// const TOKEN_USAGE = {
//   xs: "Caption / badge",
//   sm: "Helper / footnote",
//   base: "Body text",
//   lg: "Card title",
//   xl: "Section heading",
//   "2xl": "Page heading",
//   "3xl": "Hero headline",
// };

// export default function TypeScale({
//   minFont,
//   maxFont,
//   minScreen,
//   maxScreen,
//   rootSize,
//   unit,
//   setUnit,
//   theme,
// }) {
//   const isDark = theme === "dark";

//   const [ratio, setRatio] = useState(1.25);
//   const [lineHeight, setLineHeight] = useState(1.5);
//   const [copiedIndex, setCopiedIndex] = useState(null);
//   const [copiedAll, setCopiedAll] = useState(false);
//   const [previewText, setPreviewText] = useState(PREVIEW_TEXTS[1]);
//   const [previewScreen, setPreviewScreen] = useState(
//     Math.round((minScreen + maxScreen) / 2),
//   );
//   const [showPreview, setShowPreview] = useState(true);

//   const scale = useMemo(
//     () =>
//       generateTypeScale(
//         minFont,
//         maxFont,
//         minScreen,
//         maxScreen,
//         rootSize,
//         ratio,
//       ),
//     [minFont, maxFont, minScreen, maxScreen, rootSize, ratio],
//   );

//   // Always display largest → smallest at the current preview screen width.
//   // Sorting by the live interpolated size (not just minPx/maxPx) ensures the
//   // visual order stays correct for both normal AND reversed scaling.
//   const displayScale = useMemo(() => {
//     const getPx = (minF, maxF, screen) => {
//       const slope = (maxF - minF) / (maxScreen - minScreen);
//       const intercept = minF - slope * minScreen;
//       const raw = intercept + slope * screen;
//       return Math.min(
//         Math.max(minF, maxF),
//         Math.max(Math.min(minF, maxF), raw),
//       );
//     };
//     const mid = Math.round((minScreen + maxScreen) / 2);
//     return [...scale].sort(
//       (a, b) =>
//         getPx(parseFloat(b.minPx), parseFloat(b.maxPx), mid) -
//         getPx(parseFloat(a.minPx), parseFloat(a.maxPx), mid),
//     );
//   }, [scale, minScreen, maxScreen]);

//   // ── theme helpers ──────────────────────────────────────────────────────────
//   const card = isDark
//     ? "bg-[#0d0d0d] border-[#1e1e1e]"
//     : "bg-white border-gray-200";
//   const inner = isDark
//     ? "bg-[#0a0a0a] border-[#1a1a1a]"
//     : "bg-gray-50 border-gray-100";
//   const rowBase = isDark
//     ? "bg-violet-500/5 border-violet-400/20"
//     : "bg-violet-50 border-violet-200";
//   const rowNorm = isDark
//     ? "bg-[#111] border-[#1a1a1a]"
//     : "bg-gray-50 border-gray-100";
//   const rowHover = isDark ? "hover:bg-[#161616]" : "hover:bg-gray-100/80";
//   const muted = isDark ? "text-[#555]" : "text-gray-500";
//   const muted2 = isDark ? "text-[#444]" : "text-gray-500";
//   const rangeT = isDark ? "text-[#444]" : "text-gray-500";
//   const clampT = isDark ? "text-[#555]" : "text-gray-500";
//   const clampV = isDark ? "text-[#777]" : "text-gray-500";
//   const usageT = isDark ? "text-[#444]" : "text-gray-500";
//   const inputCls = isDark
//     ? "bg-[#111] border-[#2a2a2a] text-white focus:border-violet-400"
//     : "bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-400";
//   const btnIdle = isDark
//     ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-[#888]"
//     : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600";
//   const btnActive = "bg-violet-500/20 border-violet-400/50 text-violet-400";
//   const copyIdle = isDark
//     ? "text-[#444] border-[#222] hover:text-violet-400 hover:border-violet-400/30 bg-transparent"
//     : "text-gray-300 border-gray-200 hover:text-violet-500 hover:border-violet-300 bg-transparent";
//   const previewTextColor = isDark ? "text-[#e0e0e0]" : "text-gray-900";

//   const UNITS = ["rem", "px", "em"];

//   const handleCopy = (value, index) => {
//     navigator.clipboard.writeText(value);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   const handleCopyAll = () => {
//     // Use original scale order (xs → 3xl) for CSS output
//     const lines = scale
//       .map(
//         ({ token, result }) =>
//           `  ${token}: ${getClampValue(result, unit)}; /* line-height: ${lineHeight} */`,
//       )
//       .join("\n");
//     navigator.clipboard.writeText(`:root {\n${lines}\n}`);
//     setCopiedAll(true);
//     setTimeout(() => setCopiedAll(false), 2000);
//   };

//   // Detect if the scale is in reverse mode (font shrinks as screen grows).
//   // We check the base step: if its minPx > maxPx, the scale is reversed.
//   const isReversed = useMemo(() => {
//     const base = scale.find((s) => s.label === "base");
//     if (!base) return false;
//     return parseFloat(base.minPx) > parseFloat(base.maxPx);
//   }, [scale]);

//   // Calculate real px size at current preview screen width.
//   // minF = font size at minScreen, maxF = font size at maxScreen.
//   // Works correctly for both normal (minF < maxF) and reversed (minF > maxF).
//   const getPxAtScreen = (minF, maxF, screen) => {
//     const slope = (maxF - minF) / (maxScreen - minScreen);
//     const intercept = minF - slope * minScreen;
//     const raw = intercept + slope * screen;
//     const lo = Math.min(minF, maxF);
//     const hi = Math.max(minF, maxF);
//     return Math.min(hi, Math.max(lo, raw));
//   };

//   const activeRatio = RATIO_PRESETS.find((r) => r.value === ratio);

//   return (
//     <div className={`border rounded-2xl p-7 mb-6 transition-colors ${card}`}>
//       {/* ── Header ── */}
//       <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
//         <div>
//           <p
//             className={`text-[11px] uppercase tracking-widest font-mono ${muted}`}
//           >
//             Type Scale
//           </p>
//           <p className={`text-[11px] font-mono mt-0.5 ${muted2}`}>
//             {activeRatio?.label ?? "Custom"} ·{" "}
//             {activeRatio?.display ?? `×${ratio}`}
//             {isReversed && (
//               <span className="ml-2 text-violet-400">↓ reverse</span>
//             )}
//           </p>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           {/* Unit switcher */}
//           <div className="flex gap-1">
//             {UNITS.map((u) => (
//               <button
//                 key={u}
//                 onClick={() => setUnit(u)}
//                 className={`px-3 py-1 rounded text-[11px] font-mono border cursor-pointer transition-all ${unit === u ? btnActive : btnIdle}`}
//               >
//                 {u}
//               </button>
//             ))}
//           </div>
//           {/* Preview toggle */}
//           <button
//             onClick={() => setShowPreview((v) => !v)}
//             className={`px-3 py-1 rounded text-[11px] font-mono border cursor-pointer transition-all ${showPreview ? btnActive : btnIdle}`}
//           >
//             {showPreview ? "▲ Hide preview" : "▼ Show preview"}
//           </button>
//           {/* Copy all */}
//           <button
//             onClick={handleCopyAll}
//             className={`text-[11px] font-mono px-4 py-2 rounded-lg border cursor-pointer transition-all ${
//               copiedAll
//                 ? "bg-[#1a2e1a] border-[#2d5a2d] text-green-400"
//                 : isDark
//                   ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-violet-400 hover:border-violet-400/30"
//                   : "bg-gray-50 border-gray-200 text-gray-400 hover:text-violet-500 hover:border-violet-300"
//             }`}
//           >
//             {copiedAll ? "✓ Copied :root {}" : "Copy :root {}"}
//           </button>
//         </div>
//       </div>

//       {/* ── Ratio picker ── */}
//       <div className={`rounded-xl border p-4 mb-4 ${inner}`}>
//         <p
//           className={`text-[10px] uppercase tracking-widest font-mono mb-3 ${muted2}`}
//         >
//           Modular Ratio
//         </p>
//         <div className="flex flex-wrap gap-1.5 mb-3">
//           {RATIO_PRESETS.map((r) => (
//             <button
//               key={r.value}
//               onClick={() => setRatio(r.value)}
//               title={r.label}
//               className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono cursor-pointer transition-all ${ratio === r.value ? btnActive : btnIdle}`}
//             >
//               {r.display}
//             </button>
//           ))}
//         </div>
//         <div className="flex items-center gap-2">
//           <span className={`text-[11px] font-mono ${muted2}`}>Custom ×</span>
//           <input
//             type="number"
//             step="0.001"
//             min="1.001"
//             max="3"
//             value={ratio}
//             onChange={(e) => setRatio(parseFloat(e.target.value) || 1.25)}
//             className={`w-24 border rounded-lg px-2.5 py-1.5 text-[12px] font-mono outline-none transition-colors ${inputCls}`}
//           />
//           <span className={`text-[11px] font-mono ${muted2}`}>
//             · each step is {ratio.toFixed(3)}× the previous
//           </span>
//         </div>
//       </div>

//       {/* ── Line height picker ── */}
//       <div className={`rounded-xl border p-4 mb-5 ${inner}`}>
//         <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
//           <p
//             className={`text-[10px] uppercase tracking-widest font-mono ${muted2}`}
//           >
//             Line Height
//           </p>
//           <span className="text-[11px] font-mono text-violet-400">
//             {lineHeight}
//           </span>
//         </div>
//         <div className="flex flex-wrap gap-1.5 mb-3">
//           {LINE_HEIGHT_PRESETS.map((lh) => (
//             <button
//               key={lh.value}
//               onClick={() => setLineHeight(lh.value)}
//               className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono cursor-pointer transition-all ${lineHeight === lh.value ? btnActive : btnIdle}`}
//             >
//               {lh.label}{" "}
//               <span
//                 className={lineHeight === lh.value ? "text-violet-300" : muted2}
//               >
//                 {lh.value}
//               </span>
//             </button>
//           ))}
//         </div>
//         <input
//           type="range"
//           min="1"
//           max="2.5"
//           step="0.025"
//           value={lineHeight}
//           onChange={(e) => setLineHeight(parseFloat(e.target.value))}
//           className="w-full accent-violet-400"
//         />
//         <div
//           className={`flex justify-between text-[10px] font-mono mt-1 ${muted2}`}
//         >
//           <span>1.0 tight</span>
//           <span>1.5 normal</span>
//           <span>2.5 loose</span>
//         </div>
//       </div>

//       {/* ── Live preview panel ── */}
//       {showPreview && (
//         <div className={`rounded-xl border p-5 mb-5 ${inner}`}>
//           {/* Preview controls */}
//           <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
//             <p
//               className={`text-[10px] uppercase tracking-widest font-mono ${muted2}`}
//             >
//               Live Preview ·{" "}
//               <span className="text-violet-400">{previewScreen}px</span> screen
//             </p>
//             {/* Preview text picker */}
//             <div className="flex flex-wrap gap-1.5">
//               {PREVIEW_TEXTS.map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setPreviewText(t)}
//                   className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono cursor-pointer transition-all ${
//                     previewText === t ? btnActive : btnIdle
//                   }`}
//                 >
//                   {t.length > 12 ? t.slice(0, 12) + "…" : t}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Screen width slider */}
//           <input
//             type="range"
//             min={minScreen}
//             max={maxScreen}
//             value={previewScreen}
//             onChange={(e) => setPreviewScreen(Number(e.target.value))}
//             className="w-full mb-5 accent-violet-400"
//           />
//           <div
//             className={`flex justify-between text-[10px] font-mono mb-5 ${muted2}`}
//           >
//             <span>{minScreen}px</span>
//             <span className="text-violet-400">{previewScreen}px</span>
//             <span>{maxScreen}px</span>
//           </div>

//           {/* All 7 sizes previewed — always largest first */}
//           <div
//             className={`border rounded-xl overflow-hidden ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}
//           >
//             {displayScale.map(({ label, minPx, maxPx }, i) => {
//               const scaledMinF = parseFloat(minPx);
//               const scaledMaxF = parseFloat(maxPx);
//               const liveSize = getPxAtScreen(
//                 scaledMinF,
//                 scaledMaxF,
//                 previewScreen,
//               );
//               const isBase = label === "base";
//               const usage = TOKEN_USAGE[label] ?? "";
//               const rowBg = isBase
//                 ? isDark
//                   ? "bg-violet-500/5"
//                   : "bg-violet-50/80"
//                 : i % 2 === 0
//                   ? isDark
//                     ? "bg-[#0d0d0d]"
//                     : "bg-white"
//                   : isDark
//                     ? "bg-[#0a0a0a]"
//                     : "bg-gray-50/60";
//               const borderB = isDark ? "border-[#111]" : "border-gray-100";

//               return (
//                 <div
//                   key={label}
//                   className={`flex items-baseline gap-4 px-5 py-3 border-b last:border-0 ${rowBg} ${borderB}`}
//                 >
//                   {/* Token name */}
//                   <span
//                     className={`w-12 shrink-0 text-[10px] uppercase tracking-widest font-mono ${isBase ? "text-violet-400" : muted}`}
//                   >
//                     {label}
//                   </span>
//                   {/* Live size badge */}
//                   <span
//                     className={`w-14 shrink-0 text-[10px] font-mono ${muted2}`}
//                   >
//                     {liveSize.toFixed(1)}px
//                   </span>
//                   {/* Preview text */}
//                   <span
//                     style={{
//                       fontSize: `${liveSize}px`,
//                       lineHeight,
//                       transition: "font-size 0.1s",
//                     }}
//                     className={`flex-1 min-w-0 truncate font-sans ${previewTextColor}`}
//                   >
//                     {previewText}
//                   </span>
//                   {/* Usage hint */}
//                   <span
//                     className={`shrink-0 text-[10px] font-mono hidden sm:block ${usageT}`}
//                   >
//                     {usage}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* ── Scale rows (tokens + clamp values) — always largest first ── */}
//       <div className="flex flex-col gap-2">
//         {displayScale.map(({ label, token, minPx, maxPx, result }, i) => {
//           const value = getClampValue(result, unit);
//           const isCopied = copiedIndex === i;
//           const isBase = label === "base";

//           return (
//             <div
//               key={label}
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${rowHover} ${isBase ? rowBase : rowNorm}`}
//             >
//               {/* Label */}
//               <span
//                 className={`w-10 shrink-0 text-[11px] uppercase tracking-widest font-mono ${isBase ? "text-violet-400" : muted}`}
//               >
//                 {label}
//               </span>

//               {/* Size range — font size at minScreen → maxScreen */}
//               <span className={`w-32 shrink-0 text-[11px] font-mono ${rangeT}`}>
//                 {parseFloat(minPx).toFixed(1)}
//                 <span className={isReversed ? "text-violet-400" : muted2}>
//                   {" "}
//                   →{" "}
//                 </span>
//                 {parseFloat(maxPx).toFixed(1)}px
//               </span>

//               {/* Line height */}
//               <span className={`w-16 shrink-0 text-[11px] font-mono ${muted2}`}>
//                 lh:{" "}
//                 <span className={isBase ? "text-violet-400" : ""}>
//                   {lineHeight}
//                 </span>
//               </span>

//               {/* Clamp value */}
//               <span
//                 className={`flex-1 min-w-0 text-[12px] font-mono truncate ${clampT}`}
//               >
//                 {token}: <span className={clampV}>{value}</span>
//               </span>

//               {/* Copy */}
//               <button
//                 onClick={() =>
//                   handleCopy(
//                     `${token}: ${value};\n  line-height: ${lineHeight};`,
//                     i,
//                   )
//                 }
//                 className={`shrink-0 text-[10px] font-mono px-2.5 py-1 rounded border cursor-pointer transition-all ${
//                   isCopied
//                     ? "text-green-400 border-[#2d5a2d] bg-[#1a2e1a]"
//                     : copyIdle
//                 }`}
//               >
//                 {isCopied ? "✓" : "copy"}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* ── CSS output hint ── */}
//       <div className={`mt-4 rounded-xl border px-4 py-3 ${inner}`}>
//         <p
//           className={`text-[10px] uppercase tracking-widest font-mono mb-2 ${muted2}`}
//         >
//           CSS output (base)
//         </p>
//         <pre
//           className={`text-[11px] font-mono leading-relaxed ${isDark ? "text-[#555]" : "text-gray-400"}`}
//         >
//           {`--text-base: ${getClampValue(scale.find((s) => s.label === "base")?.result ?? scale[2].result, unit)};
// line-height: ${lineHeight};`}
//         </pre>
//       </div>
//     </div>
//   );
// }
