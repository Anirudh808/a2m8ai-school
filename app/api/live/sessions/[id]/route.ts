import { NextRequest, NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const session = store.liveSessions.find((s) => s.id === id);
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ session });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  updateStore("liveSessions", (prev) =>
    prev.map((s) =>
      s.id === id ? { ...s, ...body } : s
    )
  );

  const store = getStore();
  const session = store.liveSessions.find((s) => s.id === id);
  return NextResponse.json({ session });
}
