import { NextResponse } from "next/server";
import { getViralHooks } from "@/lib/groq";
import OpenAI from "openai"; // Using OpenAI Whisper for transcription

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("file") as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const file = new File([audioFile], "audio.mp3", { type: "audio/mpeg" });
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });

    const aiAnalysis = await getViralHooks(transcription.text);

    return NextResponse.json(aiAnalysis);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
