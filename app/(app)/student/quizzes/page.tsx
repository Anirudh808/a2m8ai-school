import { Card, CardContent } from "@/components/ui/card";

export default function StudentQuizzesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Exams / Quizzes</h1>
      <Card>
        <CardContent className="p-6">
          <p className="font-medium">Integers Quiz</p>
          <p className="text-sm text-slate-500">5 questions, 15 min</p>
        </CardContent>
      </Card>
    </div>
  );
}
