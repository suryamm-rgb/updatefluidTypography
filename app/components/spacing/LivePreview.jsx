"use client";

// ─── LivePreview ──────────────────────────────────────────────────────────────
export function LivePreview({ property, value, color }) {
  const px = Math.round(value);

  if (property === "padding") {
    return (
      <div
        className="relative flex items-center justify-center w-full rounded-xl transition-all"
        style={{
          padding: `${px}px`,
          background: `${color}12`,
          border: `1px solid ${color}30`,
        }}
      >
        {/* value badge */}
        <span
          className="absolute -top-2 left-3 px-2 py-0.5 rounded-md text-[9px] font-bold shadow-sm"
          style={{
            background: `${color}`,
            color: "#fff",
          }}
        >
          padding: {px}px
        </span>

        {/* content */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2 text-[11px] text-gray-700 font-(family-name:--font-dm-mono)">
          content
        </div>
      </div>
    );
  }

  if (property === "margin") {
    return (
      <div
        className="relative w-full rounded-xl transition-all"
        style={{
          padding: `${px}px`,
          background: `${color}12`,
          border: `1px solid ${color}30`,
        }}
      >
        <span
          className="absolute -top-2 left-3 px-2 py-0.5 rounded-md text-[9px] font-bold shadow-sm"
          style={{
            background: `${color}`,
            color: "#fff",
          }}
        >
          margin: {px}px
        </span>

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2 text-[11px] text-gray-700 font-(family-name:--font-dm-mono) text-center">
          content
        </div>
      </div>
    );
  }

  // gap preview
  return (
    <div className="relative flex flex-col w-full" style={{ gap: `${px}px` }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2 text-[11px] text-gray-700 font-(family-name:--font-dm-mono) text-center transition-all"
        >
          item {i}
        </div>
      ))}

      {/* gap badge */}
      <span
        className="absolute -right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md text-[9px] font-bold shadow-sm"
        style={{
          background: color,
          color: "#fff",
        }}
      >
        gap: {px}px
      </span>
    </div>
  );
}
// "use client";

// // ─── LivePreview ──────────────────────────────────────────────────────────────
// export function LivePreview({ property, value, color }) {
//   const px = Math.round(value);

//   if (property === "padding") {
//     return (
//       <div
//         className="relative flex items-center justify-center w-full"
//         style={{
//           padding: `${px}px`,
//           background: `${color}0d`,
//           border: `1px dashed ${color}40`,
//           borderRadius: 8,
//         }}
//       >
//         <div className="bg-[#111] border border-[#1e1e1e] rounded px-4 py-2 text-[11px] text-[#555] font-(family-name:--font-dm-mono)">
//           content
//         </div>
//         <span
//           className="absolute top-1 left-2 text-[9px] font-(family-name:--font-dm-mono) font-bold"
//           style={{ color }}
//         >
//           {px}px
//         </span>
//       </div>
//     );
//   }

//   if (property === "margin") {
//     return (
//       <div
//         className="w-full"
//         style={{
//           padding: `${px}px`,
//           background: `${color}0d`,
//           border: `1px dashed ${color}40`,
//           borderRadius: 8,
//         }}
//       >
//         <div className="relative bg-[#111] border border-[#1e1e1e] rounded px-4 py-2 text-[11px] text-[#555] font-(family-name:--font-dm-mono) text-center">
//           content
//           <span
//             className="absolute top-1 left-2 text-[9px] font-(family-name:--font-dm-mono) font-bold"
//             style={{ color }}
//           >
//             {px}px
//           </span>
//         </div>
//       </div>
//     );
//   }

//   // gap
//   return (
//     <div className="relative flex flex-col w-full" style={{ gap: `${px}px` }}>
//       {[1, 2, 3].map((i) => (
//         <div
//           key={i}
//           className="bg-[#111] border border-[#1e1e1e] rounded px-4 py-2 text-[11px] text-[#555] font-(family-name:--font-dm-mono) text-center"
//         >
//           item {i}
//         </div>
//       ))}
//       <span
//         className="absolute -right-1 top-1/2 -translate-y-1/2 ml-2 text-[9px] font-(family-name:--font-dm-mono) font-bold"
//         style={{ color }}
//       >
//         {px}px
//       </span>
//     </div>
//   );
// }
