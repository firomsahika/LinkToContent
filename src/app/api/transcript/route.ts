import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { videoUrl } = await req.json();

  if (!videoUrl) {
    return NextResponse.json({ error: "Missing videoUrl" }, { status: 400 });
  }

  const url = String(videoUrl).trim();
  const match = url.match(/(?:v=|\/|be\/)([0-9A-Za-z_-]{11})/);
  const videoId = match?.[1];

  if (!videoId) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  const apiKey = process.env.SOCIALVAULT_API_KEY;
  
  try {
    
    const apiUrl = `https://api.socialkit.dev/youtube/transcript?access_key=${apiKey}&url=https://www.youtube.com/watch?v=${videoId}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to fetch from SocialVault" }, 
        { status: response.status }
      );
    }

    // 3. Handle the transcript structure
    // SocialKit usually returns { transcript: "..." } or { segments: [...] }
    let fullText = "";
    if (typeof data.transcript === "string") {
      fullText = data.transcript;
    } else if (Array.isArray(data.segments)) {
      fullText = data.segments.map((s: any) => s.text).join(" ");
    }

    // Trim for Gemini token limits if necessary (though Flash handles 1M)
    const cleanedTranscript = fullText.slice(0, 20000); 

    return NextResponse.json({ transcript: cleanedTranscript });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}