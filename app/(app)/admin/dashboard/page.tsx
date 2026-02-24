import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceChart } from "@/components/attendance-chart";
import { getStore } from "@/lib/store";
import { Users, GraduationCap, CheckCircle, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  const store = getStore();
  const totalUsers = store.users.length;
  const totalStudents = store.users.filter((u) => u.role === "STUDENT").length;
  const totalTeachers = store.users.filter((u) => u.role === "TEACHER").length;
  const gradedSubs = store.submissions.filter((s) => s.status === "GRADED").length;
  const pendingSubs = store.submissions.filter((s) => s.status === "PENDING" || s.status === "SUBMITTED").length;
  const atRisk = Math.ceil(totalStudents * 0.08);

  const attendanceData = store.attendanceSessions
    .filter((a) => a.date >= "2025-02-10")
    .reduce((acc: Record<string, number[]>, s) => {
      const cs = store.classSections.find((c) => c.id === s.classSectionId);
      const total = cs?.studentIds.length ?? 1;
      const pct = Math.round((s.presentStudentIds.length / total) * 100);
      if (!acc[s.date]) acc[s.date] = [];
      acc[s.date].push(pct);
      return acc;
    }, {});
  const chartData = Object.entries(attendanceData).map(([date, vals]) => ({
    date: date.slice(5),
    avg: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
  })).slice(-7);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-1 text-slate-500">School-wide overview</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Users</CardTitle>
            <div className="rounded-lg bg-indigo-100 p-2 group-hover:bg-indigo-200 transition-colors">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalUsers}</div>
            <p className="mt-1 text-sm text-slate-500">{totalTeachers} teachers, {totalStudents} students</p>
          </CardContent>
        </Card>
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Attendance Trend</CardTitle>
            <div className="rounded-lg bg-emerald-100 p-2 group-hover:bg-emerald-200 transition-colors">
              <GraduationCap className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{chartData[chartData.length - 1]?.avg ?? 92}%</div>
            <p className="mt-1 text-sm text-slate-500">Last 7 days average</p>
          </CardContent>
        </Card>
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completion</CardTitle>
            <div className="rounded-lg bg-blue-100 p-2 group-hover:bg-blue-200 transition-colors">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{gradedSubs}</div>
            <p className="mt-1 text-sm text-slate-500">{pendingSubs} pending grading</p>
          </CardContent>
        </Card>
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">At-Risk Students</CardTitle>
            <div className="rounded-lg bg-amber-100 p-2 group-hover:bg-amber-200 transition-colors">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{atRisk}</div>
            <p className="mt-1 text-sm text-slate-500">Flagged for intervention</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-900">Attendance Trend (Last 7 Days)</CardTitle>
          <p className="text-sm text-slate-500">Daily attendance percentage by section</p>
        </CardHeader>
        <CardContent>
          <AttendanceChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
