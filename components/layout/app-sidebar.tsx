"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  School,
  Users,
  BookOpen,
  FileCheck,
  Settings,
  Megaphone,
  BarChart3,
  GraduationCap,
  ClipboardList,
  MessageSquare,
  Video,
  CircleDot,
  MessageCircle,
  UserCircle,
  AlertTriangle,
  Activity,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { ParentModeDialog } from "@/components/parent-mode-dialog";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  School,
  Users,
  BookOpen,
  FileCheck,
  Settings,
  Megaphone,
  BarChart3,
  GraduationCap,
  ClipboardList,
  MessageSquare,
  Video,
  CircleDot,
  MessageCircle,
  UserCircle,
  AlertTriangle,
  Activity,
};

interface NavItem {
  label: string;
  href: string;
  icon: string;
  key?: string;
}

const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "School Setup", href: "/admin/school-setup", icon: "School" },
  { label: "Users & Roles", href: "/admin/users", icon: "Users" },
  { label: "Courses", href: "/admin/courses", icon: "BookOpen" },
  { label: "Content Governance", href: "/admin/content-governance", icon: "FileCheck" },
  { label: "Assessments", href: "/admin/assessments", icon: "ClipboardList" },
  { label: "AI Controls", href: "/admin/ai-controls", icon: "Settings" },
  { label: "Announcements", href: "/admin/announcements", icon: "Megaphone" },
  { label: "Reports", href: "/admin/reports", icon: "BarChart3" },
];

const TEACHER_NAV: NavItem[] = [
  { label: "Dashboard", href: "/teacher/dashboard", icon: "LayoutDashboard" },
  { label: "Classes", href: "/teacher/classes", icon: "GraduationCap" },
  { label: "Assignments", href: "/teacher/assignments", icon: "ClipboardList" },
  { label: "Quizzes", href: "/teacher/quizzes", icon: "ClipboardList" },
  { label: "Live Class", href: "/teacher/live", icon: "Video" },
  { label: "Analytics", href: "/teacher/analytics", icon: "BarChart3" },
  { label: "Messages", href: "/teacher/messages", icon: "MessageSquare" },
];

const STUDENT_NAV: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: "LayoutDashboard" },
  { label: "Courses", href: "/student/courses", icon: "BookOpen" },
  { label: "Practice", href: "/student/practice", icon: "ClipboardList" },
  { label: "AI Tutor", href: "/student/ai-tutor", icon: "MessageCircle" },
  { label: "Assignments", href: "/student/assignments", icon: "FileCheck" },
  { label: "Exams/Quizzes", href: "/student/quizzes", icon: "ClipboardList" },
  { label: "Progress", href: "/student/progress", icon: "BarChart3" },
  { label: "Announcements", href: "/student/announcements", icon: "Megaphone" },
  { label: "Messages", href: "/student/messages", icon: "MessageSquare" },
];

const PARENT_NAV: NavItem[] = [
  { label: "Dashboard", href: "/parent/dashboard", icon: "LayoutDashboard" },
  { label: "Performance", href: "/parent/performance", icon: "BarChart3" },
  { label: "Attendance", href: "/parent/attendance", icon: "UserCircle" },
  { label: "Report Cards", href: "/parent/report-cards", icon: "FileCheck" },
  { label: "Messages", href: "/parent/messages", icon: "MessageSquare" },
  { label: "Activity", href: "/parent/activity", icon: "Activity" },
  { label: "Alerts", href: "/parent/alerts", icon: "AlertTriangle" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const parentMode = useAuthStore((s) => s.parentMode);
  const [parentDialogOpen, setParentDialogOpen] = useState(false);

  const nav = parentMode && user?.role === "STUDENT"
    ? PARENT_NAV
    : user?.role === "ADMIN"
    ? ADMIN_NAV
    : user?.role === "TEACHER"
    ? TEACHER_NAV
    : user?.role === "PARENT"
    ? PARENT_NAV
    : user?.role === "STUDENT"
    ? STUDENT_NAV
    : ADMIN_NAV;

  return (
    <aside className="flex h-full w-60 flex-col border-r border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-2 p-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <Link href="/" className="text-lg font-bold text-slate-900">
          School LMS
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {nav.map((item) => {
          const Icon = ICONS[item.icon] ?? LayoutDashboard;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "text-indigo-600" : "text-slate-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      {user?.role === "STUDENT" && !parentMode && (
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={() => setParentDialogOpen(true)}
            className="w-full rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-100"
          >
            Switch to Parent Mode
          </button>
        </div>
      )}
      <ParentModeDialog open={parentDialogOpen} onOpenChange={setParentDialogOpen} />
    </aside>
  );
}
