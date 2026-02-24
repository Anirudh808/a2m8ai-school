"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle, Clock, FileText, Search, Users } from "lucide-react";

type QuizResultData = {
  quizTitle: string;
  totalQuestions: number;
  totalStudents: number;
  gradedCount: number;
  pendingCount: number;
  notSubmittedCount: number;
  results: {
    studentId: string;
    name: string;
    rollNo: string;
    status: string;
    score: number | null;
    submittedAt: string | null;
  }[];
};

export default function QuizResultsPage() {
  const params = useParams();
  const quizId = params.quizId as string;

  const { data, isLoading, error } = useQuery<QuizResultData>({
    queryKey: ["quiz-results", quizId],
    queryFn: async () => {
      const res = await fetch(`/api/teacher/quizzes/results/${quizId}`);
      if (!res.ok) throw new Error("Failed to fetch results");
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
         <Skeleton className="h-8 w-24 mb-6" />
         <div className="flex gap-4">
            <Skeleton className="h-10 w-64" />
         </div>
         <Skeleton className="h-32 w-full" />
         <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !data) {
     return (
       <div className="p-12 text-center mt-8">
         <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><span className="text-2xl font-bold">!</span></div>
         <h2 className="text-xl font-bold text-slate-900">Failed to load results</h2>
         <p className="text-slate-500 mt-2">Could not find results for this quiz. Please check the URL or try again later.</p>
         <Button className="mt-6" asChild variant="outline">
            <Link href="/teacher/quizzes">Back to Quizzes</Link>
         </Button>
       </div>
     )
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-20 bg-slate-50 min-h-screen">
      {/* Header */}
      <div>
         <Button variant="ghost" size="sm" className="mb-4 -ml-3 text-slate-500 hover:text-indigo-600" asChild>
            <Link href="/teacher/quizzes">
               <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
            </Link>
         </Button>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
               <h1 className="text-3xl font-bold tracking-tight text-slate-900">{data.quizTitle}</h1>
               <p className="text-slate-500 mt-1 flex items-center gap-2">
                 <span>Quiz Results</span>
                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                 <span>{data.totalQuestions} Questions</span>
               </p>
            </div>
            <Button className="bg-white text-indigo-600 border-slate-200 hover:bg-slate-50" variant="outline">
              Export CSV
            </Button>
         </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card className="border-slate-200 shadow-sm">
             <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0"><Users className="h-6 w-6" /></div>
                <div>
                   <p className="text-2xl font-bold text-slate-900">{data.totalStudents}</p>
                   <p className="text-sm font-medium text-slate-500 leading-tight">Total Students</p>
                </div>
             </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
             <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0"><CheckCircle className="h-6 w-6" /></div>
                <div>
                   <p className="text-2xl font-bold text-emerald-700">{data.gradedCount}</p>
                   <p className="text-sm font-medium text-emerald-600 leading-tight">Graded</p>
                </div>
             </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
             <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0"><FileText className="h-6 w-6" /></div>
                <div>
                   <p className="text-2xl font-bold text-amber-700">{data.pendingCount}</p>
                   <p className="text-sm font-medium text-amber-600 leading-tight">Needs Grading</p>
                </div>
             </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
             <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"><Clock className="h-6 w-6" /></div>
                <div>
                   <p className="text-2xl font-bold text-slate-500">{data.notSubmittedCount}</p>
                   <p className="text-sm font-medium text-slate-400 leading-tight">Not Submitted</p>
                </div>
             </CardContent>
          </Card>
      </div>

      {/* Main Table Area */}
      <Card className="shadow-sm border-slate-200 border-t-4 border-t-indigo-600">
         <div className="p-4 border-b border-slate-100 bg-white rounded-t-xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-900">Student Submissions</h2>
            <div className="relative w-full sm:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search student..." 
                 className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
               />
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs tracking-wider">
                  <tr>
                     <th className="px-6 py-4 rounded-tl-lg">Student Name</th>
                     <th className="px-6 py-4">Roll No.</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Submitted At</th>
                     <th className="px-6 py-4 font-bold text-slate-900 text-right">Score</th>
                     <th className="px-6 py-4 text-right rounded-tr-lg">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 bg-white">
                  {data.results.map((r, i) => (
                     <tr key={r.studentId} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                           <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium text-xs">
                             {r.name.charAt(0)}
                           </div>
                           {r.name}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{r.rollNo}</td>
                        <td className="px-6 py-4">
                           <Badge 
                             variant="outline" 
                             className={
                               r.status === 'Graded' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                               r.status === 'Needs Grading' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                               'border-slate-200 bg-slate-50 text-slate-500'
                             }
                           >
                             {r.status}
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{r.submittedAt || '--'}</td>
                        <td className="px-6 py-4 text-right">
                           {r.score !== null ? (
                             <span className="font-bold text-slate-900">{r.score}/{data.totalQuestions}</span>
                           ) : (
                             <span className="text-slate-400">--</span>
                           )}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                             {r.status === 'Graded' ? 'Review' : r.status === 'Needs Grading' ? 'Grade Now' : 'N/A'}
                           </Button>
                        </td>
                     </tr>
                  ))}
                  {data.results.length === 0 && (
                     <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                           No students found in this class section.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
}
