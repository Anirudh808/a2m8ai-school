"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DEMO_USERS } from "@/lib/seed";
import type { UserRole } from "@/lib/types";
import { GraduationCap, School, UserCircle, Users, Sparkles, ArrowRight, Zap, Shield, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  { id: "basic", name: "Basic", desc: "Essential features" },
  { id: "premium", name: "Premium", desc: "Advanced features" },
  { id: "premium_plus", name: "Premium+", desc: "Full access" },
] as const;

const USER_TYPES: { id: UserRole; name: string; icon: typeof School }[] = [
  { id: "ADMIN", name: "Admin", icon: School },
  { id: "TEACHER", name: "Teacher", icon: GraduationCap },
  { id: "STUDENT", name: "Student", icon: UserCircle },
  { id: "PARENT", name: "Parent", icon: Users },
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const explicitRedirect = searchParams.get("redirect");
  const [planId, setPlanId] = useState<string>(PLANS[0].id);
  const [userType, setUserType] = useState<UserRole | "">("");
  const [personaId, setPersonaId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  const personas = useMemo(() => {
    return DEMO_USERS.filter((u) => u.role === userType);
  }, [userType]);

  const handleUserTypeChange = (role: UserRole) => {
    setUserType(role);
    const first = DEMO_USERS.find((u) => u.role === role);
    setPersonaId(first?.id ?? "");
  };

  const getDashboardPath = (role: UserRole) => {
    const base = role === "ADMIN" ? "/admin" : role === "TEACHER" ? "/teacher" : role === "STUDENT" ? "/student" : "/parent";
    return `${base}/dashboard`;
  };

  const handleLogin = async () => {
    const userId = personaId || personas[0]?.id;
    if (!userId || !userType) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, planId }),
      });
      if (!res.ok) throw new Error("Login failed");
      const { user } = await res.json();
      setUser(user);

      const targetPath = explicitRedirect && ["/admin", "/teacher", "/student", "/parent"].some((p) => explicitRedirect.startsWith(p))
        ? explicitRedirect
        : getDashboardPath(user.role);
      router.push(targetPath);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const canSubmit = userType && (personaId || personas.length > 0) && !isLoading;

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-zinc-950 p-12 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            School LMS
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            The next generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">digital learning</span>.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Empower your institution with AI-driven insights, seamless communication, and unlimited adaptive practice.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                <Zap className="h-4 w-4 text-indigo-400" />
              </div>
              <span className="text-sm font-medium text-zinc-300">AI Teaching Assistant</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                <Shield className="h-4 w-4 text-violet-400" />
              </div>
              <span className="text-sm font-medium text-zinc-300">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                <BookOpen className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-zinc-300">Adaptive Practice</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-zinc-500 font-medium tracking-wide uppercase">
            Trusted by modern schools worldwide
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="absolute inset-0 bg-slate-50/50 -z-10" />
        
        <div className="w-full max-w-[440px] space-y-8">
          {/* Mobile Header */}
          <div className="flex flex-col items-center text-center lg:hidden space-y-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
              <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
            </div>
          </div>

          <div className="hidden lg:block space-y-2 mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in</h2>
            <p className="text-slate-500">Enter your portal easily through our demo identities.</p>
          </div>

          <div className="space-y-6">
            {/* Plan Required for Demo (Optional for visual, keeping it for the functionality) */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700">Select Plan Tier</Label>
              <div className="grid grid-cols-3 gap-3">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlanId(p.id)}
                    className={cn(
                      "flex flex-col items-start p-3 rounded-xl border-2 transition-all duration-200",
                      planId === p.id
                        ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <span className={cn("text-sm font-bold", planId === p.id ? "text-indigo-900" : "text-slate-700")}>{p.name}</span>
                    <span className={cn("text-[10px] sm:text-xs mt-0.5", planId === p.id ? "text-indigo-600" : "text-slate-500")}>{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700">I am a...</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {USER_TYPES.map((t) => {
                  const Icon = t.icon;
                  const isSelected = userType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleUserTypeChange(t.id)}
                      className={cn(
                         "group flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2",
                        isSelected
                          ? "border-indigo-600 bg-indigo-600 shadow-md shadow-indigo-600/20 transform scale-[1.02]"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <Icon className={cn("h-6 w-6 transition-colors", isSelected ? "text-white" : "text-slate-500 group-hover:text-slate-700")} />
                      <span className={cn("text-sm font-semibold transition-colors", isSelected ? "text-white" : "text-slate-700")}>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Demo Identity Selection */}
            {userType && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label className="text-sm font-semibold text-slate-700">Select Demo Profile</Label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-4 pr-10 text-sm font-medium text-slate-900 transition-colors focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 shadow-sm cursor-pointer"
                    value={personaId}
                    onChange={(e) => setPersonaId(e.target.value)}
                  >
                    {personas.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Button
                className="group w-full h-12 rounded-xl bg-indigo-600 text-[15px] font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/25 disabled:opacity-50 disabled:hover:shadow-none"
                onClick={handleLogin}
                disabled={!canSubmit}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Continue to Dashboard</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-6 pt-4 text-sm font-medium">
            <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <div className="h-4 w-px bg-slate-200"></div>
            <Link href="/pricing" className="text-slate-500 hover:text-slate-900 transition-colors">
              Plans & Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
