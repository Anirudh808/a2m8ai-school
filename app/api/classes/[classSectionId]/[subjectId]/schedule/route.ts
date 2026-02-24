import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  const { classSectionId, subjectId } = await params;
  const store = getStore();
  const schedules = store.schedules.filter(
    (s) => s.classSectionId === classSectionId && s.subjectId === subjectId
  );
  return NextResponse.json(schedules);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  const { classSectionId, subjectId } = await params;
  const body = await request.json();
  
  const newSchedule = {
    id: `sched_${Date.now()}`,
    classSectionId,
    subjectId,
    ...body,
  };

  updateStore("schedules", (prev) => [...prev, newSchedule]);
  return NextResponse.json(newSchedule, { status: 201 });
}
