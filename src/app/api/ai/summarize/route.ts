import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { callGeminiSummarize } from "../../../../lib/geminiStub";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transcriptText, projectId } = body;
    if (!transcriptText || !projectId) {
      return NextResponse.json({ error: "transcriptText and projectId required" }, { status: 400 });
    }

    const result = await callGeminiSummarize(transcriptText);

    // persist summary as an asset
    const asset = await prisma.asset.create({
      data: {
        projectId,
        kind: "summary",
        content: JSON.stringify(result),
        status: "generated",
        meta: { source: "gemini-stub" },
      },
    });

    return NextResponse.json({ result, asset });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
