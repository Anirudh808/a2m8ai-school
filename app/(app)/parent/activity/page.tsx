import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParentActivityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Child Activity</h1>
      <Card>
        <CardHeader>
          <CardTitle>Time on Task (Mock)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">Math: 45 min | Science: 30 min | English: 20 min</p>
        </CardContent>
      </Card>
    </div>
  );
}
