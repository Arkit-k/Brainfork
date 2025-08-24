// src/app/components/CreateContentForm.tsx
"use client"

import { useState, useTransition } from "react"
import { createContent } from "@/actions/content/create"
import { ContentSchemas } from "@/schema/index"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CreateContentForm() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({
    title: "",
    link: "",
    discription: "",
    tags: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const isFormValid = 
  form.title.trim() && 
  form.link.trim() && 
  form.tags.trim()

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const parsed = ContentSchemas.parse({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()),
        })

        await createContent(parsed)
        setOpen(false)
        setForm({ title: "", link: "", discription: "", tags: "" })
        window.location.reload() // later: replace with optimistic UI
      } catch (err) {
        console.error("Validation error:", err)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Content</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter a title"
            />
          </div>
          <div>
            <Label>Link</Label>
            <Input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              name="discription"
              value={form.discription}
              onChange={handleChange}
              placeholder="Write a short description..."
            />
          </div>
          <div>
            <Label>Tags (comma separated)</Label>
            <Input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="tag1, tag2"
            />
          </div>
          <Button onClick={handleSubmit} disabled={isPending || !isFormValid}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
