"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, Check, Filter, Play } from "lucide-react";
import FeatureSlider from "@/components/features/FeatureSlider";
import ComparisonTable from "@/components/features/ComparisonTable";
import MistBackdrop from "@/components/features/MistBackdrop";

const STATS = [
  { value: "0.986", label: "Spam ROC-AUC" },
  { value: "50+", label: "Languages, one vector space" },
  { value: "100%", label: "Claims cited to quotes" },
  { value: "0", label: "Databases or trackers" },
];

const TABS = [
  { key: "spam", label: "Spam defense" },
  { key: "multilingual", label: "Multilingual space" },
  { key: "themes", label: "Aspect clustering" },
  { key: "citations", label: "Quote lineage" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white p-1 pr-3 text-xs font-medium text-neutral-800">
        <span className="rounded-md bg-neutral-900 px-2 py-1 text-[11px] font-semibold text-white">{eyebrow}</span>
        ReviewLens pipeline
      </div>
      <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-neutral-900 sm:text-5xl">
        {title}
      </h2>
      {body && <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">{body}</p>}
    </div>
  );
}

const panel = "rounded-2xl border border-neutral-200 bg-white p-5";

function Sandbox() {
  const [tab, setTab] = useState<TabKey>("spam");
  const [filtered, setFiltered] = useState(true);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-sage-50/60 p-6 sm:p-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Inspect the intelligence layer
          </h3>
          <p className="mt-2 text-sm text-neutral-600">Switch between the pillars to see how each one behaves.</p>
        </div>
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-neutral-200 bg-white p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                tab === t.key ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div key={tab} className="animate-rise-in mt-8">
        {tab === "spam" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className={panel}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500">Calculated product score</span>
                <button
                  type="button"
                  onClick={() => setFiltered(!filtered)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    filtered ? "bg-neutral-900 text-white" : "bg-red-50 text-red-700 ring-1 ring-red-200"
                  }`}
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filter {filtered ? "on" : "off"}
                </button>
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-5xl font-semibold tracking-tight text-neutral-900">{filtered ? "3.8" : "4.7"}</span>
                <span className="text-xs text-neutral-500">out of 5 · {filtered ? "94 genuine reviews" : "108 reviews (14 spam)"}</span>
              </div>
              <p className="mt-3 text-sm text-neutral-600">
                {filtered
                  ? "14 coordinated astroturfing reviews were identified and removed (MinHash-LSH match + sentiment divergence)."
                  : "Duplicate promotional reviews from single-day posters are inflating the aggregate."}
              </p>
            </div>
            <div className={panel}>
              <span className="text-xs font-medium text-neutral-500">Campaign signals flagged</span>
              <div className="mt-4 divide-y divide-neutral-100 text-sm">
                {[
                  ["MinHash-LSH near-duplicates", "8 templates"],
                  ["Rating / text mismatch", "4 reviews"],
                  ["Char n-gram classifier", "0.986 ROC-AUC"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-3">
                    <span className="text-neutral-700">{k}</span>
                    <span className="font-semibold text-neutral-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "multilingual" && (
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["DE", "Der Akku hält problemlos über drei Tage bei normaler Nutzung.", "+0.92"],
              ["JA", "バッテリーの持ちが非常に良く、充電の手間が減りました。", "+0.95"],
              ["ES", "La batería dura muchísimo tiempo, excelente para viajar.", "+0.89"],
            ].map(([code, text, score]) => (
              <div key={code} className={panel}>
                <span className="rounded-md bg-neutral-900 px-1.5 py-0.5 text-[10px] font-bold text-white">{code}</span>
                <p className="mt-3 text-sm italic text-neutral-700">&ldquo;{text}&rdquo;</p>
                <p className="mt-4 text-xs font-medium text-sage-700">Clustered to: Battery longevity ({score})</p>
              </div>
            ))}
          </div>
        )}

        {tab === "themes" && (
          <div className="space-y-4">
            {[
              { name: "Active noise cancellation", meta: "42 mentions · +0.86", pct: 86, bar: "bg-sage-500", note: "Praise for low-frequency rumble cancellation on planes and subways." },
              { name: "Microphone wind sensitivity", meta: "19 mentions · −0.74", pct: 74, bar: "bg-red-400", note: "Callers report wind buffeting outdoors." },
            ].map((t) => (
              <div key={t.name} className={panel}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-neutral-900">{t.name}</span>
                  <span className="text-xs font-medium text-neutral-500">{t.meta}</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-neutral-100">
                  <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${t.pct}%` }} />
                </div>
                <p className="mt-3 text-sm text-neutral-600">{t.note}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "citations" && (
          <div className={`${panel} flex items-start gap-3`}>
            <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-sage-100 text-sage-700">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <div>
              <span className="text-xs font-medium text-neutral-500">Synthesized insight</span>
              <p className="mt-1 text-base font-medium text-neutral-900">
                &ldquo;Earcups stay comfortable over multi-hour sessions without ear fatigue.&rdquo;
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["#12 “Wore them 6 hours straight…”", "#39 “Memory foam padding is top tier”"].map((c) => (
                  <span key={c} className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="From raw reviews to verified truth"
          body="Star ratings and generic LLMs swallow bot campaigns, fake praise and translation drift. ReviewLens runs a stateless multilingual pipeline that shows what verified customers actually experience."
        />

        <div className="mt-16">
          <FeatureSlider />
        </div>

        {/* stats strip */}
        <dl className="mt-20 grid grid-cols-2 gap-y-10 border-y border-neutral-200 py-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-2 text-center">
              <dt className="mt-2 text-sm text-neutral-500">{s.label}</dt>
              <dd className="text-4xl font-semibold tracking-[-0.04em] text-neutral-900 sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-24">
          <Sandbox />
        </div>

        <div className="mt-32">
          <SectionHeading
            eyebrow="Compare"
            title="How ReviewLens compares"
            body="Why an aspect-based NLP pipeline beats raw LLM prompts and star averages."
          />
          <div className="mt-14">
            <ComparisonTable />
          </div>
        </div>

        {/* CTA on the same misty hills as the hero */}
        <div className="relative mt-32 overflow-hidden rounded-3xl border border-black/5 px-6 py-20 text-center sm:px-12 sm:py-24">
          <MistBackdrop id="cta" variant="sage" />
          <div className="relative">
            <h3 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] text-neutral-900 sm:text-5xl">
              Test drive the ReviewLens engine
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-700">
              Explore the bundled multilingual demo, analyze live Walmart reviews, or inspect our evaluation benchmarks.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/product/demo"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-neutral-800"
              >
                <Play className="h-4 w-4" />
                Launch demo product
              </Link>
              <Link
                href="/evaluation"
                className="inline-flex items-center gap-2 rounded-full bg-white/85 px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur transition-colors hover:bg-white"
              >
                <BarChart3 className="h-4 w-4" />
                View benchmarks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
