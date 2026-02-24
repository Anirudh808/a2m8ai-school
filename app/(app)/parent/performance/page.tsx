import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default function ParentPerformancePage() {
  const store = getStore();
  const subs = store.submissions.filter((s) => s.studentId === "student1" && s.status === "GRADED");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Subject-wise Analysis</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {["Mathematics", "Science", "English"].map((subj, i) => (
          <Card key={subj}>
            <CardHeader>
              <CardTitle>{subj}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{75 + i * 5}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
