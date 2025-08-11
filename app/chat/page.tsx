"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ChatClient from "@/components/chat/ChatClient"
export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Link>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold">AI Assistant JTI</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-120px)]">
        <ChatClient />
      </div>
    </div>
  )
}
