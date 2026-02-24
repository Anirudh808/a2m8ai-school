import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const classSectionId = searchParams.get("classSectionId");
  const studentId = searchParams.get("studentId");
  const store = getStore();

  let assignments = store.assignments;
  if (classSectionId) {
    assignments = assignments.filter((a) => a.classSectionId === classSectionId);
  }

  if (studentId) {
    const classIds = store.classSections
      .filter((c) => c.studentIds.includes(studentId))
      .map((c) => c.id);
    assignments = assignments.filter((a) => classIds.includes(a.classSectionId));
  }

  return NextResponse.json({ assignments });
}
