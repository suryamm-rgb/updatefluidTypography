"use client";

import { useState } from "react";
import Link from "next/link";

import { computeClamp, valueAtVw } from "./Clamp";
import { PROPERTY_COLORS } from "./Constants";

import { CopyButton } from "./CopyButton";
import { Slider } from "./Slider";
import { ControlsPanel } from "./ControlsPanel";
import { CurveChart } from "./CurveChart";
import { LivePreview } from "./LivePreview";
import { SavedList } from "./SavedList";
import { ScaleTab } from "./ScaleTab";
import { DocsTab } from "./DocsTab";

export default function FluidSpacingGenerator() {
  const [minPx, setMinPx] = useState(16);
  const [maxPx, setMaxPx] = useState(48);
  const [minVw, setMinVw] = useState(320);
  const [maxVw, setMaxVw] = useState(1280);
  const [property, setProperty] = useState("padding");
  const [previewVw, setPreviewVw] = useState(768);
  const [tab, setTab] = useState("generator");

  const [savedItems, setSavedItems] = useState([]);
  const [savedName, setSavedName] = useState("");
  const [showSaved, setShowSaved] = useState(false);

  const color = PROPERTY_COLORS[property];
  const clampVal = computeClamp(minPx, maxPx, minVw, maxVw);
  const curVal = valueAtVw(minPx, maxPx, minVw, maxVw, previewVw);
  const cssOutput = `${property}: ${clampVal};`;

  const handleAddToList = () => {
    const name = savedName.trim() || `${property}-${minPx}-${maxPx}`;
    setSavedItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        property,
        color,
        minPx,
        maxPx,
        minVw,
        maxVw,
        clamp: clampVal,
      },
    ]);
    setSavedName("");
    setShowSaved(true);
  };

  const handleRemove = (id) =>
    setSavedItems((prev) => prev.filter((i) => i.id !== id));

  const handleClear = () => setSavedItems([]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-(family-name:--font-dm-mono)">
      <div className="mx-auto">
        {/* Back link */}
        <div className="px-4 sm:px-6 pt-3 pb-1">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-900 bg-gray-200 p-2 transition-colors text-[14px] flex items-center gap-1.5 no-underline w-fit mt-5"
          >
            ← back
          </Link>
        </div>

        {/* Top bar */}
        <div className="border-b border-gray-200 bg-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4">
          <div className="min-w-0">
            <span className="inline-block bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-[10px] text-gray-500 uppercase tracking-widest mb-3">
              CSS Utility
            </span>

            <h1 className="font-(family-name:--font-inter) text-base sm:text-lg font-bold text-gray-900 leading-none m-0 truncate mb-4 lg:mb-0">
              Fluid Spacing Generator
            </h1>
          </div>

          <div className="flex gap-1 bg-gray-100 border border-gray-200 rounded-lg p-1 w-fit">
            {["generator", "scale", "docs"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-2.5 sm:px-3 py-1.5 rounded text-[10px] uppercase tracking-widest transition-all duration-150 cursor-pointer ${
                  tab === t
                    ? "bg-white text-gray-900 border border-gray-300"
                    : "text-gray-500 hover:text-gray-900 border border-transparent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === "generator" && (
          <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] lg:min-h-[calc(100vh-57px)]">
            <ControlsPanel
              minPx={minPx}
              setMinPx={setMinPx}
              maxPx={maxPx}
              setMaxPx={setMaxPx}
              minVw={minVw}
              setMinVw={setMinVw}
              maxVw={maxVw}
              setMaxVw={setMaxVw}
              property={property}
              setProperty={setProperty}
              color={color}
            />

            <div className="px-4 sm:px-8 py-5 sm:py-6 overflow-y-auto">
              <div className="max-w-3xl mx-auto lg:max-w-none space-y-6">
                {/* CSS output */}
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
                    Generated CSS
                  </p>

                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center justify-between gap-3">
                    <code className="text-[12px] leading-relaxed break-all flex-1 min-w-0">
                      <span style={{ color }}>{property}</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-gray-800">{clampVal}</span>
                      <span className="text-gray-400">;</span>
                    </code>
                    <CopyButton text={cssOutput} />
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="name (e.g. section-gap)"
                      value={savedName}
                      onChange={(e) => setSavedName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddToList()}
                      className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[11px] text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
                    />

                    <button
                      onClick={handleAddToList}
                      className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all duration-150 cursor-pointer shrink-0"
                      style={{ borderColor: `${color}40`, color }}
                    >
                      + add to list
                    </button>
                  </div>
                </div>

                {/* Saved list */}
                {savedItems.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowSaved((v) => !v)}
                      className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest mb-3 cursor-pointer hover:text-gray-900 transition-colors w-full"
                    >
                      <span>Saved values</span>

                      <span
                        className="bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-[9px]"
                        style={{ color }}
                      >
                        {savedItems.length}
                      </span>

                      <span className="ml-auto text-gray-400">
                        {showSaved ? "▲" : "▼"}
                      </span>
                    </button>

                    {showSaved && (
                      <SavedList
                        items={savedItems}
                        onRemove={handleRemove}
                        onClear={handleClear}
                      />
                    )}
                  </div>
                )}

                {/* Chart */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest m-0">
                      Scaling Curve
                    </p>

                    <span className="text-[10px] text-gray-500">
                      scrub ↔ <span style={{ color }}>{previewVw}px</span>
                    </span>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 pb-3">
                    <CurveChart
                      minPx={minPx}
                      maxPx={maxPx}
                      minVw={minVw}
                      maxVw={maxVw}
                      currentVw={previewVw}
                      color={color}
                      onScrub={setPreviewVw}
                    />

                    <div className="mt-3 px-1 mb-3">
                      <Slider
                        value={previewVw}
                        min={200}
                        max={1600}
                        color="#999"
                        onChange={setPreviewVw}
                      />
                    </div>
                  </div>
                </div>

                {/* Live preview */}
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
                    Live Preview —{" "}
                    <span className="text-gray-600 normal-case">
                      {property} at {previewVw}px =
                    </span>{" "}
                    <span style={{ color }}>{Math.round(curVal)}px</span>
                  </p>

                  <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 flex items-center justify-center min-h-27.5">
                    <LivePreview
                      property={property}
                      value={curVal}
                      color={color}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: "At min viewport",
                      val: `${minPx}px`,
                      sub: `${(minPx / 16).toFixed(3)}rem`,
                    },
                    {
                      label: "At max viewport",
                      val: `${maxPx}px`,
                      sub: `${(maxPx / 16).toFixed(3)}rem`,
                    },
                    {
                      label: "Current",
                      val: `${Math.round(curVal)}px`,
                      sub: `${(curVal / 16).toFixed(3)}rem`,
                    },
                    {
                      label: "Scale factor",
                      val: minPx > 0 ? `${(maxPx / minPx).toFixed(2)}×` : "∞",
                      sub: `${maxPx - minPx}px range`,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-white border border-gray-200 rounded-lg px-3.5 py-3"
                    >
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 m-0">
                        {s.label}
                      </p>

                      <p
                        className="text-[18px] font-bold m-0"
                        style={{ color }}
                      >
                        {s.val}
                      </p>

                      <p className="text-[10px] text-gray-500 mt-0.5 m-0">
                        {s.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "scale" && (
          <ScaleTab
            minVw={minVw}
            maxVw={maxVw}
            property={property}
            color={color}
            previewVw={previewVw}
            setPreviewVw={setPreviewVw}
          />
        )}

        {tab === "docs" && <DocsTab />}
      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import Link from "next/link";

// import { computeClamp, valueAtVw } from "./Clamp";
// import { PROPERTY_COLORS } from "./Constants";

// import { CopyButton } from "./CopyButton";
// import { Slider } from "./Slider";
// import { ControlsPanel } from "./ControlsPanel";
// import { CurveChart } from "./CurveChart";
// import { LivePreview } from "./LivePreview";
// import { SavedList } from "./SavedList";
// import { ScaleTab } from "./ScaleTab";
// import { DocsTab } from "./DocsTab";

// export default function FluidSpacingGenerator() {
//   const [minPx, setMinPx] = useState(16);
//   const [maxPx, setMaxPx] = useState(48);
//   const [minVw, setMinVw] = useState(320);
//   const [maxVw, setMaxVw] = useState(1280);
//   const [property, setProperty] = useState("padding");
//   const [previewVw, setPreviewVw] = useState(768);
//   const [tab, setTab] = useState("generator");

//   const [savedItems, setSavedItems] = useState([]);
//   const [savedName, setSavedName] = useState("");
//   const [showSaved, setShowSaved] = useState(false);

//   const color = PROPERTY_COLORS[property];
//   const clampVal = computeClamp(minPx, maxPx, minVw, maxVw);
//   const curVal = valueAtVw(minPx, maxPx, minVw, maxVw, previewVw);
//   const cssOutput = `${property}: ${clampVal};`;

//   const handleAddToList = () => {
//     const name = savedName.trim() || `${property}-${minPx}-${maxPx}`;
//     setSavedItems((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         name,
//         property,
//         color,
//         minPx,
//         maxPx,
//         minVw,
//         maxVw,
//         clamp: clampVal,
//       },
//     ]);
//     setSavedName("");
//     setShowSaved(true);
//   };

//   const handleRemove = (id) =>
//     setSavedItems((prev) => prev.filter((i) => i.id !== id));

//   const handleClear = () => setSavedItems([]);

//   return (
//     <div className="min-h-screen bg-white text-gray-900 font-(family-name:--font-dm-mono)">
//       <div className="mx-auto">
//         {/* Back link */}
//         <div className="px-4 sm:px-6 pt-3 pb-1">
//           <Link
//             href="/"
//             className="text-gray-500 hover:text-gray-900 transition-colors text-[14px] flex items-center gap-1.5 no-underline w-fit mt-5"
//           >
//             ← back
//           </Link>
//         </div>

//         {/* Top bar */}
//         <div className="border-b border-gray-200 bg-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4">
//           <div className="min-w-0">
//             <span className="inline-block bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-[10px] text-gray-500 uppercase tracking-widest mb-3">
//               CSS Utility
//             </span>

//             <h1 className="font-(family-name:--font-inter) text-base sm:text-lg font-bold text-gray-900 leading-none m-0 truncate mb-4 lg:mb-0">
//               Fluid Spacing Generator
//             </h1>
//           </div>

//           <div className="flex gap-1 bg-gray-100 border border-gray-200 rounded-lg p-1 w-fit">
//             {["generator", "scale", "docs"].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`px-2.5 sm:px-3 py-1.5 rounded text-[10px] uppercase tracking-widest transition-all duration-150 cursor-pointer ${
//                   tab === t
//                     ? "bg-white text-gray-900 border border-gray-300"
//                     : "text-gray-500 hover:text-gray-900 border border-transparent"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </div>

//         {tab === "generator" && (
//           <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] lg:min-h-[calc(100vh-57px)]">
//             <ControlsPanel
//               minPx={minPx}
//               setMinPx={setMinPx}
//               maxPx={maxPx}
//               setMaxPx={setMaxPx}
//               minVw={minVw}
//               setMinVw={setMinVw}
//               maxVw={maxVw}
//               setMaxVw={setMaxVw}
//               property={property}
//               setProperty={setProperty}
//               color={color}
//             />

//             <div className="px-4 sm:px-8 py-5 sm:py-6 overflow-y-auto">
//               <div className="max-w-3xl mx-auto lg:max-w-none space-y-6">
//                 {/* CSS output */}
//                 <div>
//                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
//                     Generated CSS
//                   </p>

//                   <div className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center justify-between gap-3">
//                     <code className="text-[12px] leading-relaxed break-all flex-1 min-w-0">
//                       <span style={{ color }}>{property}</span>
//                       <span className="text-gray-400">: </span>
//                       <span className="text-gray-800">{clampVal}</span>
//                       <span className="text-gray-400">;</span>
//                     </code>
//                     <CopyButton text={cssOutput} />
//                   </div>

//                   <div className="flex items-center gap-2 mt-2">
//                     <input
//                       type="text"
//                       placeholder="name (e.g. section-gap)"
//                       value={savedName}
//                       onChange={(e) => setSavedName(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && handleAddToList()}
//                       className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[11px] text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
//                     />

//                     <button
//                       onClick={handleAddToList}
//                       className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all duration-150 cursor-pointer shrink-0"
//                       style={{ borderColor: `${color}40`, color }}
//                     >
//                       + add to list
//                     </button>
//                   </div>
//                 </div>

//                 {/* Saved list */}
//                 {savedItems.length > 0 && (
//                   <div>
//                     <button
//                       onClick={() => setShowSaved((v) => !v)}
//                       className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest mb-3 cursor-pointer hover:text-gray-900 transition-colors w-full"
//                     >
//                       <span>Saved values</span>

//                       <span
//                         className="bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-[9px]"
//                         style={{ color }}
//                       >
//                         {savedItems.length}
//                       </span>

//                       <span className="ml-auto text-gray-400">
//                         {showSaved ? "▲" : "▼"}
//                       </span>
//                     </button>

//                     {showSaved && (
//                       <SavedList
//                         items={savedItems}
//                         onRemove={handleRemove}
//                         onClear={handleClear}
//                       />
//                     )}
//                   </div>
//                 )}

//                 {/* Chart */}
//                 <div>
//                   <div className="flex items-center justify-between mb-2.5">
//                     <p className="text-[10px] text-gray-500 uppercase tracking-widest m-0">
//                       Scaling Curve
//                     </p>

//                     <span className="text-[10px] text-gray-500">
//                       scrub ↔ <span style={{ color }}>{previewVw}px</span>
//                     </span>
//                   </div>

//                   <div className="bg-white border border-gray-200 rounded-xl p-4 pb-3">
//                     <CurveChart
//                       minPx={minPx}
//                       maxPx={maxPx}
//                       minVw={minVw}
//                       maxVw={maxVw}
//                       currentVw={previewVw}
//                       color={color}
//                       onScrub={setPreviewVw}
//                     />

//                     <div className="mt-3 px-1 mb-3">
//                       <Slider
//                         value={previewVw}
//                         min={200}
//                         max={1600}
//                         color="#999"
//                         onChange={setPreviewVw}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Live preview */}
//                 <div>
//                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
//                     Live Preview —{" "}
//                     <span className="text-gray-600 normal-case">
//                       {property} at {previewVw}px =
//                     </span>{" "}
//                     <span style={{ color }}>{Math.round(curVal)}px</span>
//                   </p>

//                   <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 flex items-center justify-center min-h-27.5">
//                     <LivePreview
//                       property={property}
//                       value={curVal}
//                       color={color}
//                     />
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   {[
//                     {
//                       label: "At min viewport",
//                       val: `${minPx}px`,
//                       sub: `${(minPx / 16).toFixed(3)}rem`,
//                     },
//                     {
//                       label: "At max viewport",
//                       val: `${maxPx}px`,
//                       sub: `${(maxPx / 16).toFixed(3)}rem`,
//                     },
//                     {
//                       label: "Current",
//                       val: `${Math.round(curVal)}px`,
//                       sub: `${(curVal / 16).toFixed(3)}rem`,
//                     },
//                     {
//                       label: "Scale factor",
//                       val: minPx > 0 ? `${(maxPx / minPx).toFixed(2)}×` : "∞",
//                       sub: `${maxPx - minPx}px range`,
//                     },
//                   ].map((s) => (
//                     <div
//                       key={s.label}
//                       className="bg-white border border-gray-200 rounded-lg px-3.5 py-3"
//                     >
//                       <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 m-0">
//                         {s.label}
//                       </p>

//                       <p
//                         className="text-[18px] font-bold m-0"
//                         style={{ color }}
//                       >
//                         {s.val}
//                       </p>

//                       <p className="text-[10px] text-gray-500 mt-0.5 m-0">
//                         {s.sub}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {tab === "scale" && (
//           <ScaleTab
//             minVw={minVw}
//             maxVw={maxVw}
//             property={property}
//             color={color}
//             previewVw={previewVw}
//             setPreviewVw={setPreviewVw}
//           />
//         )}

//         {tab === "docs" && <DocsTab />}
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import Link from "next/link";

// import { computeClamp, valueAtVw } from "./Clamp";
// import { PROPERTY_COLORS } from "./Constants";

// import { CopyButton } from "./CopyButton";
// import { Slider } from "./Slider";
// import { ControlsPanel } from "./ControlsPanel";
// import { CurveChart } from "./CurveChart";
// import { LivePreview } from "./LivePreview";
// import { SavedList } from "./SavedList";
// import { ScaleTab } from "./ScaleTab";
// import { DocsTab } from "./DocsTab";
// // ─── FluidSpacingGenerator ────────────────────────────────────────────────────
// export default function FluidSpacingGenerator() {
//   // ── Inputs ──
//   const [minPx, setMinPx] = useState(16);
//   const [maxPx, setMaxPx] = useState(48);
//   const [minVw, setMinVw] = useState(320);
//   const [maxVw, setMaxVw] = useState(1280);
//   const [property, setProperty] = useState("padding");
//   const [previewVw, setPreviewVw] = useState(768);
//   const [tab, setTab] = useState("generator");

//   // ── Saved list ──
//   const [savedItems, setSavedItems] = useState([]);
//   const [savedName, setSavedName] = useState("");
//   const [showSaved, setShowSaved] = useState(false);

//   const color = PROPERTY_COLORS[property];
//   const clampVal = computeClamp(minPx, maxPx, minVw, maxVw);
//   const curVal = valueAtVw(minPx, maxPx, minVw, maxVw, previewVw);
//   const cssOutput = `${property}: ${clampVal};`;

//   // ── Add current value to saved list ──
//   const handleAddToList = () => {
//     const name = savedName.trim() || `${property}-${minPx}-${maxPx}`;
//     setSavedItems((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         name,
//         property,
//         color,
//         minPx,
//         maxPx,
//         minVw,
//         maxVw,
//         clamp: clampVal,
//       },
//     ]);
//     setSavedName("");
//     setShowSaved(true);
//   };

//   const handleRemove = (id) =>
//     setSavedItems((prev) => prev.filter((i) => i.id !== id));
//   const handleClear = () => setSavedItems([]);

//   return (
//     <div className="min-h-screen bg-[#080808] text-[#e0e0e0] font-(family-name:--font-dm-mono)">
//       <div className=" mx-auto">
//         {/* ── Back link ── */}
//         <div className="px-4 sm:px-6 pt-3 pb-1">
//           <Link
//             href="/"
//             className="text-[#444] hover:text-[#888] transition-colors text-[14px] flex items-center gap-1.5 no-underline w-fit mt-5"
//           >
//             ← back
//           </Link>
//         </div>

//         {/* ── Top bar ── */}
//         <div className="border-b border-[#141414] bg-[#080808] px-4 sm:px-6 py-3 sm:py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-4">
//           <div className="min-w-0">
//             <span className="inline-block bg-[#111] border border-[#1e1e1e] rounded px-2 py-0.5 text-[10px] text-[#555] uppercase tracking-widest mb-3 ">
//               CSS Utility
//             </span>
//             <h1 className="font-(family-name:--font-inter) text-base sm:text-lg font-bold text-white leading-none m-0 truncate mb-4 lg:mb-0">
//               Fluid Spacing Generator
//             </h1>
//           </div>

//           {/* Tabs — below title on mobile/tablet, inline on desktop */}
//           <div className="flex gap-1 bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg p-1 w-fit">
//             {["generator", "scale", "docs"].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`px-2.5 sm:px-3 py-1.5 rounded text-[10px] uppercase tracking-widest transition-all duration-150 cursor-pointer ${
//                   tab === t
//                     ? "bg-[#1a1a1a] text-[#ccc] border border-[#2a2a2a]"
//                     : "text-[#444] hover:text-[#777] border border-transparent"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ══════════════════ GENERATOR TAB ══════════════════ */}
//         {tab === "generator" && (
//           <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] lg:min-h-[calc(100vh-57px)]">
//             {/* ── Controls (left) ── */}
//             <ControlsPanel
//               minPx={minPx}
//               setMinPx={setMinPx}
//               maxPx={maxPx}
//               setMaxPx={setMaxPx}
//               minVw={minVw}
//               setMinVw={setMinVw}
//               maxVw={maxVw}
//               setMaxVw={setMaxVw}
//               property={property}
//               setProperty={setProperty}
//               color={color}
//             />

//             {/* ── Output (right) ── */}
//             <div className="px-4 sm:px-8 py-5 sm:py-6 overflow-y-auto">
//               <div className="max-w-3xl mx-auto lg:max-w-none space-y-6">
//                 {/* CSS Output + Add to list */}
//                 <div>
//                   <p className="text-[10px] text-[#444] uppercase tracking-widest mb-2.5">
//                     Generated CSS
//                   </p>
//                   <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl px-4 py-3.5 flex items-center justify-between gap-3">
//                     <code className="text-[12px] leading-relaxed break-all flex-1 min-w-0">
//                       <span style={{ color }}>{property}</span>
//                       <span className="text-[#333]">: </span>
//                       <span className="text-[#aaa]">{clampVal}</span>
//                       <span className="text-[#333]">;</span>
//                     </code>
//                     <CopyButton text={cssOutput} />
//                   </div>

//                   {/* ── Add to list row ── */}
//                   <div className="flex items-center gap-2 mt-2">
//                     <input
//                       type="text"
//                       placeholder={`name (e.g. section-gap)`}
//                       value={savedName}
//                       onChange={(e) => setSavedName(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && handleAddToList()}
//                       className="flex-1 bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg px-3 py-1.5 text-[11px] text-[#888] placeholder-[#2a2a2a] outline-none focus:border-[#333] transition-colors font-(family-name:--font-dm-mono)"
//                     />
//                     <button
//                       onClick={handleAddToList}
//                       className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border border-[#1e1e1e] text-[#444] hover:border-[#333] hover:text-[#888] transition-all duration-150 cursor-pointer shrink-0"
//                       style={{ borderColor: `${color}40`, color }}
//                     >
//                       + add to list
//                     </button>
//                   </div>
//                 </div>

//                 {/* Saved list (collapsible) */}
//                 {savedItems.length > 0 && (
//                   <div>
//                     <button
//                       onClick={() => setShowSaved((v) => !v)}
//                       className="flex items-center gap-2 text-[10px] text-[#444] uppercase tracking-widest mb-3 cursor-pointer hover:text-[#666] transition-colors w-full"
//                     >
//                       <span>Saved values</span>
//                       <span
//                         className="bg-[#1a1a1a] border border-[#2a2a2a] rounded px-1.5 py-0.5 text-[9px]"
//                         style={{ color }}
//                       >
//                         {savedItems.length}
//                       </span>
//                       <span className="ml-auto text-[#2a2a2a]">
//                         {showSaved ? "▲" : "▼"}
//                       </span>
//                     </button>
//                     {showSaved && (
//                       <SavedList
//                         items={savedItems}
//                         onRemove={handleRemove}
//                         onClear={handleClear}
//                       />
//                     )}
//                   </div>
//                 )}

//                 {/* Chart */}
//                 <div>
//                   <div className="flex items-center justify-between mb-2.5">
//                     <p className="text-[10px] text-[#444] uppercase tracking-widest m-0">
//                       Scaling Curve
//                     </p>
//                     <span className="text-[10px] text-[#444]">
//                       scrub ↔ <span style={{ color }}>{previewVw}px</span>
//                     </span>
//                   </div>
//                   <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4 pb-3">
//                     <CurveChart
//                       minPx={minPx}
//                       maxPx={maxPx}
//                       minVw={minVw}
//                       maxVw={maxVw}
//                       currentVw={previewVw}
//                       color={color}
//                       onScrub={setPreviewVw}
//                     />
//                     <div className="mt-3 px-1 mb-3">
//                       <Slider
//                         value={previewVw}
//                         min={200}
//                         max={1600}
//                         color="#3a3a3a"
//                         onChange={setPreviewVw}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Live preview */}
//                 <div>
//                   <p className="text-[10px] text-[#444] uppercase tracking-widest mb-2.5">
//                     Live Preview —{" "}
//                     <span className="text-[#555] normal-case">
//                       {property} at {previewVw}px ={" "}
//                     </span>
//                     <span style={{ color }}>{Math.round(curVal)}px</span>
//                   </p>
//                   <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-6 sm:p-8 flex items-center justify-center min-h-27.5">
//                     <LivePreview
//                       property={property}
//                       value={curVal}
//                       color={color}
//                     />
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   {[
//                     {
//                       label: "At min viewport",
//                       val: `${minPx}px`,
//                       sub: `${(minPx / 16).toFixed(3)}rem`,
//                     },
//                     {
//                       label: "At max viewport",
//                       val: `${maxPx}px`,
//                       sub: `${(maxPx / 16).toFixed(3)}rem`,
//                     },
//                     {
//                       label: "Current",
//                       val: `${Math.round(curVal)}px`,
//                       sub: `${(curVal / 16).toFixed(3)}rem`,
//                     },
//                     {
//                       label: "Scale factor",
//                       val: minPx > 0 ? `${(maxPx / minPx).toFixed(2)}×` : "∞",
//                       sub: `${maxPx - minPx}px range`,
//                     },
//                   ].map((s) => (
//                     <div
//                       key={s.label}
//                       className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg px-3.5 py-3"
//                     >
//                       <p className="text-[9px] text-[#444] uppercase tracking-widest mb-1.5 m-0">
//                         {s.label}
//                       </p>
//                       <p
//                         className="text-[18px] font-bold m-0"
//                         style={{ color }}
//                       >
//                         {s.val}
//                       </p>
//                       <p className="text-[10px] text-[#333] mt-0.5 m-0">
//                         {s.sub}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══════════════════ SCALE TAB ══════════════════ */}
//         {tab === "scale" && (
//           <ScaleTab
//             minVw={minVw}
//             maxVw={maxVw}
//             property={property}
//             color={color}
//             previewVw={previewVw}
//             setPreviewVw={setPreviewVw}
//           />
//         )}
//         {/*==========DOCS==========*/}
//         {tab === "docs" && <DocsTab />}
//       </div>
//     </div>
//   );
// }
