import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-slate-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent" />
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-xl shadow-indigo-200">
          <GraduationCap className="h-8 w-8" />
        </div>
        <h1 className="text-center text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          School LMS
        </h1>
        <p className="max-w-lg text-center text-lg text-slate-600">
          Production-grade Learning Management System for schools. Demo login, role-based access, and subscription gating.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-xl px-8 shadow-lg shadow-indigo-200">
            <Link href="/login">Login to Demo</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="rounded-xl px-8">
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
        <div className="mt-8 flex gap-8 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Admin, Teacher, Student
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Parent Mode
          </span>
        </div>
      </div>
    </div>
  );
}
