"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getStoredUser } from "@/lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

type Task = {
  task_id: number;
  title: string;
  description: string | null;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  due_date: string;
};

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

      const data: Task & { message?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load task.");
      }

      setTitle(data.title);
      setDescription(data.description || "");
      setStatus(data.status);
      setPriority(data.priority);
      setDueDate(data.due_date.slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const user = getStoredUser();

      if (!user?.user_id) {
        router.push("/");
        return;
      }

      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": String(user.user_id),
        },
        body: JSON.stringify({
          title,
          description,
          status,
          priority,
          due_date: dueDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors?.join(" ") || data.message || "Failed to update task.");
      }

      router.push(`/tasks/${id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
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
            <h1 className="text-xl font-semibold tracking-tight">Edit Task</h1>
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

      <section className="mx-auto w-full max-w-4xl p-4 py-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Update task</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading task...</div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    className="h-11"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    className="min-h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <SelectField
                    label="Status"
                    value={status}
                    options={["Pending", "In Progress", "Completed"]}
                    onChange={setStatus}
                  />
                  <SelectField
                    label="Priority"
                    value={priority}
                    options={["Low", "Medium", "High"]}
                    onChange={setPriority}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date *</Label>
                    <Input
                      id="due-date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t pt-4">
                  <Button asChild variant="outline">
                    <Link href={`/tasks/${id}`}>Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-md border bg-background px-3 text-sm"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}