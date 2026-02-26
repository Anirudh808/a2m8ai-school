"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, BrainCircuit, Loader2, PlayCircle, Trophy, CheckCircle2 } from "lucide-react";
import { getStore } from "@/lib/store";

export default function StudentPracticePage() {
  const router = useRouter();
  const store = getStore();
  const studentId = "student1";

  // Data for the form
  const classSections = store.classSections.filter((c) => c.studentIds.includes(studentId));
  const mySubjectIds = Array.from(new Set(classSections.flatMap(c => c.subjectIds)));
  const enrolledSubjects = store.subjects.filter(s => mySubjectIds.includes(s.id));

  const [subjectId, setSubjectId] = useState<string>("");
  const [chapterId, setChapterId] = useState<string>("");
  const [lessonId, setLessonId] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [type, setType] = useState<string>("quiz");
  const [isGenerating, setIsGenerating] = useState(false);

  const availableChapters = useMemo(() => {
    if (!subjectId) return [];
    return store.chapters.filter(c => c.subjectId === subjectId);
  }, [subjectId, store.chapters]);

  const availableLessons = useMemo(() => {
    if (!chapterId) return [];
    return store.lessons.filter(l => l.chapterId === chapterId);
  }, [chapterId, store.lessons]);

  const handleGenerate = async () => {
    if (!subjectId) return;
    setIsGenerating(true);
    
    try {
      // Call our mock API to generate the quiz
      const res = await fetch("/api/student/practice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          subjectId,
          chapterId,
          lessonId,
          difficulty,
          type
        }),
      });
      
      if (!res.ok) throw new Error("Failed to generate quiz");
      const data = await res.json();
      
      // Navigate to the take quiz page
      router.push(`/student/practice/${data.quizId}/take`);
    } catch (error) {
       console.error(error);
       setIsGenerating(false);
    }
  };

  // Mock quizzes display
  const enrolledClassSectionIds = classSections.map(c => c.id);
  const personalClassSectionId = `personal-${studentId}`;
  
  const allQuizzes = store.quizzes.filter(q => 
    enrolledClassSectionIds.includes(q.classSectionId) || q.classSectionId === personalClassSectionId
  );
  
  const submissions = store.submissions.filter(s => s.studentId === studentId);

  // Determine pending vs completed
  const pendingQuizzes = allQuizzes.filter(q => {
     // A quiz is pending if there's no submission or the submission is PENDING
     const sub = submissions.find(s => s.assignmentId === q.id); // For simplicity, in our mock, we sometimes map quizId to assignmentId or we'll assume it doesn't have one
     return !sub || sub.status === "PENDING";
  });
  
  const completedQuizzes = allQuizzes.filter(q => {
     const sub = submissions.find(s => s.assignmentId === q.id);
     return sub && sub.status !== "PENDING";
  });

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Practice Hub</h1>
          <p className="mt-1 text-sm text-slate-500">Master concepts with AI-generated quizzes and practice sets</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Generator Form */}
        <div className="md:col-span-1">
          <Card className="border-amber-200/60 shadow-md bg-gradient-to-b from-amber-50/50 to-white sticky top-24">
            <CardHeader className="pb-4">
               <div className="flex items-center gap-2 mb-1">
                 <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-100/50 font-bold pointer-events-none">✨ AI Powered</Badge>
               </div>
               <CardTitle className="text-xl">Generate Practice</CardTitle>
               <CardDescription>Tailor a quiz exactly to what you need to study.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
               <div className="space-y-2">
                 <Label htmlFor="subject" className="text-slate-700 font-semibold">Subject</Label>
                 <Select value={subjectId} onValueChange={(val) => { setSubjectId(val); setChapterId(""); setLessonId(""); }}>
                   <SelectTrigger className="bg-white">
                     <SelectValue placeholder="Select a subject" />
                   </SelectTrigger>
                   <SelectContent>
                     {enrolledSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                   </SelectContent>
                 </Select>
               </div>
               
               {subjectId && (
                 <div className="space-y-2">
                   <Label htmlFor="chapter" className="text-slate-700 font-semibold">Chapter (Optional)</Label>
                   <Select value={chapterId} onValueChange={(val) => { setChapterId(val); setLessonId(""); }}>
                     <SelectTrigger className="bg-white">
                       <SelectValue placeholder="All Chapters" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="none">All Chapters</SelectItem>
                       {availableChapters.map(c => <SelectItem key={c.id} value={c.id}>Ch {c.order}: {c.title}</SelectItem>)}
                     </SelectContent>
                   </Select>
                 </div>
               )}

               {chapterId && chapterId !== "none" && (
                 <div className="space-y-2">
                   <Label htmlFor="lesson" className="text-slate-700 font-semibold">Lesson (Optional)</Label>
                   <Select value={lessonId} onValueChange={setLessonId}>
                     <SelectTrigger className="bg-white">
                       <SelectValue placeholder="All Lessons" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="none">All Lessons</SelectItem>
                       {availableLessons.map(l => <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>)}
                     </SelectContent>
                   </Select>
                 </div>
               )}

               <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="bg-white h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="bg-white h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quiz">MCQ Quiz</SelectItem>
                        <SelectItem value="subjective">Subjective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <Button 
                onClick={handleGenerate} 
                className="w-full bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-200 text-white font-bold mt-4"
                disabled={!subjectId || isGenerating}
              >
                 {isGenerating ? (
                   <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Quiz...</>
                 ) : (
                   <><BrainCircuit className="w-5 h-5 mr-2" /> Start Practice</>
                 )}
               </Button>
            </CardContent>
          </Card>
        </div>

        {/* Practice Lists */}
        <div className="md:col-span-2">
           <Tabs defaultValue="pending" className="w-full">
              <TabsList className="bg-white border border-slate-200 mb-6">
                 <TabsTrigger value="pending" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">Pending & New</TabsTrigger>
                 <TabsTrigger value="completed" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">Completed History</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="m-0 space-y-4">
                 {pendingQuizzes.length === 0 ? (
                    <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                       <Trophy className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                       <h3 className="text-lg font-medium tracking-tight text-slate-900 mb-1">You are all caught up!</h3>
                       <p className="text-sm text-slate-500">Use the generator to create a new practice set.</p>
                    </div>
                 ) : (
                    pendingQuizzes.map(q => {
                       const isPersonal = q.classSectionId === personalClassSectionId;
                       const relatedSubj = enrolledSubjects.find(s => q.title.includes(s.name) || (!isPersonal && classSections.find(c => c.id === q.classSectionId)?.subjectIds.includes(s.id)));
                       return (
                         <div key={q.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  {isPersonal && <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0">Self-Practice</Badge>}
                                  {!isPersonal && <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0">Assignment</Badge>}
                               </div>
                               <h4 className="font-bold text-lg text-slate-900 leading-tight">{q.title}</h4>
                               <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 font-medium">
                                  <span>{q.questions.length} Questions</span>
                                  {q.timeLimit && <span>• {q.timeLimit} mins</span>}
                                  {relatedSubj && <span className="text-slate-400">• {relatedSubj.name}</span>}
                               </div>
                            </div>
                            <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-sm shrink-0" onClick={() => router.push(`/student/practice/${q.id}/take`)}>
                               Take Quiz <PlayCircle className="w-4 h-4 ml-1.5" />
                            </Button>
                         </div>
                       );
                    })
                 )}
              </TabsContent>

              <TabsContent value="completed" className="m-0 space-y-4">
                 {completedQuizzes.length === 0 ? (
                    <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                       <p className="text-sm text-slate-500">No completed practice sessions yet.</p>
                    </div>
                 ) : (
                    completedQuizzes.map(q => {
                       const sub = submissions.find(s => s.assignmentId === q.id);
                       const scorePercent = sub?.score ? Math.round((sub.score)) : 0;
                       let scoreColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
                       if (scorePercent < 50) scoreColor = "text-rose-700 bg-rose-50 border-rose-200";
                       else if (scorePercent < 80) scoreColor = "text-amber-700 bg-amber-50 border-amber-200";

                       return (
                         <div key={q.id} className="bg-white p-5 rounded-xl border border-slate-200 opacity-90 hover:opacity-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group transition-all">
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary" className="bg-slate-100 text-slate-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Completed</Badge>
                               </div>
                               <h4 className="font-bold text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors">{q.title}</h4>
                               <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 font-medium">
                                  <span>{formatDate(sub?.submittedAt || new Date().toISOString())}</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                               <div className={`px-3 py-1.5 rounded-lg border font-bold text-base shadow-sm ${scoreColor}`}>
                                  {sub?.score}%
                               </div>
                               <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => router.push(`/student/practice/${q.id}/results`)}>
                                  Review
                               </Button>
                            </div>
                         </div>
                       );
                    })
                 )}
              </TabsContent>
           </Tabs>
        </div>
      </div>
    </div>
  );
}

function formatDate(ds: string) {
  try {
     const d = new Date(ds);
     return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
     return ds;
  }
}
