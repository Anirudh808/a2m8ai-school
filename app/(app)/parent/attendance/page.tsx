import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParentAttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Attendance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">92%</p>
          <p className="text-sm text-slate-500">Last 30 days</p>
        </CardContent>
      </Card>
    </div>
  );
}
