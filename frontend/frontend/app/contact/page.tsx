"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MessageSquare, UserRound, ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const [subject, setSubject] = React.useState<string>("");

  return (
    <main className="relative min-h-screen bg-background">
      {/* subtle ambient background (theme-safe) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] [background-size:28px_28px] opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
        {/* Back */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Contact Support
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Need help with your account, have questions, or want to request
            account deletion? We&apos;re here to help.
          </p>
        </header>


        {/* Form card */}
        <section className="flex justify-center">
          <Card className="w-1/3 border-border bg-card/70 backdrop-blur-xl shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Send us a message</CardTitle>
              <CardDescription>
                We typically respond within 24–48 hours.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: call backend endpoint
                  // fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/support`, ...)
                }}
              >
                {/* Name + Email */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      className="h-11"
                    />
                  </div>


                {/* Subject */}
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="general">General question</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="bug">Bug report</SelectItem>
                      <SelectItem value="feature">Feature request</SelectItem>
                      <SelectItem value="account">Account management</SelectItem>
                      <SelectItem value="deletion">Account deletion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue or question in detail..."
                    className="min-h-[140px] resize-none"
                  />
                </div>

                {/* Note box */}
                <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Note:</span> For
                  account deletion requests, please include your registered
                  email address in the message.
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-11 w-full shadow-sm hover:shadow transition-shadow"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function SupportCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="border-border bg-card/70 backdrop-blur-xl shadow-sm transition hover:shadow-md">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
          {icon}
        </div>
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
      </CardContent>
    </Card>
  );
}
