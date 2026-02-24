import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  const { classSectionId, subjectId } = await params;
  const store = getStore();

  const assignments = store.assignments.filter(
    (a) => a.classSectionId === classSectionId && a.subjectId === subjectId
  );

  // Attach submission stats
  const assignmentsWithStats = assignments.map((assignment) => {
    let pending = 0;
    let graded = 0;
    let late = 0;
    let submitted = 0;

    store.submissions.forEach((sub) => {
      if (sub.assignmentId === assignment.id) {
        if (sub.status === "PENDING") pending++;
        if (sub.status === "SUBMITTED") submitted++;
        if (sub.status === "GRADED") graded++;
        if (sub.status === "LATE") late++;
      }
    });

    return {
      ...assignment,
      stats: { pending, submitted, graded, late },
    };
  });

  return NextResponse.json(assignmentsWithStats);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  const { classSectionId, subjectId } = await params;
  const body = await request.json();

  const newAssignment = {
    id: `assign_${Date.now()}`,
    classSectionId,
    subjectId,
    type: "Manual" as const, // default
    ...body,
  };

  updateStore("assignments", (prev) => [...prev, newAssignment]);
  return NextResponse.json(newAssignment, { status: 201 });
}
