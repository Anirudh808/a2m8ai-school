"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Clock, FileCheck, AlertTriangle, PlayCircle, Lightbulb, Users, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type OverviewData = {
  attendance: {
    percentage: number;
    trend: "up" | "down";
    last14Days: any[];
  };
  pipeline: {
    pending: number;
    reviewed: number;
    late: number;
  };
  weakConcepts: {
    concept: string;
    score: number;
    trend: string;
  }[];
  atRiskStudents: {
    id: string;
    name: string;
    reason: string;
    severity: "high" | "medium";
  }[];
  todayPlan: {
    lessonTitle: string;
    lessonId: string;
    time: string;
    type: string;
    status: string;
  };
};

export function OverviewTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const { data, isLoading, error } = useQuery<OverviewData>({
    queryKey: ["class-tabs-overview", classSectionId, subjectId],
    queryFn: async () => {
      const res = await fetch(`/api/teacher/classes/${classSectionId}/${subjectId}/tabs/overview`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-[300px] w-full rounded-xl md:col-span-2" />
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
    return <div className="p-8 text-center text-red-500 mt-6 bg-red-50 rounded-xl border border-red-200">Failed to load overview data.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      
      {/* 1. Today's Plan */}
      <Card className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-indigo-50 flex items-center justify-between text-base font-medium">
            Today&apos;s Plan
            <Clock className="h-4 w-4 text-indigo-200" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2 text-2xl font-bold">{data.todayPlan.lessonTitle}</div>
          <div className="mt-1 flex items-center gap-2 text-indigo-100 text-sm">
            <span>{data.todayPlan.time}</span>
            <span className="w-1 h-1 rounded-full bg-indigo-300"></span>
            <span>{data.todayPlan.type}</span>
          </div>
          <Button className="w-full mt-6 bg-white text-indigo-600 hover:bg-indigo-50 font-semibold" variant="secondary">
            <PlayCircle className="h-4 w-4 mr-2" /> Start Session
          </Button>
        </CardContent>
      </Card>

      {/* 2. Homework Pipeline */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-500 flex items-center justify-between text-base font-medium">
            Homework Pipeline
            <FileCheck className="h-4 w-4 text-slate-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-amber-600">{data.pipeline.pending}</span>
            <span className="text-sm font-medium text-slate-500">To Grade</span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
             <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-600 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Reviewed</span>
                <span className="font-semibold">{data.pipeline.reviewed}</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <span className="text-rose-600 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Late/Missing</span>
                <span className="font-semibold">{data.pipeline.late}</span>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Attendance Summary */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-500 flex items-center justify-between text-base font-medium">
            Attendance (14d)
            <Users className="h-4 w-4 text-slate-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900">{data.attendance.percentage}%</span>
            {data.attendance.trend === "up" ? (
               <span className="flex items-center text-emerald-600 text-sm font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                 <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> 2%
               </span>
            ) : (
               <span className="flex items-center text-rose-600 text-sm font-medium bg-rose-50 px-1.5 py-0.5 rounded">
                 <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" /> 1%
               </span>
            )}
          </div>
          {/* Simple mock bar chart */}
          <div className="mt-6 flex h-[40px] items-end justify-between gap-1">
             {data.attendance.last14Days.map((d, i) => (
                <div key={i} className="w-full bg-indigo-100 rounded-t-sm" style={{ height: `${(d.present / 25) * 100}%` }}></div>
             ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. AI Insights: Weak Concepts */}
      <Card className="shadow-sm border-slate-200 md:col-span-2 lg:col-span-2">
        <CardHeader>
           <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" /> AI Insights: Concept Gaps
                </CardTitle>
                <CardDescription>Concepts where students are struggling based on recent quiz scores.</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex">Generate Remedial Plan</Button>
           </div>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
              {data.weakConcepts.map((wc, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-3">
                       <Activity className="h-4 w-4 text-rose-500" />
                       <span className="font-medium text-slate-800">{wc.concept}</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-sm font-semibold text-rose-600">{wc.score}% avg score</span>
                       <Button variant="ghost" size="sm" className="text-indigo-600 h-8">Review</Button>
                    </div>
                 </div>
              ))}
           </div>
        </CardContent>
      </Card>

      {/* 5. At-Risk Students */}
      <Card className="shadow-sm border-slate-200 border-t-4 border-t-rose-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-500" /> At-Risk Students
          </CardTitle>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
              {data.atRiskStudents.map((rs, i) => (
                 <div key={rs.id} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                       <span className="font-semibold text-slate-800">{rs.name}</span>
                       <Badge variant={rs.severity === "high" ? "destructive" : "secondary"}>{rs.severity}</Badge>
                    </div>
                    <span className="text-sm text-slate-500">{rs.reason}</span>
                    {i < data.atRiskStudents.length - 1 && <div className="w-full h-px bg-slate-100 mt-2"></div>}
                 </div>
              ))}
           </div>
        </CardContent>
      </Card>

    </div>
  );
}
