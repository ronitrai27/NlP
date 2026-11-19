"use client";

import { ReactNode, useState } from "react";
import {
  CheckCircle2,
  Copy,
  Gauge,
  Languages,
  Quote,
  Star,
} from "lucide-react";
import MistBackdrop from "./MistBackdrop";

const DURATION_MS = 6000;

/** Wraps a mockup row so it rises in, staggered by `i`, each time its card becomes active. */
function Rise({ i, children, className = "" }: { i: number; children: ReactNode; className?: string }) {
  return (
    <div className={`animate-rise-in ${className}`} style={{ animationDelay: `${120 + i * 110}ms` }}>
      {children}
    </div>
  );
}

const glass =
  "rounded-2xl border border-white/70 bg-white/80 shadow-[0_8px_30px_-12px_rgba(38,50,34,0.35)] backdrop-blur-md";

function IngestMock() {
  const rows = [
    { lang: "EN", text: "Battery easily lasts the whole week", conf: "0.99" },
    { lang: "DE", text: "Der Akku hält drei Tage durch", conf: "0.97" },
    { lang: "JA", text: "バッテリーの持ちが非常に良い", conf: "0.99" },
    { lang: "ES", text: "La batería dura muchísimo", conf: "0.96" },
  ];
  return (
    <div className="w-[330px] space-y-2.5">
      <Rise i={0} className={`${glass} flex items-center justify-between px-4 py-3`}>
        <span className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <Languages className="h-4 w-4 text-sage-600" />
          248 reviews ingested
        </span>
        <span className="text-xs text-neutral-500">live</span>
      </Rise>
      {rows.map((r, i) => (
        <Rise key={r.lang} i={i + 1} className={`${glass} ml-6 flex items-center gap-3 px-3.5 py-2.5`}>
          <span className="rounded-md bg-neutral-900 px-1.5 py-0.5 text-[10px] font-bold text-white">{r.lang}</span>
          <span className="min-w-0 flex-1 truncate text-xs text-neutral-700">{r.text}</span>
          <span className="text-[11px] font-semibold text-sage-700">{r.conf}</span>
        </Rise>
      ))}
    </div>
  );
}

function SpamMock() {
  const rows = [
    { icon: Copy, label: "Near-duplicate flagged", meta: "MinHash · 12s ago" },
    { icon: Star, label: "Rating mismatch", meta: "5★ / negative text" },
    { icon: Gauge, label: "Classifier score 0.94", meta: "removed" },
  ];
  return (
    <div className="w-[330px]">
      <Rise i={0} className={`${glass} flex items-center gap-2.5 px-4 py-3.5`}>
        <CheckCircle2 className="h-4.5 w-4.5 text-sage-600" />
        <span className="text-sm font-semibold text-neutral-900">Spam check completed</span>
      </Rise>
      <div className="relative ml-5 mt-3 space-y-3 border-l border-dashed border-neutral-400/70 pl-5">
        {rows.map((r, i) => (
          <Rise key={r.label} i={i + 1} className={`${glass} flex items-center gap-2.5 px-3.5 py-2.5`}>
            <r.icon className="h-4 w-4 text-neutral-500" />
            <span className="text-xs font-medium text-neutral-800">{r.label}</span>
            <span className="ml-auto text-[11px] text-neutral-500">{r.meta}</span>
          </Rise>
        ))}
      </div>
    </div>
  );
}

function ClusterMock() {
  const pins = [
    { code: "DE", x: "18%", y: "22%" },
    { code: "JA", x: "74%", y: "18%" },
    { code: "ES", x: "12%", y: "68%" },
    { code: "HI", x: "80%", y: "66%" },
    { code: "FR", x: "48%", y: "8%" },
  ];
  return (
    <div className="relative h-[290px] w-[360px]">
      {/* dot field */}
      <div
        className="absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,black_35%,transparent_72%)]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.95) 1.3px, transparent 1.6px)",
          backgroundSize: "11px 11px",
        }}
      />
      <div className="absolute inset-0">
        {pins.map((p, i) => (
          <div key={p.code} className="absolute" style={{ left: p.x, top: p.y }}>
            <Rise i={i}>
              <span className="flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-neutral-900 text-[11px] font-bold text-white shadow-lg">
                {p.code}
              </span>
            </Rise>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Rise i={5} className={`${glass} whitespace-nowrap px-4 py-3 text-center`}>
          <p className="text-sm font-semibold text-neutral-900">Battery life</p>
          <p className="mt-0.5 text-[11px] text-neutral-500">42 mentions · 5 languages</p>
        </Rise>
      </div>
    </div>
  );
}

function SynthesisMock() {
  const themes = [
    { name: "Battery life", n: 42, tone: "pro" },
    { name: "Noise cancelling", n: 31, tone: "pro" },
    { name: "Comfort", n: 24, tone: "pro" },
    { name: "Mic in wind", n: 19, tone: "con" },
  ];
  return (
    <div className="w-[320px]">
      <Rise i={0} className={`${glass} p-1.5`}>
        {themes.map((t) => (
          <div key={t.name} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-white">
            <span className="flex items-center gap-2 text-neutral-800">
              <span className={`h-1.5 w-1.5 rounded-full ${t.tone === "pro" ? "bg-sage-500" : "bg-red-400"}`} />
              {t.name}
            </span>
            <span className="text-xs text-neutral-500">{t.n}×</span>
          </div>
        ))}
      </Rise>
      <Rise i={2} className={`${glass} mt-3 px-4 py-3`}>
        <p className="flex items-start gap-2 text-xs text-neutral-800">
          <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-600" />
          Battery lasts three days of normal use.
        </p>
        <div className="mt-2 flex gap-1.5">
          {["#14", "#39", "#57"].map((id) => (
            <span key={id} className="rounded-md bg-neutral-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {id}
            </span>
          ))}
          <span className="ml-auto text-[11px] font-medium text-sage-700">grounded</span>
        </div>
      </Rise>
    </div>
  );
}

const FEATURES = [
  {
    title: "Ingestion & language ID",
    body: "Live Walmart reviews or your own dataset. Lingua tags 50+ languages with statistical confidence before anything else runs.",
    variant: "sage" as const,
    Mock: IngestMock,
  },
  {
    title: "3-signal spam filter",
    body: "A char n-gram classifier (0.986 ROC-AUC), MinHash-LSH near-duplicates and rating/sentiment mismatch strip coordinated campaigns.",
    variant: "stone" as const,
    Mock: SpamMock,
  },
  {
    title: "Cross-lingual clustering",
    body: "Multilingual MiniLM puts every sentence in one vector space, so HDBSCAN groups German, Japanese and English feedback together.",
    variant: "moss" as const,
    Mock: ClusterMock,
  },
  {
    title: "Grounded synthesis",
    body: "Pros and cons ranked by mentions and sentiment, each one traced back to the verbatim customer quotes that support it.",
    variant: "fern" as const,
    Mock: SynthesisMock,
  },
];

export default function FeatureSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setActive((a) => (a + 1) % FEATURES.length);

  return (
    <div
      className="flex flex-col gap-3 lg:h-[600px] lg:flex-row lg:gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {FEATURES.map((f, i) => {
        const isActive = i === active;
        return (
          <div
            key={f.title}
            className="flex min-w-0 flex-col transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ flexGrow: isActive ? 2.4 : 1, flexBasis: 0 }}
          >
            {/* card */}
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${f.title}`}
              aria-pressed={isActive}
              className={`relative cursor-pointer overflow-hidden rounded-3xl border border-black/5 text-left transition-[height,opacity] duration-500 lg:flex-1 ${
                isActive ? "h-[360px] lg:h-auto" : "hidden lg:block lg:opacity-90 lg:hover:opacity-100"
              }`}
            >
              <MistBackdrop id={`f${i}`} variant={f.variant} />
              <div className="absolute inset-0 flex items-center justify-center [&>*]:shrink-0">
                {/* key remounts the mockup so its rows animate in again each time */}
                <f.Mock key={isActive ? `on-${active}` : "off"} />
              </div>
            </button>

            {/* caption + progress line */}
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group shrink-0 cursor-pointer text-left lg:h-40"
            >
              <div className="relative mt-3 h-px w-full overflow-hidden bg-neutral-200 lg:mt-5">
                {isActive && (
                  <div
                    key={active}
                    className="animate-feature-progress absolute inset-0 bg-sage-600"
                    style={{
                      animationDuration: `${DURATION_MS}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={next}
                  />
                )}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed">
                <span
                  className={`font-semibold transition-colors ${
                    isActive ? "text-neutral-900" : "text-neutral-500 group-hover:text-neutral-800"
                  }`}
                >
                  {f.title}
                </span>
                {isActive && (
                  <span className="animate-rise-in text-neutral-500" style={{ animationDelay: "150ms" }}>
                    {" "}
                    {f.body}
                  </span>
                )}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
}

