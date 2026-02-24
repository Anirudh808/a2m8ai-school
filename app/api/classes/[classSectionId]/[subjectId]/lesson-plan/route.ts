import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  const { subjectId } = await params;
  const store = getStore();
  
  const chapters = store.chapters
    .filter((c) => c.subjectId === subjectId)
    .sort((a, b) => a.order - b.order);
    
  const result = chapters.map(chapter => {
    const chapterLessons = store.lessons
      .filter((l) => l.chapterId === chapter.id)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
      
    return {
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      lessons: chapterLessons.map(l => ({
        id: l.id,
        title: l.title,
        objectives: l.objectives,
        plannedDate: l.plannedDate,
        completed: l.completed || false,
        aiGeneratedSummary: l.aiGeneratedSummary,
      }))
    };
  });

  return NextResponse.json(result);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  // To add a new lesson
  const body = await request.json();
  
  const newLesson = {
    id: `lesson_${Date.now()}`,
    chapterId: body.chapterId,
    title: body.title,
    objectives: body.objectives || [],
    contentBlocks: [],
    completed: false,
    ...body,
  };

  updateStore("lessons", (prev) => [...prev, newLesson]);
  return NextResponse.json(newLesson, { status: 201 });
}
