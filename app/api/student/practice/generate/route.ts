import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";
import { Quiz, QuizQuestion } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, subjectId, chapterId, lessonId, difficulty, type } = body;

    if (!studentId || !subjectId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const store = getStore();
    
    // Find subject name for the title
    const subject = store.subjects.find(s => s.id === subjectId);
    let title = `${subject?.name || 'Subject'} Practice`;
    
    if (chapterId && chapterId !== "none") {
       const chapter = store.chapters.find(c => c.id === chapterId);
       if (chapter) title = `${chapter.title} Practice`;
    }
    if (lessonId && lessonId !== "none") {
       const lesson = store.lessons.find(l => l.id === lessonId);
       if (lesson) title = `${lesson.title} Mini-Quiz`;
    }

    const newQuizId = `pqz-${Date.now()}`;
    const personalClassSectionId = `personal-${studentId}`;

    // Generate mock questions
    const numQuestions = difficulty === "easy" ? 5 : difficulty === "hard" ? 15 : 10;
    
    let generatedQuestions: QuizQuestion[] = [];
    if (type === "quiz") {
       generatedQuestions = Array.from({ length: numQuestions }, (_, i) => ({
          id: `pq-${Date.now()}-${i}`,
          question: `Sample ${difficulty} AI question ${i + 1} about ${title}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: Math.floor(Math.random() * 4),
          type: "MCQ" as const,
       }));
    } else {
       generatedQuestions = Array.from({ length: numQuestions / 2 }, (_, i) => ({
          id: `pq-${Date.now()}-${i}`,
          question: `Explain in detail the concept ${i + 1} related to ${title}.`,
          type: "SHORT_ANSWER" as const,
       }));
    }

    const newQuiz: Quiz = {
       id: newQuizId,
       classSectionId: personalClassSectionId,
       title: title,
       questions: generatedQuestions,
       timeLimit: type === "quiz" ? numQuestions * 2 : numQuestions * 5,
    };

    updateStore("quizzes", (prev) => [...prev, newQuiz]);

    return NextResponse.json({ success: true, quizId: newQuizId, quiz: newQuiz });
  } catch (error) {
    console.error("Error generating practice quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
