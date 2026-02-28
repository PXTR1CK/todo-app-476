import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, UserRound } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-lg text-[#245eea]">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1120px] px-4 py-10">
        <h1 className="text-center text-6xl font-bold text-slate-900">Contact Support</h1>
        <p className="mt-3 text-center text-xl text-slate-500">
          Need help with your account, have questions, or want to request account deletion? We&apos;re here to help.
        </p>

        <div className="mx-auto mt-10 grid max-w-[860px] grid-cols-3 gap-4">
          <SupportCard icon={<Mail className="h-6 w-6" />} title="Email Support" subtitle="support@taskflow.com" />
          <SupportCard icon={<MessageSquare className="h-6 w-6" />} title="Live Chat" subtitle="Available 9am - 5pm EST" />
          <SupportCard icon={<UserRound className="h-6 w-6" />} title="Account Management" subtitle="Updates & deletions" />
        </div>

        <div className="mx-auto mt-10 max-w-[860px] rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-5xl font-bold text-slate-900">Send us a message</h2>

          <form className="mt-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name" id="name" placeholder="Your name" />
              <Field label="Email" id="email" placeholder="your.email@example.com" type="email" />
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-base font-semibold text-slate-700">Subject</label>
              <select id="subject" className="h-12 w-full rounded-lg border border-slate-300 px-3 text-slate-600">
                <option>Select a subject</option>
                <option>General question</option>
                <option>Account management</option>
                <option>Account deletion</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-base font-semibold text-slate-700">Message</label>
              <textarea id="message" placeholder="Please describe your issue or question in detail..." className="h-40 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-base text-blue-700">
              <span className="font-semibold">Note:</span> For account deletion requests, please include your registered email address in the message. We typically respond within 24-48 hours.
            </div>

            <button type="submit" className="h-12 w-full rounded-lg bg-[#245eea] text-xl font-semibold text-white">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({ label, id, placeholder, type = "text" }: { label: string; id: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-semibold text-slate-700">{label}</label>
      <input id={id} type={type} placeholder={placeholder} className="h-12 w-full rounded-lg border border-slate-300 px-3" />
    </div>
  );
}

function SupportCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#245eea]">{icon}</div>
      <div className="text-2xl font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-base text-slate-500">{subtitle}</div>
    </div>
  );
}