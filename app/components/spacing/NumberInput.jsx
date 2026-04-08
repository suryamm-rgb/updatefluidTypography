"use client";

// ─── NumberInput ──────────────────────────────────────────────────────────────
export function NumberInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "px",
  color,
  onChange,
}) {
  const showHints = max < 99999;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] text-gray-500 uppercase tracking-widest">
        {label}
      </span>
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 transition-colors focus-within:border-gray-400">
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => {
            const v = +e.target.value;
            if (!isNaN(v) && v >= 0) onChange(v);
          }}
          className="w-full bg-transparent text-[13px] outline-none font-(family-name:--font-dm-mono) [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style={{ color }}
        />
        <span className="text-[10px] text-gray-400 shrink-0">{unit}</span>
      </div>
      {showHints && (
        <div className="flex justify-between text-[9px] text-gray-400">
          <span>
            {min}
            {unit}
          </span>
          <span>
            {max}
            {unit}
          </span>
        </div>
      )}
    </div>
  );
}
// "use client";

// // ─── NumberInput ──────────────────────────────────────────────────────────────
// export function NumberInput({
//   label,
//   value,
//   min,
//   max,
//   step = 1,
//   unit = "px",
//   color,
//   onChange,
// }) {
//   const showHints = max < 99999;

//   return (
//     <div className="flex flex-col gap-1.5">
//       <span className="text-[10px] text-[#444] uppercase tracking-widest">
//         {label}
//       </span>
//       <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg px-3 py-2 transition-colors focus-within:border-[#333]">
//         <input
//           type="number"
//           min={min}
//           step={step}
//           value={value}
//           onChange={(e) => {
//             const v = +e.target.value;
//             if (!isNaN(v) && v >= 0) onChange(v);
//           }}
//           className="w-full bg-transparent text-[13px] outline-none font-(family-name:--font-dm-mono) [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//           style={{ color }}
//         />
//         <span className="text-[10px] text-[#333] shrink-0">{unit}</span>
//       </div>
//       {showHints && (
//         <div className="flex justify-between text-[9px] text-[#2a2a2a]">
//           <span>
//             {min}
//             {unit}
//           </span>
//           <span>
//             {max}
//             {unit}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// // ─── NumberInput ──────────────────────────────────────────────────────────────
// export function NumberInput({
//   label,
//   value,
//   min,
//   max,
//   step = 1,
//   unit = "px",
//   color,
//   onChange,
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <span className="text-[10px] text-[#444] uppercase tracking-widest">
//         {label}
//       </span>
//       <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg px-3 py-2 transition-colors focus-within:border-[#333]">
//         <input
//           type="number"
//           min={min}
//           max={max}
//           step={step}
//           value={value}
//           onChange={(e) =>
//             onChange(Math.min(max, Math.max(min, +e.target.value)))
//           }
//           className="w-full bg-transparent text-[13px] outline-none font-(family-name:--font-dm-mono) [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//           style={{ color }}
//         />
//         <span className="text-[10px] text-[#333] shrink-0">{unit}</span>
//       </div>
//       <div className="flex justify-between text-[9px] text-[#2a2a2a]">
//         <span>
//           {min}
//           {unit}
//         </span>
//         <span>
//           {max}
//           {unit}
//         </span>
//       </div>
//     </div>
//   );
// }
