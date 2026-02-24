import { Card, CardContent } from "@/components/ui/card";

export default async function StudentLiveSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Live Class</h1>
      <Card>
        <CardContent className="p-6">
          <p>Viewing session {sessionId}</p>
          <p className="mt-2 text-sm text-slate-500">Class screen content would appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
