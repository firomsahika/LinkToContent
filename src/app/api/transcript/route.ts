import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { videoUrl } = await req.json();

  if (!videoUrl) {
    return NextResponse.json({ error: "Missing videoUrl in request body" }, { status: 400 });
  }

  // Extract a 11-char YouTube video id (supports youtu.be and watch?v= formats)
  const url = String(videoUrl).trim();
  const match = url.match(/(?:v=|\/|be\/)([0-9A-Za-z_-]{11})/);
  const videoId = match?.[1];

  if (!videoId) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  const apiKey = process.env.SOCIAVAULT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing SOCIAVAULT_API_KEY environment variable" }, { status: 500 });
  }

  try {
    const transcriptionRes = await fetch(
      `https://api.sociavault.com/api/v1/youtube/video/${videoId}/transcript`,
      { headers: { "x-api-key": apiKey } }
    );

    const raw = await transcriptionRes.text();

    if (!transcriptionRes.ok) {
      // Try to parse JSON error body, otherwise return text
      let parsed: any = null;
      try { parsed = JSON.parse(raw); } catch (e) { /* not JSON */ }
      const message = parsed?.message || parsed?.error || raw || transcriptionRes.statusText || "Failed to fetch transcript";
      return NextResponse.json({ error: message, status: transcriptionRes.status }, { status: transcriptionRes.status });
    }

    const data = JSON.parse(raw);
    const fullTranscript = (data.transcript || [])
      .map((item: any) => item.text)
      .join(" ")
      .slice(0, 15000);

    return NextResponse.json({ transcript: fullTranscript });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

export async function GET() {
  // diagnostic endpoint: confirms route is active and whether env var is loaded
  return NextResponse.json({ ok: true, envLoaded: !!process.env.SOCIAVAULT_API_KEY });
}

