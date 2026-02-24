import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calculator, FlaskConical, Globe, Activity, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentCoursesPage() {
  const store = getStore();
  const studentId = "student1"; // Mock authenticated user
  
  // 1. Find all classes the student is enrolled in
  const myClasses = store.classSections.filter((c) => c.studentIds.includes(studentId));
  
  // 2. Extract unique subject IDs from those classes
  const mySubjectIds = Array.from(new Set(myClasses.flatMap(c => c.subjectIds)));
  
  // 3. Get the actual subject objects
  const enrolledSubjects = store.subjects.filter(s => mySubjectIds.includes(s.id));

  const getSubjectIcon = (name: string, className: string) => {
    const n = name.toLowerCase();
    if (n.includes("math")) return <Calculator className={className} />;
    if (n.includes("sci") || n.includes("phy") || n.includes("chem")) return <FlaskConical className={className} />;
    if (n.includes("eng") || n.includes("lit")) return <BookOpen className={className} />;
    if (n.includes("hist") || n.includes("geo") || n.includes("social")) return <Globe className={className} />;
    return <Activity className={className} />;
  };

  const getGradient = (index: number) => {
    const gradients = [
      "from-rose-500 to-orange-400",
      "from-blue-500 to-cyan-400",
      "from-emerald-500 to-teal-400",
      "from-violet-500 to-fuchsia-400",
      "from-amber-500 to-yellow-400"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Courses</h1>
          <p className="mt-1 text-sm text-slate-500">Pick up where you left off</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrolledSubjects.length === 0 ? (
          <div className="col-span-full p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
             <div className="mx-auto w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-4">
               <BookOpen className="h-6 w-6 text-slate-400" />
             </div>
             <h3 className="text-lg font-medium tracking-tight text-slate-900 mb-1">No courses found</h3>
             <p className="text-sm text-slate-500">You are not enrolled in any upcoming subjects.</p>
          </div>
        ) : (
          enrolledSubjects.map((subj, index) => {
             // Calculate a mock progress percentage based on completed lessons in syllabus for this subject
             // Real app would fetch specific progress tied to the student
             const chapters = store.chapters.filter((c) => c.subjectId === subj.id);
             const totalLessons = store.lessons.filter(l => chapters.some(c => c.id === l.chapterId)).length;
             // Let's just mock a random progression for visual effect, e.g. 30-80%
             const progress = Math.floor(Math.random() * 50) + 30;
             const isMath = subj.name.toLowerCase().includes("math");

             return (
               <Card key={subj.id} className="group overflow-hidden border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col h-full bg-white relative">
                 <div className={`h-24 md:h-32 w-full bg-gradient-to-r ${getGradient(index)} relative overflow-hidden p-6`}>
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
                       {getSubjectIcon(subj.name, "w-40 h-40 transform rotate-12")}
                    </div>
                    <Badge variant="secondary" className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                       Grade {subj.grade} • {subj.board}
                    </Badge>
                 </div>
                 
                 <div className="px-6 relative flex-grow flex flex-col">
                    <div className="-mt-8 mb-4 w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center border border-slate-100 z-10 transition-transform group-hover:-translate-y-1">
                       {getSubjectIcon(subj.name, "w-8 h-8 text-slate-700")}
                    </div>
                    
                    <CardTitle className="text-xl mb-1">{subj.name}</CardTitle>
                    <CardDescription className="mb-6 flex items-center gap-1.5 line-clamp-1">
                      {chapters.length} Modules • {totalLessons} Lessons
                    </CardDescription>

                    <div className="mt-auto pt-4 pb-6 border-t border-slate-100 space-y-3">
                       <div className="flex justify-between text-sm font-medium">
                         <span className="text-slate-600">Course Progress</span>
                         <span className="text-slate-900">{progress}%</span>
                       </div>
                       <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div className={`h-2.5 rounded-full bg-gradient-to-r ${getGradient(index)}`} style={{ width: `${progress}%` }}></div>
                       </div>
                       
                       <div className="flex justify-between items-center mt-6">
                           <div className="text-sm">
                             {isMath ? <span className="text-rose-600 font-medium">1 Assignment Due</span> : <span className="text-slate-500">Up to date</span>}
                           </div>
                           <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700 font-semibold group-hover:scale-105 transition-transform shadow-sm">
                             <Link href={`/student/courses/${subj.id}`}>
                               Enter <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                             </Link>
                           </Button>
                       </div>
                    </div>
                 </div>
               </Card>
             );
          })
        )}
      </div>
    </div>
  );
}
