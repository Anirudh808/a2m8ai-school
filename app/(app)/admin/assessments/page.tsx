import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default function AdminAssessmentsPage() {
  const store = getStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Assessments Governance</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{store.assignments.length}</p>
            <p className="text-sm text-slate-500">Total assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{store.quizzes.length}</p>
            <p className="text-sm text-slate-500">Total quizzes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
