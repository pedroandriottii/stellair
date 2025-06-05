"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SendHorizontal, Search, Home, User } from "lucide-react"
import Image from "next/image"
import type { ChatMessage, Profile } from "@/data/profile"

interface ChatInterfaceProps {
  initialQuery: string
  profile?: Profile
}

export default function ChatInterface({ initialQuery, profile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [expandedLook, setExpandedLook] = useState<any>(null)

  const initialFetchedRef = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (initialQuery && !initialFetchedRef.current) {
      initialFetchedRef.current = true
      handleInitialQuery()
    }
  }, [initialQuery])

  const handleInitialQuery = async () => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: initialQuery,
      timestamp: new Date(),
    }

    setMessages([userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: initialQuery,
          profileName: profile?.profile_name || "Versátil Minimalista",
        }),
      })

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.message,
        timestamp: new Date(),
        suggestions: data.suggestions,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          profileName: profile?.profile_name || "Versátil Minimalista",
        }),
      })

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.message,
        timestamp: new Date(),
        suggestions: data.suggestions,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white">
        <Search className="text-[#B9FF25] mr-3" size={20} />
        <h1 className="text-lg font-semibold text-gray-900">Pesquisa</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === "user" ? (
              <div className="flex justify-end">
                <div className="bg-[#B9FF25] text-black px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                  {message.content}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-gray-800 text-sm">{message.content}</div>

                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {message.suggestions.map((look, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden border-2 border-[#B9FF25] cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setExpandedLook(look)}
                      >
                        <div className="aspect-[3/4] bg-gray-200 relative">
                          <Image
                            src={look.imageUrl || "/placeholder.svg"}
                            alt={look.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `/placeholder.svg?height=200&width=150`
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3">
                            <h3 className="font-semibold text-sm mb-1">{look.name}</h3>
                            <p className="text-xs opacity-90 line-clamp-2">{look.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="text-gray-800 text-sm mt-4">O que acha?</div>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escreva..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#B9FF25] text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-[#1C1C1C] p-3 rounded-full disabled:opacity-50"
          >
            <SendHorizontal className="text-[#B9FF25]" size={16} />
          </button>
        </form>
      </div>

      {/* Expanded Look Modal */}
      {expandedLook && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedLook(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4] bg-gray-200">
              <Image
                src={expandedLook.imageUrl || "/placeholder.svg"}
                alt={expandedLook.name}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg?height=400&width=300`
                }}
              />
              <button
                onClick={() => setExpandedLook(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3 text-gray-900">{expandedLook.name}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{expandedLook.description}</p>
              
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center py-3 px-4 border-t bg-white">
        <button className="p-2">
          <Home className="text-gray-400" size={24} />
        </button>
        <button className="p-2">
          <Search className="text-[#B9FF25]" size={24} />
        </button>
        <button className="p-2">
          <User className="text-gray-400" size={24} />
        </button>
      </div>
    </div>
  )
}
