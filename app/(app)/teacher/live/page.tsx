"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Video, Plus, Clock, Users, MoreHorizontal } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay, parseISO, startOfDay } from "date-fns";

export default function TeacherLiveCalendarPage() {
  const router = useRouter();
  const store = getStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  // Data fetching logic (mocked)
  const teacherId = "teacher1";
  const myClassSections = store.classSections.filter(c => c.teacherIds.includes(teacherId));
  const myClassIds = myClassSections.map(c => c.id);
  
  // Get schedules for my classes
  const mySchedules = store.schedules.filter(s => myClassIds.includes(s.classSectionId));

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start
  const weekDays = Array.from({ length: 5 }).map((_, i) => addDays(weekStart, i)); // Mon - Fri
  const hours = Array.from({ length: 9 }).map((_, i) => i + 8); // 8 AM to 4 PM

  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const handleToday = () => setCurrentDate(new Date());

  const handleJoinClass = (schedule: any) => {
    router.push(`/teacher/live/mock-session-${schedule.id}`);
  };

  const getSchedulesForDayAndHour = (day: Date, hour: number) => {
    return mySchedules.filter(s => {
      const sDate = parseISO(s.date);
      if (!isSameDay(sDate, day)) return false;
      
      const sHour = parseInt(s.startTime.split(":")[0], 10);
      const syntheticHour = s.startTime === "10:00" ? (9 + (parseInt(s.id.split('_')[1] || "0") % 6)) : sHour;
      
      return syntheticHour === hour;
    });
  };

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const minutesSince8AM = (currentHour - 8) * 60 + currentMinute;
  const topPositionPixels = (minutesSince8AM / 60) * 80;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white shrink-0">
         <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-indigo-600" />
              Calendar
            </h1>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-1 hidden sm:flex">
               <Button variant="outline" size="sm" onClick={handleToday} className="px-3 h-8 text-sm font-medium">
                 Today
               </Button>
               <div className="flex items-center border border-slate-200 rounded-md overflow-hidden ml-2 h-8">
                  <button onClick={handlePrevWeek} className="px-2 h-full bg-white hover:bg-slate-50 border-r border-slate-200">
                     <ChevronLeft className="h-4 w-4 text-slate-600" />
                  </button>
                  <button onClick={handleNextWeek} className="px-2 h-full bg-white hover:bg-slate-50">
                     <ChevronRight className="h-4 w-4 text-slate-600" />
                  </button>
               </div>
               <span className="ml-4 text-sm font-medium text-slate-700">
                 {format(weekDays[0], "MMMM yyyy")}
               </span>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex text-slate-600">
               Work week <ChevronRight className="ml-1 h-3 w-3 rotate-90" />
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex text-slate-600">
               <Video className="mr-2 h-4 w-4" /> Meet now
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
               <Plus className="mr-2 h-4 w-4" /> New Class
            </Button>
         </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex flex-1 overflow-hidden">
         <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {/* Days Header */}
            <div className="flex border-b border-slate-200 bg-slate-50/50 sticky top-0 z-10">
               <div className="w-16 shrink-0 border-r border-slate-100"></div>
               {weekDays.map((day, i) => (
                 <div key={i} className={`flex-1 min-w-[120px] py-3 text-center border-r border-slate-100 relative ${isSameDay(day, now) ? 'bg-indigo-50/30' : ''}`}>
                    <div className="text-xs font-semibold uppercase text-slate-500">{format(day, "EEE")}</div>
                    <div className={`text-2xl mt-0.5 ${isSameDay(day, now) ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>
                      {format(day, "d")}
                      {isSameDay(day, now) && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600"></div>}
                    </div>
                 </div>
               ))}
            </div>

            {/* Time Grid */}
            <div className="flex relative bg-white pb-8">
               {/* Hours Column */}
               <div className="w-16 shrink-0 border-r border-slate-100 relative">
                 {hours.map((hour, i) => (
                   <div key={hour} className="h-[80px] relative">
                     <span className="absolute -top-3 right-2 text-xs font-medium text-slate-400">
                       {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                     </span>
                   </div>
                 ))}
               </div>

               {/* Day Columns */}
               <div className="flex-1 flex">
                 {weekDays.map((day, dIdx) => (
                   <div key={dIdx} className={`flex-1 min-w-[120px] border-r border-slate-100 relative ${isSameDay(day, now) ? 'bg-indigo-50/10' : ''}`}>
                     
                     {/* Local Time Red Line for Current Day */}
                     {isSameDay(day, now) && topPositionPixels >= 0 && topPositionPixels <= (hours.length * 80) && (
                        <div className="absolute left-0 right-0 border-t-2 border-rose-500 z-20 pointer-events-none" style={{ top: `${topPositionPixels}px` }}>
                           <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-rose-500"></div>
                        </div>
                     )}

                     {hours.map((hour, hIdx) => {
                        const cellSchedules = getSchedulesForDayAndHour(day, hour);
                        
                        return (
                         <div key={hour} className="h-[80px] border-b border-slate-100 relative p-1">
                           {cellSchedules.map((schedule, sIdx) => {
                             const classInfo = myClassSections.find(c => c.id === schedule.classSectionId);
                             const subjectInfo = store.subjects.find(s => s.id === schedule.subjectId);
                             const classEndDiffMinutes = (hour + 1) * 60; // 1 hr duration
                             const isPast = schedule.status === "Completed" || day < startOfDay(now) || (isSameDay(day, now) && classEndDiffMinutes <= (currentHour * 60 + currentMinute));
                             
                             return (
                               <div 
                                 key={schedule.id}
                                 onClick={() => handleJoinClass(schedule)}
                                 className={`
                                   group cursor-pointer rounded-md p-2 mb-1 shadow-sm border transition-all hover:shadow-md
                                   ${isPast 
                                     ? 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-100' 
                                     : 'bg-indigo-50 border-indigo-200 border-l-4 border-l-indigo-500 hover:bg-indigo-100'
                                   }
                                 `}
                                 style={{ 
                                   position: 'absolute',
                                   top: '4px',
                                   left: '4px',
                                   right: '4px',
                                   height: 'calc(100% - 8px)',
                                   zIndex: 5
                                 }}
                               >
                                  <div className="flex justify-between items-start">
                                     <div className="text-xs font-semibold text-slate-900 truncate">
                                        {subjectInfo?.name} - {classInfo?.grade}{classInfo?.sectionName}
                                     </div>
                                  </div>
                                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                                     {schedule.topic}
                                  </div>
                                  {!isPast && (
                                    <div className="absolute bottom-1.5 left-2 flex items-center text-[10px] font-medium text-indigo-600">
                                      <Video className="w-3 h-3 mr-1" />
                                      Join Class
                                    </div>
                                  )}
                                </div>
                             );
                           })}
                         </div>
                       )
                     })}
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
