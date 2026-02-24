import { getStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";

export default async function StudentLessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const store = getStore();
  const lesson = store.lessons.find((l) => l.id === lessonId);

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      {lesson.objectives.length > 0 && (
        <p className="text-slate-600">Objectives: {lesson.objectives.join(", ")}</p>
      )}
      <div className="space-y-4">
        {lesson.contentBlocks.map((b) => (
          <Card key={b.id}>
            <CardContent className="p-4">
              <span className="text-xs font-medium text-slate-500">{b.type}</span>
              <p className="mt-2">{(b.data as { text?: string }).text ?? JSON.stringify(b.data)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
