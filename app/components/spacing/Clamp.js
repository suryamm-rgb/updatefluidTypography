// ─── clamp.js ─────────────────────────────────────────────────────────────────
// Pure math helpers — no React, fully testable

export function computeClamp(minPx, maxPx, minVw, maxVw) {
  const minRem = +(minPx / 16).toFixed(4);
  const maxRem = +(maxPx / 16).toFixed(4);
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const intercept = minPx / 16 - slope * (minVw / 16);
  const slopeVw = +(slope * 100).toFixed(4);
  const intRem = +intercept.toFixed(4);
  const sign = intRem >= 0 ? "+" : "-";
  return `clamp(${minRem}rem, ${slopeVw}vw ${sign} ${Math.abs(intRem)}rem, ${maxRem}rem)`;
}

export function valueAtVw(minPx, maxPx, minVw, maxVw, vw) {
  if (vw <= minVw) return minPx;
  if (vw >= maxVw) return maxPx;
  return minPx + ((maxPx - minPx) * (vw - minVw)) / (maxVw - minVw);
}
