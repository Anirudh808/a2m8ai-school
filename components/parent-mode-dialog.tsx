"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ParentModeDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const setParentMode = useAuthStore((s) => s.setParentMode);

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/parent-mode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Invalid parent password. Demo: 1234");
      return;
    }
    setParentMode(true);
    onOpenChange(false);
    router.push("/parent/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Switch to Parent Mode</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-slate-500">Enter parent password (demo: 1234)</p>
        <Input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          placeholder="Parent password"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleSubmit}>Unlock</Button>
      </DialogContent>
    </Dialog>
  );
}
