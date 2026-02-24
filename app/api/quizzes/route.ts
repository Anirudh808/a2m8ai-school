import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const classSectionId = searchParams.get("classSectionId");
  const store = getStore();

  let quizzes = store.quizzes;
  if (classSectionId) {
    quizzes = quizzes.filter((q) => q.classSectionId === classSectionId);
  }

  return NextResponse.json({ quizzes });
}
