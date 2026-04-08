"use client";
import { useState, useRef, useEffect } from "react";
import { calculateClamp, getClampValue } from "./CalculateClamp";

const FORMATS = ["CSS", "JSON", "Tailwind"];

function buildCSS(configs, unit) {
  const lines = configs
    .map(({ name, minFont, maxFont, minScreen, maxScreen, rootSize }) => {
      const result = calculateClamp(
        minFont,
        maxFont,
        minScreen,
        maxScreen,
        rootSize,
      );
      const value = getClampValue(result, unit);
      const varName = name.toLowerCase().replace(/\s+/g, "-");
      return `  --${varName}: ${value}; /* ${minFont}px → ${maxFont}px | screen ${minScreen}px → ${maxScreen}px */`;
    })
    .join("\n");
  return `:root {\n${lines}\n}`;
}

function buildJSON(configs, unit) {
  const data = configs.map(
    ({ name, minFont, maxFont, minScreen, maxScreen, rootSize }) => {
      const result = calculateClamp(
        minFont,
        maxFont,
        minScreen,
        maxScreen,
        rootSize,
      );
      return {
        name,
        value: getClampValue(result, unit),
        range: `${minFont}px → ${maxFont}px`,
        screen: `${minScreen}px → ${maxScreen}px`,
      };
    },
  );
  return JSON.stringify(data, null, 2);
}

function buildTailwind(configs, unit) {
  const entries = configs
    .map(({ name, minFont, maxFont, minScreen, maxScreen, rootSize }) => {
      const result = calculateClamp(
        minFont,
        maxFont,
        minScreen,
        maxScreen,
        rootSize,
      );
      const value = getClampValue(result, unit);
      const key = name.toLowerCase().replace(/\s+/g, "-");
      return `      /* ${minFont}px → ${maxFont}px | screen ${minScreen}px → ${maxScreen}px */\n      'fluid-${key}': '${value}',`;
    })
    .join("\n");
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontSize: {\n${entries}\n      },\n    },\n  },\n};`;
}

export default function SavedConfigs({
  currentMinFont,
  currentMaxFont,
  currentMinScreen,
  currentMaxScreen,
  currentRootSize,
  unit,
  theme,
}) {
  const isDark = theme === "dark";

  const [configs, setConfigs] = useState([]);
  const [format, setFormat] = useState("CSS");
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [pendingName, setPendingName] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (showNameInput && nameInputRef.current) nameInputRef.current.focus();
  }, [showNameInput]);

  const card = isDark
    ? "bg-[#0d0d0d] border-[#1e1e1e]"
    : "bg-white border-gray-200";
  const rowCls = isDark
    ? "bg-[#111] border-[#1e1e1e]"
    : "bg-gray-50 border-gray-100";
  const muted = isDark ? "text-[#666]" : "text-gray-600";
  const muted2 = isDark ? "text-[#666]" : "text-gray-600";
  const mono = isDark ? "text-[#888]" : "text-gray-600";
  const inputCls = isDark
    ? "bg-[#111] border-[#2a2a2a] text-white focus:border-violet-400"
    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-400";

  const alreadySaved = configs.some(
    (c) =>
      c.minFont === currentMinFont &&
      c.maxFont === currentMaxFont &&
      c.minScreen === currentMinScreen &&
      c.maxScreen === currentMaxScreen,
  );

  const confirmSave = () => {
    if (!pendingName.trim()) return;
    setConfigs((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: pendingName.trim(),
        minFont: currentMinFont,
        maxFont: currentMaxFont,
        minScreen: currentMinScreen,
        maxScreen: currentMaxScreen,
        rootSize: currentRootSize,
      },
    ]);
    setPendingName("");
    setShowNameInput(false);
  };

  const cancelSave = () => {
    setPendingName("");
    setShowNameInput(false);
  };

  const remove = (id) => setConfigs((prev) => prev.filter((c) => c.id !== id));

  const startEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };
  const commitEdit = () => {
    setConfigs((prev) =>
      prev.map((c) =>
        c.id === editingId ? { ...c, name: editName.trim() || c.name } : c,
      ),
    );
    setEditingId(null);
  };

  const exportContent =
    format === "CSS"
      ? buildCSS(configs, unit)
      : format === "JSON"
        ? buildJSON(configs, unit)
        : buildTailwind(configs, unit);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === "CSS" ? "css" : format === "JSON" ? "json" : "js";
    const blob = new Blob([exportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fluid-configs.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`border rounded-2xl p-7 mb-6 ${card}`}>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <p
            className={`text-[14px] uppercase tracking-widest font-mono ${muted}`}
          >
            Saved Configurations
          </p>
          <p className={`text-[12px] font-mono mt-0.5 ${muted2}`}>
            {configs.length === 0
              ? "No configs saved yet"
              : `${configs.length} config${configs.length > 1 ? "s" : ""} saved`}
          </p>
        </div>

        {!showNameInput && (
          <button
            onClick={() => !alreadySaved && setShowNameInput(true)}
            disabled={alreadySaved}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-[12px] font-mono cursor-pointer transition-all ${
              alreadySaved
                ? isDark
                  ? "bg-[#111] border-[#222] text-[#333] cursor-not-allowed"
                  : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                : isDark
                  ? "bg-violet-500/10 border-violet-400/30 text-violet-400 hover:bg-violet-500/20"
                  : "bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100"
            }`}
          >
            {alreadySaved ? "✓ Already saved" : "+ Save current"}
          </button>
        )}
      </div>

      {/* ── Name input (shown after clicking Save current) ── */}
      {showNameInput && (
        <div
          className={`rounded-xl border px-4 py-4 mb-5 ${isDark ? "bg-[#0a0a0a] border-violet-400/20" : "bg-violet-50 border-violet-200"}`}
        >
          <p
            className={`text-[10px] uppercase tracking-widest font-mono mb-3 ${isDark ? "text-violet-400/60" : "text-violet-400"}`}
          >
            Name this configuration
          </p>

          {/* Font + screen range preview */}
          <div
            className={`flex gap-3 flex-wrap text-[12px] font-mono mb-3 ${muted2}`}
          >
            <span>
              {currentMinFont}px → {currentMaxFont}px
            </span>
            <span>·</span>
            <span>
              screen {currentMinScreen}px → {currentMaxScreen}px
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              ref={nameInputRef}
              type="text"
              value={pendingName}
              placeholder="e.g. heading-lg, body-text…"
              onChange={(e) => setPendingName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmSave();
                if (e.key === "Escape") cancelSave();
              }}
              className={`w-full sm:flex-1 border rounded-lg px-3 py-2 text-[13px] font-mono outline-none transition-colors ${inputCls}`}
            />

            <button
              onClick={confirmSave}
              disabled={!pendingName.trim()}
              className={`shrink-0 px-4 py-2 rounded-lg border text-[12px] font-mono cursor-pointer transition-all ${
                pendingName.trim()
                  ? isDark
                    ? "bg-violet-500/20 border-violet-400/50 text-violet-400 hover:bg-violet-500/30"
                    : "bg-violet-100 border-violet-300 text-violet-600 hover:bg-violet-200"
                  : isDark
                    ? "bg-[#111] border-[#222] text-[#333] cursor-not-allowed"
                    : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              Save
            </button>

            <button
              onClick={cancelSave}
              className={`shrink-0 px-3 py-2 rounded-lg border text-[12px] font-mono cursor-pointer transition-all ${
                isDark
                  ? "bg-[#111] border-[#222] text-[#444] hover:text-[#888]"
                  : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600"
              }`}
            >
              Cancel
            </button>
          </div>
          <p className={`text-[10px] font-mono mt-2 ${muted2}`}>
            Press Enter to save · Esc to cancel
          </p>
        </div>
      )}

      {/* ── Current preview chip (when name input not shown) ── */}
      {!showNameInput && (
        <div
          className={`rounded-xl border px-4 py-3 mb-5 flex items-center gap-3 flex-wrap ${isDark ? "bg-[#0a0a0a] border-[#1a1a1a]" : "bg-gray-50 border-gray-100"}`}
        >
          <span
            className={`text-[10px] uppercase tracking-widest font-mono ${muted}`}
          >
            Current
          </span>
          <span
            className={`text-[12px] font-mono ${isDark ? "text-violet-300" : "text-violet-600"}`}
          >
            {currentMinFont}px → {currentMaxFont}px
          </span>
          <span className={`text-[11px] font-mono ${muted2}`}>·</span>
          <span className={`text-[11px] font-mono ${muted2}`}>
            screen {currentMinScreen}px → {currentMaxScreen}px
          </span>
        </div>
      )}

      {/* ── Saved list ── */}
      {configs.length > 0 && (
        <div className="flex flex-col gap-2 mb-5">
          {configs.map((c, i) => {
            const result = calculateClamp(
              c.minFont,
              c.maxFont,
              c.minScreen,
              c.maxScreen,
              c.rootSize,
            );
            const value = getClampValue(result, unit);
            const isEdit = editingId === c.id;

            return (
              <div
                key={c.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${rowCls} flex-wrap`}
              >
                <span className={`text-[10px] font-mono shrink-0 ${muted2}`}>
                  #{i + 1}
                </span>

                {/* Editable name */}
                {isEdit ? (
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                    className={`w-32 border rounded px-2 py-0.5 text-[12px] font-mono outline-none ${inputCls}`}
                  />
                ) : (
                  <button
                    onClick={() => startEdit(c.id, c.name)}
                    title="Click to rename"
                    className={`text-[12px] font-mono w-32 text-left truncate cursor-text transition-colors group flex items-center gap-1 ${isDark ? "text-[#aaa] hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    {c.name}
                    <span
                      className={`text-[9px] opacity-0 group-hover:opacity-100 transition-opacity ${muted2}`}
                    >
                      ✎
                    </span>
                  </button>
                )}

                {/* Range */}
                <span className={`text-[11px] font-mono shrink-0 ${muted}`}>
                  {c.minFont}px → {c.maxFont}px
                </span>
                <span className={`text-[10px] font-mono ${muted2}`}>·</span>
                <span className={`text-[10px] font-mono shrink-0 ${muted2}`}>
                  {c.minScreen}→{c.maxScreen}px
                </span>

                {/* Clamp value */}
                <span
                  className={`flex-1 min-w-0 text-[11px] font-mono truncate ${mono}`}
                >
                  {value}
                </span>

                {/* Remove */}
                <button
                  onClick={() => remove(c.id)}
                  className={`shrink-0 text-[11px] font-mono px-2 py-0.5 rounded border cursor-pointer transition-all ${
                    isDark
                      ? "text-[#444] border-[#222] hover:text-red-400 hover:border-red-400/30"
                      : "text-gray-300 border-gray-200 hover:text-red-400 hover:border-red-300"
                  }`}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Export ── */}
      {configs.length > 0 && (
        <>
          <button
            onClick={() => setShowExport((v) => !v)}
            className={`w-full py-2.5 rounded-xl border text-[12px] font-mono cursor-pointer transition-all mb-4 ${
              showExport
                ? isDark
                  ? "bg-violet-500/10 border-violet-400/30 text-violet-400"
                  : "bg-violet-50 border-violet-200 text-violet-600"
                : isDark
                  ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-[#888]"
                  : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600"
            }`}
          >
            {showExport
              ? "▲ Hide export"
              : `↓ Export ${configs.length} config${configs.length > 1 ? "s" : ""}`}
          </button>

          {showExport && (
            <div>
              <div className="flex gap-1 mb-4">
                {FORMATS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`px-3 py-1 rounded text-[11px] font-mono border cursor-pointer transition-all ${
                      format === f
                        ? "bg-violet-500/20 border-violet-400/50 text-violet-400"
                        : isDark
                          ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-[#888]"
                          : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div
                className={`rounded-xl border p-4 mb-3 overflow-auto max-h-64 ${isDark ? "bg-[#080808] border-[#1a1a1a]" : "bg-gray-50 border-gray-200"}`}
              >
                <pre
                  className={`text-[12px] font-mono leading-relaxed whitespace-pre-wrap break-all ${isDark ? "text-[#888]" : "text-gray-600"}`}
                >
                  {exportContent}
                </pre>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-2.5 rounded-lg text-[12px] font-mono border cursor-pointer transition-all ${
                    copied
                      ? "bg-[#1a2e1a] border-[#2d5a2d] text-green-400"
                      : isDark
                        ? "bg-[#1a1a2e] border-[#3d3d6b] text-violet-400 hover:bg-[#22224a]"
                        : "bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100"
                  }`}
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  className={`flex-1 py-2.5 rounded-lg text-[12px] font-mono border cursor-pointer transition-all ${
                    isDark
                      ? "bg-[#111] border-[#2a2a2a] text-[#555] hover:text-violet-400 hover:border-violet-400/30"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:text-violet-600 hover:border-violet-300"
                  }`}
                >
                  ↓ Download .
                  {format === "CSS" ? "css" : format === "JSON" ? "json" : "js"}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Empty state ── */}
      {configs.length === 0 && !showNameInput && (
        <div className={`text-center py-6 ${muted2}`}>
          <p className="text-[12px] font-mono">
            Tweak the inputs above and hit{" "}
            <span className={isDark ? "text-violet-400" : "text-violet-500"}>
              + Save current
            </span>{" "}
            to build your export list.
          </p>
        </div>
      )}
    </div>
  );
}
