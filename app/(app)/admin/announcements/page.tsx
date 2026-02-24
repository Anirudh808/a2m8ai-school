import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminAnnouncementsPage() {
  const store = getStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Announcements</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {store.announcements.slice(0, 10).map((a) => (
              <li key={a.id} className="rounded border p-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{a.title}</span>
                  <Badge variant="secondary">{a.scope}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{a.body}</p>
                <p className="mt-2 text-xs text-slate-500">{format(new Date(a.createdAt), "PPp")}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
