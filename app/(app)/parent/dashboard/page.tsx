import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default function ParentDashboardPage() {
  const store = getStore();
  const childId = "student1";
  const child = store.users.find((u) => u.id === childId);
  const subs = store.submissions.filter((s) => s.studentId === childId && s.status === "GRADED");
  const avg = subs.length > 0 ? Math.round(subs.reduce((a, s) => a + (s.score ?? 0), 0) / subs.length) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Parent Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Ward</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{child?.name ?? "Student"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{avg}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">92%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Homework</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
