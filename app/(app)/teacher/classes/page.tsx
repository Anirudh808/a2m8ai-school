"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/auth-store";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, BookOpen, Clock, FileCheck, AlertTriangle, ArrowRight, Search, SlidersHorizontal, Lock, Play, ClipboardCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ClassSubjectMetrics = {
  nextClass: string;
  pendingGradingCount: number;
  atRiskCount: number;
  attendanceTrend: "up" | "down";
};

type ClassSubject = {
  id: string;
  classSectionId: string;
  grade: string;
  sectionName: string;
  subjectId: string;
  subjectName: string;
  board: string;
  studentCount: number;
  metrics: ClassSubjectMetrics;
};

function useTeacherClasses(teacherId: string) {
  return useQuery<ClassSubject[]>({
    queryKey: ["teacher-classes", teacherId],
    queryFn: async () => {
      const res = await fetch(`/api/teacher/classes?teacherId=${teacherId}`);
      if (!res.ok) throw new Error("Failed to fetch classes");
      return res.json();
    },
  });
}

export default function TeacherClassesPage() {
  const user = useAuthStore((s) => s.user);
  const teacherId = user?.id || "teacher1";
  const { data: classes, isLoading, error } = useTeacherClasses(teacherId);

  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("time"); // time, grading, risk

  // Note: For a real app, we'd check feature entitlements here. Mocking true for the basic features.
  // Example: const canAccessLive = canAccess("TEACHER_LIVE_CLASS");
  const canAccessLive = true; 
  const canAccessAssignments = true;

  const filteredAndSortedClasses = useMemo(() => {
    if (!classes) return [];
    
    let result = [...classes];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        c => c.subjectName.toLowerCase().includes(q) || 
             c.grade.toLowerCase().includes(q) || 
             c.sectionName.toLowerCase().includes(q)
      );
    }

    // Grade filter
    if (gradeFilter !== "ALL") {
      result = result.filter(c => c.grade === gradeFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "grading") {
        return b.metrics.pendingGradingCount - a.metrics.pendingGradingCount;
      }
      if (sortBy === "risk") {
        return b.metrics.atRiskCount - a.metrics.atRiskCount;
      }
      // Default to sorting by grade/section for time mockup since time is a string format
      return a.grade.localeCompare(b.grade) || a.sectionName.localeCompare(b.sectionName);
    });

    return result;
  }, [classes, searchQuery, gradeFilter, sortBy]);

  const uniqueGrades = Array.from(new Set(classes?.map(c => c.grade) || [])).sort();

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Classes</h1>
          <p className="mt-1 text-slate-500">Manage your assigned class sections and subjects.</p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search classes..."
              className="pl-9 w-full sm:w-[250px] bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-full sm:w-[140px] bg-white">
              <SelectValue placeholder="All Grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Grades</SelectItem>
              {uniqueGrades.map(g => (
                <SelectItem key={g} value={g}>Grade {g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="time">Sort: Next Class</SelectItem>
              <SelectItem value="grading">Sort: Pending Grading</SelectItem>
              <SelectItem value="risk">Sort: At-Risk Count</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {[1,2,3,4,5,6].map(i => (
             <Card key={i} className="overflow-hidden border-slate-200">
               <div className="h-2 bg-slate-100" />
               <CardHeader className="space-y-3 pb-4">
                 <Skeleton className="h-6 w-3/4" />
                 <Skeleton className="h-4 w-1/4" />
               </CardHeader>
               <CardContent className="space-y-4">
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6" />
                 <Skeleton className="h-4 w-4/6" />
               </CardContent>
             </Card>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border-2 border-dashed border-red-200 bg-red-50 p-12 text-center text-red-600">
          Failed to load classes. Please try again.
        </div>
      ) : filteredAndSortedClasses.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
          No classes found matching your criteria.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-6">
          {filteredAndSortedClasses.map((cs) => (
            <Card key={cs.id} className="group overflow-hidden border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col">
              <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-[length:200%_100%] transition-all group-hover:bg-[100%_0]" />
              
              <CardHeader className="pb-4 relative">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">
                      <BookOpen className="h-4 w-4" /> {cs.subjectName}
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      Grade {cs.grade} - Section {cs.sectionName}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <GraduationCap className="h-4 w-4" /> {cs.studentCount} Students
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{cs.board}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-6 flex-1 space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 border border-slate-100">
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <div className="rounded bg-indigo-100 p-1.5 text-indigo-700">
                        <Clock className="h-4 w-4" />
                      </div>
                      Next Class
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{cs.metrics.nextClass}</span>
                  </div>
                  
                  <div className="flex justify-between gap-3">
                    <div className="flex-1 flex flex-col items-center justify-center rounded-lg bg-amber-50 border border-amber-100 p-3">
                      <div className="flex items-center gap-2 text-amber-700 mb-1">
                        <FileCheck className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
                      </div>
                      <span className="text-xl font-bold text-amber-900">{cs.metrics.pendingGradingCount}</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center rounded-lg bg-rose-50 border border-rose-100 p-3">
                       <div className="flex items-center gap-2 text-rose-700 mb-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">At-Risk</span>
                      </div>
                      <span className="text-xl font-bold text-rose-900">{cs.metrics.atRiskCount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 flex flex-col gap-2">
                 <Button className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2 h-11 shadow-sm" asChild>
                    <Link href={`/teacher/classes/${cs.classSectionId}/${cs.subjectId}`}>
                      Open Workspace <ArrowRight className="h-4 w-4" />
                    </Link>
                 </Button>
                 <div className="flex w-full gap-2">
                    <Button variant="outline" className="flex-1 h-9 bg-slate-50 text-slate-600 gap-1.5" disabled={!canAccessLive}>
                       {!canAccessLive ? <Lock className="h-3.5 w-3.5 text-slate-400" /> : <Play className="h-3.5 w-3.5" />}
                       <span className="text-xs">Live</span>
                    </Button>
                    <Button variant="outline" className="flex-1 h-9 bg-slate-50 text-slate-600 gap-1.5" disabled={!canAccessAssignments}>
                       {!canAccessAssignments ? <Lock className="h-3.5 w-3.5 text-slate-400" /> : <BookOpen className="h-3.5 w-3.5" />}
                       <span className="text-xs">Assign</span>
                    </Button>
                    <Button variant="outline" className="flex-1 h-9 bg-slate-50 text-slate-600 gap-1.5">
                       <ClipboardCheck className="h-3.5 w-3.5" />
                       <span className="text-xs">Attend</span>
                    </Button>
                 </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
