import { NextRequest, NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function GET() {
  const store = getStore();
  return NextResponse.json({ sessions: store.liveSessions });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { classSectionId, lessonIds, teacherId } = body;

  const session = {
    id: `live-${Date.now()}`,
    classSectionId,
    lessonIds: lessonIds ?? [],
    currentLessonIndex: 0,
    status: "ACTIVE" as const,
    startedAt: new Date().toISOString(),
    teacherId,
  };

  updateStore("liveSessions", (prev) => [...prev, session]);
  return NextResponse.json({ session });
}
