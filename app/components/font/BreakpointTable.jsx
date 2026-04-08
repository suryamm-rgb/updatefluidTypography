"use client";

import { generateBreakpointTable } from "./CalculateClamp";
import { useMemo } from "react";

const DEVICE_LABELS = {
  320: "iPhone SE",
  375: "iPhone 14",
  480: "Small mobile",
  640: "Large mobile",
  768: "iPad",
  1024: "iPad Pro",
  1280: "Desktop",
  1440: "Large desktop",
  1920: "Wide screen",
};

export default function BreakpointTable({
  minFont,
  maxFont,
  minScreen,
  maxScreen,
}) {
  const rows = useMemo(
    () => generateBreakpointTable(minFont, maxFont, minScreen, maxScreen),
    [minFont, maxFont, minScreen, maxScreen],
  );

  const lo = Math.min(minFont, maxFont);
  const hi = Math.max(minFont, maxFont);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
          Breakpoint Table
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full" />
            clamped
          </div>

          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-violet-500 rounded-full" />
            fluid
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        {/* header */}
        <div className="grid grid-cols-4 px-4 py-3 bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
          <span>Screen</span>
          <span>Device</span>
          <span>Font Size</span>
          <span>Zone</span>
        </div>

        {rows.map(({ screen, size, zone }, i) => {
          const device = DEVICE_LABELS[screen] ?? "";

          const barPct =
            hi !== lo
              ? Math.max(0, Math.min(100, ((size - lo) / (hi - lo)) * 100))
              : 0;

          return (
            <div
              key={screen}
              className={`grid grid-cols-4 px-4 py-3 items-center border-t text-sm ${
                i % 2 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <span className="font-medium text-gray-900">{screen}px</span>

              <span className="text-gray-500">{device}</span>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-violet-600">{size}px</span>

                <div className="flex-1 max-w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>

              <span className="text-xs text-gray-500 uppercase">{zone}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// "use client";

// import { generateBreakpointTable } from "./CalculateClamp";
// import { useMemo } from "react";

// const ZONE_STYLES = {
//   min: {
//     dot: "bg-[#333]",
//     dotLight: "bg-gray-300",
//     text: "text-[#555]",
//     textLight: "text-gray-400",
//     label: "min",
//   },
//   fluid: {
//     dot: "bg-violet-500",
//     dotLight: "bg-violet-500",
//     text: "text-violet-400",
//     textLight: "text-violet-500",
//     label: "fluid",
//   },
//   max: {
//     dot: "bg-[#333]",
//     dotLight: "bg-gray-300",
//     text: "text-[#555]",
//     textLight: "text-gray-400",
//     label: "max",
//   },
// };

// const DEVICE_LABELS = {
//   320: "iPhone SE",
//   375: "iPhone 14",
//   480: "Small mobile",
//   640: "Large mobile",
//   768: "iPad",
//   1024: "iPad Pro",
//   1280: "Desktop",
//   1440: "Large desktop",
//   1920: "Wide screen",
// };

// export default function BreakpointTable({
//   minFont,
//   maxFont,
//   minScreen,
//   maxScreen,
//   theme,
// }) {
//   const isDark = theme === "dark";

//   const rows = useMemo(
//     () => generateBreakpointTable(minFont, maxFont, minScreen, maxScreen),
//     [minFont, maxFont, minScreen, maxScreen],
//   );

//   // ── theme helpers ────────────────────────────────────────────────────────
//   const cardBg = isDark
//     ? "bg-[#0d0d0d] border-[#1e1e1e]"
//     : "bg-white border-gray-200";
//   const label = isDark ? "text-[#555]" : "text-gray-400";
//   const legend = isDark ? "text-[#444]" : "text-gray-400";
//   const tableWrap = isDark ? "border-[#1a1a1a]" : "border-gray-200";
//   const headerBg = isDark
//     ? "bg-[#111] border-[#1a1a1a]"
//     : "bg-gray-50 border-gray-200";
//   const headerTxt = isDark ? "text-[#333]" : "text-gray-400";
//   const rowBorder = isDark ? "border-[#111]" : "border-gray-100";
//   const evenRow = isDark ? "bg-[#0a0a0a]" : "bg-white";
//   const oddRow = isDark ? "bg-[#0d0d0d]" : "bg-gray-50/60";
//   const screenTxt = isDark ? "text-[#e0e0e0]" : "text-gray-800";
//   const deviceTxt = isDark ? "text-[#333]" : "text-gray-400";
//   const barTrack = isDark ? "bg-[#1a1a1a]" : "bg-gray-200";
//   const barFluid = isDark ? "bg-violet-500/60" : "bg-violet-400/50";
//   const barClamped = isDark ? "bg-[#2a2a2a]" : "bg-gray-300";

//   // Bug fix: for reverse scaling minFont > maxFont, so lo/hi are correct but
//   // the bar should fill based on how "large" the size is relative to the range.
//   // Using (size - lo) / (hi - lo) is always correct regardless of direction
//   // since we're comparing the actual rendered size value against the range bounds.
//   const lo = Math.min(minFont, maxFont);
//   const hi = Math.max(minFont, maxFont);

//   return (
//     <div className={`border rounded-2xl p-7 mb-6 transition-colors ${cardBg}`}>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
//         <p
//           className={`text-[11px] uppercase tracking-widest font-mono ${label}`}
//         >
//           Breakpoint Table
//         </p>
//         <div className="flex items-center gap-4">
//           {[
//             { dot: isDark ? "bg-[#333]" : "bg-gray-300", label: "clamped" },
//             { dot: "bg-violet-500", label: "fluid" },
//           ].map(({ dot, label: lbl }) => (
//             <div key={lbl} className="flex items-center gap-1.5">
//               <span className={`w-2 h-2 rounded-full ${dot}`} />
//               <span
//                 className={`text-[10px] font-mono uppercase tracking-widest ${legend}`}
//               >
//                 {lbl}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Table */}
//       <div className={`overflow-hidden rounded-xl border ${tableWrap}`}>
//         {/* Header row */}
//         <div className={`grid grid-cols-4 px-4 py-2.5 border-b ${headerBg}`}>
//           {["Screen", "Device", "Font Size", "Zone"].map((h) => (
//             <span
//               key={h}
//               className={`text-[10px] uppercase tracking-widest font-mono ${headerTxt}`}
//             >
//               {h}
//             </span>
//           ))}
//         </div>

//         {/* Data rows */}
//         {rows.map(({ screen, size, zone }, i) => {
//           const style = ZONE_STYLES[zone];
//           const device = DEVICE_LABELS[screen] ?? "";
//           const isEven = i % 2 === 0;

//           // Bug fix: bar represents font size magnitude within the full range.
//           // This is always correct: lo/hi are sorted, size is clamped within them.
//           // For reverse scale: small screens → large font → bar fills more. ✓
//           // For normal scale: large screens → large font → bar fills more. ✓
//           const barPct =
//             hi !== lo
//               ? Math.max(0, Math.min(100, ((size - lo) / (hi - lo)) * 100))
//               : 0;

//           return (
//             <div
//               key={screen}
//               className={`grid grid-cols-4 px-4 py-3 items-center border-b ${rowBorder} last:border-0 ${isEven ? evenRow : oddRow}`}
//             >
//               {/* Screen width */}
//               <span className={`text-[13px] font-mono ${screenTxt}`}>
//                 {screen}px
//               </span>

//               {/* Device label */}
//               <span className={`text-[11px] font-mono ${deviceTxt}`}>
//                 {device}
//               </span>

//               {/* Font size + bar */}
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`text-[13px] font-mono font-semibold ${isDark ? style.text : style.textLight}`}
//                 >
//                   {size}px
//                 </span>
//                 <div
//                   className={`flex-1 max-w-15 h-1 rounded-full overflow-hidden ${barTrack}`}
//                 >
//                   <div
//                     className={`h-full rounded-full transition-all ${zone === "fluid" ? barFluid : barClamped}`}
//                     style={{ width: `${barPct}%` }}
//                   />
//                 </div>
//               </div>

//               {/* Zone badge */}
//               <div className="flex items-center gap-1.5">
//                 <span
//                   className={`w-1.5 h-1.5 rounded-full ${isDark ? style.dot : style.dotLight}`}
//                 />
//                 <span
//                   className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? style.text : style.textLight}`}
//                 >
//                   {style.label}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
