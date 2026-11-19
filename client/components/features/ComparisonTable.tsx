import { Bot, Check, Minus, ShieldCheck, Star, X } from "lucide-react";

type Mark = "yes" | "partial" | "no";

const COLUMNS = [
  { key: "lens", label: "ReviewLens", icon: ShieldCheck },
  { key: "llm", label: "Generic LLM", icon: Bot },
  { key: "stars", label: "Star average", icon: Star },
] as const;

const ROWS: { label: string; detail: string; marks: [Mark, Mark, Mark] }[] = [
  { label: "Spam & astroturf defense", detail: "3-signal filter · 0.986 ROC-AUC", marks: ["yes", "no", "no"] },
  { label: "Cross-lingual clustering", detail: "50+ languages, one vector space", marks: ["yes", "partial", "no"] },
  { label: "Quote-level citations", detail: "Every claim links to review IDs", marks: ["yes", "no", "no"] },
  { label: "Aspect theme ranking", detail: "HDBSCAN + sentiment salience", marks: ["yes", "partial", "no"] },
  { label: "Readable pros & cons", detail: "Grounded, ranked summaries", marks: ["yes", "yes", "no"] },
  { label: "Stateless & private", detail: "CPU-only, zero databases", marks: ["yes", "no", "no"] },
  { label: "Works on any product", detail: "Live search or demo dataset", marks: ["yes", "yes", "yes"] },
];

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes")
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-100 text-sage-700 ring-1 ring-sage-200">
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-label="Yes" />
      </span>
    );
  if (mark === "partial")
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200">
        <Minus className="h-3.5 w-3.5" strokeWidth={3} aria-label="Partial" />
      </span>
    );
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 ring-1 ring-neutral-200">
      <X className="h-3.5 w-3.5" strokeWidth={3} aria-label="No" />
    </span>
  );
}

const HEAD = "h-24";
const ROW = "h-[76px]";

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto pb-2">
      <div role="table" aria-label="ReviewLens compared to alternatives" className="mx-auto flex min-w-[640px] max-w-5xl">
        {/* label column */}
        <div role="rowgroup" className="flex-[1.5]">
          <div role="row" className={`${HEAD} flex items-end pb-5`}>
            <span role="columnheader" className="text-xl font-semibold tracking-tight text-neutral-900">
              Capability
            </span>
          </div>
          {ROWS.map((r) => (
            <div key={r.label} role="row" className={`${ROW} flex flex-col justify-center border-t border-neutral-200 pr-6`}>
              <span role="rowheader" className="text-[15px] font-medium text-neutral-900">
                {r.label}
              </span>
              <span className="mt-0.5 text-xs text-neutral-500">{r.detail}</span>
            </div>
          ))}
        </div>

        {/* value columns sit on one tinted panel; ReviewLens is a raised card inside it */}
        <div className="flex flex-[2] rounded-3xl bg-gradient-to-b from-sage-100/80 via-sage-50 to-transparent">
          {COLUMNS.map((c, ci) => {
            const featured = ci === 0;
            return (
              <div
                key={c.key}
                className={`flex flex-1 flex-col ${
                  featured
                    ? "relative z-10 -my-2 rounded-2xl border border-neutral-200 bg-white py-2 shadow-[0_20px_50px_-24px_rgba(38,50,34,0.45)]"
                    : ""
                }`}
              >
                <div role="columnheader" className={`${HEAD} flex flex-col items-center justify-center gap-1.5`}>
                  <c.icon className={`h-5 w-5 ${featured ? "text-sage-700" : "text-neutral-500"}`} />
                  <span className={`text-sm font-semibold ${featured ? "text-neutral-900" : "text-neutral-600"}`}>
                    {c.label}
                  </span>
                </div>
                {ROWS.map((r) => (
                  <div
                    key={r.label}
                    role="cell"
                    className={`${ROW} flex items-center justify-center border-t ${
                      featured ? "border-neutral-100" : "border-neutral-200/70"
                    }`}
                  >
                    <MarkIcon mark={r.marks[ci]} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5"><MarkIcon mark="yes" /> Built in</span>
        <span className="flex items-center gap-1.5"><MarkIcon mark="partial" /> Partial / unreliable</span>
        <span className="flex items-center gap-1.5"><MarkIcon mark="no" /> Not supported</span>
      </div>
    </div>
  );
}
