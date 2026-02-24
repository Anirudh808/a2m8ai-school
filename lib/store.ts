import {
  DEMO_USERS,
  SCHOOL,
  CLASS_SECTIONS,
  SUBJECTS,
  CHAPTERS,
  LESSONS,
  ASSIGNMENTS,
  SUBMISSIONS,
  QUIZZES,
  ATTENDANCE_SESSIONS,
  ANNOUNCEMENTS,
  MESSAGE_THREADS,
  SCHEDULES,
  MATERIALS,
  getFullSeed,
} from "./seed";
import type {
  User,
  School,
  ClassSection,
  Subject,
  Chapter,
  Lesson,
  Assignment,
  Submission,
  Quiz,
  AttendanceSession,
  Announcement,
  MessageThread,
  LiveClassSession,
  SavedLessonPlan,
  ClassSchedule,
  Material,
} from "./types";

type Store = {
  users: User[];
  school: School;
  classSections: ClassSection[];
  subjects: Subject[];
  chapters: Chapter[];
  lessons: Lesson[];
  assignments: Assignment[];
  submissions: Submission[];
  quizzes: Quiz[];
  attendanceSessions: AttendanceSession[];
  announcements: Announcement[];
  messageThreads: MessageThread[];
  liveSessions: LiveClassSession[];
  savedLessonPlans: SavedLessonPlan[];
  schedules: ClassSchedule[];
  materials: Material[];
};

let store: Store = {
  users: [...DEMO_USERS],
  school: { ...SCHOOL },
  classSections: [...CLASS_SECTIONS],
  subjects: [...SUBJECTS],
  chapters: [...CHAPTERS],
  lessons: [...LESSONS],
  assignments: [...ASSIGNMENTS],
  submissions: [...SUBMISSIONS],
  quizzes: [...QUIZZES],
  attendanceSessions: [...ATTENDANCE_SESSIONS],
  announcements: [...ANNOUNCEMENTS],
  messageThreads: [...MESSAGE_THREADS],
  liveSessions: [],
  savedLessonPlans: [],
  schedules: [...SCHEDULES],
  materials: [...MATERIALS],
};

export function getStore(): Store {
  return store;
}

export function resetStore(): void {
  const seed = getFullSeed();
  store = {
    users: [...seed.users],
    school: { ...seed.school },
    classSections: [...seed.classSections],
    subjects: [...seed.subjects],
    chapters: [...seed.chapters],
    lessons: [...seed.lessons],
    assignments: [...seed.assignments],
    submissions: [...seed.submissions],
    quizzes: [...seed.quizzes],
    attendanceSessions: [...seed.attendanceSessions],
    announcements: [...seed.announcements],
    messageThreads: [...seed.messageThreads],
    liveSessions: [],
    savedLessonPlans: [],
    schedules: [...seed.schedules],
    materials: [...seed.materials],
  };
}

export function updateStore<K extends keyof Store>(key: K, updater: (prev: Store[K]) => Store[K]): void {
  store[key] = updater(store[key]);
}
