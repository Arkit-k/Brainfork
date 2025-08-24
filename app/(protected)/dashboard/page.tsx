// src/app/dashboard/page.tsx
import CreateContentForm from "../../../components/createcomponent"
import ContentCard from "../../../components/contentCard"
import { SignOutButton } from "@/components/sign-out"
import getServerSession from "next-auth"
import { getUser } from "@/actions/getUser"

export default async function DashboardPage() {
  const user = await getUser()
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Hi {user?.name ?? "there"} 👋
      </h1>
      <div className="flex justify-end">
        <CreateContentForm />
      </div>
      <ContentCard />
    </div>
  )
}
