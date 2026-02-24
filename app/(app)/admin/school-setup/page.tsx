import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export default function AdminSchoolSetupPage() {
  const store = getStore();
  const school = store.school;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">School Setup</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>School Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="font-medium">{school.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Board</p>
              <Badge variant="secondary">{school.board}</Badge>
            </div>
            <div>
              <p className="text-sm text-slate-500">Academic Year</p>
              <p className="font-medium">{school.academicYear}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Grades</p>
              <p className="font-medium">{school.grades.join(", ")}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Sections</p>
              <p className="font-medium">{school.sections.join(", ")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Class Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {store.classSections.map((cs) => (
                <li key={cs.id} className="flex justify-between rounded border p-3">
                  <span className="font-medium">Grade {cs.grade} - {cs.sectionName}</span>
                  <span className="text-sm text-slate-500">{cs.studentIds.length} students</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
