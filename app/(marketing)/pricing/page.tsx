"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PLANS = [
  { id: "basic", name: "Basic", price: "₹499", desc: "Essential features" },
  { id: "premium", name: "Premium", price: "₹999", desc: "Advanced features" },
  { id: "premium_plus", name: "Premium Plus", price: "₹1499", desc: "Full access" },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-8">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <p className="text-sm text-slate-500">{p.desc}</p>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{p.price}/mo</p>
              <Button asChild className="mt-4">
                <Link href="/login">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
