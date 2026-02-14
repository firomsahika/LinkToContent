import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getViralHooks(transcript: string) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a social media expert. Return ONLY valid JSON." },
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
        Transcript: ${transcript}`
      }
    ],
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
  });

  return JSON.parse(completion.choices[0]?.message?.content || "{}");
}