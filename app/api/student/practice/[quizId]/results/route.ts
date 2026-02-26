import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(req: Request, { params }: { params: Promise<{ quizId: string }> }) {
  try {
    const { quizId } = await params;
    const store = getStore();
    
    // Auth mock
    const studentId = "student1";

    const quiz = store.quizzes.find(q => q.id === quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Find latest submission for this student and quiz
    const filteredSubs = store.submissions.filter(s => s.assignmentId === quizId && s.studentId === studentId);
    const submission = filteredSubs.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime())[0];

    return NextResponse.json({ quiz, submission });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
