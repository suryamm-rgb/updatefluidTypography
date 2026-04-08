"use client";

import { useRef } from "react";
import { valueAtVw } from "./Clamp";

export function CurveChart({
  minPx,
  maxPx,
  minVw,
  maxVw,
  currentVw,
  color,
  onScrub,
}) {
  const W = 480,
    H = 150;

  const pL = 42,
    pR = 16,
    pT = 14,
    pB = 30;

  const cW = W - pL - pR;
  const cH = H - pT - pB;

  const VW_MIN = 200,
    VW_MAX = 1600;

  const tx = (vw) => pL + ((vw - VW_MIN) / (VW_MAX - VW_MIN)) * cW;

  const ty = (sp) => {
    const spMax = maxPx * 1.25 || 1;
    return pT + cH - (sp / spMax) * cH;
  };

  const pts = [];
  for (let vw = VW_MIN; vw <= VW_MAX; vw += 10) {
    pts.push([tx(vw), ty(valueAtVw(minPx, maxPx, minVw, maxVw, vw))]);
  }

  const path = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  const fill = path + ` L${tx(VW_MAX)},${ty(0)} L${tx(VW_MIN)},${ty(0)} Z`;

  const curX = tx(currentVw);
  const curY = ty(valueAtVw(minPx, maxPx, minVw, maxVw, currentVw));

  const curVal = valueAtVw(minPx, maxPx, minVw, maxVw, currentVw);

  const spMax = maxPx * 1.25 || 1;
  const yTicks = [0, Math.round(spMax * 0.5), Math.round(spMax)];

  const svgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const rect = svgRef.current.getBoundingClientRect();

    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left - pL) / cW));

    onScrub(Math.round(VW_MIN + ratio * (VW_MAX - VW_MIN)));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full cursor-col-resize"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseMove}
      >
        <defs>
          <linearGradient id="sg-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>

          <linearGradient id="sg-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* horizontal grid */}
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={pL}
              y1={ty(v)}
              x2={pL + cW}
              y2={ty(v)}
              stroke="#f1f5f9"
              strokeWidth="1"
            />

            <text
              x={pL - 6}
              y={ty(v) + 4}
              textAnchor="end"
              fill="#94a3b8"
              fontSize="8"
              fontFamily="DM Mono, monospace"
            >
              {v}
            </text>
          </g>
        ))}

        {/* min max verticals */}
        {[minVw, maxVw].map((vw) => (
          <g key={vw}>
            <line
              x1={tx(vw)}
              y1={pT}
              x2={tx(vw)}
              y2={pT + cH}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="3,3"
            />

            <text
              x={tx(vw)}
              y={pT + cH + 16}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="8"
              fontFamily="DM Mono, monospace"
            >
              {vw}
            </text>
          </g>
        ))}

        {/* area */}
        <path d={fill} fill="url(#sg-fill)" />

        {/* curve */}
        <path
          d={path}
          fill="none"
          stroke="url(#sg-line)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* scrub line */}
        <line
          x1={curX}
          y1={pT}
          x2={curX}
          y2={pT + cH}
          stroke="#cbd5e1"
          strokeWidth="1"
          strokeDasharray="3,3"
        />

        {/* dot glow */}
        <circle cx={curX} cy={curY} r="7" fill={color} opacity="0.15" />

        {/* dot */}
        <circle
          cx={curX}
          cy={curY}
          r="4"
          fill="white"
          stroke={color}
          strokeWidth="2"
        />

        {/* tooltip */}
        <g>
          <rect
            x={curX - 26}
            y={curY - 28}
            width="52"
            height="16"
            rx="4"
            fill="white"
            stroke="#e2e8f0"
          />

          <text
            x={curX}
            y={curY - 16}
            textAnchor="middle"
            fill={color}
            fontSize="8"
            fontFamily="DM Mono, monospace"
          >
            {curVal.toFixed(1)}px
          </text>
        </g>

        {/* axes */}
        <line x1={pL} y1={pT} x2={pL} y2={pT + cH} stroke="#e2e8f0" />

        <line x1={pL} y1={pT + cH} x2={pL + cW} y2={pT + cH} stroke="#e2e8f0" />
      </svg>
    </div>
  );
}
// "use client";

// import { useRef } from "react";
// import { valueAtVw } from "./Clamp";
// // ─── CurveChart ───────────────────────────────────────────────────────────────
// export function CurveChart({
//   minPx,
//   maxPx,
//   minVw,
//   maxVw,
//   currentVw,
//   color,
//   onScrub,
// }) {
//   const W = 480,
//     H = 140;
//   const pL = 40,
//     pR = 16,
//     pT = 12,
//     pB = 28;
//   const cW = W - pL - pR;
//   const cH = H - pT - pB;
//   const VW_MIN = 200,
//     VW_MAX = 1600;

//   const tx = (vw) => pL + ((vw - VW_MIN) / (VW_MAX - VW_MIN)) * cW;
//   const ty = (sp) => {
//     const spMax = maxPx * 1.25 || 1;
//     return pT + cH - (sp / spMax) * cH;
//   };

//   const pts = [];
//   for (let vw = VW_MIN; vw <= VW_MAX; vw += 10) {
//     pts.push([tx(vw), ty(valueAtVw(minPx, maxPx, minVw, maxVw, vw))]);
//   }
//   const path = pts
//     .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
//     .join(" ");
//   const fill = path + ` L${tx(VW_MAX)},${ty(0)} L${tx(VW_MIN)},${ty(0)} Z`;

//   const curX = tx(currentVw);
//   const curY = ty(valueAtVw(minPx, maxPx, minVw, maxVw, currentVw));
//   const curVal = valueAtVw(minPx, maxPx, minVw, maxVw, currentVw);
//   const spMax = maxPx * 1.25 || 1;
//   const yTicks = [0, Math.round(spMax * 0.5), Math.round(spMax)];

//   const svgRef = useRef(null);
//   const handleMouseMove = (e) => {
//     if (e.buttons !== 1) return;
//     const rect = svgRef.current.getBoundingClientRect();
//     const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left - pL) / cW));
//     onScrub(Math.round(VW_MIN + ratio * (VW_MAX - VW_MIN)));
//   };

//   return (
//     <svg
//       ref={svgRef}
//       viewBox={`0 0 ${W} ${H}`}
//       className="w-full cursor-col-resize"
//       onMouseMove={handleMouseMove}
//       onMouseDown={handleMouseMove}
//     >
//       <defs>
//         <linearGradient id="sg-fill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor={color} stopOpacity="0.15" />
//           <stop offset="100%" stopColor={color} stopOpacity="0.01" />
//         </linearGradient>
//       </defs>

//       {yTicks.map((v) => (
//         <g key={v}>
//           <line
//             x1={pL}
//             y1={ty(v)}
//             x2={pL + cW}
//             y2={ty(v)}
//             stroke="#1e1e1e"
//             strokeWidth="1"
//           />
//           <text
//             x={pL - 5}
//             y={ty(v) + 4}
//             textAnchor="end"
//             fill="#333"
//             fontSize="8"
//             fontFamily="DM Mono, monospace"
//           >
//             {v}
//           </text>
//         </g>
//       ))}

//       {[minVw, maxVw].map((vw) => (
//         <g key={vw}>
//           <line
//             x1={tx(vw)}
//             y1={pT}
//             x2={tx(vw)}
//             y2={pT + cH}
//             stroke="#2a2a2a"
//             strokeWidth="1"
//             strokeDasharray="3,3"
//           />
//           <text
//             x={tx(vw)}
//             y={pT + cH + 16}
//             textAnchor="middle"
//             fill="#333"
//             fontSize="8"
//             fontFamily="DM Mono, monospace"
//           >
//             {vw}
//           </text>
//         </g>
//       ))}

//       <path d={fill} fill="url(#sg-fill)" />
//       <path
//         d={path}
//         fill="none"
//         stroke={color}
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         opacity="0.9"
//       />

//       <line
//         x1={curX}
//         y1={pT}
//         x2={curX}
//         y2={pT + cH}
//         stroke="#444"
//         strokeWidth="1"
//         strokeDasharray="3,3"
//       />
//       <circle
//         cx={curX}
//         cy={curY}
//         r="4"
//         fill="#080808"
//         stroke={color}
//         strokeWidth="2"
//       />

//       <rect
//         x={curX - 24}
//         y={curY - 25}
//         width="48"
//         height="15"
//         rx="3"
//         fill="#111"
//         stroke="#2a2a2a"
//         strokeWidth="1"
//       />
//       <text
//         x={curX}
//         y={curY - 13}
//         textAnchor="middle"
//         fill={color}
//         fontSize="8"
//         fontFamily="DM Mono, monospace"
//       >
//         {curVal.toFixed(1)}px
//       </text>

//       <line
//         x1={pL}
//         y1={pT}
//         x2={pL}
//         y2={pT + cH}
//         stroke="#2a2a2a"
//         strokeWidth="1"
//       />
//       <line
//         x1={pL}
//         y1={pT + cH}
//         x2={pL + cW}
//         y2={pT + cH}
//         stroke="#2a2a2a"
//         strokeWidth="1"
//       />
//     </svg>
//   );
// }
