import Link from "next/link";
import { ArrowLeft, Mail, Pencil, Trash2 } from "lucide-react";

export default function TaskDetailsPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <ArrowLeft className="h-5 w-5 text-slate-500" />
            <h1 className="text-4xl font-bold text-slate-900">Task Details</h1>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 text-base text-slate-600"><Mail className="h-4 w-4" />Contact</Link>
        </div>
      </header>

      <section className="mx-auto mt-10 max-w-[1000px] rounded-xl border border-slate-200 bg-white">
        <div className="flex items-start justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-5xl font-bold text-slate-900">Update documentation</h2>
            <div className="mt-4 flex items-center gap-3">
              <Tag className="bg-green-100 text-green-700">Completed</Tag>
              <Tag className="bg-slate-100 text-slate-700">Low Priority</Tag>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/tasks/3/edit" className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-50 px-4 text-base font-semibold text-[#245eea]"><Pencil className="h-4 w-4" />Edit</Link>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-50 px-4 text-base font-semibold text-red-500"><Trash2 className="h-4 w-4" />Delete</button>
          </div>
        </div>

        <div className="space-y-6 border-b border-slate-200 p-6 text-slate-800">
          <Row title="DESCRIPTION" value="Update API documentation with new endpoints" />
          <Row title="DUE DATE" value="Thursday, January 29, 2026" />
          <Row title="CREATED AT" value="January 27, 2026 at 04:15 AM" />
        </div>

        <div className="border-b border-slate-200 p-6">
          <div className="text-sm font-semibold tracking-wide text-slate-400">TASK ID</div>
          <div className="mt-2 text-3xl">3</div>
        </div>

        <div className="flex items-center justify-between p-6">
          <Link href="/tasks" className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 font-semibold text-slate-700">Back to Tasks</Link>
          <Link href="/tasks/3/edit" className="inline-flex h-11 items-center rounded-lg bg-[#245eea] px-6 font-semibold text-white">Edit Task</Link>
        </div>
      </section>
    </main>
  );
}

function Row({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold tracking-wide text-slate-400">{title}</div>
      <div className="mt-2 text-4xl text-slate-800">{value}</div>
    </div>
  );
}

function Tag({ children, className }: { children: React.ReactNode; className: string }) {
  return <span className={`rounded-full px-3 py-1 text-lg font-semibold ${className}`}>{children}</span>;
}