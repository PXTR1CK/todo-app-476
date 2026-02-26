"use client";

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
import { CheckCircle2, Zap, Shield, BarChart3, ArrowRight } from "lucide-react";
import * as React from "react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Global ambient background (theme-safe) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Left marketing panel */}
        <section className="relative hidden lg:flex flex-col justify-between p-10">
          {/* Card-like surface with subtle gradient + border */}
          <div className="absolute inset-6 rounded-3xl border border-border bg-card/60 backdrop-blur-xl shadow-sm" />
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-6 rounded-3xl [mask-image:radial-gradient(70%_70%_at_30%_10%,black,transparent)] bg-primary/10" />

          <div className="relative flex flex-col gap-10 p-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-medium text-muted-foreground">
                  Welcome to
                </div>
                <div className="text-lg font-semibold tracking-tight">
                  TaskFlow
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="max-w-md">
              <h1 className="text-4xl font-bold tracking-tight">
                Manage work.{" "}
                <span className="text-primary">Ship faster.</span>
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                A clean, focused workspace to organize tasks, keep momentum, and
                hit deadlines without the chaos.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-4">
                <Feature
                  icon={<Zap className="h-5 w-5" />}
                  title="Fast by default"
                  desc="Create, prioritize, and move tasks in seconds."
                />
                <Feature
                  icon={<Shield className="h-5 w-5" />}
                  title="Secure & private"
                  desc="Access-controlled and built with best practices."
                />
                <Feature
                  icon={<BarChart3 className="h-5 w-5" />}
                  title="Progress that’s visible"
                  desc="See what’s moving and what’s stuck at a glance."
                />
              </div>

              {/* Social proof / mini stats */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                <Stat label="Teams" value="120+" />
                <Stat label="Tasks/day" value="8.4k" />
                <Stat label="Uptime" value="99.9%" />
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="relative flex items-end justify-between gap-6 p-6 pt-0">
            <p className="max-w-sm text-xs text-muted-foreground">
              Need help with your account? Reach out for support with access,
              deletions, and general questions.
            </p>

            <Button
              asChild
              variant="secondary"
              className="gap-2 shadow-sm hover:shadow transition-shadow"
            >
              <Link href="/contact">
                Contact Support <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

          </div>
        </section>

        {/* Right login panel */}
        <section className="relative flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md">
            {/* Header text (mobile) */}
            <div className="mb-6 lg:hidden">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm text-muted-foreground">Welcome to</div>
                  <div className="text-lg font-semibold tracking-tight">
                    TaskFlow
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Sign in to continue.
              </p>
            </div>

            <Card className="relative overflow-hidden border-border bg-card/70 backdrop-blur-xl shadow-lg">
              {/* subtle top highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/15 to-transparent" />

              <CardHeader className="relative">
                <CardTitle className="text-2xl tracking-tight">
                  Welcome back
                </CardTitle>
                <CardDescription>
                  Sign in to continue to your account
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: call PHP backend login endpoint
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-11"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full shadow-sm hover:shadow transition-shadow"
                  >
                    Sign in
                  </Button>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-card px-2 text-muted-foreground">
                        or
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    className="h-11 w-full"
                    onClick={() => {
                      // TODO: OAuth / SSO
                    }}
                  >
                    Continue with Google
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                      href="/register"
                    >
                      Create account
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link className="underline underline-offset-4" href="/terms">
                Terms
              </Link>{" "}
              and{" "}
              <Link className="underline underline-offset-4" href="/privacy">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/40 p-4 backdrop-blur-sm transition hover:bg-background/60 hover:shadow-sm">
      <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/40 p-4 backdrop-blur-sm">
      <div className="text-lg font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
