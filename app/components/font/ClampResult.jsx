"use client";
import { useState } from "react";
import { getClampValue } from "./CalculateClamp";

const UNITS = ["rem", "px", "em"];

export default function ClampResult({
  result,
  minFont,
  maxFont,
  unit,
  setUnit,
}) {
  const [copied, setCopied] = useState(false);
  const [copiedVar, setCopiedVar] = useState(false);
  const [cssVarName, setCssVarName] = useState("text-base");

  const clampValue = getClampValue(result, unit);
  const cssVarOutput = `--${cssVarName}: ${clampValue};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(clampValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyVar = () => {
    navigator.clipboard.writeText(cssVarOutput);
    setCopiedVar(true);
    setTimeout(() => setCopiedVar(false), 2000);
  };

  const breakdown = [
    { label: "min", value: `${result.minRem}rem`, sub: `${minFont}px` },
    {
      label: "preferred",
      value: `${result.interceptRem}rem + ${result.vwFixed}vw`,
      sub: "fluid",
    },
    { label: "max", value: `${result.maxRem}rem`, sub: `${maxFont}px` },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Generated Clamp
        </p>

        <div className="flex gap-1">
          {UNITS.map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-3 py-1 rounded text-xs border transition ${
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

      {/* clamp value */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="flex-1 border bg-gray-50 border-gray-200 rounded-lg px-4 py-3 text-sm font-mono text-violet-600">
          {clampValue}
        </div>

        <button
          onClick={handleCopy}
          className={`px-5 py-3 rounded-lg text-xs border transition ${
            copied
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-violet-600 text-white border-violet-600 hover:bg-violet-700"
          }`}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* css variable */}
      <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50">
        <p className="text-xs uppercase tracking-widest mb-3 text-gray-500">
          CSS Variable
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-mono text-gray-600">--</span>

          <input
            type="text"
            value={cssVarName}
            onChange={(e) => setCssVarName(e.target.value.replace(/^--/, ""))}
            className="border border-gray-200 rounded px-2 py-1 text-sm font-mono outline-none focus:ring-2 focus:ring-violet-500"
          />

          <span className="font-mono text-sm text-gray-600">
            : {clampValue};
          </span>

          <button
            onClick={handleCopyVar}
            className={`text-xs px-3 py-1 rounded border ${
              copiedVar
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {copiedVar ? "✓" : "copy"}
          </button>
        </div>
      </div>

      {/* breakdown */}
      <div className="grid sm:grid-cols-3 gap-3">
        {breakdown.map((item) => (
          <div
            key={item.label}
            className="border border-gray-200 rounded-lg p-3 bg-gray-50"
          >
            <p className="text-xs uppercase text-gray-500 mb-1">{item.label}</p>

            <p className="font-mono text-sm text-gray-900">{item.value}</p>

            <p className="text-xs text-gray-500">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
// "use client";
// import { useState } from "react";
// import { getClampValue } from "./CalculateClamp";

// const UNITS = ["rem", "px", "em"];

// export default function ClampResult({
//   result,
//   minFont,
//   maxFont,
//   unit,
//   setUnit,
//   theme,
// }) {
//   const [copied, setCopied] = useState(false);
//   const [copiedVar, setCopiedVar] = useState(false);
//   const [cssVarName, setCssVarName] = useState("text-base");

//   const isDark = theme === "dark";

//   const clampValue = getClampValue(result, unit);
//   const cssVarOutput = `--${cssVarName}: ${clampValue};`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(clampValue);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleCopyVar = () => {
//     navigator.clipboard.writeText(cssVarOutput);
//     setCopiedVar(true);
//     setTimeout(() => setCopiedVar(false), 2000);
//   };

//   const cardBg = isDark
//     ? "bg-[#0d0d0d] border-[#1e1e1e]"
//     : "bg-white border-gray-200";
//   const headerLabel = isDark ? "text-[#555]" : "text-gray-400";
//   const clampBox = isDark
//     ? "bg-[#111] border-[#222] text-violet-400"
//     : "bg-gray-50 border-gray-200 text-violet-600";
//   const copyBtn = isDark
//     ? "bg-[#1a1a2e] border-[#3d3d6b] text-violet-400 hover:bg-[#22224a]"
//     : "bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100";
//   const innerBg = isDark
//     ? "bg-[#0a0a0a] border-[#1a1a1a]"
//     : "bg-gray-50 border-gray-100";
//   const innerLabel = isDark ? "text-[#555]" : "text-gray-500";
//   const inputCls = isDark
//     ? "bg-[#111] border-[#2a2a2a] text-violet-300 focus:border-violet-400"
//     : "bg-white border-gray-200 text-violet-600 focus:border-violet-400";
//   const colonTxt = isDark ? "text-[#555]" : "text-gray-500";
//   const valueTxt = isDark ? "text-[#555]" : "text-gray-500";
//   const copyVarIdle = isDark
//     ? "text-[#555] border-[#222] hover:text-violet-400 hover:border-violet-400/30 bg-transparent"
//     : "text-gray-300 border-gray-200 hover:text-violet-500 hover:border-violet-300 bg-transparent";
//   const breakdownBg = isDark
//     ? "bg-[#111] border-[#1e1e1e]"
//     : "bg-gray-50 border-gray-100";
//   const breakdownLabel = isDark ? "text-[#555]" : "text-gray-500";
//   const breakdownValue = isDark ? "text-[#e0e0e0]" : "text-gray-800";
//   const breakdownSub = isDark ? "text-[#555]" : "text-gray-500";
//   const unitBtnActive = "bg-violet-500/20 border-violet-400/50 text-violet-400";
//   const unitBtnIdle = isDark
//     ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-[#888]"
//     : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600";

//   const breakdown = [
//     { label: "min", value: `${result.minRem}rem`, sub: `${minFont}px` },
//     {
//       label: "preferred",
//       value: `${result.interceptRem}rem + ${result.vwFixed}vw`,
//       sub: "fluid",
//     },
//     { label: "max", value: `${result.maxRem}rem`, sub: `${maxFont}px` },
//   ];

//   return (
//     <div className={`border rounded-2xl p-7 mb-6 ${cardBg}`}>
//       <div className="flex items-center justify-between mb-3.5 flex-wrap gap-3">
//         <p
//           className={`text-[11px] uppercase tracking-widest font-mono ${headerLabel}`}
//         >
//           Generated Clamp
//         </p>
//         {/* Unit switcher */}
//         <div className="flex gap-1">
//           {UNITS.map((u) => (
//             <button
//               key={u}
//               onClick={() => setUnit(u)}
//               className={`px-3 py-1 rounded text-[11px] font-mono tracking-wide cursor-pointer transition-all border ${
//                 unit === u ? unitBtnActive : unitBtnIdle
//               }`}
//             >
//               {u}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Clamp value + copy */}
//       <div className="flex items-center gap-3 flex-wrap mb-4">
//         <div
//           className={`flex-1 min-w-0 border rounded-lg px-4 py-3.5 text-[14px] font-mono break-all ${clampBox}`}
//         >
//           {clampValue}
//         </div>
//         <button
//           onClick={handleCopy}
//           className={`shrink-0 rounded-lg px-5 py-3.5 text-[12px] font-mono tracking-wide cursor-pointer transition-all duration-200 border ${
//             copied ? "bg-[#1a2e1a] border-[#2d5a2d] text-green-400" : copyBtn
//           }`}
//         >
//           {copied ? "✓ Copied" : "Copy"}
//         </button>
//       </div>

//       {/* CSS Variable output */}
//       <div className={`border rounded-xl p-4 mb-4 ${innerBg}`}>
//         <p
//           className={`text-[14px] uppercase tracking-widest mb-3 font-mono ${innerLabel}`}
//         >
//           CSS Variable
//         </p>
//         <div className="flex items-center gap-2 flex-wrap">
//           <span className={`font-mono text-[13px] ${colonTxt}`}>--</span>
//           <input
//             type="text"
//             value={cssVarName}
//             onChange={(e) => setCssVarName(e.target.value.replace(/^--/, ""))}
//             className={`border rounded px-2.5 py-1.5 text-[13px] font-mono outline-none focus:border-violet-400 transition-colors w-28 ${inputCls}`}
//           />
//           <span
//             className={`font-mono text-[12px] flex-1 min-w-0 break-all ${valueTxt}`}
//           >
//             : {clampValue};
//           </span>
//           <button
//             onClick={handleCopyVar}
//             className={`shrink-0 text-[11px] font-mono px-3 py-1.5 rounded border cursor-pointer transition-all ${
//               copiedVar
//                 ? "text-green-400 border-[#2d5a2d] bg-[#1a2e1a]"
//                 : copyVarIdle
//             }`}
//           >
//             {copiedVar ? "✓" : "copy"}
//           </button>
//         </div>
//       </div>

//       {/* Breakdown cards */}
//       <div className="flex gap-3 flex-wrap">
//         {breakdown.map((item) => (
//           <div
//             key={item.label}
//             className={`flex-1 min-w-25 border rounded-lg px-3.5 py-3 ${breakdownBg}`}
//           >
//             <p
//               className={`text-[10px] uppercase tracking-widest mb-1 font-mono ${breakdownLabel}`}
//             >
//               {item.label}
//             </p>
//             <p className={`text-[13px] font-mono ${breakdownValue}`}>
//               {item.value}
//             </p>
//             <p className={`text-[11px] mt-0.5 font-mono ${breakdownSub}`}>
//               {item.sub}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
