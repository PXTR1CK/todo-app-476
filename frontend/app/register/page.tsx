"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      localStorage.setItem("taskflow_user", JSON.stringify(data.user));
      router.push("/tasks");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-background">
      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border-border bg-card/70 backdrop-blur-xl shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl tracking-tight">Create your account</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="h-11"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  className="h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className="h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="h-11 w-full shadow-sm" disabled={submitting}>
                {submitting ? "Creating account..." : "Register"}
              </Button>

              <p className="pt-2 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-medium text-primary underline underline-offset-4 hover:opacity-90"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="pointer-events-none absolute bottom-5 right-5 hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-xs text-muted-foreground shadow-sm md:flex">
          ?
        </div>
      </div>
    </main>
  );
}