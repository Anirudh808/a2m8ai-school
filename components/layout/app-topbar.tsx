"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Command, LogOut, User, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link
        href="/"
        className="rounded-md px-2 py-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        Home
      </Link>
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <span
            className={cn(
              "rounded-md px-2 py-1 capitalize",
              i === parts.length - 1
                ? "font-medium text-slate-900"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            )}
          >
            {p.replace(/-/g, " ")}
          </span>
        </span>
      ))}
    </nav>
  );
}

export function AppTopbar() {
  const user = useAuthStore((s) => s.user);
  const parentMode = useAuthStore((s) => s.parentMode);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-sm">
      <Breadcrumbs />
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          title="Command palette (Ctrl+K)"
        >
          <Command className="h-5 w-5 text-slate-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full relative" title="Notifications">
          <Bell className="h-5 w-5 text-slate-500" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-medium text-white">
            3
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 rounded-full pl-2 pr-3 hover:bg-slate-100"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <User className="h-4 w-4" />
              </div>
              <span className="max-w-[120px] truncate text-sm font-medium">
                {user?.name ?? "User"}
              </span>
              {parentMode && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">
                  Parent
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl border-slate-200/80 p-1 shadow-lg"
          >
            <DropdownMenuItem asChild>
              <Link
                href="/pricing"
                className="flex cursor-pointer items-center rounded-lg px-3 py-2"
              >
                Pricing
              </Link>
            </DropdownMenuItem>
            {user?.role === "ADMIN" && (
              <DropdownMenuItem
                onClick={async () => {
                  await fetch("/api/seed/reset", { method: "POST" });
                  window.location.reload();
                }}
                className="flex cursor-pointer items-center rounded-lg px-3 py-2"
              >
                Reset Demo Data
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
