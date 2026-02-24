import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export default function StudentAssignmentsPage() {
  const store = getStore();
  const studentId = "student1";
  const myClassIds = store.classSections.filter((c) => c.studentIds.includes(studentId)).map((c) => c.id);
  const myAssignments = store.assignments.filter((a) => myClassIds.includes(a.classSectionId));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Assignments</h1>
      <Card>
        <CardHeader>
          <CardTitle>My Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {myAssignments.map((a) => {
              const sub = store.submissions.find((s) => s.assignmentId === a.id && s.studentId === studentId);
              return (
                <li key={a.id} className="flex items-center justify-between rounded border p-4">
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-slate-500">Due: {a.dueDate}</p>
                  </div>
                  <Badge variant={sub?.status === "GRADED" ? "success" : "secondary"}>
                    {sub?.status ?? "PENDING"}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
