import type { User, UserRole, PlanEntitlement, FeatureKey } from "./types";

// Map CSV feature names to our FeatureKey
const FEATURE_MAP: Record<string, FeatureKey> = {
  "Academic year & board configuration": "ADMIN_SCHOOL_SETUP",
  "Grade/section setup": "ADMIN_SCHOOL_SETUP",
  "Timetable & bell schedule": "ADMIN_SCHOOL_SETUP",
  "Subject mapping to syllabus": "ADMIN_SCHOOL_SETUP",
  "Role-based access control": "ADMIN_SCHOOL_SETUP",
  "Bulk user import": "ADMIN_USER_MANAGEMENT",
  "Parent-child linking": "ADMIN_USER_MANAGEMENT",
  "School-wide dashboard": "ADMIN_SCHOOL_SETUP",
  "Cohort comparisons": "ADMIN_REPORTS",
  "AI usage policy control": "ADMIN_AI_CONTROLS",
  "AI guardrails (restricted topics)": "ADMIN_AI_CONTROLS",
  "AI audit logs": "ADMIN_AI_CONTROLS",
  "AI anomaly detection": "ADMIN_AI_CONTROLS",
  "AI credit quota per class": "ADMIN_AI_CONTROLS",
  "Compliance export reports": "ADMIN_REPORTS",
  "Content moderation AI (text)": "ADMIN_CONTENT_GOVERNANCE",
  "Content moderation AI (image)": "ADMIN_CONTENT_GOVERNANCE",
  "Teacher dashboard": "TEACHER_DASHBOARD",
  "Class/section management": "TEACHER_CLASS_MANAGEMENT",
  "Lesson planner (manual)": "TEACHER_LESSON_PLANNER",
  "AI lesson builder": "TEACHER_LESSON_BUILDER",
  "Slide generation": "TEACHER_LESSON_BUILDER",
  "Worksheet generation": "TEACHER_ASSIGNMENTS",
  "Quiz creation (manual)": "TEACHER_QUIZ_BUILDER",
  "AI quiz generation": "TEACHER_QUIZ_BUILDER",
  "Question bank": "TEACHER_QUIZ_BUILDER",
  "Assignment creation": "TEACHER_ASSIGNMENTS",
  "Bulk grading": "TEACHER_ASSIGNMENTS",
  "Live class hosting": "TEACHER_LIVE_CLASS",
  "Live polls during class": "TEACHER_POLLS",
  "Discussion board": "TEACHER_DISCUSSION",
  "Student dashboard": "STUDENT_DASHBOARD",
  "Lesson access (text/video/PDF)": "STUDENT_COURSES",
  "Bookmark & notes": "STUDENT_LESSON_VIEW",
  "Assignment submission": "STUDENT_ASSIGNMENTS",
  "Timed exams": "STUDENT_QUIZZES",
  "AI Tutor interactions": "STUDENT_AI_TUTOR",
  "Topic-wise unlimited practice": "STUDENT_PRACTICE",
  "Mastery heatmap": "STUDENT_PROGRESS",
  "Live class participation": "STUDENT_QUIZZES",
  "Live polls": "STUDENT_QUIZZES",
  "Performance summary": "PARENT_DASHBOARD",
  "Attendance view": "PARENT_ATTENDANCE",
  "Assignment tracking": "PARENT_DASHBOARD",
  "Report card download": "PARENT_REPORT_CARDS",
  "Teacher messaging": "PARENT_MESSAGES",
  "AI progress summary": "PARENT_DASHBOARD",
  "Risk alerts": "PARENT_ALERTS",
  "AI tutor usage log visibility": "PARENT_ACTIVITY_MONITOR",
};

const PLAN_IDS: Record<string, string> = {
  Basic: "basic",
  Premium: "premium",
  "Premium Plus": "premium_plus",
};

export interface ParsedEntitlement {
  planId: string;
  role: UserRole;
  featureKey: FeatureKey;
  enabled: boolean;
  limit?: string;
}

function parseCSVFeatureToRole(feature: string, matrix: string): UserRole {
  if (matrix.includes("Admin")) return "ADMIN";
  if (matrix.includes("Teacher")) return "TEACHER";
  if (matrix.includes("Student")) return "STUDENT";
  if (matrix.includes("Parent")) return "PARENT";
  return "ADMIN";
}

export function parseEntitlementsFromCSV(csvContent: string): PlanEntitlement[] {
  const entitlements: PlanEntitlement[] = [];
  const rows = csvContent.split("\n").map((r) => r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));

  let currentRole: UserRole = "ADMIN";
  const seen = new Set<string>();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const first = row[0]?.trim() ?? "";

    if (first.includes("Admin Matrix")) currentRole = "ADMIN";
    else if (first.includes("Teachers Matrix")) currentRole = "TEACHER";
    else if (first.includes("Student Matrix")) currentRole = "STUDENT";
    else if (first.includes("Parent Mode Matrix")) currentRole = "PARENT";
    else if (first === "Feature" && row[1] === "Basic") {
      // Header row for a matrix
      continue;
    } else if (FEATURE_MAP[first]) {
      const fk = FEATURE_MAP[first];
      const basic = row[1]?.trim();
      const premium = row[2]?.trim();
      const premiumPlus = row[3]?.trim();

      for (const [planName, val] of [
        ["Basic", basic],
        ["Premium", premium],
        ["Premium Plus", premiumPlus],
      ]) {
        const planId = PLAN_IDS[planName];
        if (!planId) continue;
        const enabled = val && val !== "" && val !== "?";
        const limit = typeof val === "string" && val !== "?" ? val : undefined;
        const key = `${planId}-${currentRole}-${fk}`;
        if (!seen.has(key)) {
          seen.add(key);
          entitlements.push({ planId, role: currentRole, featureKey: fk, enabled: enabled || !!val, limit });
        }
      }
    }
  }

  // Ensure core features are enabled for all plans (fallback)
  const coreFeatures: { role: UserRole; fk: FeatureKey }[] = [
    { role: "ADMIN", fk: "ADMIN_SCHOOL_SETUP" },
    { role: "ADMIN", fk: "ADMIN_USER_MANAGEMENT" },
    { role: "TEACHER", fk: "TEACHER_DASHBOARD" },
    { role: "TEACHER", fk: "TEACHER_ASSIGNMENTS" },
    { role: "STUDENT", fk: "STUDENT_DASHBOARD" },
    { role: "STUDENT", fk: "STUDENT_ASSIGNMENTS" },
    { role: "PARENT", fk: "PARENT_DASHBOARD" },
  ];

  for (const { role, fk } of coreFeatures) {
    for (const planId of ["basic", "premium", "premium_plus"]) {
      const key = `${planId}-${role}-${fk}`;
      if (!seen.has(key)) {
        entitlements.push({ planId, role, featureKey: fk, enabled: true });
      }
    }
  }

  return entitlements;
}

let cachedEntitlements: PlanEntitlement[] | null = null;

export function getEntitlements(entitlementsData?: string): PlanEntitlement[] {
  if (cachedEntitlements) return cachedEntitlements;
  if (typeof entitlementsData === "string") {
    cachedEntitlements = parseEntitlementsFromCSV(entitlementsData);
  } else {
    cachedEntitlements = [];
    for (const role of ["ADMIN", "TEACHER", "STUDENT", "PARENT"] as UserRole[]) {
      for (const planId of ["basic", "premium", "premium_plus"]) {
        cachedEntitlements.push({
          planId,
          role,
          featureKey: "ADMIN_SCHOOL_SETUP" as FeatureKey,
          enabled: true,
        });
      }
    }
  }
  return cachedEntitlements;
}

export function getUserPlan(user: User): string {
  return user.planId ?? "basic";
}

export function canAccess(user: User, featureKey: FeatureKey): boolean {
  const planId = getUserPlan(user);
  const ents = getEntitlements();
  const match = ents.find(
    (e) => e.planId === planId && e.role === user.role && e.featureKey === featureKey
  );
  if (match) return match.enabled;
  return true;
}

export interface NavItem {
  key: FeatureKey | string;
  label: string;
  href: string;
  icon?: string;
}

export function filterNavByEntitlements(user: User, navItems: NavItem[]): NavItem[] {
  return navItems.filter((item) => {
    if (typeof item.key !== "string" || !item.key.startsWith("ADMIN_") && !item.key.startsWith("TEACHER_") && !item.key.startsWith("STUDENT_") && !item.key.startsWith("PARENT_")) return true;
    return canAccess(user, item.key as FeatureKey);
  });
}
