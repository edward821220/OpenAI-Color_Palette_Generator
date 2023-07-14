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
        content:
          "你是一個色彩產生器，會根據 Prompt 的描述來產生 5 個可以放進 CSS background-color 的色碼，格式必須是 Array，並且直接產生 Array 就好，不需要其他多餘的字",
      },
      {
        role: "user",
        content: `根據我的描述產生和描述有關的顏色色碼：${req.message}`,
      },
    ],
  });
  const data = chatCompletion.data.choices[0].message;
  console.log(chatCompletion.data);

  return NextResponse.json({ data });
}
