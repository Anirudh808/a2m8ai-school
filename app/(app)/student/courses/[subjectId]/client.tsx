"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, ChevronDown, ChevronUp, CheckCircle2, Circle, Sparkles, BookOpen, FileText, PlaySquare, FileSpreadsheet, FileCheck2, Lock, Unlock } from "lucide-react";
import { format, parseISO, isPast } from "date-fns";

type ClientProps = {
  classSectionId: string;
  subjectId: string;
  subjectName: string;
  grade: string;
};

export function StudentWorkspaceClient({ classSectionId, subjectId, subjectName, grade }: ClientProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{subjectName}</h1>
          <p className="mt-1 text-sm text-slate-500">Grade {grade} • Your Course Workspace</p>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="bg-white border border-slate-200">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule" className="mt-4 outline-none"><StudentScheduleTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
        <TabsContent value="syllabus" className="mt-4 outline-none"><StudentSyllabusTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
        <TabsContent value="materials" className="mt-4 outline-none"><StudentMaterialsTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
      </Tabs>
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

  if (isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;
  if (error) return <div className="p-4 text-red-500">Error loading schedule.</div>;

  const sortedSchedules = [...(schedules || [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-4">
      {sortedSchedules.length === 0 ? (
        <div className="p-8 text-center text-slate-500 bg-white border border-slate-200 rounded-xl">No schedule available.</div>
      ) : (
        sortedSchedules.map((session) => {
          const past = isPast(parseISO(session.date));
          const isCompleted = session.status === "Completed";
          return (
             <div key={session.id} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                isCompleted ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-slate-200'
             }`}>
                <div className="flex items-start md:items-center gap-4">
                   <div className={`p-3 rounded-lg shrink-0 ${isCompleted ? 'bg-slate-200 text-slate-500' : 'bg-indigo-100 text-indigo-600'}`}>
                      <CalendarIcon className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h4 className={`font-semibold ${isCompleted ? 'text-slate-600' : 'text-slate-900'}`}>{session.topic}</h4>
                         <Badge variant="outline" className={session.type === 'Test' ? 'text-rose-600 border-rose-200 bg-rose-50' : 'text-slate-500'}>
                            {session.type}
                         </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                         <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {format(parseISO(session.date), "MMM d, yyyy")}</span>
                         <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {session.startTime} - {session.endTime}</span>
                      </div>
                   </div>
                </div>
                <div>
                   <Badge variant="secondary" className={isCompleted ? "bg-slate-200 text-slate-600" : "bg-emerald-100 text-emerald-700"}>
                     {session.status}
                   </Badge>
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

  if (isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;

  return (
    <div className="space-y-4">
      {chapters?.map((chapter) => {
        const isExpanded = expandedChapters[chapter.chapterId] !== false;
        const totalLessons = chapter.lessons.length;
        const completedLessons = chapter.lessons.filter((l: any) => l.completed).length;
        const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

        return (
          <div key={chapter.chapterId} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50" onClick={() => toggleChapter(chapter.chapterId)}>
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{chapter.chapterTitle}</h4>
                  <p className="text-sm text-slate-500">{completedLessons} / {totalLessons} Lessons Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-32 bg-slate-100 rounded-full h-2">
                     <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{progress}%</span>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-3">
                {chapter.lessons.length === 0 ? (
                  <div className="text-sm text-slate-500 text-center py-4">No lessons in syllabus.</div>
                ) : (
                  chapter.lessons.map((lesson: any) => (
                    <div key={lesson.id} className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:border-indigo-200 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        {lesson.completed ? <CheckCircle2 className="w-5 h-5 mt-1 text-emerald-500 shrink-0" /> : <Lock className="w-5 h-5 mt-1 text-slate-300 shrink-0" />}
                        <div>
                          <h5 className={`font-medium ${lesson.completed ? 'text-slate-900' : 'text-slate-500'}`}>{lesson.title}</h5>
                          {lesson.aiGeneratedSummary && lesson.completed && (
                            <div className="mt-3 p-3 bg-indigo-50/50 border border-indigo-100 rounded-md text-sm text-indigo-900 leading-relaxed shadow-sm">
                              <div className="flex items-center gap-1.5 font-semibold text-indigo-700 mb-1 text-xs uppercase tracking-wide">
                                <Sparkles className="w-3.5 h-3.5" /> AI Summary
                              </div>
                              {lesson.aiGeneratedSummary}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0">
                         {lesson.completed ? (
                            <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200">View Content</Button>
                         ) : (
                            <Badge variant="outline" className="text-slate-400 bg-slate-50">Locked</Badge>
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

  if (isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;

  const visibleMaterials = materials?.filter(m => m.visibility === "Students") || [];

  const getIcon = (type: string) => {
    switch(type) {
      case "PDF": return <FileText className="w-8 h-8 text-rose-500" />;
      case "Video": return <PlaySquare className="w-8 h-8 text-indigo-500" />;
      case "PPT": return <FileSpreadsheet className="w-8 h-8 text-amber-500" />;
      case "Worksheet": return <FileCheck2 className="w-8 h-8 text-emerald-500" />;
      default: return <FileText className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {visibleMaterials.length === 0 ? (
        <div className="col-span-full p-8 text-center text-slate-500 bg-white border border-slate-200 rounded-xl">No materials available yet.</div>
      ) : (
        visibleMaterials.map((mat) => (
          <div key={mat.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                {getIcon(mat.type)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 line-clamp-1">{mat.title}</h4>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <span className="font-medium">{mat.type}</span>
                <span>•</span>
                <span>{format(parseISO(mat.uploadedAt), "MMM d, yyyy")}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center border-t border-slate-100 pt-4">
               <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                  {mat.attachedTo === "Lesson" ? "Lesson Resource" : "General Topic"}
               </Badge>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
