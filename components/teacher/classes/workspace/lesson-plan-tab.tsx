"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Sparkles, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

type LessonItem = {
  id: string;
  title: string;
  objectives: string[];
  plannedDate?: string;
  completed: boolean;
  aiGeneratedSummary?: string;
};

type ChapterPlan = {
  chapterId: string;
  chapterTitle: string;
  lessons: LessonItem[];
};

export function LessonPlanTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const queryClient = useQueryClient();
  const queryKey = ["class-lesson-plan", classSectionId, subjectId];

  const { data: chapters, isLoading, error } = useQuery<ChapterPlan[]>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/lesson-plan`);
      if (!res.ok) throw new Error("Failed to fetch lesson plan");
      return res.json();
    }
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: async ({ lessonId, completed }: { lessonId: string; completed: boolean }) => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/lesson-plan/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
      });
      if (!res.ok) throw new Error("Failed to update lesson completion");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  const generateSummaryMutation = useMutation({
    mutationFn: async ({ lessonId }: { lessonId: string }) => {
      const mockSummary = "This is an AI-generated summary covering key concepts like variables and basic algebraic expressions. Students should understand substitution by the end.";
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/lesson-plan/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aiGeneratedSummary: mockSummary })
      });
      if (!res.ok) throw new Error("Failed to generate summary");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return (
      <div className="mt-6 space-y-4 p-4 bg-white rounded-xl border border-slate-200">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl">Error loading lesson plan.</div>;
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Syllabus & Lesson Plan</h3>
          <p className="text-sm text-slate-500">Track syllabus coverage and use AI to outline lessons.</p>
        </div>
      </div>

      <div className="space-y-4">
        {chapters?.map((chapter) => {
          const isExpanded = expandedChapters[chapter.chapterId] !== false; // expanded by default
          const totalLessons = chapter.lessons.length;
          const completedLessons = chapter.lessons.filter(l => l.completed).length;
          const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

          return (
            <div key={chapter.chapterId} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
                onClick={() => toggleChapter(chapter.chapterId)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{chapter.chapterTitle}</h4>
                    <p className="text-sm text-slate-500">{totalLessons} Lessons</p>
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
                    <div className="text-sm text-slate-500 text-center py-4">No lessons added to this chapter.</div>
                  ) : (
                    chapter.lessons.map(lesson => (
                      <div key={lesson.id} className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:border-indigo-200 transition-colors">
                        <div className="flex items-start gap-3 flex-1">
                          <button 
                            onClick={() => toggleCompleteMutation.mutate({ lessonId: lesson.id, completed: !lesson.completed })}
                            className="mt-1 shrink-0 text-slate-300 hover:text-indigo-600 transition-colors focus:outline-none"
                          >
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>
                          <div>
                            <h5 className={`font-medium ${lesson.completed ? 'text-slate-600 line-through decoration-slate-300' : 'text-slate-900'}`}>{lesson.title}</h5>
                            {lesson.objectives.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {lesson.objectives.map((obj, i) => (
                                  <span key={i} className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                    {obj}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {lesson.aiGeneratedSummary && (
                              <div className="mt-3 p-3 bg-indigo-50/50 border border-indigo-100 rounded-md text-sm text-indigo-900 leading-relaxed shadow-sm">
                                <div className="flex items-center gap-1.5 font-semibold text-indigo-700 mb-1 text-xs uppercase tracking-wide">
                                  <Sparkles className="w-3.5 h-3.5" /> AI Summary
                                </div>
                                {lesson.aiGeneratedSummary}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 bg-white shadow-sm"
                            disabled={generateSummaryMutation.isPending}
                            onClick={() => generateSummaryMutation.mutate({ lessonId: lesson.id })}
                          >
                            {generateSummaryMutation.isPending ? 'Generating...' : <><Sparkles className="w-3.5 h-3.5 mr-1.5" /> Outline</>}
                          </Button>
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
    </div>
  );
}
