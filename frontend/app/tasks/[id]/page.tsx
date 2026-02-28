import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Mail, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskDetailsPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            <h1 className="text-xl font-semibold tracking-tight">Task Details</h1>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Mail className="h-4 w-4" />
            Contact
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl p-4 py-8">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-col gap-4 border-b md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <CardTitle className="text-3xl">Update documentation</CardTitle>
              <div className="flex items-center gap-2">
                <Tag className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">Completed</Tag>
                <Tag className="bg-muted text-muted-foreground">Low Priority</Tag>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/tasks/3/edit">
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 py-6">
            <Row title="Description" value="Update API documentation with new endpoints" />
            <Row title="Due Date" value="Thursday, January 29, 2026" />
            <Row title="Created At" value="January 27, 2026 at 04:15 AM" />
            <Row title="Task ID" value="3" />
          </CardContent>

          <CardFooter className="justify-between border-t pt-6">
            <Button asChild variant="outline">
              <Link href="/tasks">Back to Tasks</Link>
            </Button>
            <Button asChild>
              <Link href="/tasks/3/edit">Edit Task</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}

function Row({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="mt-1 text-lg">{value}</div>
    </div>
  );
}

function Tag({ children, className }: { children: ReactNode; className: string }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>{children}</span>;
}