"use client";
import { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import InputPanel from "./InputPanel";
import ClampResult from "./ClampResult";
import ScaleGraph from "./ScaleGraph";
import LivePreview from "./LivePreview";
import TypeScale from "./TypeScale";
import AccessibilityWarning from "./AccessibilityWarning";
import BreakpointTable from "./BreakpointTable";
import FormulaPanel from "./FormulaPanel";
import SavedConfigs from "./SavedConfigs";
import ExportPanel from "./ExportPanel";
import DocsPanel from "./DocsPanel";
import {
  calculateClamp,
  generateGraphData,
  getPreviewFontSize,
  generateTypeScale,
} from "./CalculateClamp";

const TABS = ["Single", "Type Scale", "Export"];

function numParam(params, key, fallback) {
  const v = params.get(key);
  const n = v !== null ? Number(v) : NaN;
  return isNaN(n) ? fallback : n;
}

export default function FluidTypographyGenerator() {
  const router = useRouter();
  const params = useSearchParams();

  const minFont = numParam(params, "minFont", 12);
  const maxFont = numParam(params, "maxFont", 20);
  const minScreen = numParam(params, "minScreen", 375);
  const maxScreen = numParam(params, "maxScreen", 1280);
  const rootSize = numParam(params, "rootSize", 16);
  const previewScreen = numParam(params, "previewScreen", 800);
  const activeTab = params.get("tab") ?? "Single";
  const unit = params.get("unit") ?? "rem";
  const reverseScale = params.get("reverse") === "1";

  const setParam = useCallback(
    (patch) => {
      const next = new URLSearchParams(params.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v === null || v === undefined) next.delete(k);
        else next.set(k, String(v));
      });
      router.replace(`?${next.toString()}`, { scroll: false });
    },
    [params, router],
  );

  const setMinFont = (v) => setParam({ minFont: v });
  const setMaxFont = (v) => setParam({ maxFont: v });
  const setMinScreen = (v) => setParam({ minScreen: v });
  const setMaxScreen = (v) => setParam({ maxScreen: v });
  const setRootSize = (v) => setParam({ rootSize: v });
  const setPreviewScreen = (v) => setParam({ previewScreen: v });
  const setActiveTab = (v) => setParam({ tab: v });
  const setUnit = (v) => setParam({ unit: v });
  const toggleReverse = () => setParam({ reverse: reverseScale ? "0" : "1" });

  const effectiveMin = reverseScale ? maxFont : minFont;
  const effectiveMax = reverseScale ? minFont : maxFont;

  const result = useMemo(
    () =>
      calculateClamp(
        effectiveMin,
        effectiveMax,
        minScreen,
        maxScreen,
        rootSize,
      ),
    [effectiveMin, effectiveMax, minScreen, maxScreen, rootSize],
  );

  const graphData = useMemo(
    () => generateGraphData(effectiveMin, effectiveMax, minScreen, maxScreen),
    [effectiveMin, effectiveMax, minScreen, maxScreen],
  );

  const previewFontSize = useMemo(
    () =>
      getPreviewFontSize(
        effectiveMin,
        effectiveMax,
        minScreen,
        maxScreen,
        previewScreen,
      ),
    [effectiveMin, effectiveMax, minScreen, maxScreen, previewScreen],
  );

  const typeScale = useMemo(
    () =>
      generateTypeScale(
        effectiveMin,
        effectiveMax,
        minScreen,
        maxScreen,
        rootSize,
        1.25,
      ),
    [effectiveMin, effectiveMax, minScreen, maxScreen, rootSize],
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-mono px-4 md:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-violet-600"
          >
            ← Back
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Fluid Typography
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Generate CSS clamp() formulas that scale smoothly
          </p>
        </div>

        <DocsPanel />

        <InputPanel
          minFont={minFont}
          setMinFont={setMinFont}
          maxFont={maxFont}
          setMaxFont={setMaxFont}
          minScreen={minScreen}
          setMinScreen={setMinScreen}
          maxScreen={maxScreen}
          setMaxScreen={setMaxScreen}
          rootSize={rootSize}
          setRootSize={setRootSize}
        />

        {/* reverse toggle */}
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 uppercase">Reverse Scaling</p>
            <p className="text-xs text-gray-400">
              Font size decreases as screen width increases
            </p>
          </div>

          <button
            onClick={toggleReverse}
            className={`w-11 h-6 rounded-full border transition ${
              reverseScale
                ? "bg-violet-600 border-violet-600"
                : "bg-gray-200 border-gray-300"
            }`}
          />
        </div>

        {/* tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm rounded-lg transition ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Single" && (
          <>
            <AccessibilityWarning isNegativeVw={result.isNegativeVw} />

            <ClampResult
              result={result}
              minFont={effectiveMin}
              maxFont={effectiveMax}
              unit={unit}
              setUnit={setUnit}
            />

            <FormulaPanel
              minFont={effectiveMin}
              maxFont={effectiveMax}
              minScreen={minScreen}
              maxScreen={maxScreen}
              rootSize={rootSize}
            />

            <BreakpointTable
              minFont={effectiveMin}
              maxFont={effectiveMax}
              minScreen={minScreen}
              maxScreen={maxScreen}
            />

            <ScaleGraph
              graphData={graphData}
              minScreen={minScreen}
              maxScreen={maxScreen}
            />

            <LivePreview
              minScreen={minScreen}
              maxScreen={maxScreen}
              previewScreen={previewScreen}
              setPreviewScreen={setPreviewScreen}
              previewFontSize={previewFontSize}
            />
          </>
        )}

        {activeTab === "Type Scale" && (
          <TypeScale
            minFont={effectiveMin}
            maxFont={effectiveMax}
            minScreen={minScreen}
            maxScreen={maxScreen}
            rootSize={rootSize}
            unit={unit}
            setUnit={setUnit}
          />
        )}

        {activeTab === "Export" && (
          <>
            <SavedConfigs
              currentMinFont={effectiveMin}
              currentMaxFont={effectiveMax}
              currentMinScreen={minScreen}
              currentMaxScreen={maxScreen}
              currentRootSize={rootSize}
              unit={unit}
            />

            <ExportPanel
              result={result}
              scale={typeScale}
              unit={unit}
              minFont={effectiveMin}
              maxFont={effectiveMax}
              minScreen={minScreen}
              maxScreen={maxScreen}
            />
          </>
        )}
      </div>
    </div>
  );
}
// "use client";
// import { useMemo, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import InputPanel from "./InputPanel";
// import ClampResult from "./ClampResult";
// import ScaleGraph from "./ScaleGraph";
// import LivePreview from "./LivePreview";
// import TypeScale from "./TypeScale";
// import AccessibilityWarning from "./AccessibilityWarning";
// import BreakpointTable from "./BreakpointTable";
// import FormulaPanel from "./FormulaPanel";
// import SavedConfigs from "./SavedConfigs";
// import ExportPanel from "./ExportPanel";
// import DocsPanel from "./DocsPanel";
// import {
//   calculateClamp,
//   generateGraphData,
//   getPreviewFontSize,
//   generateTypeScale,
// } from "./CalculateClamp";

// const TABS = ["Single", "Type Scale", "Export"];

// function numParam(params, key, fallback) {
//   const v = params.get(key);
//   const n = v !== null ? Number(v) : NaN;
//   return isNaN(n) ? fallback : n;
// }

// export default function FluidTypographyGenerator() {
//   const router = useRouter();
//   const params = useSearchParams();

//   // All state is stored in the URL — refresh restores everything exactly.
//   const minFont = numParam(params, "minFont", 12);
//   const maxFont = numParam(params, "maxFont", 20);
//   const minScreen = numParam(params, "minScreen", 375);
//   const maxScreen = numParam(params, "maxScreen", 1280);
//   const rootSize = numParam(params, "rootSize", 16);
//   const previewScreen = numParam(params, "previewScreen", 800);
//   const activeTab = params.get("tab") ?? "Single";
//   const unit = params.get("unit") ?? "rem";
//   const reverseScale = params.get("reverse") === "1";
//   const theme = params.get("theme") ?? "dark";

//   const setParam = useCallback(
//     (patch) => {
//       const next = new URLSearchParams(params.toString());
//       Object.entries(patch).forEach(([k, v]) => {
//         if (v === null || v === undefined) next.delete(k);
//         else next.set(k, String(v));
//       });
//       router.replace(`?${next.toString()}`, { scroll: false });
//     },
//     [params, router],
//   );

//   const setMinFont = (v) => setParam({ minFont: v });
//   const setMaxFont = (v) => setParam({ maxFont: v });
//   const setMinScreen = (v) => setParam({ minScreen: v });
//   const setMaxScreen = (v) => setParam({ maxScreen: v });
//   const setRootSize = (v) => setParam({ rootSize: v });
//   const setPreviewScreen = (v) => setParam({ previewScreen: v });
//   const setActiveTab = (v) => setParam({ tab: v });
//   const setUnit = (v) => setParam({ unit: v });
//   const setTheme = (v) => setParam({ theme: v });
//   const toggleReverse = () => setParam({ reverse: reverseScale ? "0" : "1" });

//   const isDark = theme === "dark";
//   const effectiveMin = reverseScale ? maxFont : minFont;
//   const effectiveMax = reverseScale ? minFont : maxFont;

//   const result = useMemo(
//     () =>
//       calculateClamp(
//         effectiveMin,
//         effectiveMax,
//         minScreen,
//         maxScreen,
//         rootSize,
//       ),
//     [effectiveMin, effectiveMax, minScreen, maxScreen, rootSize],
//   );
//   const graphData = useMemo(
//     () => generateGraphData(effectiveMin, effectiveMax, minScreen, maxScreen),
//     [effectiveMin, effectiveMax, minScreen, maxScreen],
//   );
//   const previewFontSize = useMemo(
//     () =>
//       getPreviewFontSize(
//         effectiveMin,
//         effectiveMax,
//         minScreen,
//         maxScreen,
//         previewScreen,
//       ),
//     [effectiveMin, effectiveMax, minScreen, maxScreen, previewScreen],
//   );
//   const typeScale = useMemo(
//     () =>
//       generateTypeScale(
//         effectiveMin,
//         effectiveMax,
//         minScreen,
//         maxScreen,
//         rootSize,
//         1.25,
//       ),
//     [effectiveMin, effectiveMax, minScreen, maxScreen, rootSize],
//   );

//   const bg = isDark ? "bg-[#080808]" : "bg-gray-50";
//   const text = isDark ? "text-[#e0e0e0]" : "text-gray-900";
//   const cardBg = isDark ? "bg-[#0d0d0d]" : "bg-white";
//   const border = isDark ? "border-[#1e1e1e]" : "border-gray-200";
//   const label = isDark ? "text-[#555]" : "text-gray-400";
//   // Dark mode
//   const tabActive = isDark
//     ? "bg-violet-500/15 border-violet-400/40 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.25)]"
//     : "bg-violet-50 border-violet-300 text-violet-700 shadow-sm";

//   const tabIdle = isDark
//     ? "bg-transparent border-transparent text-[#666] hover:text-[#aaa] hover:border-[#2a2a2a]"
//     : "bg-transparent border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200";
//   return (
//     <div
//       className={`min-h-screen ${bg} ${text} font-mono px-6 py-12 box-border transition-colors duration-200`}
//     >
//       <div className="max-w-200 mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <Link
//               href="/"
//               className={`inline-flex items-center gap-1.5 text-[14px] hover:text-violet-400 transition-colors no-underline uppercase tracking-widest ${label}`}
//             >
//               ← Back
//             </Link>
//             <button
//               onClick={() => setTheme(isDark ? "light" : "dark")}
//               className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[14px] font-mono cursor-pointer transition-all ${
//                 isDark
//                   ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-[#888]"
//                   : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               {isDark ? "☀ Light" : "◑ Dark"}
//             </button>
//           </div>
//           <span
//             className={`block border rounded px-2.5 py-1 text-[11px] uppercase tracking-widest mb-4 font-mono w-fit ${
//               isDark
//                 ? "bg-[#1a1a1a] border-[#2a2a2a] text-[#666]"
//                 : "bg-gray-100 border-gray-200 text-gray-400"
//             }`}
//           >
//             CSS Utility
//           </span>
//           <h1 className="font-(family-name:--font-syne) text-[clamp(28px,5vw,42px)] font-extrabold leading-none tracking-tight">
//             Fluid Typography
//           </h1>
//           <p
//             className={`text-[13px] mt-2.5 leading-relaxed ${isDark ? "text-[#666]" : "text-gray-400"}`}
//           >
//             Generate CSS <span className="text-violet-400">clamp()</span>{" "}
//             formulas that scale smoothly between screen sizes.
//           </p>
//         </div>
//         <DocsPanel theme={theme} />

//         {/* Inputs */}
//         <InputPanel
//           minFont={minFont}
//           setMinFont={setMinFont}
//           maxFont={maxFont}
//           setMaxFont={setMaxFont}
//           minScreen={minScreen}
//           setMinScreen={setMinScreen}
//           maxScreen={maxScreen}
//           setMaxScreen={setMaxScreen}
//           rootSize={rootSize}
//           setRootSize={setRootSize}
//           theme={theme}
//         />

//         {/* Reverse scale toggle */}
//         <div
//           className={`${cardBg} border ${border} rounded-2xl px-6 py-4 mb-6 flex items-center justify-between gap-4 flex-wrap`}
//         >
//           <div>
//             <p
//               className={`text-[13px] uppercase tracking-widest font-mono mb-0.5 ${label}`}
//             >
//               Reverse Scaling
//             </p>
//             <p
//               className={`text-[12px] font-mono ${isDark ? "text-[#555]" : "text-gray-400"}`}
//             >
//               Font size{" "}
//               <span className={isDark ? "text-[#666]" : "text-gray-600"}>
//                 decreases
//               </span>{" "}
//               as screen width increases (negative vw)
//             </p>
//           </div>
//           <button
//             onClick={toggleReverse}
//             className={`relative w-11 h-6 rounded-full border transition-all duration-200 cursor-pointer shrink-0 ${
//               reverseScale
//                 ? "bg-violet-500/30 border-violet-400/50"
//                 : isDark
//                   ? "bg-[#111] border-[#2a2a2a]"
//                   : "bg-gray-100 border-gray-200"
//             }`}
//           >
//             <span
//               className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200 ${
//                 reverseScale
//                   ? "left-4.5 bg-violet-400"
//                   : `left-0.5 ${isDark ? "bg-[#333]" : "bg-gray-300"}`
//               }`}
//             />
//           </button>
//         </div>

//         {/* Tab switcher */}
//         <div
//           className={`flex gap-1 mb-6 ${cardBg} border ${border} rounded-xl p-1`}
//         >
//           {TABS.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-2 rounded-lg text-[12px] font-mono tracking-wide cursor-pointer transition-all border ${
//                 activeTab === tab ? tabActive : tabIdle
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {activeTab === "Single" && (
//           <AccessibilityWarning
//             isNegativeVw={result.isNegativeVw}
//             theme={theme}
//           />
//         )}

//         {activeTab === "Single" && (
//           <>
//             <ClampResult
//               result={result}
//               minFont={effectiveMin}
//               maxFont={effectiveMax}
//               unit={unit}
//               setUnit={setUnit}
//               theme={theme}
//             />
//             <FormulaPanel
//               minFont={effectiveMin}
//               maxFont={effectiveMax}
//               minScreen={minScreen}
//               maxScreen={maxScreen}
//               rootSize={rootSize}
//               theme={theme}
//             />
//             <BreakpointTable
//               minFont={effectiveMin}
//               maxFont={effectiveMax}
//               minScreen={minScreen}
//               maxScreen={maxScreen}
//               theme={theme}
//             />
//             <ScaleGraph
//               graphData={graphData}
//               minScreen={minScreen}
//               maxScreen={maxScreen}
//               theme={theme}
//             />
//             <LivePreview
//               minScreen={minScreen}
//               maxScreen={maxScreen}
//               previewScreen={previewScreen}
//               setPreviewScreen={setPreviewScreen}
//               previewFontSize={previewFontSize}
//               theme={theme}
//             />
//           </>
//         )}

//         {activeTab === "Type Scale" && (
//           <TypeScale
//             minFont={effectiveMin}
//             maxFont={effectiveMax}
//             minScreen={minScreen}
//             maxScreen={maxScreen}
//             rootSize={rootSize}
//             unit={unit}
//             setUnit={setUnit}
//             theme={theme}
//           />
//         )}

//         {activeTab === "Export" && (
//           <>
//             <SavedConfigs
//               currentMinFont={effectiveMin}
//               currentMaxFont={effectiveMax}
//               currentMinScreen={minScreen}
//               currentMaxScreen={maxScreen}
//               currentRootSize={rootSize}
//               unit={unit}
//               theme={theme}
//             />
//             <ExportPanel
//               result={result}
//               scale={typeScale}
//               unit={unit}
//               theme={theme}
//               minFont={effectiveMin}
//               maxFont={effectiveMax}
//               minScreen={minScreen}
//               maxScreen={maxScreen}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
