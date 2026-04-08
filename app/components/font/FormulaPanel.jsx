"use client";
import { useState } from "react";
import { getFormulaSteps } from "./CalculateClamp";

function Step({ number, title, calc, result, unit = "", note }) {
  return (
    <div className="flex gap-4 pb-6 last:pb-0">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] text-violet-600 font-mono font-bold bg-violet-50 border-violet-200">
          {number}
        </div>
        {number < 4 && <div className="w-px flex-1 mt-2 bg-gray-200" />}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-[11px] uppercase tracking-widest font-mono mb-2 text-gray-600">
          {title}
        </p>

        <div className="border rounded-lg px-4 py-3 mb-2 bg-gray-50 border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[12px] font-mono text-gray-600">{calc}</span>

            <span className="text-[13px] text-violet-600 font-mono font-semibold">
              = {result}
              {unit}
            </span>
          </div>
        </div>

        {note && (
          <p className="text-[12px] font-mono leading-relaxed text-gray-500">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

export default function FormulaPanel({
  minFont,
  maxFont,
  minScreen,
  maxScreen,
  rootSize,
}) {
  const [open, setOpen] = useState(false);
  const s = getFormulaSteps(minFont, maxFont, minScreen, maxScreen, rootSize);

  return (
    <div className="border rounded-2xl mb-6 overflow-hidden bg-white border-gray-200 shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-7 py-5 text-left"
      >
        <div>
          <p className="text-[14px] uppercase tracking-widest font-mono mb-0.5 text-gray-600">
            Formula Explanation
          </p>

          <p className="text-[13px] font-mono text-gray-500">
            How <span className="text-violet-600">{s.vwResult}vw</span> and{" "}
            <span className="text-violet-600">{s.interceptRem}rem</span> were
            calculated
          </p>
        </div>

        <span
          className={`font-mono text-[18px] transition-transform duration-200 text-gray-400 ${
            open ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      {open && (
        <div className="px-7 pb-7 border-t pt-6 border-gray-200">
          <div className="border rounded-xl px-4 py-3.5 mb-6 bg-gray-50 border-gray-200">
            <p className="text-[12px] uppercase tracking-widest font-mono mb-2 text-gray-600">
              Goal — find v and r so that:
            </p>

            <p className="text-[12px] font-mono text-gray-700">
              font-size ={" "}
              <span className="text-violet-600">
                clamp({s.minRem}rem, {s.interceptRem}rem + {s.vwResult}vw,{" "}
                {s.maxRem}rem)
              </span>
            </p>

            <p className="text-[12px] font-mono mt-2 text-gray-500">
              where the fluid zone starts at {minScreen}px and ends at{" "}
              {maxScreen}px
            </p>
          </div>

          <Step
            number={1}
            title="Calculate slope"
            calc={`(maxFont − minFont) ÷ (maxScreen − minScreen) = ${s.slopeCalc}`}
            result={s.slopeResult}
          />

          <Step
            number={2}
            title="Convert slope → vw"
            calc={`slope × 100 = ${s.vwCalc}`}
            result={s.vwResult}
            unit="vw"
          />

          <Step
            number={3}
            title="Calculate intercept"
            calc={`minFont − (slope × minScreen) = ${s.interceptCalc}`}
            result={`${s.interceptRem}rem`}
          />

          <Step
            number={4}
            title="Convert min / max to rem"
            calc={`min: ${s.minRemCalc} | max: ${s.maxRemCalc}`}
            result={`${s.minRem}rem → ${s.maxRem}rem`}
          />

          <div className="border rounded-xl px-4 py-4 mt-2 bg-violet-50 border-violet-200">
            <p className="text-[10px] uppercase tracking-widest font-mono mb-3 text-gray-600">
              Final clamp()
            </p>

            <p className="text-[13px] text-violet-600 font-mono break-all">
              clamp({s.minRem}rem, {s.interceptRem}rem + {s.vwResult}vw,{" "}
              {s.maxRem}rem)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
// "use client";
// import { useState } from "react";
// import { getFormulaSteps } from "./CalculateClamp";

// function Step({ number, title, calc, result, unit = "", note, theme }) {
//   const isDark = theme === "dark";

//   const titleTxt = isDark ? "text-[#555]" : "text-gray-400";
//   const calcBg = isDark
//     ? "bg-[#0a0a0a] border-[#1a1a1a]"
//     : "bg-gray-50 border-gray-200";
//   const calcTxt = isDark ? "text-[#444]" : "text-gray-500";
//   const noteTxt = isDark ? "text-[#333]" : "text-gray-400";
//   const connLine = isDark ? "bg-[#1e1e1e]" : "bg-gray-200";
//   const stepBg = isDark
//     ? "bg-[#1a1a2e] border-[#3d3d6b]"
//     : "bg-violet-50 border-violet-300";

//   return (
//     <div className="flex gap-4 pb-6 last:pb-0">
//       {/* Step number + connector line */}
//       <div className="flex flex-col items-center shrink-0">
//         <div
//           className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] text-violet-400 font-mono font-bold shrink-0 ${stepBg}`}
//         >
//           {number}
//         </div>
//         {number < 4 && <div className={`w-px flex-1 mt-2 ${connLine}`} />}
//       </div>

//       {/* Content */}
//       <div className="flex-1 min-w-0 pt-0.5">
//         <p
//           className={`text-[11px] uppercase tracking-widest font-mono mb-2 ${titleTxt}`}
//         >
//           {title}
//         </p>
//         <div className={`border rounded-lg px-4 py-3 mb-2 ${calcBg}`}>
//           <div className="flex items-center justify-between flex-wrap gap-2">
//             <span className={`text-[12px] font-mono ${calcTxt}`}>{calc}</span>
//             <span className="text-[13px] text-violet-400 font-mono font-semibold">
//               = {result}
//               {unit}
//             </span>
//           </div>
//         </div>
//         {note && (
//           <p className={`text-[12px] font-mono leading-relaxed ${noteTxt}`}>
//             {note}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function FormulaPanel({
//   minFont,
//   maxFont,
//   minScreen,
//   maxScreen,
//   rootSize,
//   theme,
// }) {
//   const [open, setOpen] = useState(false);
//   const isDark = theme === "dark";
//   const s = getFormulaSteps(minFont, maxFont, minScreen, maxScreen, rootSize);

//   // ── theme helpers ──────────────────────────────────────────────────────────
//   const cardBg = isDark
//     ? "bg-[#0d0d0d] border-[#1e1e1e]"
//     : "bg-white border-gray-200";
//   const headerLabel = isDark ? "text-[#555]" : "text-gray-400";
//   const headerSub = isDark ? "text-[#333]" : "text-gray-400";
//   const arrowTxt = isDark ? "text-[#444]" : "text-gray-400";
//   const divider = isDark ? "border-[#1a1a1a]" : "border-gray-200";
//   const goalBg = isDark
//     ? "bg-[#0a0a0a] border-[#1a1a1a]"
//     : "bg-gray-50 border-gray-200";
//   const goalLabel = isDark ? "text-[#333]" : "text-gray-400";
//   const goalBody = isDark ? "text-[#666]" : "text-gray-500";
//   const goalMuted = isDark ? "text-[#333]" : "text-gray-400";
//   const goalScreen = isDark ? "text-[#666]" : "text-gray-500";
//   const finalBg = isDark
//     ? "bg-[#0f0f1a] border-[#2a2a4a]"
//     : "bg-violet-50 border-violet-200";
//   const finalLabel = isDark ? "text-[#444]" : "text-gray-400";

//   return (
//     <div
//       className={`border rounded-2xl mb-6 overflow-hidden transition-colors ${cardBg}`}
//     >
//       {/* Toggle header */}
//       <button
//         onClick={() => setOpen((v) => !v)}
//         className="w-full flex items-center justify-between px-7 py-5 cursor-pointer bg-transparent border-0 text-left"
//       >
//         <div>
//           <p
//             className={`text-[14px] uppercase tracking-widest font-mono mb-0.5 ${headerLabel}`}
//           >
//             Formula Explanation
//           </p>
//           <p className={`text-[13px] font-mono ${headerSub}`}>
//             How <span className="text-violet-400">{s.vwResult}vw</span> and{" "}
//             <span className="text-violet-400">{s.interceptRem}rem</span> were
//             calculated
//           </p>
//         </div>
//         <span
//           className={`font-mono text-[18px] transition-transform duration-200 ${arrowTxt} ${open ? "rotate-180" : ""}`}
//         >
//           ↓
//         </span>
//       </button>

//       {/* Expandable content */}
//       {open && (
//         <div className={`px-7 pb-7 border-t pt-6 ${divider}`}>
//           {/* Goal box */}
//           <div className={`border rounded-xl px-4 py-3.5 mb-6 ${goalBg}`}>
//             <p
//               className={`text-[12px] uppercase tracking-widest font-mono mb-2 ${goalLabel}`}
//             >
//               Goal — find v and r so that:
//             </p>
//             <p className={`text-[12px] font-mono ${goalBody}`}>
//               font-size ={" "}
//               <span className="text-violet-400">
//                 clamp({s.minRem}rem, {s.interceptRem}rem + {s.vwResult}vw,{" "}
//                 {s.maxRem}rem)
//               </span>
//             </p>
//             <p
//               className={`text-[12px] font-mono mt-2 leading-relaxed ${goalMuted}`}
//             >
//               where the fluid zone starts at{" "}
//               <span className={goalScreen}>{minScreen}px</span> and ends at{" "}
//               <span className={goalScreen}>{maxScreen}px</span>
//             </p>
//           </div>

//           <Step
//             number={1}
//             title="Calculate the slope (how fast font grows per px of screen)"
//             calc={`(maxFont − minFont) ÷ (maxScreen − minScreen) = ${s.slopeCalc}`}
//             result={s.slopeResult}
//             note="The slope tells us the rate of font-size change per pixel of viewport width."
//             theme={theme}
//           />

//           <Step
//             number={2}
//             title="Convert slope → vw value"
//             calc={`slope × 100 = ${s.vwCalc}`}
//             result={s.vwResult}
//             unit="vw"
//             note="Multiplying by 100 converts the px/px ratio into a vw percentage (1vw = 1% of viewport)."
//             theme={theme}
//           />

//           <Step
//             number={3}
//             title="Calculate the intercept (base rem in preferred value)"
//             calc={`minFont − (slope × minScreen) = ${s.interceptCalc}`}
//             result={`${s.interceptPx}px → ${s.interceptRemCalc} = ${s.interceptRem}rem`}
//             note="The intercept anchors the line to your minimum breakpoint. Divide by root font size to convert to rem."
//             theme={theme}
//           />

//           <Step
//             number={4}
//             title="Convert min / max font sizes to rem"
//             calc={`min: ${s.minRemCalc} | max: ${s.maxRemCalc}`}
//             result={`${s.minRem}rem → ${s.maxRem}rem`}
//             note="rem values adapt to the user's browser font size preference, unlike px."
//             theme={theme}
//           />

//           {/* Final clamp result */}
//           <div className={`border rounded-xl px-4 py-4 mt-2 ${finalBg}`}>
//             <p
//               className={`text-[10px] uppercase tracking-widest font-mono mb-3 ${finalLabel}`}
//             >
//               Final clamp()
//             </p>
//             <p className="text-[13px] text-violet-400 font-mono break-all">
//               clamp({s.minRem}rem, {s.interceptRem}rem + {s.vwResult}vw,{" "}
//               {s.maxRem}rem)
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
