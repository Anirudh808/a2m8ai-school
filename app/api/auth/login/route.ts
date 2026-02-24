import { NextRequest, NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, planId } = body;

  const store = getStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // Override plan for demo when planId is provided
  const userWithPlan = planId ? { ...user, planId } : user;
  if (planId) {
    updateStore("users", (users) =>
      users.map((u) => (u.id === userId ? { ...u, planId } : u))
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("lms-session", JSON.stringify({ userId: userWithPlan.id, role: userWithPlan.role }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return NextResponse.json({ user: userWithPlan });
}
