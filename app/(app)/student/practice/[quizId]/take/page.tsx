"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function StudentQuizTakePage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId as string;
  const studentId = "student1";

  const { data: quiz, isLoading, error } = useQuery({
    queryKey: ["practice-quiz", quizId],
    queryFn: async () => {
      // For simplicity in this mock setup without standard GET API endpoints, 
      // we'll mock it by accessing the global store temporarily via a custom API or direct import. 
      // However since store.ts is mostly server-side or mock, let's just use an API endpoint. 
      // Actually we just call a simple GET endpoint, let's make a quick helper to fetch from store.
      const res = await fetch(`/api/student/practice/${quizId}`);
      if (!res.ok) throw new Error("Could not load quiz.");
      return res.json();
    }
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer mock
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit ? quiz.timeLimit * 60 : 0);

  useEffect(() => {
    if (quiz?.timeLimit && timeLeft === 0) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  }, [quiz]);

  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentIdx < (quiz?.questions?.length || 0) - 1) setCurrentIdx(c => c + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(c => c - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/student/practice/submit', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ studentId, quizId, answers })
      });
      if (!res.ok) throw new Error("Failed to submit");
      router.push(`/student/practice/${quizId}/results`);
    } catch (error) {
       console.error(error);
       setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 max-w-3xl mx-auto space-y-6 mt-10"><Skeleton className="h-12 w-full" /><Skeleton className="h-64 w-full" /></div>;
  if (error || !quiz) return <div className="p-12 text-center text-rose-500">Failed to load this quiz. It may not exist.</div>;

  const question = quiz.questions[currentIdx];
  const total = quiz.questions.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* Top Nav */}
       <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push('/student/practice')}><ArrowLeft className="w-5 h-5 text-slate-500" /></Button>
                <div>
                  <h1 className="font-bold text-slate-900 leading-none">{quiz.title}</h1>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{quiz.questions.length} Questions</span>
                </div>
             </div>
             {quiz.timeLimit && (
               <div className={`font-mono font-bold text-lg px-3 py-1 bg-slate-100 rounded-md border ${timeLeft < 60 ? 'text-rose-600 border-rose-200 bg-rose-50' : 'text-slate-700 border-slate-200'}`}>
                 {formatTime(timeLeft)}
               </div>
             )}
          </div>
       </div>

       {/* Main Question Area */}
       <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 md:py-12 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
             <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Question {currentIdx + 1} of {total}</span>
             <div className="flex gap-1">
                {quiz.questions.map((_: any, i: number) => (
                   <div key={i} className={`h-1.5 w-6 rounded-full ${i === currentIdx ? 'bg-indigo-600' : answers[quiz.questions[i].id] !== undefined ? 'bg-indigo-300' : 'bg-slate-200'}`} />
                ))}
             </div>
          </div>

          <Card className="border-0 shadow-sm bg-white ring-1 ring-slate-200 flex-1">
             <CardContent className="p-6 md:p-10 flex flex-col h-full">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8 leading-snug">{question.question}</h2>

                {question.type === "MCQ" ? (
                  <RadioGroup 
                     value={answers[question.id]?.toString()} 
                     onValueChange={(val) => setAnswers(prev => ({ ...prev, [question.id]: parseInt(val) }))}
                     className="space-y-4 mt-auto"
                  >
                     {question.options?.map((opt: string, idx: number) => {
                        const isSelected = answers[question.id] === idx;
                        return (
                           <label key={idx} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}>
                              <RadioGroupItem value={idx.toString()} id={`q${currentIdx}-opt${idx}`} className="sr-only" />
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-indigo-600' : 'border-slate-300'}`}>
                                 {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                              </div>
                              <span className={`text-base font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>{opt}</span>
                           </label>
                        );
                     })}
                  </RadioGroup>
                ) : (
                  <textarea 
                     className="w-full h-48 p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-0 resize-none mt-auto"
                     placeholder="Type your answer here..."
                     value={answers[question.id] || ""}
                     onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                  />
                )}
             </CardContent>
          </Card>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
             <Button variant="outline" size="lg" onClick={handlePrev} disabled={currentIdx === 0} className="w-32">
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
             </Button>

             {currentIdx === total - 1 ? (
               <Button size="lg" onClick={handleSubmit} disabled={isSubmitting} className="w-32 bg-emerald-600 hover:bg-emerald-700 shadow-sm border-0">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-4 h-4 mr-2" /> Submit</>}
               </Button>
             ) : (
               <Button size="lg" onClick={handleNext} className="w-32 bg-slate-900 hover:bg-slate-800 shadow-sm">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
             )}
          </div>
       </div>
    </div>
  );
}
