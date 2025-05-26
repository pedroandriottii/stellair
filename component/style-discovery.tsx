"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"

interface Clothing {
  id: string
  image_url: string
  title: string
  description: string
  original_text: string
}

export default function Component() {
  const [clothes, setClothes] = useState<Clothing[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [approvedIds, setApprovedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFinished, setIsFinished] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    fetchClothes()
  }, [])

  const fetchClothes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/clothes`)
      console.log(response)
      setClothes(response.data)
      setError(null)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Erro ao buscar roupas')
      } else {
        setError('Erro desconhecido')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDislike = () => {
    goToNext()
  }

  const handleLike = () => {
    // Adiciona o ID da roupa atual aos aprovados
    const currentClothing = clothes[currentIndex]
    if (currentClothing) {
      setApprovedIds(prev => [...prev, currentClothing.id])
    }
    goToNext()
  }

  const goToNext = () => {
    if (currentIndex < clothes.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Terminou todas as 10 roupas
      setIsFinished(true)
      sendApprovedIds()
    }
  }

  const sendApprovedIds = async () => {
    try {
      console.log('IDs aprovados:', approvedIds)
      // Aqui você pode fazer o POST para sua API com os IDs aprovados
      // const response = await axios.post(`${API_URL}/approved-clothes`, {
      //   approvedIds: approvedIds
      // })
      // console.log('Resposta da API:', response.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Erro ao enviar IDs aprovados:', err.response?.data || err.message)
      } else {
        console.error('Erro ao enviar IDs aprovados:', err)
      }
    }
  }

  const resetDiscovery = () => {
    setCurrentIndex(0)
    setApprovedIds([])
    setIsFinished(false)
    fetchClothes()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-[#000000] text-3xl font-bold mb-4">Carregando...</h1>
          <p className="text-[#a1a1a1] text-base">Buscando roupas para você descobrir seu estilo</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-[#000000] text-3xl font-bold mb-4">Erro</h1>
          <p className="text-[#a1a1a1] text-base mb-4">{error}</p>
          <Button onClick={fetchClothes} className="bg-[#b9ff25] hover:bg-[#a8e622] text-black">
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-[#000000] text-3xl font-bold mb-4">Descoberta concluída! 🎉</h1>
          <p className="text-[#a1a1a1] text-base mb-4">
            Você aprovou {approvedIds.length} de {clothes.length} roupas
          </p>
          <Button onClick={resetDiscovery} className="bg-[#b9ff25] hover:bg-[#a8e622] text-black">
            Descobrir novamente
          </Button>
        </div>
      </div>
    )
  }

  if (clothes.length === 0) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-[#000000] text-3xl font-bold mb-4">Nenhuma roupa encontrada</h1>
          <p className="text-[#a1a1a1] text-base">Não foi possível carregar as roupas</p>
        </div>
      </div>
    )
  }

  const currentClothing = clothes[currentIndex]

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[#000000] text-3xl font-bold mb-4">Descubra seu estilo :)</h1>
        <p className="text-[#a1a1a1] text-base leading-relaxed">
          Deslize para a direita nas peças que você usaria ou já usa, e para a esquerda nos que não gosta.
        </p>
      </div>

      {/* Product Card */}
      <div className="relative w-full max-w-sm mb-8">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            border: "4px solid #b9ff25",
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        >
          <div className="aspect-[3/4] relative">
            <img
              // currentClothing.image_url
              src={"/placeholder_clothing.jpg"}
              alt={currentClothing.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay gradient - máscara mais forte para legibilidade do texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{currentClothing.title}</h2>
              <p className="text-sm opacity-90 mb-4 leading-relaxed">
                {currentClothing.description}
              </p>
              <p className="text-sm opacity-75">
                Peça <span className="font-semibold">{String(currentIndex + 1).padStart(2, "0")}</span> de{" "}
                <span className="font-semibold">{String(clothes.length).padStart(2, "0")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <Button
          onClick={handleDislike}
          className="w-16 h-16 rounded-2xl bg-[#1c1c1c] hover:bg-[#000000] border-0 p-0"
          size="icon"
        >
          <X className="w-8 h-8 text-white" strokeWidth={4} />
        </Button>

        <Button
          onClick={handleLike}
          className="w-16 h-16 rounded-2xl bg-[#b9ff25] hover:bg-[#a8e622] border-0 p-0"
          size="icon"
        >
          <Check className="w-8 h-8 text-black" strokeWidth={4} />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 text-center">
        <p className="text-[#a1a1a1] text-sm">
          {approvedIds.length} aprovadas • {currentIndex + 1}/{clothes.length}
        </p>
      </div>
    </div>
  )
}
