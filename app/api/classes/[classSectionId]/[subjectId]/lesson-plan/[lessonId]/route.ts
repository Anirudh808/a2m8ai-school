import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string; lessonId: string }> }
) {
  const { lessonId } = await params;
  const body = await request.json();

  let updatedLesson = null;
  updateStore("lessons", (prev) =>
    prev.map((l) => {
      if (l.id === lessonId) {
        updatedLesson = { ...l, ...body };
        return updatedLesson;
      }
      return l;
    })
  );

  if (!updatedLesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }
  
  return NextResponse.json(updatedLesson);
}
