import { NextResponse } from "next/server";

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const MODEL = "gpt-4.1-mini";

type OpenAIResponse = {
  error?: {
    message?: string;
  };
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  output_text?: string;
};

function extractText(data: OpenAIResponse) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const textParts =
    data.output
      ?.flatMap((item) => item.content ?? [])
      .filter((item) => item.type === "output_text" && typeof item.text === "string")
      .map((item) => item.text?.trim())
      .filter((item): item is string => Boolean(item)) ?? [];

  return textParts.join("\n").trim();
}

export async function POST(request: Request) {
  try {
    const { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Envie um prompt valido." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY nao configurada no servidor." },
        { status: 500 }
      );
    }

    const openAIResponse = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        input: prompt.trim()
      })
    });

    const data = (await openAIResponse.json()) as OpenAIResponse;

    if (!openAIResponse.ok) {
      return NextResponse.json(
        {
          error:
            data.error?.message ??
            "Falha ao gerar resposta com a API da OpenAI."
        },
        { status: openAIResponse.status }
      );
    }

    const text = extractText(data);

    if (!text) {
      return NextResponse.json(
        { error: "A API da OpenAI nao retornou texto." },
        { status: 502 }
      );
    }

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao processar a requisicao." },
      { status: 500 }
    );
  }
}

