"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudentAITutorPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    setResponse(`(Mock RAG) Based on the lesson "Introduction to Integers": Integers include whole numbers and their negatives. When adding integers with the same sign, add their absolute values and keep the sign. So (-5) + (-3) = -8. Source: Lesson 1 - Introduction to Integers.`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Tutor</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-slate-500">Ask a question from your lesson content. Answers are based only on course material.</p>
          <div className="mt-4 flex gap-2">
            <Input
              placeholder="e.g. How do we add negative integers?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={handleAsk}>Ask</Button>
          </div>
          {response && (
            <div className="mt-4 rounded bg-slate-50 p-4">
              <p>{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
