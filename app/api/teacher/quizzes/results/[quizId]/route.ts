import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const store = getStore();
    const resolvedParams = await params;
    const { quizId } = resolvedParams;

    const quiz = store.quizzes.find((q) => q.id === quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const classSection = store.classSections.find((c) => c.id === quiz.classSectionId);
    if (!classSection) {
      return NextResponse.json({ error: "Class Section not found" }, { status: 404 });
    }

    const results = [];
    let gradedCount = 0;
    let pendingCount = 0;

    for (const studentId of classSection.studentIds) {
      const student = store.users.find((u) => u.id === studentId);
      if (!student) continue;

      // In the mock data, submissions use assignmentId. We'll use quizId to match.
      const submission = store.submissions.find(
        (sub) => sub.studentId === student.id && sub.assignmentId === quizId
      );

      let status = "Not Submitted";
      let score = null;
      let submittedAt = null;

      if (submission) {
        if (submission.status === "GRADED") {
           status = "Graded";
           score = submission.score;
           gradedCount++;
        } else if (submission.status === "SUBMITTED") {
           status = "Needs Grading";
           pendingCount++;
        }
        submittedAt = submission.submittedAt || "Recent";
      }

      results.push({
        studentId: student.id,
        name: student.name,
        rollNo: `RL-${student.id.replace('student', '').padStart(3, '0')}`,
        status,
        score,
        submittedAt
      });
    }
    
    // Sort by name for neatness
    results.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ 
       quizTitle: quiz.title,
       totalQuestions: quiz.questions.length,
       totalStudents: classSection.studentIds.length,
       gradedCount,
       pendingCount,
       notSubmittedCount: classSection.studentIds.length - gradedCount - pendingCount,
       results
    });
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
