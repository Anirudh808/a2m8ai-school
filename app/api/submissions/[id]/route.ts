import { NextRequest, NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/store";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { score, feedback, status } = body;

  updateStore("submissions", (prev) =>
    prev.map((s) =>
      s.id === id
        ? { ...s, ...(score !== undefined && { score }), ...(feedback !== undefined && { feedback }), ...(status !== undefined && { status }) }
        : s
    )
  );

  const store = getStore();
  const sub = store.submissions.find((s) => s.id === id);
  return NextResponse.json({ submission: sub });
}
