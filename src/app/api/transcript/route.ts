import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from 'groq-sdk'



const groq = new Groq({apiKey:process.env.GROQ_API_KEY}) as any;


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

  const accessKey = process.env.ACCESS_KEY;

  if(!accessKey){
    return NextResponse.json({ error: "Missing access key" }, { status: 500 });
  }
  
  try {
    NextResponse
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const apiUrl = `https://api.socialkit.dev/youtube/transcript?access_key=${accessKey}&url=${encodeURIComponent(youtubeUrl)}`;
    const response = await fetch(apiUrl);

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to fetch from SocialVault" }, 
        { status: response.status }
      );
    }


    // console.log(data)

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

    // const model  =  genAI.getGenerativeModel({
    //   model: "gemini-2.0-flash",
    //   generationConfig: {
    //     responseMimeType: 'application/json'
    //   }
    // });

    // const prompt = `
    //   Analyze this YouTube transcript and extract 3-5 highly viral segments (hooks) for short-form video content (LinkedIn, X, TikTok). 
    //   Focus on moments that are high-energy, controversial, or extremely valuable.
      
    //   Return ONLY a JSON object with this structure:
    //   {
    //     "video_title": "string",
    //     "viral_clips": [
    //       {
    //         "hook": "A catchy caption for the video",
    //         "start_timestamp": "HH:MM:SS",
    //         "end_timestamp": "HH:MM:SS",
    //         "why_it_is_viral": "Explanation"
    //       }
    //     ]
    //   }

    //   Transcript:
    //   ${data}
    // `

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a social media expert. Return ONLY valid JSON."
        },
        {
          role: "user",
          content: `Analyze this transcript and extract 3-5 viral hooks. 
          Return ONLY a JSON object:
          {
            "video_title": "string",
            "viral_clips": [
              {
                "hook": "string",
                "start_timestamp": "HH:MM:SS",
                "end_timestamp": "HH:MM:SS",
                "why_it_is_viral": "string"
              }
            ]
          }
          Transcript: ${data}`
        }
      ],
      model: "llama-3.3-70b-versatile", // One of the best free-tier models on Groq
      response_format: { type: "json_object" }, // Forces the model to output JSON
      temperature: 0.7,
    });

    // Extract the content
    const aiResponse = chatCompletion.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // return NextResponse.json({ transcript: data.data });
    return NextResponse.json(JSON.parse(aiResponse));

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}