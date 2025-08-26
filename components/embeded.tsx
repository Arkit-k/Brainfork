// app/components/TweetEmbed.tsx
"use client";

import * as React from "react";
import { TweetGrid } from "@/components/eldoraui/tweetgrid";

// helper to extract tweet ID from a URL
function getTweetId(url: string): string | null {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}

interface TweetEmbedProps {
  link: string;
}

export function TweetEmbed({ link }: TweetEmbedProps) {
  const tweetId = getTweetId(link);
  if (!tweetId) return null;

  return (
    <div className="w-full flex justify-center mb-3">
      <TweetGrid tweets={[tweetId]} columns={1} spacing="lg" />
    </div>
  );
}
