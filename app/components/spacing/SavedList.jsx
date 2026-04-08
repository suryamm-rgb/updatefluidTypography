"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

// ─── SavedList ────────────────────────────────────────────────────────────────
export function SavedList({ items, onRemove, onClear }) {
  const [copied, setCopied] = useState(false);

  if (items.length === 0) {
    return (
      <div className="border border-dashed border-gray-200 rounded-xl px-4 py-6 text-center bg-white">
        <p className="text-[11px] text-gray-600 m-0">No values saved yet.</p>
        <p className="text-[10px] text-gray-400 mt-1 m-0">
          Hit <span className="text-gray-600">+ Add to list</span> to save a
          value.
        </p>
      </div>
    );
  }

  // IMPORTANT CHANGE HERE
  const allCSS = items
    .map((item) => `${item.name || item.property}: ${item.clamp};`)
    .join("\n");

  const rootCSS = `:root {\n${items
    .map((item) => `  --${item.name || item.property}: ${item.clamp};`)
    .join("\n")}\n}`;

  const handleCopyAll = (format) => {
    navigator.clipboard?.writeText(format === "root" ? rootCSS : allCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Item rows */}
      <div className="space-y-1.5">
        {items.map((item) => {
          const label = item.name || item.property;

          return (
            <div
              key={item.id}
              className="group bg-white border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-3"
            >
              {/* Color dot */}
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />

              {/* Name badge */}
              <span
                className="text-[10px] font-bold shrink-0 w-20 truncate font-(family-name:--font-dm-mono)"
                style={{ color: item.color }}
              >
                {label}
              </span>

              {/* Clamp value */}
              <code className="flex-1 text-[10px] text-gray-600 truncate min-w-0 group-hover:text-gray-800 transition-colors">
                {label}: {item.clamp}
              </code>

              {/* Remove */}
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-gray-700 transition-colors text-[14px] shrink-0 cursor-pointer leading-none"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* Batch actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onClear}
          className="text-[10px] text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-widest cursor-pointer"
        >
          clear all
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => handleCopyAll("plain")}
            className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded border transition-all duration-200 cursor-pointer ${
              copied
                ? "border-violet-500/60 text-violet-600 bg-violet-50"
                : "border-gray-300 text-gray-700 bg-white hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {copied ? "✓ copied" : `copy all (${items.length})`}
          </button>

          <CopyButton text={rootCSS} label=":root {}" />
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-2">
          Preview
        </p>

        <pre className="text-[10px] text-gray-700 m-0 leading-relaxed overflow-x-auto">
          {allCSS}
        </pre>
      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import { CopyButton } from "./CopyButton";

// // ─── SavedList ────────────────────────────────────────────────────────────────
// // Lets users accumulate multiple clamp() values and copy them all at once.
// export function SavedList({ items, onRemove, onClear }) {
//   const [copied, setCopied] = useState(false);

//   if (items.length === 0) {
//     return (
//       <div className="border border-dashed border-[#1e1e1e] rounded-xl px-4 py-6 text-center">
//         <p className="text-[11px] text-[#333] m-0">No values saved yet.</p>
//         <p className="text-[10px] text-[#2a2a2a] mt-1 m-0">
//           Hit <span className="text-[#444]">+ Add to list</span> to save a
//           value.
//         </p>
//       </div>
//     );
//   }

//   const allCSS = items
//     .map((item) => `${item.property}: ${item.clamp};`)
//     .join("\n");

//   const rootCSS = `:root {\n${items
//     .map((item) => `  --${item.name || item.property}: ${item.clamp};`)
//     .join("\n")}\n}`;

//   const handleCopyAll = (format) => {
//     navigator.clipboard?.writeText(format === "root" ? rootCSS : allCSS);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="space-y-3">
//       {/* Item rows */}
//       <div className="space-y-1.5">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="group bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg px-3 py-2.5 flex items-center gap-3"
//           >
//             {/* Color dot */}
//             <div
//               className="w-1.5 h-1.5 rounded-full shrink-0"
//               style={{ backgroundColor: item.color }}
//             />

//             {/* Name badge */}
//             <span
//               className="text-[10px] font-bold shrink-0 w-16 truncate font-(family-name:--font-dm-mono)"
//               style={{ color: item.color }}
//             >
//               {item.name || item.property}
//             </span>

//             {/* Clamp value */}
//             <code className="flex-1 text-[10px] text-[#555] truncate min-w-0 group-hover:text-[#777] transition-colors">
//               {item.property}: {item.clamp}
//             </code>

//             {/* Remove */}
//             <button
//               onClick={() => onRemove(item.id)}
//               className="text-[#2a2a2a] hover:text-[#666] transition-colors text-[14px] shrink-0 cursor-pointer leading-none"
//               aria-label="Remove"
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Batch actions */}
//       <div className="flex items-center justify-between pt-1">
//         <button
//           onClick={onClear}
//           className="text-[10px] text-[#333] hover:text-[#555] transition-colors uppercase tracking-widest cursor-pointer"
//         >
//           clear all
//         </button>
//         <div className="flex gap-2">
//           <button
//             onClick={() => handleCopyAll("plain")}
//             className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded border transition-all duration-200 cursor-pointer ${
//               copied
//                 ? "border-violet-400/60 text-violet-400 bg-violet-400/10"
//                 : "border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#888]"
//             }`}
//           >
//             {copied ? "✓ copied" : `copy all (${items.length})`}
//           </button>
//           <CopyButton text={rootCSS} label=":root {}" />
//         </div>
//       </div>

//       {/* Preview of what will be copied */}
//       <div className="bg-[#0a0a0a] border border-[#141414] rounded-lg p-3">
//         <p className="text-[9px] text-[#2a2a2a] uppercase tracking-widest mb-2">
//           Preview
//         </p>
//         <pre className="text-[10px] text-[#444] m-0 leading-relaxed overflow-x-auto">
//           {allCSS}
//         </pre>
//       </div>
//     </div>
//   );
// }
