import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";
import { Submission } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, quizId, answers } = body;

    if (!studentId || !quizId || !answers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const store = getStore();
    const quiz = store.quizzes.find(q => q.id === quizId);
    if (!quiz) {
       return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
       if (q.type === "MCQ") {
          if (answers[q.id] === q.correctAnswer) {
             correctCount++;
          }
       } else {
          // Mock subjective grading
          if (answers[q.id] && answers[q.id].length > 10) {
             correctCount++;
          }
       }
    });

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);

    const newSubmission: Submission = {
       id: `sub-${Date.now()}`,
       assignmentId: quizId,
       studentId: studentId,
       status: "GRADED",
       score: scorePercent,
       feedback: scorePercent >= 80 ? "Excellent work! Keep it up." : "You have some weak areas. Review the concepts and try again.",
       submittedAt: new Date().toISOString()
    };

    updateStore("submissions", (prev) => [...prev, newSubmission]);

    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error) {
    console.error("Error submitting practice quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
