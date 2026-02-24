import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default function TeacherMessagesPage() {
  const store = getStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Threads</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {store.messageThreads.filter((t) => t.participants.includes("teacher1")).map((t) => (
              <li key={t.id} className="rounded border p-4">
                <p className="text-sm text-slate-500">
                  {t.messages[t.messages.length - 1]?.content}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
