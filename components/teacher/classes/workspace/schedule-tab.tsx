"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO, isPast } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Edit } from "lucide-react";
import type { ClassSchedule } from "@/lib/types";

export function ScheduleTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const queryClient = useQueryClient();
  const queryKey = ["class-schedule", classSectionId, subjectId];

  const { data: schedules, isLoading, error } = useQuery<ClassSchedule[]>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/schedule`);
      if (!res.ok) throw new Error("Failed to fetch schedule");
      return res.json();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/schedule/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  const addMutation = useMutation({
     mutationFn: async () => {
        const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/schedule`, {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
              date: new Date().toISOString().slice(0, 10),
              startTime: "09:00",
              endTime: "10:00",
              topic: "New Scheduled Class",
              type: "Regular",
              status: "Planned"
           })
        });
        if (!res.ok) throw new Error("Failed to add");
     },
     onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  const toggleStatusMutation = useMutation({
     mutationFn: async ({ id, status }: { id: string; status: string }) => {
        const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/schedule/${id}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error("Failed to update status");
     },
     onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  if (isLoading) {
    return (
      <div className="mt-6 space-y-4 p-4 bg-white rounded-xl border border-slate-200">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl">Error loading schedule.</div>;
  }

  const sortedSchedules = [...(schedules || [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h3 className="text-lg font-semibold text-slate-900">Class Schedule</h3>
            <p className="text-sm text-slate-500">Manage your upcoming and past sessions.</p>
         </div>
         <Button onClick={() => addMutation.mutate()} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" /> Add Session
         </Button>
      </div>

      <div className="space-y-4">
         {sortedSchedules.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-xl border border-slate-200 text-slate-500">
               No sessions scheduled yet.
            </div>
         ) : (
            sortedSchedules.map((session) => {
               const past = isPast(parseISO(session.date));
               const isCompleted = session.status === "Completed";
               
               return (
                  <div key={session.id} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                     isCompleted ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-slate-200 hover:border-indigo-300'
                  }`}>
                     <div className="flex items-start md:items-center gap-4">
                        <div className={`p-3 rounded-lg shrink-0 ${isCompleted ? 'bg-slate-200 text-slate-500' : 'bg-indigo-100 text-indigo-600'}`}>
                           <CalendarIcon className="w-6 h-6" />
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-semibold ${isCompleted ? 'text-slate-600 line-through decoration-slate-400' : 'text-slate-900'}`}>{session.topic}</h4>
                              <Badge variant="outline" className={session.type === 'Test' ? 'text-rose-600 border-rose-200 bg-rose-50' : 'text-slate-500'}>
                                 {session.type}
                              </Badge>
                           </div>
                           <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {format(parseISO(session.date), "MMM d, yyyy")}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {session.startTime} - {session.endTime}</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-2">
                        <Button 
                           variant="outline" 
                           size="sm"
                           onClick={() => toggleStatusMutation.mutate({ id: session.id, status: isCompleted ? "Planned" : "Completed" })}
                           className={isCompleted ? "" : "text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:bg-emerald-50"}
                        >
                           {isCompleted ? "Mark Planned" : "Mark Completed"}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                           <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(session.id)} className="text-slate-400 hover:text-rose-600">
                           <Trash2 className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               );
            })
         )}
      </div>
    </div>
  );
}
