import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStore } from "@/lib/store";
import { BookOpen, Clock, HelpCircle, Users, ArrowRight, Sparkles, BrainCircuit } from "lucide-react";

export default function TeacherQuizzesPage() {
  const store = getStore();
  const teacherId = "teacher1"; // Standardized mock teacher ID
  const myClassIds = store.classSections.filter((c) => c.teacherIds.includes(teacherId)).map((c) => c.id);
  const myQuizzes = store.quizzes.filter((q) => myClassIds.includes(q.classSectionId));

  return (
    <div className="space-y-6 md:p-8 pt-6 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quiz Builder</h1>
          <p className="text-slate-500">Manage and track quizzes across your active classes.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" asChild>
             <Link href="/teacher/quizzes/new">
               <HelpCircle className="mr-2 h-4 w-4" /> Create Quiz
             </Link>
           </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {myQuizzes.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-200 p-12 text-center bg-white">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-4">
              <HelpCircle className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No quizzes found</h3>
            <p className="text-slate-500 mt-1 mb-4">You haven&apos;t created any quizzes for your classes yet.</p>
            <Button variant="outline" asChild>
              <Link href="/teacher/quizzes/new">Create your first quiz</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {myQuizzes.map((quiz) => {
               const classSection = store.classSections.find(c => c.id === quiz.classSectionId);
               const subject = classSection ? store.subjects.find(s => classSection.subjectIds.includes(s.id)) : null;
               
               const totalStudents = classSection ? classSection.studentIds.length : 0;
               const timeLimitStr = quiz.timeLimit ? `${quiz.timeLimit} mins` : "No limit";

               return (
                 <Card key={quiz.id} className="overflow-hidden transition-all hover:shadow-md border-slate-200 hover:border-indigo-200 group">
                   <div className="flex flex-col sm:flex-row">
                      {/* Left: Info */}
                      <div className="flex-1 p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                           <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 font-medium">
                                  {classSection?.grade} - {classSection?.sectionName}
                                </Badge>
                                {subject && (
                                  <span className="text-xs font-medium text-slate-500 flex items-center">
                                    <BookOpen className="h-3 w-3 mr-1" /> {subject.name}
                                  </span>
                                )}
                                {(quiz as any).type === "AI_GENERATED" && (
                                  <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs border-0">
                                    <BrainCircuit className="h-3 w-3 mr-1" /> AI Generated
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {quiz.title}
                              </h3>
                           </div>
                           <div className="shrink-0 flex items-center sm:items-end flex-col mt-2 sm:mt-0">
                              <span className="text-sm font-medium flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                                <Clock className="mr-1.5 h-4 w-4" />
                                {timeLimitStr}
                              </span>
                           </div>
                        </div>

                        {/* Bottom: Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                          <div className="space-y-1">
                             <div className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                               <Users className="h-3 w-3 mr-1" /> Enrolled
                             </div>
                             <div className="text-xl font-bold text-slate-900">{totalStudents}</div>
                          </div>
                          <div className="space-y-1">
                             <div className="text-xs font-medium text-indigo-600 uppercase tracking-wider flex items-center">
                               <HelpCircle className="h-3 w-3 mr-1" /> Questions
                             </div>
                             <div className="text-xl font-bold text-indigo-700">{quiz.questions.length}</div>
                          </div>
                          <div className="space-y-1">
                             <div className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                               Avg Score
                             </div>
                             <div className="text-xl font-bold text-emerald-700">--</div>
                          </div>
                          <div className="space-y-1">
                             <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                               Status
                             </div>
                             <div className="text-sm font-bold text-slate-500 mt-1">Active</div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="bg-slate-50 border-t sm:border-t-0 sm:border-l border-slate-100 p-5 flex sm:flex-col items-center justify-between sm:justify-center gap-3 sm:w-48 shrink-0">
                         <Button className="w-full bg-white border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700" variant="outline" asChild>
                            <Link href={`/teacher/quizzes/${quiz.id}`}>
                               Edit Quiz <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                         </Button>
                         <Button className="w-full" variant="ghost" asChild>
                            <Link href={`/teacher/quizzes/${quiz.id}/results`} className="text-sm text-slate-500 hover:text-indigo-600">
                               View Results
                            </Link>
                         </Button>
                      </div>
                   </div>
                 </Card>
               );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
