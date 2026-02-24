import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ParentReportCardsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Report Cards</h1>
      <Card>
        <CardHeader>
          <CardTitle>Term 1 Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
