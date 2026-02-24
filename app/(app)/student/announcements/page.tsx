import { Card, CardContent } from "@/components/ui/card";
import { getStore } from "@/lib/store";
import { format } from "date-fns";

export default function StudentAnnouncementsPage() {
  const store = getStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Announcements</h1>
      <ul className="space-y-3">
        {store.announcements.slice(0, 5).map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4">
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-slate-600">{a.body}</p>
              <p className="mt-2 text-xs text-slate-500">{format(new Date(a.createdAt), "PP")}</p>
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  );
}
