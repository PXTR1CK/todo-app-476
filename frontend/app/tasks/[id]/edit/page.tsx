import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditTaskPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            <h1 className="text-xl font-semibold tracking-tight">Edit Task</h1>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Mail className="h-4 w-4" />
            Contact
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-4xl p-4 py-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Update task</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" className="h-11" defaultValue="Update documentation" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea id="description" className="min-h-32" defaultValue="Update API documentation with new endpoints" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <SelectField label="Status" defaultValue="Completed" options={["Pending", "In Progress", "Completed"]} />
                <SelectField label="Priority" defaultValue="Low" options={["Low", "Medium", "High"]} />
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date *</Label>
                  <Input id="due-date" type="date" defaultValue="2026-01-30" className="h-11" />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button asChild variant="outline">
                  <Link href="/tasks/3">Cancel</Link>
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function SelectField({ label, defaultValue, options }: { label: string; defaultValue: string; options: string[] }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <select defaultValue={defaultValue} className="h-11 w-full rounded-md border bg-background px-3 text-sm">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}