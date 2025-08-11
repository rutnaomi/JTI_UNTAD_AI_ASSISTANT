"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot, User } from "lucide-react";

export type Provider = "gemini" | "openrouter";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatClientProps {
  provider?: Provider;
  model?: string;
  onProviderChange?: (provider: Provider) => void;
  onModelChange?: (model: string) => void;
  initialMessages?: Message[];
}

export default function ChatClient({
  provider,
  model,
  onProviderChange,
  onModelChange,
  initialMessages = [],
}: ChatClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Uncontrolled fallback state when props not provided
  const [localProvider, setLocalProvider] = useState<Provider>(
    provider ?? "gemini"
  );
  const [localModel, setLocalModel] = useState<string>(
    model ??
      (localProvider === "openrouter"
        ? "meta-llama/llama-3.1-8b-instruct:free"
        : "gemini-2.0-flash-exp")
  );

  useEffect(() => {
    if (provider) setLocalProvider(provider);
  }, [provider]);

  useEffect(() => {
    if (model) setLocalModel(model);
  }, [model]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const effectiveProvider = provider ?? localProvider;
  const effectiveModel = model ?? localModel;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: effectiveProvider,
          model: effectiveModel,
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          temperature: 0.7,
        }),
      });
      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            // Vercel AI SDK text stream uses event format like `0:{json}` for deltas
            if (line.startsWith("0:")) {
              try {
                const data = line.slice(2);
                const parsed = JSON.parse(data);
                if (parsed.type === "text-delta" && parsed.textDelta) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessage.id
                        ? { ...msg, content: msg.content + parsed.textDelta }
                        : msg
                    )
                  );
                }
              } catch (err) {
                // Ignore lines that are not JSON payloads
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "Bagaimana cara mendaftar KRS?",
    "Apa saja persyaratan skripsi?",
    "Bagaimana prosedur cuti akademik?",
    "Kapan jadwal wisuda?",
    "Bagaimana cara mengurus surat keterangan mahasiswa aktif?",
  ];

  const handleQuickQuestion = (q: string) => setInput(q);

  return (
    <div className="h-full flex flex-col">
      <Card className="min-h-[600px] h-full flex flex-col bg-white">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>Chat dengan AI Assistant</span>
            </span>
            <div className="flex items-center gap-2">
              {/* Provider selector */}
              <select
                value={effectiveProvider}
                onChange={(e) => {
                  const next = e.target.value as Provider;
                  if (onProviderChange) onProviderChange(next);
                  setLocalProvider(next);
                  // set default model when provider changes if uncontrolled
                  if (!model) {
                    setLocalModel(
                      next === "openrouter"
                        ? "meta-llama/llama-3.1-8b-instruct:free"
                        : "gemini-2.0-flash-exp"
                    );
                  }
                }}
                className="border rounded px-2 py-1 text-sm"
                disabled={isLoading}
              >
                <option value="gemini">Gemini</option>
                <option value="openrouter">OpenRouter</option>
              </select>

              {/* Model input (simple text) */}
              <Input
                value={effectiveModel}
                onChange={(e) => {
                  if (onModelChange) onModelChange(e.target.value);
                  setLocalModel(e.target.value);
                }}
                placeholder="model name"
                className="w-64"
                disabled={isLoading}
              />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 bg-white">
          <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-4 min-h-0 bg-white border-b border-gray-200">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Selamat datang!</h3>
                <p className="text-gray-600 mb-6">
                  Saya adalah AI Assistant JTI yang siap membantu Anda dengan
                  informasi administrasi.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Pertanyaan yang sering diajukan:
                  </p>
                  {quickQuestions.map((q, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="block mx-auto mb-2 text-left bg-transparent"
                      onClick={() => handleQuickQuestion(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 break-words ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === "assistant" && (
                      <Bot className="w-4 h-4 mt-1 text-blue-600" />
                    )}
                    {message.role === "user" && (
                      <User className="w-4 h-4 mt-1" />
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="mb-4" />
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200 mt-2">
            <form onSubmit={handleSubmit} className="flex space-x-2 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan Anda tentang administrasi JTI..."
                disabled={isLoading}
                className="flex-1 border-0 focus:ring-0 focus:ring-offset-0"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
