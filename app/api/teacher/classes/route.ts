import { getStore } from "@/lib/store";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get("teacherId");

    if (!teacherId) {
      return NextResponse.json({ error: "Missing teacherId" }, { status: 400 });
    }

    const store = getStore();
    const myClasses = store.classSections.filter((cs) => cs.teacherIds.includes(teacherId));
    
    // Process and flatten data into ClassSubject objects
    const classSubjects = [];

    for (const cs of myClasses) {
      for (const subjectId of cs.subjectIds) {
        const subject = store.subjects.find((s) => s.id === subjectId);
        if (!subject) continue;

        // Calculate pending submissions for this class+subject
        let pendingCount = 0;
        store.submissions.forEach((sub) => {
          if (sub.status === "SUBMITTED") {
            const assignment = store.assignments.find((a) => a.id === sub.assignmentId);
            if (assignment?.classSectionId === cs.id && assignment?.subjectId === subjectId) {
              pendingCount++;
            }
          }
        });

        // Mock remaining stats based on seed data
        const nextClass = "Tue 10:30 AM";
        const atRiskCount = Math.floor(Math.random() * 4);
        const attendanceTrend = Math.random() > 0.5 ? "up" : "down";

        classSubjects.push({
          id: `${cs.id}-${subject.id}`, // canonical classSubjectId
          classSectionId: cs.id,
          grade: cs.grade,
          sectionName: cs.sectionName,
          subjectId: subject.id,
          subjectName: subject.name,
          board: subject.board,
          studentCount: cs.studentIds.length,
          metrics: {
            nextClass,
            pendingGradingCount: pendingCount,
            atRiskCount,
            attendanceTrend
          }
        });
      }
    }

    return NextResponse.json(classSubjects);
  } catch (error) {
    console.error("Failed to fetch teacher classes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
