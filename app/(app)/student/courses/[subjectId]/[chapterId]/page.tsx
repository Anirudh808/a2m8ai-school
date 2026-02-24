import Link from "next/link";
import { getStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";

export default async function StudentChapterPage({
  params,
}: {
  params: Promise<{ subjectId: string; chapterId: string }>;
}) {
  const { subjectId, chapterId } = await params;
  const store = getStore();
  const chapter = store.chapters.find((c) => c.id === chapterId);
  const lessons = store.lessons.filter((l) => l.chapterId === chapterId);

  if (!chapter) return <div>Chapter not found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{chapter.title}</h1>
      <ul className="space-y-2">
        {lessons.map((l) => (
          <li key={l.id}>
            <Link href={`/student/lesson/${l.id}`}>
              <Card className="hover:bg-slate-50">
                <CardContent className="p-4">{l.title}</CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
