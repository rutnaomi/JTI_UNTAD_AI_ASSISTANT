import { google } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";
import defaultSystemPrompt from "./systemPrompt";

// Fungsi untuk mendapatkan system prompt (sementara gunakan default modular)
async function getSystemPrompt(): Promise<string> {
  return defaultSystemPrompt;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.messages;
    const provider: string = body?.provider || "gemini";
    const modelOverride: string | undefined = body?.model;
    const temperature: number | undefined = body?.temperature;
    const maxTokens: number | undefined = body?.maxTokens; // currently unused; retain for future compatibility

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "Invalid payload: 'messages' must be an array",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = await getSystemPrompt();

    // Provider switch
    let result;
    if (provider === "openrouter") {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        return new Response(
          JSON.stringify({
            error: "Missing OPENROUTER_API_KEY in environment",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const openrouter = createOpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
      });

      const modelName =
        modelOverride || "meta-llama/llama-3.1-8b-instruct:free";

      result = await streamText({
        model: openrouter(modelName),
        system: systemPrompt,
        messages,
        temperature: temperature ?? 0.7,
      });
    } else if (provider === "gemini") {
      const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      if (!geminiKey) {
        return new Response(
          JSON.stringify({
            error: "Missing GOOGLE_GENERATIVE_AI_API_KEY in environment",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const modelName = modelOverride || "gemini-2.5-flash";

      result = await streamText({
        model: google(modelName),
        system: systemPrompt,
        messages,
        temperature: temperature ?? 0.7,
      });
    } else {
      return new Response(
        JSON.stringify({
          error: "Invalid provider. Use 'gemini' or 'openrouter'.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return JSON line stream compatible with client renderer (lines starting with `0:` followed by JSON)
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        (async () => {
          try {
            // Stream text deltas and wrap into JSON envelopes the client expects
            for await (const delta of result.textStream) {
              const payload = `0:${JSON.stringify({
                type: "text-delta",
                textDelta: String(delta),
              })}\n`;
              controller.enqueue(encoder.encode(payload));
            }
            controller.close();
          } catch (e) {
            controller.error(e);
          }
        })();
      },
    });

    return new Response(stream, {
      headers: {
        // Plain text NDJSON-like stream; client parses JSON per line
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
