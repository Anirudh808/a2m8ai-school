"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { FileText, FileSpreadsheet, PlaySquare, FileCheck2, Upload, Trash2, ShieldAlert, Sparkles, EllipsisVertical } from "lucide-react";
import type { Material } from "@/lib/types";

export function MaterialsTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const queryClient = useQueryClient();
  const queryKey = ["class-materials", classSectionId, subjectId];

  const { data: materials, isLoading, error } = useQuery<Material[]>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/materials`);
      if (!res.ok) throw new Error("Failed to fetch materials");
      return res.json();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/materials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Lecture Notes",
          type: "PDF",
          attachedTo: "Subject",
          visibility: "Students"
        })
      });
      if (!res.ok) throw new Error("Failed to upload");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  if (isLoading) {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
      </div>
    );
  }

  if (error) {
    return <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl">Error loading materials.</div>;
  }

  const getIcon = (type: string) => {
    switch(type) {
      case "PDF": return <FileText className="w-8 h-8 text-rose-500" />;
      case "Video": return <PlaySquare className="w-8 h-8 text-indigo-500" />;
      case "PPT": return <FileSpreadsheet className="w-8 h-8 text-amber-500" />;
      case "Worksheet": return <FileCheck2 className="w-8 h-8 text-emerald-500" />;
      default: return <FileText className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Class Materials</h3>
          <p className="text-sm text-slate-500">{materials?.length || 0} files uploaded</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="hidden sm:flex text-indigo-600 border-indigo-200">
              <Sparkles className="w-4 h-4 mr-2" /> AI Generate Test
           </Button>
           <Button onClick={() => uploadMutation.mutate()} className="bg-indigo-600 hover:bg-indigo-700">
             <Upload className="w-4 h-4 mr-2" /> Upload
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials?.length === 0 ? (
          <div className="col-span-full text-center p-8 bg-white rounded-xl border border-slate-200 text-slate-500">
            No materials found. Upload syllabus, past papers or worksheets here.
          </div>
        ) : (
          materials?.map((mat) => (
            <div key={mat.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group relative flex flex-col justify-between">
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  {getIcon(mat.type)}
                </div>
                {mat.visibility === "Teacher Only" && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-medium">
                    <ShieldAlert className="w-3 h-3 mr-1" /> Private
                  </Badge>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 line-clamp-1">{mat.title}</h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <span className="font-medium">{mat.type}</span>
                  <span>•</span>
                  <span>{format(parseISO(mat.uploadedAt), "MMM d, yyyy")}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal">
                  {mat.attachedTo === "Lesson" ? "Lesson Resource" : "General"}
                </Badge>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:bg-indigo-50">
                      <Sparkles className="w-4 h-4" />
                   </Button>
                   <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(mat.id)} className="h-8 w-8 text-rose-600 hover:bg-rose-50">
                     <Trash2 className="w-4 h-4" />
                   </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
