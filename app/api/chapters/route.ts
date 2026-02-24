import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get("subjectId");
  const store = getStore();
  let chapters = store.chapters;
  if (subjectId) {
    chapters = chapters.filter((c) => c.subjectId === subjectId);
  }
  return NextResponse.json({ chapters });
}
