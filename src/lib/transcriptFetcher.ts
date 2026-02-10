// Minimal transcript fetcher stub. Replace with real implementations.
export async function fetchTranscript(url: string, sourceType: string) {
  // Example shape: { text: string, segments: [{startMs,endMs,text}] }
  // TODO: implement YouTube/Spotify/GDrive fetchers or call Edge Function.
  return {
    text: `Transcript stub for ${url}`,
    segments: [
      { startMs: 0, endMs: 15000, text: "Intro / Hook" },
      { startMs: 15001, endMs: 45000, text: "Main content" },
    ],
  };
}
