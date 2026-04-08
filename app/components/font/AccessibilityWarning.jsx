"use client";
import { useState } from "react";

export default function AccessibilityWarning({ isNegativeVw }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-amber-500 text-[16px] shrink-0 mt-0.5">⚠</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-[12px] text-amber-700 font-semibold uppercase tracking-widest">
              WCAG Accessibility Notice
            </p>

            <button
              onClick={() => setDismissed(true)}
              className="text-gray-400 hover:text-gray-700 text-sm transition"
            >
              ✕
            </button>
          </div>

          <p className="text-[13px] text-gray-700 leading-relaxed mb-3">
            Using <span className="text-violet-600 font-medium">vw</span> in{" "}
            <span className="text-violet-600 font-medium">clamp()</span> can
            prevent users from scaling text to 200% via browser zoom — a{" "}
            <span className="text-amber-700 font-medium">
              WCAG 1.4.4 (Resize Text)
            </span>{" "}
            failure.
          </p>

          {isNegativeVw && (
            <div className="bg-white border border-amber-200 rounded-lg px-4 py-3 mb-3">
              <p className="text-[11px] text-amber-700 font-semibold uppercase tracking-widest mb-1">
                Negative vw — Reverse Scaling
              </p>

              <p className="text-[12px] text-gray-700">
                Font size decreases as screen width increases. Verify this is
                intentional.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {[
              {
                label: "WCAG 1.4.4",
                href: "https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html",
              },
              {
                label: "Research",
                href: "https://adrianroselli.com/2019/12/responsive-type-and-zoom.html",
              },
              {
                label: "MDN clamp",
                href: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
              },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                className="text-[11px] px-3 py-1 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";
// import { useState } from "react";

// export default function AccessibilityWarning({ isNegativeVw, theme }) {
//   const [dismissed, setDismissed] = useState(false);
//   const isDark = theme === "dark";

//   if (dismissed) return null;

//   const bg = isDark
//     ? "bg-[#1a1200] border-[#3a2800]"
//     : "bg-amber-50 border-amber-200";
//   const innerBg = isDark
//     ? "bg-[#1f1500] border-[#4a3300]"
//     : "bg-amber-100/60 border-amber-200";
//   const bodyText = isDark ? "text-[#fbbf24]" : "text-amber-700";
//   const innerTxt = isDark ? "text-[#f59e0b]" : "text-amber-600";
//   const linkCls = isDark
//     ? "text-[#f59e0b] hover:text-amber-300 border-[#3a2800] hover:border-amber-400/30"
//     : "text-amber-600 hover:text-amber-800 border-amber-200 hover:border-amber-400";
//   const xCls = isDark
//     ? "text-[#888] hover:text-[#ccc]"
//     : "text-amber-400 hover:text-amber-600";

//   return (
//     <div className={`border rounded-2xl p-5 mb-6 transition-colors ${bg}`}>
//       <div className="flex items-start gap-3">
//         <span className="text-amber-400 text-[16px] shrink-0 mt-0.5">⚠</span>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-start justify-between gap-2 mb-1">
//             <p className="text-[12px] text-amber-400 font-mono font-semibold uppercase tracking-widest">
//               WCAG Accessibility Notice
//             </p>
//             <button
//               onClick={() => setDismissed(true)}
//               className={`shrink-0 text-[14px] font-mono cursor-pointer transition-colors leading-none ${xCls}`}
//               title="Dismiss"
//             >
//               ✕
//             </button>
//           </div>

//           <p
//             className={`text-[12px] font-mono leading-relaxed mb-3 ${bodyText}`}
//           >
//             Using <span className="text-amber-500">vw</span> in{" "}
//             <span className="text-amber-500">clamp()</span> can prevent users
//             from scaling text to 200% via browser zoom — a{" "}
//             <span className="text-amber-400">WCAG 1.4.4 (Resize Text, AA)</span>{" "}
//             failure. Always test zoom behavior before shipping.
//           </p>

//           {isNegativeVw && (
//             <div className={`border rounded-lg px-3.5 py-3 mb-3 ${innerBg}`}>
//               <p className="text-[11px] text-amber-500 font-mono font-semibold mb-1 uppercase tracking-widest">
//                 Negative vw — Reverse Scaling Active
//               </p>
//               <p
//                 className={`text-[11px] font-mono leading-relaxed ${innerTxt}`}
//               >
//                 Your config uses a negative vw value. Font size will{" "}
//                 <span className="text-amber-400">decrease</span> as screen width
//                 increases. This is valid CSS but an uncommon pattern — verify
//                 this is intentional.
//               </p>
//             </div>
//           )}

//           <div className="flex flex-wrap gap-3 mt-2">
//             {[
//               {
//                 label: "WCAG 1.4.4",
//                 href: "https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html",
//               },
//               {
//                 label: "Adrian Roselli's research",
//                 href: "https://adrianroselli.com/2019/12/responsive-type-and-zoom.html",
//               },
//               {
//                 label: "MDN clamp()",
//                 href: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
//               },
//             ].map(({ label, href }) => (
//               <a
//                 key={label}
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`text-[10px] font-mono transition-colors border rounded px-2.5 py-1 no-underline ${linkCls}`}
//               >
//                 {label} ↗
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
