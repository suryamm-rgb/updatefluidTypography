import Link from "next/link";

const tools = [
  {
    href: "/fluid-typography",
    label: "Fluid Typography",
    description:
      "Generate CSS clamp() formulas that scale smoothly between screen sizes.",
    tag: "CSS Utility",
  },
  {
    href: "/fluid-spacing",
    label: "Fluid Spacing",
    description:
      "Generate clamp() values for padding, margin and gap — with live curve visualization.",
    tag: "CSS Utility",
  },
  {
    href: "/line-height",
    label: "Fluid Line Height",
    description:
      "Generate responsive line-height clamp() values with viewport simulator and live preview.",
    tag: "Typography",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-10 sm:py-12 font-(family-name:--font-dm-mono)">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <span className="inline-block bg-violet-50 border border-violet-200 rounded px-2.5 py-1 text-[11px] text-violet-600 uppercase tracking-widest mb-4">
            Developer Tools
          </span>

          <h1 className="font-(family-name:--font-syne) text-3xl sm:text-4xl font-bold text-gray-900 leading-none tracking-tight">
            CSS Utilities
          </h1>

          <p className="text-gray-500 text-[13px] mt-2.5 leading-relaxed max-w-xl">
            A collection of small tools to make your frontend workflow faster.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="flex flex-col gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-gray-200 hover:border-violet-300 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                    {tool.tag}
                  </span>

                  <h2 className="font-(family-name:--font-syne) text-lg font-semibold text-gray-900 m-0 group-hover:text-violet-600 transition-colors">
                    {tool.label}
                  </h2>

                  <p className="text-gray-500 text-[12px] mt-1.5 leading-relaxed m-0">
                    {tool.description}
                  </p>
                </div>

                <span className="text-gray-400 group-hover:text-violet-600 transition-colors text-xl mt-1 shrink-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-14 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span className="text-[11px] text-gray-500 uppercase tracking-widest">
            CSS Utilities
          </span>

          <span className="text-[11px] text-gray-500">
            Built by{" "}
            <span className="text-gray-700 hover:text-violet-600 transition-colors">
              Surya M M
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
