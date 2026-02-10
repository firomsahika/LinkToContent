import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { callGeminiForSegments } from "../../../../lib/geminiStub";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transcriptText, projectId } = body;
    if (!transcriptText || !projectId) {
      return NextResponse.json({ error: "transcriptText and projectId required" }, { status: 400 });
    }

    const segments = await callGeminiForSegments(transcriptText);

    const created: any[] = [];
    for (const seg of segments) {
      const asset = await prisma.asset.create({
        data: {
          projectId,
          kind: "segment",
          content: JSON.stringify({ excerpt: seg.excerpt, suggestions: seg.suggestions }),
          startMs: seg.startMs,
          endMs: seg.endMs,
          status: "generated",
          meta: { retentionScore: seg.retentionScore },
        },
      });
      created.push(asset);
    }

    return NextResponse.json({ segments, created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
