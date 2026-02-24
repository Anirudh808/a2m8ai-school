import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default function StudentCoursesPage() {
  const store = getStore();
  const subjects = store.subjects.filter((s) => s.grade === "6" || s.grade === "7");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Courses</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {subjects.map((subj) => {
          const chapters = store.chapters.filter((c) => c.subjectId === subj.id);
          return (
            <Card key={subj.id}>
              <CardHeader>
                <CardTitle>{subj.name}</CardTitle>
                <p className="text-sm text-slate-500">Grade {subj.grade}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  <li>
                    <Link href={`/student/courses/${subj.id}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                      Open Course Workspace <span className="ml-1 text-lg leading-none">&rarr;</span>
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
