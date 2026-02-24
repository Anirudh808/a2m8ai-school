import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  try {
    const store = getStore();
    const { classSectionId, subjectId } = await params;

    // 1. Attendance Summary
    const classAttendance = store.attendanceSessions.filter(a => a.classSectionId === classSectionId);
    // Just mock the trend based on the data or use static. Here we will calculate real average if available
    let percentage = 85;
    if (classAttendance.length > 0) {
      const classSec = store.classSections.find(c => c.id === classSectionId);
      const totalStudents = classSec?.studentIds.length || 1;
      const recentSessions = classAttendance.slice(0, 14);
      const totalPresents = recentSessions.reduce((acc, curr) => acc + curr.presentStudentIds.length, 0);
      percentage = Math.round((totalPresents / (recentSessions.length * totalStudents)) * 100) || 0;
    }

    const attendance = {
      percentage,
      trend: percentage >= 80 ? "up" : "down" as const,
      last14Days: Array.from({ length: 14 }).map((_, i) => {
         const session = classAttendance[i];
         return {
           day: `Day ${i + 1}`,
           present: session ? session.presentStudentIds.length : Math.floor(Math.random() * 5) + 20,
         };
      }),
    };

    // 2. Homework Pipeline
    let pending = 0;
    let reviewed = 0;
    let late = 0;

    store.submissions.forEach((sub) => {
      const assignment = store.assignments.find((a) => a.id === sub.assignmentId);
      if (assignment?.classSectionId === classSectionId && assignment?.subjectId === subjectId) {
        if (sub.status === "SUBMITTED") pending++;
        if (sub.status === "GRADED") reviewed++;
        if (sub.status === "LATE") late++;
      }
    });

    const pipeline = { pending, reviewed, late };

    // 3. Weak Concepts (Mock AI Insight)
    // Derive from quiz scores if we had detailed ones. For now, keep mocked.
    const weakConcepts = [
      { concept: "Adding Negative Integers", score: 65, trend: "down" },
      { concept: "Word Problems", score: 72, trend: "flat" },
    ];

    // 4. At-Risk Students
    const mockStudentNames = ["Rahul Verma", "Priya Patel", "Arjun Kumar"];
    const atRiskStudents = [
      { id: "student1", name: mockStudentNames[0], reason: "Missed last 3 assignments", severity: "high" },
      { id: "student2", name: mockStudentNames[1], reason: "Score dropped 15% this week", severity: "medium" },
    ];

    // 5. Today's Plan
    // Find a schedule for today or the most upcoming
    const todayStr = new Date().toISOString().slice(0, 10);
    const relatedSchedules = store.schedules
      .filter(s => s.classSectionId === classSectionId && s.subjectId === subjectId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let targetSchedule = relatedSchedules.find(s => s.date === todayStr);
    if (!targetSchedule) {
      targetSchedule = relatedSchedules.find(s => s.date > todayStr) || relatedSchedules[relatedSchedules.length - 1];
    }

    const todayPlan = targetSchedule ? {
      lessonTitle: targetSchedule.topic,
      lessonId: targetSchedule.lessonId || "none",
      time: `${targetSchedule.startTime} - ${targetSchedule.endTime}`,
      type: targetSchedule.type,
      status: targetSchedule.status.toLowerCase()
    } : {
      lessonTitle: "No class scheduled",
      lessonId: "",
      time: "-",
      type: "-",
      status: "none"
    };

    return NextResponse.json({
      attendance,
      pipeline,
      weakConcepts,
      atRiskStudents,
      todayPlan,
    });
  } catch (error) {
    console.error("Failed to fetch overview tab data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
