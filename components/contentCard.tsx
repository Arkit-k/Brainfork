// app/components/ContentCard.tsx
import { getContents } from "@/actions/content/read";
import { EditContentDialog } from "./editcontent";
import { deleteContent } from "@/actions/content/delete";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TweetEmbed } from "./embeded"; // ✅ import the client component

export default async function ContentCard() {
  const contents = await getContents();

  if (!contents.length) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-lg font-medium">No content yet</h1>
        <p className="text-sm">Add your first note or link!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((item) => (
        <Card
          key={item.contentId}
          className="shadow-lg rounded-2xl flex flex-col h-[500px]"
        >
          {/* Header */}
          <CardHeader className="flex flex-row justify-between items-start gap-2">
            <CardTitle className="line-clamp-1 flex-1">{item.title}</CardTitle>

            <div className="flex gap-2">
              <EditContentDialog
                id={item.contentId}
                initialTitle={item.title}
                initialDescription={item.discription}
                initialLink={item.link}
              />
              <form
                action={async () => {
                  "use server";
                  await deleteContent(item.contentId);
                }}
              >
                <Button type="submit" variant="destructive" size="sm">
                  Delete
                </Button>
              </form>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="flex flex-col flex-1 justify-between overflow-hidden">
            {/* Embeds */}
            {item.type && item.link && (
              <div className="mb-3 flex-1 min-h-0">
                {item.type === "YOUTUBE" && (
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(
                        item.link
                      )}`}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {item.type === "TWITTER" && (
                  <div className="h-full overflow-hidden">
                    <TweetEmbed link={item.link} />
                  </div>
                )}

                {item.type === "NOTION" && (
                  <div className="aspect-video w-full">
                    <iframe
                      src={item.link}
                      className="w-full h-full rounded-lg border"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Only show description and tags for non-Twitter cards */}
            {item.type !== "TWITTER" && (
              <>
                {/* Description */}
                {item.discription ? (
                  <p className="text-gray-700 mb-2 line-clamp-3">{item.discription}</p>
                ) : (
                  <p className="text-gray-400 italic mb-2">No description provided</p>
                )}

                {/* Tags */}
                {item.tags?.length > 0 && (
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
                )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/** Utility to extract YouTube video ID from URL */
function extractYouTubeId(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v")!;
    }
    return "";
  } catch {
    return "";
  }
}