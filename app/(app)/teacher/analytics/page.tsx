import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default function TeacherAnalyticsPage() {
  const store = getStore();
  const avgScore = store.submissions
    .filter((s) => s.score != null)
    .reduce((a, s) => a + (s.score ?? 0), 0);
  const count = store.submissions.filter((s) => s.score != null).length;
  const overallAvg = count > 0 ? Math.round(avgScore / count) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{overallAvg}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mastery Heatmap (Mock)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-1">
              {["Integers", "Fractions", "Science Ch1", "Science Ch2"].map((t, i) => (
                <div key={t} className="rounded bg-emerald-200 p-2 text-center text-sm">
                  {t}: {70 + i * 8}%
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
