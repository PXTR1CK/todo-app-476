export function getStoredUser() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("taskflow_user");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}