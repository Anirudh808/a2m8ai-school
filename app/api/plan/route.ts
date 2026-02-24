import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStore, updateStore } from "@/lib/store";

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("lms-session");
  if (!session?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId } = JSON.parse(session.value);
  const store = getStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  const body = await request.json();
  const { planId, targetUserId } = body;
  const uid = targetUserId ?? userId;

  updateStore("users", (prev) =>
    prev.map((u) => (u.id === uid ? { ...u, planId } : u))
  );

  const updated = getStore().users.find((u) => u.id === uid);
  return NextResponse.json({ user: updated });
}
