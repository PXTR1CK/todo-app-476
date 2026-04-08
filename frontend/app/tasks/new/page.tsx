"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getStoredUser } from "@/lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export default function NewTaskPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <TopBar title="Create New Task" />

      <section className="mx-auto w-full max-w-4xl p-4 py-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Task details</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm submitLabel="Create Task" cancelHref="/tasks" />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <header className="border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
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
  );
}

function TaskForm({ submitLabel, cancelHref }: { submitLabel: string; cancelHref: string }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
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
        throw new Error(data.errors?.join(" ") || data.message || "Failed to create task.");
      }

      router.push("/tasks");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="Enter task title"
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
          placeholder="Enter task description"
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
            className="h-11"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
        <Button asChild variant="outline">
          <Link href={cancelHref}>Cancel</Link>
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : submitLabel}
        </Button>
      </div>
    </form>
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