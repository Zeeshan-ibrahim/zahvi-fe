"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../routes";


type Mode = "login" | "signup";

export function AuthPageClient() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const body = isLogin
        ? { email, password }
        : { name, email, password, confirmPassword };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        console.error("Auth request failed");
        return;
      }

      if (isLogin) {
        router.push(ROUTES.DASHBOARD);
        router.refresh();
      }
    } catch (error) {
      console.error("Error in handleSubmit", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-black px-4 py-10 text-white sm:px-10 lg:px-20">
      {/* Top navigation / CTA */}
      <header className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          ZaHvi
        </h1>
        <Button
          onClick={() => {
            router.push("/");
          }}
          className="rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-slate-100 shadow-lg shadow-slate-900/60 transition hover:scale-105 hover:bg-white/10"
        >
          Back to home
        </Button>
      </header>

      {/* Auth content */}
      <section className="mt-8 flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-12 lg:mt-16 lg:flex-row">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-purple-500/30 backdrop-blur sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                {isLogin ? "Welcome back" : "Create account"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">
                {isLogin ? "Sign in to ZaHvi" : "Join ZaHvi"}
              </h2>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-full bg-slate-900/80 p-1 text-xs font-medium text-slate-300">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full px-3 py-2 transition ${
                isLogin
                  ? "bg-purple-500 text-white shadow-md shadow-purple-500/40"
                  : "hover:bg-slate-800/80 hover:text-slate-100"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full px-3 py-2 transition ${
                !isLogin
                  ? "bg-purple-500 text-white shadow-md shadow-purple-500/40"
                  : "hover:bg-slate-800/80 hover:text-slate-100"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-200"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Alex Smith"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-slate-200"
                >
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    className="text-[11px] font-medium text-purple-300 underline-offset-2 hover:text-purple-200 hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                id="password"
                type="password"
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium text-slate-200"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {isLogin && (
              <label className="flex items-center gap-2 pt-1 text-xs text-slate-300">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border border-slate-500/70 bg-slate-900/70 text-purple-500 focus:ring-purple-500/40"
                />
                <span>Remember me on this device</span>
              </label>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white shadow-lg shadow-purple-500/40 transition hover:scale-[1.02] hover:bg-purple-400 hover:shadow-purple-400/60 disabled:opacity-60"
              >
                {isLogin ? "Continue" : "Create account here"}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-[11px] text-slate-400">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            <span>or</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>

          {/* Social / secondary */}
          <Button
            type="button"
            variant="outline"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-950/40 text-xs font-medium text-slate-100 shadow-sm shadow-slate-900/60 transition hover:border-white/25 hover:bg-slate-900/80"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-900">
              G
            </span>
            Continue with Google
          </Button>

          <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
            By continuing, you agree to ZaHvi&apos;s{" "}
            <button
              type="button"
              className="font-medium text-slate-300 underline-offset-2 hover:text-slate-200 hover:underline"
            >
              Terms
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-medium text-slate-300 underline-offset-2 hover:text-slate-200 hover:underline"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

