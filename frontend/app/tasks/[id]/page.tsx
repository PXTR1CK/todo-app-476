"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getStoredUser } from "@/lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

type Task = {
  task_id: number;
  user_id: number;
  title: string;
  description: string | null;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  due_date: string;
  created_at: string;
  updated_at: string;
};

export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTask() {
    try {
      setLoading(true);
      setError("");

      const user = getStoredUser();

      if (!user?.user_id) {
        router.push("/");
        return;
      }

      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        cache: "no-store",
        headers: {
          "x-user-id": String(user.user_id),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load task.");
      }

      setTask(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      const user = getStoredUser();

      if (!user?.user_id) {
        router.push("/");
        return;
      }

      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-id": String(user.user_id),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete task.");
      }

      router.push("/tasks");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete task.");
    }
  }

  useEffect(() => {
    loadTask();
  }, [id]);

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            <h1 className="text-xl font-semibold tracking-tight">Task Details</h1>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            Contact
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl p-4 py-8">
        <Card className="shadow-sm">
          {loading && <div className="p-6 text-sm text-muted-foreground">Loading task...</div>}
          {!loading && error && <div className="p-6 text-sm text-red-600">{error}</div>}

          {!loading && !error && task && (
            <>
              <CardHeader className="flex flex-col gap-4 border-b md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <CardTitle className="text-3xl">{task.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Tag className={statusStyles[task.status]}>{task.status}</Tag>
                    <Tag className={priorityStyles[task.priority]}>{task.priority} Priority</Tag>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" className="gap-2">
                    <Link href={`/tasks/${task.task_id}/edit`}>
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="destructive" className="gap-2" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 py-6">
                <Row title="Description" value={task.description || "No description provided"} />
                <Row title="Due Date" value={formatDate(task.due_date)} />
                <Row title="Created At" value={formatDateTime(task.created_at)} />
                <Row title="Task ID" value={String(task.task_id)} />
              </CardContent>

              <CardFooter className="justify-between border-t pt-6">
                <Button asChild variant="outline">
                  <Link href="/tasks">Back to Tasks</Link>
                </Button>
                <Button asChild>
                  <Link href={`/tasks/${task.task_id}/edit`}>Edit Task</Link>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </section>
    </main>
  );
}

function Row({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="mt-1 text-lg">{value}</div>
    </div>
  );
}

function Tag({ children, className }: { children: ReactNode; className: string }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>{children}</span>;
}

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "In Progress": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
};

const priorityStyles: Record<string, string> = {
  Low: "bg-muted text-muted-foreground",
  Medium: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  High: "bg-red-500/10 text-red-700 dark:text-red-300",
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}