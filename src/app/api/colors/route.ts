import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const req = await request.json();
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 200,
    messages: [
      {
        role: "system",
        content: "",
      },
      {
        role: "user",
        content: `${req.message}`,
      },
    ],
  });
  const data = chatCompletion.data.choices[0].message;
  console.log(data);

  return NextResponse.json({ data });
}
