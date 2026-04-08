"use client";

// ─── Slider ───────────────────────────────────────────────────────────────────
export function Slider({ value, min, max, step = 1, color, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative h-0.75 rounded-full bg-gray-200">
      <div
        className="absolute left-0 top-0 h-full rounded-full transition-all duration-75"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        style={{ margin: 0 }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 bg-white pointer-events-none transition-all duration-75"
        style={{ left: `calc(${pct}% - 6px)`, borderColor: color }}
      />
    </div>
  );
}
// "use client";

// // ─── Slider ───────────────────────────────────────────────────────────────────
// export function Slider({ value, min, max, step = 1, color, onChange }) {
//   const pct = ((value - min) / (max - min)) * 100;

//   return (
//     <div className="relative h-0.75 rounded-full bg-[#1e1e1e]">
//       <div
//         className="absolute left-0 top-0 h-full rounded-full transition-all duration-75"
//         style={{ width: `${pct}%`, backgroundColor: color }}
//       />
//       <input
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={(e) => onChange(+e.target.value)}
//         className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
//         style={{ margin: 0 }}
//       />
//       <div
//         className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 bg-[#080808] pointer-events-none transition-all duration-75"
//         style={{ left: `calc(${pct}% - 6px)`, borderColor: color }}
//       />
//     </div>
//   );
// }
