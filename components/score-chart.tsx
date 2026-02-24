"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface DataPoint {
  name: string;
  score: number;
}

export function ScoreChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
