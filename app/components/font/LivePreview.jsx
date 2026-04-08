"use client";
import { useState, useEffect } from "react";

const FONT_OPTIONS = [
  { label: "Syne", value: "var(--font-syne)", category: "Project" },
  { label: "Geist Sans", value: "var(--font-geist-sans)", category: "Project" },
  { label: "DM Mono", value: "var(--font-dm-mono)", category: "Project" },
  { label: "Geist Mono", value: "var(--font-geist-mono)", category: "Project" },

  { label: "Inter", value: "'Inter', sans-serif", category: "Sans" },
  { label: "Outfit", value: "'Outfit', sans-serif", category: "Sans" },
  {
    label: "Plus Jakarta",
    value: "'Plus Jakarta Sans', sans-serif",
    category: "Sans",
  },
  { label: "DM Sans", value: "'DM Sans', sans-serif", category: "Sans" },
  { label: "Nunito", value: "'Nunito', sans-serif", category: "Sans" },
  { label: "Manrope", value: "'Manrope', sans-serif", category: "Sans" },
  { label: "System UI", value: "system-ui, sans-serif", category: "Sans" },

  { label: "Fraunces", value: "'Fraunces', serif", category: "Display" },
  {
    label: "Playfair",
    value: "'Playfair Display', serif",
    category: "Display",
  },
  {
    label: "Cormorant",
    value: "'Cormorant Garamond', serif",
    category: "Display",
  },
  {
    label: "Space Grotesk",
    value: "'Space Grotesk', sans-serif",
    category: "Display",
  },
  { label: "Unbounded", value: "'Unbounded', sans-serif", category: "Display" },

  { label: "Lora", value: "'Lora', serif", category: "Serif" },
  { label: "Merriweather", value: "'Merriweather', serif", category: "Serif" },
  { label: "Georgia", value: "Georgia, serif", category: "Serif" },

  {
    label: "JetBrains",
    value: "'JetBrains Mono', monospace",
    category: "Mono",
  },
  { label: "Fira Code", value: "'Fira Code', monospace", category: "Mono" },
  {
    label: "IBM Plex Mono",
    value: "'IBM Plex Mono', monospace",
    category: "Mono",
  },
];

const CATEGORIES = ["Project", "Sans", "Display", "Serif", "Mono"];

const GOOGLE_FONTS = [
  "Inter",
  "Outfit",
  "Plus+Jakarta+Sans",
  "DM+Sans",
  "Nunito",
  "Manrope",
  "Fraunces",
  "Playfair+Display",
  "Cormorant+Garamond",
  "Space+Grotesk",
  "Unbounded",
  "Lora",
  "Merriweather",
  "JetBrains+Mono",
  "Fira+Code",
  "IBM+Plex+Mono",
];

const PREVIEW_TEXTS = [
  "The quick brown fox jumps over the lazy dog",
  "Fluid typography scales smoothly between breakpoints",
  "Pack my box with five dozen liquor jugs",
  "How vexingly quick daft zebras jump",
];

export default function LivePreview({
  minScreen,
  maxScreen,
  previewScreen,
  setPreviewScreen,
  previewFontSize,
}) {
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0].value);
  const [activeCategory, setActiveCategory] = useState("Project");
  const [previewText, setPreviewText] = useState(PREVIEW_TEXTS[0]);
  const [customText, setCustomText] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    const id = "live-preview-gfonts";
    if (document.getElementById(id)) return;

    const families = GOOGLE_FONTS.map(
      (f) => `family=${f}:wght@400;600;700`,
    ).join("&");

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    document.head.appendChild(link);
  }, []);

  const displayText = showCustom
    ? customText || "Type something…"
    : previewText;
  const filteredFonts = FONT_OPTIONS.filter(
    (f) => f.category === activeCategory,
  );
  const activeFontLabel =
    FONT_OPTIONS.find((f) => f.value === selectedFont)?.label ?? "";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm">
      {/* header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4">
        <p className="text-[11px] uppercase tracking-widest text-gray-600">
          Live Preview
        </p>

        <p className="text-[11px] text-gray-500">
          screen: <span className="text-violet-600">{previewScreen}px</span>
          {" → "}
          font: <span className="text-violet-600">{previewFontSize}px</span>
        </p>
      </div>

      {/* slider */}
      <input
        type="range"
        min={minScreen}
        max={maxScreen}
        value={previewScreen}
        onChange={(e) => setPreviewScreen(Number(e.target.value))}
        className="w-full mb-4 accent-violet-600"
      />

      {/* categories */}
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">
          Font Family
        </p>

        <div className="flex flex-wrap gap-1 mb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-1 rounded text-[10px] border ${
                activeCategory === cat
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {filteredFonts.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedFont(f.value)}
              style={{ fontFamily: f.value }}
              className={`px-2 py-1 rounded border text-[11px] ${
                selectedFont === f.value
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* preview text */}
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">
          Preview Text
        </p>

        <div className="flex flex-wrap gap-1">
          {PREVIEW_TEXTS.map((t) => (
            <button
              key={t}
              onClick={() => {
                setShowCustom(false);
                setPreviewText(t);
              }}
              className={`px-2 py-1 rounded border text-[10px] ${
                previewText === t
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              {t.slice(0, 20)}…
            </button>
          ))}

          <button
            onClick={() => setShowCustom(true)}
            className="px-2 py-1 rounded border text-[10px] bg-white border-gray-200"
          >
            Custom
          </button>
        </div>

        {showCustom && (
          <input
            autoFocus
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        )}
      </div>

      {/* preview box */}
      <div className="border border-gray-200 rounded-xl px-3 py-6 sm:px-6 sm:py-10 text-center bg-gray-50">
        <p className="text-xs text-gray-500 mb-2">
          {activeFontLabel} · {previewFontSize}px
        </p>

        <p
          style={{
            fontSize: `${previewFontSize}px`,
            fontFamily: selectedFont,
            lineHeight: 1.3,
          }}
          className="text-gray-900 break-words"
        >
          {displayText}
        </p>
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-gray-500">
        <span>{minScreen}px</span>
        <span className="text-violet-600">{previewScreen}px</span>
        <span>{maxScreen}px</span>
      </div>
    </div>
  );
}
// "use client";
// import { useState, useEffect } from "react";

// const FONT_OPTIONS = [
//   // ── Project fonts ─────────────────────────────────────────
//   { label: "Syne", value: "var(--font-syne)", category: "Project" },
//   { label: "Geist Sans", value: "var(--font-geist-sans)", category: "Project" },
//   { label: "DM Mono", value: "var(--font-dm-mono)", category: "Project" },
//   { label: "Geist Mono", value: "var(--font-geist-mono)", category: "Project" },
//   // ── Sans-serif ────────────────────────────────────────────
//   { label: "Inter", value: "'Inter', sans-serif", category: "Sans" },
//   { label: "Outfit", value: "'Outfit', sans-serif", category: "Sans" },
//   {
//     label: "Plus Jakarta",
//     value: "'Plus Jakarta Sans', sans-serif",
//     category: "Sans",
//   },
//   { label: "DM Sans", value: "'DM Sans', sans-serif", category: "Sans" },
//   { label: "Nunito", value: "'Nunito', sans-serif", category: "Sans" },
//   { label: "Manrope", value: "'Manrope', sans-serif", category: "Sans" },
//   { label: "System UI", value: "system-ui, sans-serif", category: "Sans" },
//   // ── Display / Heading ─────────────────────────────────────
//   { label: "Fraunces", value: "'Fraunces', serif", category: "Display" },
//   {
//     label: "Playfair",
//     value: "'Playfair Display', serif",
//     category: "Display",
//   },
//   {
//     label: "Cormorant",
//     value: "'Cormorant Garamond', serif",
//     category: "Display",
//   },
//   {
//     label: "Space Grotesk",
//     value: "'Space Grotesk', sans-serif",
//     category: "Display",
//   },
//   { label: "Unbounded", value: "'Unbounded', sans-serif", category: "Display" },
//   // ── Serif ─────────────────────────────────────────────────
//   { label: "Lora", value: "'Lora', serif", category: "Serif" },
//   { label: "Merriweather", value: "'Merriweather', serif", category: "Serif" },
//   { label: "Georgia", value: "Georgia, serif", category: "Serif" },
//   // ── Mono ──────────────────────────────────────────────────
//   {
//     label: "JetBrains",
//     value: "'JetBrains Mono', monospace",
//     category: "Mono",
//   },
//   { label: "Fira Code", value: "'Fira Code', monospace", category: "Mono" },
//   {
//     label: "IBM Plex Mono",
//     value: "'IBM Plex Mono', monospace",
//     category: "Mono",
//   },
// ];

// const CATEGORIES = ["Project", "Sans", "Display", "Serif", "Mono"];

// // Google Fonts that need to be loaded at runtime (project fonts are already loaded)
// const GOOGLE_FONTS = [
//   "Inter",
//   "Outfit",
//   "Plus+Jakarta+Sans",
//   "DM+Sans",
//   "Nunito",
//   "Manrope",
//   "Fraunces",
//   "Playfair+Display",
//   "Cormorant+Garamond",
//   "Space+Grotesk",
//   "Unbounded",
//   "Lora",
//   "Merriweather",
//   "JetBrains+Mono",
//   "Fira+Code",
//   "IBM+Plex+Mono",
// ];

// const PREVIEW_TEXTS = [
//   "The quick brown fox jumps over the lazy dog",
//   "Fluid typography scales smoothly between breakpoints",
//   "Pack my box with five dozen liquor jugs",
//   "How vexingly quick daft zebras jump",
// ];

// export default function LivePreview({
//   minScreen,
//   maxScreen,
//   previewScreen,
//   setPreviewScreen,
//   previewFontSize,
//   theme,
// }) {
//   const isDark = theme === "dark";

//   const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0].value);
//   const [activeCategory, setActiveCategory] = useState("Project");
//   const [previewText, setPreviewText] = useState(PREVIEW_TEXTS[0]);
//   const [customText, setCustomText] = useState("");
//   const [showCustom, setShowCustom] = useState(false);

//   // ── Inject Google Fonts safely after mount (avoids SSR mismatch) ──────────
//   useEffect(() => {
//     const id = "live-preview-gfonts";
//     if (document.getElementById(id)) return;
//     const families = GOOGLE_FONTS.map(
//       (f) => `family=${f}:wght@400;600;700`,
//     ).join("&");
//     const link = document.createElement("link");
//     link.id = id;
//     link.rel = "stylesheet";
//     link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
//     document.head.appendChild(link);
//   }, []);

//   const muted = isDark ? "text-[#555]" : "text-gray-500";
//   const muted2 = isDark ? "text-[#555]" : "text-gray-500";
//   const cardBg = isDark
//     ? "bg-[#0d0d0d] border-[#1e1e1e]"
//     : "bg-white border-gray-200";
//   const innerBg = isDark
//     ? "bg-[#111] border-[#1e1e1e]"
//     : "bg-gray-50 border-gray-200";
//   const inputCls = isDark
//     ? "bg-[#111] border-[#2a2a2a] text-white focus:border-violet-400"
//     : "bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-400";
//   const btnIdle = isDark
//     ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-[#888]"
//     : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600";
//   const btnActive = "bg-violet-500/20 border-violet-400/50 text-violet-400";
//   const catIdle = isDark
//     ? "text-[#444] hover:text-[#777] border-transparent"
//     : "text-gray-300 hover:text-gray-500 border-transparent";
//   const catActive = isDark
//     ? "text-violet-400 border-violet-400/40"
//     : "text-violet-600 border-violet-300";

//   const displayText = showCustom
//     ? customText || "Type something…"
//     : previewText;
//   const filteredFonts = FONT_OPTIONS.filter(
//     (f) => f.category === activeCategory,
//   );
//   const activeFontLabel =
//     FONT_OPTIONS.find((f) => f.value === selectedFont)?.label ?? "";

//   return (
//     <div className={`border rounded-2xl p-7 ${cardBg}`}>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
//         <p
//           className={`text-[11px] uppercase tracking-widest font-mono ${muted}`}
//         >
//           Live Preview
//         </p>
//         <p className={`text-[12px] font-mono ${muted}`}>
//           screen: <span className="text-violet-400">{previewScreen}px</span>
//           {" → "}
//           font: <span className="text-violet-400">{previewFontSize}px</span>
//         </p>
//       </div>

//       {/* Screen slider */}
//       <input
//         type="range"
//         min={minScreen}
//         max={maxScreen}
//         value={previewScreen}
//         onChange={(e) => setPreviewScreen(Number(e.target.value))}
//         className="w-full mb-6 accent-violet-400"
//       />

//       {/* Font family picker */}
//       <div className="mb-5">
//         <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
//           <p
//             className={`text-[10px] uppercase tracking-widest font-mono ${muted2}`}
//           >
//             Font Family
//           </p>
//           {/* Category tabs */}
//           <div className="flex gap-1">
//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-2.5 py-1 rounded text-[10px] font-mono border cursor-pointer transition-all ${
//                   activeCategory === cat ? catActive : catIdle
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Font pills for active category */}
//         <div className="flex flex-wrap gap-1.5">
//           {filteredFonts.map((f) => (
//             <button
//               key={f.value}
//               onClick={() => setSelectedFont(f.value)}
//               style={{ fontFamily: f.value }}
//               className={`px-3 py-1.5 rounded-lg border text-[12px] cursor-pointer transition-all ${
//                 selectedFont === f.value ? btnActive : btnIdle
//               }`}
//             >
//               {f.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Preview text selector */}
//       <div className="mb-5">
//         <p
//           className={`text-[10px] uppercase tracking-widest font-mono mb-2 ${muted2}`}
//         >
//           Preview Text
//         </p>
//         <div className="flex flex-wrap gap-1.5">
//           {PREVIEW_TEXTS.map((t) => {
//             const isActive = !showCustom && previewText === t;
//             return (
//               <button
//                 key={t}
//                 onClick={() => {
//                   setShowCustom(false);
//                   setPreviewText(t);
//                 }}
//                 className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono cursor-pointer transition-all ${
//                   isActive ? btnActive : btnIdle
//                 }`}
//               >
//                 {t.length > 26 ? t.slice(0, 26) + "…" : t}
//               </button>
//             );
//           })}
//           <button
//             onClick={() => setShowCustom(true)}
//             className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono cursor-pointer transition-all ${
//               showCustom ? btnActive : btnIdle
//             }`}
//           >
//             Custom…
//           </button>
//         </div>

//         {showCustom && (
//           <input
//             autoFocus
//             type="text"
//             value={customText}
//             placeholder="Type your own preview text…"
//             onChange={(e) => setCustomText(e.target.value)}
//             className={`mt-2 w-full border rounded-lg px-3 py-2 text-[13px] font-mono outline-none transition-colors ${inputCls}`}
//           />
//         )}
//       </div>

//       {/* Preview box */}
//       <div className={`border rounded-xl px-6 py-10 text-center ${innerBg}`}>
//         <p
//           className={`text-[9px] uppercase tracking-widest font-mono mb-4 ${muted2}`}
//         >
//           {activeFontLabel} · {previewFontSize}px
//         </p>
//         <p
//           style={{
//             fontSize: `${previewFontSize}px`,
//             fontFamily: selectedFont,
//             transition: "font-size 0.1s, font-family 0.15s",
//             lineHeight: 1.3,
//           }}
//           className={`m-0 ${isDark ? "text-[#e0e0e0]" : "text-gray-900"}`}
//         >
//           {displayText}
//         </p>
//       </div>

//       {/* Size ruler */}
//       <div
//         className={`flex justify-between mt-3 text-[10px] font-mono ${muted2}`}
//       >
//         <span>{minScreen}px</span>
//         <span className="text-violet-400">{previewScreen}px</span>
//         <span>{maxScreen}px</span>
//       </div>
//     </div>
//   );
// }
