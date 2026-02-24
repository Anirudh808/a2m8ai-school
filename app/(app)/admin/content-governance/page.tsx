import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export default function AdminContentGovernancePage() {
  const store = getStore();
  const lessonsByChapter = store.lessons.reduce((acc: Record<string, number>, l) => {
    acc[l.chapterId] = (acc[l.chapterId] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Content Governance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lessons by Chapter</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {store.chapters.map((ch) => {
              const subj = store.subjects.find((s) => s.id === ch.subjectId);
              return (
                <li key={ch.id} className="flex items-center justify-between rounded border p-3">
                  <div>
                    <p className="font-medium">{ch.title}</p>
                    <p className="text-sm text-slate-500">{subj?.name} - Grade {subj?.grade}</p>
                  </div>
                  <Badge variant="secondary">{lessonsByChapter[ch.id] ?? 0} lessons</Badge>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
