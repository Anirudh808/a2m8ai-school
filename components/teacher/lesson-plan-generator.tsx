"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RefreshCw, Save } from "lucide-react";

interface LessonPlanGeneratorProps {
  classSectionId: string;
  classSection: { grade: string; subjectIds: string[] };
  subjects: { id: string; name: string; grade: string }[];
  chapters: { id: string; subjectId: string; title: string }[];
  lessons: { id: string; chapterId: string; title: string; objectives: string[] }[];
}

// Mock AI generation
function mockGenerateExplanation(
  lesson: { title: string; objectives: string[] },
  subject: string,
  grade: string
): string {
  return `# ${lesson.title}\n\n## Overview\nThis lesson covers the key concepts of ${lesson.title.toLowerCase()} in ${subject}. It is designed for Grade ${grade} students.\n\n## Topics & Subtopics\n${lesson.objectives.map((o, i) => `${i + 1}. **${o}**\n   - Detailed explanation of the concept\n   - Step-by-step breakdown for clarity\n`).join("")}\n\n## Key Takeaways\n- Students will understand the fundamental principles\n- Practical applications will be demonstrated\n- Assessment will cover the learning objectives`;
}

function mockGenerateExamples(lesson: { title: string }, subject: string): string {
  return `## Example Problems\n\n### Example 1\n**Problem:** A typical problem based on ${lesson.title}\n**Solution:** Step 1 - Identify the key elements. Step 2 - Apply the formula/method. Step 3 - Verify the result.\n\n### Example 2\n**Real-world use case:** How ${lesson.title} applies in everyday situations.\n**Application:** Connect theory to practical scenarios students can relate to.\n\n### Example 3\n**Common mistake:** What students often get wrong and how to avoid it.`;
}

function mockGenerateImageRefs(lesson: { title: string }): string[] {
  return [
    `[Figure 1] Diagram showing ${lesson.title} - Number line / Concept map`,
    `[Figure 2] Real-world illustration - Photo or illustration`,
    `[Figure 3] Step-by-step visual - Process diagram`,
  ];
}

export function LessonPlanGenerator({
  classSectionId,
  classSection,
  subjects,
  chapters,
  lessons,
}: LessonPlanGeneratorProps) {
  const [subjectId, setSubjectId] = useState<string>("");
  const [chapterId, setChapterId] = useState<string>("");
  const [lessonId, setLessonId] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [examples, setExamples] = useState<string>("");
  const [imageRefs, setImageRefs] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const subjectChapters = chapters.filter((c) => c.subjectId === subjectId);
  const chapterLessons = lessons.filter((l) => l.chapterId === chapterId);
  const selectedLesson = lessons.find((l) => l.id === lessonId);
  const selectedSubject = subjects.find((s) => s.id === subjectId);

  const generateAll = useCallback(() => {
    if (!selectedLesson || !selectedSubject) return;
    setExplanation(mockGenerateExplanation(selectedLesson, selectedSubject.name, classSection.grade));
    setExamples(mockGenerateExamples(selectedLesson, selectedSubject.name));
    setImageRefs(mockGenerateImageRefs(selectedLesson));
  }, [selectedLesson, selectedSubject, classSection.grade]);

  const handleLessonChange = (lid: string) => {
    setLessonId(lid);
    const lesson = lessons.find((l) => l.id === lid);
    const subj = subjects.find((s) => s.id === subjectId);
    if (lesson && subj) {
      setExplanation(mockGenerateExplanation(lesson, subj.name, classSection.grade));
      setExamples(mockGenerateExamples(lesson, subj.name));
      setImageRefs(mockGenerateImageRefs(lesson));
    } else {
      setExplanation("");
      setExamples("");
      setImageRefs([]);
    }
  };

  const handleSave = async () => {
    const res = await fetch("/api/lesson-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        classSectionId,
        subjectId,
        chapterId,
        lessonId,
        explanation,
        examples,
        imageRefs,
      }),
    });
    if (res.ok) setSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Select Chapter & Lesson</h3>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div>
            <label className="mb-1 block text-sm text-slate-500">Subject</label>
            <select
              className="rounded-md border border-slate-200 px-3 py-2 text-sm"
              value={subjectId}
              onChange={(e) => {
                setSubjectId(e.target.value);
                setChapterId("");
                setLessonId("");
                setExplanation("");
                setExamples("");
                setImageRefs([]);
              }}
            >
              <option value="">Select subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-500">Chapter</label>
            <select
              className="rounded-md border border-slate-200 px-3 py-2 text-sm"
              value={chapterId}
              onChange={(e) => {
                setChapterId(e.target.value);
                setLessonId("");
                setExplanation("");
                setExamples("");
                setImageRefs([]);
              }}
            >
              <option value="">Select chapter</option>
              {subjectChapters.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-500">Lesson</label>
            <select
              className="rounded-md border border-slate-200 px-3 py-2 text-sm"
              value={lessonId}
              onChange={(e) => handleLessonChange(e.target.value)}
            >
              <option value="">Select lesson</option>
              {chapterLessons.map((l) => (
                <option key={l.id} value={l.id}>{l.title}</option>
              ))}
            </select>
          </div>
          {lessonId && (
            <Button onClick={generateAll} size="sm" className="self-end">
              Generate Plan
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Three-pane layout: Explanation (left 50%), Examples (top right), Images (bottom right) */}
      {(explanation || examples || imageRefs.length > 0) && (
        <div className="grid min-h-[500px] grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-2">
          {/* Left: Explanation - 50% width, full height (spans 2 rows) */}
          <div className="lg:row-span-2 lg:min-h-[400px]">
            <Card className="flex h-full flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="font-semibold">1. Lesson Explanation</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedLesson && selectedSubject && setExplanation(mockGenerateExplanation(selectedLesson, selectedSubject.name, classSection.grade))}
                >
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Regenerate
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-slate-700">
                  {explanation}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top right: Examples */}
          <div className="min-h-[200px]">
            <Card className="flex h-full flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="font-semibold">2. Examples</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedLesson && selectedSubject && setExamples(mockGenerateExamples(selectedLesson, selectedSubject.name))}
                >
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Regenerate
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-slate-700">
                  {examples}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom right: Image references */}
          <div className="min-h-[200px]">
            <Card className="flex h-full flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="font-semibold">3. Supporting Image References</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedLesson && setImageRefs(mockGenerateImageRefs(selectedLesson))}
                >
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Regenerate
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-700">
                  {imageRefs.map((ref, i) => (
                    <li key={i} className="rounded bg-slate-50 p-2">{ref}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Save */}
      {(explanation || examples || imageRefs.length > 0) && (
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saved}>
            <Save className="mr-2 h-4 w-4" />
            {saved ? "Saved" : "Save Lesson Plan"}
          </Button>
        </div>
      )}

      {!subjectId && (
        <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
          Select a subject, chapter, and lesson to generate a lesson plan.
        </p>
      )}
    </div>
  );
}
