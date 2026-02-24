import { Card, CardContent } from "@/components/ui/card";

export default function ParentAlertsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Alerts</h1>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm">No active alerts.</p>
        </CardContent>
      </Card>
    </div>
  );
}
