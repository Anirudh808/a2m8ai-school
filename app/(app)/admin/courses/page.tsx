import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default function AdminCoursesPage() {
  const store = getStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Courses / Subjects</h1>
      <Card>
        <CardHeader>
          <CardTitle>Subject Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Subject</th>
                  <th className="text-left py-2">Grade</th>
                  <th className="text-left py-2">Board</th>
                </tr>
              </thead>
              <tbody>
                {store.subjects.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="py-2">{s.name}</td>
                    <td className="py-2">{s.grade}</td>
                    <td className="py-2">{s.board}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
