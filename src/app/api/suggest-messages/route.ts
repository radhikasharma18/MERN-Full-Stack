import OpenAI from "openai";

export async function POST() {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "Missing OpenAI API key" },
      { status: 500 }
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: "Create a list of three open-ended and engaging questions",
    });

    return Response.json({
      message: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}