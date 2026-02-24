"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Settings, Download, Play, MessageSquarePlus, FilePlus2, Presentation } from "lucide-react";

import { OverviewTab } from "@/components/teacher/classes/workspace/overview-tab";
import { RosterTab } from "@/components/teacher/classes/workspace/roster-tab";
import { ScheduleTab } from "@/components/teacher/classes/workspace/schedule-tab";
import { LessonPlanTab } from "@/components/teacher/classes/workspace/lesson-plan-tab";
import { MaterialsTab } from "@/components/teacher/classes/workspace/materials-tab";
import { AssignmentsTab } from "@/components/teacher/classes/workspace/assignments-tab";

import { AttendanceTab } from "@/components/teacher/classes/workspace/attendance-tab";
import { DiscussionsTab } from "@/components/teacher/classes/workspace/discussions-tab";

// Placeholder components for the remaining tabs.
const QuizzesTabPlaceholder = () => <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 mt-6">Quizzes Content (WIP)</div>;
const CommunicationTab = () => <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 mt-6">Communication Content (WIP)</div>;
const InsightsTab = () => <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 mt-6">AI Insights Content (WIP)</div>;
const InterventionsTab = () => <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 mt-6">Interventions Content (WIP)</div>;

type ClassOverview = {
  grade: string;
  sectionName: string;
  subjectName: string;
  studentCount: number;
  board: string;
};

export default function ClassWorkspacePage() {
  const params = useParams();
  const classSectionId = params.classSectionId as string;
  const subjectId = params.subjectId as string;

  const { data: overview, isLoading, error } = useQuery<ClassOverview>({
    queryKey: ["class-overview", classSectionId, subjectId],
    queryFn: async () => {
      const res = await fetch(`/api/teacher/classes/${classSectionId}/${subjectId}/overview`);
      if (!res.ok) throw new Error("Failed to fetch overview");
      return res.json();
    },
  });

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load class workspace. Please check the URL or try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-medium text-slate-500 whitespace-nowrap overflow-x-auto pb-2 custom-scrollbar">
            <Link href="/teacher/dashboard" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0 text-slate-400" />
            <Link href="/teacher/classes" className="hover:text-slate-900 transition-colors">Classes</Link>
            <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0 text-slate-400" />
            {isLoading ? (
               <Skeleton className="h-4 w-24" />
            ) : (
               <span className="text-indigo-600">Grade {overview?.grade} - {overview?.sectionName} ({overview?.subjectName})</span>
            )}
          </nav>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Title & Meta */}
            <div>
              {isLoading ? (
                <Skeleton className="h-10 w-64 mb-2" />
              ) : (
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                  {overview?.subjectName}
                  <span className="text-slate-300 font-light text-2xl">/</span>
                  <span className="text-slate-600 font-semibold">{overview?.grade}{overview?.sectionName}</span>
                </h1>
              )}
              {isLoading ? (
                 <Skeleton className="h-4 w-40 mt-2" />
              ) : (
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{overview?.studentCount} Students</span>
                  <span className="text-slate-300">•</span>
                  <span>{overview?.board} Curriculum</span>
                  <span className="text-slate-300">•</span>
                  <span className="uppercase text-xs tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Active</span>
                </p>
              )}
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" className="h-10 bg-white shrink-0 hidden sm:flex">
                 <Download className="h-4 w-4 mr-2" /> Export
              </Button>
              <Button variant="outline" className="h-10 bg-white shrink-0" size="icon">
                 <Settings className="h-4 w-4 text-slate-600" />
              </Button>
              <div className="w-full sm:w-px h-px sm:h-8 bg-slate-200 mx-1 hidden sm:block" />
              
              <Button variant="secondary" className="h-10 shrink-0">
                 <MessageSquarePlus className="h-4 w-4 mr-2" /> Announce
              </Button>
              <Button variant="default" className="h-10 bg-indigo-600 hover:bg-indigo-700 shrink-0 shadow-sm shadow-indigo-200">
                 <Play className="h-4 w-4 mr-2" /> Start Live Class
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="px-4 md:px-8 mt-6 max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <div className="relative border-b border-slate-200 bg-slate-50/50">
             <TabsList className="h-12 w-full justify-start rounded-none border-none bg-transparent p-0 overflow-x-auto flex-nowrap hide-scrollbar">
                {/* Core Academic */}
                <TabsTrigger value="overview" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 shadow-none bg-transparent">Overview</TabsTrigger>
                <TabsTrigger value="roster" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 shadow-none bg-transparent">Roster</TabsTrigger>
                <TabsTrigger value="schedule" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 shadow-none bg-transparent">Schedule</TabsTrigger>
                <TabsTrigger value="lessons" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 shadow-none bg-transparent">Lesson Plan</TabsTrigger>
                <TabsTrigger value="materials" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 shadow-none bg-transparent">Materials</TabsTrigger>
                
                {/* Assessment */}
                <div className="w-px h-6 bg-slate-200 self-center mx-2 shrink-0" />
                <TabsTrigger value="assignments" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 shadow-none bg-transparent">Assignments</TabsTrigger>
                
                {/* Behavior & Comm */}
                <div className="w-px h-6 bg-slate-200 self-center mx-2 shrink-0" />
                <TabsTrigger value="attendance" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 shadow-none bg-transparent">Attendance</TabsTrigger>
                <TabsTrigger value="discussions" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-slate-500 hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 shadow-none bg-transparent">Discussions</TabsTrigger>
                
                {/* Advanced */}
                <div className="w-px h-6 bg-slate-200 self-center mx-2 shrink-0" />
                <TabsTrigger value="insights" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-amber-600 hover:text-amber-700 data-[state=active]:border-amber-600 data-[state=active]:text-amber-700 shadow-none bg-transparent">AI Insights</TabsTrigger>
                <TabsTrigger value="interventions" className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-medium text-rose-600 hover:text-rose-700 data-[state=active]:border-rose-600 data-[state=active]:text-rose-700 shadow-none bg-transparent">Interventions</TabsTrigger>
             </TabsList>
          </div>

          <div className="pt-2">
            <TabsContent value="overview" className="mt-0 outline-none"><OverviewTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
            <TabsContent value="roster" className="mt-0 outline-none"><RosterTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
            <TabsContent value="schedule" className="mt-0 outline-none"><ScheduleTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
            <TabsContent value="lessons" className="mt-0 outline-none"><LessonPlanTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
            <TabsContent value="materials" className="mt-0 outline-none"><MaterialsTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
            <TabsContent value="assignments" className="mt-0 outline-none"><AssignmentsTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
            <TabsContent value="quizzes" className="mt-0 outline-none"><QuizzesTabPlaceholder /></TabsContent>
            <TabsContent value="attendance" className="mt-0 outline-none"><AttendanceTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
            <TabsContent value="discussions" className="mt-0 outline-none"><DiscussionsTab classSectionId={classSectionId} subjectId={subjectId} /></TabsContent>
            <TabsContent value="communication" className="mt-0 outline-none"><CommunicationTab /></TabsContent>
            <TabsContent value="insights" className="mt-0 outline-none"><InsightsTab /></TabsContent>
            <TabsContent value="interventions" className="mt-0 outline-none"><InterventionsTab /></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
