// src/app/components/ContentCard.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateContent } from "@/actions/content/update"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function EditContentDialog({ id, initialTitle, initialDescription, initialLink }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: initialTitle,
    description: initialDescription,
    link: initialLink || "",
  })
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const fd = new FormData()
    fd.append("title", form.title)
    fd.append("description", form.description)
    fd.append("link", form.link)

    await updateContent(id, fd) // ✅ server action
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Title"
          />
          <input
            type="text"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Link"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
