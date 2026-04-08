"use client";

import { CopyButton } from "./CopyButton";
import { Slider } from "./Slider";
import { PRESETS } from "./Constants";
import { computeClamp, valueAtVw } from "./Clamp";
// ─── ScaleTab ─────────────────────────────────────────────────────────────────
export function ScaleTab({
  minVw,
  maxVw,
  property,
  color,
  previewVw,
  setPreviewVw,
}) {
  const allPresets = PRESETS.map((p) => ({
    ...p,
    clamp: computeClamp(p.minPx, p.maxPx, minVw, maxVw),
    curVal: valueAtVw(p.minPx, p.maxPx, minVw, maxVw, previewVw),
  }));

  const rootTokens = `:root {\n${allPresets.map((p) => `  --space-${p.name}: ${p.clamp};`).join("\n")}\n}`;

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Viewport scrubber */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest shrink-0 hidden sm:block">
            Preview at
          </span>
          <div className="flex-1">
            <Slider
              value={previewVw}
              min={200}
              max={1600}
              color={color}
              onChange={setPreviewVw}
            />
          </div>
          <span
            className="text-[12px] font-bold shrink-0 w-16 text-right"
            style={{ color }}
          >
            {previewVw}px
          </span>
        </div>

        {/* Token rows */}
        <div className="flex flex-col gap-2 mb-8">
          {allPresets.map((p) => {
            const pct = (p.curVal / p.maxPx) * 100;
            return (
              <div
                key={p.name}
                onClick={() =>
                  navigator.clipboard?.writeText(`${property}: ${p.clamp};`)
                }
                className="group bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 sm:gap-4 cursor-pointer transition-all duration-150"
              >
                <span
                  className="text-[11px] font-bold w-8 shrink-0"
                  style={{ color }}
                >
                  {p.name}
                </span>

                <div className="flex-1 h-0.75 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>

                <code className="hidden md:block text-[10px] text-gray-500 truncate group-hover:text-gray-700 transition-colors w-48 shrink-0">
                  {p.clamp}
                </code>

                <span className="text-[12px] text-gray-700 font-bold shrink-0 w-12 text-right">
                  {Math.round(p.curVal)}px
                </span>

                <span className="hidden sm:block text-[10px] text-gray-500 shrink-0 w-14 text-right">
                  {p.minPx}→{p.maxPx}
                </span>
              </div>
            );
          })}
        </div>

        {/* Root tokens */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest m-0">
              CSS Custom Properties
            </p>
            <CopyButton text={rootTokens} />
          </div>

          <pre className="text-[11px] text-gray-700 m-0 leading-relaxed overflow-x-auto">
            <span className="text-gray-500">{":root {"}</span>
            {allPresets.map((p) => (
              <div key={p.name}>
                {"  "}
                <span style={{ color }}>{`--space-${p.name}`}</span>
                <span className="text-gray-500">{": "}</span>
                <span className="text-gray-700">{p.clamp}</span>
                <span className="text-gray-500">{";"}</span>
              </div>
            ))}
            <span className="text-gray-500">{"}"}</span>
          </pre>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { CopyButton } from "./CopyButton";
// import { Slider } from "./Slider";
// import { PRESETS } from "./Constants";
// import { computeClamp, valueAtVw } from "./Clamp";
// // ─── ScaleTab ─────────────────────────────────────────────────────────────────
// export function ScaleTab({
//   minVw,
//   maxVw,
//   property,
//   color,
//   previewVw,
//   setPreviewVw,
// }) {
//   const allPresets = PRESETS.map((p) => ({
//     ...p,
//     clamp: computeClamp(p.minPx, p.maxPx, minVw, maxVw),
//     curVal: valueAtVw(p.minPx, p.maxPx, minVw, maxVw, previewVw),
//   }));

//   const rootTokens = `:root {\n${allPresets.map((p) => `  --space-${p.name}: ${p.clamp};`).join("\n")}\n}`;

//   return (
//     <div className="px-4 sm:px-8 py-6 sm:py-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Viewport scrubber */}
//         <div className="flex items-center gap-4 mb-8">
//           <span className="text-[10px] text-[#444] uppercase tracking-widest shrink-0 hidden sm:block">
//             Preview at
//           </span>
//           <div className="flex-1">
//             <Slider
//               value={previewVw}
//               min={200}
//               max={1600}
//               color={color}
//               onChange={setPreviewVw}
//             />
//           </div>
//           <span
//             className="text-[12px] font-bold shrink-0 w-16 text-right"
//             style={{ color }}
//           >
//             {previewVw}px
//           </span>
//         </div>

//         {/* Token rows */}
//         <div className="flex flex-col gap-2 mb-8">
//           {allPresets.map((p) => {
//             const pct = (p.curVal / p.maxPx) * 100;
//             return (
//               <div
//                 key={p.name}
//                 onClick={() =>
//                   navigator.clipboard?.writeText(`${property}: ${p.clamp};`)
//                 }
//                 className="group bg-[#0d0d0d] border border-[#1e1e1e] hover:border-[#2a2a2a] rounded-xl px-4 py-3 flex items-center gap-3 sm:gap-4 cursor-pointer transition-all duration-150"
//               >
//                 <span
//                   className="text-[11px] font-bold w-8 shrink-0"
//                   style={{ color }}
//                 >
//                   {p.name}
//                 </span>

//                 <div className="flex-1 h-0.75 bg-[#1a1a1a] rounded-full overflow-hidden">
//                   <div
//                     className="h-full rounded-full transition-all duration-300"
//                     style={{ width: `${pct}%`, backgroundColor: color }}
//                   />
//                 </div>

//                 <code className="hidden md:block text-[10px] text-[#333] truncate group-hover:text-[#555] transition-colors w-48 shrink-0">
//                   {p.clamp}
//                 </code>
//                 <span className="text-[12px] text-[#888] font-bold shrink-0 w-12 text-right">
//                   {Math.round(p.curVal)}px
//                 </span>
//                 <span className="hidden sm:block text-[10px] text-[#333] shrink-0 w-14 text-right">
//                   {p.minPx}→{p.maxPx}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* Root tokens */}
//         <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4 sm:p-5">
//           <div className="flex items-center justify-between mb-4">
//             <p className="text-[10px] text-[#444] uppercase tracking-widest m-0">
//               CSS Custom Properties
//             </p>
//             <CopyButton text={rootTokens} />
//           </div>
//           <pre className="text-[11px] text-[#555] m-0 leading-relaxed overflow-x-auto">
//             <span className="text-[#333]">{":root {"}</span>
//             {allPresets.map((p) => (
//               <div key={p.name}>
//                 {"  "}
//                 <span style={{ color }}>{`--space-${p.name}`}</span>
//                 <span className="text-[#333]">{": "}</span>
//                 <span className="text-[#888]">{p.clamp}</span>
//                 <span className="text-[#333]">{";"}</span>
//               </div>
//             ))}
//             <span className="text-[#333]">{"}"}</span>
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }
