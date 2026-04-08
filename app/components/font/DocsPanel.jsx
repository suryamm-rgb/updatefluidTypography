"use client";
import { useState } from "react";

// ─── Full markdown content for download ───────────────────────────────────────

function downloadPDF() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Fluid Typography — Complete Documentation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --violet: #7c3aed; --violet-light: #ede9fe; --border: #e4e4e7; --bg: #ffffff; --bg-subtle: #f9f9fb; --text: #18181b; --muted: #71717a; --green: #16a34a; --red: #dc2626; --amber: #d97706; }
  body { font-family: 'Inter', system-ui, sans-serif; font-size: 13px; line-height: 1.7; color: var(--text); background: var(--bg); max-width: 780px; margin: 0 auto; padding: 48px 40px; }
  .doc-header { border-bottom: 2px solid var(--violet); padding-bottom: 24px; margin-bottom: 40px; }
  .doc-header .badge { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--violet); border: 1px solid #c4b5fd; background: var(--violet-light); border-radius: 4px; padding: 2px 8px; margin-bottom: 12px; }
  .doc-header h1 { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 8px; }
  .doc-header .subtitle { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--muted); }
  .toc { background: var(--bg-subtle); border: 1px solid var(--border); border-left: 3px solid var(--violet); border-radius: 8px; padding: 20px 24px; margin-bottom: 40px; }
  .toc h2 { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); margin-bottom: 12px; }
  .toc ol { padding-left: 18px; } .toc li { font-size: 12px; line-height: 1.9; color: var(--violet); }
  h2 { font-size: 18px; font-weight: 700; letter-spacing: -0.01em; margin-top: 40px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
  h3 { font-size: 12px; font-weight: 600; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-top: 24px; margin-bottom: 10px; }
  p { margin-bottom: 12px; }
  pre { background: #18181b; color: #a78bfa; border-radius: 8px; padding: 16px 20px; font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1.7; margin: 12px 0 20px; white-space: pre-wrap; word-break: break-all; }
  code { font-family: 'JetBrains Mono', monospace; font-size: 11px; background: #f4f4f5; border: 1px solid var(--border); border-radius: 4px; padding: 1px 6px; color: var(--violet); }
  pre code { background: none; border: none; padding: 0; color: inherit; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0 24px; font-size: 12px; }
  thead tr { background: var(--violet); color: white; }
  thead th { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; padding: 10px 14px; text-align: left; }
  tbody tr:nth-child(even) { background: var(--bg-subtle); }
  tbody td { padding: 9px 14px; border-bottom: 1px solid var(--border); font-family: 'JetBrains Mono', monospace; font-size: 11px; vertical-align: top; }
  .box { border: 1px solid var(--border); border-radius: 8px; padding: 14px 18px; margin: 12px 0 20px; background: var(--bg-subtle); }
  .box.accent { border-color: #c4b5fd; background: var(--violet-light); }
  .box.amber { border-color: #fcd34d; background: #fffbeb; }
  .box-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--muted); margin-bottom: 8px; }
  .box.accent .box-label { color: var(--violet); } .box.amber .box-label { color: var(--amber); }
  .steps { margin: 12px 0 20px; }
  .step { display: flex; gap: 16px; margin-bottom: 20px; }
  .step-num { width: 22px; height: 22px; min-width: 22px; border-radius: 50%; background: var(--violet-light); border: 1px solid #c4b5fd; color: var(--violet); font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
  .step-body { flex: 1; }
  .step-title { font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 6px; }
  .step-calc { background: #18181b; border-radius: 6px; padding: 10px 14px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #d4d4d8; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .step-calc .result { color: #a78bfa; font-weight: 600; }
  .step-note { font-size: 11px; color: var(--muted); line-height: 1.6; }
  .compare { margin: 10px 0 14px; }
  .compare-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; border: 1px solid var(--border); border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; background: var(--bg-subtle); }
  .compare-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 8px; grid-column: 1 / -1; }
  .compare-bad { color: var(--red); font-size: 11px; font-family: 'JetBrains Mono', monospace; }
  .compare-good { color: var(--green); font-size: 11px; font-family: 'JetBrains Mono', monospace; }
  .compare-bad::before { content: "X before  "; font-weight: 700; } .compare-good::before { content: "V after  "; font-weight: 700; }
  .zones { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 12px 0 20px; }
  .zone-card { border: 1px solid var(--border); border-radius: 8px; padding: 12px; text-align: center; background: var(--bg-subtle); }
  .zone-card.fluid { border-color: #c4b5fd; background: var(--violet-light); }
  .zone-name { font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 4px; }
  .zone-card.fluid .zone-name { color: var(--violet); }
  .zone-size { font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 700; }
  .zone-card.fluid .zone-size { color: var(--violet); }
  .zone-screen { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--muted); margin-top: 2px; }
  .checklist { list-style: none; margin: 8px 0 16px; }
  .checklist li { font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 5px 0; display: flex; gap: 8px; align-items: flex-start; color: var(--muted); }
  .checklist li::before { content: "[ ]"; color: var(--violet); flex-shrink: 0; }
  .yes { color: var(--green); font-weight: 700; } .no { color: var(--red); font-weight: 700; }
  .doc-footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--border); font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--muted); display: flex; justify-content: space-between; }
  @media print { body { padding: 0; max-width: 100%; } pre, table, .step, .box { page-break-inside: avoid; } }
</style>
</head>
<body>
<div class="doc-header">
  <div class="badge">CSS Utility &middot; Reference</div>
  <h1>Fluid Typography</h1>
  <p class="subtitle">Complete Documentation &mdash; clamp() formula guide</p>
</div>
<div class="toc">
  <h2>Table of Contents</h2>
  <ol>
    <li>What Is Fluid Typography?</li><li>Why Use It?</li><li>How to Use This Tool</li>
    <li>The Formula &mdash; Step by Step</li><li>CSS clamp() Explained</li><li>Units: rem vs px vs em</li>
    <li>Reverse Scaling</li><li>Type Scale &amp; Modular Ratios</li><li>Breakpoint Behavior</li>
    <li>Accessibility Warnings</li><li>Export Formats</li><li>Real-World Examples</li><li>Quick Reference Cheatsheet</li>
  </ol>
</div>
<h2>1. What Is Fluid Typography?</h2>
<p>Fluid typography is a CSS technique where font sizes scale <strong>continuously</strong> as the viewport width changes &mdash; rather than snapping between fixed sizes at specific breakpoints.</p>
<div class="box"><div class="box-label">Old approach &mdash; stepped</div><pre>h1 { font-size: 24px; }
@media (min-width: 768px)  { h1 { font-size: 32px; } }
@media (min-width: 1280px) { h1 { font-size: 48px; } }</pre></div>
<div class="box accent"><div class="box-label">Fluid approach &mdash; one rule</div><pre>h1 { font-size: clamp(1.5rem, 0.66rem + 3.56vw, 3rem); }</pre></div>
<h3>The Three Zones</h3>
<div class="zones">
  <div class="zone-card"><div class="zone-name">min</div><div class="zone-size">24px</div><div class="zone-screen">@ 375px</div></div>
  <div class="zone-card fluid"><div class="zone-name">fluid</div><div class="zone-size">~36px</div><div class="zone-screen">@ 800px</div></div>
  <div class="zone-card"><div class="zone-name">max</div><div class="zone-size">48px</div><div class="zone-screen">@ 1280px</div></div>
</div>
<h2>2. Why Use It?</h2>
<div class="compare">
  <div class="compare-row"><div class="compare-label">Breakpoints needed</div><div class="compare-bad">3&ndash;5 @media rules per element</div><div class="compare-good">Zero &mdash; one clamp() does it all</div></div>
  <div class="compare-row"><div class="compare-label">At unusual widths (e.g. 900px)</div><div class="compare-bad">Looks fine at 768px, awkward at 900px</div><div class="compare-good">Scales perfectly at every width</div></div>
  <div class="compare-row"><div class="compare-label">Adding a new device</div><div class="compare-bad">New breakpoint required</div><div class="compare-good">Already handled &mdash; no change needed</div></div>
  <div class="compare-row"><div class="compare-label">Layout reflow</div><div class="compare-bad">Sudden text jump at breakpoint</div><div class="compare-good">No reflow &mdash; smooth and continuous</div></div>
</div>
<h2>3. How to Use This Tool</h2>
<p>Fill in <strong>four numbers</strong> &mdash; the tool generates your <code>clamp()</code> instantly.</p>
<table><thead><tr><th>Input</th><th>Description</th><th>Example</th></tr></thead><tbody>
  <tr><td>Min Font</td><td>Smallest font size &mdash; at your min screen width</td><td>16px</td></tr>
  <tr><td>Max Font</td><td>Largest font size &mdash; at your max screen width</td><td>32px</td></tr>
  <tr><td>Min Screen</td><td>The viewport width where fluid scaling begins</td><td>375px</td></tr>
  <tr><td>Max Screen</td><td>The viewport width where fluid scaling ends</td><td>1280px</td></tr>
</tbody></table>
<div class="box"><div class="box-label">Root size</div><p style="margin:0;font-size:12px;">Used to convert <code>px &rarr; rem</code>. Browser default is <code>16px</code>. Change only if your <code>html { font-size }</code> is different.</p></div>
<h2>4. The Formula &mdash; Step by Step</h2>
<p>Given: <code>minFont=16, maxFont=32, minScreen=375, maxScreen=1280, rootSize=16</code></p>
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-body"><div class="step-title">Slope &mdash; font growth rate per px of screen</div><div class="step-calc">(32 &minus; 16) / (1280 &minus; 375) <span class="result">= 0.01768 px/px</span></div><div class="step-note">For every 1px wider the viewport gets, font grows by 0.01768px.</div></div></div>
  <div class="step"><div class="step-num">2</div><div class="step-body"><div class="step-title">Convert slope &rarr; vw (multiply by 100)</div><div class="step-calc">0.01768 &times; 100 <span class="result">= 1.768vw</span></div><div class="step-note">1vw = 1% of viewport. Multiplying converts the px/px ratio into a vw percentage.</div></div></div>
  <div class="step"><div class="step-num">3</div><div class="step-body"><div class="step-title">Intercept &mdash; base offset at minScreen</div><div class="step-calc">16 &minus; (0.01768 &times; 375) <span class="result">= 9.370px &rarr; 0.586rem</span></div><div class="step-note">Anchors the line so the formula outputs exactly minFont at minScreen.</div></div></div>
  <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">Convert font bounds to rem</div><div class="step-calc">16&divide;16 = 1.000rem | 32&divide;16 = 2.000rem <span class="result">= 1.000rem &rarr; 2.000rem</span></div><div class="step-note">rem adapts to the user's browser font preference &mdash; unlike px.</div></div></div>
  <div class="step"><div class="step-num">5</div><div class="step-body"><div class="step-title">Assemble clamp()</div><div class="step-calc">clamp(min, intercept + vw, max) <span class="result">= clamp(1.000rem, 0.586rem + 1.768vw, 2.000rem)</span></div></div></div>
</div>
<div class="box accent"><div class="box-label">Verification</div>
<p style="margin:0 0 6px;font-family:JetBrains Mono,monospace;font-size:11px;">At 375px: 9.370 + 6.630 = <strong style="color:#7c3aed">16.000px ✓</strong></p>
<p style="margin:0;font-family:JetBrains Mono,monospace;font-size:11px;">At 1280px: 9.370 + 22.630 = <strong style="color:#7c3aed">32.000px ✓</strong></p></div>
<h2>5. CSS clamp() Explained</h2>
<table><thead><tr><th>Argument</th><th>Role</th></tr></thead><tbody>
  <tr><td>MIN</td><td>Absolute lower bound &mdash; font never goes below this</td></tr>
  <tr><td>PREFERRED</td><td>The fluid calculation: intercept rem + vw</td></tr>
  <tr><td>MAX</td><td>Absolute upper bound &mdash; font never exceeds this</td></tr>
</tbody></table>
<h2>6. Units: rem vs px vs em</h2>
<table><thead><tr><th>Unit</th><th>Relative to</th><th>Respects zoom?</th><th>Best for</th></tr></thead><tbody>
  <tr><td><code>rem</code></td><td>Root element</td><td class="yes">Yes</td><td>Body text, headings &mdash; default</td></tr>
  <tr><td><code>px</code></td><td>Physical pixels</td><td class="no">No</td><td>Exact pixel control</td></tr>
  <tr><td><code>em</code></td><td>Parent element</td><td class="yes">Yes</td><td>Nested components, buttons</td></tr>
</tbody></table>
<h2>7. Reverse Scaling</h2>
<p>Reverse scaling inverts the normal relationship: font size <em>decreases</em> as screen width <em>increases</em>. This produces a <strong>negative vw</strong> coefficient.</p>
<pre>/* Normal */  font-size: clamp(1.000rem,  0.586rem + 1.768vw, 2.000rem);
/* Reverse */ font-size: clamp(1.000rem, 2.414rem + -1.768vw, 2.000rem);</pre>
<div class="box amber"><div class="box-label">Warning</div><p style="margin:0;font-size:12px;color:#92400e;">Reverse scaling is uncommon. Always document intentional usage. The WCAG concern is amplified since negative vw can prevent adequate text zoom.</p></div>
<h2>8. Type Scale &amp; Modular Ratios</h2>
<table><thead><tr><th>Token</th><th>CSS Variable</th><th>Step</th><th>Typical Use</th></tr></thead><tbody>
  <tr><td>xs</td><td>--text-xs</td><td>base / ratio2</td><td>Caption, badge</td></tr>
  <tr><td>sm</td><td>--text-sm</td><td>base / ratio1</td><td>Helper, footnote</td></tr>
  <tr><td><strong>base</strong></td><td><strong>--text-base</strong></td><td>base x 1</td><td><strong>Body text</strong></td></tr>
  <tr><td>lg</td><td>--text-lg</td><td>base x ratio1</td><td>Card title</td></tr>
  <tr><td>xl</td><td>--text-xl</td><td>base x ratio2</td><td>Section heading</td></tr>
  <tr><td>2xl</td><td>--text-2xl</td><td>base x ratio3</td><td>Page heading</td></tr>
  <tr><td>3xl</td><td>--text-3xl</td><td>base x ratio4</td><td>Hero headline</td></tr>
</tbody></table>
<table><thead><tr><th>Ratio Name</th><th>Value</th><th>Best for</th></tr></thead><tbody>
  <tr><td>Minor Second</td><td>x1.067</td><td>Dense UIs, dashboards</td></tr>
  <tr><td>Major Second</td><td>x1.125</td><td>Gentle hierarchy</td></tr>
  <tr><td>Minor Third</td><td>x1.200</td><td>Body + heading</td></tr>
  <tr><td><strong>Major Third</strong></td><td><strong>x1.250</strong></td><td><strong>Default &mdash; most sites</strong></td></tr>
  <tr><td>Perfect Fourth</td><td>x1.333</td><td>Editorial, strong contrast</td></tr>
  <tr><td>Augmented Fourth</td><td>x1.414</td><td>Dramatic hierarchy</td></tr>
  <tr><td>Perfect Fifth</td><td>x1.500</td><td>Display / marketing</td></tr>
  <tr><td>Golden Ratio</td><td>x1.618</td><td>Maximum drama</td></tr>
</tbody></table>
<h2>9. Breakpoint Behavior</h2>
<table><thead><tr><th>Screen</th><th>Device</th><th>Zone</th><th>Behavior</th></tr></thead><tbody>
  <tr><td>320px</td><td>iPhone SE</td><td>min</td><td>Fixed at minFont</td></tr>
  <tr><td>375px</td><td>iPhone 14</td><td>min</td><td>Fixed at minFont</td></tr>
  <tr><td>480px</td><td>Small mobile</td><td>fluid</td><td>Scaling begins</td></tr>
  <tr><td>640px</td><td>Large mobile</td><td>fluid</td><td>Scaling</td></tr>
  <tr><td>768px</td><td>iPad</td><td>fluid</td><td>Scaling</td></tr>
  <tr><td>1024px</td><td>iPad Pro</td><td>fluid</td><td>Scaling</td></tr>
  <tr><td>1280px</td><td>Desktop</td><td>max</td><td>Fixed at maxFont</td></tr>
  <tr><td>1440px</td><td>Large desktop</td><td>max</td><td>Fixed at maxFont</td></tr>
  <tr><td>1920px</td><td>Wide screen</td><td>max</td><td>Fixed at maxFont</td></tr>
</tbody></table>
<h2>10. Accessibility Warnings</h2>
<div class="box amber"><div class="box-label">WCAG 1.4.4 &mdash; Resize Text (AA)</div><p style="margin:0 0 8px;font-size:12px;color:#92400e;">When a user zooms to 200%, <code>rem</code> values double correctly &mdash; but <code>vw</code> values stay proportional to the viewport and do NOT zoom.</p></div>
<ul class="checklist">
  <li>Use rem for min/max bounds &mdash; they respect zoom, vw does not</li>
  <li>Test at 200% browser zoom before shipping</li>
  <li>Avoid very tight clamp ranges that prevent meaningful scaling</li>
  <li>Don't use fluid type for critical legal or fine-print text</li>
</ul>
<h2>11. Export Formats</h2>
<h3>CSS Custom Properties</h3><pre>:root { --text-base: clamp(1.000rem, 0.586rem + 1.768vw, 2.000rem); }</pre>
<h3>JSON Design Tokens</h3><pre>{ "base": { "value": "clamp(1.000rem, 0.586rem + 1.768vw, 2.000rem)" } }</pre>
<h3>Tailwind Config</h3><pre>fontSize: { 'fluid-base': 'clamp(1.000rem, 0.586rem + 1.768vw, 2.000rem)' }</pre>
<h2>12. Real-World Examples</h2>
<table><thead><tr><th>Use Case</th><th>minFont</th><th>maxFont</th><th>minScreen</th><th>maxScreen</th></tr></thead><tbody>
  <tr><td>Body text</td><td>16px</td><td>20px</td><td>375px</td><td>1280px</td></tr>
  <tr><td>Subheading</td><td>20px</td><td>28px</td><td>375px</td><td>1280px</td></tr>
  <tr><td>Page heading</td><td>28px</td><td>48px</td><td>375px</td><td>1280px</td></tr>
  <tr><td>Hero / display</td><td>36px</td><td>80px</td><td>375px</td><td>1440px</td></tr>
  <tr><td>Caption</td><td>12px</td><td>14px</td><td>375px</td><td>1280px</td></tr>
</tbody></table>
<h2>13. Quick Reference Cheatsheet</h2>
<div class="box accent"><div class="box-label">Formula</div>
<pre style="margin:0;">slope     = (maxFont - minFont) / (maxScreen - minScreen)
vw        = slope x 100
intercept = minFont - (slope x minScreen)
clamp( lo/rootSize rem, intercept/rootSize rem + vw vw, hi/rootSize rem )</pre></div>
<table><thead><tr><th>Content Type</th><th>Recommended Ratio</th></tr></thead><tbody>
  <tr><td>Dense UI / dashboard</td><td>x1.067 &ndash; x1.125</td></tr>
  <tr><td>Marketing / blog</td><td>x1.250</td></tr>
  <tr><td>Editorial / magazine</td><td>x1.333</td></tr>
  <tr><td>Portfolio / creative</td><td>x1.500 &ndash; x1.618</td></tr>
</tbody></table>
<div class="doc-footer"><span>Fluid Typography Generator &mdash; CSS clamp() utility</span><span>fluid-typography-docs.pdf</span></div>
</body></html>`;

  if (typeof window === "undefined") return;
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "what",
    icon: "◈",
    label: "What",
    title: "What is Fluid Typography?",
    subtitle: "One rule, every screen",
  },
  {
    id: "why",
    icon: "◉",
    label: "Why",
    title: "Why Use It?",
    subtitle: "The case against breakpoints",
  },
  {
    id: "how",
    icon: "◎",
    label: "How",
    title: "How to Use This Tool",
    subtitle: "Four inputs → one formula",
  },
  {
    id: "formula",
    icon: "∑",
    label: "Formula",
    title: "The Math",
    subtitle: "Step-by-step derivation",
  },
  {
    id: "reverse",
    icon: "⇅",
    label: "Reverse",
    title: "Reverse Scaling",
    subtitle: "Shrink as screen grows",
  },
  {
    id: "a11y",
    icon: "◐",
    label: "A11y",
    title: "Accessibility",
    subtitle: "WCAG 1.4.4 & zoom",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function CodeChip({ children, color = "violet", isDark }) {
  const colors = {
    violet: isDark
      ? "bg-violet-500/10 border-violet-400/20 text-violet-300"
      : "bg-violet-50 border-violet-200 text-violet-600",
    amber: isDark
      ? "bg-amber-500/10 border-amber-400/20 text-amber-300"
      : "bg-amber-50 border-amber-200 text-amber-600",
    green: isDark
      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-300"
      : "bg-emerald-50 border-emerald-200 text-emerald-600",
    gray: isDark
      ? "bg-[#1a1a1a] border-[#2a2a2a] text-[#888]"
      : "bg-gray-100 border-gray-200 text-gray-500",
  };
  return (
    <code
      className={`inline-block text-[11px] font-mono px-2 py-0.5 rounded border ${colors[color]}`}
    >
      {children}
    </code>
  );
}

function InfoBox({ label, children, isDark, accent = false }) {
  const bg = accent
    ? isDark
      ? "bg-violet-500/5 border-violet-400/15"
      : "bg-violet-50/80 border-violet-200"
    : isDark
      ? "bg-[#0a0a0a] border-[#1a1a1a]"
      : "bg-gray-50 border-gray-100";
  const lbl = isDark ? "text-[#777]" : "text-gray-400";
  return (
    <div className={`border rounded-xl px-4 py-3.5 ${bg}`}>
      {label && (
        <p
          className={`text-[9px] uppercase tracking-[0.15em] font-mono mb-2 ${lbl}`}
        >
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

function FormulaStep({ number, title, calc, result, note, isDark }) {
  const stepBg = isDark
    ? "bg-[#1a1a2e] border-[#3d3d6b]"
    : "bg-violet-50 border-violet-300";
  const calcBg = isDark
    ? "bg-[#0a0a0a] border-[#1a1a1a]"
    : "bg-gray-50 border-gray-200";
  const titleTxt = isDark ? "text-[#aaa]" : "text-gray-400";
  const calcTxt = isDark ? "text-[#aaa]" : "text-gray-500";
  const noteTxt = isDark ? "text-[#888]" : "text-gray-400";
  const connLine = isDark ? "bg-[#1e1e1e]" : "bg-gray-200";

  return (
    <div className="flex gap-3.5 pb-5 last:pb-0">
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] text-violet-400 font-mono font-bold shrink-0 ${stepBg}`}
        >
          {number}
        </div>
        {number < 5 && <div className={`w-px flex-1 mt-1.5 ${connLine}`} />}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p
          className={`text-[10px] uppercase tracking-widest font-mono mb-1.5 ${titleTxt}`}
        >
          {title}
        </p>
        <div className={`border rounded-lg px-3 py-2 mb-1.5 ${calcBg}`}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className={`text-[11px] font-mono ${calcTxt}`}>{calc}</span>
            <span className="text-[12px] text-violet-400 font-mono font-semibold">
              = {result}
            </span>
          </div>
        </div>
        {note && (
          <p className={`text-[10px] font-mono leading-relaxed ${noteTxt}`}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

function CompareRow({ label, bad, good, isDark }) {
  const rowBg = isDark
    ? "bg-[#0a0a0a] border-[#1a1a1a]"
    : "bg-gray-50 border-gray-100";
  const lbl = isDark ? "text-[#aaa]" : "text-gray-400";
  const badTxt = isDark ? "text-[#f87171]" : "text-red-400";
  const goodTxt = isDark ? "text-emerald-500" : "text-emerald-600";
  return (
    <div className={`border rounded-lg px-3.5 py-2.5 mb-2 last:mb-0 ${rowBg}`}>
      <p
        className={`text-[9px] uppercase tracking-[0.12em] font-mono mb-1.5 ${lbl}`}
      >
        {label}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className={`text-[9px] font-mono mb-1 ${badTxt}`}>✕ before</p>
          <p className={`text-[10px] font-mono leading-relaxed ${badTxt}`}>
            {bad}
          </p>
        </div>
        <div>
          <p className={`text-[9px] font-mono mb-1 ${goodTxt}`}>✓ after</p>
          <p className={`text-[10px] font-mono leading-relaxed ${goodTxt}`}>
            {good}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Section content ───────────────────────────────────────────────────────────

function WhatSection({ isDark }) {
  const body = isDark ? "text-[#aaa]" : "text-gray-500";
  const accent = isDark ? "text-violet-400" : "text-violet-600";
  const strong = isDark ? "text-[#ccc]" : "text-gray-700";

  return (
    <div className="space-y-4">
      <p className={`text-[12px] font-mono leading-relaxed ${body}`}>
        Fluid typography makes font sizes{" "}
        <span className={strong}>scale continuously</span> with the viewport —
        no media query jumps. One <span className={accent}>clamp()</span>{" "}
        declaration handles every screen width from mobile to widescreen.
      </p>

      <InfoBox label="Old approach — stepped" isDark={isDark}>
        <pre
          className={`text-[11px] font-mono leading-loose ${isDark ? "text-[#f87171]" : "text-red-400"}`}
        >
          {`h1 { font-size: 24px; }
@media (min-width: 768px)  { h1 { font-size: 32px; } }
@media (min-width: 1280px) { h1 { font-size: 48px; } }`}
        </pre>
      </InfoBox>

      <InfoBox label="Fluid approach — one rule" isDark={isDark} accent>
        <pre
          className={`text-[11px] font-mono leading-loose ${isDark ? "text-violet-300" : "text-violet-600"}`}
        >
          {`h1 {
  font-size: clamp(1.5rem, 0.66rem + 3.56vw, 3rem);
}`}
        </pre>
      </InfoBox>

      <div className="grid grid-cols-3 gap-2">
        {[
          { screen: "375px", size: "24px", zone: "min" },
          { screen: "800px", size: "~36px", zone: "fluid" },
          { screen: "1280px", size: "48px", zone: "max" },
        ].map(({ screen, size, zone }) => {
          const zoneBg =
            zone === "fluid"
              ? isDark
                ? "bg-violet-500/10 border-violet-400/20"
                : "bg-violet-50 border-violet-200"
              : isDark
                ? "bg-[#0a0a0a] border-[#1a1a1a]"
                : "bg-gray-50 border-gray-100";
          const zoneLabel =
            zone === "fluid"
              ? "text-violet-400"
              : isDark
                ? "text-[#888]"
                : "text-gray-400";
          const sizeT =
            zone === "fluid"
              ? "text-violet-400"
              : isDark
                ? "text-[#888]"
                : "text-gray-700";
          return (
            <div
              key={screen}
              className={`border rounded-lg px-2.5 py-2 text-center ${zoneBg}`}
            >
              <p className={`text-[9px] font-mono mb-1 ${zoneLabel}`}>{zone}</p>
              <p className={`text-[13px] font-mono font-semibold ${sizeT}`}>
                {size}
              </p>
              <p
                className={`text-[9px] font-mono mt-0.5 ${isDark ? "text-[#888]" : "text-gray-400"}`}
              >
                @ {screen}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WhySection({ isDark }) {
  const comparisons = [
    {
      label: "Breakpoints needed",
      bad: "3–5 @media rules per element",
      good: "Zero — one clamp() does it all",
    },
    {
      label: "At unusual widths (e.g. 900px)",
      bad: "Looks fine at 768px, awkward at 900px",
      good: "Scales perfectly at every width",
    },
    {
      label: "Adding a new device",
      bad: "New breakpoint required",
      good: "Already handled — no change needed",
    },
    {
      label: "Layout reflow",
      bad: "Sudden text jump at breakpoint",
      good: "No reflow — smooth and continuous",
    },
  ];

  return (
    <div className="space-y-3">
      {comparisons.map((c) => (
        <CompareRow key={c.label} {...c} isDark={isDark} />
      ))}
      <InfoBox isDark={isDark}>
        <p
          className={`text-[11px] font-mono leading-relaxed ${isDark ? "text-[#777]" : "text-gray-500"}`}
        >
          Best for{" "}
          <span className={isDark ? "text-violet-300" : "text-violet-600"}>
            headings
          </span>
          ,{" "}
          <span className={isDark ? "text-violet-300" : "text-violet-600"}>
            display text
          </span>
          , and{" "}
          <span className={isDark ? "text-violet-300" : "text-violet-600"}>
            body copy
          </span>
          . Skip it for badges, labels, or UI that needs a fixed size.
        </p>
      </InfoBox>
    </div>
  );
}

function HowSection({ isDark }) {
  const body = isDark ? "text-[#aaa]" : "text-gray-500";
  const strong = isDark ? "text-[#ccc]" : "text-gray-700";
  const stepBg = isDark
    ? "bg-[#0a0a0a] border-[#1a1a1a]"
    : "bg-gray-50 border-gray-100";

  const inputs = [
    {
      name: "Min Font",
      desc: "Smallest font size — appears at your min screen width",
      example: "16px",
    },
    {
      name: "Max Font",
      desc: "Largest font size — appears at your max screen width",
      example: "32px",
    },
    {
      name: "Min Screen",
      desc: "The viewport width where fluid scaling begins",
      example: "375px",
    },
    {
      name: "Max Screen",
      desc: "The viewport width where fluid scaling ends",
      example: "1280px",
    },
  ];

  return (
    <div className="space-y-3">
      <p className={`text-[12px] font-mono leading-relaxed ${body}`}>
        Fill in <span className={strong}>four numbers</span> — the tool
        generates your <CodeChip isDark={isDark}>clamp()</CodeChip> instantly.
      </p>

      <div className="space-y-1.5">
        {inputs.map(({ name, desc, example }) => (
          <div
            key={name}
            className={`border rounded-lg px-3.5 py-2.5 flex items-start gap-3 ${stepBg}`}
          >
            <div className="flex-1 min-w-0">
              <p
                className={`text-[11px] font-mono font-semibold mb-0.5 ${isDark ? "text-violet-300" : "text-violet-600"}`}
              >
                {name}
              </p>
              <p className={`text-[10px] font-mono leading-relaxed ${body}`}>
                {desc}
              </p>
            </div>
            <CodeChip isDark={isDark} color="gray">
              {example}
            </CodeChip>
          </div>
        ))}
      </div>

      <InfoBox label="Root size" isDark={isDark}>
        <p className={`text-[10px] font-mono leading-relaxed ${body}`}>
          Used to convert{" "}
          <CodeChip isDark={isDark} color="gray">
            px → rem
          </CodeChip>
          . Browser default is <CodeChip isDark={isDark}>16px</CodeChip>. Change
          only if your{" "}
          <CodeChip isDark={isDark} color="gray">
            {"html { font-size }"}
          </CodeChip>{" "}
          is different.
        </p>
      </InfoBox>
    </div>
  );
}

function FormulaSection({ isDark }) {
  const body = isDark ? "text-[#aaa]" : "text-gray-500";
  const accent = isDark ? "text-violet-400" : "text-violet-600";
  const finalBg = isDark
    ? "bg-[#0f0f1a] border-[#2a2a4a]"
    : "bg-violet-50 border-violet-200";

  return (
    <div className="space-y-4">
      <InfoBox label="Given" isDark={isDark}>
        <p
          className={`text-[11px] font-mono ${isDark ? "text-[#999]" : "text-gray-500"}`}
        >
          minFont=16, maxFont=32, minScreen=375, maxScreen=1280, rootSize=16
        </p>
      </InfoBox>

      <FormulaStep
        number={1}
        title="Slope — font growth rate per px of screen"
        calc="(32 − 16) / (1280 − 375)"
        result="0.01768 px/px"
        note="For every 1px wider the viewport gets, font grows by 0.01768px."
        isDark={isDark}
      />
      <FormulaStep
        number={2}
        title="Convert slope → vw (multiply by 100)"
        calc="0.01768 × 100"
        result="1.768vw"
        note="1vw = 1% of viewport. Multiplying converts the px/px ratio into a vw percentage."
        isDark={isDark}
      />
      <FormulaStep
        number={3}
        title="Intercept — base offset at minScreen"
        calc="16 − (0.01768 × 375)"
        result="9.370px → 0.586rem"
        note="Anchors the line so the formula outputs exactly minFont at minScreen."
        isDark={isDark}
      />
      <FormulaStep
        number={4}
        title="Convert font bounds to rem"
        calc="16÷16 = 1.000rem  |  32÷16 = 2.000rem"
        result="1.000rem → 2.000rem"
        note="rem adapts to the user's browser font preference — unlike px."
        isDark={isDark}
      />
      <FormulaStep
        number={5}
        title="Assemble clamp()"
        calc="clamp(min, intercept + vw, max)"
        result="clamp(1.000rem, 0.586rem + 1.768vw, 2.000rem)"
        isDark={isDark}
      />

      <div className={`border rounded-xl px-4 py-3.5 ${finalBg}`}>
        <p
          className={`text-[9px] uppercase tracking-[0.15em] font-mono mb-2 ${isDark ? "text-[#777]" : "text-gray-400"}`}
        >
          Verify at minScreen (375px)
        </p>
        <p className={`text-[11px] font-mono ${body}`}>
          0.586rem + 1.768vw = 9.370px + (1.768% × 375px) = 9.370 + 6.630 ={" "}
          <span className={accent}>16.000px ✓</span>
        </p>
        <p
          className={`text-[9px] uppercase tracking-[0.15em] font-mono mb-2 mt-3 ${isDark ? "text-[#777]" : "text-gray-400"}`}
        >
          Verify at maxScreen (1280px)
        </p>
        <p className={`text-[11px] font-mono ${body}`}>
          0.586rem + 1.768vw = 9.370px + (1.768% × 1280px) = 9.370 + 22.630 ={" "}
          <span className={accent}>32.000px ✓</span>
        </p>
      </div>
    </div>
  );
}

function ReverseSection({ isDark }) {
  const body = isDark ? "text-[#aaa]" : "text-gray-500";
  const accent = isDark ? "text-violet-400" : "text-violet-600";

  return (
    <div className="space-y-4">
      <p className={`text-[12px] font-mono leading-relaxed ${body}`}>
        Toggle <span className={accent}>Reverse Scaling</span> to make font size{" "}
        <span className={isDark ? "text-[#ccc]" : "text-gray-700"}>
          decrease
        </span>{" "}
        as the screen grows wider. This produces a{" "}
        <span className={accent}>negative vw</span> coefficient.
      </p>

      <div className="grid grid-cols-2 gap-2">
        <InfoBox label="Normal scaling" isDark={isDark}>
          <pre
            className={`text-[10px] font-mono leading-relaxed ${isDark ? "text-[#aaa]" : "text-gray-500"}`}
          >
            {`mobile  → small font
desktop → large font

vw is positive`}
          </pre>
        </InfoBox>
        <InfoBox label="Reverse scaling" isDark={isDark} accent>
          <pre
            className={`text-[10px] font-mono leading-relaxed ${isDark ? "text-violet-400" : "text-violet-600"}`}
          >
            {`mobile  → large font
desktop → small font

vw is negative`}
          </pre>
        </InfoBox>
      </div>

      <InfoBox label="How it works internally" isDark={isDark}>
        <p className={`text-[10px] font-mono leading-relaxed ${body}`}>
          minFont and maxFont are <span className={accent}>swapped</span> before
          the formula runs. The clamp() bounds are always sorted (min ≤ max) so
          the CSS stays valid — only the preferred (vw) term goes negative.
        </p>
        <pre
          className={`text-[10px] font-mono mt-2 leading-loose ${isDark ? "text-violet-300" : "text-violet-600"}`}
        >
          {`/* reverse example */
clamp(1.000rem, 2.414rem + -1.768vw, 2.000rem)`}
        </pre>
      </InfoBox>

      <InfoBox label="When to use it" isDark={isDark}>
        <div className={`space-y-1.5 text-[10px] font-mono ${body}`}>
          {[
            "Dense dashboards — large touch targets on mobile, compact on desktop",
            "Print-first layouts — mobile acts as a 'zoom in' view",
            "Artistic typographic decisions where large + mobile = emphasis",
          ].map((t) => (
            <p key={t} className="flex items-start gap-1.5">
              <span className={accent}>·</span>
              <span>{t}</span>
            </p>
          ))}
        </div>
      </InfoBox>

      <div
        className={`border rounded-lg px-3.5 py-2.5 ${isDark ? "bg-amber-500/5 border-amber-400/15" : "bg-amber-50 border-amber-200"}`}
      >
        <p
          className={`text-[10px] font-mono leading-relaxed ${isDark ? "text-[#fbbf24]" : "text-amber-600"}`}
        >
          ⚠ Reverse scaling is uncommon. Always verify it&apos;s intentional —
          the WCAG accessibility warning will also appear since negative vw can
          amplify zoom issues.
        </p>
      </div>
    </div>
  );
}

function A11ySection({ isDark }) {
  const body = isDark ? "text-[#aaa]" : "text-gray-500";
  const accent = isDark ? "text-violet-400" : "text-violet-600";

  const mitigations = [
    "Use rem for min/max bounds — they respect zoom, vw does not",
    "Test at 200% browser zoom before shipping",
    "Avoid very tight clamp ranges that prevent meaningful scaling",
    "Don't use fluid type for critical legal or fine-print text",
  ];

  return (
    <div className="space-y-4">
      <div
        className={`border rounded-xl px-4 py-3.5 ${isDark ? "bg-amber-500/5 border-amber-400/15" : "bg-amber-50 border-amber-200"}`}
      >
        <p
          className={`text-[10px] uppercase tracking-[0.12em] font-mono mb-2 ${isDark ? "text-amber-400/60" : "text-amber-500"}`}
        >
          WCAG 1.4.4 — Resize Text (AA)
        </p>
        <p
          className={`text-[11px] font-mono leading-relaxed ${isDark ? "text-[#fbbf24]" : "text-amber-700"}`}
        >
          When a user zooms to 200%,{" "}
          <CodeChip isDark={isDark} color="amber">
            rem
          </CodeChip>{" "}
          values double correctly. But{" "}
          <CodeChip isDark={isDark} color="amber">
            vw
          </CodeChip>{" "}
          values stay proportional to the viewport — they don&apos;t zoom. This
          means fluid text may not scale as expected for users who rely on
          browser zoom.
        </p>
      </div>

      <InfoBox label="The zoom problem — visualised" isDark={isDark}>
        <div className="space-y-2">
          {[
            { unit: "rem", zoom: "200%", result: "Font doubles ✓", ok: true },
            { unit: "vw", zoom: "200%", result: "Font unchanged ✕", ok: false },
          ].map(({ unit, zoom, result, ok }) => (
            <div key={unit} className="flex items-center gap-3">
              <CodeChip isDark={isDark} color={ok ? "green" : "amber"}>
                {unit}
              </CodeChip>
              <span
                className={`text-[10px] font-mono ${isDark ? "text-[#777]" : "text-gray-400"}`}
              >
                at {zoom}
              </span>
              <span
                className={`text-[10px] font-mono ${ok ? (isDark ? "text-emerald-400" : "text-emerald-600") : isDark ? "text-[#fbbf24]" : "text-amber-600"}`}
              >
                {result}
              </span>
            </div>
          ))}
        </div>
      </InfoBox>

      <InfoBox label="Mitigation checklist" isDark={isDark}>
        <div className="space-y-1.5">
          {mitigations.map((m) => (
            <p
              key={m}
              className={`text-[10px] font-mono flex items-start gap-1.5 ${body}`}
            >
              <span className={accent}>□</span>
              <span>{m}</span>
            </p>
          ))}
        </div>
      </InfoBox>

      <div className="flex flex-col gap-2">
        {[
          {
            label: "WCAG 1.4.4",
            href: "https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html",
          },
          {
            label: "Adrian Roselli — Responsive Type & Zoom",
            href: "https://adrianroselli.com/2019/12/responsive-type-and-zoom.html",
          },
          {
            label: "MDN — clamp()",
            href: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
          },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[10px] font-mono transition-colors border rounded-lg px-3 py-2 no-underline flex items-center justify-between ${
              isDark
                ? "border-[#1e1e1e] text-[#444] hover:text-violet-400 hover:border-violet-400/30"
                : "border-gray-100 text-gray-400 hover:text-violet-600 hover:border-violet-300"
            }`}
          >
            {label}
            <span className="ml-2">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function DocsPanel({ theme }) {
  const [activeSection, setActiveSection] = useState(null);
  const [open, setOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const isDark = theme === "dark";

  const handleDownload = () => {
    downloadPDF();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const cardBg = isDark
    ? "bg-[#0d0d0d] border-[#1e1e1e]"
    : "bg-white border-gray-200";
  const headerLabel = isDark ? "text-[#aaa]" : "text-gray-400";
  const headerSub = isDark ? "text-[#888]" : "text-gray-400";
  const arrowTxt = isDark ? "text-[#777]" : "text-gray-400";
  const divider = isDark ? "border-[#1a1a1a]" : "border-gray-100";
  const tabIdle = isDark
    ? "border-[#1a1a1a] text-[#333] hover:text-[#666] hover:border-[#2a2a2a]"
    : "border-gray-100 text-gray-300 hover:text-gray-500 hover:border-gray-200";
  const tabActive = isDark
    ? "border-violet-400/30 text-violet-400 bg-violet-500/5"
    : "border-violet-300 text-violet-600 bg-violet-50";

  const activeData = SECTIONS.find((s) => s.id === activeSection);

  const contentMap = {
    what: <WhatSection isDark={isDark} />,
    why: <WhySection isDark={isDark} />,
    how: <HowSection isDark={isDark} />,
    formula: <FormulaSection isDark={isDark} />,
    reverse: <ReverseSection isDark={isDark} />,
    a11y: <A11ySection isDark={isDark} />,
  };

  const handleTabClick = (id) => {
    if (activeSection === id) {
      setActiveSection(null);
    } else {
      setActiveSection(id);
      if (!open) setOpen(true);
    }
  };

  return (
    <div
      className={`border rounded-2xl mb-6 overflow-hidden transition-colors ${cardBg}`}
    >
      {/* ── Toggle header ── */}
      <div className="flex items-center justify-between px-7 py-5 gap-3">
        <button
          onClick={() => {
            setOpen((v) => !v);
            if (open) setActiveSection(null);
          }}
          className="flex-1 flex items-center justify-between cursor-pointer bg-transparent border-0 text-left min-w-0"
        >
          <div className="min-w-0">
            <p
              className={`text-[14px] uppercase tracking-widest font-mono mb-0.5 ${headerLabel}`}
            >
              How Fluid Typography Works
            </p>
            <p className={`text-[12px] font-mono ${headerSub}`}>
              What · Why · Formula · Reverse · A11y
            </p>
          </div>
          <span
            className={`font-mono text-[18px] transition-transform duration-200 ml-4 shrink-0 ${arrowTxt} ${open ? "rotate-180" : ""}`}
          >
            ↓
          </span>
        </button>

        {/* Download docs button */}
        <button
          onClick={handleDownload}
          title="Download documentation as PDF"
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-mono cursor-pointer transition-all ${
            downloaded
              ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-400"
              : isDark
                ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-violet-400 hover:border-violet-400/30"
                : "bg-gray-50 border-gray-200 text-gray-500 hover:text-violet-600 hover:border-violet-300"
          }`}
        >
          {downloaded ? (
            <>
              <span>✓</span>
              <span>Saved</span>
            </>
          ) : (
            <>
              <span>↓</span>
              <span>.pdf</span>
            </>
          )}
        </button>
      </div>

      {/* ── Expandable body ── */}
      {open && (
        <div className={`border-t ${divider}`}>
          {/* Tab pills */}
          <div className="flex gap-1.5 px-7 pt-5 pb-4 flex-wrap">
            {SECTIONS.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => handleTabClick(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono cursor-pointer transition-all ${
                  activeSection === id ? tabActive : tabIdle
                }`}
              >
                <span className="text-[10px]">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Content pane */}
          {activeSection && activeData && (
            <div className={`border-t px-7 py-6 ${divider}`}>
              {/* Pane header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p
                    className={`text-[11px] uppercase tracking-widest font-mono mb-0.5 ${headerLabel}`}
                  >
                    {activeData.subtitle}
                  </p>
                  <p
                    className={`text-[15px] font-mono font-semibold ${isDark ? "text-[#e0e0e0]" : "text-gray-900"}`}
                  >
                    {activeData.icon}{" "}
                    <span className="ml-1">{activeData.title}</span>
                  </p>
                </div>
                <button
                  onClick={() => setActiveSection(null)}
                  className={`text-[12px] font-mono cursor-pointer transition-colors ${arrowTxt} hover:text-violet-400`}
                >
                  ✕
                </button>
              </div>

              {/* Section content */}
              {contentMap[activeSection]}
            </div>
          )}

          {/* Collapsed state hint */}
          {!activeSection && (
            <div className={`border-t px-7 py-5 ${divider}`}>
              <p
                className={`text-[11px] font-mono ${isDark ? "text-[#777]" : "text-gray-400"}`}
              >
                Select a topic above to read the explanation.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
