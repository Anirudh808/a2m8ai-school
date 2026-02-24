# School LMS - Production-Grade Prototype

A complete clickable prototype LMS web app for schools with role-based access (Admin, Teacher, Student, Parent), subscription gating, and mock APIs.

## Tech Stack

- **Next.js 15** (App Router), TypeScript
- **Tailwind CSS v4**
- **shadcn/ui** components
- **Zustand** for client state
- **TanStack Query** for data fetching
- **react-hook-form + zod** for forms
- **Recharts** for charts

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Users

| Role   | Name           | Email           |
|--------|----------------|-----------------|
| Admin  | Principal Sharma | admin@school.edu |
| Teacher | Ms. Anita Roy  | anita@school.edu |
| Student | Rahul Verma    | rahul@school.edu |
| Parent | Mr. Verma      | verma@email.com |

1. Go to `/login`
2. Select a user from the dropdown (no password)
3. Click **Sign In**

## Switch Plan / Role

- **Switch role**: Logout and log in as a different user
- **Switch plan (Admin only)**: Use the API `PATCH /api/plan` with `{ planId: "basic" | "premium" | "premium_plus" }`

## Parent Mode (Student → Parent)

1. Log in as a **Student** (e.g. Rahul Verma)
2. In the sidebar, click **Switch to Parent Mode**
3. Enter parent password: **1234**
4. You will see parent views (dashboard, performance, attendance, etc.)

## What is Mocked vs Real

- **Auth**: Session in HTTP-only cookie; no real OAuth/JWT
- **Database**: In-memory store + JSON seed; resets on server restart
- **AI features**: Mock responses (lesson builder, AI tutor)
- **Live class**: Mock session state; BroadcastChannel for same-browser sync
- **File uploads**: Placeholder only

## Reset Demo Data

```bash
curl -X POST http://localhost:3000/api/seed/reset
```

## Project Structure

```
/app
  /(app)         # Authenticated layout (sidebar, topbar)
    /admin/*     # Admin pages
    /teacher/*   # Teacher pages
    /student/*   # Student pages
    /parent/*    # Parent pages
  /api/*         # Mock API route handlers
  /login         # Demo login
/components
  /layout        # Sidebar, topbar
  /ui            # shadcn components
/lib
  types.ts       # TypeScript types
  seed.ts        # Mock data
  store.ts       # In-memory store
  rbac.ts        # Role-based access
  entitlements.ts# Subscription/feature gating
```
