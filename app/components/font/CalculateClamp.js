// ─── Core clamp calculator ────────────────────────────────────────────────────

export function calculateClamp(
  minFont,
  maxFont,
  minScreen,
  maxScreen,
  rootSize = 16,
) {
  const slope = (maxFont - minFont) / (maxScreen - minScreen);
  const vw = slope * 100;
  const intercept = minFont - slope * minScreen;

  // clamp(MIN, preferred, MAX) requires MIN <= MAX always.
  // When reverse scaling, minFont > maxFont — sort them so the CSS is valid.
  const clampLo = Math.min(minFont, maxFont);
  const clampHi = Math.max(minFont, maxFont);

  const minRem = (clampLo / rootSize).toFixed(3);
  const maxRem = (clampHi / rootSize).toFixed(3);
  const interceptRem = (intercept / rootSize).toFixed(3);
  const vwFixed = vw.toFixed(3);
  const isNegativeVw = vw < 0;

  // preferred: intercept rem + vw   (negative vw handles reverse direction)
  const preferred = `${interceptRem}rem + ${vwFixed}vw`;

  return {
    clampRem: `clamp(${minRem}rem, ${preferred}, ${maxRem}rem)`,
    clampPx: `clamp(${clampLo}px, ${intercept.toFixed(3)}px + ${vwFixed}vw, ${clampHi}px)`,
    clampEm: `clamp(${minRem}em, ${preferred.replace(/rem/g, "em")}, ${maxRem}em)`,
    minRem,
    maxRem,
    interceptRem,
    vwFixed,
    slope,
    intercept,
    isNegativeVw,
    // raw numbers for formula explanation panel
    _minFont: minFont,
    _maxFont: maxFont,
    _minScreen: minScreen,
    _maxScreen: maxScreen,
    _rootSize: rootSize,
  };
}

// ─── Output formatter ─────────────────────────────────────────────────────────

export function getClampValue(result, unit) {
  if (unit === "px") return result.clampPx;
  if (unit === "em") return result.clampEm;
  return result.clampRem;
}

// ─── Breakpoint table ─────────────────────────────────────────────────────────

const DEFAULT_BREAKPOINTS = [320, 375, 480, 640, 768, 1024, 1280, 1440, 1920];

export function generateBreakpointTable(
  minFont,
  maxFont,
  minScreen,
  maxScreen,
  breakpoints = DEFAULT_BREAKPOINTS,
) {
  const slope = (maxFont - minFont) / (maxScreen - minScreen);
  const intercept = minFont - slope * minScreen;

  const lo = Math.min(minFont, maxFont);
  const hi = Math.max(minFont, maxFont);

  return breakpoints.map((screen) => {
    const raw = intercept + slope * screen;
    const clamped = Math.min(hi, Math.max(lo, raw));
    const zone =
      screen <= minScreen ? "min" : screen >= maxScreen ? "max" : "fluid";
    return { screen, size: parseFloat(clamped.toFixed(2)), zone };
  });
}

// ─── Formula explanation steps ────────────────────────────────────────────────

export function getFormulaSteps(
  minFont,
  maxFont,
  minScreen,
  maxScreen,
  rootSize = 16,
) {
  const slope = (maxFont - minFont) / (maxScreen - minScreen);
  const vw = slope * 100;
  const intercept = minFont - slope * minScreen;
  const interceptRem = intercept / rootSize;

  return {
    // Step 1 — slope
    slopeCalc: `(${maxFont} - ${minFont}) / (${maxScreen} - ${minScreen})`,
    slopeResult: slope.toFixed(5),
    // Step 2 — vw
    vwCalc: `${slope.toFixed(5)} × 100`,
    vwResult: vw.toFixed(3),
    // Step 3 — intercept px
    interceptCalc: `${minFont} - (${slope.toFixed(5)} × ${minScreen})`,
    interceptPx: intercept.toFixed(3),
    interceptRem: interceptRem.toFixed(3),
    interceptRemCalc: `${intercept.toFixed(3)} ÷ ${rootSize}`,
    // Step 4 — rem bounds
    minRem: (minFont / rootSize).toFixed(3),
    maxRem: (maxFont / rootSize).toFixed(3),
    minRemCalc: `${minFont} ÷ ${rootSize}`,
    maxRemCalc: `${maxFont} ÷ ${rootSize}`,
  };
}

// ─── Type scale generator ─────────────────────────────────────────────────────

const SCALE_STEPS = [
  { label: "xs", token: "--text-xs", ratio: -2 },
  { label: "sm", token: "--text-sm", ratio: -1 },
  { label: "base", token: "--text-base", ratio: 0 },
  { label: "lg", token: "--text-lg", ratio: 1 },
  { label: "xl", token: "--text-xl", ratio: 2 },
  { label: "2xl", token: "--text-2xl", ratio: 3 },
  { label: "3xl", token: "--text-3xl", ratio: 4 },
];

export function generateTypeScale(
  minFont,
  maxFont,
  minScreen,
  maxScreen,
  rootSize = 16,
  ratio = 1.25,
) {
  return SCALE_STEPS.map(({ label, token, ratio: r }) => {
    const scaledMin = minFont * Math.pow(ratio, r);
    const scaledMax = maxFont * Math.pow(ratio, r);
    const result = calculateClamp(
      scaledMin,
      scaledMax,
      minScreen,
      maxScreen,
      rootSize,
    );
    return {
      label,
      token,
      minPx: scaledMin.toFixed(1),
      maxPx: scaledMax.toFixed(1),
      result,
    };
  });
}

// ─── Graph data ───────────────────────────────────────────────────────────────

export function generateGraphData(minFont, maxFont, minScreen, maxScreen) {
  const slope = (maxFont - minFont) / (maxScreen - minScreen);
  const intercept = minFont - slope * minScreen;
  const lo = Math.min(minFont, maxFont);
  const hi = Math.max(minFont, maxFont);
  const points = [];

  // Guarantee at least 20px per step so narrow ranges (e.g. 100px wide)
  // don't produce too few points or a zero/negative step size.
  const range = maxScreen - minScreen;
  const step = Math.max(range / 20, 20);

  for (let s = minScreen - 100; s <= maxScreen + 100; s += step) {
    const rawSize = intercept + slope * s;
    const clamped = Math.min(hi, Math.max(lo, rawSize));
    points.push({
      screen: Math.round(s),
      size: parseFloat(clamped.toFixed(2)),
    });
  }
  return points;
}

// ─── Preview font size ────────────────────────────────────────────────────────

export function getPreviewFontSize(
  minFont,
  maxFont,
  minScreen,
  maxScreen,
  previewScreen,
) {
  const slope = (maxFont - minFont) / (maxScreen - minScreen);
  const intercept = minFont - slope * minScreen;
  const lo = Math.min(minFont, maxFont);
  const hi = Math.max(minFont, maxFont);
  const raw = intercept + slope * previewScreen;
  return Math.min(hi, Math.max(lo, raw)).toFixed(1);
}
