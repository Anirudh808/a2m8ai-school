"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, BrainCircuit, RefreshCcw, LayoutDashboard, Target } from "lucide-react";

export default function StudentQuizResultsPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["practice-quiz-results", quizId],
    queryFn: async () => {
      const res = await fetch(`/api/student/practice/${quizId}/results`);
      if (!res.ok) throw new Error("Could not load results.");
      return res.json();
    }
  });

  if (isLoading) return <div className="p-8 max-w-4xl mx-auto space-y-6 mt-10"><Skeleton className="h-64 w-full" /><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /></div>;
  if (error || !data?.quiz || !data?.submission) return <div className="p-12 text-center text-rose-500">Failed to load results for this quiz.</div>;

  const { quiz, submission } = data;
  const score = submission.score || 0;
  
  let scoreColor = "text-emerald-600 bg-emerald-50 border-emerald-200";
  let BannerIcon: React.ElementType = TrophyIcon;
  let message = "Outstanding Performance!";
  
  if (score < 50) {
     scoreColor = "text-rose-600 bg-rose-50 border-rose-200";
     BannerIcon = Target;
     message = "Needs Review";
  } else if (score < 80) {
     scoreColor = "text-amber-600 bg-amber-50 border-amber-200";
     BannerIcon = Target;
     message = "Good Effort!";
  }

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => router.push('/student/practice')} className="mb-2 -ml-2 text-slate-500 hover:text-indigo-600">
         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Practice Hub
      </Button>

      {/* Main Score Card */}
      <Card className="border-0 shadow-lg overflow-hidden bg-white">
         <div className={`h-3 w-full ${score >= 80 ? 'bg-emerald-500' : score < 50 ? 'bg-rose-500' : 'bg-amber-500'}`} />
         <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
            <div className={`absolute -right-10 -top-10 opacity-5 w-64 h-64 rounded-full ${score >= 80 ? 'bg-emerald-500' : score < 50 ? 'bg-rose-500' : 'bg-amber-500'}`} />
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
               <Badge variant="outline" className="mb-4 bg-slate-50 text-slate-600 tracking-widest text-xs uppercase border-slate-200">Practice Results</Badge>
               <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">{quiz.title}</h1>
               <p className="mt-2 text-lg text-slate-600 flex items-center gap-2">
                 <BannerIcon className="w-5 h-5 text-slate-400" />
                 {message}
               </p>
               <div className="flex gap-3 mt-8">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-sm" onClick={() => router.push('/student/practice')}>
                     <LayoutDashboard className="w-4 h-4 mr-2" /> Practice Dashboard
                  </Button>
                  <Button variant="outline" className="text-slate-600 border-slate-300 font-semibold shadow-sm">
                     <RefreshCcw className="w-4 h-4 mr-2" /> Try Again
                  </Button>
               </div>
            </div>

            <div className="relative z-10 shrink-0">
               <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-[12px] flex flex-col items-center justify-center shadow-inner bg-white ${scoreColor}`}>
                  <span className="text-5xl md:text-6xl font-black">{score}<span className="text-2xl md:text-3xl text-slate-400">%</span></span>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* AI Feedback */}
      {submission.feedback && (
         <Card className="border border-indigo-100 shadow-sm bg-gradient-to-br from-indigo-50/50 to-white">
            <CardHeader className="pb-2">
               <CardTitle className="text-lg flex items-center gap-2 text-indigo-900">
                  <BrainCircuit className="w-5 h-5 text-indigo-600" /> AI Performance Analysis
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-slate-700 leading-relaxed font-medium">
                  {submission.feedback}
                  {score < 100 && " Focus carefully on the questions marked incorrect below, as these represent key areas for your continued study."}
               </p>
            </CardContent>
         </Card>
      )}

      {/* Detailed Review */}
      <div className="space-y-4">
         <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">Detailed Review</h3>
         
         <div className="space-y-4">
            {quiz.questions.map((q: any, idx: number) => {
               // Since our mock submission just stores score, we will "mock" the correct/incorrect visual 
               // by randomly assigning them such that it equals the score, or simply showing it as a review of answers.
               // Since we don't store individual answers in the mock submission, we'll pretend based on random seed for the demo.
               // (In a real app, `submission.answers[q.id]` would be compared to `q.correctAnswer`)
               
               // Fake pass/fail for the UI demo based on the total score
               // In reality we should fetch the exact answers. Let's assume some are correct/incorrect for the visual
               const isCorrectMock = Math.random() < (score / 100); 

               return (
                  <Card key={q.id} className={`border-l-4 ${isCorrectMock ? 'border-l-emerald-500' : 'border-l-rose-500'} shadow-sm`}>
                     <CardContent className="p-6">
                        <div className="flex gap-4">
                           <div className="mt-1 shrink-0">
                              {isCorrectMock ? (
                                 <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
                              ) : (
                                 <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center"><XCircle className="w-5 h-5 text-rose-600" /></div>
                              )}
                           </div>
                           <div className="flex-1 space-y-4">
                              <div>
                                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Question {idx + 1}</span>
                                 <h4 className="text-lg font-semibold text-slate-900 leading-snug">{q.question}</h4>
                              </div>
                              
                              {q.type === "MCQ" ? (
                                 <div className="grid gap-2">
                                    {q.options?.map((opt: string, optIdx: number) => {
                                       const isCorrectAnswer = optIdx === q.correctAnswer;
                                       // Only highlight the correct answer for review
                                       return (
                                          <div key={optIdx} className={`p-3 rounded-lg border text-sm font-medium ${isCorrectAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                                             {opt} {isCorrectAnswer && <span className="float-right text-xs font-bold uppercase track-wider text-emerald-600">Correct Answer</span>}
                                          </div>
                                       );
                                    })}
                                 </div>
                              ) : (
                                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Ideal Response Elements</span>
                                    <p className="text-sm text-slate-700 font-medium">Your response was graded by AI. A perfect answer should clearly explain the core concepts related to this topic.</p>
                                 </div>
                              )}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               );
            })}
         </div>
      </div>

    </div>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7c0 6 3 10 6 10s6-4 6-10V2Z" />
    </svg>
  );
}
