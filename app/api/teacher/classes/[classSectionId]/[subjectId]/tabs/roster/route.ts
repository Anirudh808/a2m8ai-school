import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  try {
    const store = getStore();
    const resolvedParams = await params;
    const { classSectionId, subjectId } = resolvedParams;

    const classSection = store.classSections.find((c) => c.id === classSectionId);
    if (!classSection) {
      return NextResponse.json({ error: "Class Section not found" }, { status: 404 });
    }

    const roster = [];
    
    // For each student, find their info and calculate metrics
    for (const studentId of classSection.studentIds) {
      const student = store.users.find((u) => u.id === studentId);
      if (!student) continue;

      // Calculate attendance % for this student from the last 14 sessions
      const sessions = store.attendanceSessions.filter(s => s.classSectionId === classSectionId);
      let presentCount = 0;
      sessions.forEach(s => {
        if (s.presentStudentIds.includes(studentId)) presentCount++;
      });
      const attendancePercent = sessions.length > 0 ? Math.round((presentCount / sessions.length) * 100) : 100;

      // Calculate performance average for this subject
      const submissions = store.submissions.filter(sub => {
        const assignment = store.assignments.find(a => a.id === sub.assignmentId);
        return sub.studentId === studentId && assignment?.subjectId === subjectId && sub.status === "GRADED";
      });
      
      let sum = 0;
      submissions.forEach(sub => sum += (sub.score || 0));
      const avgScore = submissions.length > 0 ? Math.round(sum / submissions.length) : null;

      // Find parents
      const parents = store.users.filter(u => u.role === "PARENT" && u.childrenIds?.includes(studentId));

      roster.push({
        id: student.id,
        name: student.name,
        email: student.email,
        rollNo: `RL-${studentId.replace('student', '').padStart(3, '0')}`,
        attendancePercent,
        avgScore,
        lastActive: "Today",
        parents: parents.map(p => ({ id: p.id, name: p.name })),
        group: null // feature: groups
      });
    }

    return NextResponse.json({ roster });
  } catch (error) {
    console.error("Failed to fetch roster:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
