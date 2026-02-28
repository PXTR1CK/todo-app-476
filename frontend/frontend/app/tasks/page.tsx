import Link from "next/link";
import { Eye, LogOut, Mail, Plus, SquarePen } from "lucide-react";

const tasks = [
  { id: 3, title: "Update documentation", status: "Completed", priority: "Low", due: "Jan 29, 2026" },
  { id: 4, title: "Schedule team meeting", status: "Pending", priority: "High", due: "Jan 31, 2026" },
  { id: 5, title: "Review team feedback", status: "Pending", priority: "Medium", due: "Feb 2, 2026" },
  { id: 6, title: "Complete project proposal", status: "In Progress", priority: "High", due: "Feb 4, 2026" },
];

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-4">
          <h1 className="text-4xl font-bold text-slate-900">My Tasks</h1>

          <div className="flex items-center gap-7 text-base text-slate-600">
            <span>Welcome, ikoiwoh</span>
            <Link href="/contact" className="inline-flex items-center gap-2 hover:text-slate-900"><Mail className="h-4 w-4" />Contact</Link>
            <Link href="/" className="inline-flex items-center gap-2 hover:text-slate-900"><LogOut className="h-4 w-4" />Logout</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-10 max-w-[1120px] rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold text-slate-700">Filter:</span>
            <Chip text="All" active />
            <Chip text="Pending" />
            <Chip text="In Progress" />
            <Chip text="Completed" />

            <span className="ml-3 font-semibold text-slate-700">Sort:</span>
            <select className="h-9 rounded-md border border-slate-300 px-3 text-sm">
              <option>Due date</option>
            </select>
          </div>

          <Link href="/tasks/new" className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#245eea] px-6 text-lg font-semibold text-white">
            <Plus className="h-4 w-4" /> New Task
          </Link>
        </div>

        <div>
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between border-b border-slate-200 px-4 py-4 last:border-0">
              <div>
                <h3 className="text-3xl font-semibold text-slate-800">{task.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-base text-slate-500">
                  <Tag tone={task.status}>{task.status}</Tag>
                  <Tag tone={task.priority}>{task.priority}</Tag>
                  <span>Due: {task.due}</span>
                </div>
              </div>

              <div className="flex items-center gap-5 text-slate-500">
                <Link href={`/tasks/${task.id}`}><Eye className="h-4 w-4" /></Link>
                <Link href={`/tasks/${task.id}/edit`}><SquarePen className="h-4 w-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Chip({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <button className={`h-8 rounded-md px-3 text-sm font-semibold ${active ? "bg-[#245eea] text-white" : "bg-slate-100 text-slate-600"}`}>
      {text}
    </button>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone: string }) {
  const styles: Record<string, string> = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Low: "bg-slate-100 text-slate-600",
    Medium: "bg-orange-100 text-orange-700",
    High: "bg-red-100 text-red-700",
  };

  return <span className={`rounded-full px-2 py-1 text-sm font-semibold ${styles[tone]}`}>{children}</span>;
}