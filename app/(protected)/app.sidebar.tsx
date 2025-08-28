"use client"

import { useState } from "react"
import { useDashboardFilter } from "@/components/DashboardFilterContext"
import { cn } from "@/lib/utils"
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconBrandTwitter,
  IconNotebook,
} from "@tabler/icons-react"

const links = [
  { label: "All", filter: "ALL", icon: <IconBrandTabler className="h-5 w-5" /> },
  { label: "Youtube", filter: "YOUTUBE", icon: <IconUserBolt className="h-5 w-5" /> },
  { label: "Notion", filter: "NOTION", icon: <IconSettings className="h-5 w-5" /> },
  { label: "Notes", filter: "NOTES", icon: <IconNotebook className="h-5 w-5" /> },
  { label: "Twitter", filter: "TWITTER", icon: <IconBrandTwitter className="h-5 w-5" /> },
]

export function SidebarDemo() {
  const [open, setOpen] = useState(true)
  const { filter, setFilter } = useDashboardFilter();

  return (
    <div
      className={cn(
        "h-screen border-r border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-900 transition-all duration-300",
        open ? "w-56" : "w-16"
      )}
    >
      {/* Sidebar Header / Toggle */}
      <div className="flex items-center justify-between p-3">
        {open && <span className="font-semibold text-sm">Dashboard</span>}
        <button
          onClick={() => setOpen(!open)}
          className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800"
        >
          <IconArrowLeft
            className={cn("h-5 w-5 transition-transform", !open && "rotate-180")}
          />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="mt-6 flex flex-col gap-1">
        {links.map((link, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setFilter(link.filter)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none",
              !open && "justify-center",
              filter === link.filter && "bg-neutral-300 dark:bg-neutral-700 font-bold"
            )}
          >
            {link.icon}
            {open && <span>{link.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  )
}
