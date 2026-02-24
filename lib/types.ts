// Core user and role types
export type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  schoolId: string;
  studentId?: string; // For parent: which student they're linked to
  childrenIds?: string[]; // For parent: linked children
  planId?: string;
}

// School and academic structure
export interface School {
  id: string;
  name: string;
  board: "CBSE" | "ICSE" | "STATE" | "IB";
  academicYear: string;
  grades: string[];
  sections: string[];
  policies?: Record<string, unknown>;
}

export interface ClassSection {
  id: string;
  grade: string;
  sectionName: string;
  teacherIds: string[];
  studentIds: string[];
  subjectIds: string[];
}

// Course and content
export interface Subject {
  id: string;
  name: string;
  grade: string;
  board: string;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  order: number;
}

export type ContentBlockType =
  | "EXPLANATION"
  | "EXAMPLE"
  | "IMAGE"
  | "VIDEO"
  | "QUIZ"
  | "WHITEBOARD";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  data: Record<string, unknown>;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  objectives: string[];
  contentBlocks: ContentBlock[];
  order?: number;
  completed?: boolean;
  plannedDate?: string;
  aiGeneratedSummary?: string;
}

export interface ClassSchedule {
  id: string;
  classSectionId: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  lessonId?: string;
  type: "Regular" | "Revision" | "Test";
  status: "Planned" | "Completed" | "Cancelled";
}

export interface Material {
  id: string;
  classSectionId: string;
  subjectId: string;
  title: string;
  type: "PDF" | "PPT" | "Video" | "Worksheet";
  attachedTo: "Subject" | "Lesson";
  lessonId?: string;
  visibility: "Students" | "Teacher Only";
  uploadedAt: string;
}

export interface SavedLessonPlan {
  id: string;
  classSectionId: string;
  subjectId: string;
  chapterId: string;
  lessonId: string;
  explanation: string;
  examples: string;
  imageRefs: string[];
}

// Assignments and submissions
export type SubmissionStatus = "PENDING" | "SUBMITTED" | "GRADED" | "LATE";

export interface Assignment {
  id: string;
  classSectionId: string;
  subjectId: string;
  title: string;
  dueDate: string;
  rubric?: Record<string, unknown>;
  description?: string;
  type?: "Manual" | "AI Generated";
  format?: "Objective" | "Subjective" | "Worksheet" | "Project";
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  status: SubmissionStatus;
  score?: number;
  feedback?: string;
  submittedAt?: string;
}

// Quizzes
export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  type: "MCQ" | "SHORT_ANSWER";
}

export interface Quiz {
  id: string;
  classSectionId: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number; // minutes
}

// Attendance
export interface AttendanceSession {
  id: string;
  classSectionId: string;
  date: string;
  presentStudentIds: string[];
  notes?: string;
}

// Announcements and messaging
export interface Announcement {
  id: string;
  scope: "SCHOOL" | "GRADE" | "CLASS";
  scopeId?: string;
  title: string;
  body: string;
  createdAt: string;
  authorId: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface MessageThread {
  id: string;
  participants: string[];
  messages: Message[];
}

// Live class
export type LiveSessionStatus = "SCHEDULED" | "ACTIVE" | "ENDED";

export interface LiveClassSession {
  id: string;
  classSectionId: string;
  lessonIds: string[];
  currentLessonIndex: number;
  status: LiveSessionStatus;
  poll?: { question: string; options: string[]; votes: Record<string, number> };
  whiteboardState?: string;
  startedAt?: string;
  teacherId: string;
}

// Feature gating
export type FeatureKey =
  | "ADMIN_SCHOOL_SETUP"
  | "ADMIN_USER_MANAGEMENT"
  | "ADMIN_CONTENT_GOVERNANCE"
  | "ADMIN_ASSESSMENTS"
  | "ADMIN_AI_CONTROLS"
  | "ADMIN_ANNOUNCEMENTS"
  | "ADMIN_REPORTS"
  | "TEACHER_DASHBOARD"
  | "TEACHER_CLASS_MANAGEMENT"
  | "TEACHER_CLASS_ROSTER"
  | "TEACHER_GROUPS"
  | "TEACHER_LESSON_PLANNER"
  | "TEACHER_AI_LESSON_BUILDER"
  | "TEACHER_LESSON_BUILDER"
  | "TEACHER_CONTENT_LIBRARY"
  | "TEACHER_RESOURCES_UPLOAD"
  | "TEACHER_ASSIGNMENTS"
  | "TEACHER_AI_GRADING"
  | "TEACHER_QUIZ_BUILDER"
  | "TEACHER_ATTENDANCE"
  | "TEACHER_COMMUNICATION"
  | "TEACHER_AI_COTEACHER"
  | "TEACHER_AI_TUTOR_OVERSIGHT"
  | "TEACHER_INTERVENTIONS"
  | "TEACHER_LIVE_CLASS"
  | "TEACHER_POLLS"
  | "TEACHER_DISCUSSION"
  | "TEACHER_ANALYTICS"
  | "TEACHER_MESSAGES"
  | "STUDENT_DASHBOARD"
  | "STUDENT_COURSES"
  | "STUDENT_LESSON_VIEW"
  | "STUDENT_PRACTICE"
  | "STUDENT_AI_TUTOR"
  | "STUDENT_ASSIGNMENTS"
  | "STUDENT_QUIZZES"
  | "STUDENT_PROGRESS"
  | "STUDENT_ANNOUNCEMENTS"
  | "STUDENT_MESSAGES"
  | "PARENT_DASHBOARD"
  | "PARENT_PERFORMANCE"
  | "PARENT_ATTENDANCE"
  | "PARENT_REPORT_CARDS"
  | "PARENT_MESSAGES"
  | "PARENT_ACTIVITY_MONITOR"
  | "PARENT_ALERTS";

export interface SubscriptionPlan {
  id: string;
  name: "Basic" | "Premium" | "Premium Plus";
  description?: string;
}

export interface PlanEntitlement {
  planId: string;
  role: UserRole;
  featureKey: string;
  enabled: boolean;
  limit?: string; // e.g. "1/day", "Unlimited"
}
