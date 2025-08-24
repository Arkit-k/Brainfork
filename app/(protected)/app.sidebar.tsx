"use client"

import { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/new-sidebar"
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react"

export function SidebarDemo() {
  const links = [
    {
      label: "Contents",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5" />,
    },
    {
      label: "Youtube",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5" />,
    },
    {
      label: "Notion",
      href: "#",
      icon: <IconSettings className="h-5 w-5" />,
    },
    {
      label: "notes",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5" />,
    },
    {
      label: "twitter",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5" />,
    }
  ]

  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-screen  border-r border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody>
          <div className="flex flex-col gap-2 mt-8">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  )
}
