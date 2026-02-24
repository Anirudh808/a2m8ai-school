import { getStore } from "@/lib/store";
import { StudentWorkspaceClient } from "./client";

export default async function StudentSubjectPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  const store = getStore();

  const studentId = "student1"; // Mock authenticated user

  const classSection = store.classSections.find(c => 
    c.studentIds.includes(studentId) && c.subjectIds.includes(subjectId)
  );
  
  const subject = store.subjects.find(s => s.id === subjectId);

  if (!classSection || !subject) {
    return (
      <div className="p-8 text-center text-slate-500">
        You are not enrolled in this course or it does not exist.
      </div>
    );
  }

  return (
    <StudentWorkspaceClient 
      classSectionId={classSection.id} 
      subjectId={subjectId} 
      subjectName={subject.name} 
      grade={classSection.grade}
    />
  );
}
