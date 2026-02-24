import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminAIControlsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Controls & Safety</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>AI Tutor</span>
              <Badge variant="success">Enabled</Badge>
            </div>
            <div className="flex justify-between">
              <span>Auto-grading</span>
              <Badge variant="success">Enabled</Badge>
            </div>
            <div className="flex justify-between">
              <span>Lesson Builder</span>
              <Badge variant="success">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Restricted Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Politics, Adult content, Violence</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
