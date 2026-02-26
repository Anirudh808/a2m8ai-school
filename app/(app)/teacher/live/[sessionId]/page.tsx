"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, 
  MessageSquare, Users, Hand, Settings, MoreVertical, 
  LayoutDashboard, PenTool, ChevronLeft, ChevronRight,
  Sparkles, Image as ImageIcon, FileText, BookOpen, Maximize, Minimize
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function TeacherLiveSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const store = getStore();

  const [loading, setLoading] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [activeTab, setActiveTab] = useState<"video" | "lesson" | "whiteboard">("lesson");
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Content selection
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");

  // Carousel indices
  const [exampleIndex, setExampleIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate slight loading to ensure realistic UX
    const timer = setTimeout(() => {
       const sched = store.schedules.find(s => s.id === sessionId.replace('mock-session-', ''));
       if (sched) {
          setSelectedSubjectId(sched.subjectId);
          // Auto-select a chapter/lesson for demo purposes
          const subjectChapters = store.chapters.filter(c => c.subjectId === sched.subjectId);
          if (subjectChapters.length > 0) {
             const chId = subjectChapters[0].id;
             setSelectedChapterId(chId);
             const chLessons = store.lessons.filter(l => l.chapterId === chId);
             if (chLessons.length > 0) setSelectedLessonId(chLessons[0].id);
          }
       }
       setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [sessionId, store.schedules, store.chapters, store.lessons]);

  // Reset indices when lesson changes
  useEffect(() => {
    setExampleIndex(0);
    setImageIndex(0);
  }, [selectedLessonId]);

  const endCall = () => {
    router.push("/teacher/live");
  };

  const navLesson = (dir: 1 | -1) => {
    const chLessons = store.lessons.filter(l => l.chapterId === selectedChapterId).sort((a,b) => (a.order||0) - (b.order||0));
    const idx = chLessons.findIndex(l => l.id === selectedLessonId);
    if (idx !== -1 && chLessons[idx + dir]) {
       setSelectedLessonId(chLessons[idx + dir].id);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>;

  const currentSubject = store.subjects.find(s => s.id === selectedSubjectId);
  const subjectChapters = store.chapters.filter(c => c.subjectId === selectedSubjectId);
  const chapterLessons = store.lessons.filter(l => l.chapterId === selectedChapterId).sort((a,b) => (a.order||0) - (b.order||0));
  const activeLesson = store.lessons.find(l => l.id === selectedLessonId);

  // Parse blocks or provide static fallbacks if empty
  let explanationBlocks = activeLesson?.contentBlocks?.filter(b => b.type === "EXPLANATION") || [];
  let exampleBlocks = activeLesson?.contentBlocks?.filter(b => b.type === "EXAMPLE") || [];
  let imageBlocks = activeLesson?.contentBlocks?.filter(b => b.type === "IMAGE") || [];

  // Provide convincing static fallback content if the store hasn't seeded new data
  if (explanationBlocks.length === 0 || (explanationBlocks.length === 1 && typeof (explanationBlocks[0].data as any).text === 'string' && (explanationBlocks[0].data as any).text.length < 150)) {
     explanationBlocks = [
       { id: "e1", type: "EXPLANATION", data: { text: "Integers are a set of numbers that include all the whole numbers (0, 1, 2, 3...) and their negative counterparts (-1, -2, -3...). Unlike fractions or decimals, integers represent complete, whole units." } },
       { id: "e2", type: "EXPLANATION", data: { text: "Think of them as steps on a staircase: you can go up (positive), down (negative), or stand on the landing (zero). They are fundamental to algebra and help us describe real-world concepts like temperature, elevation, and financial debt." } }
     ];
  }
  
  if (exampleBlocks.length <= 1) {
     exampleBlocks = [
       { id: "ex1", type: "EXAMPLE", data: { text: "Real World Example 1: Temperature\n\nIf the temperature is 5 degrees above zero, we write it as +5°C. If it drops to 3 degrees below zero, it's represented as an integer: -3°C." } },
       { id: "ex2", type: "EXAMPLE", data: { text: "Real World Example 2: Finance\n\nDepositing $100 into a bank account represents a positive integer (+100). Withdrawing $50 represents a negative integer (-50)." } },
       { id: "ex3", type: "EXAMPLE", data: { text: "Real World Example 3: Elevation\n\nSea level is represented by the integer 0. A mountain peak might be at +3000 meters, while a submarine sits at -500 meters." } }
     ];
  }

  if (imageBlocks.length <= 1) {
     imageBlocks = [
       { id: "img1", type: "IMAGE", data: { url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80", alt: "Classroom chalkboard with math" } },
       { id: "img2", type: "IMAGE", data: { url: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80", alt: "Financial math visualization" } },
       { id: "img3", type: "IMAGE", data: { url: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80", alt: "Thermometer showing below zero" } }
     ];
  }

  const isFirstLesson = chapterLessons[0]?.id === selectedLessonId;
  const isLastLesson = chapterLessons[chapterLessons.length - 1]?.id === selectedLessonId;

  return (
    <div ref={containerRef} className="flex flex-col h-screen bg-slate-100 text-slate-900 overflow-hidden font-sans">
      
      {/* Top Bar - Video Conferencing Controls */}
      <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0 select-none shadow-sm z-20">
         <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
               <Video className="h-4 w-4 text-white" />
            </div>
            <div>
               <h1 className="text-sm font-semibold text-slate-800">Live Class: {currentSubject?.name || 'Loading...'}</h1>
               <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium tracking-wide">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                 00:15:24
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
             <Button variant="outline" size="icon" onClick={toggleFullscreen} className="rounded-full h-10 w-10 text-slate-500 hover:bg-slate-100" title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
               {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
             </Button>
             <div className="w-px h-6 bg-slate-200 mx-1"></div>
             <Button variant="outline" size="icon" onClick={() => setMicOn(!micOn)} className={`rounded-full h-10 w-10 ${micOn ? 'bg-white text-slate-700 hover:bg-slate-100' : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'}`}>
                  {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
               </Button>
               <Button variant="outline" size="icon" onClick={() => setCamOn(!camOn)} className={`rounded-full h-10 w-10 ${camOn ? 'bg-white text-slate-700 hover:bg-slate-100' : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'}`}>
                  {camOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
               </Button>
               <div className="w-px h-6 bg-slate-200 mx-1"></div>
               <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700">
                  <MonitorUp className="h-4 w-4" />
               </Button>
               <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-white text-slate-600 hover:bg-slate-100">
                  <Settings className="h-4 w-4" />
               </Button>
               <Button onClick={endCall} className="rounded-full px-6 h-10 bg-rose-600 hover:bg-rose-700 text-white font-medium ml-2 shadow-md shadow-rose-200">
                  <PhoneOff className="h-4 w-4 mr-2" /> End Class
               </Button>
           </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
         
         {/* Left Sidebar - Views */}
         <div className="w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 gap-6 shrink-0 z-10 shadow-sm">
              <button onClick={()=>setActiveTab("lesson")} className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'lesson' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}>
                 <BookOpen className="h-5 w-5" />
                 <span className="text-[10px] font-medium">Lesson</span>
              </button>
              <button onClick={()=>setActiveTab("whiteboard")} className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'whiteboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}>
                 <PenTool className="h-5 w-5" />
                 <span className="text-[10px] font-medium">Board</span>
              </button>
              <div className="w-8 h-px bg-slate-200"></div>
              <button className="p-3 rounded-xl flex flex-col items-center gap-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 relative">
                 <Users className="h-5 w-5" />
                 <span className="text-[10px] font-medium">People</span>
                 <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></div>
              </button>
              <button className="p-3 rounded-xl flex flex-col items-center gap-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                 <MessageSquare className="h-5 w-5" />
                 <span className="text-[10px] font-medium">Chat</span>
              </button>
              <button className="p-3 rounded-xl flex flex-col items-center gap-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                 <Hand className="h-5 w-5" />
                 <span className="text-[10px] font-medium">Polls</span>
              </button>
         </div>

         {/* Center Workspace */}
         <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative">
            
            {activeTab === "lesson" && (
               <div className="flex-1 flex flex-col space-y-4 p-6">
                  {/* Topic Selector & Nav */}
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shrink-0 shadow-sm">
                     <div className="flex items-center gap-4">
                        <Select value={selectedChapterId} onValueChange={setSelectedChapterId}>
                           <SelectTrigger className="w-[200px] h-9 bg-white border-slate-200 text-slate-800 focus:ring-indigo-500/20">
                              <SelectValue placeholder="Select Chapter" />
                           </SelectTrigger>
                           <SelectContent className="bg-white border-slate-200">
                              {subjectChapters.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                           </SelectContent>
                        </Select>
                        <Select value={selectedLessonId} onValueChange={setSelectedLessonId}>
                           <SelectTrigger className="w-[250px] h-9 bg-white border-slate-200 text-slate-800 focus:ring-indigo-500/20">
                              <SelectValue placeholder="Select Lesson" />
                           </SelectTrigger>
                           <SelectContent className="bg-white border-slate-200">
                              {chapterLessons.map(l => <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>)}
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={()=>navLesson(-1)} disabled={isFirstLesson} className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50">
                           <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                        </Button>
                        <Button variant="outline" size="sm" onClick={()=>navLesson(1)} disabled={isLastLesson} className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50">
                           Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                     </div>
                  </div>

                  {/* 2-Column Layout for Content */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 overflow-hidden">
                     
                     {/* Left Column (Explanation - spans full height) */}
                     <Card className="bg-white border-slate-200 flex flex-col overflow-hidden text-slate-800 shadow-sm h-full max-h-full">
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                           <div className="flex items-center gap-2 font-semibold text-indigo-700">
                             <FileText className="h-4 w-4" /> Explanation
                           </div>
                           <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-slate-100" title="Regenerate with AI">
                             <Sparkles className="h-3.5 w-3.5" />
                           </Button>
                        </div>
                        <div className="p-6 overflow-y-auto text-sm leading-relaxed prose prose-slate max-w-none flex-1">
                           {explanationBlocks.length > 0 ? (
                              explanationBlocks.map((b, i) => (
                                <p key={i} className="mb-4">{(b.data as any).text}</p>
                              ))
                           ) : (
                              <p className="text-slate-400 italic">No explanation content generated yet.</p>
                           )}
                        </div>
                     </Card>

                     {/* Right Column (Stacked Example and Image) */}
                     <div className="flex flex-col gap-4 min-h-0 h-full max-h-full">
                       
                       {/* Example / Math Carousel */}
                       <Card className="flex-1 bg-white border-slate-200 flex flex-col overflow-hidden text-slate-800 shadow-sm min-h-0 h-1/2">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                             <div className="flex items-center gap-2 font-semibold text-emerald-700">
                               <LayoutDashboard className="h-4 w-4" /> Solved Examples
                             </div>
                             <div className="flex items-center gap-1">
                               {exampleBlocks.length > 1 && (
                                 <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden mr-2">
                                  <button onClick={() => setExampleIndex(Math.max(0, exampleIndex - 1))} disabled={exampleIndex === 0} className="px-1.5 py-1 hover:bg-slate-50 disabled:opacity-50">
                                    <ChevronLeft className="h-3 w-3" />
                                  </button>
                                  <span className="text-[10px] font-medium px-2 text-slate-600">{exampleIndex + 1} / {exampleBlocks.length}</span>
                                  <button onClick={() => setExampleIndex(Math.min(exampleBlocks.length - 1, exampleIndex + 1))} disabled={exampleIndex === exampleBlocks.length - 1} className="px-1.5 py-1 hover:bg-slate-50 disabled:opacity-50 border-l border-slate-200">
                                    <ChevronRight className="h-3 w-3" />
                                  </button>
                                 </div>
                               )}
                               <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-emerald-600 hover:bg-slate-100" title="Regenerate with AI">
                                 <Sparkles className="h-3.5 w-3.5" />
                               </Button>
                             </div>
                          </div>
                          <div className="p-5 overflow-y-auto text-sm leading-relaxed font-mono bg-slate-50/50 flex-1">
                             {exampleBlocks.length > 0 ? (
                                <div className="p-3 bg-white border border-slate-200 rounded-md shadow-sm">
                                  {(exampleBlocks[exampleIndex].data as any).text}
                                </div>
                             ) : (
                                <p className="text-slate-400 italic font-sans text-center mt-4">No examples provided.</p>
                             )}
                          </div>
                       </Card>

                       {/* Image / Visuals Carousel */}
                       <Card className="flex-1 bg-white border-slate-200 flex flex-col overflow-hidden text-slate-800 shadow-sm min-h-0 h-1/2">
                          <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                             <div className="flex items-center gap-2 font-semibold text-amber-600">
                               <ImageIcon className="h-4 w-4" /> Visual Aids
                             </div>
                             <div className="flex items-center gap-1">
                               {imageBlocks.length > 1 && (
                                 <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden mr-2">
                                  <button onClick={() => setImageIndex(Math.max(0, imageIndex - 1))} disabled={imageIndex === 0} className="px-1.5 py-1 hover:bg-slate-50 disabled:opacity-50">
                                    <ChevronLeft className="h-3 w-3" />
                                  </button>
                                  <span className="text-[10px] font-medium px-2 text-slate-600">{imageIndex + 1} / {imageBlocks.length}</span>
                                  <button onClick={() => setImageIndex(Math.min(imageBlocks.length - 1, imageIndex + 1))} disabled={imageIndex === imageBlocks.length - 1} className="px-1.5 py-1 hover:bg-slate-50 disabled:opacity-50 border-l border-slate-200">
                                    <ChevronRight className="h-3 w-3" />
                                  </button>
                                 </div>
                               )}
                               <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-amber-600 hover:bg-slate-100" title="Regenerate with AI">
                                 <Sparkles className="h-3.5 w-3.5" />
                               </Button>
                             </div>
                          </div>
                          <div className="p-4 overflow-hidden flex items-center justify-center flex-1 bg-slate-100/50 relative">
                             {imageBlocks.length > 0 ? (
                                <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-lg shadow-sm border border-slate-200 object-contain mx-auto overflow-hidden relative">
                                  <Image 
                                    src={(imageBlocks[imageIndex].data as any).url} 
                                    alt={(imageBlocks[imageIndex].data as any).alt} 
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                             ) : (
                                <div className="text-center mt-4">
                                   <ImageIcon className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                                   <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">No Visuals</p>
                                </div>
                             )}
                          </div>
                       </Card>

                     </div>
                  </div>
               </div>
            )}

            {activeTab === "whiteboard" && (
               <div className="flex-1 flex flex-col relative bg-white m-6 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 z-10 border border-slate-200 shadow-lg">
                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-100 text-slate-800"><PenTool className="h-4 w-4" /></Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100"><div className="w-4 h-4 rounded-sm border-2 border-current"></div></Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100"><div className="w-4 h-4 rounded-full border-2 border-current"></div></Button>
                     <div className="w-px h-5 bg-slate-200 mx-1"></div>
                     <div className="flex gap-1.5 p-1 rounded-full bg-slate-50 border border-slate-100">
                        <button className="w-5 h-5 rounded-full bg-slate-800 border-2 border-white ring-1 ring-slate-200 shadow-sm"></button>
                        <button className="w-5 h-5 rounded-full bg-red-500 hover:scale-110 transition-transform"></button>
                        <button className="w-5 h-5 rounded-full bg-blue-500 hover:scale-110 transition-transform"></button>
                        <button className="w-5 h-5 rounded-full bg-green-500 hover:scale-110 transition-transform"></button>
                     </div>
                  </div>
                  {/* Fake Canvas */}
                  <div className="flex-1 w-full h-full cursor-crosshair relative" style={{ backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                     {/* Decorate with some fake chalk/marker lines just for the mock */}
                     <svg className="w-full h-full opacity-80 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 200 200 Q 250 150 400 250 T 600 200" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                        <text x="450" y="270" fill="#2563eb" fontSize="24" fontFamily="monospace" fontWeight="bold">x = y + 2</text>
                     </svg>
                  </div>
               </div>
            )}
            
         </div>

         {/* Right Sidebar - Video Participants */}
         <div className="w-64 bg-white border-l border-slate-200 p-4 overflow-y-auto hidden lg:block shrink-0 shadow-sm">
              {/* Teacher Self View */}
              <div className="relative rounded-xl bg-slate-100 border border-slate-200 aspect-video mb-4 overflow-hidden group shadow-sm">
                 {camOn ? (
                   <div className="w-full h-full bg-slate-200 flex items-center justify-center relative">
                      {/* Placeholder for video feed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                      <Users className="h-8 w-8 text-slate-400 drop-shadow-sm" />
                      <div className="absolute bottom-2 left-2 text-xs font-medium text-white shadow-sm flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> You
                      </div>
                   </div>
                 ) : (
                   <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-sm mb-2 shadow-inner">T</div>
                      <div className="absolute bottom-2 left-2 text-xs font-medium text-slate-600 bg-white/80 px-2 py-0.5 rounded shadow-sm">You</div>
                   </div>
                 )}
              </div>

              <div className="flex items-center justify-between mb-3 mt-6">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Students (3)</h3>
              </div>
              
              <div className="space-y-3">
                 {[
                   { name: "Rahul Verma", mic: false, cam: true },
                   { name: "Priya Patel", mic: true, cam: false },
                   { name: "Arjun Kumar", mic: false, cam: false }
                 ].map((student, i) => (
                   <div key={i} className="relative rounded-lg bg-slate-100 border border-slate-200 aspect-video overflow-hidden shadow-sm">
                      {student.cam ? (
                        <div className="w-full h-full bg-slate-200"></div>
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                           <div className="h-10 w-10 text-lg rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium shadow-inner">{student.name.charAt(0)}</div>
                        </div>
                      )}
                      <div className="absolute bottom-1.5 left-1.5 text-[10px] font-medium text-slate-900 bg-white/80 px-1.5 py-0.5 rounded backdrop-blur-sm max-w-[80%] truncate shadow-sm">
                        {student.name}
                      </div>
                      <div className="absolute top-1.5 right-1.5 bg-white/80 rounded p-1 backdrop-blur-sm shadow-sm">
                         {!student.mic ? <MicOff className="h-3 w-3 text-rose-500" /> : <Mic className="h-3 w-3 text-emerald-600" />}
                      </div>
                   </div>
                 ))}
              </div>
         </div>

      </div>
    </div>
  );
}
