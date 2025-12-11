"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-black px-4 py-10 text-white sm:px-10 lg:px-20">
      {/* Top navigation / CTA */}
      <header className="flex w-full max-w-6xl items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          ZaHvi
        </h1>
        <Button 
        onClick={() => {
          router.push("/login");
        }}
        className="rounded-full bg-purple-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/40 transition hover:scale-105 hover:bg-purple-400 hover:shadow-purple-400/60">
          Login / Signup
        </Button>
      </header>

      {/* Hero content */}
      <section className="mt-8 flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-10 lg:mt-16 lg:flex-row">
        {/* Copy */}
        <div className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Secure, private, always with you
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl sm:leading-tight lg:text-6xl">
              Your memories,
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">
                {" "}
                beautifully kept
              </span>
            </h2>
            <p className="text-sm text-slate-300 sm:text-base">
              ZaHvi is your single place for photos, notes, and moments that
              matter. Organize, rediscover, and relive your story whenever you
              want.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button className="h-11 rounded-full bg-purple-500 px-6 text-sm font-medium text-white shadow-lg shadow-purple-500/40 transition hover:scale-105 hover:bg-purple-400 hover:shadow-purple-400/60">
              Start keeping memories
            </Button>
            <button className="text-xs font-medium text-slate-300 underline-offset-4 hover:text-slate-100 hover:underline sm:text-sm">
              See how ZaHvi works
            </button>
          </div>
          <p className="text-xs text-slate-400">
            End‑to‑end encryption and instant sync across your devices.
          </p>
        </div>

        {/* Rotating image */}
        <div className="relative flex items-center justify-center">
          {/* Soft glow behind globe */}
          <div className="pointer-events-none absolute inset-0 blur-3xl">
            <div className="h-64 w-64 rounded-full bg-purple-500/10" />
          </div>
        </div>
      </section>
    </main>
  );
}
