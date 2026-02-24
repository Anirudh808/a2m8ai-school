import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ classSectionId: string; subjectId: string }> }
) {
  try {
    const store = getStore();
    const resolvedParams = await params;
    
    // Validate inputs
    const classSection = store.classSections.find(c => c.id === resolvedParams.classSectionId);
    const subject = store.subjects.find(s => s.id === resolvedParams.subjectId);

    if (!classSection || !subject) {
      return NextResponse.json({ error: "Class or Subject not found" }, { status: 404 });
    }

    // Compose minimal overview data needed for the layout header
    const data = {
      grade: classSection.grade,
      sectionName: classSection.sectionName,
      subjectName: subject.name,
      studentCount: classSection.studentIds.length,
      board: subject.board,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch class overview:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
