import type {
  User,
  School,
  ClassSection,
  Subject,
  Chapter,
  Lesson,
  ContentBlock,
  Assignment,
  Submission,
  Quiz,
  QuizQuestion,
  AttendanceSession,
  Announcement,
  MessageThread,
  Message,
  ClassSchedule,
  Material,
} from "./types";

export const DEMO_USERS: User[] = [
  { id: "admin1", role: "ADMIN", name: "Principal Sharma", email: "admin@school.edu", schoolId: "school1", planId: "premium_plus" },
  { id: "teacher1", role: "TEACHER", name: "Ms. Anita Roy", email: "anita@school.edu", schoolId: "school1", planId: "premium" },
  { id: "teacher2", role: "TEACHER", name: "Mr. Vikram Singh", email: "vikram@school.edu", schoolId: "school1", planId: "premium" },
  { id: "student1", role: "STUDENT", name: "Rahul Verma", email: "rahul@school.edu", schoolId: "school1", planId: "premium" },
  { id: "student2", role: "STUDENT", name: "Priya Patel", email: "priya@school.edu", schoolId: "school1", planId: "basic" },
  { id: "student3", role: "STUDENT", name: "Arjun Kumar", email: "arjun@school.edu", schoolId: "school1", planId: "premium_plus" },
  { id: "parent1", role: "PARENT", name: "Mr. Verma", email: "verma@email.com", schoolId: "school1", childrenIds: ["student1"], planId: "premium" },
  { id: "parent2", role: "PARENT", name: "Mrs. Patel", email: "patel@email.com", schoolId: "school1", childrenIds: ["student2"], planId: "basic" },
];

export const SCHOOL: School = {
  id: "school1",
  name: "Sunrise International School",
  board: "CBSE",
  academicYear: "2024-25",
  grades: ["6", "7", "8"],
  sections: ["A", "B"],
};

const makeBlock = (type: ContentBlock["type"], data: Record<string, unknown>): ContentBlock => ({
  id: `block-${Math.random().toString(36).slice(2, 9)}`,
  type,
  data,
});

export const SUBJECTS: Subject[] = [
  { id: "sub1", name: "Mathematics", grade: "6", board: "CBSE" },
  { id: "sub2", name: "Science", grade: "6", board: "CBSE" },
  { id: "sub3", name: "Mathematics", grade: "7", board: "CBSE" },
  { id: "sub4", name: "Science", grade: "7", board: "CBSE" },
  { id: "sub5", name: "English", grade: "6", board: "CBSE" },
  { id: "sub6", name: "English", grade: "7", board: "CBSE" },
];

export const CHAPTERS: Chapter[] = [
  { id: "ch1", subjectId: "sub1", title: "Integers", order: 1 },
  { id: "ch2", subjectId: "sub1", title: "Fractions", order: 2 },
  { id: "ch3", subjectId: "sub2", title: "Components of Food", order: 1 },
  { id: "ch4", subjectId: "sub2", title: "Sorting Materials", order: 2 },
  { id: "ch5", subjectId: "sub3", title: "Algebraic Expressions", order: 1 },
  { id: "ch6", subjectId: "sub4", title: "Heat", order: 1 },
  { id: "ch7", subjectId: "sub5", title: "Prose - A Tale of Two Birds", order: 1 },
  { id: "ch8", subjectId: "sub6", title: "Three Questions", order: 1 },
];

export const LESSONS: Lesson[] = [
  {
    id: "lesson1",
    chapterId: "ch1",
    title: "Introduction to Integers",
    objectives: ["Understand positive and negative numbers", "Represent integers on number line"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "Integers are a set of numbers that include all the whole numbers (0, 1, 2, 3...) and their negative counterparts (-1, -2, -3...). Unlike fractions or decimals, integers represent complete, whole units.\n\nThink of them as steps on a staircase: you can go up (positive), down (negative), or stand on the landing (zero). They are fundamental to algebra and help us describe real-world concepts like temperature, elevation, and financial debt." }),
      makeBlock("EXAMPLE", { text: "Real World Example 1: Temperature\n\nIf the temperature is 5 degrees above zero, we write it as +5°C. If it drops to 3 degrees below zero, it's represented as an integer: -3°C." }),
      makeBlock("EXAMPLE", { text: "Real World Example 2: Finance\n\nDepositing $100 into a bank account represents a positive integer (+100). Withdrawing $50 represents a negative integer (-50)." }),
      makeBlock("EXAMPLE", { text: "Real World Example 3: Elevation\n\nSea level is represented by the integer 0. A mountain peak might be at +3000 meters, while a submarine sits at -500 meters." }),
      makeBlock("IMAGE", { url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80", alt: "Classroom chalkboard with math" }),
      makeBlock("IMAGE", { url: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80", alt: "Financial math visualization" }),
      makeBlock("IMAGE", { url: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80", alt: "Thermometer showing below zero" }),
    ],
    order: 1,
  },
  {
    id: "lesson2",
    chapterId: "ch1",
    title: "Addition of Integers",
    objectives: ["Add integers with same and different signs"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "When adding integers, you must pay close attention to their signs:\n\n1. Same Signs: Add their absolute values and keep the common sign. (e.g., positive + positive = positive)\n\n2. Different Signs: Subtract the smaller absolute value from the larger one, and keep the sign of the number with the larger absolute value. Think of it as a tug-of-war between positive and negative forces!" }),
      makeBlock("EXAMPLE", { text: "Example 1 (Same Signs):\n\n(+5) + (+3) = +8\n(-5) + (-3) = -8\n\nBoth numbers pull in the same direction, so their forces combine." }),
      makeBlock("EXAMPLE", { text: "Example 2 (Different Signs):\n\n(+7) + (-3) = +4\n(-8) + (+2) = -6\n\nThe number with the larger absolute value determines the final sign." }),
      makeBlock("IMAGE", { url: "https://images.unsplash.com/photo-1632516444655-32bdc36d013f?w=800&q=80", alt: "Abstract math representation" }),
      makeBlock("IMAGE", { url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80", alt: "Books and learning materials" }),
    ],
    order: 2,
  },
  {
    id: "lesson3",
    chapterId: "ch2",
    title: "Understanding Fractions",
    objectives: ["Define fraction", "Identify numerator and denominator"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "A fraction represents a part of a whole. It is written as a/b where a is numerator and b is denominator." }),
      makeBlock("EXAMPLE", { text: "1/2 means one part out of two equal parts." }),
    ],
    order: 1,
  },
  {
    id: "lesson4",
    chapterId: "ch3",
    title: "Nutrients in Food",
    objectives: ["Identify major nutrients", "Understand their functions"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "Food contains carbohydrates, proteins, fats, vitamins, and minerals. Each has a specific function." }),
      makeBlock("EXAMPLE", { text: "Rice and bread are rich in carbohydrates." }),
    ],
    order: 1,
  },
  {
    id: "lesson5",
    chapterId: "ch4",
    title: "Properties of Materials",
    objectives: ["Classify materials by properties"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "Materials can be classified based on hardness, transparency, solubility, and buoyancy." }),
    ],
    order: 1,
  },
  {
    id: "lesson6",
    chapterId: "ch5",
    title: "Variables and Constants",
    objectives: ["Understand algebraic expressions"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "In algebra, we use letters to represent unknown quantities. These are called variables." }),
      makeBlock("EXAMPLE", { text: "In 2x + 5, x is the variable and 5 is the constant." }),
    ],
    order: 1,
  },
  {
    id: "lesson7",
    chapterId: "ch6",
    title: "Heat and Temperature",
    objectives: ["Differentiate heat and temperature"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "Heat is a form of energy. Temperature measures how hot or cold something is." }),
    ],
    order: 1,
  },
  {
    id: "lesson8",
    chapterId: "ch7",
    title: "Summary of A Tale of Two Birds",
    objectives: ["Comprehend the story", "Identify themes"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "The story tells of two birds separated at birth, one raised near robbers, one near a sage. Environment shapes character." }),
    ],
    order: 1,
  },
  {
    id: "lesson9",
    chapterId: "ch8",
    title: "Three Questions - Analysis",
    objectives: ["Understand the moral", "Apply to life"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "The king learns that the most important time is now, the most important person is the one you are with, and the most important thing is to do good." }),
    ],
    order: 1,
  },
  {
    id: "lesson10",
    chapterId: "ch2",
    title: "Equivalent Fractions",
    objectives: ["Find equivalent fractions"],
    contentBlocks: [
      makeBlock("EXPLANATION", { text: "Equivalent fractions represent the same value. 1/2 = 2/4 = 3/6" }),
    ],
    order: 2,
  },
];

export const CLASS_SECTIONS: ClassSection[] = [
  { id: "cs1", grade: "6", sectionName: "A", teacherIds: ["teacher1"], studentIds: ["student1", "student2"], subjectIds: ["sub1", "sub2", "sub5"] },
  { id: "cs2", grade: "6", sectionName: "B", teacherIds: ["teacher2"], studentIds: ["student3"], subjectIds: ["sub1", "sub2", "sub5"] },
  { id: "cs3", grade: "7", sectionName: "A", teacherIds: ["teacher1"], studentIds: [], subjectIds: ["sub3", "sub4", "sub6"] },
];

export const ASSIGNMENTS: Assignment[] = [
  { id: "a1", classSectionId: "cs1", subjectId: "sub1", title: "Integers Worksheet", dueDate: "2025-02-28", description: "Complete exercises 1-10" },
  { id: "a2", classSectionId: "cs1", subjectId: "sub2", title: "Nutrients Report", dueDate: "2025-03-01", description: "Write a report on nutrients" },
  { id: "a3", classSectionId: "cs1", subjectId: "sub1", title: "Fractions Practice", dueDate: "2025-02-25", description: "Solve fraction problems" },
  { id: "a4", classSectionId: "cs2", subjectId: "sub1", title: "Integers Homework", dueDate: "2025-02-27" },
  { id: "a5", classSectionId: "cs1", subjectId: "sub5", title: "Story Summary", dueDate: "2025-03-05" },
  { id: "a6", classSectionId: "cs3", subjectId: "sub3", title: "Algebra Basics", dueDate: "2025-03-02" },
  { id: "a7", classSectionId: "cs1", subjectId: "sub1", title: "Integer Addition", dueDate: "2025-02-20" },
  { id: "a8", classSectionId: "cs1", subjectId: "sub2", title: "Materials Project", dueDate: "2025-03-10" },
  { id: "a9", classSectionId: "cs2", subjectId: "sub2", title: "Science Quiz Prep", dueDate: "2025-02-26" },
  { id: "a10", classSectionId: "cs1", subjectId: "sub5", title: "Comprehension Questions", dueDate: "2025-03-08" },
];

export const SUBMISSIONS: Submission[] = (() => {
  const subs: Submission[] = [];
  const students = ["student1", "student2", "student3"];
  const statuses: Submission["status"][] = ["PENDING", "SUBMITTED", "GRADED", "LATE"];
  let idx = 0;
  for (const a of ASSIGNMENTS) {
    const classSec = CLASS_SECTIONS.find((c) => c.id === a.classSectionId);
    const stuIds = classSec?.studentIds ?? [];
    for (const sid of stuIds.slice(0, 2)) {
      subs.push({
        id: `sub${++idx}`,
        assignmentId: a.id,
        studentId: sid,
        status: statuses[idx % 4],
        score: statuses[idx % 4] === "GRADED" ? 70 + (idx % 30) : undefined,
        feedback: statuses[idx % 4] === "GRADED" ? "Good work. Pay attention to negative signs." : undefined,
        submittedAt: statuses[idx % 4] !== "PENDING" ? "2025-02-23T10:00:00Z" : undefined,
      });
    }
  }
  return subs;
})();

const makeQuizQuestions = (n: number): QuizQuestion[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `q${i + 1}`,
    question: `Sample question ${i + 1}?`,
    options: ["A", "B", "C", "D"],
    correctAnswer: 0,
    type: "MCQ" as const,
  }));

export const QUIZZES: Quiz[] = [
  { id: "qz1", classSectionId: "cs1", title: "Integers Quiz", questions: makeQuizQuestions(5), timeLimit: 15 },
  { id: "qz2", classSectionId: "cs1", title: "Fractions Quiz", questions: makeQuizQuestions(5), timeLimit: 10 },
  { id: "qz3", classSectionId: "cs1", title: "Science Chapter 1", questions: makeQuizQuestions(8), timeLimit: 20 },
  { id: "qz4", classSectionId: "cs2", title: "Math Assessment", questions: makeQuizQuestions(10), timeLimit: 25 },
  { id: "qz5", classSectionId: "cs3", title: "Algebra Test", questions: makeQuizQuestions(6), timeLimit: 15 },
];

export const ATTENDANCE_SESSIONS: AttendanceSession[] = (() => {
  const sessions: AttendanceSession[] = [];
  const today = new Date();
  for (let d = 0; d < 14; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    for (const cs of CLASS_SECTIONS) {
      sessions.push({
        id: `att-${cs.id}-${date.toISOString().slice(0, 10)}`,
        classSectionId: cs.id,
        date: date.toISOString().slice(0, 10),
        presentStudentIds: cs.studentIds.slice(0, Math.ceil(cs.studentIds.length * 0.85)),
        notes: d === 0 ? "All good" : undefined,
      });
    }
  }
  return sessions;
})();

export const ANNOUNCEMENTS: Announcement[] = [
  { id: "ann1", scope: "SCHOOL", title: "Annual Day Rehearsal", body: "Rehearsals will begin next week. All participants please report to the auditorium.", createdAt: "2025-02-20T09:00:00Z", authorId: "admin1" },
  { id: "ann2", scope: "SCHOOL", title: "Holiday Notice", body: "School will remain closed on 26th Jan for Republic Day.", createdAt: "2025-02-18T10:00:00Z", authorId: "admin1" },
  { id: "ann3", scope: "CLASS", scopeId: "cs1", title: "Math Test Date", body: "Unit test on Integers scheduled for 28th Feb.", createdAt: "2025-02-22T11:00:00Z", authorId: "teacher1" },
  { id: "ann4", scope: "SCHOOL", title: "PTM Schedule", body: "Parent-Teacher meetings will be held on 5th March.", createdAt: "2025-02-19T09:00:00Z", authorId: "admin1" },
  { id: "ann5", scope: "CLASS", scopeId: "cs1", title: "Science Project", body: "Submit your project by 1st March.", createdAt: "2025-02-21T14:00:00Z", authorId: "teacher1" },
  { id: "ann6", scope: "SCHOOL", title: "Library Hours", body: "Library extended hours during exam prep: 7 AM - 6 PM.", createdAt: "2025-02-17T08:00:00Z", authorId: "admin1" },
  { id: "ann7", scope: "CLASS", scopeId: "cs2", title: "Homework Reminder", body: "Complete the Fractions worksheet before next class.", createdAt: "2025-02-23T09:00:00Z", authorId: "teacher2" },
  { id: "ann8", scope: "SCHOOL", title: "Sports Day", body: "Annual Sports Day on 15th March. Register with PE teacher.", createdAt: "2025-02-16T10:00:00Z", authorId: "admin1" },
  { id: "ann9", scope: "CLASS", scopeId: "cs1", title: "English Assignment", body: "Read Chapter 2 and write a summary.", createdAt: "2025-02-24T08:00:00Z", authorId: "teacher1" },
  { id: "ann10", scope: "SCHOOL", title: "Fee Payment", body: "Last date for fee payment: 28th Feb. Late fees apply thereafter.", createdAt: "2025-02-15T09:00:00Z", authorId: "admin1" },
];

export const MESSAGE_THREADS: MessageThread[] = [
  {
    id: "mt1",
    participants: ["teacher1", "parent1"],
    messages: [
      { id: "m1", senderId: "parent1", content: "Hi, I wanted to discuss Rahul's progress.", createdAt: "2025-02-23T10:00:00Z" },
      { id: "m2", senderId: "teacher1", content: "Sure. Rahul is doing well in Math. I'll share detailed feedback during PTM.", createdAt: "2025-02-23T11:00:00Z" },
    ],
  },
  {
    id: "mt2",
    participants: ["teacher1", "student1"],
    messages: [
      { id: "m3", senderId: "student1", content: "Ma'am, I have a doubt in the fractions lesson.", createdAt: "2025-02-24T09:00:00Z" },
      { id: "m4", senderId: "teacher1", content: "Please come during break. I'll explain.", createdAt: "2025-02-24T09:15:00Z" },
    ],
  },
];

export const SCHEDULES: ClassSchedule[] = (() => {
  const scheds: ClassSchedule[] = [];
  let idAcc = 1;
  const today = new Date();
  
  for (const cs of CLASS_SECTIONS) {
    for (const subId of cs.subjectIds) {
      // 4 past, 4 future for each class-subject
      for (let i = -4; i < 4; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        scheds.push({
          id: `sched_${idAcc++}`,
          classSectionId: cs.id,
          subjectId: subId,
          date: d.toISOString().slice(0, 10),
          startTime: "10:00",
          endTime: "11:00",
          topic: `Topic ${i + 5} for ${subId}`,
          lessonId: (idAcc % 2 === 0) ? "lesson1" : undefined,
          type: "Regular",
          status: i < 0 ? "Completed" : "Planned"
        });
      }
    }
  }
  return scheds;
})();

export const MATERIALS: Material[] = (() => {
  const mats: Material[] = [];
  let idAcc = 1;
  const types: Material["type"][] = ["PDF", "PPT", "Video", "Worksheet"];
  
  for (const cs of CLASS_SECTIONS) {
    for (const subId of cs.subjectIds) {
      for (let i = 1; i <= 5; i++) {
        mats.push({
          id: `mat_${idAcc++}`,
          classSectionId: cs.id,
          subjectId: subId,
          title: `Resource ${i} - ${types[i % 4]}`,
          type: types[i % 4],
          attachedTo: i % 2 === 0 ? "Lesson" : "Subject",
          lessonId: i % 2 === 0 ? "lesson1" : undefined,
          visibility: i === 5 ? "Teacher Only" : "Students",
          uploadedAt: new Date().toISOString()
        });
      }
    }
  }
  return mats;
})();

export function getFullSeed() {
  return {
    users: DEMO_USERS,
    school: SCHOOL,
    classSections: CLASS_SECTIONS,
    subjects: SUBJECTS,
    chapters: CHAPTERS,
    lessons: LESSONS,
    assignments: ASSIGNMENTS,
    submissions: SUBMISSIONS,
    quizzes: QUIZZES,
    attendanceSessions: ATTENDANCE_SESSIONS,
    announcements: ANNOUNCEMENTS,
    messageThreads: MESSAGE_THREADS,
    savedLessonPlans: [],
    schedules: SCHEDULES,
    materials: MATERIALS,
  };
}
