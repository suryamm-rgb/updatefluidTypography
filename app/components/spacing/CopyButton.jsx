"use client";

import { useState } from "react";

export function CopyButton({ text, label = "copy", className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded border transition-all duration-200 cursor-pointer ${
        copied
          ? "border-violet-500/60 text-violet-600 bg-violet-50"
          : "border-gray-300 text-gray-700 bg-white hover:border-gray-400 hover:text-gray-900"
      } ${className}`}
    >
      {copied ? "✓ copied" : label}
    </button>
  );
}
// "use client";

// import { useState } from "react";

// // ─── CopyButton ───────────────────────────────────────────────────────────────
// export function CopyButton({ text, label = "copy", className = "" }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard?.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <button
//       onClick={handleCopy}
//       className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded border transition-all duration-200 cursor-pointer ${
//         copied
//           ? "border-violet-400/60 text-violet-400 bg-violet-400/10"
//           : "border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#888]"
//       } ${className}`}
//     >
//       {copied ? "✓ copied" : label}
//     </button>
//   );
// }
