"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* subtle theme-safe background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] [background-size:28px_28px] opacity-40" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border-border bg-card/70 backdrop-blur-xl shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl tracking-tight">
              Create your account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: call PHP backend register endpoint
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input id="name" placeholder="Your name" className="h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  className="h-11"
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
                />
              </div>

              <Button type="submit" className="h-11 w-full shadow-sm">
                Register
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

        {/* bottom-right help bubble (optional visual like reference) */}
        <div className="pointer-events-none absolute bottom-5 right-5 hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-xs text-muted-foreground shadow-sm md:flex">
          ?
        </div>
      </div>
    </main>
  );
}
