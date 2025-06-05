import OpenAI from "openai";
import { profileLooks } from "@/data/looks";
import { profilePrompts } from "@/data/prompts";
import { type NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, profileName } = await request.json();
    console.log("message", message);
    console.log("profileName", profileName);
    if (!message || !profileName) {
      return NextResponse.json(
        { error: "Message and profile name are required" },
        { status: 400 }
      );
    }

    const profilePrompt = profilePrompts[profileName];
    const looks = profileLooks[profileName] ?? [];

    if (!profilePrompt) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${profilePrompt.systemPrompt} ${profilePrompt.styleContext}`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    console.log("chat", chat);
    console.log(chat.choices);

    const responseMessage = chat.choices[0]?.message.content?.trim() ?? "";

    const suggestionsWithImages = await openai.images.generate({
      model: "dall-e-3",
      n: 1,
      prompt: `Editorial fashion photo, ${responseMessage}, full-body, neutral background, 4K`,
      size: "1024x1024",
    });

    return NextResponse.json({
      message: responseMessage,
      suggestions: suggestionsWithImages.data?.map((look) => ({
        imageUrl: look.url,
      })),
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
