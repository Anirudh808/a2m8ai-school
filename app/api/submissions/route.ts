import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assignmentId = searchParams.get("assignmentId");
  const studentId = searchParams.get("studentId");
  const store = getStore();

  let submissions = store.submissions;
  if (assignmentId) submissions = submissions.filter((s) => s.assignmentId === assignmentId);
  if (studentId) submissions = submissions.filter((s) => s.studentId === studentId);

  return NextResponse.json({ submissions });
}
