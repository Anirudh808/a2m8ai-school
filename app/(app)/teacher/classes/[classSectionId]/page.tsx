"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonPlanGenerator } from "@/components/teacher/lesson-plan-generator";

async function fetchClassData(classSectionId: string) {
  const [classesRes, subjectsRes, chaptersRes, lessonsRes] = await Promise.all([
    fetch("/api/classes"),
    fetch("/api/subjects"),
    fetch("/api/chapters"),
    fetch("/api/lessons"),
  ]);
  const { classSections } = await classesRes.json();
  const { subjects } = await subjectsRes.json();
  const { chapters } = await chaptersRes.json();
  const { lessons } = await lessonsRes.json();
  const classSection = (classSections ?? []).find((c: { id: string }) => c.id === classSectionId);
  return { classSection, subjects: subjects ?? [], chapters: chapters ?? [], lessons: lessons ?? [] };
}

export default function TeacherClassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const classSectionId = params.classSectionId as string;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["class", classSectionId],
    queryFn: () => fetchClassData(classSectionId),
    enabled: !!classSectionId,
  });

  if (isLoading || !data) {
    return <div className="p-6">Loading...</div>;
  }

  const { classSection, subjects, chapters, lessons } = data;

  if (!classSection) {
    return (
      <div className="p-6">
        <p>Class not found</p>
        <Link href="/teacher/classes" className="text-indigo-600 hover:underline">
          Back to classes
        </Link>
      </div>
    );
  }

  const classSubjects = subjects.filter((s: { id: string }) =>
    classSection.subjectIds.includes(s.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/teacher/classes">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            Grade {classSection.grade} - Section {classSection.sectionName}
          </h1>
          <p className="text-sm text-slate-500">
            {classSubjects.map((s: { name: string }) => s.name).join(", ")}
          </p>
        </div>
      </div>

      <Tabs defaultValue="lesson-plan">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="lesson-plan">Lesson Plan Generator</TabsTrigger>
          <TabsTrigger value="slides">Slides Generator</TabsTrigger>
        </TabsList>
        <TabsContent value="lesson-plan" className="mt-6">
          <LessonPlanGenerator
            classSectionId={classSectionId}
            classSection={classSection}
            subjects={classSubjects}
            chapters={chapters}
            lessons={lessons}
          />
        </TabsContent>
        <TabsContent value="slides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Slides Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">Coming soon. Generate presentation slides from your lesson plan.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
