"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Eye, LogOut, Mail, Plus, SquarePen, Trash2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getStoredUser } from "@/lib/auth";

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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Pending" | "In Progress" | "Completed">("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("User");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const user = getStoredUser();

      if (!user?.user_id) {
        router.push("/");
        return;
      }

      const res = await fetch(`${API_BASE}/tasks`, {
        cache: "no-store",
        headers: {
          "x-user-id": String(user.user_id),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load tasks.");
      }

      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(taskId: number) {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      const user = getStoredUser();

      if (!user?.user_id) {
        router.push("/");
        return;
      }

      const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "x-user-id": String(user.user_id),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete task.");
      }

      setTasks((prev) => prev.filter((task) => task.task_id !== taskId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete task.");
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch {
    } finally {
      localStorage.removeItem("taskflow_user");
      router.push("/");
      router.refresh();
    }
  }

  async function handleComplete(task: Task) {
    try {
      const user = getStoredUser();

      if (!user?.user_id) {
        router.push("/");
        return;
      }

      const res = await fetch(`${API_BASE}/tasks/${task.task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": String(user.user_id),
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description || "",
          status: "Completed",
          priority: task.priority,
          due_date: task.due_date.slice(0, 10),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to mark task as completed.");
      }

      await loadTasks();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to mark task as completed.");
    }
  }

  useEffect(() => {
    const storedUser = getStoredUser();

    if (!storedUser?.user_id) {
      router.push("/");
      return;
    }

    setUserName(storedUser.name || storedUser.email || "User");
    loadTasks();
  }, [router]);

  const filteredTasks = useMemo(() => {
    if (selectedFilter === "All") return tasks;
    return tasks.filter((task) => task.status === selectedFilter);
  }, [tasks, selectedFilter]);

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <h1 className="text-2xl font-semibold tracking-tight">My Tasks</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Welcome, {userName}</span>
            <Link href="/contact" className="inline-flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 hover:text-foreground">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl p-4 py-8">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="flex flex-col gap-4 border-b md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-muted-foreground">Filter:</span>
              <Chip text="All" active={selectedFilter === "All"} onClick={() => setSelectedFilter("All")} />
              <Chip text="Pending" active={selectedFilter === "Pending"} onClick={() => setSelectedFilter("Pending")} />
              <Chip
                text="In Progress"
                active={selectedFilter === "In Progress"}
                onClick={() => setSelectedFilter("In Progress")}
              />
              <Chip
                text="Completed"
                active={selectedFilter === "Completed"}
                onClick={() => setSelectedFilter("Completed")}
              />
            </div>

            <Button asChild className="gap-2">
              <Link href="/tasks/new">
                <Plus className="h-4 w-4" />
                New Task
              </Link>
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            {loading && <div className="p-5 text-sm text-muted-foreground">Loading tasks...</div>}

            {!loading && error && <div className="p-5 text-sm text-red-600">{error}</div>}

            {!loading && !error && filteredTasks.length === 0 && (
              <div className="p-5 text-sm text-muted-foreground">No tasks found.</div>
            )}

            {!loading &&
              !error &&
              filteredTasks.map((task) => (
                <div
                  key={task.task_id}
                  className="flex flex-col gap-4 border-b p-5 last:border-b-0 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight">{task.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <Tag tone={task.status}>{task.status}</Tag>
                      <Tag tone={task.priority}>{task.priority}</Tag>
                      <span>Due: {formatDate(task.due_date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/tasks/${task.task_id}`} aria-label={`View ${task.title}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    {task.status !== "Completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleComplete(task)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Complete
                      </Button>
                    )}

                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/tasks/${task.task_id}/edit`} aria-label={`Edit ${task.title}`}>
                        <SquarePen className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task.task_id)}
                      aria-label={`Delete ${task.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
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

function Chip({
  text,
  active = false,
  onClick,
}: {
  text: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
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

  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[tone]}`}>{children}</span>;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}