import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string; id: string }> }
) {
  const { id } = await params;

  updateStore("materials", (prev) => prev.filter((m) => m.id !== id));
  
  return new NextResponse(null, { status: 204 });
}
