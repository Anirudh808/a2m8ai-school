import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, FileCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getStore } from "@/lib/store";
import { format, addDays } from "date-fns";

export default function StudentExamsPage() {
  const store = getStore();
  const studentId = "student1";
  
  // Find classes the student is in
  const myClassIds = store.classSections.filter((c) => c.studentIds.includes(studentId)).map((c) => c.id);
  
  // Find quizzes/exams for those classes
  // The system uses 'quizzes' and 'assignments', we will display quizzes here and mock a dynamic due date since schema might just have timeLimit.
  const myExams = store.quizzes.filter(q => myClassIds.includes(q.classSectionId));
  
  // Mock finding submissions to see if they completed it
  const getSubmissionStatus = (quizId: string) => {
    // There are no quiz-specific submissions in the current simplified store type, 
    // but we'll mock completion randomly for demo purposes, or just show them as pending.
    return false; // all pending for now
  };

  const pendingExams = myExams.filter(e => !getSubmissionStatus(e.id));
  const completedExams = myExams.filter(e => getSubmissionStatus(e.id));

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Exams & Quizzes</h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          View and attend all tests, quizzes, and exams assigned by your teachers before their due dates.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">Upcoming & Pending</h2>
        
        {pendingExams.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pendingExams.map((exam, idx) => {
              // Mock a due date based on index for variety
              const dueDate = addDays(new Date(), idx + 1);
              const classSection = store.classSections.find(c => c.id === exam.classSectionId);
              const subject = classSection ? store.subjects.find(s => classSection.subjectIds.includes(s.id)) : null;

              return (
                <Card key={exam.id} className="group relative overflow-hidden border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-white">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                  <CardHeader className="pb-3 pl-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-100">
                        Pending
                      </Badge>
                      <div className="flex text-xs font-medium text-slate-500 items-center bg-slate-100 px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3 mr-1" /> {exam.timeLimit || 30} min
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold leading-tight">{exam.title}</CardTitle>
                    <CardDescription className="text-sm font-medium text-slate-600 mt-1">
                      {subject?.name || "General"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-6 space-y-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                      <span className="font-medium text-slate-700">Due: {format(dueDate, "MMM d, yyyy - h:mm a")}</span>
                    </div>
                    
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" asChild>
                      {/* For now routing them to take the quiz, even if the route may need creation later */}
                      <Link href={`/student/exams/${exam.id}/take`}>
                        Attend Exam <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">You&apos;re all caught up!</h3>
            <p className="text-slate-500">No pending exams or quizzes at the moment.</p>
          </div>
        )}
      </div>

      {completedExams.length > 0 && (
        <div className="space-y-6 pt-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">Completed</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedExams.map(exam => (
              <Card key={exam.id} className="border-slate-200 shadow-none bg-slate-50 opacity-75">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{exam.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full text-slate-600">
                    View Results
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
