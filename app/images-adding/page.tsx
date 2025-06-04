"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdicionarImagens() {
  const [imagens, setImagens] = useState<{ file: File; url: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean; message: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file)
      }))
      setImagens((prev) => [...prev, ...newFiles])
      setUploadStatus(null) // Limpar status ao adicionar novas imagens
    }
  }

  // Função para enviar imagens selecionadas para o backend
  const handleUpload = async () => {
    if (imagens.length === 0) {
      setUploadStatus({ success: false, message: "Selecione pelo menos uma imagem" })
      return
    }

    setIsLoading(true)
    setUploadStatus(null)

    try {
      const formData = new FormData()
      imagens.forEach((img) => {
        formData.append("files", img.file)
      })

      const res = await fetch("http://localhost:8000/upload-images", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Falha no upload: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      setUploadStatus({ success: true, message: "Upload realizado com sucesso!" })
      
      // Limpar imagens após upload bem-sucedido
      imagens.forEach(img => URL.revokeObjectURL(img.url))
      setImagens([])
      
      console.log("Upload response:", data)
    } catch (error) {
      console.error("Erro ao enviar imagens:", error)
      setUploadStatus({
        success: false, 
        message: error instanceof Error ? error.message : "Erro desconhecido ao enviar imagens"
      })
    } finally {
      setIsLoading(false)
      //redirect home
      router.push('/home') 
    }
  }

  const removeImagem = (index: number) => {
    setImagens((prev) => {
      const newImagens = [...prev]
      const removed = newImagens.splice(index, 1)[0]
      URL.revokeObjectURL(removed.url)
      return newImagens
    })
    setUploadStatus(null) // Limpar status ao remover imagens
  }

  // Limpar URLs quando o componente for desmontado
  useEffect(() => {
    return () => {
      imagens.forEach((imagem) => URL.revokeObjectURL(imagem.url))
    }
  }, [imagens])

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">Adicionar imagens</h1>
        <p className="text-gray-600 mb-6">
          Adicione imagens de roupas suas ou roupas que gosta para nos ajudar a realizar combinações utilizando peças que combinam com você!
        </p>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {imagens.map((imagem, index) => (
            <div key={index} className="relative aspect-square">
              <div className="group relative h-full w-full overflow-hidden rounded-md border">
                <img
                  src={imagem.url}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImagem(index)}
                  className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            </div>
          ))}
          
          <label
            htmlFor="upload-image"
            className="cursor-pointer aspect-square"
          >
            <div className="h-full w-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Plus className="h-8 w-8 text-lime-500" />
            </div>
            <input
              ref={inputRef}
              id="upload-image"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {imagens.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">{imagens.length} imagens selecionadas</p>
          </div>
        )}

        {/* Feedback de upload */}
        {uploadStatus && (
          <div className={`mt-4 p-3 rounded-md ${
            uploadStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {uploadStatus.message}
          </div>
        )}
      </div>

      <div className="space-y-3 mt-6">
        <Button 
          className="w-full bg-[#0f172a] text-white hover:bg-[#1e293b]" 
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Concluir"}
        </Button>
        <Link href="/home">
          <Button variant="outline" className="w-full">
            Pular
          </Button>
        </Link>
      </div>
    </div>
  )
}