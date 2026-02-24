import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStore } from "@/lib/store";
import { BookOpen, Clock, FileText, CheckCircle, BrainCircuit, Users, ArrowRight, AlertCircle } from "lucide-react";

export default function TeacherAssignmentsPage() {
  const store = getStore();
  const teacherId = "teacher1"; // Standardized mock teacher ID
  const myClassIds = store.classSections.filter((c) => c.teacherIds.includes(teacherId)).map((c) => c.id);
  const myAssignments = store.assignments.filter((a) => myClassIds.includes(a.classSectionId));

  // Sort assignments by due date (closest first)
  const sortedAssignments = [...myAssignments].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="space-y-6 md:p-8 pt-6 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Assignments</h1>
          <p className="text-slate-500">Manage and track all assignments across your classes.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" asChild>
          <Link href="/teacher/assignments/new">
            <BookOpen className="mr-2 h-4 w-4" /> Create Assignment
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {sortedAssignments.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-200 p-12 text-center bg-white">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-4">
              <FileText className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No assignments found</h3>
            <p className="text-slate-500 mt-1 mb-4">You haven&apos;t created any assignments for your classes yet.</p>
            <Button variant="outline" asChild>
              <Link href="/teacher/assignments/new">Create your first assignment</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedAssignments.map((assignment) => {
               const classSection = store.classSections.find(c => c.id === assignment.classSectionId);
               const subject = classSection ? store.subjects.find(s => classSection.subjectIds.includes(s.id)) : null;
               
               const submissions = store.submissions.filter((s) => s.assignmentId === assignment.id);
               const gradedCount = submissions.filter((s) => s.status === "GRADED").length;
               const pendingCount = submissions.filter((s) => s.status === "SUBMITTED").length;
               const totalStudents = classSection ? classSection.studentIds.length : 0;
               const notSubmittedCount = totalStudents - gradedCount - pendingCount;
               
               const dueDate = new Date(assignment.dueDate);
               const isOverdue = dueDate < new Date() && (pendingCount > 0 || notSubmittedCount > 0);

               return (
                 <Card key={assignment.id} className="overflow-hidden transition-all hover:shadow-md border-slate-200 hover:border-indigo-200 group">
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
                                {assignment.format && (
                                  <Badge variant="secondary" className="text-xs">
                                     {assignment.format}
                                  </Badge>
                                )}
                                {(assignment as any).type === "AI_GENERATED" && (
                                  <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs border-0">
                                    <BrainCircuit className="h-3 w-3 mr-1" /> AI Generated
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {assignment.title}
                              </h3>
                              <p className="text-sm text-slate-500 mt-1 line-clamp-1">{assignment.description}</p>
                           </div>
                           <div className="shrink-0 flex items-center sm:items-end flex-col mt-2 sm:mt-0">
                              <span className={`text-sm font-medium flex items-center px-3 py-1 rounded-full ${isOverdue ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-700"}`}>
                                {isOverdue ? <AlertCircle className="mr-1.5 h-4 w-4" /> : <Clock className="mr-1.5 h-4 w-4" />}
                                Due: {dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                           </div>
                        </div>

                        {/* Bottom: Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                          <div className="space-y-1">
                             <div className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                               <Users className="h-3 w-3 mr-1" /> Total
                             </div>
                             <div className="text-xl font-bold text-slate-900">{totalStudents}</div>
                          </div>
                          <div className="space-y-1">
                             <div className="text-xs font-medium text-emerald-600 uppercase tracking-wider flex items-center">
                               <CheckCircle className="h-3 w-3 mr-1" /> Graded
                             </div>
                             <div className="text-xl font-bold text-emerald-700">{gradedCount}</div>
                          </div>
                          <div className="space-y-1">
                             <div className="text-xs font-medium text-amber-600 uppercase tracking-wider flex items-center">
                               <FileText className="h-3 w-3 mr-1" /> To Grade
                             </div>
                             <div className="text-xl font-bold text-amber-700">{pendingCount}</div>
                          </div>
                          <div className="space-y-1">
                             <div className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center">
                               <Clock className="h-3 w-3 mr-1" /> Pending
                             </div>
                             <div className="text-xl font-bold text-slate-500">{notSubmittedCount}</div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="bg-slate-50 border-t sm:border-t-0 sm:border-l border-slate-100 p-5 flex sm:flex-col items-center justify-between sm:justify-center gap-3 sm:w-48 shrink-0">
                         <div className="text-sm font-medium text-slate-600 text-center hidden sm:block">
                           <span className="block text-2xl font-bold text-indigo-600">{Math.round((gradedCount / Math.max(totalStudents, 1)) * 100)}%</span>
                           Completion
                         </div>
                         <Button className="w-full bg-white border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700" variant="outline" asChild>
                            <Link href={`/teacher/classes/${assignment.classSectionId}/assignments/${assignment.id}`}>
                               View Details <ArrowRight className="ml-2 h-4 w-4" />
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
