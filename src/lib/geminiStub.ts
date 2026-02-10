// Gemini / GenAI stub helper. Replace with real SDK integration.
export async function callGeminiForSegments(transcriptText: string) {
  // Return an array of segment suggestions with start/end and suggestions
  return [
    {
      startMs: 1000,
      endMs: 16000,
      retentionScore: 0.92,
      excerpt: "Hook: amazing insight about X",
      suggestions: {
        tiktok: "Short compelling TikTok caption...",
        linkedin: "Longer LinkedIn post...",
      },
    },
    {
      startMs: 30000,
      endMs: 42000,
      retentionScore: 0.85,
      excerpt: "Resolution: key takeaway",
      suggestions: {
        tiktok: "Another TikTok idea...",
        newsletter: "Newsletter paragraph...",
      },
    },
  ];
}

export async function callGeminiSummarize(transcriptText: string) {
  return {
    summary: `Summary stub: ${transcriptText.slice(0, 120)}...`,
    shortPosts: {
      twitter: "Short tweet-sized summary...",
      linkedin: "LinkedIn post draft...",
    },
  };
}
