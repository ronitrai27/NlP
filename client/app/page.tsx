"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  ArrowUp,
  BarChart3,
  Globe2,
  Layers,
  Search,
  ShieldAlert,
  ShieldCheck,
  Play,
} from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const SAMPLE_QUERIES = [
  "wireless headphones",
  "mechanical keyboard",
  "espresso machine",
  "4k webcam",
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setValidationError("Enter at least 2 characters to search products.");
      return;
    }
    setValidationError(null);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <main className="flex-1 bg-white">
      {/* Hero: full-screen looping video, everything else sits on top of it */}
      <section
        data-home-hero
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white"
      >
        <HeroVideo />

        {/* Video stays crisp; only the bottom edge gets a blurred white fade into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 backdrop-blur-xl [mask-image:linear-gradient(to_top,black_35%,transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/70 to-transparent" />

        {/* Brand (the global navbar is hidden on this page) */}
        <div className="absolute left-0 top-0 z-10 flex items-center gap-2.5 px-4 py-5 sm:px-6 lg:px-8 2xl:px-12">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900 text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-base font-bold tracking-tight text-neutral-900">
            ReviewLens
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-24 pt-28 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white/85 p-1 pr-3 text-xs font-medium text-neutral-800 backdrop-blur">
            <span className="rounded-md bg-neutral-900 px-2 py-1 text-[11px] font-semibold text-white">
              New
            </span>
            Stateless Multilingual NLP Pipeline.
          </div>

          <h1 className="mx-auto max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-900 sm:text-6xl lg:text-7xl">
            Turn noisy product reviews into verified intelligence
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base font-medium leading-relaxed text-neutral-900 [text-shadow:0_0_18px_rgba(255,255,255,0.95),0_0_6px_rgba(255,255,255,0.7)] sm:text-lg">
            Filter coordinated spam campaigns, cluster multilingual feedback
            across languages, and generate grounded pros, cons, and theme
            breakdowns traced directly to real customer quotes.
          </p>

          {/* Search: just a white, fully rounded input floating over the video */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 w-full max-w-2xl"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="Search any product (e.g., Sony WH-1000XM5, mechanical keyboard)"
                aria-label="Search products"
                className="h-16 w-full rounded-full border-0 bg-white pl-14 pr-20 text-base text-neutral-900 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.25)] outline-none placeholder:text-neutral-400 focus:ring-4 focus:ring-white/70"
              />
              <button
                type="submit"
                aria-label="Search products"
                className="absolute right-2.5 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
            {validationError && (
              <p className="mt-3 text-sm font-medium text-red-700">
                {validationError}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="font-medium text-neutral-800">Popular searches:</span>
              {SAMPLE_QUERIES.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() =>
                    router.push(`/search?q=${encodeURIComponent(sample)}`)
                  }
                  className="cursor-pointer rounded-full bg-white/75 px-3.5 shadow-sm py-1.5 font-medium text-neutral-800 backdrop-blur hover:bg-white"
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 text-sm font-medium text-neutral-800">
              <Link
                href="/product/demo"
                className="inline-flex items-center gap-1.5 hover:text-neutral-950"
              >
                <Play className="h-4 w-4" />
                Try the demo product
              </Link>
              <Link
                href="/evaluation"
                className="inline-flex items-center gap-1.5 hover:text-neutral-950"
              >
                <BarChart3 className="h-4 w-4" />
                Model evaluation
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* Features & Architecture Section */}
      <Features />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
