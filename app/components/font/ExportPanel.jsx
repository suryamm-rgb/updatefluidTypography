"use client";
import { useState } from "react";
import { getClampValue } from "./CalculateClamp";

const FORMATS = ["CSS", "JSON", "Tailwind"];

function buildCSS(
  result,
  scale,
  unit,
  cssVarName,
  minFont,
  maxFont,
  minScreen,
  maxScreen,
) {
  const single = getClampValue(result, unit);
  const scaleVars = scale
    .map(
      ({ token, result: r, minPx, maxPx }) =>
        `  ${token}: ${getClampValue(r, unit)}; /* ${parseFloat(minPx)}px → ${parseFloat(maxPx)}px */`,
    )
    .join("\n");

  return `/* Fluid Typography Export
 * Screen: ${minScreen}px → ${maxScreen}px
 * Base:   ${minFont}px → ${maxFont}px
 * Unit:   ${unit}
 */

/* Single value — ${minFont}px → ${maxFont}px */
--${cssVarName}: ${single};

/* Type scale */
:root {
${scaleVars}
}`;
}

function buildJSON(
  result,
  scale,
  unit,
  minFont,
  maxFont,
  minScreen,
  maxScreen,
) {
  const single = getClampValue(result, unit);
  const scaleObj = Object.fromEntries(
    scale.map(({ label, result: r, minPx, maxPx }) => [
      label,
      {
        value: getClampValue(r, unit),
        range: `${parseFloat(minPx)}px → ${parseFloat(maxPx)}px`,
      },
    ]),
  );
  return JSON.stringify(
    {
      meta: {
        screen: `${minScreen}px → ${maxScreen}px`,
        base: `${minFont}px → ${maxFont}px`,
        unit,
      },
      single: { value: single, range: `${minFont}px → ${maxFont}px` },
      scale: scaleObj,
    },
    null,
    2,
  );
}

function buildTailwind(scale, unit, minScreen, maxScreen) {
  const entries = scale
    .map(
      ({ label, result: r, minPx, maxPx }) =>
        `      /* ${parseFloat(minPx)}px → ${parseFloat(maxPx)}px */\n      'fluid-${label}': '${getClampValue(r, unit)}',`,
    )
    .join("\n");

  return `// tailwind.config.js
// Screen range: ${minScreen}px → ${maxScreen}px
module.exports = {
  theme: {
    extend: {
      fontSize: {
${entries}
      },
    },
  },
};`;
}

export default function ExportPanel({
  result,
  scale,
  unit,
  theme,
  minFont,
  maxFont,
  minScreen,
  maxScreen,
}) {
  const [format, setFormat] = useState("CSS");
  const [cssVarName, setCssVarName] = useState("text-base");
  const [copied, setCopied] = useState(false);

  const content =
    format === "CSS"
      ? buildCSS(
          result,
          scale,
          unit,
          cssVarName,
          minFont,
          maxFont,
          minScreen,
          maxScreen,
        )
      : format === "JSON"
        ? buildJSON(result, scale, unit, minFont, maxFont, minScreen, maxScreen)
        : buildTailwind(scale, unit, minScreen, maxScreen);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === "CSS" ? "css" : format === "JSON" ? "json" : "js";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fluid-typography.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 mb-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-widest font-mono text-gray-600">
            Export
          </p>
          <p className="text-[10px] font-mono mt-0.5 text-gray-400">
            {minFont}px → {maxFont}px · {minScreen}px → {maxScreen}px
          </p>
        </div>

        {/* Format tabs */}
        <div className="flex gap-1">
          {FORMATS.map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-3 py-1 rounded text-[11px] font-mono tracking-wide cursor-pointer transition-all border ${
                format === f
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* CSS var name input */}
      {format === "CSS" && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[12px] font-mono text-gray-500">
            Variable name:
          </span>
          <span className="text-[12px] font-mono text-gray-500">--</span>
          <input
            type="text"
            value={cssVarName}
            onChange={(e) => setCssVarName(e.target.value.replace(/^--/, ""))}
            className="rounded px-2.5 py-1 text-[12px] font-mono outline-none border w-28 bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-violet-500"
          />
        </div>
      )}

      {/* Code preview */}
      <div className="rounded-xl border p-4 mb-4 overflow-auto max-h-72 bg-gray-50 border-gray-200">
        <pre className="text-[12px] font-mono leading-relaxed whitespace-pre-wrap break-all text-gray-700">
          {content}
        </pre>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 py-2.5 rounded-lg text-[12px] font-mono border transition-all ${
            copied
              ? "bg-green-50 border-green-200 text-green-600"
              : "bg-violet-600 border-violet-600 text-white hover:bg-violet-700"
          }`}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>

        <button
          onClick={handleDownload}
          className="flex-1 py-2.5 rounded-lg text-[12px] font-mono border bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          ↓ Download .
          {format === "CSS" ? "css" : format === "JSON" ? "json" : "js"}
        </button>
      </div>
    </div>
  );
}
// "use client";
// import { useState } from "react";
// import { getClampValue } from "./CalculateClamp";

// const FORMATS = ["CSS", "JSON", "Tailwind"];

// function buildCSS(
//   result,
//   scale,
//   unit,
//   cssVarName,
//   minFont,
//   maxFont,
//   minScreen,
//   maxScreen,
// ) {
//   const single = getClampValue(result, unit);
//   const scaleVars = scale
//     .map(
//       ({ token, result: r, minPx, maxPx }) =>
//         `  ${token}: ${getClampValue(r, unit)}; /* ${parseFloat(minPx)}px → ${parseFloat(maxPx)}px */`,
//     )
//     .join("\n");

//   return `/* Fluid Typography Export
//  * Screen: ${minScreen}px → ${maxScreen}px
//  * Base:   ${minFont}px → ${maxFont}px
//  * Unit:   ${unit}
//  */

// /* Single value — ${minFont}px → ${maxFont}px */
// --${cssVarName}: ${single};

// /* Type scale */
// :root {
// ${scaleVars}
// }`;
// }

// function buildJSON(
//   result,
//   scale,
//   unit,
//   minFont,
//   maxFont,
//   minScreen,
//   maxScreen,
// ) {
//   const single = getClampValue(result, unit);
//   const scaleObj = Object.fromEntries(
//     scale.map(({ label, result: r, minPx, maxPx }) => [
//       label,
//       {
//         value: getClampValue(r, unit),
//         range: `${parseFloat(minPx)}px → ${parseFloat(maxPx)}px`,
//       },
//     ]),
//   );
//   return JSON.stringify(
//     {
//       meta: {
//         screen: `${minScreen}px → ${maxScreen}px`,
//         base: `${minFont}px → ${maxFont}px`,
//         unit,
//       },
//       single: { value: single, range: `${minFont}px → ${maxFont}px` },
//       scale: scaleObj,
//     },
//     null,
//     2,
//   );
// }

// function buildTailwind(scale, unit, minScreen, maxScreen) {
//   const entries = scale
//     .map(
//       ({ label, result: r, minPx, maxPx }) =>
//         `      /* ${parseFloat(minPx)}px → ${parseFloat(maxPx)}px */\n      'fluid-${label}': '${getClampValue(r, unit)}',`,
//     )
//     .join("\n");

//   return `// tailwind.config.js
// // Screen range: ${minScreen}px → ${maxScreen}px
// module.exports = {
//   theme: {
//     extend: {
//       fontSize: {
// ${entries}
//       },
//     },
//   },
// };`;
// }

// export default function ExportPanel({
//   result,
//   scale,
//   unit,
//   theme,
//   minFont,
//   maxFont,
//   minScreen,
//   maxScreen,
// }) {
//   const [format, setFormat] = useState("CSS");
//   const [cssVarName, setCssVarName] = useState("text-base");
//   const [copied, setCopied] = useState(false);

//   const isDark = theme === "dark";

//   const content =
//     format === "CSS"
//       ? buildCSS(
//           result,
//           scale,
//           unit,
//           cssVarName,
//           minFont,
//           maxFont,
//           minScreen,
//           maxScreen,
//         )
//       : format === "JSON"
//         ? buildJSON(result, scale, unit, minFont, maxFont, minScreen, maxScreen)
//         : buildTailwind(scale, unit, minScreen, maxScreen);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(content);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleDownload = () => {
//     const ext = format === "CSS" ? "css" : format === "JSON" ? "json" : "js";
//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `fluid-typography.${ext}`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div
//       className={`border rounded-2xl p-7 mb-6 ${isDark ? "bg-[#0d0d0d] border-[#1e1e1e]" : "bg-white border-gray-200"}`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
//         <div>
//           <p
//             className={`text-[11px] uppercase tracking-widest font-mono ${isDark ? "text-[#555]" : "text-gray-400"}`}
//           >
//             Export
//           </p>
//           <p
//             className={`text-[10px] font-mono mt-0.5 ${isDark ? "text-[#333]" : "text-gray-300"}`}
//           >
//             {minFont}px → {maxFont}px · {minScreen}px → {maxScreen}px
//           </p>
//         </div>

//         {/* Format tabs */}
//         <div className="flex gap-1">
//           {FORMATS.map((f) => (
//             <button
//               key={f}
//               onClick={() => setFormat(f)}
//               className={`px-3 py-1 rounded text-[11px] font-mono tracking-wide cursor-pointer transition-all border ${
//                 format === f
//                   ? "bg-violet-500/20 border-violet-400/50 text-violet-400"
//                   : isDark
//                     ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-[#888]"
//                     : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* CSS var name input */}
//       {format === "CSS" && (
//         <div className="flex items-center gap-2 mb-4">
//           <span
//             className={`text-[12px] font-mono ${isDark ? "text-[#444]" : "text-gray-400"}`}
//           >
//             Variable name:
//           </span>
//           <span
//             className={`text-[12px] font-mono ${isDark ? "text-[#444]" : "text-gray-400"}`}
//           >
//             --
//           </span>
//           <input
//             type="text"
//             value={cssVarName}
//             onChange={(e) => setCssVarName(e.target.value.replace(/^--/, ""))}
//             className={`rounded px-2.5 py-1 text-[12px] font-mono outline-none border transition-colors w-28 ${
//               isDark
//                 ? "bg-[#111] border-[#2a2a2a] text-violet-300 focus:border-violet-400"
//                 : "bg-gray-50 border-gray-200 text-violet-600 focus:border-violet-400"
//             }`}
//           />
//         </div>
//       )}

//       {/* Code preview */}
//       <div
//         className={`rounded-xl border p-4 mb-4 overflow-auto max-h-72 ${isDark ? "bg-[#080808] border-[#1a1a1a]" : "bg-gray-50 border-gray-200"}`}
//       >
//         <pre
//           className={`text-[12px] font-mono leading-relaxed whitespace-pre-wrap break-all ${isDark ? "text-[#888]" : "text-gray-600"}`}
//         >
//           {content}
//         </pre>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-2">
//         <button
//           onClick={handleCopy}
//           className={`flex-1 py-2.5 rounded-lg text-[12px] font-mono border cursor-pointer transition-all ${
//             copied
//               ? "bg-[#1a2e1a] border-[#2d5a2d] text-green-400"
//               : isDark
//                 ? "bg-[#1a1a2e] border-[#3d3d6b] text-violet-400 hover:bg-[#22224a]"
//                 : "bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100"
//           }`}
//         >
//           {copied ? "✓ Copied" : "Copy"}
//         </button>
//         <button
//           onClick={handleDownload}
//           className={`flex-1 py-2.5 rounded-lg text-[12px] font-mono border cursor-pointer transition-all ${
//             isDark
//               ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-violet-400 hover:border-violet-400/30"
//               : "bg-gray-50 border-gray-200 text-gray-500 hover:text-violet-600 hover:border-violet-300"
//           }`}
//         >
//           ↓ Download .
//           {format === "CSS" ? "css" : format === "JSON" ? "json" : "js"}
//         </button>
//       </div>
//     </div>
//   );
// }
