import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
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