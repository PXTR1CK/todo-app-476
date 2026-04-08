const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export async function fetchTasks() {
  const res = await fetch(`${API_BASE}/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function fetchTask(id: string | number) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}

export async function createTask(data: {
  title: string;
  description?: string;
  status: string;
  priority: string;
  due_date: string;
}) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.join(" ") || json.message || "Failed to create task");
  return json;
}

export async function updateTask(
  id: string | number,
  data: {
    title: string;
    description?: string;
    status: string;
    priority: string;
    due_date: string;
  }
) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.join(" ") || json.message || "Failed to update task");
  return json;
}

export async function deleteTask(id: string | number) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete task");
  return json;
}