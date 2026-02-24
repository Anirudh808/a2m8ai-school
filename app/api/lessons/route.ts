import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chapterId = searchParams.get("chapterId");
  const store = getStore();
  let lessons = store.lessons;
  if (chapterId) {
    lessons = lessons.filter((l) => l.chapterId === chapterId);
  }
  return NextResponse.json({ lessons });
}
