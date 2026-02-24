import type { UserRole } from "./types";

export const ROLE_ROUTES: Record<UserRole, string[]> = {
  ADMIN: [
    "/admin/dashboard",
    "/admin/school-setup",
    "/admin/users",
    "/admin/courses",
    "/admin/content-governance",
    "/admin/assessments",
    "/admin/ai-controls",
    "/admin/announcements",
    "/admin/reports",
  ],
  TEACHER: [
    "/teacher/dashboard",
    "/teacher/classes",
    "/teacher/lesson-planner",
    "/teacher/lesson-builder",
    "/teacher/content",
    "/teacher/assignments",
    "/teacher/quizzes",
    "/teacher/live",
    "/teacher/analytics",
    "/teacher/messages",
  ],
  STUDENT: [
    "/student/dashboard",
    "/student/courses",
    "/student/assignments",
    "/student/quizzes",
    "/student/practice",
    "/student/ai-tutor",
    "/student/progress",
    "/student/announcements",
    "/student/messages",
  ],
  PARENT: [
    "/parent/dashboard",
    "/parent/performance",
    "/parent/attendance",
    "/parent/report-cards",
    "/parent/messages",
    "/parent/activity",
    "/parent/alerts",
  ],
};

export function canAccessRoute(role: UserRole, pathname: string): boolean {
  const allowedPrefixes = ROLE_ROUTES[role].map((r) => r.split("/").slice(1, 3).join("/"));
  const pathParts = pathname.split("/").filter(Boolean);
  const routePrefix = pathParts.slice(0, 2).join("/");

  if (pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/pricing")) return true;
  if (pathname.startsWith("/api/")) return true;

  return allowedPrefixes.some((p) => routePrefix === p || pathname.startsWith(`/${p}`));
}
