"use client";

import { useCallback } from "react";
import { NumberInput } from "./NumberInput";
import { Slider } from "./Slider";
import { PRESETS, PROPERTY_COLORS } from "./Constants";

export function ControlsPanel({
  minPx,
  setMinPx,
  maxPx,
  setMaxPx,
  minVw,
  setMinVw,
  maxVw,
  setMaxVw,
  property,
  setProperty,
  color,
}) {
  const handlePreset = useCallback(
    (p) => {
      setMinPx(p.minPx);
      setMaxPx(p.maxPx);
    },
    [setMinPx, setMaxPx],
  );

  return (
    <div className="border-b lg:border-b-0 lg:border-r border-gray-200 bg-white px-4 sm:px-5 py-5 sm:py-6">
      <div className="max-w-xl mx-auto lg:max-w-none space-y-6">
        {/* Property */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
            Property
          </p>

          <div className="grid grid-cols-3 gap-1.5">
            {["padding", "margin", "gap"].map((p) => (
              <button
                key={p}
                onClick={() => setProperty(p)}
                className="py-2 rounded text-[10px] uppercase tracking-widest border transition-all duration-150 cursor-pointer"
                style={
                  property === p
                    ? {
                        borderColor: `${PROPERTY_COLORS[p]}60`,
                        color: PROPERTY_COLORS[p],
                        background: `${PROPERTY_COLORS[p]}0d`,
                      }
                    : {
                        borderColor: "#e5e7eb",
                        color: "#6b7280",
                        background: "white",
                      }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Spacing range */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            Spacing Range
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <NumberInput
              label="Min Size"
              value={minPx}
              min={0}
              max={128}
              color={color}
              onChange={setMinPx}
            />
            <NumberInput
              label="Max Size"
              value={maxPx}
              min={0}
              max={256}
              color={color}
              onChange={setMaxPx}
            />
          </div>

          <div className="space-y-4">
            <Slider
              value={minPx}
              min={0}
              max={128}
              color={color}
              onChange={setMinPx}
            />

            <Slider
              value={maxPx}
              min={0}
              max={256}
              color={color}
              onChange={setMaxPx}
            />
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Viewport breakpoints */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            Viewport Breakpoints
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <NumberInput
              label="Min Viewport"
              value={minVw}
              min={0}
              max={99999}
              step={10}
              unit="px"
              color={color}
              onChange={setMinVw}
            />

            <NumberInput
              label="Max Viewport"
              value={maxVw}
              min={0}
              max={99999}
              step={10}
              unit="px"
              color={color}
              onChange={setMaxVw}
            />
          </div>

          <div className="space-y-4">
            <Slider
              value={Math.min(minVw, 2560)}
              min={0}
              max={2560}
              step={10}
              color={color}
              onChange={setMinVw}
            />

            <Slider
              value={Math.min(maxVw, 2560)}
              min={0}
              max={2560}
              step={10}
              color={color}
              onChange={setMaxVw}
            />
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Quick presets */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            Quick Presets
          </p>

          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => {
              const active = minPx === p.minPx && maxPx === p.maxPx;

              return (
                <button
                  key={p.name}
                  onClick={() => handlePreset(p)}
                  className="px-2.5 py-1 rounded text-[10px] border transition-all duration-150 cursor-pointer"
                  style={
                    active
                      ? {
                          borderColor: `${color}60`,
                          color,
                          background: `${color}0d`,
                        }
                      : {
                          borderColor: "#e5e7eb",
                          color: "#6b7280",
                          background: "white",
                        }
                  }
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useCallback } from "react";
// import { NumberInput } from "./NumberInput";
// import { Slider } from "./Slider";
// import { PRESETS, PROPERTY_COLORS } from "./Constants";

// // ─── ControlsPanel ────────────────────────────────────────────────────────────
// export function ControlsPanel({
//   minPx,
//   setMinPx,
//   maxPx,
//   setMaxPx,
//   minVw,
//   setMinVw,
//   maxVw,
//   setMaxVw,
//   property,
//   setProperty,
//   color,
// }) {
//   const handlePreset = useCallback(
//     (p) => {
//       setMinPx(p.minPx);
//       setMaxPx(p.maxPx);
//     },
//     [setMinPx, setMaxPx],
//   );

//   return (
//     <div className="border-b lg:border-b-0 lg:border-r border-[#141414] bg-[#090909] px-4 sm:px-5 py-5 sm:py-6">
//       <div className="max-w-xl mx-auto lg:max-w-none space-y-6">
//         {/* Property */}
//         <div>
//           <p className="text-[10px] text-[#444] uppercase tracking-widest mb-2.5">
//             Property
//           </p>
//           <div className="grid grid-cols-3 gap-1.5">
//             {["padding", "margin", "gap"].map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setProperty(p)}
//                 className="py-2 rounded text-[10px] uppercase tracking-widest border transition-all duration-150 cursor-pointer"
//                 style={
//                   property === p
//                     ? {
//                         borderColor: `${PROPERTY_COLORS[p]}60`,
//                         color: PROPERTY_COLORS[p],
//                         background: `${PROPERTY_COLORS[p]}0d`,
//                       }
//                     : {
//                         borderColor: "#1e1e1e",
//                         color: "#444",
//                         background: "transparent",
//                       }
//                 }
//               >
//                 {p}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="h-px bg-[#141414]" />

//         {/* Spacing range */}
//         <div>
//           <p className="text-[10px] text-[#444] uppercase tracking-widest mb-3">
//             Spacing Range
//           </p>
//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <NumberInput
//               label="Min Size"
//               value={minPx}
//               min={0}
//               max={128}
//               color={color}
//               onChange={setMinPx}
//             />
//             <NumberInput
//               label="Max Size"
//               value={maxPx}
//               min={0}
//               max={256}
//               color={color}
//               onChange={setMaxPx}
//             />
//           </div>
//           <div className="space-y-4">
//             <Slider
//               value={minPx}
//               min={0}
//               max={128}
//               color={color}
//               onChange={setMinPx}
//             />
//             <Slider
//               value={maxPx}
//               min={0}
//               max={256}
//               color={color}
//               onChange={setMaxPx}
//             />
//           </div>
//         </div>

//         <div className="h-px bg-[#141414]" />

//         {/* Viewport breakpoints */}
//         <div>
//           <p className="text-[10px] text-[#444] uppercase tracking-widest mb-3">
//             Viewport Breakpoints
//           </p>
//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <NumberInput
//               label="Min Viewport"
//               value={minVw}
//               min={0}
//               max={99999}
//               step={10}
//               unit="px"
//               color={color}
//               onChange={setMinVw}
//             />
//             <NumberInput
//               label="Max Viewport"
//               value={maxVw}
//               min={0}
//               max={99999}
//               step={10}
//               unit="px"
//               color={color}
//               onChange={setMaxVw}
//             />
//           </div>
//           <div className="space-y-4">
//             <Slider
//               value={Math.min(minVw, 2560)}
//               min={0}
//               max={2560}
//               step={10}
//               color={color}
//               onChange={setMinVw}
//             />
//             <Slider
//               value={Math.min(maxVw, 2560)}
//               min={0}
//               max={2560}
//               step={10}
//               color={color}
//               onChange={setMaxVw}
//             />
//           </div>
//         </div>

//         <div className="h-px bg-[#141414]" />

//         {/* Quick presets */}
//         <div>
//           <p className="text-[10px] text-[#444] uppercase tracking-widest mb-3">
//             Quick Presets
//           </p>
//           <div className="flex flex-wrap gap-1.5">
//             {PRESETS.map((p) => {
//               const active = minPx === p.minPx && maxPx === p.maxPx;
//               return (
//                 <button
//                   key={p.name}
//                   onClick={() => handlePreset(p)}
//                   className="px-2.5 py-1 rounded text-[10px] border transition-all duration-150 cursor-pointer"
//                   style={
//                     active
//                       ? {
//                           borderColor: `${color}60`,
//                           color,
//                           background: `${color}0d`,
//                         }
//                       : {
//                           borderColor: "#1e1e1e",
//                           color: "#444",
//                           background: "transparent",
//                         }
//                   }
//                 >
//                   {p.name}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// // "use client";

// // import { useCallback } from "react";
// // import { NumberInput } from "./NumberInput";
// // import { Slider } from "./Slider";
// // import { PROPERTY_COLORS, PRESETS } from "./Constants";
// // // ─── ControlsPanel ────────────────────────────────────────────────────────────
// // export function ControlsPanel({
// //   minPx,
// //   setMinPx,
// //   maxPx,
// //   setMaxPx,
// //   minVw,
// //   setMinVw,
// //   maxVw,
// //   setMaxVw,
// //   property,
// //   setProperty,
// //   color,
// // }) {
// //   const handlePreset = useCallback(
// //     (p) => {
// //       setMinPx(p.minPx);
// //       setMaxPx(p.maxPx);
// //     },
// //     [setMinPx, setMaxPx],
// //   );

// //   return (
// //     <div className="border-b lg:border-b-0 lg:border-r border-[#141414] bg-[#090909] px-4 sm:px-5 py-5 sm:py-6">
// //       <div className="max-w-xl mx-auto lg:max-w-none space-y-6">
// //         {/* Property */}
// //         <div>
// //           <p className="text-[10px] text-[#444] uppercase tracking-widest mb-2.5">
// //             Property
// //           </p>
// //           <div className="grid grid-cols-3 gap-1.5">
// //             {["padding", "margin", "gap"].map((p) => (
// //               <button
// //                 key={p}
// //                 onClick={() => setProperty(p)}
// //                 className="py-2 rounded text-[10px] uppercase tracking-widest border transition-all duration-150 cursor-pointer"
// //                 style={
// //                   property === p
// //                     ? {
// //                         borderColor: `${PROPERTY_COLORS[p]}60`,
// //                         color: PROPERTY_COLORS[p],
// //                         background: `${PROPERTY_COLORS[p]}0d`,
// //                       }
// //                     : {
// //                         borderColor: "#1e1e1e",
// //                         color: "#444",
// //                         background: "transparent",
// //                       }
// //                 }
// //               >
// //                 {p}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="h-px bg-[#141414]" />

// //         {/* Spacing range */}
// //         <div>
// //           <p className="text-[10px] text-[#444] uppercase tracking-widest mb-3">
// //             Spacing Range
// //           </p>
// //           <div className="grid grid-cols-2 gap-3 mb-4">
// //             <NumberInput
// //               label="Min Size"
// //               value={minPx}
// //               min={0}
// //               max={128}
// //               color={color}
// //               onChange={setMinPx}
// //             />
// //             <NumberInput
// //               label="Max Size"
// //               value={maxPx}
// //               min={0}
// //               max={256}
// //               color={color}
// //               onChange={setMaxPx}
// //             />
// //           </div>
// //           <div className="space-y-4">
// //             <Slider
// //               value={minPx}
// //               min={0}
// //               max={128}
// //               color={color}
// //               onChange={setMinPx}
// //             />
// //             <Slider
// //               value={maxPx}
// //               min={0}
// //               max={256}
// //               color={color}
// //               onChange={setMaxPx}
// //             />
// //           </div>
// //         </div>

// //         <div className="h-px bg-[#141414]" />

// //         {/* Viewport breakpoints */}
// //         <div>
// //           <p className="text-[10px] text-[#444] uppercase tracking-widest mb-3">
// //             Viewport Breakpoints
// //           </p>
// //           <div className="grid grid-cols-2 gap-3 mb-4">
// //             <NumberInput
// //               label="Min Viewport"
// //               value={minVw}
// //               min={200}
// //               max={800}
// //               step={10}
// //               unit="px"
// //               color={color}
// //               onChange={setMinVw}
// //             />
// //             <NumberInput
// //               label="Max Viewport"
// //               value={maxVw}
// //               min={800}
// //               max={2560}
// //               step={10}
// //               unit="px"
// //               color={color}
// //               onChange={setMaxVw}
// //             />
// //           </div>
// //           <div className="space-y-4">
// //             <Slider
// //               value={minVw}
// //               min={200}
// //               max={800}
// //               step={10}
// //               color={color}
// //               onChange={setMinVw}
// //             />
// //             <Slider
// //               value={maxVw}
// //               min={800}
// //               max={2560}
// //               step={10}
// //               color={color}
// //               onChange={setMaxVw}
// //             />
// //           </div>
// //         </div>

// //         <div className="h-px bg-[#141414]" />

// //         {/* Quick presets */}
// //         <div>
// //           <p className="text-[10px] text-[#444] uppercase tracking-widest mb-3">
// //             Quick Presets
// //           </p>
// //           <div className="flex flex-wrap gap-1.5">
// //             {PRESETS.map((p) => {
// //               const active = minPx === p.minPx && maxPx === p.maxPx;
// //               return (
// //                 <button
// //                   key={p.name}
// //                   onClick={() => handlePreset(p)}
// //                   className="px-2.5 py-1 rounded text-[10px] border transition-all duration-150 cursor-pointer"
// //                   style={
// //                     active
// //                       ? {
// //                           borderColor: `${color}60`,
// //                           color,
// //                           background: `${color}0d`,
// //                         }
// //                       : {
// //                           borderColor: "#1e1e1e",
// //                           color: "#444",
// //                           background: "transparent",
// //                         }
// //                   }
// //                 >
// //                   {p.name}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
