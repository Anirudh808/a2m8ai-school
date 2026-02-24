import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getStore } from "@/lib/store";
import { Clock, FileCheck, AlertTriangle, BookOpen, Sparkles, TrendingUp, Users, Presentation, ArrowRight, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TeacherDashboardPage() {
  const store = getStore();
  // Using a mock "teacher1" just like the existing code, standardizing it
  const teacherId = "teacher1"; 
  const teacherName = store.users.find(u => u.id === teacherId)?.name || "Teacher";
  
  const myClasses = store.classSections.filter((c) => c.teacherIds.includes("teacher1"));
  const pendingGrading = store.submissions.filter((s) => s.status === "SUBMITTED").length;
  const atRisk = 2;

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-8 py-10 shadow-xl sm:px-12 sm:py-14">
        <div className="absolute -right-10 -top-24 h-96 w-96 rounded-full bg-indigo-500/50 blur-3xl"></div>
        <div className="absolute -left-10 -bottom-24 h-72 w-72 rounded-full bg-violet-500/50 blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
              <Sparkles className="h-4 w-4" /> Wait till you see today&apos;s insights
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Welcome back, {teacherName}!
            </h1>
            <p className="max-w-xl text-indigo-100 text-base sm:text-lg">
              You have {myClasses.length} classes today. 3 students need your attention before the next math test.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg" asChild>
              <Link href="/teacher/live">
                <Presentation className="mr-2 h-4 w-4" /> Start Live Class
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-blue-900">Today&apos;s Classes</CardTitle>
            <div className="rounded-xl bg-blue-100 p-2 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <Clock className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-950">{myClasses.length}</div>
            <p className="text-sm font-medium text-blue-600/80 mt-1">Grade 6A Math, Science</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-900">Pending Grading</CardTitle>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <FileCheck className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-950">{pendingGrading}</div>
            <p className="text-sm font-medium text-emerald-600/80 mt-1">Submissions to review</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-br from-rose-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-rose-900">At-Risk Students</CardTitle>
            <div className="rounded-xl bg-rose-100 p-2 text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-950">{atRisk}</div>
            <p className="text-sm font-medium text-rose-600/80 mt-1">Flagged for attention</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-br from-indigo-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-indigo-900">Quick Actions</CardTitle>
            <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <Sparkles className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mt-2">
              <Link href="/teacher/assignments" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                <BookOpen className="mr-2 h-4 w-4" /> Create Assignment
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:gap-8 pt-4">
        {/* Main Content - Classes */}
        <div className="md:col-span-4 xl:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">My Classes</h2>
            <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
              <Link href="/teacher/classes">View All</Link>
            </Button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {myClasses.map((cs) => (
              <Card key={cs.id} className="group overflow-hidden border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500" />
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Grade {cs.grade} - {cs.sectionName}</CardTitle>
                      <CardDescription className="mt-1">Mathematics & Science</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      <Users className="mr-1 h-3 w-3" /> {cs.studentIds.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-600 mt-2 border-t pt-4 border-slate-100">
                    <span className="flex items-center">
                      <Clock className="mr-1.5 h-4 w-4 text-slate-400" />
                      Next: 10:30 AM
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 group-hover:text-indigo-600" asChild>
                      <Link href={`/teacher/classes/${cs.id}`}>
                        Manage <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {myClasses.length === 0 && (
              <div className="col-span-full rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
                <p className="text-slate-500 font-medium">No classes assigned yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - AI Insights */}
        <div className="md:col-span-3 xl:col-span-2 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Recent AI Insights</h2>
          
          <Card className="border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-white shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit className="h-24 w-24 text-indigo-600" />
            </div>
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-1">
                <Sparkles className="h-4 w-4" /> Insight Analyzer
              </div>
              <CardTitle className="text-base text-slate-900 leading-snug">Class Performance Trend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="rounded-lg bg-white p-3 shadow-sm border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-rose-100 p-1">
                    <TrendingUp className="h-4 w-4 text-rose-600 rotate-180" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Fractions Mastery</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      3 students in Grade 6A are struggling with mixed fractions. Suggest running the remedial worksheet.
                    </p>
                    <Button variant="link" className="h-auto p-0 text-xs text-indigo-600 mt-2">Generate Worksheet →</Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-3 shadow-sm border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-100 p-1">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Engagement Spike</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Your interactive quiz yesterday improved class participation by 24%.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
