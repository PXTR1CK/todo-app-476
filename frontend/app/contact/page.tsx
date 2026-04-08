"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, MessageSquare, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getStoredUser } from "@/lib/auth";

export default function ContactPage() {
  const [backHref, setBackHref] = useState("/");
  const [backLabel, setBackLabel] = useState("Back to Home");

  useEffect(() => {
    const user = getStoredUser();

    if (user?.user_id) {
      setBackHref("/tasks");
      setBackLabel("Back to Tasks");
    }
  }, []);

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4">
          <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-primary">
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Contact Support</h1>
          <p className="mt-3 text-muted-foreground">
            Need help with your account, have questions, or want to request account deletion? We&apos;re here to help.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
          <SupportCard icon={<Mail className="h-5 w-5" />} title="Email Support" subtitle="support@taskflow.com" />
          <SupportCard icon={<MessageSquare className="h-5 w-5" />} title="Live Chat" subtitle="Available 9am - 5pm EST" />
          <SupportCard icon={<UserRound className="h-5 w-5" />} title="Account Management" subtitle="Updates & deletions" />
        </div>

        <Card className="mx-auto mt-8 max-w-4xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a message</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" id="name" placeholder="Your name" />
                <Field label="Email" id="email" placeholder="your.email@example.com" type="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <select
                  id="subject"
                  className="h-11 w-full rounded-md border bg-background px-3 text-sm text-muted-foreground"
                >
                  <option>Select a subject</option>
                  <option>General question</option>
                  <option>Account management</option>
                  <option>Account deletion</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue or question in detail..."
                  className="min-h-36"
                />
              </div>

              <div className="rounded-md border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-blue-700 dark:text-blue-300">
                <span className="font-semibold">Note:</span> For account deletion requests, please include your registered email
                address in the message. We typically respond within 24-48 hours.
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} className="h-11" />
    </div>
  );
}

function SupportCard({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
      </CardContent>
    </Card>
  );
}