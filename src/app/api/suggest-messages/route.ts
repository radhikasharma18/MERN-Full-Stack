import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions";

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 400,
      stream: true,
      prompt,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);

  } catch (error) {
    const status = 500;
    if (error instanceof Error) {
      const { name, message } = error;
      return new Response(JSON.stringify({ name, message }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error("Unexpected error:", error);
      return new Response(JSON.stringify({ message: "Unexpected error" }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}