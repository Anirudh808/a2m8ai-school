"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { getStore } from "@/lib/store";

export function AttendanceTab({ classSectionId, subjectId }: { classSectionId: string, subjectId: string }) {
  const store = getStore();
  const classSection = store.classSections.find(c => c.id === classSectionId);
  const students = classSection ? store.users.filter(u => classSection.studentIds.includes(u.id)) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
           <h2 className="text-xl font-bold tracking-tight text-slate-900">Attendance Register</h2>
           <p className="text-sm text-slate-500">Track and manage student attendance for this class.</p>
         </div>
         <div className="flex gap-2">
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"><CheckCircle className="h-4 w-4"/> Present</div>
            <div className="flex items-center gap-1 text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full"><XCircle className="h-4 w-4"/> Absent</div>
            <div className="flex items-center gap-1 text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full"><Clock className="h-4 w-4"/> Late</div>
         </div>
      </div>
      
      <Card>
        <CardHeader>
           <CardTitle>Today&apos;s Roster</CardTitle>
           <CardDescription>Mark attendance for today&apos;s session.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="rounded-md border border-slate-200">
             <div className="grid grid-cols-[1fr_200px] border-b border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-500">
                <div>Student Name</div>
                <div className="text-center">Status</div>
             </div>
             <div className="divide-y divide-slate-100">
               {students.map((student) => (
                 <div key={student.id} className="grid grid-cols-[1fr_200px] items-center p-3 text-sm">
                    <div className="flex items-center gap-3">
                       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-medium">
                         {student.name.charAt(0)}
                       </div>
                       <span className="font-medium text-slate-900">{student.name}</span>
                    </div>
                    <div className="flex justify-center gap-2">
                      <button className="h-8 w-8 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors">
                        <XCircle className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded-full border border-amber-200 text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors">
                        <Clock className="h-4 w-4" />
                      </button>
                    </div>
                 </div>
               ))}
               {students.length === 0 && (
                 <div className="p-8 text-center text-slate-500">No students found for this class.</div>
               )}
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
