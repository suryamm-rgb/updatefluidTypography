"use client";

import { useState } from "react";

// ─── DocsTab ──────────────────────────────────────────────────────────────────
export function DocsTab() {
  return (
    <div className="px-5 sm:px-8 lg:px-10 py-10 sm:py-14 bg-white">
      <div className="max-w-3xl mx-auto space-y-14">
        {/* Intro */}
        <section>
          <p className="text-[10px] sm:text-[11px] text-[#6b7280] uppercase tracking-[0.18em] mb-3">
            Overview
          </p>

          <h2 className="font-(family-name:--font-syne) text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111] mb-4 leading-tight">
            Fluid Spacing with <span className="text-violet-600">clamp()</span>
          </h2>

          <p className="text-[13px] sm:text-[14px] text-[#374151] leading-relaxed">
            Fluid spacing means your spacing values — padding, margin, gap —
            automatically scale between a minimum and maximum size depending on
            the viewport width. No media queries, no breakpoint jumps. Just
            smooth, continuous scaling using the CSS{" "}
            <code className="text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded text-[12px]">
              clamp()
            </code>{" "}
            function.
          </p>
        </section>

        <Divider />

        {/* clamp() explained */}
        <section>
          <Tag>The Formula</Tag>

          <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-[#111] mb-3">
            How clamp() works
          </h3>

          <p className="text-[13px] text-[#4b5563] leading-relaxed mb-5">
            <code className="text-[#111] bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">
              clamp(min, preferred, max)
            </code>{" "}
            takes three values. The browser uses the preferred value unless it
            goes below the min or above the max.
          </p>

          <CodeBlock>
            {`/* clamp(minimum, preferred, maximum) */
padding: clamp(1rem, 2.5vw + 0.5rem, 3rem);
/*              ↑         ↑              ↑
           smallest   fluid middle   largest  */`}
          </CodeBlock>

          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {[
              {
                label: "Minimum",
                color: "#7c3aed",
                desc: "The smallest value — used when the viewport is narrow.",
              },
              {
                label: "Preferred",
                color: "#0891b2",
                desc: "A fluid expression using vw units. Scales with the viewport.",
              },
              {
                label: "Maximum",
                color: "#16a34a",
                desc: "The largest value — used when the viewport is wide.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mb-2"
                  style={{ backgroundColor: item.color }}
                />

                <p
                  className="text-[12px] font-semibold mb-1"
                  style={{ color: item.color }}
                >
                  {item.label}
                </p>

                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Padding */}
        <section>
          <Tag color="#7c3aed">Padding</Tag>

          <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-[#111] mb-3">
            Fluid Padding
          </h3>

          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            Padding is the space <strong className="text-[#111]">inside</strong>{" "}
            an element, between its content and border.
          </p>

          <CodeBlock>
            {`/* Static padding — same at every screen size */
.card { padding: 32px; }

/* Fluid padding — scales from 16px → 48px */
.card { padding: clamp(1rem, 3vw + 0.25rem, 3rem); }

/* Asymmetric fluid padding */
.section {
  padding-top:    clamp(2rem, 5vw, 6rem);
  padding-bottom: clamp(2rem, 5vw, 6rem);
  padding-left:   clamp(1rem, 3vw, 4rem);
  padding-right:  clamp(1rem, 3vw, 4rem);
}`}
          </CodeBlock>

          <InfoBox title="When to use fluid padding">
            Page sections, hero areas, cards, modals, and buttons benefit most.
          </InfoBox>
        </section>

        <Divider />

        {/* Margin */}
        <section>
          <Tag color="#0891b2">Margin</Tag>

          <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-[#111] mb-3">
            Fluid Margin
          </h3>

          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            Margin is the space outside an element.
          </p>

          <CodeBlock>
            {`/* Static margin */
.heading { margin-bottom: 24px; }

/* Fluid margin — scales from 16px → 48px */
.heading { margin-bottom: clamp(1rem, 2vw + 0.5rem, 3rem); }

/* Fluid horizontal centering offset */
.container {
  margin-left:  clamp(1rem, 5vw, 8rem);
  margin-right: clamp(1rem, 5vw, 8rem);
}`}
          </CodeBlock>

          <InfoBox title="Tip — don't fluid everything">
            Fluid margin works best for vertical rhythm between sections.
          </InfoBox>
        </section>

        <Divider />

        {/* Gap */}
        <section>
          <Tag color="#16a34a">Gap</Tag>

          <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-[#111] mb-3">
            Fluid Gap
          </h3>

          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            Gap controls spacing between children in flexbox or grid.
          </p>

          <CodeBlock>
            {`/* Static gap */
.grid { gap: 24px; }

/* Fluid gap — scales from 12px → 40px */
.grid { gap: clamp(0.75rem, 2vw + 0.25rem, 2.5rem); }

/* Separate row and column gap */
.grid {
  row-gap:    clamp(1rem, 3vw, 3rem);
  column-gap: clamp(0.5rem, 2vw, 2rem);
}`}
          </CodeBlock>

          <InfoBox title="Fluid gap + fluid columns = zero breakpoints">
            Combine fluid gap with auto-fit layouts.
          </InfoBox>
        </section>

        <Divider />

        {/* Footer */}
        <div className="border border-gray-200 bg-gray-50 rounded-xl p-5 text-center">
          <p className="text-[13px] text-gray-600">
            Ready to generate?{" "}
            <span className="text-gray-800 font-medium">
              Switch to Generator
            </span>{" "}
            or <span className="text-violet-600 font-semibold">Scale</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-gray-200" />;
}

function Tag({ children, color = "#555" }) {
  return (
    <span
      className="inline-block bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-[10px] uppercase tracking-widest mb-3"
      style={{ color }}
    >
      {children}
    </span>
  );
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === "string" ? children : "";

  const handleCopy = () => {
    navigator.clipboard?.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={handleCopy}
        className={`absolute top-3 right-3 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border transition-all duration-200 ${
          copied
            ? "border-violet-500 text-violet-600 bg-violet-50"
            : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700"
        }`}
      >
        {copied ? "✓ copied" : "copy"}
      </button>

      <pre className="text-[12px] text-gray-700 leading-relaxed p-5 pr-16 m-0 overflow-x-auto font-(family-name:--font-dm-mono)">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function InfoBox({ title, children }) {
  return (
    <div className="mt-4 bg-violet-50 border border-violet-200 border-l-2 border-l-violet-500 rounded-r-xl px-4 py-3.5">
      <p className="text-[10px] text-violet-700 uppercase tracking-widest mb-1.5">
        {title}
      </p>
      <p className="text-[13px] text-gray-700 leading-relaxed m-0">
        {children}
      </p>
    </div>
  );
}
// "use client";

// import { useState } from "react";

// // ─── DocsTab ──────────────────────────────────────────────────────────────────
// export function DocsTab() {
//   return (
//     <div className="px-4 sm:px-8 py-8 sm:py-12">
//       <div className="max-w-3xl mx-auto space-y-12">
//         {/* Intro */}
//         <section>
//           <p className="text-[10px] sm:text-[11px] text-[#444] uppercase tracking-widest mb-3">
//             Overview
//           </p>
//           <h2 className="font-(family-name:--font-syne) text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
//             Fluid Spacing with <span className="text-violet-400">clamp()</span>
//           </h2>
//           <p className="text-[12px] sm:text-[14px] lg:text-[14px] text-[#888] leading-relaxed">
//             Fluid spacing means your spacing values — padding, margin, gap —
//             automatically scale between a minimum and maximum size depending on
//             the viewport width. No media queries, no breakpoint jumps. Just
//             smooth, continuous scaling using the CSS{" "}
//             <code className="text-violet-300 bg-[#1a1a1a] px-1.5 py-0.5 rounded text-[11px] sm:text-[12px]">
//               clamp()
//             </code>{" "}
//             function.
//           </p>
//         </section>

//         <Divider />

//         {/* clamp() explained */}
//         <section>
//           <Tag>The Formula</Tag>
//           <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3">
//             How clamp() works
//           </h3>
//           <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#666] leading-relaxed mb-5">
//             <code className="text-[#aaa] bg-[#111] px-1.5 py-0.5 rounded text-[11px] sm:text-[12px]">
//               clamp(min, preferred, max)
//             </code>{" "}
//             takes three values. The browser uses the preferred value unless it
//             goes below the min or above the max.
//           </p>

//           <CodeBlock>
//             {`/* clamp(minimum, preferred, maximum) */
// padding: clamp(1rem, 2.5vw + 0.5rem, 3rem);
// /*              ↑         ↑              ↑
//            smallest   fluid middle   largest  */`}
//           </CodeBlock>

//           <div className="grid sm:grid-cols-3 gap-3 mt-5">
//             {[
//               {
//                 label: "Minimum",
//                 color: "#a78bfa",
//                 desc: "The smallest value — used when the viewport is narrow.",
//               },
//               {
//                 label: "Preferred",
//                 color: "#67e8f9",
//                 desc: "A fluid expression using vw units. Scales with the viewport.",
//               },
//               {
//                 label: "Maximum",
//                 color: "#86efac",
//                 desc: "The largest value — used when the viewport is wide.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4"
//               >
//                 <div
//                   className="w-1.5 h-1.5 rounded-full mb-2"
//                   style={{ backgroundColor: item.color }}
//                 />
//                 <p
//                   className="text-[11px] sm:text-[12px] font-bold mb-1"
//                   style={{ color: item.color }}
//                 >
//                   {item.label}
//                 </p>
//                 <p className="text-[12px] sm:text-[12px] lg:text-[13px] text-[#555] leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <Divider />

//         {/* Padding */}
//         <section>
//           <Tag color="#a78bfa">Padding</Tag>
//           <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3">
//             Fluid Padding
//           </h3>
//           <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#666] leading-relaxed mb-4">
//             Padding is the space <strong className="text-[#888]">inside</strong>{" "}
//             an element, between its content and border. Fluid padding is
//             especially useful for section containers, cards, and buttons — they
//             breathe more on large screens and stay compact on mobile.
//           </p>

//           <CodeBlock>
//             {`/* Static padding — same at every screen size */
// .card { padding: 32px; }

// /* Fluid padding — scales from 16px → 48px */
// .card { padding: clamp(1rem, 3vw + 0.25rem, 3rem); }

// /* Asymmetric fluid padding */
// .section {
//   padding-top:    clamp(2rem, 5vw, 6rem);
//   padding-bottom: clamp(2rem, 5vw, 6rem);
//   padding-left:   clamp(1rem, 3vw, 4rem);
//   padding-right:  clamp(1rem, 3vw, 4rem);
// }`}
//           </CodeBlock>

//           <InfoBox title="When to use fluid padding">
//             Page sections, hero areas, cards, modals, and buttons benefit most.
//             Avoid fluid padding on small utility elements like badges or tags
//             where tiny pixel changes are unnoticeable and just add complexity.
//           </InfoBox>
//         </section>

//         <Divider />

//         {/* Margin */}
//         <section>
//           <Tag color="#67e8f9">Margin</Tag>
//           <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3">
//             Fluid Margin
//           </h3>
//           <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#666] leading-relaxed mb-4">
//             Margin is the space <strong className="text-[#888]">outside</strong>{" "}
//             an element, pushing it away from its neighbours. Fluid margins let
//             your layout breathe naturally — tighter on small screens, more
//             generous on large ones.
//           </p>

//           <CodeBlock>
//             {`/* Static margin */
// .heading { margin-bottom: 24px; }

// /* Fluid margin — scales from 16px → 48px */
// .heading { margin-bottom: clamp(1rem, 2vw + 0.5rem, 3rem); }

// /* Fluid horizontal centering offset */
// .container {
//   margin-left:  clamp(1rem, 5vw, 8rem);
//   margin-right: clamp(1rem, 5vw, 8rem);
// }`}
//           </CodeBlock>

//           <InfoBox title="Tip — don't fluid everything">
//             Fluid margin works best for vertical rhythm between sections and
//             headings. Horizontal margins on containers are often better handled
//             with{" "}
//             <code className="text-[#aaa] mx-1 bg-[#111] px-1 rounded text-[11px]">
//               max-width
//             </code>
//             + auto margins instead.
//           </InfoBox>
//         </section>

//         <Divider />

//         {/* Gap */}
//         <section>
//           <Tag color="#86efac">Gap</Tag>
//           <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3">
//             Fluid Gap
//           </h3>
//           <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#666] leading-relaxed mb-4">
//             Gap controls spacing between children in a{" "}
//             <code className="text-[#aaa] bg-[#111] px-1 rounded text-[11px]">
//               flexbox
//             </code>{" "}
//             or{" "}
//             <code className="text-[#aaa] bg-[#111] px-1 rounded text-[11px]">
//               grid
//             </code>{" "}
//             container. Fluid gap is one of the most practical uses — your grid
//             items stay well spaced on large screens and stay compact on mobile
//             without any breakpoints.
//           </p>

//           <CodeBlock>
//             {`/* Static gap */
// .grid { gap: 24px; }

// /* Fluid gap — scales from 12px → 40px */
// .grid { gap: clamp(0.75rem, 2vw + 0.25rem, 2.5rem); }

// /* Separate row and column gap */
// .grid {
//   row-gap:    clamp(1rem, 3vw, 3rem);
//   column-gap: clamp(0.5rem, 2vw, 2rem);
// }`}
//           </CodeBlock>

//           <InfoBox title="Fluid gap + fluid columns = zero breakpoints">
//             Combine fluid gap with{" "}
//             <code className="text-[#aaa] mx-1 bg-[#111] px-1 rounded text-[11px]">
//               grid-template-columns: repeat(auto-fit, minmax(...))
//             </code>
//             for layouts that adapt entirely without a single media query.
//           </InfoBox>
//         </section>

//         <Divider />

//         {/* CSS Custom Properties */}
//         <section>
//           <Tag>Design Tokens</Tag>
//           <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3">
//             Using CSS Custom Properties
//           </h3>
//           <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#666] leading-relaxed mb-4">
//             The best practice is to define all your fluid spacing values as CSS
//             custom properties on{" "}
//             <code className="text-[#aaa] bg-[#111] px-1 rounded text-[11px]">
//               :root
//             </code>{" "}
//             once, then reference them throughout your stylesheet. This is
//             exactly what the <strong className="text-[#888]">Scale tab</strong>{" "}
//             generates.
//           </p>

//           <CodeBlock>
//             {`:root {
//   --space-xs:  clamp(0.25rem, 0.5vw + 0.1rem, 0.5rem);
//   --space-sm:  clamp(0.5rem,  1vw  + 0.25rem, 1rem);
//   --space-md:  clamp(1rem,    2vw  + 0.5rem,  2rem);
//   --space-lg:  clamp(1.5rem,  3vw  + 0.75rem, 3rem);
//   --space-xl:  clamp(2rem,    4vw  + 1rem,    4rem);
//   --space-2xl: clamp(3rem,    6vw  + 1.5rem,  6rem);
//   --space-3xl: clamp(4rem,    8vw  + 2rem,    8rem);
// }

// /* Usage */
// .section    { padding:       var(--space-xl); }
// .card       { padding:       var(--space-md); }
// .grid       { gap:           var(--space-sm); }
// .heading    { margin-bottom: var(--space-lg); }`}
//           </CodeBlock>
//         </section>

//         <Divider />

//         {/* Best practices */}
//         <section>
//           <Tag>Best Practices</Tag>
//           <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-white mb-5">
//             Guidelines
//           </h3>

//           <div className="space-y-3">
//             {[
//               {
//                 num: "01",
//                 title: "Start with a scale, not one-offs",
//                 body: "Define a consistent spacing scale (xs → 3xl) and always pull from it. Avoid generating ad-hoc clamp() values for every property — use your tokens.",
//               },
//               {
//                 num: "02",
//                 title: "Match breakpoints to your actual design range",
//                 body: "The min viewport and max viewport in this tool should match where your design actually starts and ends — typically 320px → 1280px or 375px → 1440px.",
//               },
//               {
//                 num: "03",
//                 title: "Keep min/max ratios reasonable",
//                 body: "A 2× to 4× ratio between min and max spacing is a good rule of thumb. Going from 4px to 128px on a single token will feel jarring on viewport resize.",
//               },
//               {
//                 num: "04",
//                 title: "Test the live preview before copying",
//                 body: "Use the scaling curve scrubber to check the value at typical breakpoints (375px, 768px, 1280px) before pasting into your project.",
//               },
//               {
//                 num: "05",
//                 title: "Fluid spacing ≠ fluid typography",
//                 body: "They use the same clamp() mechanism but serve different purposes. Use separate tokens — --space-* for spacing and --text-* for font sizes — even if the math is similar.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.num}
//                 className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4 flex gap-4"
//               >
//                 <span className="text-[11px] text-[#2a2a2a] font-(family-name:--font-dm-mono) font-bold shrink-0 mt-0.5 w-6">
//                   {item.num}
//                 </span>
//                 <div>
//                   <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-bold text-[#888] mb-1">
//                     {item.title}
//                   </p>
//                   <p className="text-[12px] sm:text-[12px] lg:text-[13px] text-[#555] leading-relaxed">
//                     {item.body}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <Divider />

//         {/* Browser support */}
//         <section>
//           <Tag>Browser Support</Tag>
//           <h3 className="font-(family-name:--font-syne) text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4">
//             Compatibility
//           </h3>
//           <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#666] leading-relaxed mb-5">
//             <code className="text-[#aaa] bg-[#111] px-1.5 py-0.5 rounded text-[11px] sm:text-[12px]">
//               clamp()
//             </code>{" "}
//             has excellent browser support and has been available in all major
//             browsers since 2020.
//           </p>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             {[
//               { browser: "Chrome", version: "79+", status: "✓" },
//               { browser: "Firefox", version: "75+", status: "✓" },
//               { browser: "Safari", version: "13.1+", status: "✓" },
//               { browser: "Edge", version: "79+", status: "✓" },
//             ].map((b) => (
//               <div
//                 key={b.browser}
//                 className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg px-3.5 py-3 text-center"
//               >
//                 <p className="text-[18px] font-bold text-[#86efac] m-0">
//                   {b.status}
//                 </p>
//                 <p className="text-[11px] sm:text-[12px] lg:text-[13px] text-[#888] mt-1 m-0">
//                   {b.browser}
//                 </p>
//                 <p className="text-[10px] sm:text-[11px] text-[#333] m-0">
//                   {b.version}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Footer nudge */}
//         <div className="border border-[#1e1e1e] rounded-xl p-5 text-center">
//           <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#444] m-0">
//             Ready to generate?{" "}
//             <span className="text-[#888]">Switch to the</span>{" "}
//             <span className="text-violet-400 font-bold">Generator</span>{" "}
//             <span className="text-[#888]">or</span>{" "}
//             <span className="text-violet-400 font-bold">Scale</span>{" "}
//             <span className="text-[#888]">tab above.</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// function Divider() {
//   return <div className="h-px bg-[#141414]" />;
// }

// function Tag({ children, color = "#555" }) {
//   return (
//     <span
//       className="inline-block bg-[#111] border border-[#1e1e1e] rounded px-2 py-0.5 text-[10px] uppercase tracking-widest mb-3"
//       style={{ color }}
//     >
//       {children}
//     </span>
//   );
// }

// function CodeBlock({ children }) {
//   const [copied, setCopied] = useState(false);
//   const text = typeof children === "string" ? children : "";

//   const handleCopy = () => {
//     navigator.clipboard?.writeText(text.trim());
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="relative bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl overflow-hidden">
//       <button
//         onClick={handleCopy}
//         className={`absolute top-3 right-3 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border transition-all duration-200 cursor-pointer ${
//           copied
//             ? "border-violet-400/60 text-violet-400 bg-violet-400/10"
//             : "border-[#2a2a2a] text-[#333] hover:border-[#444] hover:text-[#666]"
//         }`}
//       >
//         {copied ? "✓" : "copy"}
//       </button>
//       <pre className="text-[11px] sm:text-[11px] lg:text-[12px] text-[#666] leading-relaxed p-5 pr-16 m-0 overflow-x-auto font-(family-name:--font-dm-mono)">
//         <code>{children}</code>
//       </pre>
//     </div>
//   );
// }

// function InfoBox({ title, children }) {
//   return (
//     <div className="mt-4 bg-[#0d0d0d] border border-[#1e1e1e] border-l-2 border-l-violet-400/40 rounded-r-xl px-4 py-3.5">
//       <p className="text-[10px] sm:text-[10px] lg:text-[11px] text-violet-400/70 uppercase tracking-widest mb-1.5">
//         {title}
//       </p>
//       <p className="text-[12px] sm:text-[12px] lg:text-[13px] text-[#555] leading-relaxed m-0">
//         {children}
//       </p>
//     </div>
//   );
// }
