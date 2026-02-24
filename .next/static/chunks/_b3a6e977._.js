(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/seed.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANNOUNCEMENTS",
    ()=>ANNOUNCEMENTS,
    "ASSIGNMENTS",
    ()=>ASSIGNMENTS,
    "ATTENDANCE_SESSIONS",
    ()=>ATTENDANCE_SESSIONS,
    "CHAPTERS",
    ()=>CHAPTERS,
    "CLASS_SECTIONS",
    ()=>CLASS_SECTIONS,
    "DEMO_USERS",
    ()=>DEMO_USERS,
    "LESSONS",
    ()=>LESSONS,
    "MATERIALS",
    ()=>MATERIALS,
    "MESSAGE_THREADS",
    ()=>MESSAGE_THREADS,
    "QUIZZES",
    ()=>QUIZZES,
    "SCHEDULES",
    ()=>SCHEDULES,
    "SCHOOL",
    ()=>SCHOOL,
    "SUBJECTS",
    ()=>SUBJECTS,
    "SUBMISSIONS",
    ()=>SUBMISSIONS,
    "getFullSeed",
    ()=>getFullSeed
]);
const DEMO_USERS = [
    {
        id: "admin1",
        role: "ADMIN",
        name: "Principal Sharma",
        email: "admin@school.edu",
        schoolId: "school1",
        planId: "premium_plus"
    },
    {
        id: "teacher1",
        role: "TEACHER",
        name: "Ms. Anita Roy",
        email: "anita@school.edu",
        schoolId: "school1",
        planId: "premium"
    },
    {
        id: "teacher2",
        role: "TEACHER",
        name: "Mr. Vikram Singh",
        email: "vikram@school.edu",
        schoolId: "school1",
        planId: "premium"
    },
    {
        id: "student1",
        role: "STUDENT",
        name: "Rahul Verma",
        email: "rahul@school.edu",
        schoolId: "school1",
        planId: "premium"
    },
    {
        id: "student2",
        role: "STUDENT",
        name: "Priya Patel",
        email: "priya@school.edu",
        schoolId: "school1",
        planId: "basic"
    },
    {
        id: "student3",
        role: "STUDENT",
        name: "Arjun Kumar",
        email: "arjun@school.edu",
        schoolId: "school1",
        planId: "premium_plus"
    },
    {
        id: "parent1",
        role: "PARENT",
        name: "Mr. Verma",
        email: "verma@email.com",
        schoolId: "school1",
        childrenIds: [
            "student1"
        ],
        planId: "premium"
    },
    {
        id: "parent2",
        role: "PARENT",
        name: "Mrs. Patel",
        email: "patel@email.com",
        schoolId: "school1",
        childrenIds: [
            "student2"
        ],
        planId: "basic"
    }
];
const SCHOOL = {
    id: "school1",
    name: "Sunrise International School",
    board: "CBSE",
    academicYear: "2024-25",
    grades: [
        "6",
        "7",
        "8"
    ],
    sections: [
        "A",
        "B"
    ]
};
const makeBlock = (type, data)=>({
        id: "block-".concat(Math.random().toString(36).slice(2, 9)),
        type,
        data
    });
const SUBJECTS = [
    {
        id: "sub1",
        name: "Mathematics",
        grade: "6",
        board: "CBSE"
    },
    {
        id: "sub2",
        name: "Science",
        grade: "6",
        board: "CBSE"
    },
    {
        id: "sub3",
        name: "Mathematics",
        grade: "7",
        board: "CBSE"
    },
    {
        id: "sub4",
        name: "Science",
        grade: "7",
        board: "CBSE"
    },
    {
        id: "sub5",
        name: "English",
        grade: "6",
        board: "CBSE"
    },
    {
        id: "sub6",
        name: "English",
        grade: "7",
        board: "CBSE"
    }
];
const CHAPTERS = [
    {
        id: "ch1",
        subjectId: "sub1",
        title: "Integers",
        order: 1
    },
    {
        id: "ch2",
        subjectId: "sub1",
        title: "Fractions",
        order: 2
    },
    {
        id: "ch3",
        subjectId: "sub2",
        title: "Components of Food",
        order: 1
    },
    {
        id: "ch4",
        subjectId: "sub2",
        title: "Sorting Materials",
        order: 2
    },
    {
        id: "ch5",
        subjectId: "sub3",
        title: "Algebraic Expressions",
        order: 1
    },
    {
        id: "ch6",
        subjectId: "sub4",
        title: "Heat",
        order: 1
    },
    {
        id: "ch7",
        subjectId: "sub5",
        title: "Prose - A Tale of Two Birds",
        order: 1
    },
    {
        id: "ch8",
        subjectId: "sub6",
        title: "Three Questions",
        order: 1
    }
];
const LESSONS = [
    {
        id: "lesson1",
        chapterId: "ch1",
        title: "Introduction to Integers",
        objectives: [
            "Understand positive and negative numbers",
            "Represent integers on number line"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "Integers are a set of numbers that include all the whole numbers (0, 1, 2, 3...) and their negative counterparts (-1, -2, -3...). Unlike fractions or decimals, integers represent complete, whole units.\n\nThink of them as steps on a staircase: you can go up (positive), down (negative), or stand on the landing (zero). They are fundamental to algebra and help us describe real-world concepts like temperature, elevation, and financial debt."
            }),
            makeBlock("EXAMPLE", {
                text: "Real World Example 1: Temperature\n\nIf the temperature is 5 degrees above zero, we write it as +5°C. If it drops to 3 degrees below zero, it's represented as an integer: -3°C."
            }),
            makeBlock("EXAMPLE", {
                text: "Real World Example 2: Finance\n\nDepositing $100 into a bank account represents a positive integer (+100). Withdrawing $50 represents a negative integer (-50)."
            }),
            makeBlock("EXAMPLE", {
                text: "Real World Example 3: Elevation\n\nSea level is represented by the integer 0. A mountain peak might be at +3000 meters, while a submarine sits at -500 meters."
            }),
            makeBlock("IMAGE", {
                url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
                alt: "Classroom chalkboard with math"
            }),
            makeBlock("IMAGE", {
                url: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80",
                alt: "Financial math visualization"
            }),
            makeBlock("IMAGE", {
                url: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80",
                alt: "Thermometer showing below zero"
            })
        ],
        order: 1
    },
    {
        id: "lesson2",
        chapterId: "ch1",
        title: "Addition of Integers",
        objectives: [
            "Add integers with same and different signs"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "When adding integers, you must pay close attention to their signs:\n\n1. Same Signs: Add their absolute values and keep the common sign. (e.g., positive + positive = positive)\n\n2. Different Signs: Subtract the smaller absolute value from the larger one, and keep the sign of the number with the larger absolute value. Think of it as a tug-of-war between positive and negative forces!"
            }),
            makeBlock("EXAMPLE", {
                text: "Example 1 (Same Signs):\n\n(+5) + (+3) = +8\n(-5) + (-3) = -8\n\nBoth numbers pull in the same direction, so their forces combine."
            }),
            makeBlock("EXAMPLE", {
                text: "Example 2 (Different Signs):\n\n(+7) + (-3) = +4\n(-8) + (+2) = -6\n\nThe number with the larger absolute value determines the final sign."
            }),
            makeBlock("IMAGE", {
                url: "https://images.unsplash.com/photo-1632516444655-32bdc36d013f?w=800&q=80",
                alt: "Abstract math representation"
            }),
            makeBlock("IMAGE", {
                url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80",
                alt: "Books and learning materials"
            })
        ],
        order: 2
    },
    {
        id: "lesson3",
        chapterId: "ch2",
        title: "Understanding Fractions",
        objectives: [
            "Define fraction",
            "Identify numerator and denominator"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "A fraction represents a part of a whole. It is written as a/b where a is numerator and b is denominator."
            }),
            makeBlock("EXAMPLE", {
                text: "1/2 means one part out of two equal parts."
            })
        ],
        order: 1
    },
    {
        id: "lesson4",
        chapterId: "ch3",
        title: "Nutrients in Food",
        objectives: [
            "Identify major nutrients",
            "Understand their functions"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "Food contains carbohydrates, proteins, fats, vitamins, and minerals. Each has a specific function."
            }),
            makeBlock("EXAMPLE", {
                text: "Rice and bread are rich in carbohydrates."
            })
        ],
        order: 1
    },
    {
        id: "lesson5",
        chapterId: "ch4",
        title: "Properties of Materials",
        objectives: [
            "Classify materials by properties"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "Materials can be classified based on hardness, transparency, solubility, and buoyancy."
            })
        ],
        order: 1
    },
    {
        id: "lesson6",
        chapterId: "ch5",
        title: "Variables and Constants",
        objectives: [
            "Understand algebraic expressions"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "In algebra, we use letters to represent unknown quantities. These are called variables."
            }),
            makeBlock("EXAMPLE", {
                text: "In 2x + 5, x is the variable and 5 is the constant."
            })
        ],
        order: 1
    },
    {
        id: "lesson7",
        chapterId: "ch6",
        title: "Heat and Temperature",
        objectives: [
            "Differentiate heat and temperature"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "Heat is a form of energy. Temperature measures how hot or cold something is."
            })
        ],
        order: 1
    },
    {
        id: "lesson8",
        chapterId: "ch7",
        title: "Summary of A Tale of Two Birds",
        objectives: [
            "Comprehend the story",
            "Identify themes"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "The story tells of two birds separated at birth, one raised near robbers, one near a sage. Environment shapes character."
            })
        ],
        order: 1
    },
    {
        id: "lesson9",
        chapterId: "ch8",
        title: "Three Questions - Analysis",
        objectives: [
            "Understand the moral",
            "Apply to life"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "The king learns that the most important time is now, the most important person is the one you are with, and the most important thing is to do good."
            })
        ],
        order: 1
    },
    {
        id: "lesson10",
        chapterId: "ch2",
        title: "Equivalent Fractions",
        objectives: [
            "Find equivalent fractions"
        ],
        contentBlocks: [
            makeBlock("EXPLANATION", {
                text: "Equivalent fractions represent the same value. 1/2 = 2/4 = 3/6"
            })
        ],
        order: 2
    }
];
const CLASS_SECTIONS = [
    {
        id: "cs1",
        grade: "6",
        sectionName: "A",
        teacherIds: [
            "teacher1"
        ],
        studentIds: [
            "student1",
            "student2"
        ],
        subjectIds: [
            "sub1",
            "sub2",
            "sub5"
        ]
    },
    {
        id: "cs2",
        grade: "6",
        sectionName: "B",
        teacherIds: [
            "teacher2"
        ],
        studentIds: [
            "student3"
        ],
        subjectIds: [
            "sub1",
            "sub2",
            "sub5"
        ]
    },
    {
        id: "cs3",
        grade: "7",
        sectionName: "A",
        teacherIds: [
            "teacher1"
        ],
        studentIds: [],
        subjectIds: [
            "sub3",
            "sub4",
            "sub6"
        ]
    }
];
const ASSIGNMENTS = [
    {
        id: "a1",
        classSectionId: "cs1",
        subjectId: "sub1",
        title: "Integers Worksheet",
        dueDate: "2025-02-28",
        description: "Complete exercises 1-10"
    },
    {
        id: "a2",
        classSectionId: "cs1",
        subjectId: "sub2",
        title: "Nutrients Report",
        dueDate: "2025-03-01",
        description: "Write a report on nutrients"
    },
    {
        id: "a3",
        classSectionId: "cs1",
        subjectId: "sub1",
        title: "Fractions Practice",
        dueDate: "2025-02-25",
        description: "Solve fraction problems"
    },
    {
        id: "a4",
        classSectionId: "cs2",
        subjectId: "sub1",
        title: "Integers Homework",
        dueDate: "2025-02-27"
    },
    {
        id: "a5",
        classSectionId: "cs1",
        subjectId: "sub5",
        title: "Story Summary",
        dueDate: "2025-03-05"
    },
    {
        id: "a6",
        classSectionId: "cs3",
        subjectId: "sub3",
        title: "Algebra Basics",
        dueDate: "2025-03-02"
    },
    {
        id: "a7",
        classSectionId: "cs1",
        subjectId: "sub1",
        title: "Integer Addition",
        dueDate: "2025-02-20"
    },
    {
        id: "a8",
        classSectionId: "cs1",
        subjectId: "sub2",
        title: "Materials Project",
        dueDate: "2025-03-10"
    },
    {
        id: "a9",
        classSectionId: "cs2",
        subjectId: "sub2",
        title: "Science Quiz Prep",
        dueDate: "2025-02-26"
    },
    {
        id: "a10",
        classSectionId: "cs1",
        subjectId: "sub5",
        title: "Comprehension Questions",
        dueDate: "2025-03-08"
    }
];
const SUBMISSIONS = (()=>{
    const subs = [];
    const students = [
        "student1",
        "student2",
        "student3"
    ];
    const statuses = [
        "PENDING",
        "SUBMITTED",
        "GRADED",
        "LATE"
    ];
    let idx = 0;
    for (const a of ASSIGNMENTS){
        const classSec = CLASS_SECTIONS.find((c)=>c.id === a.classSectionId);
        var _classSec_studentIds;
        const stuIds = (_classSec_studentIds = classSec === null || classSec === void 0 ? void 0 : classSec.studentIds) !== null && _classSec_studentIds !== void 0 ? _classSec_studentIds : [];
        for (const sid of stuIds.slice(0, 2)){
            subs.push({
                id: "sub".concat(++idx),
                assignmentId: a.id,
                studentId: sid,
                status: statuses[idx % 4],
                score: statuses[idx % 4] === "GRADED" ? 70 + idx % 30 : undefined,
                feedback: statuses[idx % 4] === "GRADED" ? "Good work. Pay attention to negative signs." : undefined,
                submittedAt: statuses[idx % 4] !== "PENDING" ? "2025-02-23T10:00:00Z" : undefined
            });
        }
    }
    return subs;
})();
const makeQuizQuestions = (n)=>Array.from({
        length: n
    }, (_, i)=>({
            id: "q".concat(i + 1),
            question: "Sample question ".concat(i + 1, "?"),
            options: [
                "A",
                "B",
                "C",
                "D"
            ],
            correctAnswer: 0,
            type: "MCQ"
        }));
const QUIZZES = [
    {
        id: "qz1",
        classSectionId: "cs1",
        title: "Integers Quiz",
        questions: makeQuizQuestions(5),
        timeLimit: 15
    },
    {
        id: "qz2",
        classSectionId: "cs1",
        title: "Fractions Quiz",
        questions: makeQuizQuestions(5),
        timeLimit: 10
    },
    {
        id: "qz3",
        classSectionId: "cs1",
        title: "Science Chapter 1",
        questions: makeQuizQuestions(8),
        timeLimit: 20
    },
    {
        id: "qz4",
        classSectionId: "cs2",
        title: "Math Assessment",
        questions: makeQuizQuestions(10),
        timeLimit: 25
    },
    {
        id: "qz5",
        classSectionId: "cs3",
        title: "Algebra Test",
        questions: makeQuizQuestions(6),
        timeLimit: 15
    }
];
const ATTENDANCE_SESSIONS = (()=>{
    const sessions = [];
    const today = new Date();
    for(let d = 0; d < 14; d++){
        const date = new Date(today);
        date.setDate(date.getDate() - d);
        for (const cs of CLASS_SECTIONS){
            sessions.push({
                id: "att-".concat(cs.id, "-").concat(date.toISOString().slice(0, 10)),
                classSectionId: cs.id,
                date: date.toISOString().slice(0, 10),
                presentStudentIds: cs.studentIds.slice(0, Math.ceil(cs.studentIds.length * 0.85)),
                notes: d === 0 ? "All good" : undefined
            });
        }
    }
    return sessions;
})();
const ANNOUNCEMENTS = [
    {
        id: "ann1",
        scope: "SCHOOL",
        title: "Annual Day Rehearsal",
        body: "Rehearsals will begin next week. All participants please report to the auditorium.",
        createdAt: "2025-02-20T09:00:00Z",
        authorId: "admin1"
    },
    {
        id: "ann2",
        scope: "SCHOOL",
        title: "Holiday Notice",
        body: "School will remain closed on 26th Jan for Republic Day.",
        createdAt: "2025-02-18T10:00:00Z",
        authorId: "admin1"
    },
    {
        id: "ann3",
        scope: "CLASS",
        scopeId: "cs1",
        title: "Math Test Date",
        body: "Unit test on Integers scheduled for 28th Feb.",
        createdAt: "2025-02-22T11:00:00Z",
        authorId: "teacher1"
    },
    {
        id: "ann4",
        scope: "SCHOOL",
        title: "PTM Schedule",
        body: "Parent-Teacher meetings will be held on 5th March.",
        createdAt: "2025-02-19T09:00:00Z",
        authorId: "admin1"
    },
    {
        id: "ann5",
        scope: "CLASS",
        scopeId: "cs1",
        title: "Science Project",
        body: "Submit your project by 1st March.",
        createdAt: "2025-02-21T14:00:00Z",
        authorId: "teacher1"
    },
    {
        id: "ann6",
        scope: "SCHOOL",
        title: "Library Hours",
        body: "Library extended hours during exam prep: 7 AM - 6 PM.",
        createdAt: "2025-02-17T08:00:00Z",
        authorId: "admin1"
    },
    {
        id: "ann7",
        scope: "CLASS",
        scopeId: "cs2",
        title: "Homework Reminder",
        body: "Complete the Fractions worksheet before next class.",
        createdAt: "2025-02-23T09:00:00Z",
        authorId: "teacher2"
    },
    {
        id: "ann8",
        scope: "SCHOOL",
        title: "Sports Day",
        body: "Annual Sports Day on 15th March. Register with PE teacher.",
        createdAt: "2025-02-16T10:00:00Z",
        authorId: "admin1"
    },
    {
        id: "ann9",
        scope: "CLASS",
        scopeId: "cs1",
        title: "English Assignment",
        body: "Read Chapter 2 and write a summary.",
        createdAt: "2025-02-24T08:00:00Z",
        authorId: "teacher1"
    },
    {
        id: "ann10",
        scope: "SCHOOL",
        title: "Fee Payment",
        body: "Last date for fee payment: 28th Feb. Late fees apply thereafter.",
        createdAt: "2025-02-15T09:00:00Z",
        authorId: "admin1"
    }
];
const MESSAGE_THREADS = [
    {
        id: "mt1",
        participants: [
            "teacher1",
            "parent1"
        ],
        messages: [
            {
                id: "m1",
                senderId: "parent1",
                content: "Hi, I wanted to discuss Rahul's progress.",
                createdAt: "2025-02-23T10:00:00Z"
            },
            {
                id: "m2",
                senderId: "teacher1",
                content: "Sure. Rahul is doing well in Math. I'll share detailed feedback during PTM.",
                createdAt: "2025-02-23T11:00:00Z"
            }
        ]
    },
    {
        id: "mt2",
        participants: [
            "teacher1",
            "student1"
        ],
        messages: [
            {
                id: "m3",
                senderId: "student1",
                content: "Ma'am, I have a doubt in the fractions lesson.",
                createdAt: "2025-02-24T09:00:00Z"
            },
            {
                id: "m4",
                senderId: "teacher1",
                content: "Please come during break. I'll explain.",
                createdAt: "2025-02-24T09:15:00Z"
            }
        ]
    }
];
const SCHEDULES = (()=>{
    const scheds = [];
    let idAcc = 1;
    const today = new Date();
    for (const cs of CLASS_SECTIONS){
        for (const subId of cs.subjectIds){
            // 4 past, 4 future for each class-subject
            for(let i = -4; i < 4; i++){
                const d = new Date(today);
                d.setDate(today.getDate() + i);
                scheds.push({
                    id: "sched_".concat(idAcc++),
                    classSectionId: cs.id,
                    subjectId: subId,
                    date: d.toISOString().slice(0, 10),
                    startTime: "10:00",
                    endTime: "11:00",
                    topic: "Topic ".concat(i + 5, " for ").concat(subId),
                    lessonId: idAcc % 2 === 0 ? "lesson1" : undefined,
                    type: "Regular",
                    status: i < 0 ? "Completed" : "Planned"
                });
            }
        }
    }
    return scheds;
})();
const MATERIALS = (()=>{
    const mats = [];
    let idAcc = 1;
    const types = [
        "PDF",
        "PPT",
        "Video",
        "Worksheet"
    ];
    for (const cs of CLASS_SECTIONS){
        for (const subId of cs.subjectIds){
            for(let i = 1; i <= 5; i++){
                mats.push({
                    id: "mat_".concat(idAcc++),
                    classSectionId: cs.id,
                    subjectId: subId,
                    title: "Resource ".concat(i, " - ").concat(types[i % 4]),
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
function getFullSeed() {
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
        materials: MATERIALS
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStore",
    ()=>getStore,
    "resetStore",
    ()=>resetStore,
    "updateStore",
    ()=>updateStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/seed.ts [app-client] (ecmascript)");
;
let store = {
    users: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_USERS"]
    ],
    school: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCHOOL"]
    },
    classSections: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLASS_SECTIONS"]
    ],
    subjects: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUBJECTS"]
    ],
    chapters: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAPTERS"]
    ],
    lessons: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LESSONS"]
    ],
    assignments: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ASSIGNMENTS"]
    ],
    submissions: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUBMISSIONS"]
    ],
    quizzes: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUIZZES"]
    ],
    attendanceSessions: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ATTENDANCE_SESSIONS"]
    ],
    announcements: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANNOUNCEMENTS"]
    ],
    messageThreads: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MESSAGE_THREADS"]
    ],
    liveSessions: [],
    savedLessonPlans: [],
    schedules: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCHEDULES"]
    ],
    materials: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MATERIALS"]
    ]
};
function getStore() {
    return store;
}
function resetStore() {
    const seed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFullSeed"])();
    store = {
        users: [
            ...seed.users
        ],
        school: {
            ...seed.school
        },
        classSections: [
            ...seed.classSections
        ],
        subjects: [
            ...seed.subjects
        ],
        chapters: [
            ...seed.chapters
        ],
        lessons: [
            ...seed.lessons
        ],
        assignments: [
            ...seed.assignments
        ],
        submissions: [
            ...seed.submissions
        ],
        quizzes: [
            ...seed.quizzes
        ],
        attendanceSessions: [
            ...seed.attendanceSessions
        ],
        announcements: [
            ...seed.announcements
        ],
        messageThreads: [
            ...seed.messageThreads
        ],
        liveSessions: [],
        savedLessonPlans: [],
        schedules: [
            ...seed.schedules
        ],
        materials: [
            ...seed.materials
        ]
    };
}
function updateStore(key, updater) {
    store[key] = updater(store[key]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(app)/teacher/live/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeacherLiveCalendarPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addDays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfWeek.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isSameDay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfDay.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function TeacherLiveCalendarPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStore"])();
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeacherLiveCalendarPage.useEffect": ()=>{
            const timer = setInterval({
                "TeacherLiveCalendarPage.useEffect.timer": ()=>setNow(new Date())
            }["TeacherLiveCalendarPage.useEffect.timer"], 60000); // update every minute
            return ({
                "TeacherLiveCalendarPage.useEffect": ()=>clearInterval(timer)
            })["TeacherLiveCalendarPage.useEffect"];
        }
    }["TeacherLiveCalendarPage.useEffect"], []);
    // Data fetching logic (mocked)
    const teacherId = "teacher1";
    const myClassSections = store.classSections.filter((c)=>c.teacherIds.includes(teacherId));
    const myClassIds = myClassSections.map((c)=>c.id);
    // Get schedules for my classes
    const mySchedules = store.schedules.filter((s)=>myClassIds.includes(s.classSectionId));
    const weekStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(currentDate, {
        weekStartsOn: 1
    }); // Monday start
    const weekDays = Array.from({
        length: 5
    }).map((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(weekStart, i)); // Mon - Fri
    const hours = Array.from({
        length: 9
    }).map((_, i)=>i + 8); // 8 AM to 4 PM
    const handleNextWeek = ()=>setCurrentDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(currentDate, 7));
    const handlePrevWeek = ()=>setCurrentDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(currentDate, -7));
    const handleToday = ()=>setCurrentDate(new Date());
    const handleJoinClass = (schedule)=>{
        router.push("/teacher/live/mock-session-".concat(schedule.id));
    };
    const getSchedulesForDayAndHour = (day, hour)=>{
        return mySchedules.filter((s)=>{
            const sDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(s.date);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(sDate, day)) return false;
            const sHour = parseInt(s.startTime.split(":")[0], 10);
            const syntheticHour = s.startTime === "10:00" ? 9 + parseInt(s.id.split('_')[1] || "0") % 6 : sHour;
            return syntheticHour === hour;
        });
    };
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const minutesSince8AM = (currentHour - 8) * 60 + currentMinute;
    const topPositionPixels = minutesSince8AM / 60 * 80;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-[calc(100vh-4rem)] bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-semibold text-slate-800 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "h-5 w-5 text-indigo-600"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    "Calendar"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-6 w-px bg-slate-200 hidden sm:block"
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 hidden sm:flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: handleToday,
                                        className: "px-3 h-8 text-sm font-medium",
                                        children: "Today"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center border border-slate-200 rounded-md overflow-hidden ml-2 h-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handlePrevWeek,
                                                className: "px-2 h-full bg-white hover:bg-slate-50 border-r border-slate-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                    className: "h-4 w-4 text-slate-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 22
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleNextWeek,
                                                className: "px-2 h-full bg-white hover:bg-slate-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    className: "h-4 w-4 text-slate-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 22
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-4 text-sm font-medium text-slate-700",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(weekDays[0], "MMMM yyyy")
                                    }, void 0, false, {
                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                        lineNumber: 80,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                        lineNumber: 62,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "hidden sm:flex text-slate-600",
                                children: [
                                    "Work week ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "ml-1 h-3 w-3 rotate-90"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "hidden md:flex text-slate-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 16
                                    }, this),
                                    " Meet now"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                className: "bg-indigo-600 hover:bg-indigo-700 text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                        lineNumber: 93,
                                        columnNumber: 16
                                    }, this),
                                    " New Class"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                        lineNumber: 85,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col min-w-0 overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex border-b border-slate-200 bg-slate-50/50 sticky top-0 z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 shrink-0 border-r border-slate-100"
                                }, void 0, false, {
                                    fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 16
                                }, this),
                                weekDays.map((day, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-[120px] py-3 text-center border-r border-slate-100 relative ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, now) ? 'bg-indigo-50/30' : ''),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-semibold uppercase text-slate-500",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day, "EEE")
                                            }, void 0, false, {
                                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                lineNumber: 106,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl mt-0.5 ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, now) ? 'text-indigo-600 font-bold' : 'text-slate-700'),
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day, "d"),
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, now) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 47
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                lineNumber: 107,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 18
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(app)/teacher/live/page.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex relative bg-white pb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 shrink-0 border-r border-slate-100 relative",
                                    children: hours.map((hour, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-[80px] relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -top-3 right-2 text-xs font-medium text-slate-400",
                                                children: hour > 12 ? "".concat(hour - 12, " PM") : hour === 12 ? '12 PM' : "".concat(hour, " AM")
                                            }, void 0, false, {
                                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                lineNumber: 121,
                                                columnNumber: 22
                                            }, this)
                                        }, hour, false, {
                                            fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                            lineNumber: 120,
                                            columnNumber: 20
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 16
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex",
                                    children: weekDays.map((day, dIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-[120px] border-r border-slate-100 relative ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, now) ? 'bg-indigo-50/10' : ''),
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, now) && topPositionPixels >= 0 && topPositionPixels <= hours.length * 80 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute left-0 right-0 border-t-2 border-rose-500 z-20 pointer-events-none",
                                                    style: {
                                                        top: "".concat(topPositionPixels, "px")
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-rose-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 28
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 25
                                                }, this),
                                                hours.map((hour, hIdx)=>{
                                                    const cellSchedules = getSchedulesForDayAndHour(day, hour);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-[80px] border-b border-slate-100 relative p-1",
                                                        children: cellSchedules.map((schedule, sIdx)=>{
                                                            const classInfo = myClassSections.find((c)=>c.id === schedule.classSectionId);
                                                            const subjectInfo = store.subjects.find((s)=>s.id === schedule.subjectId);
                                                            const classEndDiffMinutes = (hour + 1) * 60; // 1 hr duration
                                                            const isPast = schedule.status === "Completed" || day < (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(now) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(day, now) && classEndDiffMinutes <= currentHour * 60 + currentMinute;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                onClick: ()=>handleJoinClass(schedule),
                                                                className: "\n                                   group cursor-pointer rounded-md p-2 mb-1 shadow-sm border transition-all hover:shadow-md\n                                   ".concat(isPast ? 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-100' : 'bg-indigo-50 border-indigo-200 border-l-4 border-l-indigo-500 hover:bg-indigo-100', "\n                                 "),
                                                                style: {
                                                                    position: 'absolute',
                                                                    top: '4px',
                                                                    left: '4px',
                                                                    right: '4px',
                                                                    height: 'calc(100% - 8px)',
                                                                    zIndex: 5
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-between items-start",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs font-semibold text-slate-900 truncate",
                                                                            children: [
                                                                                subjectInfo === null || subjectInfo === void 0 ? void 0 : subjectInfo.name,
                                                                                " - ",
                                                                                classInfo === null || classInfo === void 0 ? void 0 : classInfo.grade,
                                                                                classInfo === null || classInfo === void 0 ? void 0 : classInfo.sectionName
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                                            lineNumber: 172,
                                                                            columnNumber: 38
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                                        lineNumber: 171,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[10px] text-slate-500 truncate mt-0.5",
                                                                        children: schedule.topic
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                                        lineNumber: 176,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    !isPast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute bottom-1.5 left-2 flex items-center text-[10px] font-medium text-indigo-600",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                                                                className: "w-3 h-3 mr-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                                                lineNumber: 181,
                                                                                columnNumber: 39
                                                                            }, this),
                                                                            "Join Class"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                                        lineNumber: 180,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                ]
                                                            }, schedule.id, true, {
                                                                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                                lineNumber: 152,
                                                                columnNumber: 32
                                                            }, this);
                                                        })
                                                    }, hour, false, {
                                                        fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 26
                                                    }, this);
                                                })
                                            ]
                                        }, dIdx, true, {
                                            fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                            lineNumber: 131,
                                            columnNumber: 20
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(app)/teacher/live/page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 16
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(app)/teacher/live/page.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(app)/teacher/live/page.tsx",
                    lineNumber: 100,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(app)/teacher/live/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(app)/teacher/live/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(TeacherLiveCalendarPage, "p/DIUASVY+LcJZjpyPrwhH5s6v0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TeacherLiveCalendarPage;
var _c;
__turbopack_context__.k.register(_c, "TeacherLiveCalendarPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_b3a6e977._.js.map