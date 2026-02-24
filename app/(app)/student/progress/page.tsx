import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreChart } from "@/components/score-chart";
import { getStore } from "@/lib/store";

export default function StudentProgressPage() {
  const store = getStore();
  const subs = store.submissions.filter((s) => s.studentId === "student1" && s.score != null);
  const chartData = subs.map((s) => {
    const a = store.assignments.find((a) => a.id === s.assignmentId);
    return { name: a?.title?.slice(0, 10) ?? "?", score: s.score ?? 0 };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Progress</h1>
      <Card>
        <CardHeader>
          <CardTitle>Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
