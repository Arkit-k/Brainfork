// src/app/dashboard/page.tsx
import CreateContentForm from "../../components/createcomponent"
import ContentCard from "../../components/contentCard"
import { SignOutButton } from "@/components/sign-out"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end">
        <CreateContentForm />
        <SignOutButton />
      </div>
      <ContentCard />
    </div>
  )
}
