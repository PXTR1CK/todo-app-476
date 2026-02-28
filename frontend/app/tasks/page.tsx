import Link from "next/link";
import type { ReactNode } from "react";
import { Eye, LogOut, Mail, Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const tasks = [
  {
    id: 3,
    title: "Update documentation",
    status: "Completed",
    priority: "Low",
    due: "Jan 29, 2026",
  },
  {
    id: 4,
    title: "Schedule team meeting",
    status: "Pending",
    priority: "High",
    due: "Jan 31, 2026",
  },
  {
    id: 5,
    title: "Review team feedback",
    status: "Pending",
    priority: "Medium",
    due: "Feb 2, 2026",
  },
  {
    id: 6,
    title: "Complete project proposal",
    status: "In Progress",
    priority: "High",
    due: "Feb 4, 2026",
  },
];

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <h1 className="text-2xl font-semibold tracking-tight">My Tasks</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Welcome, User</span>
            <Link href="/contact" className="inline-flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 hover:text-foreground">
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl p-4 py-8">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="flex flex-col gap-4 border-b md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-muted-foreground">Filter:</span>
              <Chip text="All" active />
              <Chip text="Pending" />
              <Chip text="In Progress" />
              <Chip text="Completed" />
            </div>

            <Button asChild className="gap-2">
              <Link href="/tasks/new">
                <Plus className="h-4 w-4" />
                New Task
              </Link>
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-4 border-b p-5 last:border-b-0 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight">{task.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Tag tone={task.status}>{task.status}</Tag>
                    <Tag tone={task.priority}>{task.priority}</Tag>
                    <span>Due: {task.due}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/tasks/${task.id}`} aria-label={`View ${task.title}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/tasks/${task.id}/edit`} aria-label={`Edit ${task.title}`}>
                      <SquarePen className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function Chip({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <button
      className={`rounded-md px-3 py-1.5 text-sm transition ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      {text}
    </button>
  );
}

function Tag({ children, tone }: { children: ReactNode; tone: string }) {
  const styles: Record<string, string> = {
    Completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    "In Progress": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    Low: "bg-muted text-muted-foreground",
    Medium: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    High: "bg-red-500/10 text-red-700 dark:text-red-300",
  };

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[tone]}`}>
      {children}
    </span>
  );
}