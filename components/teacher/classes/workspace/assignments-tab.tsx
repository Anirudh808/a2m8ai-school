"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Plus, Bot, Sparkles, Filter, CalendarIcon, Users, FileCheck, Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { Assignment } from "@/lib/types";

type AssignmentWithStats = Assignment & { stats: { pending: number; submitted: number; graded: number; late: number; } };

export function AssignmentsTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const queryClient = useQueryClient();
  const [filterType, setFilterType] = useState<string>("All");
  const [manualDialogOpen, setManualDialogOpen] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);

  const { data: assignments, isLoading } = useQuery<AssignmentWithStats[]>({
    queryKey: ["teacher-assignments", classSectionId, subjectId],
    queryFn: async () => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/assignments`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });

  const createManualMutation = useMutation({
    mutationFn: async (data: Partial<Assignment>) => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/assignments`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-assignments"] });
      setManualDialogOpen(false);
    }
  });

  const createAiMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/classes/${classSectionId}/${subjectId}/assignments/ai-generate`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-assignments"] });
      setAiDialogOpen(false);
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4 py-4">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  const filtered = assignments?.filter(a => filterType === "All" || a.type === filterType) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <Select value={filterType} onValueChange={setFilterType}>
             <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter type" />
             </SelectTrigger>
             <SelectContent>
                <SelectItem value="All">All Assignments</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="AI Generated">AI Generated</SelectItem>
             </SelectContent>
          </Select>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-medium">
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
             </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
             <DropdownMenuItem onClick={() => setManualDialogOpen(true)} className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2 text-slate-500" />
                <span>Manual Entry</span>
             </DropdownMenuItem>
             <DropdownMenuItem onClick={() => setAiDialogOpen(true)} className="cursor-pointer text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="font-medium">AI Generate</span>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filtered.length === 0 ? (
           <div className="col-span-full p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
             <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
               <FileText className="h-6 w-6 text-slate-400" />
             </div>
             <h3 className="text-lg font-medium tracking-tight text-slate-900 mb-1">No assignments found</h3>
             <p className="text-sm text-slate-500">Create a new assignment to see it here.</p>
           </div>
         ) : (
           filtered.map(assignment => (
             <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
                <div className="p-5 flex-grow">
                   <div className="flex justify-between items-start mb-3">
                     <Badge variant={assignment.type === 'AI Generated' ? 'secondary' : 'outline'} className={assignment.type === 'AI Generated' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 capitalize' : 'text-slate-500 capitalize'}>
                       {assignment.type === 'AI Generated' && <Sparkles className="w-3 h-3 mr-1 inline" />}
                       {assignment.format || assignment.type || "Manual"}
                     </Badge>
                   </div>
                   <h3 className="text-lg font-semibold text-slate-900 line-clamp-1 mb-1">{assignment.title}</h3>
                   <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{assignment.description || "No description provided."}</p>
                   
                   <div className="flex items-center gap-2 text-sm text-slate-600 font-medium mb-4">
                     <CalendarIcon className="h-4 w-4 text-slate-400" />
                     Due: {format(parseISO(assignment.dueDate), "MMM d, yyyy")}
                   </div>
                </div>
                
                <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 grid grid-cols-3 gap-2 text-center mt-auto">
                   <div className="flex flex-col items-center">
                     <span className="text-sm font-semibold text-slate-900">{assignment.stats.submitted + assignment.stats.graded + assignment.stats.late}</span>
                     <span className="text-xs text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" /> In</span>
                   </div>
                   <div className="flex flex-col items-center border-l border-slate-200">
                     <span className="text-sm font-semibold text-amber-600">{assignment.stats.pending}</span>
                     <span className="text-xs text-slate-500">To Grade</span>
                   </div>
                   <div className="flex flex-col items-center border-l border-slate-200">
                     <span className="text-sm font-semibold text-emerald-600">{assignment.stats.graded}</span>
                     <span className="text-xs text-slate-500 flex items-center gap-1"><FileCheck className="w-3 h-3" /> Graded</span>
                   </div>
                </div>
             </div>
           ))
         )}
      </div>

      <CreateManualDialog 
        open={manualDialogOpen} 
        onOpenChange={setManualDialogOpen} 
        onSubmit={(data) => createManualMutation.mutate(data)}
        isPending={createManualMutation.isPending}
      />
      
      <CreateAiDialog 
        open={aiDialogOpen} 
        onOpenChange={setAiDialogOpen} 
        onSubmit={(data) => createAiMutation.mutate(data)}
        isPending={createAiMutation.isPending}
        subjectId={subjectId}
      />
    </div>
  );
}

function CreateManualDialog({ open, onOpenChange, onSubmit, isPending }: { open: boolean, onOpenChange: (o: boolean) => void, onSubmit: (v: any) => void, isPending: boolean }) {
  const [formData, setFormData] = useState({ title: "", description: "", dueDate: "", format: "Objective" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Manual Assignment</DialogTitle>
            <DialogDescription>Add a new assignment manually for your class.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" required value={formData.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Chapter 4 Exercises" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Instructions</Label>
              <Textarea id="description" value={formData.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})} placeholder="Enter instructions..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="grid gap-2">
                 <Label htmlFor="dueDate">Due Date</Label>
                 <Input id="dueDate" type="date" required value={formData.dueDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, dueDate: e.target.value})} />
               </div>
               <div className="grid gap-2">
                 <Label>Format</Label>
                 <Select value={formData.format} onValueChange={v => setFormData({...formData, format: v})}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Objective">Objective</SelectItem>
                     <SelectItem value="Subjective">Subjective</SelectItem>
                     <SelectItem value="Project">Project</SelectItem>
                     <SelectItem value="Worksheet">Worksheet</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateAiDialog({ open, onOpenChange, onSubmit, isPending, subjectId }: { open: boolean, onOpenChange: (o: boolean) => void, onSubmit: (v: any) => void, isPending: boolean, subjectId: string }) {
  const [formData, setFormData] = useState({ chapterId: "", lessonId: "", format: "Worksheet", difficulty: "Medium" });
  const [step, setStep] = useState<"config" | "preview">("config");
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const { data: chaptersData } = useQuery<{ chapters: any[] }>({
    queryKey: ["chapters", subjectId],
    queryFn: async () => {
      const res = await fetch(`/api/chapters?subjectId=${subjectId}`);
      if (!res.ok) return { chapters: [] };
      return res.json();
    }
  });

  const { data: lessonsData } = useQuery<{ lessons: any[] }>({
    queryKey: ["lessons", formData.chapterId],
    queryFn: async () => {
      if (!formData.chapterId) return { lessons: [] };
      const res = await fetch(`/api/lessons?chapterId=${formData.chapterId}`);
      if (!res.ok) return { lessons: [] };
      return res.json();
    },
    enabled: !!formData.chapterId
  });

  const handleGeneratePreview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewLoading(true);
    
    // Call the API with action=preview to get the mock questions
    try {
      const res = await fetch(`/api/classes/dummy/dummy/assignments/ai-generate`, {
        method: "POST",
        body: JSON.stringify({ action: "preview", ...formData })
      });
      const data = await res.json();
      if (data.questions) {
        setGeneratedQuestions(data.questions);
        setSelectedIndices(new Set(data.questions.map((_: any, i: number) => i)));
        setStep("preview");
      }
    } catch (error) {
       console.error("Failed to generate preview", error);
    } finally {
       setIsPreviewLoading(false);
    }
  };

  const handleFinalSubmit = () => {
    const selectedText = Array.from(selectedIndices)
      .sort((a, b) => a - b)
      .map((i) => `Q${i + 1}. ${generatedQuestions[i]}`)
      .join("\n\n");

    onSubmit({
      title: `AI ${formData.difficulty} ${formData.format}`,
      action: "submit",
      description: selectedText,
      ...formData
    });
    
    // Reset state after submitting
    setTimeout(() => {
       setStep("config");
       setFormData({ chapterId: "", lessonId: "", format: "Worksheet", difficulty: "Medium" });
       setGeneratedQuestions([]);
    }, 500);
  };

  const toggleQuestion = (index: number) => {
    const newSet = new Set(selectedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedIndices(newSet);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-indigo-100">
        <form>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-indigo-900 border-b border-indigo-50 pb-4">
               <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                 <Bot className="h-5 w-5" />
               </div>
               {step === "config" ? "Generate with AI Co-Teacher" : "Preview Assignment"}
            </DialogTitle>
            <DialogDescription className="pt-2">
              {step === "config" 
                ? "Select a chapter and lesson, and our AI will instantly generate an appropriate assignment or worksheet." 
                : "Select the questions you want to include in this assignment."}
            </DialogDescription>
          </DialogHeader>
          {step === "config" ? (
             <div className="grid gap-5 py-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                   <Label className="font-semibold text-slate-700">Chapter</Label>
                   <Select value={formData.chapterId} onValueChange={v => setFormData({...formData, chapterId: v, lessonId: ""})}>
                     <SelectTrigger>
                       <SelectValue placeholder="Select Chapter" />
                     </SelectTrigger>
                     <SelectContent>
                       {chaptersData?.chapters?.map(c => (
                         <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="grid gap-2">
                   <Label className="font-semibold text-slate-700">Lesson</Label>
                   <Select disabled={!formData.chapterId} value={formData.lessonId} onValueChange={v => setFormData({...formData, lessonId: v})}>
                     <SelectTrigger>
                       <SelectValue placeholder="Select Lesson" />
                     </SelectTrigger>
                     <SelectContent>
                       {lessonsData?.lessons?.map(l => (
                         <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="grid gap-2">
                    <Label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Format</Label>
                    <Select value={formData.format} onValueChange={v => setFormData({...formData, format: v})}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Worksheet">Practice Worksheet</SelectItem>
                        <SelectItem value="Objective">Multiple Choice Quiz</SelectItem>
                        <SelectItem value="Subjective">Short Answer Test</SelectItem>
                        <SelectItem value="Project">Differentiated Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Difficulty Level</Label>
                    <Select value={formData.difficulty} onValueChange={v => setFormData({...formData, difficulty: v})}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Medium">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced (HOTS)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>
             </div>
          ) : (
             <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto pr-2">
                {generatedQuestions.map((q, idx) => (
                  <label key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                     <Checkbox 
                       checked={selectedIndices.has(idx)}
                       onCheckedChange={() => toggleQuestion(idx)}
                       className="mt-1"
                     />
                     <div className="text-sm font-medium text-slate-800 leading-relaxed">
                        {q}
                     </div>
                  </label>
                ))}
             </div>
          )}
          {step === "config" ? (
            <DialogFooter className="border-t border-slate-100 pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPreviewLoading}>Cancel</Button>
              <Button type="button" onClick={handleGeneratePreview} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold" disabled={isPreviewLoading || !formData.chapterId || !formData.lessonId}>
                {isPreviewLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Preview Questions</>
                )}
              </Button>
            </DialogFooter>
          ) : (
            <DialogFooter className="border-t border-slate-100 pt-4 flex items-center justify-between sm:justify-between w-full">
               <div className="text-sm text-slate-500">
                 {selectedIndices.size} of {generatedQuestions.length} selected
               </div>
               <div className="flex items-center gap-2">
                 <Button type="button" variant="ghost" onClick={() => setStep("config")} disabled={isPending}>Back</Button>
                 <Button type="button" onClick={handleFinalSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold" disabled={isPending || selectedIndices.size === 0}>
                   {isPending ? (
                     <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                   ) : (
                     "Send Assignment"
                   )}
                 </Button>
               </div>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
