// src/app/components/ContentCard.tsx
import { getContents } from "@/actions/content/read"
import { EditContentDialog } from "./editcontent"
import { deleteContent } from "@/actions/content/delete"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ContentCard() {
  const contents = await getContents()

  if (!contents.length) {
    return (
      <div className="p-6 text-sm text-gray-600">
        No content yet. Add your first note or link!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((item) => (
        <Card key={item.contentId} className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="line-clamp-1">{item.title}</CardTitle>
            <EditContentDialog
  id={item.contentId}
  initialTitle={item.title}
  initialDescription={item.discription}
  initialLink={item.link}
/>

            <form
              action={async () => {
                "use server"
                await deleteContent(item.contentId)
              }}
            >
              <Button
                type="submit"
                variant="destructive"
                size="sm"
              >
                Delete
              </Button>
            </form>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2 line-clamp-3">
              {item.discription}
            </p>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Visit Link
              </a>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 px-2 py-1 rounded-full text-xs"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
