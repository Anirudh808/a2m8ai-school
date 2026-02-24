import { Card, CardContent } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default function ParentMessagesPage() {
  const store = getStore();
  const parentThreads = store.messageThreads.filter((t) => t.participants.includes("parent1"));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Teacher Messaging</h1>
      <ul className="space-y-3">
        {parentThreads.map((t) => (
          <Card key={t.id}>
            <CardContent className="p-4">
              <p className="text-sm">{t.messages[t.messages.length - 1]?.content}</p>
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  );
}
