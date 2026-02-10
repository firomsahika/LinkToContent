import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sourceUrl, sourceType, title, description, userId } = body;

    if (!sourceUrl || !sourceType) {
      return NextResponse.json({ error: "sourceUrl and sourceType required" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: { sourceUrl, sourceType, title, description, userId },
    });

    return NextResponse.json(project);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { assets: true },
  });
  return NextResponse.json(projects);
}
