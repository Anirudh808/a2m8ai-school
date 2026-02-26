"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Target, Sparkles, BookOpen } from "lucide-react";
import { getStore } from "@/lib/store";

interface CourseProgressWidgetProps {
  // If not provided, acts as a carousel across all enrolled subjects
  studentId?: string;
  subjectId?: string;
  classSectionId?: string;
}

export function CourseProgressWidget({
  studentId = "student1",
  subjectId,
  classSectionId,
}: CourseProgressWidgetProps) {
  const store = getStore();

  // If specific subject/class is provided, we only show that one static view
  const isStatic = !!(subjectId && classSectionId);

  // Get enrolled classes
  const myClasses = store.classSections.filter((c) =>
    c.studentIds.includes(studentId)
  );

  // Determine which classes to display in the widget
  const targetClasses = isStatic
    ? myClasses.filter((c) => c.id === classSectionId && c.subjectIds.includes(subjectId))
    : myClasses;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation state (must be called unconditionally before early returns)
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // We need to resolve the subject name. In this mock schema, 
  // subject mapping isn't 1:1 in the store easily, so we extract it or fallback to the class string.
  // We'll mock the subject name based on the ID.
  const subjectNameMap: Record<string, string> = {
    sub1: "Mathematics & Science",
    sub2: "Language Arts",
    sub3: "Social Studies",
  };

  // Safe to access activeClass here if we conditionally handle it in the calc
  const activeClass = targetClasses[currentIndex] || targetClasses[0];
  const currentSubjectId = isStatic ? subjectId : activeClass?.subjectIds[0];
  const displaySubjectName = currentSubjectId ? (subjectNameMap[currentSubjectId] || "Core Subject") : "Core Subject";

  // Calculate Progress statically for the CURRENT active class in view
  const assignmentsForClass = activeClass ? store.assignments.filter(
    (a) => a.classSectionId === activeClass.id && (!currentSubjectId || a.subjectId === currentSubjectId)
  ) : [];
  
  const submissionsForClass = store.submissions.filter(
    (s) =>
      s.studentId === studentId &&
      assignmentsForClass.some((a) => a.id === s.assignmentId)
  );

  const totalAssignments = assignmentsForClass.length;
  const completedCount = submissionsForClass.filter(
    (s) => s.status === "SUBMITTED" || s.status === "GRADED"
  ).length;

  const completionPercentage =
    totalAssignments === 0
      ? 100 // Safe fallback if no assignments
      : Math.round((completedCount / totalAssignments) * 100);

  // Reset and animate when the index/class changes
  useEffect(() => {
    setAnimatedProgress(0);
    const timeout = setTimeout(() => setAnimatedProgress(completionPercentage), 50);
    return () => clearTimeout(timeout);
  }, [currentIndex, completionPercentage]);

  if (targetClasses.length === 0 || !activeClass) {
    return null; // Don't render if no classes match
  }
  
  // SVG Configuration for the Circle
  const radius = 64;
  const strokeWidth = 14;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % targetClasses.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + targetClasses.length) % targetClasses.length);
  };

  return (
    <Card className="border-indigo-100 overflow-hidden shadow-sm relative group bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/40 transition-all hover:shadow-md">
      <CardHeader className="pb-0 relative z-10 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-black uppercase tracking-wider text-indigo-900 flex items-center gap-2">
          <Target className="h-4 w-4 text-indigo-500" />
          Course Progress
        </CardTitle>
        
        {/* Carousel Controls (only if not static and > 1 class) */}
        {!isStatic && targetClasses.length > 1 && (
          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-white/50 rounded-full p-0.5 border border-indigo-100 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-indigo-100 hover:text-indigo-700"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-indigo-100 hover:text-indigo-700"
              onClick={handleNext}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-6 pb-6 relative z-10 flex flex-col items-center justify-center">
        {/* Circular Chart */}
        <div className="relative flex items-center justify-center w-40 h-40 mb-6 drop-shadow-sm">
          <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
             <defs>
               <linearGradient id={`gradient-${currentIndex}`} x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fef08a" /> {/* Yellow 200 */}
                  <stop offset="20%" stopColor="#eab308" /> {/* Yellow 500 */}
                  <stop offset="60%" stopColor="#ef4444" /> {/* Red 500 */}
                  <stop offset="100%" stopColor="#f97316" /> {/* Orange 500 */}
               </linearGradient>
             </defs>
             {/* Background Circle */}
            <circle
              stroke="#f1f5f9" /* Light gray matching the reference track */
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
             {/* Progress Circle */}
            <circle
              stroke={`url(#gradient-${currentIndex})`}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
             <span className="text-2xl font-semibold text-slate-700 tracking-tight tabular-nums mt-1">
               {animatedProgress}%
             </span>
          </div>
        </div>

        {/* Dynamic Class Info */}
        <div className="text-center w-full min-h-[5rem] transition-all bg-white/60 rounded-xl p-3 border border-indigo-50/50 backdrop-blur-sm relative overflow-hidden group/info">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/info:translate-x-full transition-transform duration-1000" />
          <h4 className="font-bold text-slate-900 line-clamp-1 flex items-center justify-center gap-1.5 text-[15px]">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            {displaySubjectName}
          </h4>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
             Grade {activeClass.grade} <span className="text-slate-300 mx-1">•</span> Sec {activeClass.sectionName}
          </p>
          <div className="mt-2.5 flex items-center justify-center">
             <div className="text-[11px] font-semibold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-full border border-indigo-100 flex items-center gap-1.5 shadow-sm">
               <Sparkles className="w-3 h-3 text-indigo-500" />
               {completedCount} of {totalAssignments} Modules Done
             </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        {!isStatic && targetClasses.length > 1 && (
           <div className="flex items-center justify-center gap-1.5 mt-5">
             {targetClasses.map((_, idx) => (
               <div
                 key={idx}
                 className={`h-1.5 rounded-full transition-all duration-300 ${
                   idx === currentIndex ? "w-6 bg-indigo-600" : "w-1.5 bg-indigo-200 hover:bg-indigo-300 cursor-pointer"
                 }`}
                 onClick={() => setCurrentIndex(idx)}
               />
             ))}
           </div>
        )}
      </CardContent>
    </Card>
  );
}
