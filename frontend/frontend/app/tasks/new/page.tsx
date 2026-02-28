import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function NewTaskPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <TopBar title="Create New Task" />

      <section className="mx-auto mt-9 max-w-[900px] rounded-xl border border-slate-200 bg-white p-8">
        <TaskForm submitLabel="Create Task" cancelHref="/tasks" />
      </section>
    </main>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <ArrowLeft className="h-5 w-5 text-slate-500" />
          <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-2 text-base text-slate-600"><Mail className="h-4 w-4" />Contact</Link>
      </div>
    </header>
  );
}

function TaskForm({ submitLabel, cancelHref }: { submitLabel: string; cancelHref: string }) {
  return (
    <form className="space-y-6">
      <div>
        <label className="mb-2 block text-base font-semibold text-slate-700">Title <span className="text-red-500">*</span></label>
        <input className="h-12 w-full rounded-lg border border-slate-300 px-3" placeholder="Enter task title" />
      </div>

      <div>
        <label className="mb-2 block text-base font-semibold text-slate-700">Description (optional)</label>
        <textarea className="h-36 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Enter task description" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SelectField label="Status" defaultValue="Pending" options={["Pending", "In Progress", "Completed"]} />
        <SelectField label="Priority" defaultValue="Medium" options={["Low", "Medium", "High"]} />
        <div>
          <label className="mb-2 block text-base font-semibold text-slate-700">Due Date <span className="text-red-500">*</span></label>
          <input type="date" className="h-12 w-full rounded-lg border border-slate-300 px-3" />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
        <Link href={cancelHref} className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 font-semibold text-slate-600">Cancel</Link>
        <button type="submit" className="h-11 rounded-lg bg-[#245eea] px-6 font-semibold text-white">{submitLabel}</button>
      </div>
    </form>
  );
}

function SelectField({ label, defaultValue, options }: { label: string; defaultValue: string; options: string[] }) {
  return (
    <div>
      <label className="mb-2 block text-base font-semibold text-slate-700">{label}</label>
      <select defaultValue={defaultValue} className="h-12 w-full rounded-lg border border-slate-300 px-3">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}