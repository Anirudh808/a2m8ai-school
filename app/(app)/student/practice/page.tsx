"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentPracticePage() {
  const [result, setResult] = useState<boolean | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Practice</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-lg">What is (-5) + (-3)?</p>
          <div className="mt-4 flex gap-2">
            {["-8", "-2", "8", "2"].map((opt) => (
              <Button
                key={opt}
                variant={result === (opt === "-8") ? "default" : "outline"}
                onClick={() => setResult(opt === "-8")}
              >
                {opt}
              </Button>
            ))}
          </div>
          {result !== null && (
            <p className="mt-4 text-sm">{result ? "Correct!" : "Incorrect. The answer is -8."}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
