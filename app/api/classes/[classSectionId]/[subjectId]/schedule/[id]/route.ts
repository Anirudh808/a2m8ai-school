import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string; id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  let updatedSchedule = null;
  updateStore("schedules", (prev) =>
    prev.map((s) => {
      if (s.id === id) {
        updatedSchedule = { ...s, ...body };
        return updatedSchedule;
      }
      return s;
    })
  );

  if (!updatedSchedule) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updatedSchedule);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string; id: string }> }
) {
  const { id } = await params;

  updateStore("schedules", (prev) => prev.filter((s) => s.id !== id));
  
  return new NextResponse(null, { status: 204 });
}
