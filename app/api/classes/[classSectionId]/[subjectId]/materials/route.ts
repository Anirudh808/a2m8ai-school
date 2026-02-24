import { NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  const { classSectionId, subjectId } = await params;
  const store = getStore();
  
  const materials = store.materials.filter(
    (m) => m.classSectionId === classSectionId && m.subjectId === subjectId
  );
  
  return NextResponse.json(materials);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  const { classSectionId, subjectId } = await params;
  const body = await request.json();
  
  const newMaterial = {
    id: `mat_${Date.now()}`,
    classSectionId,
    subjectId,
    uploadedAt: new Date().toISOString(),
    ...body,
  };

  updateStore("materials", (prev) => [...prev, newMaterial]);
  return NextResponse.json(newMaterial, { status: 201 });
}
