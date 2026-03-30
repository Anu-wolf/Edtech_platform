import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { stress, hours, confidence } = await req.json();

    const prompt = `You are a deeply empathetic AI tutor for "LEARNLY StudyLab", specifically designed to help students manage academic pressure while accelerating their learning. 
A student named ${session.user?.name} has requested a study plan. 
Their current state:
- Stress Level: ${stress}%
- Confidence Level: ${confidence}%
- Available Study Time: ${hours} hours

Generate a highly personalized, Markdown-formatted study schedule that includes:
1. **Mental State Acknowledgment**: A short, highly empathetic 2-sentence greeting acknowledging their exact stress and confidence levels. 
2. **Strategic Focus**: Based directly on their confidence (${confidence}%), give 1 short paragraph of advice on *how* they should study right now (e.g., if low confidence, focus on core concepts. If high, advance to hard practice problems). 
3. **Structured Time Blocks**: A mathematically divided schedule for the next ${hours} hours. Use Pomodoro or Deep Work blocks depending on what is most suitable for their stress.
4. **Wellness Checkpoints**: Because their stress is at ${stress}%, explicitly tell them to take specific breaks. If stress > 60%, mandate specific relaxation exercises (like 'Deep Breathing' or 'Guided Meditation') during their breaks.

Keep the output clean, highly actionable, structured with markdown headings and bold text, and encouraging.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: prompt,
    });

    return NextResponse.json({ plan: text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
