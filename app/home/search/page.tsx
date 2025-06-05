"use client"

import { SendHorizontal } from "lucide-react"
import Image from "next/image"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import search from "@/public/search.svg"

export default function SearchPage() {
  const [query, setQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)

    setTimeout(() => {
      router.push(`/chat?q=${encodeURIComponent(query)}`)
    }, 750)
  }

  return (
    <div className="flex h-full items-center justify-center bg-gray-50">
      <div className="flex flex-col bg-gray-50 items-center pt-12 pb-40 px-4">
        <div className="mb-6">
          <Image src={search || "/placeholder.svg"} alt="Search" width={80} height={80} />
        </div>

        <h1 className="text-2xl font-bold mb-1">Buscar</h1>
        <p className="text-xs text-[#525252] mb-5">
          Pergunte à <span className="font-semibold">Stella</span> sobre o que usar para a ocasião desejada!
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex items-center border border-gray-200 rounded-lg px-1 pl-3 py-1"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que posso usar para um casamento..."
            className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="ml-1 bg-[#1C1C1C] p-2 rounded-sm disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#B9FF25] border-t-transparent rounded-full animate-spin" />
            ) : (
              <SendHorizontal className="text-[#B9FF25]" size={16} />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
