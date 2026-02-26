import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(req: Request, { params }: { params: Promise<{ quizId: string }> }) {
  try {
    const { quizId } = await params;
    const store = getStore();
    
    const quiz = store.quizzes.find(q => q.id === quizId);
    
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // In a real app we'd strip the correctAnswers here, but for our mock we'll just send it.
    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
