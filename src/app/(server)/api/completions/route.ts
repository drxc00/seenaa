import { textCompletion } from "@/models/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  const generatedText = await textCompletion({
    context: content,
  });

  return NextResponse.json({
    completion: generatedText,
  });
}
