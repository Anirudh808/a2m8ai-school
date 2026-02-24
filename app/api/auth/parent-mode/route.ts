import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEMO_PARENT_PASSWORD = "1234";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (password !== DEMO_PARENT_PASSWORD) {
    return NextResponse.json({ error: "Invalid parent password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const session = cookieStore.get("lms-session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const data = JSON.parse(session.value);
  cookieStore.set("lms-session", JSON.stringify({ ...data, parentMode: true }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 2,
    sameSite: "lax",
  });

  return NextResponse.json({ ok: true });
}
