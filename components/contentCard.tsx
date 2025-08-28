"use client";
import { useEffect, useState } from "react";
import { useDashboardFilter } from "@/components/DashboardFilterContext";
import { getContents } from "@/actions/content/read";
import { EditContentDialog } from "./editcontent";
import { deleteContent } from "@/actions/content/delete";
import { Button } from "./ui/button";
import { TweetEmbed } from "./embeded";
import { ExternalLink, Edit3, X, PlayCircle } from "lucide-react";

export default function ContentCard() {
  const { filter } = useDashboardFilter();
  const [contents, setContents] = useState<any[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getContents();
      setContents(data);
    })();
  }, []);


  // Filter contents by type if filter is set and not 'ALL'
  const filteredContents = filter && filter !== "ALL"
    ? contents.filter((item) =>
        typeof item.type === "string" &&
        item.type.toLowerCase() === filter.toLowerCase()
      )
    : contents;

  if (!filteredContents.length) {
    return (
      <div className="p-6 text-center text-gray-400">
        <h1 className="text-lg font-medium text-gray-300">No content yet</h1>
        <p className="text-sm">Add your first note or link!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-1 sm:px-2 md:px-4 py-4">
      {filteredContents.map((item) => (
        <div
          key={item.contentId}
          className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-900 group flex flex-col justify-end w-full max-w-xs h-[220px] sm:h-[240px] md:h-[260px] mx-auto border border-gray-800 hover:shadow-2xl transition-all duration-200"
        >
          {/* Background Image/Preview */}
          <div className="absolute inset-0 z-0">
            {item.type === "YOUTUBE" && item.link && (
              <>
                <img
                  src={getYouTubeThumbnail(item.link)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Play button overlay */}
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center z-30 bg-black/20 hover:bg-black/40 transition"
                  onClick={e => {
                    e.stopPropagation();
                    setPlaying(item.link);
                  }}
                  title="Play YouTube Video"
                >
                  <PlayCircle size={48} className="text-white/80 hover:text-white drop-shadow-lg" />
                </button>
              </>
            )}
  {/* YouTube Video Modal */}
  {playing && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden">
        <button
          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
          onClick={() => setPlaying(null)}
          title="Close"
        >
          <X size={24} />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${extractYouTubeId(playing)}`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Video"
        />
      </div>
    </div>
  )}
            {item.type === "TWITTER" && (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <TweetEmbed link={item.link} />
              </div>
            )}
            {item.type === "NOTION" && (
              <iframe
                src={item.link}
                className="w-full h-full border-0 pointer-events-none bg-gray-800"
              />
            )}
            {(!item.type || item.type === "NOTES") && (
              <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white/80 text-6xl font-light">📝</span>
              </div>
            )}
            {/* Overlay for darkening image */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70 z-10" />
  </div>

          {/* Tags Bar */}
          <div className="absolute top-3 left-3 right-3 z-0 flex gap-1">
            {item.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="bg-black/40 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-semibold shadow"
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Card Footer: Actions and Info */}
          <div className="relative z-0 flex items-center justify-between px-4 py-2 bg-black/30 backdrop-blur rounded-b-2xl">
            <div className="flex gap-2">
              <EditContentDialog
                id={item.contentId}
                initialTitle={item.title}
                initialDescription={item.description}
                initialLink={item.link}
              />
              <button
                className="text-gray-400 hover:text-white transition p-1 rounded-full bg-black/20 hover:bg-black/40"
                title="Edit"
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  // Optionally, trigger dialog open here if EditContentDialog exposes a method or state
                }}
              >
                <Edit3 size={14} />
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-500 transition"
                onClick={async (e) => {
                  e.stopPropagation();
                  await deleteContent(item.contentId);
                  setContents((prev) => prev.filter((c) => c.contentId !== item.contentId));
                }}
                title="Delete"
              >
                <X size={14} />
              </Button>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition p-1 rounded-full bg-black/20 hover:bg-black/40"
                  title="Open Link"
                  onClick={e => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <span className="text-[10px] text-gray-400 font-mono">#{item.contentId}</span>
          </div>
        </div>
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

/** Get YouTube thumbnail URL */
function getYouTubeThumbnail(url: string): string {
  const videoId = extractYouTubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
}