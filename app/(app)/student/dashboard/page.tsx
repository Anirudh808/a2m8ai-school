import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getStore } from "@/lib/store";
import { Flame, BookOpen, FileCheck, Calendar, Sparkles, Clock, Presentation, ArrowRight, BrainCircuit, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseProgressWidget } from "@/components/student/course-progress-widget";

export default function StudentDashboardPage() {
  const store = getStore();
  // Using a mock "student1" just like the existing code
  const studentId = "student1";
  const studentName = store.users.find(u => u.id === studentId)?.name || "Student";
  
  const myClassIds = store.classSections.filter((c) => c.studentIds.includes(studentId)).map((c) => c.id);
  const myClasses = store.classSections.filter((c) => c.studentIds.includes(studentId));
  const myAssignments = store.assignments.filter((a) => myClassIds.includes(a.classSectionId));
  const pendingAssignments = store.submissions.filter((s) => s.studentId === studentId && (s.status === "PENDING" || s.status === "LATE"));
  
  // Group assignments by class for display
  const getClassForAssignment = (classSectionId: string) => {
    return myClasses.find(c => c.id === classSectionId);
  };

  const streakDays = 5; // Fixed mock for streak
  
  // Calculate completion rate mock
  const completedAssignments = store.submissions.filter((s) => s.studentId === studentId && (s.status === "SUBMITTED" || s.status === "GRADED")).length;
  const totalMyAssignments = myAssignments.length;
  const completionRate = totalMyAssignments > 0 ? Math.round((completedAssignments / totalMyAssignments) * 100) : 100;

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-violet-600 px-8 py-10 shadow-xl sm:px-12 sm:py-14">
        <div className="absolute -right-10 -top-24 h-96 w-96 rounded-full bg-violet-500/50 blur-3xl"></div>
        <div className="absolute -left-10 -bottom-24 h-72 w-72 rounded-full bg-indigo-500/50 blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-amber-300" /> You&apos;re on a {streakDays} day learning streak!
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Hello, {studentName}!
            </h1>
            <p className="max-w-xl text-violet-100 text-base sm:text-lg">
              You have {myClasses.length} classes today and {pendingAssignments.length} pending assignments left to clear. Let&apos;s make it a productive day!
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button className="bg-white text-violet-700 hover:bg-violet-50 shadow-lg" asChild>
              <Link href="/student/live">
                <Presentation className="mr-2 h-4 w-4" /> Join Live Class
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-orange-900">Learning Streak</CardTitle>
            <div className="rounded-xl bg-orange-100 p-2 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
              <Flame className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-950">{streakDays} Days</div>
            <p className="text-sm font-medium text-orange-600/80 mt-1">Keep it up! 🔥</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-blue-900">Today&apos;s Subjects</CardTitle>
            <div className="rounded-xl bg-blue-100 p-2 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-950">{myClasses.length}</div>
            <p className="text-sm font-medium text-blue-600/80 mt-1">Math, Science, English</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-br from-rose-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-rose-900">Pending To-Do</CardTitle>
            <div className="rounded-xl bg-rose-100 p-2 text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
              <FileCheck className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-950">{pendingAssignments.length}</div>
            <p className="text-sm font-medium text-rose-600/80 mt-1">Assignments due soon</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-900">Completion Rate</CardTitle>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <Target className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-950">{completionRate}%</div>
            <p className="text-sm font-medium text-emerald-600/80 mt-1">On track this week!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:gap-8 pt-4">
        {/* Main Content - Classes & Assignments */}
        <div className="md:col-span-4 xl:col-span-5 space-y-8">
          
          {/* My Classes Today */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">My Schedule</h2>
              <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                <Link href="/student/courses">All Courses</Link>
              </Button>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {myClasses.map((cs) => (
                <Card key={cs.id} className="group overflow-hidden border-slate-200 hover:border-violet-300 hover:shadow-md transition-all">
                  <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        {/* We are mocking the subject name for visual interest, since store doesn't easily map this without expanding relational logic in UI*/}
                        <CardTitle className="text-lg">Grade {cs.grade} - {cs.sectionName}</CardTitle>
                        <CardDescription className="mt-1">Mathematics & Science Core</CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                        <Clock className="mr-1 h-3 w-3" /> 45m
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-600 mt-2 border-t pt-4 border-slate-100">
                      <span className="flex items-center font-medium">
                        Next session mapping
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 text-violet-600 group-hover:text-violet-800 group-hover:bg-violet-50" asChild>
                        <Link href={`/student/courses/${cs.id}`}>
                          Study Hub <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {myClasses.length === 0 && (
                <div className="col-span-full rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
                  <p className="text-slate-500 font-medium">No schedule available right now.</p>
                </div>
              )}
            </div>
          </section>

          {/* Pending Tasks */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Up Next To-Do</h2>
            <div className="space-y-3">
              {pendingAssignments.length > 0 ? (
                 pendingAssignments.slice(0, 3).map((submission, idx) => {
                  const assignment = store.assignments.find(a => a.id === submission.assignmentId);
                  const cls = assignment ? getClassForAssignment(assignment.classSectionId) : null;
                  
                  return (
                    <div key={submission.id} className="flex items-start md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-violet-300 hover:shadow-sm transition-all group">
                      <div className="flex items-start md:items-center gap-4">
                        <div className={`mt-0.5 md:mt-0 p-2 rounded-lg ${submission.status === 'LATE' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                           <FileCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">{assignment?.title || `Assignment ${idx + 1}`}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {cls ? `Grade ${cls.grade} ${cls.sectionName}` : 'General Topic'} • Due in 2 days
                          </p>
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" className="shrink-0 bg-violet-50 text-violet-700 hover:bg-violet-100">
                         Start Task
                      </Button>
                    </div>
                  )
                 })
              ) : (
                <div className="rounded-xl border border-slate-200 bg-green-50/50 p-6 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-900">All caught up!</h3>
                    <p className="text-xs text-green-700/70">You don&apos;t have any pending assignments.</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar - AI Insights & Personal Tutor */}
        <div className="md:col-span-3 xl:col-span-2 space-y-6">
          <CourseProgressWidget studentId={studentId} />

          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-8">AI Personal Tutor</h2>
          
          <Card className="border-violet-100 bg-gradient-to-b from-violet-50/50 to-white shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit className="h-24 w-24 text-violet-600" />
            </div>
            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center gap-2 text-violet-700 font-semibold mb-1">
                <Sparkles className="h-4 w-4" /> Recommended for You
              </div>
              <CardTitle className="text-base text-slate-900 leading-snug">Focus Areas Today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="rounded-lg bg-white p-3 shadow-sm border border-slate-100 hover:border-violet-200 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-fuchsia-100 p-1 group-hover:scale-110 transition-transform">
                    <Calendar className="h-4 w-4 text-fuchsia-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Revise: Integer Addition</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      You struggled a bit with this topic in the last quiz. Taking a quick 5-min recap might help consolidate it!
                    </p>
                    <Button variant="link" className="h-auto p-0 text-xs text-violet-600 mt-2">Start Quick Review →</Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-3 shadow-sm border border-slate-100 hover:border-violet-200 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-blue-100 p-1 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Great job on Science!</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Your recent submissions on &quot;Cell Structure&quot; were perfectly accurate. You are in the top 10% of your class for this module.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white shadow-sm">
                Chat with AI Tutor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
