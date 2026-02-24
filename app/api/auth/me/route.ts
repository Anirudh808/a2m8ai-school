import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStore } from "@/lib/store";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("lms-session");
  if (!sessionCookie?.value) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const { userId } = JSON.parse(sessionCookie.value);
    const store = getStore();
    const user = store.users.find((u) => u.id === userId);
    return NextResponse.json({ user: user ?? null });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
