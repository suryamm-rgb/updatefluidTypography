"use client";

import { useState } from "react";

type RGB = {
  r: number;
  g: number;
  b: number;
};

type Scale = Record<number, string>;

type EditableScale = Record<
  number,
  {
    value: string;
    label: number;
    enabled: boolean;
  }
>;

function generateScale(hex: string): Scale {
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const hexToRgb = (hex: string): RGB => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgbToHex = (r: number, g: number, b: number): string =>
    "#" +
    [r, g, b]
      .map((x) => {
        const h = x.toString(16);
        return h.length === 1 ? "0" + h : h;
      })
      .join("");

  const lighten = (color: RGB, percent: number): RGB => ({
    r: Math.min(255, Math.round(color.r + (255 - color.r) * percent)),
    g: Math.min(255, Math.round(color.g + (255 - color.g) * percent)),
    b: Math.min(255, Math.round(color.b + (255 - color.b) * percent)),
  });

  const darken = (color: RGB, percent: number): RGB => ({
    r: Math.max(0, Math.round(color.r * (1 - percent))),
    g: Math.max(0, Math.round(color.g * (1 - percent))),
    b: Math.max(0, Math.round(color.b * (1 - percent))),
  });

  const base = hexToRgb(hex);

  return shades.reduce<Scale>((acc, shade) => {
    let color: RGB;

    if (shade < 500) {
      color = lighten(base, (500 - shade) / 600);
    } else if (shade > 500) {
      color = darken(base, (shade - 500) / 500);
    } else {
      color = base;
    }

    acc[shade] = rgbToHex(color.r, color.g, color.b);
    return acc;
  }, {});
}

export default function ColorPickerScale() {
  const [color, setColor] = useState("#6366f1");
  const [token, setToken] = useState("primary");
  const [saved, setSaved] = useState<{ name: string; palette: Scale }[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);
  const [exportFlash, setExportFlash] = useState(false);

  const baseScale = generateScale(color);

  const [editable, setEditable] = useState<EditableScale>(() =>
    Object.fromEntries(
      Object.entries(baseScale).map(([k, v]) => [
        Number(k),
        { value: v, label: Number(k), enabled: true },
      ]),
    ),
  );

  const updateColor = (hex: string) => {
    setColor(hex);
    const newScale = generateScale(hex);

    setEditable(
      Object.fromEntries(
        Object.entries(newScale).map(([k, v]) => [
          Number(k),
          { value: v, label: Number(k), enabled: true },
        ]),
      ),
    );
  };

  const toggle = (shade: number) => {
    setEditable((prev) => ({
      ...prev,
      [shade]: { ...prev[shade], enabled: !prev[shade].enabled },
    }));
  };

  const changeLabel = (shade: number, label: number) => {
    setEditable((prev) => ({
      ...prev,
      [shade]: { ...prev[shade], label },
    }));
  };

  const buildPalette = (): Scale => {
    const palette: Scale = {};

    Object.values(editable)
      .filter((s) => s.enabled)
      .forEach((s) => {
        palette[s.label] = s.value;
      });

    return palette;
  };

  // ✅ update instead of duplicate
  const save = () => {
    const palette = buildPalette();

    setSaved((prev) => {
      const exists = prev.find((p) => p.name === token);

      if (exists) {
        return prev.map((p) =>
          p.name === token ? { name: token, palette } : p,
        );
      }

      return [...prev, { name: token, palette }];
    });

    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 600);
  };

  const exportPalette = () => {
    const palette = buildPalette();

    const css = Object.entries(palette)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([k, v]) => `--${token}-${k}: ${v};`)
      .join("\n");

    navigator.clipboard.writeText(`:root {\n${css}\n}`);

    setExportFlash(true);
    setTimeout(() => setExportFlash(false), 600);
  };
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center">
        {/* color picker */}
        <div className="relative w-fit">
          <input
            type="color"
            value={color}
            onChange={(e) => updateColor(e.target.value)}
            className="w-14 h-14 rounded-xl border shadow cursor-pointer"
          />
          <div
            className="absolute inset-0 rounded-xl ring-2 ring-white/40 pointer-events-none"
            style={{ background: color, opacity: 0.15 }}
          />
        </div>

        {/* token input */}
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="primary"
          className="border px-3 py-2 rounded-lg w-full sm:w-40"
        />

        {/* buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={save}
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-white transition
          ${savedFlash ? "bg-green-500" : "bg-neutral-800"}`}
          >
            Save
          </button>

          <button
            onClick={exportPalette}
            className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-white transition
          ${exportFlash ? "bg-blue-500" : "bg-neutral-800"}`}
          >
            Export
          </button>
        </div>
      </div>

      {/* scale */}
      <div className="space-y-2">
        {Object.entries(editable).map(([shade, item]) => (
          <div
            key={shade}
            className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3 rounded-xl shadow-sm"
            style={{ background: item.value }}
          >
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={() => toggle(Number(shade))}
            />

            <input
              type="number"
              value={item.label}
              onChange={(e) =>
                changeLabel(Number(shade), Number(e.target.value))
              }
              className="w-20 px-2 py-1 rounded border bg-white"
            />

            <div className="ml-auto w-full sm:w-auto font-mono text-sm bg-white/70 px-2 py-1 rounded text-center">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* saved */}
      {saved.map((item) => (
        <div key={item.name} className="space-y-2">
          <div className="text-sm font-medium">{item.name}</div>

          <div className="flex flex-wrap rounded-lg overflow-hidden border">
            {Object.entries(item.palette).map(([k, c]) => (
              <div
                key={k}
                className="w-1/3 sm:flex-1 h-10 text-xs flex items-end justify-center text-white"
                style={{ background: c }}
              >
                {k}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
