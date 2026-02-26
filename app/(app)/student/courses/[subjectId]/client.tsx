"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarIcon, Clock, ChevronDown, ChevronUp, CheckCircle2, Circle, Sparkles, BookOpen, FileText, PlaySquare, FileSpreadsheet, FileCheck2, Lock, ArrowRight, Activity, Bell, Target, BrainCircuit, PlayCircle, Trophy } from "lucide-react";
import { format, parseISO, isPast } from "date-fns";
import { getStore } from "@/lib/store";
import { CourseProgressWidget } from "@/components/student/course-progress-widget";

type ClientProps = {
  classSectionId: string;
  subjectId: string;
  subjectName: string;
  grade: string;
};

export function StudentWorkspaceClient({ classSectionId, subjectId, subjectName, grade }: ClientProps) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">Grade {grade}</Badge>
            <Badge variant="outline" className="text-slate-500 border-slate-200">Enrolled</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{subjectName}</h1>
          <p className="mt-1 text-sm text-slate-500">Your interactive learning workspace for {subjectName}</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 max-w-xs shrink-0 shadow-sm">
           <PlayCircle className="mr-2 h-4 w-4" /> Pick up where you left off
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full mt-6">
        <TabsList className="bg-white border border-slate-200 w-full justify-start overflow-x-auto hide-scrollbar p-1 h-auto flex flex-nowrap rounded-lg shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 shrink-0">Overview</TabsTrigger>
          <TabsTrigger value="syllabus" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 shrink-0">Syllabus & Map</TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 shrink-0">Live Classes</TabsTrigger>
          <TabsTrigger value="materials" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 shrink-0">Study Materials</TabsTrigger>
          <TabsTrigger value="homeworks" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 shrink-0">Homeworks</TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 shrink-0 text-amber-600 data-[state=active]:text-amber-700"><Sparkles className="w-3.5 h-3.5 mr-1.5" /> Self-Practice</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="overview" className="m-0 outline-none"><StudentOverviewTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
          <TabsContent value="syllabus" className="m-0 outline-none"><StudentSyllabusTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
          <TabsContent value="schedule" className="m-0 outline-none"><StudentScheduleTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
          <TabsContent value="materials" className="m-0 outline-none"><StudentMaterialsTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
          <TabsContent value="homeworks" className="m-0 outline-none"><StudentHomeworksTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
          <TabsContent value="practice" className="m-0 outline-none"><StudentPracticeTab subjectId={subjectId} /></TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function StudentOverviewTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  // Using store data directly for rapid UI mocking of the overview dash
  const store = getStore();
  const studentId = "student1";
  
  // Mocks for presentation
  const assignments = store.assignments.filter(a => a.classSectionId === classSectionId && a.subjectId === subjectId);
  const submissions = store.submissions.filter(s => s.studentId === studentId);
  
  const pendingAssignments = assignments.filter(a => {
    const sub = submissions.find(s => s.assignmentId === a.id);
    return !sub || sub.status === "PENDING" || sub.status === "LATE";
  });

  const schedules = store.schedules.filter(s => s.classSectionId === classSectionId && s.subjectId === subjectId);
  const upcomingClass = schedules.find(s => s.status === "Planned");
  
  // Mocks for AI insights
  const weakAreas = [
    { topic: "Equivalent Fractions", score: "45%" },
    { topic: "Adding unlike denominators", score: "60%" }
  ];

  const announcements = store.announcements.filter(a => a.scope === "CLASS" && a.scopeId === classSectionId).slice(0, 2);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      
      {/* Col 1 & 2 */}
      <div className="md:col-span-2 space-y-6">
        
        {/* Next Class Banner */}
        <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 shadow-md">
          <CardContent className="p-6 pb-8 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10">
               <CalendarIcon className="w-48 h-48 -mr-10 -mt-10 transform -rotate-12" />
            </div>
            <div className="relative z-10">
              <Badge variant="outline" className="text-indigo-100 border-indigo-400/50 mb-3 bg-white/10">Up Next</Badge>
              <h2 className="text-2xl font-bold mb-2">{upcomingClass ? upcomingClass.topic : "Study Session"}</h2>
              <div className="flex items-center gap-4 text-indigo-100 text-sm">
                <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> {upcomingClass ? format(parseISO(upcomingClass.date), "MMM d") : "Today"}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {upcomingClass?.startTime || "10:00 AM"}</span>
              </div>
            </div>
            <Button className="w-full md:w-auto bg-white text-indigo-600 hover:bg-slate-50 shadow-lg shrink-0 relative z-10 font-semibold border-0">
               <PlayCircle className="w-4 h-4 mr-2" /> Join Session
            </Button>
          </CardContent>
        </Card>

        {/* Assignments Block */}
        <section className="space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <FileCheck2 className="w-5 h-5 text-indigo-600" /> Pending Homework
              </h3>
              <Badge variant="secondary" className="bg-rose-100 text-rose-700">{pendingAssignments.length} Due</Badge>
           </div>
           
           <div className="grid gap-3">
             {pendingAssignments.length === 0 ? (
               <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                 <p className="text-sm text-slate-500 font-medium">You are all caught up on assignments for this subject!</p>
               </div>
             ) : (
               pendingAssignments.map(a => (
                 <div key={a.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                       <h4 className="font-semibold text-slate-900 line-clamp-1">{a.title}</h4>
                       <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{a.description || "No description provided."}</p>
                       <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 font-medium">Due: {format(parseISO(a.dueDate), "MMM d")}</Badge>
                       </div>
                    </div>
                    <Button size="sm" variant="secondary" className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100">Start Task</Button>
                 </div>
               ))
             )}
           </div>
        </section>
      </div>

      {/* Col 3: Sidebars */}
      <div className="space-y-6">
        
        {/* Course Progress Widget */}
        <CourseProgressWidget studentId={studentId} classSectionId={classSectionId} subjectId={subjectId} />

        {/* Concept Mastery (AI) */}
        <Card className="border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-white overflow-hidden shadow-sm">
           <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-500"></div>
           <CardHeader className="pb-2">
             <CardTitle className="text-base flex items-center gap-2 font-bold text-slate-900">
                <BrainCircuit className="w-4 h-4 text-indigo-600" /> Focus Areas
             </CardTitle>
             <CardDescription>Based on your recent quiz scores</CardDescription>
           </CardHeader>
           <CardContent className="space-y-3 pt-2">
             {weakAreas.map((w, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-2.5">
                      <Target className="w-4 h-4 text-rose-500" />
                      <span className="text-sm font-medium text-slate-800 line-clamp-1">{w.topic}</span>
                   </div>
                   <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">{w.score}</span>
                </div>
             ))}
             <Button variant="outline" className="w-full mt-2 text-indigo-700 border-indigo-200 hover:bg-indigo-50 text-sm h-9">
               Generate Practice Set
             </Button>
           </CardContent>
        </Card>

        {/* Teacher Announcements */}
        <Card className="border-slate-200 shadow-sm">
           <CardHeader className="pb-2">
             <CardTitle className="text-base flex items-center gap-2 font-bold text-slate-900">
                <Bell className="w-4 h-4 text-amber-500" /> Teacher Announcements
             </CardTitle>
           </CardHeader>
           <CardContent className="space-y-4 pt-2">
              {announcements.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No recent announcements.</p>
              ) : (
                announcements.map(ann => (
                  <div key={ann.id} className="border-l-2 border-amber-300 pl-3 py-1">
                     <h4 className="text-sm font-semibold text-slate-800">{ann.title}</h4>
                     <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{ann.body}</p>
                     <span className="text-[10px] text-slate-400 mt-2 block uppercase tracking-wider">{format(parseISO(ann.createdAt), "MMM d, h:mm a")}</span>
                  </div>
                ))
              )}
           </CardContent>
        </Card>
      </div>

    </div>
  );
}

function StudentScheduleTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const { data: schedules, isLoading, error } = useQuery<any[]>({
    queryKey: ["student-schedule", classSectionId, subjectId],
    queryFn: async () => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/schedule`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });

  if (isLoading) return <div className="grid gap-4 mt-6"><Skeleton className="h-20 w-full rounded-xl" /><Skeleton className="h-20 w-full rounded-xl" /></div>;
  if (error) return <div className="p-4 text-red-500">Error loading schedule.</div>;

  const upcomingSchedules = (schedules || [])
    .filter(session => session.status === "Planned")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group by date
  const grouped = upcomingSchedules.reduce((acc, session) => {
    const dateStr = session.date;
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(session);
    return acc;
  }, {} as Record<string, any[]>);

  const entries = Object.entries(grouped);

  return (
    <div className="space-y-8 max-w-4xl mt-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Upcoming Classes</h2>
        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
           {upcomingSchedules.length} Sessions Scheduled
        </Badge>
      </div>

      {entries.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
           <CalendarIcon className="w-8 h-8 mx-auto mb-3 text-slate-300" />
           <p className="font-medium text-slate-700">No upcoming classes scheduled.</p>
           <p className="text-sm mt-1">Check back later for new sessions.</p>
        </div>
      ) : (
        entries.map(([dateStr, sessions]) => {
          const dateObj = parseISO(dateStr);
          const dayName = format(dateObj, "EEE").toUpperCase();
          const dayNumber = format(dateObj, "d");
          const monthName = format(dateObj, "MMMM");
          
          return (
            <div key={dateStr} className="flex flex-col md:flex-row gap-4 md:gap-8 relative">
               {/* Left Date Column */}
               <div className="md:w-24 shrink-0 flex flex-col items-start md:items-end md:pt-2 relative z-10 bg-white md:bg-transparent">
                 <div className="flex md:flex-col items-baseline md:items-end gap-2 md:gap-0">
                   <span className="text-sm font-bold text-slate-400 tracking-widest">{dayName}</span>
                   <span className="text-3xl font-light text-slate-900 leading-none tracking-tight">{dayNumber}</span>
                 </div>
                 <span className="text-sm text-slate-500 font-medium hidden md:block mt-2">{monthName}</span>
               </div>
               
               {/* Right Events Column */}
               <div className="flex-1 space-y-3 relative">
                 {/* Visual timeline connector for desktop */}
                 <div className="hidden md:block absolute left-[-2rem] top-0 bottom-0 w-px bg-slate-200 -z-10" />
                 
                 {(sessions as any[]).map((session: any) => (
                   <div key={session.id} className="bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-indigo-500 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-4 group relative z-10">
                      <div>
                         <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-slate-900 text-lg tracking-tight group-hover:text-indigo-700 transition-colors">{session.topic}</span>
                            {session.type === 'Test' && <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50 rounded-sm py-0 h-5 text-[10px] uppercase font-bold tracking-wider">Assessment</Badge>}
                         </div>
                         <div className="flex items-center text-sm text-slate-600 font-medium bg-slate-50 px-2.5 py-1 rounded-md w-fit border border-slate-100">
                            <Clock className="w-3.5 h-3.5 mr-2 text-indigo-400" />
                            {session.startTime} - {session.endTime}
                         </div>
                      </div>
                      <Button className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-200 shadow-sm font-semibold transition-colors mt-2 sm:mt-0">
                         Join Classroom
                      </Button>
                   </div>
                 ))}
               </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function StudentSyllabusTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  
  const { data: chapters, isLoading } = useQuery<any[]>({
    queryKey: ["student-syllabus", classSectionId, subjectId],
    queryFn: async () => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/lesson-plan`);
      return res.json();
    }
  });

  const toggleChapter = (id: string) => setExpandedChapters(prev => ({ ...prev, [id]: !prev[id] }));

  if (isLoading) return <div className="space-y-4 mt-6"><Skeleton className="h-24 w-full rounded-xl" /><Skeleton className="h-24 w-full rounded-xl" /></div>;

  return (
    <div className="space-y-4 max-w-4xl">
      {chapters?.map((chapter) => {
        const isExpanded = expandedChapters[chapter.chapterId] !== false;
        const totalLessons = chapter.lessons.length;
        const completedLessons = chapter.lessons.filter((l: any) => l.completed).length;
        const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

        return (
          <div key={chapter.chapterId} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:border-indigo-200">
            <div className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-slate-50/80 transition-colors" onClick={() => toggleChapter(chapter.chapterId)}>
              <div className="flex items-center gap-5 flex-1">
                <div className="hidden sm:flex p-3 bg-indigo-50/80 text-indigo-600 rounded-xl border border-indigo-100 flex-col items-center justify-center w-14 h-14 shrink-0">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">Ch</span>
                  <span className="text-lg font-bold leading-none">{chapter.order || "1"}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">{chapter.chapterTitle}</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                     <BookOpen className="w-4 h-4 text-slate-400" />
                     {totalLessons} Modules <span className="text-slate-300">•</span> {completedLessons} Completed
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-100 rounded-full h-2 hidden sm:block">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <Badge variant="outline" className={`font-semibold bg-white ${progress === 100 ? 'text-emerald-600 border-emerald-200' : 'text-slate-600 border-slate-200'}`}>{progress}%</Badge>
                </div>
                <div className="flex justify-end w-full">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-slate-200 bg-slate-50/50 p-2 sm:p-5 space-y-2">
                {chapter.lessons.length === 0 ? (
                  <div className="text-sm border-2 border-dashed border-slate-200 rounded-lg text-slate-500 text-center py-8">No learning modules added yet.</div>
                ) : (
                  chapter.lessons.map((lesson: any, idx: number) => (
                    <div key={lesson.id} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all group">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-0.5 shrink-0 w-8 flex justify-center">
                           {lesson.completed ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 mt-1">
                                 <CheckCircle2 className="w-4 h-4" />
                              </div>
                           ) : (
                              <div className="font-bold text-slate-300 text-lg mt-0.5">{(idx + 1).toString().padStart(2, '0')}</div>
                           )}
                        </div>
                        <div>
                          <h5 className={`font-bold text-base mb-1 ${lesson.completed ? 'text-slate-900' : 'text-slate-700 group-hover:text-indigo-700 transition-colors'}`}>{lesson.title}</h5>
                          {lesson.aiGeneratedSummary && lesson.completed && (
                            <div className="mt-3 p-3 bg-indigo-50/50 border border-indigo-100/50 rounded-lg text-sm text-indigo-900/80 leading-relaxed max-w-3xl font-medium">
                              <div className="flex items-center gap-1.5 font-bold text-indigo-600 mb-1.5 text-xs uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" /> AI Key Takeaway
                              </div>
                              {lesson.aiGeneratedSummary}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 ml-12 md:ml-0 md:pl-4 self-start md:self-center">
                         {lesson.completed ? (
                            <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 font-semibold shadow-sm w-full sm:w-auto">Review Notes</Button>
                         ) : (
                            <Button variant="secondary" size="sm" className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold shadow-sm w-full sm:w-auto">Start Module</Button>
                         )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StudentMaterialsTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const { data: materials, isLoading } = useQuery<any[]>({
    queryKey: ["student-materials", classSectionId, subjectId],
    queryFn: async () => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/materials`);
      return res.json();
    }
  });

  if (isLoading) return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6"><Skeleton className="h-40 w-full rounded-xl" /><Skeleton className="h-40 w-full rounded-xl" /><Skeleton className="h-40 w-full rounded-xl" /></div>;

  const visibleMaterials = materials?.filter(m => m.visibility === "Students") || [];

  const getIcon = (type: string) => {
    switch(type) {
      case "PDF": return <FileText className="w-7 h-7 text-rose-500" />;
      case "Video": return <PlaySquare className="w-7 h-7 text-indigo-500" />;
      case "PPT": return <FileSpreadsheet className="w-7 h-7 text-amber-500" />;
      case "Worksheet": return <FileCheck2 className="w-7 h-7 text-emerald-500" />;
      default: return <FileText className="w-7 h-7 text-slate-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {visibleMaterials.length === 0 ? (
        <div className="col-span-full p-12 text-center text-slate-500 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">No materials available yet.</div>
      ) : (
        visibleMaterials.map((mat) => (
          <div key={mat.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                {getIcon(mat.type)}
              </div>
              <Badge variant="outline" className="text-xs font-semibold text-slate-500 border-slate-200 bg-white shadow-sm">
                {mat.type}
              </Badge>
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-700 transition-colors">{mat.title}</h4>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
                <span>{format(parseISO(mat.uploadedAt), "MMM d, yyyy")}</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
               <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Category / Topic</span>
               <div className="mt-1 font-medium text-sm text-indigo-700">
                  {mat.attachedTo === "Lesson" ? "Chapter Resources" : "General Guides"}
               </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function StudentHomeworksTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const store = getStore();
  const studentId = "student1";
  const [submissions, setSubmissions] = useState(store.submissions.filter(s => s.studentId === studentId));
  
  const assignments = store.assignments.filter(a => a.classSectionId === classSectionId && a.subjectId === subjectId);

  const pendingAssignments = assignments.filter(a => {
    const sub = submissions.find(s => s.assignmentId === a.id);
    return !sub || sub.status === "PENDING" || sub.status === "LATE";
  });

  const completedAssignments = assignments.filter(a => {
    const sub = submissions.find(s => s.assignmentId === a.id);
    return sub && (sub.status === "SUBMITTED" || sub.status === "GRADED");
  });

  const handleCompleteHomework = (assignmentId: string) => {
    const newSubmissionId = `new-sub-${Math.random()}`;
    const newSubmission: any = {
      id: newSubmissionId,
      assignmentId,
      studentId,
      status: "SUBMITTED",
      submittedAt: new Date().toISOString(),
    };

                       // Update local visual state
    setSubmissions(prev => [...prev.filter(s => s.assignmentId !== assignmentId), newSubmission]);

    // Update global store
    store.submissions = store.submissions.filter(s => !(s.assignmentId === assignmentId && s.studentId === studentId));
    store.submissions.push(newSubmission);
  };

  return (
    <div className="space-y-8 max-w-4xl mt-6">
       
       {/* Pending Tasks */}
       <section className="space-y-4">
         <div className="flex items-center justify-between">
           <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <FileCheck2 className="w-5 h-5 text-indigo-600" /> Pending Tasks
           </h3>
           <Badge variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-200">{pendingAssignments.length} Due</Badge>
         </div>

         {pendingAssignments.length === 0 ? (
           <div className="p-8 text-center text-slate-500 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
              <p className="font-medium text-slate-700">All caught up!</p>
              <p className="text-sm mt-1">No pending homework right now.</p>
           </div>
         ) : (
           <div className="grid gap-4">
             {pendingAssignments.map(a => (
               <div key={a.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-slate-900 text-lg">{a.title}</h4>
                        <Badge variant="outline" className="text-xs bg-rose-50 text-rose-700 border-rose-200">Pending</Badge>
                     </div>
                     <p className="text-sm text-slate-500 mb-3">{a.description || "No specific instructions provided."}</p>
                     <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded-md">
                           <CalendarIcon className="w-3.5 h-3.5" /> Due: {format(parseISO(a.dueDate), "MMM d, yyyy")}
                        </span>
                     </div>
                  </div>
                  <Button 
                    onClick={() => handleCompleteHomework(a.id)}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors mt-2 md:mt-0 shrink-0"
                  >
                     <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Completed
                  </Button>
               </div>
             ))}
           </div>
         )}
       </section>

       {/* Completed Tasks */}
       <section className="space-y-4 pt-6 mt-6 border-t border-slate-200">
         <div className="flex items-center justify-between">
           <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Completed Tasks
           </h3>
           <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">{completedAssignments.length} Done</Badge>
         </div>

         {completedAssignments.length === 0 ? (
           <div className="p-8 text-center text-slate-500 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-sm">Completed assignments will appear here.</p>
           </div>
         ) : (
           <div className="grid gap-4 opacity-80 hover:opacity-100 transition-opacity">
             {completedAssignments.map(a => {
               const sub = submissions.find(s => s.assignmentId === a.id);
               return (
                 <div key={a.id} className="bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-slate-900">{a.title}</h4>
                          <Badge variant="outline" className={`text-xs ${sub?.status === 'GRADED' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                            {sub?.status === 'GRADED' ? 'Graded' : 'Submitted'}
                          </Badge>
                       </div>
                       <p className="text-sm text-slate-500 line-clamp-1">{a.description || "No specific instructions provided."}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-4 mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                       {sub?.status === 'GRADED' && sub.score && (
                         <div className="text-right">
                           <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Score</span>
                           <span className="font-bold text-indigo-700 text-lg">{sub.score}/100</span>
                         </div>
                       )}
                       <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold">
                          View Submission
                       </Button>
                    </div>
                 </div>
               );
             })}
           </div>
         )}
       </section>

    </div>
  );
}

function StudentPracticeTab({ subjectId }: { subjectId: string }) {
  // A mock view for the new self-practice tab that uses AI
  return (
    <div className="max-w-4xl space-y-8">
      
      <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 md:p-8 border border-amber-200/60 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="space-y-3">
            <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-100/50 mb-2 font-bold select-none pointer-events-none">✨ AI Powered</Badge>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Unlimited Self-Practice</h2>
            <p className="text-slate-600 max-w-lg leading-relaxed text-sm md:text-base">
              Generate unlimited quizzes and worksheets mapped exactly to your syllabus. Our AI analyzes your weak areas and creates questions designed to help you improve.
            </p>
         </div>
         <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
           <Button className="w-full bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-200 text-white font-bold h-11 text-base">
             <BrainCircuit className="w-5 h-5 mr-2" /> Start Adaptive Test
           </Button>
           <Button variant="outline" className="w-full bg-white border-amber-200 text-amber-700 hover:bg-amber-50 font-semibold h-11 text-base">
             Create Custom Quiz
           </Button>
         </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <Card className="border-slate-200 shadow-sm">
           <CardHeader>
             <CardTitle className="text-lg flex items-center gap-2 font-bold">
                <Trophy className="w-5 h-5 text-amber-500" /> Recent Practice Scores
             </CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                 <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Integers Quick Quiz</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Yesterday</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm border border-emerald-200">
                    8/10
                 </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                 <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Fractions Mini-Test</h4>
                    <p className="text-xs text-slate-500 mt-0.5">3 days ago</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm border border-amber-200">
                    6/10
                 </div>
              </div>
           </CardContent>
         </Card>
      </div>

    </div>
  );
}
