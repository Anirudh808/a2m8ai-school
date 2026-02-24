"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, MoreHorizontal, Users, PlusCircle } from "lucide-react";

type RosterStudent = {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  attendancePercent: number;
  avgScore: number | null;
  lastActive: string;
  parents: { id: string; name: string }[];
  group: string | null;
};

export function RosterTab({ classSectionId, subjectId }: { classSectionId: string; subjectId: string }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const { data, isLoading, error } = useQuery<{ roster: RosterStudent[] }>({
    queryKey: ["class-tabs-roster", classSectionId, subjectId],
    queryFn: async () => {
      const res = await fetch(`/api/teacher/classes/${classSectionId}/${subjectId}/tabs/roster`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const columns = [
    {
      accessorKey: "name",
      header: "Student",
      cell: ({ row }: any) => {
        const student = row.original;
        const initials = student.name.split(" ").map((n: string) => n[0]).join("");
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-slate-200">
               <AvatarFallback className="bg-indigo-50 text-indigo-700 font-semibold text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-slate-900">{student.name}</div>
              <div className="text-xs text-slate-500">{student.rollNo}</div>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "attendancePercent",
      header: "Attendance",
      cell: ({ row }: any) => {
        const val = row.original.attendancePercent;
        return (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${val >= 80 ? 'bg-emerald-500' : val >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`} />
            <span className="font-medium text-slate-700">{val}%</span>
          </div>
        );
      }
    },
    {
      accessorKey: "avgScore",
      header: "Avg Score",
      cell: ({ row }: any) => {
        const val = row.original.avgScore;
        if (val === null) return <span className="text-slate-400 text-sm">No data</span>;
        return <span className="font-medium text-slate-700">{val}%</span>;
      }
    },
    {
      id: "parents",
      header: "Parents",
      cell: ({ row }: any) => {
        const parents = row.original.parents;
        if (!parents || parents.length === 0) return <span className="text-xs text-slate-400">None linked</span>;
        return (
           <div className="flex gap-1 flex-wrap">
             {parents.map((p: any) => (
                <Badge key={p.id} variant="outline" className="text-xs font-normal text-slate-600 bg-slate-50">{p.name}</Badge>
             ))}
           </div>
        );
      }
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }: any) => {
        return (
           <div className="flex items-center justify-end gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                 <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                 <MoreHorizontal className="h-4 w-4" />
              </Button>
           </div>
        );
      }
    }
  ];

  const table = useReactTable({
    data: data?.roster || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  if (isLoading) {
     return (
        <div className="mt-6 space-y-4">
           <Skeleton className="h-10 w-full rounded-md" />
           <Skeleton className="h-[400px] w-full rounded-md" />
        </div>
     );
  }

  if (error || !data) {
     return <div className="mt-6 p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-200">Failed to load roster data.</div>;
  }

  return (
    <div className="mt-6 space-y-4">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="flex items-center justify-center p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                <Users className="h-5 w-5" />
             </div>
             <div>
                <h3 className="text-lg font-semibold text-slate-900">Class Roster</h3>
                <p className="text-sm text-slate-500">{data.roster.length} students enrolled</p>
             </div>
          </div>
          <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
             <PlusCircle className="mr-2 w-4 h-4" /> Create Learning Groups
          </Button>
       </div>

       <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-slate-600 font-semibold h-11">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-slate-500">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
       </div>
    </div>
  );
}
