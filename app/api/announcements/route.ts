import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");
  const scopeId = searchParams.get("scopeId");
  const store = getStore();

  let announcements = store.announcements;
  if (scope) announcements = announcements.filter((a) => a.scope === scope);
  if (scopeId) announcements = announcements.filter((a) => a.scopeId === scopeId);

  return NextResponse.json({ announcements });
}
