import { NextRequest, NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const classSectionId = searchParams.get("classSectionId");
  const store = getStore();

  let plans = store.savedLessonPlans;
  if (classSectionId) {
    plans = plans.filter((p) => p.classSectionId === classSectionId);
  }

  return NextResponse.json({ lessonPlans: plans });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { classSectionId, subjectId, chapterId, lessonId, explanation, examples, imageRefs } = body;

  const plan = {
    id: `lp-${Date.now()}`,
    classSectionId,
    subjectId,
    chapterId,
    lessonId,
    explanation: explanation ?? "",
    examples: examples ?? "",
    imageRefs: Array.isArray(imageRefs) ? imageRefs : [],
  };

  updateStore("savedLessonPlans", (prev) => [...prev, plan]);

  return NextResponse.json({ lessonPlan: plan });
}
