"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

function CustomTooltip({ active, payload, isDark }) {
  if (!active || !payload?.length) return null;

  const bg = "bg-white border-gray-200 text-gray-900";
  const mutedT = "text-gray-500";

  return (
    <div
      className={`border rounded-lg px-3.5 py-2.5 font-mono text-[12px] shadow-md ${bg}`}
    >
      <p className={`mb-1 ${mutedT}`}>screen</p>
      <p className="font-semibold">{payload[0].payload.screen}px</p>

      <p className={`mt-1.5 mb-1 ${mutedT}`}>font-size</p>
      <p className="text-violet-600 font-semibold">{payload[0].value}px</p>
    </div>
  );
}

export default function ScaleGraph({ graphData, minScreen, maxScreen, theme }) {
  const cardCls = "bg-white border-gray-200 shadow-sm";

  const muted = "text-gray-600";
  const muted2 = "text-gray-500";

  const tickFill = "#374151";
  const axisLine = "#d1d5db";
  const refLine = "#9ca3af";

  return (
    <div className={`border rounded-2xl p-7 mb-6 ${cardCls}`}>
      <p
        className={`text-[11px] uppercase tracking-widest mb-5 font-mono ${muted}`}
      >
        Scale Visualization
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={graphData}
          margin={{ top: 4, right: 4, left: -10, bottom: 4 }}
        >
          <XAxis
            dataKey="screen"
            tick={{ fill: tickFill, fontSize: 11, fontFamily: "DM Mono" }}
            tickLine={false}
            axisLine={{ stroke: axisLine }}
            tickFormatter={(v) => `${v}px`}
          />

          <YAxis
            tick={{ fill: tickFill, fontSize: 11, fontFamily: "DM Mono" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}px`}
          />

          <Tooltip content={<CustomTooltip />} />

          <ReferenceLine x={minScreen} stroke={refLine} strokeDasharray="4 4" />
          <ReferenceLine x={maxScreen} stroke={refLine} strokeDasharray="4 4" />

          <Line
            type="monotone"
            dataKey="size"
            stroke="#7c3aed"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#7c3aed", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div
        className={`flex justify-center gap-6 mt-2 text-[11px] font-mono ${muted2}`}
      >
        <span>← min screen: {minScreen}px</span>
        <span>max screen: {maxScreen}px →</span>
      </div>
    </div>
  );
}
// "use client";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";

// function CustomTooltip({ active, payload, isDark }) {
//   if (!active || !payload?.length) return null;

//   const bg = isDark
//     ? "bg-[#0f0f0f] border-[#2a2a2a] text-[#e0e0e0]"
//     : "bg-white border-gray-200 text-gray-900";

//   const mutedT = isDark ? "text-[#8b8b8b]" : "text-gray-500";

//   return (
//     <div
//       className={`border rounded-lg px-3.5 py-2.5 font-mono text-[12px] shadow-lg ${bg}`}
//     >
//       <p className={`mb-1 ${mutedT}`}>screen</p>
//       <p className="font-semibold">{payload[0].payload.screen}px</p>

//       <p className={`mt-1.5 mb-1 ${mutedT}`}>font-size</p>
//       <p className="text-violet-500 font-semibold">{payload[0].value}px</p>
//     </div>
//   );
// }

// export default function ScaleGraph({ graphData, minScreen, maxScreen, theme }) {
//   const isDark = theme === "dark";

//   const cardCls = isDark
//     ? "bg-[#0d0d0d] border-[#1e1e1e]"
//     : "bg-white border-gray-200";

//   const muted = isDark ? "text-[#555]" : "text-gray-600";
//   const muted2 = isDark ? "text-[#444]" : "text-gray-600";

//   const tickFill = isDark ? "#444" : "#374151";
//   const axisLine = isDark ? "#1e1e1e" : "#d1d5db";
//   const refLine = isDark ? "#2a2a2a" : "#9ca3af";

//   return (
//     <div className={`border rounded-2xl p-7 mb-6 transition-colors ${cardCls}`}>
//       <p
//         className={`text-[11px] uppercase tracking-widest mb-5 font-mono ${muted}`}
//       >
//         Scale Visualization
//       </p>

//       <ResponsiveContainer width="100%" height={200}>
//         <LineChart
//           data={graphData}
//           margin={{ top: 4, right: 4, left: -10, bottom: 4 }}
//         >
//           <XAxis
//             dataKey="screen"
//             tick={{ fill: tickFill, fontSize: 11, fontFamily: "DM Mono" }}
//             tickLine={false}
//             axisLine={{ stroke: axisLine }}
//             tickFormatter={(v) => `${v}px`}
//           />

//           <YAxis
//             tick={{ fill: tickFill, fontSize: 11, fontFamily: "DM Mono" }}
//             tickLine={false}
//             axisLine={false}
//             tickFormatter={(v) => `${v}px`}
//           />

//           <Tooltip content={<CustomTooltip isDark={isDark} />} />

//           <ReferenceLine x={minScreen} stroke={refLine} strokeDasharray="4 4" />
//           <ReferenceLine x={maxScreen} stroke={refLine} strokeDasharray="4 4" />

//           <Line
//             type="monotone"
//             dataKey="size"
//             stroke="#a78bfa"
//             strokeWidth={2}
//             dot={false}
//             activeDot={{ r: 4, fill: "#a78bfa", strokeWidth: 0 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>

//       <div
//         className={`flex justify-center gap-6 mt-2 text-[11px] font-mono ${muted2}`}
//       >
//         <span>← min screen: {minScreen}px</span>
//         <span>max screen: {maxScreen}px →</span>
//       </div>
//     </div>
//   );
// }
// // "use client";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   ReferenceLine,
// // } from "recharts";

// // function CustomTooltip({ active, payload, isDark }) {
// //   if (!active || !payload?.length) return null;
// //   const bg = isDark
// //     ? "bg-[#0f0f0f] border-[#2a2a2a] text-[#e0e0e0]"
// //     : "bg-white border-gray-200 text-gray-800";
// //   const mutedT = isDark ? "text-[#8b8b8b]" : "text-gray-400";
// //   return (
// //     <div
// //       className={`border rounded-lg px-3.5 py-2.5 font-mono text-[12px] shadow-lg ${bg}`}
// //     >
// //       <p className={`mb-1 ${mutedT}`}>screen</p>
// //       <p className="font-semibold">{payload[0].payload.screen}px</p>
// //       <p className={`mt-1.5 mb-1 ${mutedT}`}>font-size</p>
// //       <p className="text-violet-400 font-semibold">{payload[0].value}px</p>
// //     </div>
// //   );
// // }

// // export default function ScaleGraph({ graphData, minScreen, maxScreen, theme }) {
// //   const isDark = theme === "dark";
// //   const cardCls = isDark
// //     ? "bg-[#0d0d0d] border-[#1e1e1e]"
// //     : "bg-white border-gray-200";
// //   const muted = isDark ? "text-[#555]" : "text-gray-400";
// //   const muted2 = isDark ? "text-[#444]" : "text-gray-400";
// //   const tickFill = isDark ? "#444" : "#9ca3af";
// //   const axisLine = isDark ? "#1e1e1e" : "#e5e7eb";
// //   const refLine = isDark ? "#2a2a2a" : "#d1d5db";

// //   return (
// //     <div className={`border rounded-2xl p-7 mb-6 transition-colors ${cardCls}`}>
// //       <p
// //         className={`text-[11px] uppercase tracking-widest mb-5 font-mono ${muted}`}
// //       >
// //         Scale Visualization
// //       </p>

// //       <ResponsiveContainer width="100%" height={200}>
// //         <LineChart
// //           data={graphData}
// //           margin={{ top: 4, right: 4, left: -10, bottom: 4 }}
// //         >
// //           <XAxis
// //             dataKey="screen"
// //             tick={{ fill: tickFill, fontSize: 11, fontFamily: "DM Mono" }}
// //             tickLine={false}
// //             axisLine={{ stroke: axisLine }}
// //             tickFormatter={(v) => `${v}px`}
// //           />
// //           <YAxis
// //             tick={{ fill: tickFill, fontSize: 11, fontFamily: "DM Mono" }}
// //             tickLine={false}
// //             axisLine={false}
// //             tickFormatter={(v) => `${v}px`}
// //           />
// //           <Tooltip content={<CustomTooltip isDark={isDark} />} />
// //           <ReferenceLine x={minScreen} stroke={refLine} strokeDasharray="4 4" />
// //           <ReferenceLine x={maxScreen} stroke={refLine} strokeDasharray="4 4" />
// //           <Line
// //             type="monotone"
// //             dataKey="size"
// //             stroke="#a78bfa"
// //             strokeWidth={2}
// //             dot={false}
// //             activeDot={{ r: 4, fill: "#a78bfa", strokeWidth: 0 }}
// //           />
// //         </LineChart>
// //       </ResponsiveContainer>

// //       <div
// //         className={`flex justify-center gap-6 mt-2 text-[11px] font-mono ${muted2}`}
// //       >
// //         <span>← min screen: {minScreen}px</span>
// //         <span>max screen: {maxScreen}px →</span>
// //       </div>
// //     </div>
// //   );
// // }
